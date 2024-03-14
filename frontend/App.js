import React, { useState } from 'react';
import { View, Modal, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';

// Import your screens here
import HomeScreen from './App/Screens/HomeScreen/HomeScreen';
import MoreScreen from './App/Screens/MoreScreen/MoreScreen';
import AnotherScreen from './App/Screens/AnotherScreen/AnotherScreen';
import OtpScreen1 from './App/Screens/OtpScreen/OtpScreen1.jsx';
import OtpScreen2 from './App/Screens/OtpScreen/OtpScreen2.jsx';
import ShopkeeperScreen from './App/Screens/RegisterScreen/ShopkeeperScreen.jsx';
import RegisterationMainScreen from './App/Screens/RegisterScreen/RegisterationMainScreen.jsx';
import CustomerScreen from './App/Screens/RegisterScreen/CustomerScreen.jsx';
import CustomerHomePage from './App/Screens/CustomerHomePage/CustomerHomePage.jsx';
import SearchShops from './App/Screens/CustomerHomePage/CustomerHomeCards/SearchShops/SearchShops.jsx';
import Orders from './App/Screens/CustomerHomePage/CustomerHomeCards/Orders/Orders.jsx';
import MyAddress from './App/Screens/CustomerHomePage/CustomerHomeCards/MyAddress/MyAddress.jsx';
import PreferredShops from './App/Screens/CustomerHomePage/CustomerHomeCards/PreferredShops/PreferredShops.jsx';
import ChangePincode from './App/Screens/CustomerHomePage/CustomerHomeCards/SearchShops/ChangePincode.jsx';
import OptionScreen from './App/Screens/OptionScreen/OptionScreen.jsx';
import CustomDrawer from './App/Components/CustomDrawer/CustomDrawer.jsx';
import StoreScreen from './App/Screens/CustomerHomePage/StoreScreen/StoreScreen.jsx';
import CartScreen from './App/Screens/CartScreen/CartScreen.jsx';
import ProductDetails from './App/Screens/CustomerHomePage/StoreScreen/ProductDetails/ProductDetails.jsx';
import { CartProvider } from './App/Context/ContextApi.js'; 
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

// Stack Navigator
function StackNavigator({ formSubmitted }) {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomePage" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="More" component={MoreScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Another" component={AnotherScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Otp1" component={OtpScreen1} options={{ headerShown: false }}   />
      <Stack.Screen name="Otp2" component={OtpScreen2} options={{ headerShown: false }}  />
      <Stack.Screen name="Register" component={RegisterationMainScreen} options={{ headerShown: false }}  />
      <Stack.Screen name="Shopkeeper" component={ShopkeeperScreen}options={{ headerShown: false }}  />
      <Stack.Screen name="Customer" component={CustomerScreen}options={{ headerShown: false }} />
      <Stack.Screen name="CustomerHomePage" component={CustomerHomePage}options={{ headerShown: false }} />
      <Stack.Screen name="PrefferedShops" component={PreferredShops}options={{ headerShown: false }}/>
      <Stack.Screen name="Orders" component={Orders} options={{ headerShown: false }}/>
      <Stack.Screen name="MyAddress" component={MyAddress}options={{ headerShown: false }} />
      <Stack.Screen name="SearchShops" component={SearchShops}options={{ headerShown: false }} />
      <Stack.Screen name="Pincode" component={ChangePincode}options={{ headerShown: false }} />
      <Stack.Screen name="Store" component={StoreScreen}options={{ headerShown: false }} />
      <Stack.Screen name="ProductDetails" component={ProductDetails}options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

// Tab Navigator
function TabNavigator({ formSubmitted }) {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home';
         
          }
          else {
            iconName="cart"
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
       
      <Tab.Screen name="Home" component={StackNavigator} options={{ headerShown: false }}  />
      <Tab.Screen name="Cart" component={CartScreen} options={{ headerShown: false }}  />
    </Tab.Navigator>
  );
}

function MyDrawer() {
  return (
    <Drawer.Navigator initialRouteName="NKD" drawerContent={(props) => <CustomDrawer {...props} />}>
      <Drawer.Screen name="NKD" component={TabNavigator} />
      <Drawer.Screen name="AboutUs" component={MoreScreen} />
      <Drawer.Screen name="Register as an Associate" component={MoreScreen} />
      <Drawer.Screen name="Privacy Policy" component={MoreScreen} />
      <Drawer.Screen name="Terms & Conditions" component={MoreScreen} />
      <Drawer.Screen name="Refund & Cancellations" component={MoreScreen} />
      <Drawer.Screen name="Shipping & Delivery" component={MoreScreen} />
      <Drawer.Screen name="Contact" component={MoreScreen} />
      <Drawer.Screen name="Choose Language" component={MoreScreen} />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <CartProvider>
      <MyDrawer/>
      </CartProvider>
   
    </NavigationContainer>
  );
}