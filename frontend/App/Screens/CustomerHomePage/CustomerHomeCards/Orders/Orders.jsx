import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook
import { useCart } from "../../../../Context/ContextApi"; // Import useCart hook

export default function Orders() {
  const { storeName } = useCart(); // Extract storeName from useCart hook
  const navigation = useNavigation(); // Initialize navigation object

  const handleViewOrders = () => {
    // Navigate to a screen where orders from the selected store are displayed
    navigation.navigate('ViewOrder', { storeName });
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {/* Display store name */}
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 20 }}>
        Orders from: {storeName}
      </Text>

      {/* Button to view orders */}
      <TouchableOpacity
        style={{
          backgroundColor: '#007bff',
          paddingVertical: 10,
          paddingHorizontal: 20,
          borderRadius: 5,
        }}
        onPress={handleViewOrders}
      >
        <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>
          View Orders
        </Text>
      </TouchableOpacity>
    </View>
  );
}
