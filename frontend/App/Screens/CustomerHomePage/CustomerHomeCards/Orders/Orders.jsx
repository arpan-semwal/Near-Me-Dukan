// Orders.js

import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Colors from '../../../../utils/Colors';
import { useCart, useCustomer } from '../../../../Context/ContextApi';

export default function Orders({ route }) {
    const navigation = useNavigation();
    const { custName, custPhoneNumber, cartItems, totalPrice, shopID, shopkeeperName, phoneNumber , selectedDate,selectedTime } = route.params || {};
    const [shops, setShops] = useState([]);

    useEffect(() => {
        fetchShops();
    }, []);

    const fetchShops = () => {
        fetch(`http://172.16.16.41:3000/orders/shops?customerPhoneNumber=${custPhoneNumber}`)
            .then(response => response.json())
            .then(data => {
                const uniqueShops = {};
                data.forEach(shop => {
                    if (shop.shopID && shop.shopkeeperPhonenumber) {
                        uniqueShops[shop.shopkeeperPhonenumber] = {
                            shopID: shop.shopID,
                            shopkeeperPhoneNumber: shop.shopkeeperPhonenumber
                        };
                    }
                });
                setShops(Object.values(uniqueShops));
            })
            .catch(error => console.error('Error fetching shops:', error));
    };

    const handleViewOrders = (shopID, shopkeeperPhoneNumber) => {
        navigation.navigate('ViewOrder', {
            shopID: shopID,
            custPhoneNumber: custPhoneNumber,
            phoneNumber: phoneNumber,
            shopkeeperPhoneNumber: shopkeeperPhoneNumber
        });
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>
                <Text style={styles.title}>My Orders</Text>
                {/* Map through shops and display each shop */}
                {shops.map((shop, index) => (
                    <View key={index} style={styles.shopContainer}>
                        <Text style={styles.shopTitle}>Shop ID: {shop.shopID}</Text>
                        <Text style={styles.shopkeeperPhoneNumber}>Shopkeeper Phone: {shop.shopkeeperPhoneNumber}</Text>
                        <TouchableOpacity style={styles.button} onPress={() => handleViewOrders(shop.shopID, shop.shopkeeperPhoneNumber)}>
                            <Text style={styles.buttonText}>View Orders</Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        backgroundColor: Colors.BACKGROUND,
        padding: 20,
    },
    container: {
        flex: 1,
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    shopContainer: {
        marginBottom: 20,
        padding: 20,
        backgroundColor: '#E4E4E4',
        borderRadius: 10,
    },
    shopTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    shopkeeperPhoneNumber: {
        fontSize: 16,
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 5,
        alignSelf: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});
