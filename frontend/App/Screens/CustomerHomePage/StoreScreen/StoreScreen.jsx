import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet, Dimensions, TextInput, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; // Import AntDesign icons from Expo
import storeData from './StoreDummy'; // Import the dummy data

const windowWidth = Dimensions.get('window').width;

export default function StoreScreen({ route }) {
    const { shopName, customerName , shopID } = route.params; // Get shopName and customerName from route.params
    const [numColumns, setNumColumns] = useState(3); // Initial number of columns
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredProducts, setFilteredProducts] = useState(storeData.products); // Initialize filtered products with all products

    // Function to filter products based on search query
    const filterProducts = () => {
        if (searchQuery.trim() === '') {
            // If search query is empty, show all products
            setFilteredProducts(storeData.products);
        } else {
            // Filter products based on search query
            const filtered = storeData.products.filter(product =>
                product.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredProducts(filtered);
        }
    };

    // Call filterProducts whenever searchQuery changes
    useEffect(() => {
        filterProducts();
    }, [searchQuery]);

    // Render product item
    const renderProductItem = ({ item }) => (
        <View style={styles.productContainer}>
            <Image source={item.image} style={styles.productImage} />
            <Text style={styles.productName}>{item.name}</Text>
        </View>
    );

    // Handle search button press
    const handleSearch = () => {
        filterProducts(); // Call filterProducts function to update filtered products
    };

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Image source={require('../../../../assets/logo.png')} style={styles.storeImage} />
                <View>
                    <Text style={styles.welcomeText}>Welcome : {customerName}</Text>
                     
                    <Text style={styles.shoppingAt1}>Shopping at: {shopName}</Text>
                    <Text style={styles.shoppingAt}>Change Shop </Text>
					<Text style={styles.shoppingAt2} >Shopping at: <Text style={styles.shopIDText}>{shopID}</Text></Text>
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
            <FlatList
                key={numColumns.toString()} // Update key when the number of columns changes
                data={filteredProducts} // Render filtered products
                renderItem={renderProductItem}
                keyExtractor={(item) => item.id.toString()}
                numColumns={numColumns}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    storeImage: {
        width: windowWidth * 0.2, // Adjust image width based on window width
        height: windowWidth * 0.2, // Adjust image height based on window width
        borderRadius: windowWidth * 0.03, // Adjust border radius based on window width
        marginRight: 20,
        marginLeft: 10,
    },
    welcomeText: {
        fontSize: windowWidth * 0.06, // Adjust font size based on window width
        fontWeight: 'bold',
        marginBottom: 5,
    },
    customerName: {
        fontSize: windowWidth * 0.04, // Adjust font size based on window width
        marginBottom: 5,
    },
	shoppingAt: {
        fontSize: windowWidth * 0.04,
        fontWeight: 'bold',
		marginTop:3,
        marginBottom: 3,
		color: '#9F9F9F',
       // Change the color to #9F9F9F
    },
	shoppingAt1:{
		fontWeight:'bold',
		fontSize:17	
	},
	shoppingAt2:{
		fontWeight:'bold',
		fontSize:17	
	},
	shopIDText: {
        fontSize: windowWidth * 0.04,
        marginBottom: 5,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: windowWidth * 0.02, // Adjust marginBottom based on window width
        paddingHorizontal: windowWidth * 0.02, // Adjust paddingHorizontal based on window width
    },
    searchInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: windowWidth * 0.02, // Adjust borderRadius based on window width
        paddingVertical: windowWidth * 0.02, // Adjust paddingVertical based on window width
        paddingHorizontal: windowWidth * 0.04, // Adjust paddingHorizontal based on window width
        marginRight: windowWidth * 0.02, // Adjust marginRight based on window width
    },
    searchButton: {
        padding: windowWidth * 0.02, // Adjust padding based on window width
        backgroundColor: '#ccc',
        borderRadius: windowWidth * 0.02, // Adjust borderRadius based on window width
    },
    productContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: windowWidth * 0.02, // Adjust margin based on window width
        backgroundColor: '#f0f0f0',
        borderRadius: windowWidth * 0.03, // Adjust borderRadius based on window width
        padding: windowWidth * 0.02, // Adjust padding based on window width
        width: (windowWidth - windowWidth * 0.06) / 3, // Adjusted width to fit 3 items in a row
    },
    productImage: {
		width: windowWidth * 0.23, // Adjust image width based on window width
		height: windowWidth * 0.23, // Adjust image height based on window width
		borderRadius: (windowWidth * 0.3) / 2, // Set borderRadius to half of the width and height to create a circle
		marginBottom: windowWidth * 0.02, // Adjust marginBottom based on window width
		borderWidth: 2, // Add border width
		borderColor: '#000', // Add border color
},
    productName: {
        fontSize: windowWidth * 0.04, // Adjust font size based on window width
        fontWeight: 'bold',
    },
});
