import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { HomeScreen } from "../screens/Home";
import { DetailsScreen } from "../screens/Details";
import { RegisterScreen } from "../screens/Register";

const { Navigator, Screen } = createNativeStackNavigator();

export function AppRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="home" component={HomeScreen} />
      <Screen name="new" component={RegisterScreen} />
      <Screen name="details" component={DetailsScreen} />
    </Navigator>
  )
}