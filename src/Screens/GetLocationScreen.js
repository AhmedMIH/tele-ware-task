import { View, Text, SafeAreaView, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import useLocation from '../hooks/useLocation';
import SelectionCountryModal from '../components/SelectionCountryModal';
import Row from '../components/layout/Row';
import Button from '../components/layout/Button';
import country from '../api/country';
import { normalizeFontSize, perfectHeight, perfectWidth } from '../utilities/commonFunctions';
import Spinner from 'react-native-loading-spinner-overlay';
import constant from '../utilities/constant';

const GetLocationScreen = ({ navigation }) => {
  const [showCountryModal, setShowCountryModal] = useState(false)
  const [location, setLocation] = useState('Search country')
  const {location:deviceLocation,loading} = useLocation()
  useEffect(()=>{
    setLocation(deviceLocation)
  },[deviceLocation])
  
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF', paddingHorizontal: perfectWidth(24) }}>
      <Spinner visible={loading}/>
      <SelectionCountryModal onSelect={(value) => setLocation(value)} data={country} isVisible={showCountryModal} toggleModal={() => setShowCountryModal(!setShowCountryModal)} />
      <View style={{flex:0.95}}>
        <Text style={{ marginTop: perfectHeight(80), color: "#212121", fontWeight: 'bold', fontSize: normalizeFontSize(24) }} >Your Location</Text>
        <TouchableOpacity onPress={() => { setShowCountryModal(true) }} style={{ backgroundColor: '#FAFAFA', borderColor: "#FAFAFA", borderWidth: 1, padding: 12, marginTop: perfectHeight(36), borderRadius: 15 }}>
          <Row >
            <Image style={{height:14,width:14}} source={require('../assets/down.png')} />
            <Text style={{ marginHorizontal: perfectWidth(8), color: '#212121', fontWeight: '500', fontSize: normalizeFontSize(18) }}>{location}</Text>
          </Row>
        </TouchableOpacity>
      </View>
      <Button disabled={location === 'Search country' ? true : false} onPress={()=>navigation.navigate(constant.CurrencyChartScreen)}>
        <Text style={{ fontWeight: "700", color: '#FFFFFF', fontSize: normalizeFontSize(16) }}>Continue</Text>
      </Button>
    </SafeAreaView>
  )
}

export default GetLocationScreen