import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import GetLocationScreen from "../Screens/GetLocationScreen";
import CurrencyChartScreen from "../Screens/CurrencyChartScreen";
import constant from "../utilities/constant";

const MainNavigation = () => {
    const MainStack = createNativeStackNavigator();
    return (
        <NavigationContainer>
            <MainStack.Navigator screenOptions={{ headerShown: false }}>
                <MainStack.Screen name={constant.GetLocationScreen} component={GetLocationScreen} />
                <MainStack.Screen name={constant.CurrencyChartScreen} component={CurrencyChartScreen} />
            </MainStack.Navigator>
        </NavigationContainer>
    )
}

export default MainNavigation