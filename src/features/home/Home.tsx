import {NavBar} from "../../shared/NavBar";
import {WatchList} from "./WatchList";
import {PortfolioTable} from "./PortfolioTable";
import {useUserData} from "../../core/UseUserData";
import {PortfolioGraph} from "./PortfolioGraph";
import {USDollar} from "../../shared/StockUtils";

export const Home = () => {
    const {userData} = useUserData();

    return (
        <div id={"Home"}>
            <NavBar/>
            <div className={"my-4 container mx-auto w-11/12"}>
                {/*todo make numbers a skeleton while they load*/}
                <PortfolioStatusBar portfolioValue={userData.portfolioValue != null ? userData.portfolioValue : 0}
                                    stockValue={userData.stockValue != null ? userData.stockValue : 0}
                                    cashValue={userData.cashValue != null ? userData.cashValue : 0}/>
                <div className={"mt-8 flex flex-row gap-4"}>
                    <PortfolioGraph/>
                    <WatchList/>
                    {/*<div*/}
                    {/*    className={"max-h-screen h-96 overflow-y-auto flex-none max-w-full px-6 bg-teal-950 p-4 rounded-xl basis-1/5 box-border"}>*/}
                    {/*</div>*/}
                </div>
                <PortfolioTable/>

            </div>

        </div>
    )
        ;
};

const PortfolioStatusBar = ({portfolioValue, stockValue, cashValue}: {
    portfolioValue: number,
    stockValue: number,
    cashValue: number
}) => {
    // let val: string = "--value";
    return (
        <div className={"rounded-xl my-4 py-4 px-6 bg-teal-950 flex-row flex"}>
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
        <div className={"mr-6"}>
            <h2 className={"text-3xl font-bold"}>{title}</h2>
            <p className={"ml-1 mt-1 text-lg"}>{USDollar.format(amount)}</p>
        </div>
    )

}