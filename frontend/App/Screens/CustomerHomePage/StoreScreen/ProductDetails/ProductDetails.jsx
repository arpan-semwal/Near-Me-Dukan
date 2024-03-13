import React , {useState} from 'react';
import { View, Text, Image, Button, StyleSheet, ScrollView,TextInput, TouchableOpacity} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
// Import the dummy product data
import { productData } from './ProductDetails'; // Update the path accordingly
import Colors from '../../../../utils/Colors';

const ProductDetails = ({ route }) => {
  const { customerName, shopID, shopName } = route.params;

  // Function to handle adding the product to the cart
  const addToCart = (selectedProduct) => {
    // Implement your logic for adding the product to the cart
    console.log('Product added to cart:', selectedProduct.title);
  };

  // Render product item
  const renderProductItem = ({ item }) => (
	<View style={styles.productContainer}>
	  <View style={styles.productBackground}>
		<Image source={item.image} style={styles.productImage} />
		<View style={styles.productDetails}>
		  <Text style={styles.title}>{item.title}</Text>
		  <Text style={styles.info}>{item.weight}</Text>
		  <View style={styles.priceAndButtonContainer}>
			<Text style={styles.info}>₹{item.price}</Text>
			<Button title="Add to Cart"   />
		  </View>
		</View>
	  </View>
	</View>
  );
  const handleSearch = () => {
	filterProducts(); // Call filterProducts function to update filtered products
};
 
  
  
  const [searchQuery, setSearchQuery] = useState('');

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
                    onChangeText={setSearchQuery}
                />
                <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
                    <AntDesign name="search1" size={24} color="black" />
                </TouchableOpacity>
            </View>

      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        {/* Render dummy products */}
        {productData.map((item) => (
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
    backgroundColor: Colors.BACKGROUND,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  storeImage: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  headerText: {
    flex: 1,
  },
  welcomeText: {
    fontSize: 16,
    marginBottom: 5,
  },
  shoppingAt: {
    fontSize: 14,
    marginBottom: 2,
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
  productContainer:{
    padding: 10, // Add margin between product containers
    flexDirection: 'row', // Align elements horizontally
    alignItems: 'center', // Align items vertically
    justifyContent: 'flex-start', // Align items to the left
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
    fontSize: 20, // Adjust the font size
    fontWeight: 'bold',
    marginBottom: 5,
  },
  info: {
    fontSize: 17,
	fontWeight:'bold',
    marginBottom: 5,
  },
});

export default ProductDetails;
