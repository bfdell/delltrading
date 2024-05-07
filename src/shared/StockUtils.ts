import {useStockAPI} from "./UseStockAPI";
import exp from "node:constants";

export type StockTickerData = {
    ticker: string,
    name: string,
    price: number,
    logoUrl?: string
    percentChange: string
}
export const parseTickerData = (rawTickerData: any): StockTickerData => {

    return {
        ticker: rawTickerData.symbol,
        name: rawTickerData.name,
        price: rawTickerData.open,
        percentChange: rawTickerData.percent_change,
        logoUrl: getLogoLink(rawTickerData.symbol)
    };
}

export const getLogoLink = (ticker: string): string => {
    const LOGO_WEB_LINK = "https://companiesmarketcap.com/img/company-logos/64"
    return `${LOGO_WEB_LINK}/${ticker}.png`
}