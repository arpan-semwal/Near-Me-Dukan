import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useCart } from '../../../../Context/ContextApi';

const CategoryDetails = ({ route }) => {
  const { category,shopkeeperName } = route.params;
  const { addToCart, custPhoneNumber, userType  } = useCart(); // Using addToCart function and custPhoneNumber from CartContext

  const [products, setProducts] = useState(category.products);

  // Function to add a product to the cart
  const addProductToCart = (product) => {
    addToCart(custPhoneNumber, product , shopkeeperName); // Call the addToCart function from the context with custPhoneNumber
    Alert.alert('Product added to cart successfully!');
   
  };

  // Function to render each product item
  const renderProduct = ({ item }) => {
    // Check userType to conditionally render the Add to Cart button
    const renderButton = () => {
      if (userType === 'customer') {
        return (
          <TouchableOpacity onPress={() => addProductToCart(item)} style={styles.addToCartButton}>
            <Text style={styles.addToCartButtonText}>Add to Cart</Text>
          </TouchableOpacity>
        );
      }
      return null; // If userType is shopkeeper, don't render the button
    };

    return (
      <View style={styles.productContainer}>
        <Text>Main Category: {item.main_category}</Text>
        <Text>Product Name: {item.product_name}</Text>
        <Text>ID: {item.id}</Text>
        <Text>Brand: {item.brand_name}</Text>
        <Text>Price: ${item.price}</Text>
        <Text>Weight: {item.weight}</Text>
        
        {renderButton()}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList data={products} renderItem={renderProduct} keyExtractor={(item) => item.id.toString()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  productContainer: {
    marginBottom: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
  },
  addToCartButton: {
    marginTop: 8,
    backgroundColor: 'green',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
    alignItems: 'center',
  },
  addToCartButtonText: {
    color: '#fff',
  },
});

export default CategoryDetails;
