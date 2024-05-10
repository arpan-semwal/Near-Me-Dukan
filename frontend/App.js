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
import ChangeAddress from './App/Screens/CartScreen/ChangeAddress/ChangeAddress.jsx';
import Checkout from './App/Screens/CartScreen/Checkout/Checkout.jsx';
import AddNewAddress from './App/Screens/CartScreen/AddNewAddress/AddNewAddress.jsx';
import Pay from './App/Screens/CartScreen/Pay/Pay.jsx';
import ViewOrder from './App/Screens/CustomerHomePage/CustomerHomeCards/Orders/ViewOrder/ViewOrder.jsx';
import SweetsHomePage from "./App/Screens/CustomerHomePage/SweetsHomePage/SweetsHomePage.jsx"
import SnacksHomePage from './App/Screens/CustomerHomePage/SnacksHomePage/SnacksHomePage.jsx';
import VegetablesHomePage from './App/Screens/CustomerHomePage/VegetablesHomePage/VegetablesHomePage.jsx';
import BarberHomePage from './App/Screens/CustomerHomePage/BarberHomePage/BarberHomePage.jsx';
import BarberSearchShops from './App/Screens/CustomerHomePage/BarberHomePage/BarberSearchShops.jsx';
import SalonsServices from './App/Screens/CustomerHomePage/BarberHomePage/SalonsServices.jsx';
import SalonProducts from './App/Screens/CustomerHomePage/BarberHomePage/SalonProducts.jsx';
import UploadBanner from './App/Screens/RegisterScreen/UploadBanner.jsx';
import Subscription from './App/Screens/Subscription/Subscription.jsx';
import ShopkeeperPay from './App/Screens/RegisterScreen/ShopkeeperPay/ShopkeeperPay.jsx';
import ShopkeeperHome from './App/Screens/RegisterScreen/ShopkeeperHome/ShopkeeperHome.jsx';
import ShopkeeperOrders from './App/Screens/RegisterScreen/ShopkeeperOrders/ShopkeeperOrders.jsx';
import ShopkeeperDiscountCode from './App/Screens/RegisterScreen/ShopkeeperDiscountCode/ShopkeeperDiscountCode.jsx';
import ShopkeeperCustomer from './App/Screens/RegisterScreen/ShopkeeperCustomer/ShopkeeperCustomer.jsx';
import ShopkeeperManageProduct from './App/Screens/RegisterScreen/ShopkeeperCustomer/ShopkeeperCustomer.jsx';
import ShopkeeperPayments from './App/Screens/RegisterScreen/ShopkeeperPay/ShopkeeperPyaments/ShopkeeperPayments.jsx';
import Privacy from './App/Screens/PrivacyAndConditions/Privacy.jsx';
import Conditions from './App/Screens/PrivacyAndConditions/Conditions.jsx';
import Inventory from './App/Screens/shops/SalonShop/Inventory/Inventory.jsx';
import GroceryShop from './App/Screens/shops/GroceryShop/GroceryShop.jsx';
import SalonShop from './App/Screens/shops/SalonShop/SalonShop.jsx';
import BeautyPalor from './App/Screens/shops/BeautyPalor/BeautyPalor.jsx';
import VegetableShop from './App/Screens/shops/VegetableShop/VegetableShop.jsx';
import SweetsAndNamkeenShop from './App/Screens/shops/SweetsAndNamkeenShop/SweetsAndNamkeenShop.jsx';
import StationaryShop from './App/Screens/shops/StationaryShop/StationaryShop.jsx';
import MyServices from './App/Screens/shops/SalonShop/MyServices/MyServices.jsx';
import SalonProfile from './App/Screens/shops/SalonShop/SalonProfile/SalonProfile.jsx';
import SubSalonService from './App/Screens/shops/SalonShop/Inventory/SubSalonService/SubSalonService.jsx';
import SelectedServices from './App/Screens/shops/SalonShop/MyServices/SelectedServices.jsx';
import SalesHomePage from './App/Screens/SalesExecutive/SalesHomePage.jsx';
import AddTeamMember from './App/Screens/SalesExecutive/Cards/AddTeamMember.jsx';
import RegisterSales from './App/Screens/SalesExecutive/RegisterSalesAssociate/RegisterSales.jsx';
import OtpScreen from './App/Screens/SalesExecutive/Otp/OtpScreen.jsx';
import MyTeam from './App/Screens/SalesExecutive/Cards/MyTeam.jsx';
import MyProfile from './App/Screens/SalesExecutive/Cards/MyProfile.jsx';
import RegisterShop from './App/Screens/SalesExecutive/Cards/RegisterShop.jsx';
import IncomeCalculator from './App/Screens/SalesExecutive/Cards/IncomeCalculator.jsx';
 
 
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
      <Stack.Screen name="ChangeAddress" component={ChangeAddress}options={{ headerShown: false }} />
      <Stack.Screen name="Checkout" component={Checkout}options={{ headerShown: false }} />
      <Stack.Screen name="AddNewAddress" component={AddNewAddress}options={{ headerShown: false }} />
      <Stack.Screen name="Pay" component={Pay}options={{ headerShown: false }} />
      <Stack.Screen name="ViewOrder" component={ViewOrder}options={{ headerShown: false }} />
      <Stack.Screen name="Sweets" component={SweetsHomePage}options={{ headerShown: false }} />
      <Stack.Screen name="Snacks" component={SnacksHomePage}options={{ headerShown: false }} />
      <Stack.Screen name="Vegetables" component={VegetablesHomePage}options={{ headerShown: false }} />
      <Stack.Screen name="Barber" component={BarberHomePage}options={{ headerShown: false }} />
      <Stack.Screen name="BarberSearchShops" component={BarberSearchShops}options={{ headerShown: false }} />
      <Stack.Screen name="Salons" component={SalonsServices}options={{ headerShown: false }} />
      <Stack.Screen name="SalonProduct" component={SalonProducts}options={{ headerShown: false }} />
      <Stack.Screen name="Upload" component={UploadBanner}options={{ headerShown: false }} />
      <Stack.Screen name="Subscription" component={Subscription}options={{ headerShown: false }} />
      <Stack.Screen name="ShopkeeperPay" component={ShopkeeperPay}options={{ headerShown: false }} />
      <Stack.Screen name="ShopkeeperHome" component={ShopkeeperHome}options={{ headerShown: false }} />
      <Stack.Screen name="ShopkeeperOrders" component={ShopkeeperOrders}options={{ headerShown: false }} />
      <Stack.Screen name="ShopkeeperManageProduct" component={ShopkeeperManageProduct}options={{ headerShown: false }} />
      <Stack.Screen name="ShopkeeperDiscountCode" component={ShopkeeperDiscountCode}options={{ headerShown: false }} />
      <Stack.Screen name="ShopkeeperCustomer" component={ShopkeeperCustomer}options={{ headerShown: false }} />
      <Stack.Screen name="ShopkeeperPayments" component={ShopkeeperPayments}options={{ headerShown: false }} />
      <Stack.Screen name="Privacy" component={Privacy}options={{ headerShown: false }} />
      <Stack.Screen name="Conditions" component={Conditions}options={{ headerShown: false }} />
      <Stack.Screen name="Inventory" component={Inventory}options={{ headerShown: false }} />
      <Stack.Screen name="GroceryShop" component={GroceryShop}options={{ headerShown: false }} />
      <Stack.Screen name="SalonShop" component={SalonShop}options={{ headerShown: false }} />
      <Stack.Screen name="BeautyPalor" component={BeautyPalor}options={{ headerShown: false }} />
      <Stack.Screen name="VegetableShop" component={VegetableShop}options={{ headerShown: false }} />
      <Stack.Screen name="SweetsAndNamkeenShop" component={SweetsAndNamkeenShop}options={{ headerShown: false }} />
      <Stack.Screen name="StationaryShop" component={StationaryShop}options={{ headerShown: false }} />
      <Stack.Screen name="MyServices" component={MyServices}options={{ headerShown: false }} />
      <Stack.Screen name="SalonProfile" component={SalonProfile}options={{ headerShown: false }} />
      <Stack.Screen name="SubSalonService" component={SubSalonService}options={{ headerShown: false }} />
      <Stack.Screen name="SelectedServices" component={SelectedServices}options={{ headerShown: false }} />
      <Stack.Screen name="SalesHomePage" component={SalesHomePage}options={{ headerShown: false }} />
      <Stack.Screen name="AddTeamMember" component={AddTeamMember}options={{ headerShown: false }} />
      <Stack.Screen name="RegisterSales" component={RegisterSales}options={{ headerShown: false }} />
      <Stack.Screen name="OtpScreen" component={OtpScreen}options={{ headerShown: false }} />
      <Stack.Screen name="MyTeam" component={MyTeam}options={{ headerShown: false }} />
      <Stack.Screen name="MyProfile" component={MyProfile}options={{ headerShown: false }} />
      <Stack.Screen name="RegisterShop" component={RegisterShop}options={{ headerShown: false }} />
      <Stack.Screen name="IncomeCalculator" component={IncomeCalculator}options={{ headerShown: false }} />
      
     
    
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
      <Drawer.Screen name="Register as an Associate" component={RegisterSales} />
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