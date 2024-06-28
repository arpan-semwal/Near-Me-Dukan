import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ShopkeeperMyProducts = ({ route }) => {
    const [categories, setCategories] = useState([]);
    const { phoneNumber , userType , shopkeeperName } = route.params;
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

    const renderCategory = ({ item, index }) => (
        <TouchableOpacity
            style={[styles.categoryContainer, index % 2 === 1 ? styles.rightMargin : null]}
            onPress={() => navigation.navigate('CategoryDetails', { category: item, phoneNumber , userType , shopkeeperName:shopkeeperName })}>
            <Text style={styles.categoryName}>{item.main_category}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={categories}
                renderItem={renderCategory}
                keyExtractor={(item) => item.main_category}
                numColumns={2} // Set number of columns to 2
                contentContainerStyle={styles.contentContainer} // Apply contentContainerStyle
            />
        </View>
    );
};

const { width } = Dimensions.get('window');
const itemWidth = (width - 32) / 2; // Calculate item width for two items per row

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 16,
        paddingHorizontal: 8,
        backgroundColor: '#fff',
    },
    contentContainer: {
        alignItems: 'center',
    },
    categoryContainer: {
        marginBottom: 16,
        padding: 20,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        backgroundColor: '#f9f9f9',
        alignItems: 'center',
        width: itemWidth,
        marginHorizontal: 4,
        marginVertical: 8,
    },
    categoryName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    rightMargin: {
        marginRight: 0, // No need for right margin in this layout
    },
});

export default ShopkeeperMyProducts;
