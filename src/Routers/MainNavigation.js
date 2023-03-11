import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import GetLocationScreen from "../Screens/GetLocationScreen";
import CurrencyChartScreen from "../Screens/CurrencyChartScreen";

const MainNavigation = ()=>{
    const MainStack = createNativeStackNavigator();
    return (
        <NavigationContainer>
            <MainStack.Navigator screenOptions={{headerShown: false}}>
                <MainStack.Screen name="GetLocationScreen" component={GetLocationScreen}/>
                <MainStack.Screen name="CurrencyChartScreen" component={CurrencyChartScreen}/>
            </MainStack.Navigator>
        </NavigationContainer>
    )
}

export default MainNavigation