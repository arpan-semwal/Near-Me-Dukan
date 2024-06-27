import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';

export default function MyAddress({ route }) {
  const { phoneNumber } = route.params || {};
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const response = await axios.get(`http://192.168.29.67:3000/customer/address?phoneNumber=${phoneNumber}`);
        setAddress(response.data.address);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching address:', error);
        setLoading(false);
      }
    };

    fetchAddress();
  }, [phoneNumber]); // Add phoneNumber to dependency array to fetch on change

  const handleDefaultAddress = () => {
    // Logic to set this address as default (if needed)
    console.log('Set as default address:', address);
  };

  const handleSelectAddress = () => {
    // Logic to select this address (if needed)
    console.log('Selected address:', address);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Manage Address</Text>
      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <View style={styles.addressContainer}>
          <View style={styles.addressTextContainer}>
            <Text style={styles.addressText}>Address: {address}</Text>
          </View>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity style={styles.button} onPress={handleDefaultAddress}>
              <Text style={styles.buttonText}>Set as Default</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleSelectAddress}>
              <Text style={styles.buttonText}>Select This</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      <View style={styles.line} />
      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonLabel}>Add a New Address</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  addressTextContainer: {
    flex: 1,
  },
  addressText: {
    fontSize: 16,
  },
  buttonsContainer: {
    flexDirection: 'column',
    marginLeft: 20,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 20,
  },
  addButton: {
    backgroundColor: '#28a745',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  addButtonLabel: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
