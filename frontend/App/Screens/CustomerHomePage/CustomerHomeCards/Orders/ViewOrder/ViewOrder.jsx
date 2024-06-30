import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

export default function ViewOrder({ route }) {
  const { custPhoneNumber, shopID } = route.params || {};
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch(`http://192.168.29.67:3000/getShopOrders?custPhoneNumber=${custPhoneNumber}&shopID=${shopID}`);
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error('Error fetching shop orders:', error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.orderContainer}>
      <Text style={styles.orderText}>Order ID: {item.id}</Text>
      <Text style={styles.orderText}>Customer Name: {item.customerName}</Text>
      <Text style={styles.orderText}>Total Price: ₹{item.totalPrice}</Text>
      <Text style={styles.orderText}>Order Date: {item.selectedDate}</Text>
      <Text style={styles.orderText}>Order Time: {item.selectedTime}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={orders}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  orderContainer: {
    padding: 20,
    backgroundColor: '#f0f0f0',
    marginBottom: 10,
    borderRadius: 5,
  },
  orderText: {
    fontSize: 16,
    marginBottom: 5,
  },
});
