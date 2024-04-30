import ParentSize from '@visx/responsive/lib/components/ParentSize';
import React, {useMemo, useCallback} from 'react';
import {AreaClosed, Line, Bar} from '@visx/shape';
import appleStock, {AppleStock} from '@visx/mock-data/lib/mocks/appleStock';
import {curveMonotoneX} from '@visx/curve';
import {GridRows, GridColumns} from '@visx/grid';
import {scaleTime, scaleLinear, scaleBand} from '@visx/scale';
import {withTooltip, Tooltip, TooltipWithBounds, defaultStyles, useTooltipInPortal} from '@visx/tooltip';
import {WithTooltipProvidedProps} from '@visx/tooltip/lib/enhancers/withTooltip';
import {localPoint} from '@visx/event';
import {LinearGradient} from '@visx/gradient';
import {max, extent, bisector} from '@visx/vendor/d3-array';
import {timeFormat, timeParse} from '@visx/vendor/d3-time-format';
import {AxisBottom, AxisLeft} from "@visx/axis"
import {Group} from "@visx/group";
import {purple3} from "../../Test";
import cityTemperature, {CityTemperature} from '@visx/mock-data/lib/mocks/cityTemperature';

type TooltipData = AppleStock;

const stock = appleStock.slice(800);
export const background = '#3b6978';
export const background2 = '#204051';
export const accentColor = '#edffea';
export const accentColorDark = '#75daad';
const tooltipStyles = {
    ...defaultStyles,
    background,
    border: '1px solid white',
    color: 'white',
};

// util
// const formatDate = timeFormat("%b %d, '%y");
const parseDate = timeParse('%Y-%m-%d');
const format = timeFormat('%b %d');
const formatDate = (date: string) => format(parseDate(date) as Date);
// accessors
const getDate = (d: AppleStock) => new Date(d.date);
const getStockValue = (d: AppleStock) => d.close;
const bisectDate = bisector<AppleStock, Date>((d) => new Date(d.date)).left;

export type AreaProps = {
    width: number;
    height: number;
    margin?: { top: number; right: number; bottom: number; left: number };
};

// export const Portfolio = () => {
//     return (
//         <></>
//     );
// };
//

const width = 600;
const height = 600;
const box_width = 400;
const box_height = 400;

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
    // return (
    //
    //     <div>
    //         <Axis.AxisBottom
    //             scale={xScale}
    //             top={100}
    //             left={0}
    //             label={''}
    //             stroke={'#1b1a1e'}
    //         />
    //
    //         MY GRAPH
    //
    //         <Axis.AxisLeft
    //             scale={yScale}
    //             top={100}
    //             left={100}
    //             label={''}
    //             stroke={'#1b1a1e'}
    //         />
    //     </div>
    // )
    //     ;
}

