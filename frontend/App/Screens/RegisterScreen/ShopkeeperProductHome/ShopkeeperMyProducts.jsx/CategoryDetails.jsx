import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';

const CategoryDetails = ({ route }) => {
    const { category, phoneNumber, userType } = route.params;
    const [products, setProducts] = useState(category.products);

    const deleteProduct = async (productId) => {
        try {
            const response = await fetch('http://192.168.29.67:3000/deleteProduct', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    phoneNumber: phoneNumber,
                    productId: productId,
                }),
            });
            if (response.ok) {
                // Remove the deleted product from the products state
                setProducts(prevProducts => prevProducts.filter(product => product.id !== productId));
                Alert.alert('Success', 'Product deleted successfully');
            } else {
                console.error('Failed to delete product:', response.statusText);
            }
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    const addToCart = (productId) => {
        // Implement your addToCart logic here
        Alert.alert('Add to Cart', `Product ${productId} added to cart`);
    };

    const renderProduct = ({ item }) => (
        <View style={styles.productContainer}>
            <Text>Main Category: {item.main_category}</Text>
            <Text>Product Name: {item.product_name}</Text>
            <Text>ID: {item.id}</Text>
            <Text>Brand: {item.brand_name}</Text>
            <Text>Price: ${item.price}</Text>
            <Text>Weight: {item.weight}</Text>
            {userType === 'shopkeeper' ? (
                <TouchableOpacity onPress={() => deleteProduct(item.id)} style={styles.deleteButton}>
                    <Text style={styles.deleteButtonText}>Delete</Text>
                </TouchableOpacity>
            ) : (
                <TouchableOpacity onPress={() => addToCart(item.id)} style={styles.addToCartButton}>
                    <Text style={styles.addToCartButtonText}>Add to Cart</Text>
                </TouchableOpacity>
            )}
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
    deleteButton: {
        marginTop: 8,
        backgroundColor: 'red',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 5,
        alignItems: 'center',
    },
    deleteButtonText: {
        color: '#fff',
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
