import React, {LegacyRef, PropsWithChildren, useEffect, useRef} from 'react';
import './App.css';
import {Login} from "./features/authentication/Login";
import {SignUp} from "./features/authentication/SignUp";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {Home} from "./features/home/Home";
import {Profile} from "./features/profile/Profile";
import {Compare} from "./features/compare/Compare";
import {Simulations} from "./features/simulations/Simulations";
import {RouteGuard} from "./core/RouteGuard";
import {StockGraph, TestGraph} from "./shared/StockGraphs";
import {FirebaseAuthProvider} from "./core/FirebaseConfig";

import {
    ColorType,
    IChartApi,
    createChart,
    DeepPartial,
    TimeChartOptions,
    ISeriesApi,
    Background, LineStyle
} from 'lightweight-charts';

function App() {
//todo: Create error boundary element
    const router = createBrowserRouter([
        {
            path: 'login',
            element: (<RouteGuard><Login/></RouteGuard>)
        },
        {
            path: 'signup',
            element: (<RouteGuard><SignUp/></RouteGuard>)
        },
        {
            path: '',
            element: (<RouteGuard><Home/></RouteGuard>)
        },
        {
            path: 'home',
            element: (<RouteGuard><Home/></RouteGuard>)
        },
        {
            path: 'simulations',
            element: (<RouteGuard><Simulations/></RouteGuard>)
        },
        {
            path: 'compare',
            element: (<RouteGuard><Compare/></RouteGuard>)
        },
        {
            path: 'profile',
            element: (<RouteGuard><Profile/></RouteGuard>)
        },
        //TODO:REMOVE ...USED FOR TESTING
        {
            path: 'test',
            element: (<RouteGuard><TestGraph width={500} height={500}/></RouteGuard>)
        }
    ])

    return (
        <div>
            <FirebaseAuthProvider>
                <RouterProvider router={router}/>
                {/*<ChartOne/>*/}
                {/*<div className={"flex h-1/2 w-full gap-2 flex-row"}>*/}
                {/*    <LWeight/>*/}
                {/*    <LWeight/>*/}
                {/*    <LWeight/>*/}
                {/*    <LWeight/>*/}
                {/*</div>*/}
            </FirebaseAuthProvider>
        </div>
    );
}

export default App;
//todo: https://tradingview.github.io/lightweight-charts/docs
//todo: You shall add the "attribution notice" from the NOTICE file and a link to https://www.tradingview.com/ to the page of your website or mobile application that is available to your users.
//
// As thanks for creating Lightweight Charts™, we'd be grateful if you add the attribution notice in a prominent place.
const ChartOne = () => {
    const chartRef = useRef<HTMLDivElement>(null);
    const chartOptions = {layout: {textColor: 'black', background: {type: 'solid', color: 'white'}}};

    useEffect(() => {
        if (!chartRef.current) return;

        const chart = createChart(chartRef.current, chartOptions as DeepPartial<TimeChartOptions>);

        const areaSeries = chart.addAreaSeries({
            lineColor: '#2962FF', topColor: '#2962FF',
            bottomColor: 'rgba(41, 98, 255, 0.28)',
        });
        areaSeries.setData([
            {time: '2018-12-22', value: 32.51},
            {time: '2018-12-23', value: 31.11},
            {time: '2018-12-24', value: 27.02},
            {time: '2018-12-25', value: 27.32},
            {time: '2018-12-26', value: 25.17},
            {time: '2018-12-27', value: 28.89},
            {time: '2018-12-28', value: 25.46},
            {time: '2018-12-29', value: 23.92},
            {time: '2018-12-30', value: 22.68},
            {time: '2018-12-31', value: 22.67},
        ]);

        const candlestickSeries = chart.addCandlestickSeries({
            upColor: '#26a69a', downColor: '#ef5350', borderVisible: false,
            wickUpColor: '#26a69a', wickDownColor: '#ef5350',
        });
        candlestickSeries.setData([
            {time: '2018-12-22', open: 75.16, high: 82.84, low: 36.16, close: 45.72},
            {time: '2018-12-23', open: 45.12, high: 53.90, low: 45.12, close: 48.09},
            {time: '2018-12-24', open: 60.71, high: 60.71, low: 53.39, close: 59.29},
            {time: '2018-12-25', open: 68.26, high: 68.26, low: 59.04, close: 60.50},
            {time: '2018-12-26', open: 67.71, high: 105.85, low: 66.67, close: 91.04},
            {time: '2018-12-27', open: 91.04, high: 121.40, low: 82.70, close: 111.40},
            {time: '2018-12-28', open: 111.51, high: 142.83, low: 103.34, close: 131.25},
            {time: '2018-12-29', open: 131.33, high: 151.17, low: 77.68, close: 96.43},
            {time: '2018-12-30', open: 106.33, high: 110.20, low: 90.39, close: 98.10},
            {time: '2018-12-31', open: 109.87, high: 114.69, low: 85.66, close: 111.26},
        ]);

        chart.timeScale().fitContent();
        return () => {
            chart.remove()
        };
    }, [])

    return (
        <div className={"flex"}>
            <div className={"min-w-80  min-h-80 w-full h-full"} ref={chartRef}></div>
        </div>
    )
}


