import { View, Text, FlatList, TouchableOpacity, Image, Dimensions, SafeAreaView } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { LineChart } from 'react-native-line-chart'
import Spinner from 'react-native-loading-spinner-overlay'
import { getAllCurrencyList, getTimeSeriesData } from '../api/currency'
import Row from '../components/layout/Row'
import SelectionCurrencyModal from '../components/SelectionCurrencyModal'
import { calculateStartDate, normalizeFontSize, perfectWidth, perfectHeight } from '../utilities/commonFunctions'
import colors from '../utilities/colors'
import usePermission from '../hooks/usePermission'

const CurrencyChartScreen = () => {
  // usePermission()
  const width = Dimensions.get('window').width
  const [currencyList, setCurrencyList] = useState([])
  const [showCurrencyModal, setShowCurrencyModal] = useState(false)
  const [symbol, setSymbol] = useState('EGP')
  const [base, setBase] = useState('USD')
  const [currentChange, setCurrentChange] = useState();
  const [selectedDate, setSelectedDate] = useState('1D')
  const [timeSeriesDataList, setTimeSeriesDataList] = useState([])

  const [showChart, setShowChart] = useState(false)



  const dateOptions = [
    "1D", "1M", "3M", "6M", "9M", "1Y"
  ]

  const getCurrencyList = async () => {
    const currencyList = await getAllCurrencyList()
    setCurrencyList(currencyList)
  }

  const flipCurrency = () => {
    const baseValue = base
    const symbolValue = symbol
    setBase(symbolValue)
    setSymbol(baseValue)
  }
  const getTimeSeriesDataList = async () => {
    setShowChart(false)
    const endDate = new Date().toISOString()
    const formattedEndDate = endDate.slice(0, 10)
    const startDate = calculateStartDate(selectedDate)
    const list = await getTimeSeriesData(startDate, formattedEndDate, symbol, base)
    setTimeSeriesDataList(list)
    setShowChart(true)
  }

  useLayoutEffect(() => {
    getCurrencyList()
  }, [])

  useEffect(() => {
    getTimeSeriesDataList()
  }, [selectedDate, symbol, base])

  const changeCurrency = (value) => {
    if (currentChange == 'base') {
      setBase(value)
    } else {
      setSymbol(value)
    }
  }

  const _renderItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => { setSelectedDate(item) }} style={{ backgroundColor: selectedDate == item ? colors.mainColor : "white", paddingHorizontal: 15, borderColor: selectedDate == item ? colors.mainColor : "#77838F", borderWidth: 1, paddingVertical: 10, marginHorizontal: 6, justifyContent: 'center', borderRadius: 15 }}>
        <Text style={{ fontSize: normalizeFontSize(16),fontWeight:'600', color: selectedDate == item ? 'white' : colors.textColor }}>{item}</Text>
      </TouchableOpacity>
    )
  }



  return (
    <View style={{ backgroundColor:'#FFFFFF',paddingTop: perfectHeight(80), flex: 1 }}>
      <Spinner visible={!showChart} />
      <SelectionCurrencyModal onSelect={(value) => changeCurrency(value)} data={currencyList} isVisible={showCurrencyModal} toggleModal={() => { setShowCurrencyModal(false) }} />
      <Row margin={30} borderRadius={20} borderColor={colors.disabledButtonColor} borderWidth={1} paddingHorizontal={40} paddingVertical={12} justifyContent={'space-between'}>
        <TouchableOpacity onPress={() => { setShowCurrencyModal(true), setCurrentChange('base') }} style={{ backgroundColor: colors.mainColorOpacity, padding: 12, borderRadius: 15 }}>
          <Row paddingHorizontal={8}>
            <Text style={{fontWeight:'500',fontSize:normalizeFontSize(14)}}>{base}</Text>
            <Image style={{marginLeft:8,height:14,width:14}} source={require('../assets/down.png')} />
          </Row>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => flipCurrency()}>
          <Image source={require('../assets/flip.png')} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { setShowCurrencyModal(true), setCurrentChange('symbol') }} style={{ backgroundColor: colors.mainColorOpacity, padding: 12, borderRadius: 15 }}>
          <Row paddingHorizontal={8}>
            <Text style={{fontWeight:'500',fontSize:normalizeFontSize(14)}}>{symbol}</Text>
            <Image style={{marginLeft:8,height:14,width:14}} source={require('../assets/down.png')} />
          </Row>
        </TouchableOpacity>
      </Row>
      <View style={{ alignItems: 'center' }}>
        {showChart && <LineChart
          data={{
            labels: timeSeriesDataList.keyArrayFormatted,
            datasets: [{
              data: timeSeriesDataList.valueArray
            }]
          }}
          width={perfectWidth(width - 16)}
          height={perfectHeight(300)}
          chartConfig={{
            backgroundColor: '#FFFFFF',
            backgroundGradientFrom: '#FFFFFF',
            backgroundGradientTo: "#FFF",
            color: () => colors.mainColor,
          }}
          bezier
          style={{
            marginVertical: perfectHeight(16),
            borderRadius: 16,
          }}
        />}
      </View>
      <View style={{ alignItems: 'center' ,paddingHorizontal:8}}>
        <FlatList horizontal data={dateOptions} keyExtractor={item => item} renderItem={_renderItem} />
      </View>


    </View>
  )
}

export default CurrencyChartScreen