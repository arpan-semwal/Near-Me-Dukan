import React, { useState } from 'react';
import { View, Text, Image, Button, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import Colors from '../../../../utils/Colors';
import { productData } from './ProductDetails'; 
import { useCart } from '../../../../Context/ContextApi'; // Import the CartContext 

const ProductDetails = ({ route }) => {
  const { customerName, shopID, shopName } = route.params;
  const { addToCart } = useCart(); 

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(productData);

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (!query.trim()) {
      // If search query is empty, show all products
      setFilteredProducts(productData);
      return;
    }
    const filtered = productData.filter(
      (item) =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.weight.toLowerCase().includes(query.toLowerCase()) ||
        item.price.toString().toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const [addedToCartItems, setAddedToCartItems] = useState([]);

  const handleAddToCart = (item) => {
    addToCart(item);
    setAddedToCartItems([...addedToCartItems, item.id]);
  };

  const isAddedToCart = (itemId) => {
    return addedToCartItems.includes(itemId);
  };

  const renderProductItem = ({ item }) => (
    <View style={styles.productContainer}>
      <View style={styles.productBackground}>
        <Image source={item.image} style={styles.productImage} />
        <View style={styles.productDetails}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.info}>{item.weight}</Text>
          <View style={styles.priceAndButtonContainer}>
            <Text style={styles.price}>₹{item.price}</Text>
            <TouchableOpacity
              style={[
                styles.addToCartButton,
                addedToCartItems.includes(item.id) ? styles.addedToCartButton : null
              ]}
              onPress={() => handleAddToCart(item)}
              disabled={addedToCartItems.includes(item.id)}
            >
              <Text style={styles.buttonText}>
                {addedToCartItems.includes(item.id) ? "Added to Cart" : "Add to Cart"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Image source={require('../../../../../assets/logo.png')} style={styles.storeImage} />
        <View style={styles.headerText}>
          <Text style={styles.welcomeText}>Welcome: {customerName}</Text>
          <Text style={styles.shoppingAt}>Shopping at: {shopName}</Text>
          <Text style={styles.shoppingAt}>Change Shop</Text>
          <Text style={styles.shoppingAt}>Shop ID: {shopID}</Text>
        </View>
      </View>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search..."
          value={searchQuery}
          onChangeText={handleSearch}
        />
        <TouchableOpacity style={styles.searchButton} onPress={() => handleSearch(searchQuery)}>
          <AntDesign name="search1" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        {filteredProducts.map((item) => (
          <View key={item.id} style={styles.productContainer}>
            {renderProductItem({ item })}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
	container: {
        flex: 1,
        padding: 4,
        backgroundColor: Colors.BACKGROUND
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between', // Align children with equal spacing
        marginBottom: 20,
        paddingHorizontal: 10, // Add horizontal padding
    },
    storeImage: {
        width: 90,
        height: 90,
        borderRadius: 10,
    },
    headerText: {
        flex: 1,
        marginLeft: 20, // Add left margin
    },
    welcomeText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    customerName: {
        fontSize: 16,
        marginBottom: 5,
    },
    shoppingAt: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        paddingHorizontal: 10, // Add horizontal padding
        marginTop: 10, // Add margin to the top
    },
    searchInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingVertical: 8,
        paddingHorizontal: 10,
        marginRight: 10,
    },
    searchButton: {
        padding: 10,
        backgroundColor: '#ccc',
        borderRadius: 5,
    },
    scrollViewContainer: {
        flexGrow: 1,
        paddingVertical: 5, // Add padding to the ScrollView to avoid overlapping with the header
    },
    productContainer: {
        marginVertical: 7,
        padding: 10, // Add margin between product containers
    },
    productBackground: {
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 30,
    },
    productImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginRight: 20,
        borderWidth: 1,
        borderColor: 'black',
    },
    productDetails: {
        flex: 1,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    info: {
        fontSize: 17,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    priceAndButtonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    price: {
        fontSize: 19,
        fontWeight: 'bold',
        marginRight: 10,
    },
    addToCartButton: {
        backgroundColor: '#007bff',
        borderRadius: 5,
        paddingVertical: 8,
        paddingHorizontal: 15,
    },
    addedToCartButton: {
        backgroundColor: '#28a745',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default ProductDetails;