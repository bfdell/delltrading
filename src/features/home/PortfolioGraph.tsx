import React from "react";
import {ChartComponent, initialData} from "../../App";
import {ArrowTrendingUpIcon} from "@heroicons/react/24/solid";

export const PortfolioGraph = () => {
    return (
        <div className={"rounded-2xl basis-3/4 bg-blue-950 py-4 px-6 self-stretch"}>
            <div className={"flex flex-row justify-end"}>
                <div className={"basis-3/5 flex flex-row items-center gap-3 mb-4"}>
                    <h2 className={"text-3xl font-bold"}>Portfolio Performance</h2>
                    <ArrowTrendingUpIcon className={"size-9 font-bold"}/>
                </div>

                <div className={"basis-2/5 flex flex-row items-center justify-end gap-4"}>
                    <button className={"btn btn-sm"}>Week</button>
                    <button className={"btn btn-sm"}>Month</button>
                    <button className={"btn btn-sm"}>Year</button>
                    <button className={"btn btn-sm"}>Max</button>
                </div>
            </div>

            <div className={"mt-4 h-full rounded-2xl"}>
                <ChartComponent data={initialData}/>
            </div>
        </div>
    );
};