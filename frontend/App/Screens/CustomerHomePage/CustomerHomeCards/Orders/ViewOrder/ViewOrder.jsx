import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { useCart } from '../../../../../Context/ContextApi'; // Import useCart hook

const ViewOrder = ({ route }) => {
  const { storeName } = route.params; // Extract storeName from route params
  const { cartItems, totalPrice } = useCart(); 

  // Filter orders based on storeName
  const storeOrders = cartItems.filter(item => item.storeName === storeName);

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>
        Orders from: {storeName}
      </Text>
      <FlatList
        data={storeOrders}
        keyExtractor={(item, index) => `${item.id}_${index}`}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 20 }}>
            <Text style={{ fontWeight: 'bold' }}>Order Number: {item.orderNumber}</Text>
            <Text style={{ marginBottom: 10 }}>Total Price: ₹{item.totalPrice}</Text>
            <FlatList
              data={item.products}
              keyExtractor={(product, index) => `${product.id}_${index}`}
              renderItem={({ product }) => (
                <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                  <Text>{product.title}</Text>
                  <Text style={{ marginLeft: 10 }}>Quantity: {product.quantity}</Text>
                </View>
              )}
            />
          </View>
        )}
      />
    </View>
  );
};

export default ViewOrder;
