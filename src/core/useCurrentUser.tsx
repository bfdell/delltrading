//todo: Move usename and password stuff to here
//todo: change name of this file to useDataContext
import {createContext, PropsWithChildren, useContext, useEffect, useMemo, useState} from "react";
import {StockAsset, usePortfolio} from "../features/home/UsePortfolio";
import {axios} from "./UseAxiosApi";
import {getLogoLink} from "../shared/StockUtils";

type UserNameInfo = {
    firstName: string,
    lastName: string
}

export const useCurrentUser = () => {

    const [displayName, setDisplayName] = useState<UserNameInfo>({firstName: '', lastName: ''});
    const [cashValue, setCashValue] = useState<number>(0);
    const [stockValue, setStockValue] = useState<number>(0);
    const [portfolioValue, setPortfolioValue] = useState<number>(0);
    const [portfolioUpdated, setPortfolioUpdated] = useState(false);
    const userApiPath = "users";

    useEffect(() => {
        return () => console.log('user info unmounted');
    }, []);

    return {displayName, cashValue, stockValue, portfolioValue};
}

type UserData = {
    firstName: string,
    lastName: string,
    cashValue: number,
    stockValue: number,
    portfolioValue: number,
    portfolio: StockAsset[];
}

type UserContext = {
    userData: UserData
    updateAfterSell: Function,
    updateAfterBuy: Function,
}

export const UserDataContext = createContext<UserContext>({} as UserContext,);
const parsePortfolioTickerData = (rawTickerData: any, shares: number): StockAsset => {
    return {
        ticker: rawTickerData.symbol,
        name: rawTickerData.name,
        shares: shares,
        price: rawTickerData.close,
        percentChange: rawTickerData.percent_change,
        logoUrl: getLogoLink(rawTickerData.symbol)
    };
}
//Create a provider
export const UserDataProvider = ({children}: PropsWithChildren) => {
    const [userState, setUserState] = useState<UserData>({} as UserData);

    const updateAfterSell = (asset: StockAsset, shares: number) => {
        let profit = asset.price * shares;
        if (shares === asset.shares) {
            userState.portfolio = userState.portfolio.filter((stock) => stock.ticker !== asset.ticker);
        } else {
            asset.shares -= shares;
        }
        const updatedState = {
            ...userState,
            stockValue: userState.stockValue - profit,
            cashValue: userState.cashValue + profit,
            portfolioValue: (userState.stockValue - profit) + (userState.cashValue + profit),
            portfolio: userState.portfolio
        };
        setUserState(updatedState);
    }

    const updateAfterBuy = (asset: StockAsset, shares: number) => {
        let spent = asset.price * shares;
        const updatedState = {
            ...userState,
            stockValue: userState.stockValue + spent,
            cashValue: userState.cashValue - spent,
            portfolioValue: (userState.stockValue + spent) + (userState.cashValue - spent),
            portfolio: userState.portfolio
        };

        let portfolioAsset = updatedState.portfolio.find((stock) => stock.ticker === asset.ticker);
        if (portfolioAsset !== undefined) {
            portfolioAsset.shares += shares;
        } else {
            portfolioAsset = {
                ticker: asset.ticker,
                name: asset.name,
                price: asset.price,
                logoUrl: asset.logoUrl,
                percentChange: asset.percentChange,
                shares: shares,
            }
            updatedState.portfolio.push(portfolioAsset);
        }

        setUserState(updatedState);
    }

    useEffect(() => {
        console.log("FETCHING ALL USER INFO");
        const fetchData = async () => {
            try {
                let res = await axios.get(`users/info`);
                let resData = res.data;
                let portfolioRes = await axios.get('portfolio');

                const rawPortfolio: any[] = portfolioRes.data;
                let stockTotal = 0;
                const portfolioData: StockAsset[] = [];
                rawPortfolio?.forEach((entry) => {
                    let asset = parsePortfolioTickerData(entry, entry.shares);
                    stockTotal += asset.shares * asset.price;
                    portfolioData.push(asset);
                });

                setUserState({
                    firstName: resData.first_name,
                    lastName: resData.last_name,
                    cashValue: resData.cash,
                    stockValue: stockTotal,
                    portfolioValue: stockTotal + resData.cash,
                    portfolio: portfolioData
                } as UserData);

            } catch (error) {
                console.log("error retrieving user data", error)
            }
        };
        fetchData();
    }, []);


    //todo: loading spinners across components while user state is equal to null instead of blocking all rendering
    return (
        <UserDataContext.Provider value={{
            userData: userState,
            updateAfterSell: updateAfterSell,
            updateAfterBuy: updateAfterBuy,
        }}>
            {children}
        </UserDataContext.Provider>
    );
};

export const useUserData = () => {
    return useContext(UserDataContext);
};
