import {useState, useEffect, useRef} from 'react';
import {useUserData} from "../../core/UseUserData";
import {axios} from "../../core/UseAxiosApi";

export type GraphAsset = {
    time: string,
    stockVal: number
    cashVal: number
}

export const usePortfolioGraph = () => {
    const userState = useUserData();
    const [graphData, setGraphData] = useState<GraphAsset[]>([])
    const [range, setRange] = useState("week")
    const currentRange = useRef("week")
    const [graphLoading, setGraphLoading] = useState(true);

    const updateRange = (newRange: string) => {
        setRange(() => newRange);
        currentRange.current = newRange;
        setGraphLoading(() => true);
    }

    useEffect(() => {
        if (!userState.userLoading) {
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
                graphArr.push({
                    time: new Date().toLocaleDateString('en-CA'),
                    stockVal: userState.userData.stockValue,
                    cashVal: userState.userData.cashValue
                });
                //only update graph is this request is the most recent one
                //this makes sure that if we change the range multiple times before a request can finish,
                //it only updates once.
                if (currentRange.current === range) {
                    setGraphData(graphArr)
                    console.log(graphArr)
                    setGraphLoading(false)
                }
            }).catch((err) => {
                console.log("failed to retrieve graphs", err)
            })
        }
    }, [userState.userLoading, userState, range]);

    return {
        graphData,
        range,
        updateRange,
        graphLoading
    }
}