import React from 'react'
import { View } from 'react-native'

const Row = ({ children, direction, ...props }) => {
  return <View style={{ flexDirection:'row',flexWrap:"wrap",alignItems:'center',...props}}>{children}</View>
}

export default Row
