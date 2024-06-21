import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';

export default function PreferredShops({ route }) {
  const [shops, setShops] = useState([]);
  const { phoneNumber } = route.params || {};
  const navigation = useNavigation();

  useEffect(() => {
    const fetchPreferredShops = async () => {
      try {
        const response = await axios.get(`http://172.16.16.19:3000/api/preferred_shops/${phoneNumber}`);
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

  const handleDeleteShop = async (shopID) => {
    try {
      const response = await axios.delete('http://172.16.16.19:3000/removePreferredShop', {
        data: { customerPhoneNumber: phoneNumber, shopID: shopID }
      });

      if (response.status === 200) {
        Alert.alert('Success', 'Shop removed from your preferred list');
        setShops(prevShops => prevShops.filter(shop => shop.shopID !== shopID));
      } else {
        console.error('Failed to remove shop:', response.statusText);
        Alert.alert('Error', 'Failed to remove shop');
      }
    } catch (error) {
      console.error('Error removing shop:', error);
      Alert.alert('Error', 'Failed to remove shop');
    }
  };

  const renderShop = ({ item }) => (
    <TouchableOpacity onPress={() => handleShopPress(item)}>
      <View style={styles.shopContainer}>
        <View style={styles.shopInfo}>
          <Text style={styles.shopName}>{item.shopkeeperName}</Text>
          <Text>Shop ID: {item.shopID}</Text>
          <Text>Category: {item.selectedCategory}</Text>
          <Text>Type: {item.shopType}</Text>
          <Text>Phone: {item.phoneNumber}</Text>
          <Text>Pincode: {item.pincode}</Text>
          <Text>Created At: {item.createdAt}</Text>
        </View>
        <TouchableOpacity onPress={() => handleDeleteShop(item.shopID)}>
          <AntDesign name="delete" size={24} color="red" />
        </TouchableOpacity>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  shopInfo: {
    flex: 1,
  },
  shopName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
});
