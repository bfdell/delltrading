import useSWR from 'swr'
import axios from 'axios'
import {useEffect} from "react";

const BASE_URL: string = 'https://api.marketstack.com/v1/tickers/'
const REQUEST_PARAMS = {
    access_key: 'e79b7f3160ff652637680a364236f00d'
}

export type StockApiParams = {
    date_from: string | undefined,
    data_to: string | undefined,
    limit: number | undefined,
    sort: string | undefined,
    interval: string | undefined,
    symbols: string | undefined,
}

export const USDollar = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

export const useStockAPI = () => {
    const {data, isLoading} = useSWR(['/latest', {symbols: "MSFT"}],
        ([date, params]) => fetchCurrentData('', new Date()))

    useEffect(() => {
        if (!isLoading) {
            console.log(data);
        }
    }, [isLoading])
    // const getCurrentTickerData = (ticker: string) => {
    //     useSWR(['/latest', {symbols: "MSFT"}],
    //         ([date, params]) => stockPriceAtFetcher(date, params as StockApiParams))
    //
    // }

    // return {getCurrentTickerData};
}
//todo: change IEXG to nasdaq
export const fetchCurrentData = async (ticker: string, date: Date | null = null) => {
    //todo: do additional check to make sure that they are valid tickers

    //Whenever serving data for a single stock, always server the closing price from the day befroe,
    //that way I am guaranteed a response from the api
    // const yesterday = new Date();
    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1);
    const dateStr = date === null ? new Date().toISOString().substring(0, 10) : yesterday.toISOString().substring(0, 10);
    if (ticker !== undefined && ticker !== '') {
        return axios.get(BASE_URL + ticker + "/eod", {
            params: {
                ...REQUEST_PARAMS, ...{
                    date_from: dateStr,
                } as StockApiParams
            }
        })
            .then(
                (res) => {
                    console.log("JUST FINISHED FETCHING " + ticker);

                    if (ticker === 'faze') {
                        console.log(res);
                    }
                    if (res.data.data.eod.length === 0) {
                        console.log("Stock " + ticker + " has no relevant value");
                        return Promise.reject("BadStock");
                    }

                    return res.data.data
                });
    } else {
        console.log("invalid params to fetch stock price ");
        return Promise.reject();
    }
}
export const useStockPriceAt = (dateStr: string, stockList: string) => {
    //todo: add conditional that checks if it is either /latest or a specific date
    const {data, isLoading, error} = useSWR([dateStr, {symbols: stockList}],
        ([date, params]) => fetchCurrentData('', new Date()));

    return {
        stockData: data,
        stockLoaded: isLoading,
        error
    }
}