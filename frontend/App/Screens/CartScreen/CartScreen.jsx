import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useCart, useCustomer } from '../../Context/ContextApi';
import { useNavigation } from '@react-navigation/native';

const CartScreen = () => {
  const { cartItems, removeFromCart, clearCart, custPhoneNumber, setCartItems,shopID ,  } = useCart();
  const { firstCustomerName  } = useCustomer(); // Use useCustomer hook here
  const navigation = useNavigation();

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemName}>{item.name}</Text>
      <Text style={styles.itemPrice}>Price: ${item.price.toFixed(2)}</Text>
      <View style={styles.quantityContainer}>
        <TouchableOpacity onPress={() => updateQuantity(item.id, -1)} style={styles.quantityButton}>
          <Text style={styles.quantityButtonText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.itemQuantity}>{item.quantity}</Text>
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

  const handlePayAtShop = () => {
    // Implement payment logic here, e.g., navigate to a confirmation screen or display a message
    navigation.navigate('Checkout', { totalPrice: calculateTotalPrice(), cartItems: cartItems[custPhoneNumber]  , firstCustomerName:firstCustomerName});
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Image source={require("../../../assets/logo.png")} style={styles.storeImage} />
        <View style={styles.headerText}>
          <Text style={styles.welcomeText}>Welcome: {firstCustomerName}</Text>
          <Text style={styles.shoppingAt}>Shopping at: {shopID}</Text>
          
        </View>
      </View>
      {cartItems[custPhoneNumber] && cartItems[custPhoneNumber].length === 0 ? (
        <Text>Your cart is empty!</Text>
      ) : (
        <FlatList
          data={cartItems[custPhoneNumber]}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.flatListContent}
        />
      )}
      <View style={styles.footerContainer}>
        <Text style={styles.totalPrice}>Total Price: ${calculateTotalPrice()}</Text>
        <TouchableOpacity onPress={handlePayAtShop} style={styles.payButton}>
          <Text style={styles.payButtonText}>Proceed To Pay</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  storeImage: {
    width: 80,
    height: 80,
    marginRight: 16,
  },
  headerText: {
    flex: 1,
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  shoppingAt: {
    fontSize: 14,
  },
  flatListContent: {
    paddingBottom: 100, // Ensure there's enough space at the bottom
  },
  itemContainer: {
    marginBottom: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
    marginHorizontal: 16,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemPrice: {
    fontSize: 14,
    color: '#333',
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
  itemQuantity: {
    marginHorizontal: 12,
    fontSize: 16,
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
  footerContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#ccc',
    alignItems: 'center',
  },
  totalPrice: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  payButton: {
    backgroundColor: 'green',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 5,
    alignItems: 'center',
  },
  payButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default CartScreen;
