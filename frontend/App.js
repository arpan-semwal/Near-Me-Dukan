 
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './App/Screens/HomeScreen/HomeScreen';
import MoreScreen from './App/Screens/MoreScreen/MoreScreen';
import AnotherScreen from './App/Screens/AnotherScreen/AnotherScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer >
    <Stack.Navigator>
      <Stack.Screen name="HomePage" component={HomeScreen}  options={{ title: 'Overview' }} />
      <Stack.Screen name="More" component={MoreScreen} />
      <Stack.Screen name="Another" component={AnotherScreen} />
    </Stack.Navigator>
  </NavigationContainer>
  );
}

 
