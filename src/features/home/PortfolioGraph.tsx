import React, {useEffect, useState} from "react";
import {ArrowTrendingUpIcon} from "@heroicons/react/24/solid";
import {GraphAsset, usePortfolioGraph} from "./UsePortfolioGraph";
import useMeasure from "react-use-measure";
import {scaleLinear, scaleOrdinal, scaleTime} from "@visx/scale";
import {AxisBottom, AxisLeft} from "@visx/axis";
import {AreaClosed} from "@visx/shape";
import {LinearGradient} from "@visx/gradient";
import {LegendOrdinal} from '@visx/legend';

//todo: change the cursor crosshair for the graphs
export const PortfolioGraph = () => {
    const {graphData, range, updateRange, graphLoading} = usePortfolioGraph()

    return (
        <div className={"rounded-2xl basis-3/4 bg-blue-950 py-4 px-6 h-fit"}>
            <div className={"flex flex-row justify-end"}>
                <div className={"basis-3/5 flex flex-row items-center gap-3 mb-4"}>
                    <h2 className={"text-3xl font-bold"}>Portfolio Performance</h2>
                    <ArrowTrendingUpIcon className={"size-9 font-bold"}/>
                </div>

                <div className={"basis-2/5 flex flex-row items-center justify-end gap-4"}>
                    <button onClick={() => updateRange("week")}
                            className={"btn btn-sm" + (range === "week" ? " border-white" : "")}>Week
                    </button>
                    <button onClick={() => updateRange("month")}
                            className={"btn btn-sm" + (range === "month" ? " border-white" : "")}>Month
                    </button>
                    <button onClick={() => updateRange("year")}
                            className={"btn btn-sm" + (range === "year" ? " border-white" : "")}>Year
                    </button>
                    <button onClick={() => updateRange("max")}
                            className={"btn btn-sm" + (range === "max" ? " border-white" : "")}>Max
                    </button>
                </div>
            </div>

            <div className={"mt-4"}>
                {!graphLoading && <StockGraph stockData={graphData}/>}
                {graphLoading && <div className={"rounded-2xl h-[500px] bg-gray-600 animate-pulse"}></div>}
            </div>
        </div>
    );
};

type GraphData = {
    date: Date
    value: number
}
export const StockGraph = ({stockData}: { stockData: GraphAsset[] }) => {
    const [ref, bounds] = useMeasure(); // Hook to get the dimensions of the container
    const width = bounds.width;
    const height = bounds.height;
    const margin = {top: 20, right: 0, bottom: 50, left: 10};

    const [stockGraph, setStockGraph] = useState<GraphData[]>([])
    const [completeGraph, setCompleteGraph] = useState<GraphData[]>([])
    const [graphBounds, setGraphBounds] = useState<{ low: number, high: number }>({low: 0, high: 100000})
    const yScale = scaleLinear({
        domain: [graphBounds.low, graphBounds.high],
        range: [height - margin.bottom, margin.top],
    });

    const xScale = scaleTime({
        domain: [Math.min(...stockGraph.map(d => d.date.getTime())), Math.max(...stockGraph.map(d => d.date.getTime()))],
        range: [margin.left, width - margin.right],
    });

    const ordinal = scaleOrdinal({
        domain: ['STOCK', 'STOCK + CASH'],
        range: ['#E9C46A', '#2A9D8F']
    });

    const backgroundOne = '#CAF0F8'
    const backgroundTwo = '#00B4D8'
    const stockArea = '#E9C46A'
    const stockAreaDark = '#765911'
    const completeArea = '#2A9D8F'
    const completeAreaDark = '#113f39'

    useEffect(() => {
        const stockGraphCopy: GraphData[] = [];
        const completeGraphCopy: GraphData[] = []
        if (stockData.length > 0) {
            let min = stockData[0].stockVal
            let max = stockData[0].stockVal
            stockData.forEach((graphAsset, index) => {
                const stockDate = new Date(graphAsset.time);
                stockGraphCopy.push({date: stockDate, value: graphAsset.stockVal})
                completeGraphCopy.push({date: stockDate, value: graphAsset.stockVal + graphAsset.cashVal})

                min = Math.min(min, graphAsset.stockVal);
                max = Math.max(max, graphAsset.cashVal + graphAsset.stockVal)
            })
            setGraphBounds({low: min - 2000, high: max + 5000})
            setStockGraph(stockGraphCopy)
            setCompleteGraph(completeGraphCopy)
        }

    }, [stockData]);


    return (
        <div className={""}>
            <div ref={ref} className="container h-[475px]">
                <svg className={"bg-fuchsia-300 rounded-2xl"} max={width + 20} width={width} height={height}>
                    {/*{width > 0 && height > 0 &&*/}
                    <rect
                        x={0}
                        y={0}
                        width={width}
                        height={height}
                        fill="url(#area-background-gradient)"
                        rx={14}
                    />
                    <LinearGradient id="area-background-gradient" from={backgroundOne} to={backgroundTwo}/>
                    <LinearGradient id="complete-area-gradient" from={completeArea} to={completeArea} toOpacity={0.3}/>
                    <LinearGradient id="stock-area-gradient" from={stockArea} to={stockArea} toOpacity={0.3}/>
                    <AreaClosed
                        data={completeGraph}
                        x={d => xScale(d.date)}
                        y={d => yScale(d.value)}
                        yScale={yScale}
                        stroke={completeAreaDark}
                        fill="url(#complete-area-gradient)"
                        // curve={curveMonotoneX} // Defines the smoothness of the curve
                    />
                    <AreaClosed
                        data={stockGraph}
                        x={d => xScale(d.date)}
                        y={d => yScale(d.value)}
                        yScale={yScale}
                        stroke={stockAreaDark}
                        fill="url(#stock-area-gradient)"
                        // curve={curveMonotoneX} // Defines the smoothness of the curve
                    />
                    <AxisBottom
                        top={yScale(graphBounds.low)}
                        scale={xScale}
                        stroke="black"
                        tickStroke="black"
                    />
                    <AxisLeft
                        scale={yScale}
                        stroke="black"
                        left={width - margin.right}
                        tickStroke="black"
                    />
                    {/*}*/}
                </svg>
            </div>

            <div className="bg-gray-900 rounded-2xl text-xl mt-4 p-2 w-fit justify-center">
                <LegendOrdinal
                    scale={ordinal}
                    direction="row"
                    shapeMargin="0px 5px"
                    itemMargin="0px 20px"
                />
            </div>
        </div>
    );
}

