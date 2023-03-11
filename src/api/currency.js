import { axiosRequest } from "./axios.service";
import { convertObjectToArray } from "../utilities/commonFunctions";

export async function getAllCurrencyList() {
    const currency_List = await axiosRequest({ url: 'symbols/', method: 'GET' });
    return Object.values(currency_List.symbols);
}

export async function getTimeSeriesData(start_date, end_date, symbols, base) {
    const timeSeriesArray = await axiosRequest({ url: `timeseries?start_date=${start_date}&end_date=${end_date}&symbols=${symbols}&base=${base}`, method: 'GET' })
    return convertObjectToArray(timeSeriesArray.rates,start_date,end_date)
}

export async function getLatestRate(base,symbols){
    const latestRate = await axiosRequest({url:`latest?base=${base}&symbols=${symbols}`,method: 'GET'})
    return Object.values(latestRate.rates)
}