import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProductInventory = ({ route }) => {
    const { selectedCategory, phoneNumber } = route.params;
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Reset products and loading state when phone number changes
        setProducts([]);
        setLoading(true);
        fetchProducts();
    }, [phoneNumber]);

    const fetchProducts = async () => {
        try {
            const response = await fetch(`http://192.168.29.67:3000/products/${selectedCategory}`);
            if (response.ok) {
                const data = await response.json();
                const productsWithAddedStatus = data.map(product => ({ ...product, added: false }));
                await updateProductsAddedStatus(productsWithAddedStatus);
            } else {
                console.error('Failed to fetch products:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    };

    const updateProductsAddedStatus = async (products) => {
        try {
            const addedProducts = await AsyncStorage.getItem(`addedProducts_${phoneNumber}`);
            const addedProductsArray = addedProducts ? JSON.parse(addedProducts) : [];
            const updatedProducts = products.map(product => ({
                ...product,
                added: addedProductsArray.includes(product.id)
            }));
            setProducts(updatedProducts);
        } catch (error) {
            console.error('Error updating product added status:', error);
        }
    };

    const handleAddProduct = async (productId, index) => {
        try {
            const response = await fetch('http://192.168.29.67:3000/addProduct', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ phoneNumber, productId }),
            });

            if (response.ok) {
                const updatedProducts = [...products];
                updatedProducts[index].added = true;
                setProducts(updatedProducts);
                await saveAddedProduct(productId);
                Alert.alert('Success', 'Product added successfully');
            } else {
                console.error('Failed to add product:', response.statusText);
            }
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    const saveAddedProduct = async (productId) => {
        try {
            const addedProducts = await AsyncStorage.getItem(`addedProducts_${phoneNumber}`);
            const addedProductsArray = addedProducts ? JSON.parse(addedProducts) : [];
            if (!addedProductsArray.includes(productId)) {
                addedProductsArray.push(productId);
                await AsyncStorage.setItem(`addedProducts_${phoneNumber}`, JSON.stringify(addedProductsArray));
            }
        } catch (error) {
            console.error('Error saving added product:', error);
        }
    };

    const renderItem = ({ item, index }) => (
        <View style={styles.productContainer}>
            <Text style={styles.productName}>{item.main_category}</Text>
            <Text style={styles.productName}>{item.product_name}</Text>
            <Text style={styles.productBrand}>{item.brand_name}</Text>
            <Text style={styles.productPrice}>Price: ${item.price}</Text>
            <Text style={styles.productWeight}>Weight: {item.weight}</Text>
            <TouchableOpacity
                onPress={() => handleAddProduct(item.id, index)}
                style={[styles.addButton, { backgroundColor: item.added ? 'gray' : 'green' }]}
                disabled={item.added}>
                <Text>{item.added ? 'Added' : 'Add'}</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <FlatList
                    data={products}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    productContainer: {
        width: '100%',
        paddingHorizontal: 10,
        paddingVertical: 15,
        backgroundColor: '#fff',
        borderRadius: 8,
        marginBottom: 10,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
    },
    productName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    productBrand: {
        fontSize: 14,
        color: '#666',
        marginBottom: 4,
    },
    productPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#00c853',
        marginBottom: 4,
    },
    productWeight: {
        fontSize: 14,
        color: '#888',
    },
    addButton: {
        marginTop: 8,
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 5,
        alignItems: 'center',
    },
});

export default ProductInventory;
