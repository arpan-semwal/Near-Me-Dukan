import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import {useCart} from '../../../../Context/ContextApi';
 

const CategoryDetails = ({ route }) => {
    const { category, phoneNumber, userType } = route.params;
    const [products, setProducts] = useState(category.products);
    const { addToCart } = useCart(); // Using addToCart function from CartContext

    // Function to add a product to the cart
    const addProductToCart = (product) => {
        addToCart(product); // Call the addToCart function from the context
        Alert.alert('Product added to cart successfully!');
    };

    const renderProduct = ({ item }) => (
        <View style={styles.productContainer}>
            <Text>Main Category: {item.main_category}</Text>
            <Text>Product Name: {item.product_name}</Text>
            <Text>ID: {item.id}</Text>
            <Text>Brand: {item.brand_name}</Text>
            <Text>Price: ${item.price}</Text>
            <Text>Weight: {item.weight}</Text>
            {/* Render button to add product to cart */}
            <TouchableOpacity onPress={() => addProductToCart(item)} style={styles.addToCartButton}>
                <Text style={styles.addToCartButtonText}>Add to Cart</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={products}
                renderItem={renderProduct}
                keyExtractor={(item) => item.id.toString()}
            />
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
