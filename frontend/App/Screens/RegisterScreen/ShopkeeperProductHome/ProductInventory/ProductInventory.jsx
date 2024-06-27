import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert, ActivityIndicator, Image, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProductInventory = ({ route }) => {
    const { selectedCategory, phoneNumber, shopkeeperPhoneNumber, shopkeeperName } = route.params;
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        // Reset products and loading state when phone number changes
        setProducts([]);
        setFilteredProducts([]);
        setLoading(true);
        fetchProducts();
    }, [phoneNumber]);

    useEffect(() => {
        // Filter products when search text changes
        filterProducts();
    }, [searchText]);

    const filterProducts = () => {
        const filtered = products.filter(product =>
            product.product_name.toLowerCase().startsWith(searchText.toLowerCase()) ||
            product.brand_name.toLowerCase().startsWith(searchText.toLowerCase())
        );
        setFilteredProducts(filtered);
    };

    const fetchProducts = async () => {
        try {
            const response = await fetch(`http://192.168.29.67:3000/products/${selectedCategory}`);
            if (response.ok) {
                const data = await response.json();
                const productsWithAddedStatus = data.map(product => ({ ...product, added: false }));
                await updateProductsAddedStatus(productsWithAddedStatus);
                // Set products directly after fetching
                setProducts(productsWithAddedStatus);
                // Filter products
                filterProducts();
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
            <Image source={{ uri: `'http://192.168.29.67:3000/${item.picture_path}` }} style={styles.productImage} />
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
            <View style={styles.headerContainer}>
                {/* Your header content */}
            </View>
            <TextInput
                style={styles.searchInput}
                placeholder="Search products..."
                value={searchText}
                onChangeText={setSearchText}
            />
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <FlatList
                    data={filteredProducts.length > 0 ? filteredProducts : products}
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
        padding: 16,
        backgroundColor: '#fff',
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    searchInput: {
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 16,
    },
    productContainer: {
        marginBottom: 16,
        padding: 16,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        backgroundColor: '#f9f9f9',
    },
    productName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    productBrand: {
        fontSize: 14,
        marginBottom: 4,
    },
    productPrice: {
        fontSize: 14,
        marginBottom: 4,
    },
    productWeight: {
        fontSize: 14,
        marginBottom: 8,
    },
    productImage: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
        marginBottom: 8,
    },
    addButton: {
        marginTop: 8,
        backgroundColor: 'green',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 5,
        alignItems: 'center',
    },
});

export default ProductInventory;
