import React from 'react';
import './CryptoList.css';

function CryptoList(props) {

    // pobranie propsów z cryptoList do zmiennej
    let myCryptoList = props.cryptoList;
    console.log(myCryptoList);

    // przekształcenie tablicy w listę elementów
    let liElements = myCryptoList.map((cryptoObj) => {
        return (
            <li key={cryptoObj.currency}>
                <span className="CryptoLabel">Last rate: </span>
                <span className={`CryptoRate ${cryptoObj.cssClass}`}>{cryptoObj.lastRate} {cryptoObj.htmlArrow}</span>
                <span className="CurrencyTicker">{cryptoObj.currency}</span>
                <span className="CurrencySymbol">{cryptoObj.symbol}</span>
            </li>
        );
    });

    return (
        <div className="CryptoList">
            <ul className="TheList">
                {liElements}
            </ul>
        </div>
    );
}

export default CryptoList;