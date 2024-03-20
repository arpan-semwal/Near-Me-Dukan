import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useCart } from "../../../../Context/ContextApi";
import Colors from '../../../../utils/Colors';

export default function Orders() {
  const { customerName, shopID, storeName } = useCart();
  const navigation = useNavigation();

  const handleViewOrders = () => {
    navigation.navigate('ViewOrder', { storeName });
  };

  const changeAddress = () => {
    // Implement functionality to change the address
    // For example, navigate to a screen where the user can update their address
  };

  return (
    <View style={styles.container}>
      {/* Header section */}
      <View style={styles.headerContainer}>
        <Image source={require('../../../../../assets/logo.png')} style={styles.storeImage} />
        <View style={styles.headerText}>
          <Text style={styles.welcomeText}>Welcome: {customerName}</Text>
          <Text style={styles.shoppingAt}>Shopping at: {storeName}</Text>
          <TouchableOpacity onPress={changeAddress}>
            <Text style={styles.shoppingAt}>Change Address</Text>
          </TouchableOpacity>
          <Text style={styles.shoppingAt}>Shop ID: {shopID}</Text>
        </View>
      </View>
      
      <Text style={styles.orderTitle}>My Previous Orders</Text> 

      {/* Body section */}
      <View style={styles.orderContainer}>
      <Text style={styles.order}>Order from : {storeName}</Text> 
        <TouchableOpacity
          style={styles.viewOrderButton}
          onPress={handleViewOrders}
        >
          <Text style={styles.viewOrderButtonText}>View Orders</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BACKGROUND,
    padding: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  storeImage: {
    width: 100,
    height: 100,
    marginRight: 20,
  },
  order:{
   fontSize:20,
   paddingBottom:20
  },
  headerText: {
    flex: 1,
  },
  welcomeText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  shoppingAt: {
    fontSize: 14,
    marginBottom: 3,
  },
  orderContainer: {
    alignItems: 'center', // Center the content horizontally
    padding: 20,
    marginTop: 20, // Add marginTop of 20
    backgroundColor: '#E4E4E4',
    borderRadius: 20,
  },
  orderTitle: {
    fontSize: 26, // Changed to 26
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign:"center",
    marginTop:30
  },
  viewOrderButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  viewOrderButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
