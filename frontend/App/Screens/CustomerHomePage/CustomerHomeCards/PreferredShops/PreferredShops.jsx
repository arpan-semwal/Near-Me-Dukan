import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

export default function PreferredShops({ route }) {
  const [shops, setShops] = useState([]);
  const { phoneNumber } = route.params || {};
  const navigation = useNavigation();

  useEffect(() => {
    const fetchPreferredShops = async () => {
      try {
        const response = await axios.get(`http://172.16.16.41:3000/api/preferred_shops/${phoneNumber}`);
        setShops(response.data);
      } catch (error) {
        console.error('Error fetching preferred shops:', error);
      }
    };

    fetchPreferredShops();
  }, [phoneNumber]);
  const handleShopPress = (shop) => {
    const { phoneNumber, storeImage, shopkeeperName, shopType } = shop;

    if (shopType === 'product') {
        navigation.navigate('ShopkeeperMyProducts', { phoneNumber, storeImage, shopkeeperName });
    } else if (shopType === 'service') {
        navigation.navigate('MyServices', { phoneNumber, storeImage, shopkeeperName });
    }
};

  const renderShop = ({ item }) => (
    <TouchableOpacity onPress={() => handleShopPress(item)}>
      <View style={styles.shopContainer}>
        <Text style={styles.shopName}>{item.shopkeeperName}</Text>
        <Text>Shop ID: {item.shopID}</Text>
        <Text>Category: {item.selectedCategory}</Text>
        <Text>Type: {item.shopType}</Text>
        <Text>Phone: {item.phoneNumber}</Text>
        <Text>Pincode: {item.pincode}</Text>
        <Text>Created At: {item.createdAt}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Preferred Shops</Text>
      <FlatList
        data={shops}
        renderItem={renderShop}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  shopContainer: {
    marginBottom: 15,
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
  },
  shopName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
});
