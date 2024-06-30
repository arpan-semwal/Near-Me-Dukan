import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert, Image } from 'react-native';
import { useCart } from '../../../../Context/ContextApi';

const CategoryDetails = ({ route }) => {
  const { category, shopkeeperName , shopkeeperPhonenumber } = route.params;
  const { addToCart, custPhoneNumber, userType, firstCustomerName } = useCart(); // Using addToCart function and custPhoneNumber from CartContext
  
  const [products, setProducts] = useState(category.products);

  // Function to add a product to the cart
  const addProductToCart = (product) => {
    addToCart(custPhoneNumber, product, shopkeeperName, shopkeeperPhonenumber); // Pass shopkeeperPhonenumber
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
      return null;
    };

    return (
      <View style={styles.productContainer}>
        <Text>Main Category: {item.main_category}</Text>
        <Text>Product Name: {item.product_name}</Text>
        <Text>ID: {item.id}</Text>
        <Text>Brand: {item.brand_name}</Text>
        <Text>Price: ${item.price}</Text>
        <Text>Store Name: {item.shopID}</Text>
        <Text>Weight: {item.weight}</Text>
        {renderButton()}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header section */}
      <View style={styles.headerContainer}>
        <Image source={require('../../../../../assets/logo.png')} style={styles.storeImage} />
        <View style={styles.headerText}>
          <Text style={styles.welcomeText}>Welcome: {firstCustomerName}</Text>
          <Text style={styles.shoppingAt}>Shopping at: {custPhoneNumber}</Text>
        </View>
      </View>

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
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  storeImage: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
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
    color: '#555',
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
