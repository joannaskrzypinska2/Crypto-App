import React, { Component } from 'react';
import './Crypto.css';
import axios from 'axios';
import CryptoList from './CryptoList';

class Crypto extends Component {
    constructor(props) {
        super(props);

        this.state = {
            cryptoList: [],
            filteredCryptoList: [],
        }
    }
    //uruchomienie metody getCryptoData i odswiezania co 5s
    componentDidMount() {
        this.getCryptoData();
        this.timerID = setInterval(() => this.getCryptoData(), 5000);
    }

    //wyczyszczenie componentu z interwalu czasowego
    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    getCryptoData = () => {
        axios.get('https://blockchain.info/pl/ticker')
            .then(response => {
                const tickers = response.data;

                this.setState((state) => {
                    let newCryptoList = [];

                    for (const [ticker, cryptoRate] of Object.entries(tickers)) {
                        let lastCryptoObj = state.cryptoList.find((cryptoObj) => {
                            return (cryptoObj.currency === ticker);
                        });

                        let newCryptoObj = {
                            currency: ticker,
                            symbol: cryptoRate.symbol,
                            lastRate: cryptoRate.last,
                        }

                        if (lastCryptoObj !== undefined) {
                            if (newCryptoObj.lastRate > lastCryptoObj.lastRate) {
                                newCryptoObj.cssClass = 'green';
                                newCryptoObj.htmlArrow = String.fromCharCode(8593);
                            } else if (newCryptoObj.lastRate < lastCryptoObj.lastRate) {
                                newCryptoObj.cssClass = 'red';
                                newCryptoObj.htmlArrow = String.fromCharCode(8595);
                            } else {
                                newCryptoObj.cssClass = 'blue';
                                newCryptoObj.htmlArrow = String.fromCharCode(8596);
                            }
                        } 
                        //przypadek gdy obiekt nie został zdefiniowany
                        else {
                            newCryptoObj.cssClass = 'blue';
                            newCryptoObj.htmlArrow = String.fromCharCode(8596);
                        }

                        newCryptoList.push(newCryptoObj);
                    }
                    return ({
                        cryptoList: newCryptoList
                    });
                });

                this.filterCryptoList();
            });

    }

    filterCryptoList =() => {
        this._inputFilter.value = this._inputFilter.value.trim().toUpperCase();

        this.setState((state) => {
            let newFilteredCryptoList = state.cryptoList.filter((cryptoObject) => {
                return(cryptoObject.currency.includes(this._inputFilter.value));
            }); 

            return({
                filteredCryptoList: newFilteredCryptoList
            });
        });
    }

    render() {
        return (
            <div className="Crypto">
                <input ref={element => this._inputFilter = element} onChange={this.filterCryptoList} type="text" placeholder="Filter" />
                <CryptoList cryptoList={this.state.filteredCryptoList} />
            </div>
        );
    }
}

export default Crypto;

/* przekazujemy propsa cryptoList w linii 93 */