const axios = require('axios');
const { getAllCurrencyList,getTimeSeriesData } = require('../src/api/currency');
const { default: constant } = require('../src/utilities/constant');


describe('fetching currency list', () => {
    it('returning correct data', async () => {
        const results = await getAllCurrencyList() ;
        expect(results).toBeDefined()
        expect(results).toHaveLength(171)
    })
});

describe('fetching currency exchange  for day between EGP and USD',  ()=>{
    it('returning correct data', async () => {
        const results = await getTimeSeriesData(constant.day,'EGP',"USD") ;
        expect(results.valueArray).toBeDefined()
        expect(results.keyArrayFormatted).toBeDefined()
        expect(results.latestRate).toBeDefined()
        expect(results.valueArray).toHaveLength(2) 
    })
})