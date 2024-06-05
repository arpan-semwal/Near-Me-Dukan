import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

const CategoryDetails = ({ route }) => {
    const { category, phoneNumber } = route.params;

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
                // Implement deletion logic here, e.g., refreshing the list or showing a success message
                console.log('Product deleted successfully');
            } else {
                console.error('Failed to delete product:', response.statusText);
            }
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    const renderProduct = ({ item }) => (
        <View style={styles.productContainer}>
            <Text>Main Category: {item.main_category}</Text>
            <Text>Product Name: {item.product_name}</Text>
            <Text>ID: {item.id}</Text>
            <Text>Brand: {item.brand_name}</Text>
            <Text>Price: ${item.price}</Text>
            <Text>Weight: {item.weight}</Text>
            <TouchableOpacity onPress={() => deleteProduct(item.id)} style={styles.deleteButton}>
                <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={category.products}
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
});

export default CategoryDetails;
