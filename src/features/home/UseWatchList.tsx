import {useState, useEffect} from 'react';
import {StockTickerData, parseTickerData} from "../../shared/StockUtils";
import {axios} from "../../core/UseAxiosApi";

export const useWatchList = () => {
    const [watchList, setWatchList] = useState<StockTickerData[]>([] as StockTickerData[]);
    const [watchListLoading, setWatchListLoading] = useState(true);

    useEffect(() => {
            axios.get('watchlist').then((res) => {
                const stockData: any[] = res.data;
                const tempList: StockTickerData[] = [];
                stockData?.forEach((ticker) => {
                    tempList.push(parseTickerData(ticker));
                })
                setWatchList(tempList);
                setWatchListLoading(false);
            })
        }, []
    );


    const addTicker = async (ticker: string) => {
        return axios.post('watchlist/append', {ticker: ticker}).then((res) => {
            watchList.push(parseTickerData(res.data));
            setWatchList(watchList);
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
        }).catch((err) => {
            console.log("WATCHLIST DELETE ERR", err)
        })
    }

    return {
        watchList,
        watchListLoading,
        addTicker,
        deleteTicker
    };
}