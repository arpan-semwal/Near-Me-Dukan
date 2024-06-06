import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useCustomer } from '../../../../Context/ContextApi';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';

export default function BarberSearchShops({ route }) {
  const { customerName } = useCustomer();
  const { shopID , phoneNumber , userType } = route.params || {};
  const [preferredShops, setPreferredShops] = useState([]);
  console.log('User Type:', userType);
  const navigation = useNavigation();

  const [shops, setShops] = useState([]);
  useEffect(() => {
    const fetchSalonShops = async () => {
      try {
        const response = await fetch(`http://172.16.16.41:3000/salons?shopID=${shopID}`);
        const data = await response.json();
        console.log('Fetched shops:', data); // Check the fetched data
        if (data) {
          setShops(data);
        }
      } catch (error) {
        console.error('Error fetching salon shops:', error);
        // Handle error if unable to fetch shop details
      }
    };

    fetchSalonShops();
  }, []);
  console.log('Shop ID:', shopID); // Check the shopID passed from the route

  const fetchShopDetails = async (phoneNumber) => {
    try {
      const response = await fetch(`http://172.16.16.41:3000/preferredShops/${phoneNumber}`);
      const data = await response.json();
      console.log('Fetched shop details:', data); // Log fetched shop details
      return data;
    } catch (error) {
      console.error('Error fetching shop details:', error);
      throw error;
    }
  };

  const renderShopItem = () => {
    if (shops.length === 0) {
      return <Text>No salon shops found</Text>;
    }

    return shops.map((shop, index) => (
      <TouchableOpacity key={index} onPress={() => navigateToSalon(shop)}>
        <View style={styles.shopItem}>
          <View style={styles.shopDetails}>
            <Text style={styles.shopName}>{shop.shopkeeperName}</Text>
            <Text style={styles.categoryLabel}>Location: {shop.city}, {shop.shopState}</Text>
            <View style={styles.categoryContainer}>
              <Text style={styles.categoryLabel}>Category:</Text>
              <Text style={styles.shopCategory}>{shop.selectedCategory}</Text>
            </View>
            <View style={styles.categoryContainer}>
              <Text style={styles.categoryLabel}>Subcategory:</Text>
              <Text style={styles.shopCategory}>{shop.selectedSubCategory}</Text>
            </View>
            <View style={styles.categoryContainer}>
              <Text style={styles.categoryLabel}>ShopName:</Text>
            </View>
          </View>
          <TouchableOpacity onPress={() => toggleFavorite(shop)}>
            <AntDesign name={shop.favorite ? "heart" : "hearto"} size={24} color={shop.favorite ? "red" : "black"} />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    ));
  };
  
  const navigateToSalon = (shop) => {
    navigation.navigate('MyServices', { phoneNumber: shop.phoneNumber , userType:userType });
  };

  const toggleFavorite = async (shop) => {
    try {
      const updatedShops = shops.map((s) => {
        if (s.shopID === shop.shopID) {
          return { ...s, favorite: !s.favorite };
        }
        return s;
      });
      setShops(updatedShops);

      const response = await fetch('http://172.16.16.41:3000/preferredShops/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNumber: phoneNumber, shopID: shop.shopID }),
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.leftContainer}>
          <Image source={require('../../../../../assets/logo.png')} style={styles.welcomeImage} />
        </View>
        <View style={styles.rightContainer}>
          <Text style={styles.welcomeText}>Welcome, {phoneNumber}</Text>
          <Text style={styles.pincodeText}>Shop ID: {shopID}</Text>
        </View>
      </View>
      <View style={styles.locationContainer}>
        <Text style={styles.locationHeading}>Types of Shops</Text>
        <View style={styles.separator} />
      </View>
      <ScrollView style={styles.scrollView}>
        {renderShopItem()}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    phoneNumberText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    noShopsText: {
        fontSize: 16,
        textAlign: 'center',
    },
    shopItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    shopName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    shopPhoneNumber: {
        fontSize: 16,
    },
});
