import React, { useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useCart } from '../../Context/ContextApi';
import { FontAwesome } from '@expo/vector-icons'; // Import the delete icon from FontAwesome

const CartScreen = ({ route }) => {
  const { cartItems, removeFromCart } = useCart(); // Add removeFromCart function from context
  const [totalPrice, setTotalPrice] = useState(calculateTotalPrice(cartItems));

  // Function to calculate the total price of items in the cart
  function calculateTotalPrice(items) {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  // Function to handle increasing quantity
  const handleIncreaseQuantity = (item) => {
    item.quantity++;
    setTotalPrice(calculateTotalPrice(cartItems));
  };

  // Function to handle decreasing quantity
  const handleDecreaseQuantity = (item) => {
    if (item.quantity > 1) {
      item.quantity--;
      setTotalPrice(calculateTotalPrice(cartItems));
    }
  };

  // Function to handle deleting item from the cart
  const handleDeleteItem = (itemId) => {
	removeFromCart(itemId); // Pass itemId instead of item
	setTotalPrice(calculateTotalPrice(cartItems));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.cartTitle}>Cart Items:</Text>
      <FlatList
        data={cartItems}
        keyExtractor={(item, index) => `${item.id}_${index}`}
        renderItem={({ item }) => (
          <View style={styles.productContainer}>
            <View style={styles.productBackground}>
              {/* Render product image */}
              <Image source={item.image} style={styles.productImage} />
              <View style={styles.productDetails}>
                {/* Render product title */}
                <Text style={styles.title}>{item.title}</Text>
                {/* Render product price */}
                <Text style={styles.info}>Price: ₹{item.price}</Text>
                {/* Render product quantity and buttons */}
                <View style={styles.quantityContainer}>
                  <TouchableOpacity style={styles.quantityButton} onPress={() => handleDecreaseQuantity(item)}>
                    <Text>-</Text>
                  </TouchableOpacity>
                  <Text>{item.quantity}</Text>
                  <TouchableOpacity style={styles.quantityButton} onPress={() => handleIncreaseQuantity(item)}>
                    <Text>+</Text>
                  </TouchableOpacity>
                  {/* Render delete icon */}
				  <TouchableOpacity onPress={() => handleDeleteItem(item.id)}>
					<FontAwesome name="trash-o" size={24} color="red" />
				</TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        )}
      />
      {/* Render total price */}
      <View style={styles.totalPriceContainer}>
        <Text>Total Price: ₹{totalPrice}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  cartTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  productContainer: {
    marginVertical: 7,
  },
  productBackground: {
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 20,
  },
  productDetails: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  info: {
    fontSize: 16,
    marginBottom: 5,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  quantityButton: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    padding: 5,
    marginHorizontal: 5,
  },
  totalPriceContainer: {
    borderTopWidth: 1,
    borderColor: '#ccc',
    paddingTop: 10,
    marginTop: 10,
    alignItems: 'center',
  },
});

export default CartScreen;
