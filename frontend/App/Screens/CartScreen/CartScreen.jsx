import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useCart } from '../../Context/ContextApi';

const CartScreen = () => {
  const { cartItems, removeFromCart, clearCart, custPhoneNumber, setCartItems } = useCart();

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text>{item.name}</Text>
      <Text>Price: ${item.price.toFixed(2)}</Text>
      <View style={styles.quantityContainer}>
        <TouchableOpacity onPress={() => updateQuantity(item.id, -1)} style={styles.quantityButton}>
          <Text style={styles.quantityButtonText}>-</Text>
        </TouchableOpacity>
        <Text>{item.quantity}</Text>
        <TouchableOpacity onPress={() => updateQuantity(item.id, 1)} style={styles.quantityButton}>
          <Text style={styles.quantityButtonText}>+</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => removeFromCart(custPhoneNumber, item.id)} style={styles.removeButton}>
        <Text style={styles.removeButtonText}>Remove</Text>
      </TouchableOpacity>
      
    </View>
  );

  const updateQuantity = (productId, value) => {
    const updatedCartItems = { ...cartItems };
    updatedCartItems[custPhoneNumber] = updatedCartItems[custPhoneNumber].map(item => {
      if (item.id === productId) {
        const newQuantity = Math.max(1, item.quantity + value);
        return {
          ...item,
          quantity: newQuantity,
        };
      }
      return item;
    });
    setCartItems(updatedCartItems);
  };

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    if (cartItems[custPhoneNumber]) {
      cartItems[custPhoneNumber].forEach(item => {
        totalPrice += item.price * item.quantity;
      });
    }
    return totalPrice.toFixed(2);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.totalPrice}>Total Price: ${calculateTotalPrice()}</Text>
      {cartItems[custPhoneNumber] && cartItems[custPhoneNumber].length === 0 ? (
        <Text>Your cart is empty!</Text>
      ) : (
        <>
          <FlatList
            data={cartItems[custPhoneNumber]}
            renderItem={renderItem}
            keyExtractor={item => item.id.toString()}
          />
          <TouchableOpacity onPress={() => clearCart(custPhoneNumber)} style={styles.clearButton}>
            <Text style={styles.clearButtonText}>Clear Cart</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  itemContainer: {
    marginBottom: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  quantityButton: {
    backgroundColor: '#ddd',
    padding: 8,
    borderRadius: 5,
  },
  quantityButtonText: {
    fontSize: 18,
    color: '#555',
  },
  removeButton: {
    marginTop: 8,
    backgroundColor: 'red',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
    alignItems: 'center',
  },
  removeButtonText: {
    color: '#fff',
  },
  clearButton: {
    marginTop: 16,
    backgroundColor: 'gray',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 5,
    alignItems: 'center',
  },
  clearButtonText: {
    color: '#fff',
  },
});

export default CartScreen;
