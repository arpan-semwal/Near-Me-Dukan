import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useCustomer } from '../../../Context/ContextApi';
import ChangePincode from '../CustomerHomeCards/SearchShops/ChangePincode';
import { useNavigation } from '@react-navigation/native';

export default function BarberSearchShops({ route }) {
  const { shopID, customerName } = useCustomer();
  const navigation = useNavigation(); 

  const [shop, setShop] = useState(null);

  useEffect(() => {
    // Fetch shop details for the shop the user registered with
    const fetchShopDetails = async () => {
      try {
        const response = await fetch(`http://192.168.29.68:3000/shop/${shopID}`);
        const data = await response.json();
        if (data) {
          setShop(data);
        }
      } catch (error) {
        console.error('Error fetching shop details:', error);
        // Handle error if unable to fetch shop details
      }
    };

    fetchShopDetails();
  }, [shopID]);

  const renderShopItem = () => {
    if (!shop) {
      return null;
    }

    return (
      <TouchableOpacity onPress={() => navigation.navigate('Salons', { salon: shop })}>
        <View style={styles.shopItem}>
          <Image source={{ uri: shop.profilePicture }} style={styles.shopImage} />
          <View style={styles.shopDetails}>
            <Text style={styles.shopName}>{shop.shopkeeperName}</Text>
            <Text style={styles.shopLocation}>Location: {shop.city}, {shop.shopState}</Text>
            <Text style={styles.shopStatus}>Pincode: {shop.pincode}</Text>
            <Text style={styles.shopStatus}>Category: {shop.selectedCategory}</Text>
            <Text style={styles.shopStatus}>Subcategory: {shop.selectedSubCategory}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.leftContainer}>
          <Image source={require('../../../../assets/logo.png')} style={styles.welcomeImage} />
        </View>
        <View style={styles.rightContainer}>
          <Text style={styles.welcomeText}>Welcome, {customerName}</Text>
          <Text style={styles.pincodeText}>Shop ID: {shopID}</Text>
          {/* <TouchableOpacity onPress={() => navigation.navigate('ChangePincode')}>
            <Text style={styles.changePincodeText}>Change Pincode</Text>
          </TouchableOpacity> */}
        </View>
      </View>
      <View style={styles.locationContainer}>
        <Text style={styles.locationHeading}>Shop Details</Text>
        <View style={styles.separator} />
      </View>
      {renderShopItem()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  leftContainer: {
    marginRight: 40,
    marginLeft: 20
  },
  rightContainer: {
    flex: 1,
  },
  welcomeImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  pincodeText: {
    fontSize: 16,
    marginBottom: 5,
  },
  changePincodeText: {
    color: '#9F9F9F',
    fontSize: 14,
    marginBottom: 20,
  },
  locationContainer: {
    marginBottom: 20,
  },
  locationHeading: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: "center",
  },
  shopItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  shopImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 20,
  },
  shopDetails: {
    flex: 1,
  },
  shopName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  shopLocation: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  shopStatus: {
    fontSize: 16,
    color: '#333',
  },
  separator: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    marginBottom: 10,
  },
});
