import {NavBar} from "../../shared/NavBar";
import React from 'react';
import {BarStack} from '@visx/shape';
import {SeriesPoint} from '@visx/shape/lib/types';
import {Group} from '@visx/group';
import {Grid} from '@visx/grid';
import {AxisBottom, AxisLeft} from '@visx/axis';
import cityTemperature, {CityTemperature} from '@visx/mock-data/lib/mocks/cityTemperature';
import {scaleBand, scaleLinear, scaleOrdinal} from '@visx/scale';
import {timeParse, timeFormat} from '@visx/vendor/d3-time-format';
import {useTooltip, useTooltipInPortal, defaultStyles} from '@visx/tooltip';
import {LegendOrdinal} from '@visx/legend';
import {localPoint} from '@visx/event';

type CityName = 'New York' | 'San Francisco' | 'Austin';

//todo: change the cursor crosshair for the graphs
//todo: reorderable thing next to watch list that lets you drag list around
export const Portfolio = () => {
    return (
        <div>
            <NavBar/>
            PORTFOLIO PENDING!!
        </div>
    );
};
const height = 600;
const width = height;

const xAxisScale = scaleLinear({
    domain: [0, 100],
    range: [0, width],
});

const yAxisScale = scaleLinear({
    domain: [0, 100],
    range: [height, 0],
});

const myScale = scaleLinear<number>({
    domain: [0, 100],
    range: [0, width],
    nice: true,
});

type TooltipData = {
    bar: SeriesPoint<CityTemperature>;
    key: CityName;
    index: number;
    height: number;
    width: number;
    x: number;
    y: number;
    color: string;
};

export type BarStackProps = {
    width: number;
    height: number;
    margin?: { top: number; right: number; bottom: number; left: number };
    events?: boolean;
};

const purple1 = '#6c5efb';
const purple2 = '#c998ff';
export const purple3 = '#a44afe';
export const background = '#eaedff';
const defaultMargin = {top: 40, right: 0, bottom: 0, left: 0};
const tooltipStyles = {
    ...defaultStyles,
    minWidth: 60,
    backgroundColor: 'rgba(0,0,0,0.9)',
    color: 'white',
};

const data = cityTemperature.slice(0, 12);
const keys = Object.keys(data[0]).filter((d) => d !== 'date') as CityName[];

const temperatureTotals = data.reduce((allTotals, currentDate) => {
    const totalTemperature = keys.reduce((dailyTotal, k) => {
        dailyTotal += Number(currentDate[k]);
        return dailyTotal;
    }, 0);
    allTotals.push(totalTemperature);
    return allTotals;
}, [] as number[]);

const parseDate = timeParse('%Y-%m-%d');
const format = timeFormat('%b %d');
const formatDate = (date: string) => format(parseDate(date) as Date);

// accessors
const getDate = (d: CityTemperature) => d.date;

// scales
const dateScale = scaleBand<string>({
    domain: data.map(getDate),
    padding: 0.2,
});
const temperatureScale = scaleLinear<number>({
    domain: [0, Math.max(...temperatureTotals)],
    nice: true,
});
const colorScale = scaleOrdinal<CityName, string>({
    domain: keys,
    range: [purple1, purple2, purple3],
});

let tooltipTimeout: number;

export const Graph = () => {
    const {containerRef, TooltipInPortal} = useTooltipInPortal({
        // TooltipInPortal is rendered in a separate child of <body /> and positioned
        // with page coordinates which should be updated on scroll. consider using
        // Tooltip or TooltipWithBounds if you don't need to render inside a Portal
        scroll: true,
    });

    // const tf = (v: number, index: number, ticks: { value: number; index: number }[]) => {
    //     return index === 0 ? 'first' : index === ticks[ticks.length - 1].index ? 'last' : `${v}`,
    //         label
    // :
    //     'linear'
    // };
    const linearTickFormatter = (value: number, index: number, values: { value: number, index: number }[]) => {
        // Check if the current tick is the first or the last
        if (index === 0) {
            return 'first';
        } else if (index === values.length - 1) {
            return 'last';
        }

        // Return the value of the tick
        return value;
    };
    type CityName = 'New York' | 'San Francisco' | 'Austin';

    const data = cityTemperature.slice(0, 12);
    const keys = Object.keys(data[0]).filter((d) => d !== 'date') as CityName[];
    const getDate = (d: CityTemperature) => d.date;
    const dateScale = scaleBand<string>({
        domain: data.map(getDate),
        padding: 0.2,
    });
    dateScale.rangeRound([0, 400]);

    return (
        <div className={"flex align-middle justify-center mb-8"}>
            <svg ref={containerRef} width={width} height={height} className={"flex bg-stone-50"}>
                <rect x={0} y={0} width={width} height={height} fill={"skyblue"} rx={14}/>
                {/* X Axis */}
                {/*<Group>*/}
                {/* X Axis Line */}
                {/*<line*/}
                {/*    x1={0}*/}
                {/*    y1={height}*/}
                {/*    x2={width}*/}
                {/*    y2={height}*/}
                {/*    stroke="blue"*/}
                {/*    strokeWidth={10}*/}
                {/*/>*/}
                <AxisBottom
                    scale={xAxisScale}
                    tickFormat={(val) => `${val}   `}
                    top={height - 100}
                    label="X Axis"
                    numTicks={40}
                    stroke={"red"}
                    tickStroke={"blue"}
                    tickLabelProps={{
                        fill: purple3,
                        fontSize: 11,
                        textAnchor: 'middle',
                    }}
                />
                {/*</Group>*/}

                {/* Y Axis */}
                {/*<Group>*/}
                {/* Y Axis Line */}
                {/*<line*/}
                {/*    x1={0}*/}
                {/*    y1={0}*/}
                {/*    x2={0}*/}
                {/*    y2={height}*/}
                {/*    stroke="blue"*/}
                {/*    strokeWidth={10}*/}

                {/*/>*/}
                {/*<AxisLeft*/}
                {/*    scale={yAxisScale}*/}
                {/*    label="Y Axis"*/}
                {/*    tickFormat={(value) => `${value}`}*/}
                {/*    numTicks={10}*/}
                {/*    stroke={"red"}*/}
                {/*    tickStroke={"blue"}*/}
                {/*    tickLabelProps={{*/}
                {/*        fill: purple3,*/}
                {/*        fontSize: 11,*/}
                {/*        textAnchor: 'middle',*/}
                {/*    }}*/}
                {/*/>*/}
                {/*</Group>*/}

                {/* Data point */}
                <circle cx={xAxisScale(50)} cy={yAxisScale(50)} r={5} fill="blue"/>
            </svg>
        </div>
    );
};


export const MyStockList = () => {
    return (

        <div>
            <AxisBottom
                scale={xAxisScale}
                top={100}
                left={0}
                label={''}
                stroke={'#1b1a1e'}
            />

            MY GRAPH

            <AxisLeft
                scale={yAxisScale}
                top={100}
                left={100}
                label={''}
                stroke={'#1b1a1e'}
            />
        </div>
    )
        ;
}