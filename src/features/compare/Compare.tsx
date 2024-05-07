import {NavBar} from "../../shared/NavBar";
import React, {useEffect, useRef, memo} from 'react';

export const Compare = () => {
    return (
        <div>
            <NavBar/>
            {/*COMPARE PENDING!!*/}
            <div className={"mx-auto h-80 container"}>
                <TradingViewWidget/>
            </div>
        </div>
    );
};

// TradingViewWidget.jsx

function TradingViewWidget() {
    const container = useRef<HTMLDivElement>(null);
    const scriptRef = useRef<HTMLScriptElement>(null);

    useEffect(
        () => {
            if (!container.current) return;
            const script = document.createElement("script");
            script.src = "https://s3.tradingview.com/external-embedding/embed-widget-symbol-overview.js";
            script.type = "text/javascript";
            script.async = true;
            script.innerHTML = `
        {
          "symbols": [
            [
              "Apple",
              "AAPL|1D"
            ],
            [
              "Google",
              "GOOGL|1D"
            ],
            [
              "Microsoft",
              "MSFT|1D"
            ]
          ],
          "chartOnly": false,
          "width": "100%",
          "height": "100%",
          "locale": "en",
          "colorTheme": "dark",
          "autosize": true,
          "showVolume": false,
          "showMA": false,
          "hideDateRanges": false,
          "hideMarketStatus": false,
          "hideSymbolLogo": false,
          "scalePosition": "right",
          "scaleMode": "Normal",
          "fontFamily": "-apple-system, BlinkMacSystemFont, Trebuchet MS, Roboto, Ubuntu, sans-serif",
          "fontSize": "10",
          "noTimeScale": false,
          "valuesTracking": "1",
          "changeMode": "price-and-percent",
          "chartType": "area",
          "maLineColor": "#2962FF",
          "maLineWidth": 1,
          "maLength": 9,
          "lineWidth": 2,
          "lineType": 0,
          "dateRanges": [
            "1d|1",
            "1m|30",
            "3m|60",
            "12m|1D",
            "60m|1W",
            "all|1M"
          ]
        }`;
            script.id = "tradewidget";
            container.current.appendChild(script);
            // scriptRef.current = script;
            return (() => {
                if (document.querySelector("#tradewidget")) {
                    container.current?.removeChild(document.querySelector("#tradewidget") as HTMLScriptElement);
                }
            })
        },
        []
    );

    return (
        <div className={"rounded-2xl h-80"}>
            <div className="rounded-2xl overflow-clip border-0 tradingview-widget-container" ref={container}>
                <div className="border-0 rounded-3xl overflow-clip tradingview-widget-container__widget"></div>
            </div>
        </div>
    );
}

export default memo(TradingViewWidget);