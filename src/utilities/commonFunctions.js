import { Dimensions, PixelRatio } from 'react-native'
import constant from './constant';

export const screenWidth = Dimensions.get('window').width
export const screenHeight = Dimensions.get('window').height

const heightMobileStandard = 896;
const widthMobileStandard = 414;


export const perfectWidth = (value) => (screenWidth * value) / widthMobileStandard;

export const perfectHeight = (value) => (screenHeight * value) / heightMobileStandard;

export const normalizeFontSize = (size) => {
  //812 is the height for iphoneX as this is the stable and our design 
  return PixelRatio.roundToNearestPixel((size - 1) * (screenHeight / heightMobileStandard))
}

export const convertObjectToArray = (object, selectedDate) => {
  let keyArray = Object.keys(object)
  let valueArray = []

  Object.values(object).forEach(item => {
    valueArray.push(item[Object.keys(item)[0]])
  })

  const latestRate = valueArray[valueArray.length-1]

  let keyArrayFormatted = []

  if(selectedDate == constant.day){
    keyArrayFormatted = keyArray
  }else{
    keyArray.filter((item, index) => {
      if (index % Math.round(keyArray.length/7) == 0) keyArrayFormatted.push(item.slice(5))
    })
  }
  
  return { keyArrayFormatted, valueArray, latestRate }
}


export const calculateStartDate = (selectedDate) => {
  switch (selectedDate) {
    case constant.day:
      let yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
      return yesterday.toISOString().slice(0, 10)
    case constant.month:
      let monthAgo = new Date(new Date().setMonth(new Date().getMonth() - 1));
      return monthAgo.toISOString().slice(0, 10)
    case constant.threeMonth:
      let threeMonthAgo = new Date(new Date().setMonth(new Date().getMonth() - 3));
      return threeMonthAgo.toISOString().slice(0, 10)
    case constant.sixMonth:
      let sixMonthAgo = new Date(new Date().setMonth(new Date().getMonth() - 6));
      return sixMonthAgo.toISOString().slice(0, 10)
    case constant.nineMonth:
      let nineMonthAgo = new Date(new Date().setMonth(new Date().getMonth() - 9));
      return nineMonthAgo.toISOString().slice(0, 10)
    case constant.year:
      let YearAgo = new Date(new Date().setFullYear(new Date().getFullYear() - 1));
      return YearAgo.toISOString().slice(0, 10)
  }
}