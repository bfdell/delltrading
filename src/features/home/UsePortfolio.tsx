import {StockTickerData} from "../../shared/StockUtils";
import {useUserData} from "../../core/UseUserData";
import {axios} from "../../core/UseAxiosApi";

export type StockAsset = {
    name: string,
    price: number
    percentChange: string
    logoUrl: string
    ticker: string,
    shares: number
}

export const usePortfolio = () => {
    const userState = useUserData();

    const buyStock = async (stock: StockTickerData, shares: number) => {
        return axios.post('portfolio/buy', {ticker: stock.ticker, shares: shares}).then((res) => {
            console.log(res);
        })
    }

    const sellStock = async (stock: StockAsset, shares: number) => {
        return axios.post('portfolio/sell', {ticker: stock.ticker, shares: shares}).then((res) => {
            console.log(res);
        })
    }

    const portfolio = userState.userData.portfolio;
    const portfolioLoading = userState.userLoading;
    return {
        buyStock,
        sellStock,
        portfolio,
        portfolioLoading
    }
}