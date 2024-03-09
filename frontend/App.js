import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons or any other icon library
import HomeScreen from './App/Screens/HomeScreen/HomeScreen';
import MoreScreen from './App/Screens/MoreScreen/MoreScreen';
import AnotherScreen from './App/Screens/AnotherScreen/AnotherScreen';
import React from 'react';
import OptionScreen from "./App/Screens/OptionScreen/OptiionScreen.jsx"
import OtpScreen1 from './App/Screens/OtpScreen/OtpScreen1.jsx';
import OtpScreen2 from "./App/Screens/OtpScreen/OtpScreen2.jsx"
import ShopkeeperScreen from './App/Screens/RegisterScreen/ShopkeeperScreen.jsx';
import RegisterationMainScreen from './App/Screens/RegisterScreen/RegisterationMainScreen.jsx';
import CustomerScreen from "./App/Screens/RegisterScreen/CustomerScreen.jsx";
import CustomerHomePage from './App/Screens/CustomerHomePage/CustomerHomePage.jsx';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Stack Navigator
function StackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomePage" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="More" component={MoreScreen} options={{ title: 'More' }} />
      <Stack.Screen name="Another" component={AnotherScreen} options={{ title: 'Another' }} />
      <Stack.Screen name="Otp1" component={OtpScreen1} options={{ title: 'Otp1' }} />
      <Stack.Screen name="Otp2" component={OtpScreen2} options={{ title: 'Otp2' }} />
      <Stack.Screen name="Register" component={RegisterationMainScreen} options={{ title: 'Register' }} />
      <Stack.Screen name="Shopkeeper" component={ShopkeeperScreen} options={{ title: 'Shopkeeper' }} />
      <Stack.Screen name="Customer" component={CustomerScreen} options={{ title: 'Customer' }} />
      <Stack.Screen name="CustomerHomePage" component={CustomerHomePage} options={{ title: 'Customer' }} />
    </Stack.Navigator>
  );
}

// Tab Navigator
function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          height: 56,
          backgroundColor: '#44C7F4', // Set the background color
        },
        tabBarLabelStyle: {
          fontSize: 16,
          fontWeight: 'bold',
          paddingBottom: 6, // Adjust label vertical position
        },
        tabBarActiveTintColor: '#FFFFFF', // Set the active tab color
        tabBarInactiveTintColor: '#FFFFFF', // Set the inactive tab color
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={StackNavigator} 
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }} 
      />
      <Tab.Screen 
        name="Options" 
        component={OptionScreen} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="options" color={color} size={size} />
          ),
        }} 
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
  );
}
