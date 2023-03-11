import React from 'react'
import { View } from 'react-native'

const VerticalSpace = ({ children, height, backColor }) => {
    return <View style={{height:height?height:16,backgroundColor:backColor}}>{children}</View>

}
export default VerticalSpace
