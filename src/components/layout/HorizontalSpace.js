import React from 'react'
import { View } from 'react-native'

const HorizontalSpace = ({ children, width }) => {
  return <View style={{width:width?width:16}}>{children}</View>
}


export default HorizontalSpace
