import { axiosRequest } from "./axios.service";
import { calculateStartDate, convertObjectToArray } from "../utilities/commonFunctions";

export async function getAllCurrencyList() {
    const currency_List = await axiosRequest({ url: 'symbols/', method: 'GET' });
    return Object.values(currency_List.symbols);
}

export async function getTimeSeriesData(selectedDate, symbols, base) {
    const start_date = calculateStartDate(selectedDate)
    const end_date = new Date().toISOString().slice(0,10)
    const timeSeriesArray = await axiosRequest({ url: `timeseries?start_date=${start_date}&end_date=${end_date}&symbols=${symbols}&base=${base}`, method: 'GET' })
    return convertObjectToArray(timeSeriesArray.rates,selectedDate)
}

//i didn't  use this endpoint
export async function getLatestRate(base,symbols){
    const latestRate = await axiosRequest({url:`latest?base=${base}&symbols=${symbols}`,method: 'GET'})
    return Object.values(latestRate.rates)
}