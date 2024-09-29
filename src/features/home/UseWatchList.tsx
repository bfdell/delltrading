import {useState, useEffect} from 'react';

import {StockTickerData, parseTickerData} from "../../shared/StockUtils";
import {axios} from "../../core/UseAxiosApi";

export const useWatchList = () => {
    const [watchList, setWatchList] = useState<StockTickerData[]>([] as StockTickerData[]);

    //loading states
    const [watchListLoading, setWatchListLoading] = useState(true);
    const [pendingNewTicker, setPendingNewTicker] = useState(false);

    useEffect(() => {
            axios.get('watchlist').then((res) => {
                const stockData: any[] = res.data;
                const tempList: StockTickerData[] = [];
                stockData?.forEach((ticker) => {
                    tempList.push(parseTickerData(ticker));
                })
                console.log("WATHCLIST: ", res)
                setWatchList(tempList);
                setWatchListLoading(false);
            })
        }, []
    );


    const addTicker = async (ticker: string) => {
        // //if list is loading, I don't want two loading spinners
        // if (!watchListLoading) {
        //     setPendingNewTicker(true);
        // }

        return axios.post('watchlist/append', {ticker: ticker}).then((res) => {
            watchList.push(parseTickerData(res.data));
            setWatchList(watchList);
            //todo: instead of triggering full re-render, just remove the specific ticker I added
            // setWatchListLoading(true);
        })
    }

    const deleteTicker = async (ticker: string) => {
        setWatchListLoading(true);
        return axios.delete('watchlist/remove', {
                data: {
                    ticker: ticker
                }
            }
        ).then((res) => {
            console.log(res);
            setWatchList(watchList.filter((item) => {return item.ticker !== ticker}))
            setWatchListLoading(false);
            //todo: instead of triggering full re-render, just remove the specific ticker I deleted
        }).catch((err) => {
            console.log("DELETE ERR", err)
        })
    }

    return {
        watchList,
        watchListLoading,
        pendingNewTicker,
        addTicker,
        deleteTicker
    };
}