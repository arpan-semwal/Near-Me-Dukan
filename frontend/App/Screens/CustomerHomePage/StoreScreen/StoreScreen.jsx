import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet, Dimensions, TextInput, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; // Import AntDesign icons from Expo
import storeData from './StoreDummy'; // Import the dummy data
import Colors from '../../../utils/Colors';

const windowWidth = Dimensions.get('window').width;

export default function StoreScreen({ route, navigation }) {
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
        <TouchableOpacity onPress={() => handleProductPress(item)}>
            <View style={styles.productContainer}>
                <Image source={item.image} style={styles.productImage} />
                <Text style={styles.productName}>{item.name}</Text>
            </View>
        </TouchableOpacity>
    );

    // Handle search button press
    const handleSearch = () => {
        filterProducts(); // Call filterProducts function to update filtered products
    };

    // Handle product press
    const handleProductPress = (item) => {
        // Navigate to product details screen and pass necessary parameters
        navigation.navigate('ProductDetails', {
            product: item,
            customerName: customerName,
            shopID: shopID,
            shopName: shopName
        });
    };

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Image source={require('../../../../assets/logo.png')} style={styles.storeImage} />
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
        padding: 4,
        backgroundColor:Colors.BACKGROUND
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
    productContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5,
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
        padding: 10,
        width: (windowWidth - 30) / 3, // Adjusted width to fit 3 items in a row
    },
    productImage: {
        width: 80,
        height: 80,
        borderRadius: 50,
        marginBottom: 5,
        borderWidth: 2, 
        borderColor: '#000',  
    },
    productName: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center', // Center align the text
    },
});