interface ChartProps {
    data: { time: string, value: number }[];
    colors?: {
        background?: Background;
        lineColor?: string;
        textColor?: string;
        areaTopColor?: string;
        areaBottomColor?: string;
    };
}

export const ChartComponent: React.FC<ChartProps> = ({data, colors}) => {
    const {
        background = {
            // color: 'rgb(23,37, 84)',
            color: 'rgba(0, 0, 0,0.5)',
            type: ColorType.Solid
        } as Background,
        lineColor = '#2962FF',
        // lineColor = 'rgba(41, 96, 255, 0.28)',
        textColor = 'white',
        areaTopColor = '#2962FF',
        areaBottomColor = 'rgba(41, 98, 255, 0.28)',
    } = colors || {};

    const chartContainerRef = useRef<HTMLDivElement>(null);
    const chartRef = useRef<ISeriesApi<'Area'>>();

    useEffect(() => {
        if (!chartContainerRef.current) return;

        const chart = createChart(chartContainerRef.current, {
            layout: {
                background,
                textColor,
            },
            width: chartContainerRef.current.clientWidth,
            // width: 300,
            height: chartContainerRef.current.clientHeight,
            // height: 300,
            kineticScroll: {
                touch: false,
                mouse: false
            },
            handleScale: {
                // mouseWheel: false,
                axisPressedMouseMove: false,
                pinch: false,
                axisDoubleClickReset: false,
            },
            handleScroll: {
                mouseWheel: false,
                // pressedMouseMove: false,
                horzTouchDrag: false,
                vertTouchDrag: false,
            },
            rightPriceScale: {
                borderVisible: false
            },
            grid: {
                vertLines: {
                    color: 'rgb(55,65,81)',
                    // color: 'rgb(3,7,18)',
                    style: LineStyle.LargeDashed,
                    // visible: false
                },
                horzLines: {
                    // color: 'rgb(3,7,18)',
                    color: 'rgb(55,65,81)',
                    style: LineStyle.LargeDashed
                }
            }
        });
        chart.timeScale().fitContent();

        const newSeries = chart.addAreaSeries({lineColor, topColor: areaTopColor, bottomColor: areaBottomColor});
        newSeries.setData(data);

        chartRef.current = newSeries;

        const handleResize = () => {
            if (chartContainerRef.current) {
                chart.applyOptions({
                    width: chartContainerRef.current.clientWidth,
                    height: chartContainerRef.current.clientHeight,
                });
            }
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            chart.remove();
        };
    }, [data, background, lineColor, textColor, areaTopColor, areaBottomColor]);

    return <div className={'h-full w-full rounded-2xl overflow-clip'}
                ref={chartContainerRef}/>;
};

export const initialData = [
    {time: '2018-12-22', value: 32.51},
    {time: '2018-12-23', value: 31.11},
    {time: '2018-12-24', value: 27.02},
    {time: '2018-12-25', value: 27.32},
    {time: '2018-12-26', value: 25.17},
    {time: '2018-12-27', value: 28.89},
    {time: '2018-12-28', value: 25.46},
    {time: '2018-12-29', value: 23.92},
    {time: '2018-12-30', value: 22.68},
    {time: '2018-12-31', value: 22.67},
    {time: '2019-01-01', value: 22.67},
    {time: '2019-01-02', value: 42.67},
    {time: '2019-01-03', value: 82.67},
    {time: '2019-01-04', value: 2.67},
    {time: '2019-01-05', value: 14.67},
];

export const LWeight = () => {
    return (
        <div className={"basis-1/4 rounded-2xl bg-white my-4 p-5"}>
            <ChartComponent data={initialData}/>
        </div>
    );
};