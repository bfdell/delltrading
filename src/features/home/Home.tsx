import {NavBar} from "../../shared/NavBar";
import {CSSProperties} from "react";

export const Home = () => {
    return (
        <div>
            <NavBar/>
            <div className={"my-4 container mx-auto w-11/12"}>
                <PortfolioStatusBar/>
                <div className={"flex flex-row"}>
                    <HomePortfolioChart/>
                    <WatchList/>
                </div>
                <PopularStock/>

            </div>

        </div>
    );
};

const PortfolioStatusBar = () => {
    let val: string = "--value";
    return (
        <div className={"rounded-xl my-4 p-4 bg-teal-950 flex-row flex"}>
            <PortfolioStatusCard title="Portfolio Value" amount={"pending"}/>
            <PortfolioStatusCard title="Stock Value" amount={"pending"}/>
            <PortfolioStatusCard title="Cash Value" amount={"pending"}/>

            {/*//time till market opens or closes*/}
            {/*<span className="countdown font-mono text-6xl">*/}
            {/*    <span style={{"--value": 32}  as CSSProperties}></span>*/}
            {/*</span>*/}
        </div>

    )
}

const PortfolioStatusCard = ({title, amount}: { title: string, amount: string }) => {
    return (
        <div className={"mx-4"}>
            <h1>{title}</h1>
            <p>amount</p>
        </div>
    )

}

const HomePortfolioChart = () => {
    return (
        <div className={"basis-4/5"}></div>
    )
}
const WatchList = () => {
    return (
        <div className={"bg-teal-950 p-4 rounded-xl basis-1/5"}>
            <h1>WatchList</h1>
            <div>stock</div>
            <div>stock</div>
            <div>stock</div>
            <div>stock</div>
            <div>stock</div>
            <div>stock</div>
            <div>stock</div>
        </div>
    )
}
const WatchListCard = () => {

}

const PopularStock = () => {
    return (
        <div></div>
    )
}