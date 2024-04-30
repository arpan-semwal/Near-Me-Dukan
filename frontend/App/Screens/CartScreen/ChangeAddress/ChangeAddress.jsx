import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import Colors from '../../../utils/Colors';
import { useNavigation } from '@react-navigation/native';

export default function ChangeAddress({ route }) {
  const { custAddress, addresses,customerName,shopID , phoneNumber } = route.params;
  const navigation = useNavigation();
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(-1); // Initial state, no address selected
  const [selectedCustAddress, setSelectedCustAddress] = useState(false); // Initial state, customer address not selected

  const addNewAddress = () => {
    navigation.navigate("AddNewAddress", { addresses, custAddress });
  };

  const handleSelectAddress = (index) => {
    // Toggle selected address index
    setSelectedAddressIndex(index === selectedAddressIndex ? -1 : index);
  };

  const handleSelectCustAddress = () => {
    // Toggle selection of the customer address
    setSelectedCustAddress(!selectedCustAddress);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.headerContainer}>
          {/* Logo */}
          <Image source={require('../../../../assets/logo.png')} style={styles.storeImage} />

          {/* User Info */}
          <View style={styles.headerText}>
            <Text style={styles.welcomeText}>Welcome:{customerName} </Text>
            <Text style={styles.shoppingAt}>Shopping at: {phoneNumber}</Text>

            <TouchableOpacity>
              <Text style={styles.shoppingAt}>Change Address</Text>
            </TouchableOpacity>

            <Text style={styles.shoppingAt}>Shop ID: {shopID}</Text>
          </View>
        </View>

        {/* Heading: Manage Addresses */}
        <Text style={styles.heading}>Manage Addresses</Text>
        {/* Render custAddress first */}
        <View style={styles.addressWrapper}>
          <View style={styles.addressContainer}>
            <View style={styles.row}>
              {/* Customer Address */}
              <View style={styles.leftColumn}>
                <View style={styles.row}>
                  <Text style={[styles.address, styles.boldText]}>
                    {custAddress}
                  </Text>
                </View>
              </View>

              {/* Buttons */}
              <View style={styles.rightColumn}>
                <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.buttonUpdate}>
                      <Text style={styles.buttonUpdateText}>Make Default</Text>
                    </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.buttonUpdate, selectedCustAddress && styles.selectedButton]} // Apply additional style if selected
                    onPress={handleSelectCustAddress}
                  >
                    <Text style={styles.buttonUpdateText}>
                      {selectedCustAddress ? "Selected" : "Select This"}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
        
        {/* Render existing addresses */}
        {addresses?.map((address, index) => (
          <View key={index} style={styles.addressWrapper}>
            <View style={styles.addressContainer}>
              <View style={styles.row}>
                {/* Address */}
                <View style={styles.leftColumn}>
                  <View style={styles.row}>
                    <Text style={[styles.address, styles.boldText]}>
                      {address.fullName}
                    </Text>
                  </View>
                  <View style={styles.row}>
                    <Text style={[styles.address]}>
                      {address.doorNo}, {address.streetArea}
                    </Text>
                  </View>
                  <View style={styles.row}>
                    <Text style={styles.address}>
                      {address.state} , {address.city}
                    </Text>
                  </View>
                  <View style={styles.row}>
                    <Text style={styles.address}>
                      {address.landmark}
                    </Text>
                  </View>
                  <View style={styles.row}>
                    <Text style={styles.address}>
                      {address.phone}
                    </Text>
                  </View>
                </View>

                {/* Buttons */}
                <View style={styles.rightColumn}>
                  <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.buttonUpdate}>
                      <Text style={styles.buttonUpdateText}>Make Default</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.buttonUpdate, selectedAddressIndex === index && styles.selectedButton]} // Apply additional style if selected
                      onPress={() => handleSelectAddress(index)}
                    >
                      <Text style={styles.buttonUpdateText}>
                        {selectedAddressIndex === index ? "Selected" : "Select This"}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </View>
        ))}

        <TouchableOpacity style={styles.buttonAdd} onPress={addNewAddress}>
          <Text style={styles.buttonAddText}>+ Add New Address</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  boldText: {
    fontWeight: 'bold',
  },
  leftColumn: {
    flex: 2,
  },
  rightColumn: {
    flex: 1,
  },
  
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
  addressWrapper: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  addressContainer: {
    flex: 1,
    backgroundColor: '#E4E4E4',
    padding: 20,
    borderRadius: 10,
    marginBottom: 10, // Add marginBottom to create space between addresses
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  address: {
    fontSize: 15,
  },
  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginLeft: 10,
  },
  buttonUpdate: {
    backgroundColor: Colors.BUTTONCOLOR,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginBottom: 10,
  },
  buttonUpdateText: {
    textAlign: "center",
    color: 'white',
    fontWeight: 'bold',
  },
  buttonDelete: {
    backgroundColor: Colors.BUTTONCOLOR,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginBottom: 10,
  },
  buttonDeleteText: {
    textAlign: "center",
    color: 'white',
    fontWeight: 'bold',
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
  selectedButton: {
    backgroundColor: 'green', // Change the color to indicate selection
  },
});