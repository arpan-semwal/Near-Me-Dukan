import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ShopkeeperMyProducts = ({ route }) => {
    const [categories, setCategories] = useState([]);
    const { phoneNumber } = route.params;
    const navigation = useNavigation();

    useEffect(() => {
        fetchSelectedProducts();
    }, []);

    const fetchSelectedProducts = async () => {
        try {
            const response = await fetch(`http://192.168.29.67:3000/myProducts/${phoneNumber}`);
            if (response.ok) {
                const data = await response.json();
                const groupedCategories = groupProductsByCategory(data);
                setCategories(groupedCategories);
            } else {
                console.error('Failed to fetch selected products:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching selected products:', error);
        }
    };

    const groupProductsByCategory = (products) => {
        const categoryMap = {};
        products.forEach(product => {
            if (!categoryMap[product.main_category]) {
                categoryMap[product.main_category] = [];
            }
            categoryMap[product.main_category].push(product);
        });
        return Object.keys(categoryMap).map(category => ({
            main_category: category,
            products: categoryMap[category]
        }));
    };

    const renderCategory = ({ item }) => (
        <TouchableOpacity
            style={styles.categoryContainer}
            onPress={() => navigation.navigate('CategoryDetails', { category: item, phoneNumber })}>
            <Text style={styles.categoryName}>{item.main_category}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={categories}
                renderItem={renderCategory}
                keyExtractor={(item) => item.main_category}
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
    categoryContainer: {
        marginBottom: 16,
        padding: 16,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        backgroundColor: '#f9f9f9',
        alignItems: 'center',
    },
    categoryName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default ShopkeeperMyProducts;
