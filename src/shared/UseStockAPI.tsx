import useSWR from 'swr'
import axios from 'axios'
import {useEffect} from "react";

import {useAPIKey} from "../core/FirebaseConfig";

export const USDollar = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

export type StockInterval =
    '1min'
    | ' 5min'
    | ' 15min'
    | ' 30min'
    | ' 45min'
    | ' 1h'
    | ' 2h'
    | ' 4h'
    | ' 1day'
    | ' 1week'
    | ' 1month';

export const useStockAPI = () => {
    const {getKey} = useAPIKey("stocks");
    const BASE_URL = "https://api.twelvedata.com";
    const BASE_QUOTE_URL = BASE_URL + "/quote?";
    const BASE_HISTORY_URL = BASE_URL + "/time_series?";
    const BASE_LOGO_URL = BASE_URL + "/logo?"

    const makeTickerQuery = (tickers: string[]): string => {
        let tickerQuery = 'symbol=';
        for (let i = 0; i < tickers.length; i++) {
            const ticker = tickers[i];
            tickerQuery += ticker
            if (i < tickers.length - 1) {
                tickerQuery += ",";
            }
        }
        return tickerQuery;
    }

    const makeAPIQuery = async () => {
        let apiKey = await getKey("stocks");
        return "&apikey=" + apiKey;
    }

    const formatDate = (date: Date) => {
        const dateStr = date.toISOString().substring(0, 17);
        const dayAndTime = dateStr.split("T");

        return dayAndTime[0] + " " + dayAndTime[1];
    }

    const handleError = (tickers: string[], err: any) => {
        console.log(err.data.message);
    }

    const fetchQuotes = async (tickers: string[]) => {
        if (tickers.length > 0) {

            const tickerQuery = makeTickerQuery(tickers)

            const apiKeyQuery = await makeAPIQuery();
            return axios.get(BASE_QUOTE_URL + tickerQuery + apiKeyQuery).then((res) => {
                console.log("Finished fetching stock quotes")
                return res.data;
            }).catch((err) => {
                handleError(tickers, err);
            });
        }
    }

    const fetchStockHistory = async (tickers: string[], interval: StockInterval,
                                     startDate: Date, endDate: Date
    ) => {
        if (tickers.length > 0) {

            const tickerQuery = makeTickerQuery(tickers);
            const intervalQuery = '&interval=' + interval;
            const startDateQuery = '&start_date=' + formatDate(startDate);
            const endtDateQuery = '&end_date=' + formatDate(endDate);

            const apiKeyQuery = await makeAPIQuery();
            return axios.get(BASE_HISTORY_URL + tickerQuery + intervalQuery + startDateQuery + endtDateQuery + apiKeyQuery).then((res) => {
                console.log("Finished fetching stock history")
                // console.log(res.data);
                return res.data;
            }).catch((err) => {
                handleError(tickers, err);
            });
        }
    }

    //This works but probalby wont be used because of companies marketcap.com link
    const fetchLogos = async (tickers: string[]) => {
        if (tickers.length > 0) {
            const tickerQuery = makeTickerQuery(tickers);
            const apiKeyQuery = await makeAPIQuery();

            return axios.get(BASE_LOGO_URL + tickerQuery + apiKeyQuery).then((res) => {
                console.log("Finished fetching stock logo ")
                // console.log(res.data);
                return res.data;
            }).catch((err) => {
                handleError(tickers, err);
            });
        }
    }

    return {fetchQuotes, fetchStockHistory, fetchLogos}
}

