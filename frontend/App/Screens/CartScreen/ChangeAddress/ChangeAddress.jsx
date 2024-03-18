import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Colors from '../../../utils/Colors';
import { useNavigation } from '@react-navigation/native';

export default function ChangeAddress({ route }) {
  const { custAddress, addresses } = route.params;
  const navigation = useNavigation();
  
  const addNewAddress = () => {
    navigation.navigate("AddNewAddress", { addresses });
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        {/* Logo */}
        <Image source={require('../../../../assets/logo.png')} style={styles.storeImage} />

        {/* User Info */}
        <View style={styles.headerText}>
          <Text style={styles.welcomeText}>Welcome: </Text>
          <Text style={styles.shoppingAt}>Shopping at: </Text>

          <TouchableOpacity>
            <Text style={styles.shoppingAt}>Change Address</Text>
          </TouchableOpacity>

          <Text style={styles.shoppingAt}>Shop ID: </Text>
        </View>
      </View>

      {/* Heading: Manage Addresses */}
      <Text style={styles.heading}>Manage Addresses</Text>
      {/* Render custAddress first */}
      <Text style={styles.heading}>{custAddress}</Text>
      
      {/* Render existing addresses */}
      {addresses?.map((address, index) => (
        <View key={index} style={styles.addressContainer}>
          <Text style={styles.address}>
            {address.fullName} {address.city}, {address.state}, {address.landmark}, {address.phone}
          </Text>
        </View>
      ))}
    
      <TouchableOpacity style={styles.buttonAdd} onPress={addNewAddress}>
        <Text style={styles.buttonAddText}>+ Add New Address</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonUpdate}>
        <Text style={styles.buttonUpdateText}>Update Address</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BACKGROUND,
    padding: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  storeImage: {
    width: 90,
    height: 90,
    borderRadius: 10,
  },
  headerText: {
    flex: 1,
    marginLeft: 20,
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  shoppingAt: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  heading: {
    fontSize: 26,
    textAlign: "center",
    fontWeight: 'bold',
    marginBottom: 20,
  },
  addressContainer: {
    backgroundColor: '#E4E4E4',
    padding: 20,
    marginBottom: 10,
    borderRadius: 10,
  },
  address: {
    fontSize: 18,
  },
  buttonAdd: {
    width: "100%",
    backgroundColor: Colors.BUTTONCOLOR,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginBottom: 10,
  },
  buttonAddText: {
    textAlign: "center",
    color: 'white',
    fontWeight: 'bold',
  },
  buttonUpdate: {
    width: "100%",
    backgroundColor: "#0A7E00",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginBottom: 10,
  },
  buttonUpdateText: {
    textAlign: "center",
    color: 'white',
    fontWeight: 'bold',
  }
});
