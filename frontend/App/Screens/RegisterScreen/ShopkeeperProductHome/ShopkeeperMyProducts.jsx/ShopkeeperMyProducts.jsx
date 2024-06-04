import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

const ShopkeeperMyProducts = ({ route }) => {
    const [selectedProducts, setSelectedProducts] = useState([]);
    const { phoneNumber } = route.params;

    useEffect(() => {
        fetchSelectedProducts();
    }, []);

    const fetchSelectedProducts = async () => {
        try {
            const response = await fetch(`http://192.168.29.67:3000/myProducts/${phoneNumber}`);
            if (response.ok) {
                const data = await response.json();
                setSelectedProducts(data);
            } else {
                console.error('Failed to fetch selected products:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching selected products:', error);
        }
    };

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
                setSelectedProducts(prevProducts => prevProducts.filter(product => product.id !== productId));
                console.log('Product deleted successfully');
            } else {
                console.error('Failed to delete product:', response.statusText);
            }
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    const renderSelectedProduct = ({ item }) => (
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
                data={selectedProducts}
                renderItem={renderSelectedProduct}
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

export default ShopkeeperMyProducts;
