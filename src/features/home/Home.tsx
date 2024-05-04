import {NavBar} from "../../shared/NavBar";
// import {CSSProperties} from "react";
import {PlusIcon} from "@heroicons/react/24/solid";
import {XCircleIcon} from "@heroicons/react/24/solid";
import {SetStateAction, useState} from "react";
import {WatchList} from "./WatchList";
import {StockChart} from "./StockChart";
import {useCurrentUser} from "../../core/useCurrentUser";
import {USDollar} from "../../shared/UseStockAPI";

export const Home = () => {
    const {cashValue, stockValue, portfolioValue} = useCurrentUser()
    return (
        <div>
            <NavBar/>
            <div className={"my-4 container mx-auto w-11/12"}>
                <PortfolioStatusBar portfolioValue={portfolioValue} stockValue={stockValue} cashValue={cashValue}/>
                <div className={"mt-8 flex flex-row gap-4 items-start"}>
                    <StockChart/>
                    {/*<HomePortfolioChart/>*/}
                    {/*<WatchList/>*/}
                    <div></div>
                </div>

            </div>

        </div>
    );
};

const PortfolioStatusBar = ({portfolioValue, stockValue, cashValue}: {
    portfolioValue: number,
    stockValue: number,
    cashValue: number
}) => {
    // let val: string = "--value";
    return (
        <div className={"rounded-xl my-4 p-4 bg-teal-950 flex-row flex"}>
            <PortfolioStatusCard title="Portfolio Value" amount={portfolioValue}/>
            <PortfolioStatusCard title="Stock Value" amount={stockValue}/>
            <PortfolioStatusCard title="Cash Value" amount={cashValue}/>

            {/*//time till market opens or closes*/}
            {/*<span className="countdown font-mono text-6xl">*/}
            {/*    <span style={{"--value": 32}  as CSSProperties}></span>*/}
            {/*</span>*/}
        </div>

    )
}

const PortfolioStatusCard = ({title, amount}: { title: string, amount: number }) => {
    return (
        <div className={"mx-6"}>
            <h1 className={"text-3xl font-bold"}>{title}</h1>
            <p className={"ml-1 mt-1 text-lg"}>{USDollar.format(amount)}</p>
        </div>
    )

}