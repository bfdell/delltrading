import {useState, useEffect} from 'react';
import {useUserData} from "../../core/UseUserData";
import {axios} from "../../core/UseAxiosApi";

export type GraphAsset = {
    time: string,
    stockVal: number
    cashVal: number
}

//todo: loading screen while graph is being updated
export const usePortfolioGraph = () => {
    const userState = useUserData();
    const [graphData, setGraphData] = useState<GraphAsset[]>([])
    const [range, setRange] = useState("week")


    //TODO: clean this up
    useEffect(() => {
        const graphArr: GraphAsset[] = [...graphData]
        graphArr.push({
            time: '2024-10-07',
            stockVal: userState.userData.stockValue,
            cashVal: userState.userData.cashValue
        });
        setGraphData(graphArr);
    }, [userState]);

    useEffect(() => {
        axios.get('portfolio/graph', {
            params: {
                range: range
            }
        }).then((res) => {
            console.log(res);

            const dataArr: any[] = res.data
            const graphArr: GraphAsset[] = []
            dataArr.forEach((asset) => {
                graphArr.push({
                    time: asset.date,
                    stockVal: asset.stock_assets,
                    cashVal: asset.cash,
                })
            })
            setGraphData(graphArr)
            console.log(graphArr)
        }).catch((err) => {
            console.log("failed to retrieve graphs", err)
        })

    }, [range]);

    return {
        graphData,
        range,
        setRange,
    }
}