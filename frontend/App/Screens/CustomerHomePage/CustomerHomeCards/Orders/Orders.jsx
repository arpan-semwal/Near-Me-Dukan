import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Orders({ route }) {
  const { custPhoneNumber } = route.params || {};
  const [shops, setShops] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    fetchShops();
  }, []);

  const fetchShops = async () => {
    try {
      const response = await fetch(`http://192.168.29.67:3000/getCustomerShops?custPhoneNumber=${custPhoneNumber}`);
      const data = await response.json();
      setShops(data);
    } catch (error) {
      console.error('Error fetching customer shops:', error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.shopContainer}>
      <Text style={styles.shopText}>Shop Name: {item.shopID}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('ViewOrder', { custPhoneNumber, shopID: item.shopID })}
      >
        <Text style={styles.buttonText}>View Order</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={shops}
        renderItem={renderItem}
        keyExtractor={(item) => item.shopID}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  shopContainer: {
    padding: 20,
    backgroundColor: '#f0f0f0',
    marginBottom: 10,
    borderRadius: 5,
  },
  shopText: {
    fontSize: 18,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
});
