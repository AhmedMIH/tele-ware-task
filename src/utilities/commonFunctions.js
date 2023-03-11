import { Dimensions, PixelRatio } from 'react-native'

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

export const convertObjectToArray = (object, start_date, end_date) => {
  var time_difference = new Date(end_date).getTime() - new Date(start_date).getTime()  
  //calculate days difference by dividing total milliseconds in a day  
  var days_difference = time_difference / (1000 * 60 * 60 * 24)

  const today = new Date().toISOString().slice(0, 10)

  let keyArray = Object.keys(object)
  const indexOfToday = keyArray.indexOf(today)
  let valueArray = []
  Object.values(object).forEach(item => {
    valueArray.push(item[Object.keys(item)[0]])
  })

  const latestRate = valueArray[indexOfToday]
 
  let keyArrayFormatted = []

  switch (days_difference) {
    case 1:
      keyArrayFormatted = keyArray
      break;
    case 28:
      keyArray.filter((item, index) => {
        if (index % 4 == 0) keyArrayFormatted.push(item.slice(5))
      })
      break;
    case 90:
      keyArray.filter((item, index) => {
        if (index % 15 == 0) keyArrayFormatted.push(item.slice(5))
      })
      break

    case 181:
      keyArray.filter((item, index) => {
        if (index % 30 == 0) keyArrayFormatted.push(item.slice(5))
      })
      break

    case 273:
      keyArray.filter((item, index) => {
        if (index % 45 == 0) keyArrayFormatted.push(item.slice(5))
      })
      break

    case 365:
      keyArray.filter((item, index) => {
        if (index % 60 == 0) keyArrayFormatted.push(item.slice(5))
      })
      break
  }



  return { keyArrayFormatted, valueArray,latestRate }

}

export const   calculateStartDate = (selectedDate) => {
  switch (selectedDate) {
    case '1D':
      let yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
      return yesterday.toISOString().slice(0, 10)
    case '1M':
      let monthAgo = new Date(new Date().setMonth(new Date().getMonth() - 1));
      return monthAgo.toISOString().slice(0, 10)
    case '3M':
      let threeMonthAgo = new Date(new Date().setMonth(new Date().getMonth() - 3));
      return threeMonthAgo.toISOString().slice(0, 10)
    case '6M':
      let sixMonthAgo = new Date(new Date().setMonth(new Date().getMonth() - 6));
      return sixMonthAgo.toISOString().slice(0, 10)
    case '9M':
      let nineMonthAgo = new Date(new Date().setMonth(new Date().getMonth() - 9));
      return nineMonthAgo.toISOString().slice(0, 10)
    case '1Y':
      let YearAgo = new Date(new Date().setFullYear(new Date().getFullYear() - 1));
      return YearAgo.toISOString().slice(0, 10)
  }
}