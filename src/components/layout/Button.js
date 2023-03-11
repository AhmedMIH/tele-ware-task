import React from 'react'
import {TouchableOpacity } from 'react-native'
import { perfectHeight } from '../../utilities/commonFunctions'
import colors from '../../utilities/colors'
const Button = ({ children, secondary, onPress, disabled = false, ...props }) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={{ height: perfectHeight(56), width: "100%", alignItems: 'center', justifyContent: 'center', backgroundColor: disabled?colors.disabledButtonColor :colors.mainColor, borderRadius: 30, ...props }}
    >
      {children}
    </TouchableOpacity>
  )
}

export default Button