export default withTooltip<AreaProps, TooltipData>(
    ({
         width,
         height,
         margin = {top: 0, right: 0, bottom: 0, left: 0},
         showTooltip,
         hideTooltip,
         tooltipData,
         tooltipTop = 0,
         tooltipLeft = 0,
     }: AreaProps & WithTooltipProvidedProps<TooltipData>) => {
        if (width < 10) return null;

        // bounds
        const innerWidth = width - margin.left - margin.right;
        const innerHeight = height - margin.top - margin.bottom;

        // scales
        const dateScale = useMemo(
            () =>
                scaleTime({
                    range: [margin.left, innerWidth + margin.left],
                    domain: extent(stock, getDate) as [Date, Date],
                }),
            [innerWidth, margin.left],
        );
        const stockValueScale = useMemo(
            () =>
                scaleLinear({
                    range: [innerHeight + margin.top, margin.top],
                    domain: [0, (max(stock, getStockValue) || 0) + innerHeight / 3],
                    nice: true,
                }),
            [margin.top, innerHeight],
        );

        // tooltip handler
        const handleTooltip = useCallback(
            (event: React.TouchEvent<SVGRectElement> | React.MouseEvent<SVGRectElement>) => {
                const {x} = localPoint(event) || {x: 0};
                const x0 = dateScale.invert(x);
                const index = bisectDate(stock, x0, 1);
                const d0 = stock[index - 1];
                const d1 = stock[index];
                let d = d0;
                if (d1 && getDate(d1)) {
                    d = x0.valueOf() - getDate(d0).valueOf() > getDate(d1).valueOf() - x0.valueOf() ? d1 : d0;
                }
                showTooltip({
                    tooltipData: d,
                    tooltipLeft: x,
                    tooltipTop: stockValueScale(getStockValue(d)),
                });
            },
            [showTooltip, stockValueScale, dateScale],
        );

        return (
            <div>
                <svg width={width} height={height}>
                    <rect
                        x={0}
                        y={0}
                        width={width}
                        height={height}
                        fill="url(#area-background-gradient)"
                        rx={14}
                    />
                    <LinearGradient id="area-background-gradient" from={background} to={background2}/>
                    <LinearGradient id="area-gradient" from={accentColor} to={accentColor} toOpacity={0.1}/>
                    <GridRows
                        left={margin.left}
                        scale={stockValueScale}
                        width={innerWidth}
                        strokeDasharray="1,3"
                        stroke={accentColor}
                        strokeOpacity={0}
                        pointerEvents="none"
                    />
                    <GridColumns
                        top={margin.top}
                        scale={dateScale}
                        height={innerHeight}
                        strokeDasharray="1,3"
                        stroke={accentColor}
                        strokeOpacity={0.2}
                        pointerEvents="none"
                    />
                    <AreaClosed<AppleStock>
                        data={stock}
                        x={(d) => dateScale(getDate(d)) ?? 0}
                        y={(d) => stockValueScale(getStockValue(d)) ?? 0}
                        yScale={stockValueScale}
                        strokeWidth={1}
                        stroke="url(#area-gradient)"
                        fill="url(#area-gradient)"
                        curve={curveMonotoneX}
                    />
                    <Bar
                        x={margin.left}
                        y={margin.top}
                        width={innerWidth}
                        height={innerHeight}
                        fill="transparent"
                        rx={14}
                        onTouchStart={handleTooltip}
                        onTouchMove={handleTooltip}
                        onMouseMove={handleTooltip}
                        onMouseLeave={() => hideTooltip()}
                    />
                    {tooltipData && (
                        <g>
                            <Line
                                from={{x: tooltipLeft, y: margin.top}}
                                to={{x: tooltipLeft, y: innerHeight + margin.top}}
                                stroke={accentColorDark}
                                strokeWidth={2}
                                pointerEvents="none"
                                strokeDasharray="5,2"
                            />
                            <circle
                                cx={tooltipLeft}
                                cy={tooltipTop + 1}
                                r={4}
                                fill="black"
                                fillOpacity={0.1}
                                stroke="black"
                                strokeOpacity={0.1}
                                strokeWidth={2}
                                pointerEvents="none"
                            />
                            <circle
                                cx={tooltipLeft}
                                cy={tooltipTop}
                                r={4}
                                fill={accentColorDark}
                                stroke="white"
                                strokeWidth={2}
                                pointerEvents="none"
                            />
                        </g>
                    )}
                </svg>
                {tooltipData && (
                    <div>
                        <TooltipWithBounds
                            key={Math.random()}
                            top={tooltipTop - 12}
                            left={tooltipLeft + 12}
                            style={tooltipStyles}
                        >
                            {`$${getStockValue(tooltipData)}`}
                        </TooltipWithBounds>
                        <Tooltip
                            top={innerHeight + margin.top - 14}
                            left={tooltipLeft}
                            style={{
                                ...defaultStyles,
                                minWidth: 72,
                                textAlign: 'center',
                                transform: 'translateX(-50%)',
                            }}
                        >
                            {/*{formatDate(getDate(tooltipData))}*/}
                        </Tooltip>
                    </div>
                )}
            </div>
        );
    },
);