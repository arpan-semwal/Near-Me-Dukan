import React, { useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import dummyData from "./BarberDummy";
import { useCustomer } from '../../../Context/ContextApi';
import ChangePincode from '../CustomerHomeCards/SearchShops/ChangePincode';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook

export default function BarberSearchShops() {
  const [shops, setShops] = useState(dummyData);
  const { pincode, customerName } = useCustomer();
  const navigation = useNavigation(); // Initialize navigation object
  
  const renderShopItem = ({ item }) => (
    <View>
      <View style={styles.shopItem}>
        <Image source={item.image} style={styles.shopImage} />
        <View style={styles.shopDetails}>
          <Text style={styles.shopName}>{item.name}</Text>
          <Text style={styles.shopLocation}>Location: {item.location}</Text>
          <Text style={styles.shopStatus}>Status: {item.isOpen ? 'Open' : 'Closed'}</Text>
        </View>
      </View>
      <View style={styles.separator} />
    </View>
  );

  const handleSubmit = () => {
    // Handle submission, for example, showing a modal to change pincode
    
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.leftContainer}>
          <Image source={require('../../../../assets/logo.png')} style={styles.welcomeImage} />
        </View>
        <View style={styles.rightContainer}>
          <Text style={styles.welcomeText}>Welcome, {customerName}</Text>
          <Text style={styles.pincodeText}>Shops at Pincode: {pincode}</Text>
          <TouchableOpacity onPress={handleSubmit}>
            <Text style={styles.changePincodeText}>Change Pincode</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.locationContainer}>
      
        <Text style={styles.locationHeading}>Salons in Your Location</Text>
        <View style={styles.separator} />
      </View>
      <FlatList
        data={shops}
        renderItem={renderShopItem}
        keyExtractor={item => item.id.toString()}
      />
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
