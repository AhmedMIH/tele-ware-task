import {
  StyleSheet, Text, View,
} from 'react-native';
import Geocoder from 'react-native-geocoding';
import MainNavigation from './src/Routers/MainNavigation';
import { Google_API_KEY } from '@env'

function App() {
   Geocoder.init(Google_API_KEY)
  return (
    <MainNavigation/>
  );
}

export default App;
