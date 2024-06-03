import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';

const ProductInventory = ({ route }) => {
    const { selectedCategory } = route.params;
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await fetch(`http://192.168.29.67:3000/products/${selectedCategory}`);
            if (response.ok) {
                const data = await response.json();
                setProducts(data);
            } else {
                console.error('Failed to fetch products:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    };

    const renderItem = ({ item }) => (
        <View style={styles.productContainer}>
            
            <Text style={styles.productName}>{item.main_category}</Text>
            <Text style={styles.productName}>{item.product_name}</Text>
            <Text style={styles.productBrand}>{item.brand_name}</Text>
            <Text style={styles.productPrice}>Price: ${item.price}</Text>
            <Text style={styles.productWeight}>Weight: {item.weight}</Text>
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
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
    productContainer: {
        backgroundColor: '#fff',
        padding: 26,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 8,
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
});

export default ProductInventory;
