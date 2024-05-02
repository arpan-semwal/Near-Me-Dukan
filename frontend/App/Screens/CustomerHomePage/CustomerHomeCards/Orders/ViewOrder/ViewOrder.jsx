import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import Colors from '../../../../../utils/Colors';


export default function ViewOrders() {
    const route = useRoute();
    const { shopID, custPhoneNumber, phoneNumber } = route.params || {};
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = () => {
        fetch(`http://192.168.29.68:3000/orders?customerPhoneNumber=${custPhoneNumber}&phoneNumber=${phoneNumber}`)
            .then(response => response.json())
            .then(data => {
                setOrders(data);
            })
            .catch(error => console.error('Error fetching orders:', error));
    };

    const renderOrders = () => {
        return orders.map((order, index) => (
            <View key={index} style={styles.orderContainer}>
                <Text style={styles.orderText}>Order ID: {order.id}</Text>
                <Text style={styles.orderText}>Shopkeeper Phone: {order.shopkeeperPhonenumber}</Text>
                <Text style={styles.orderText}>Total Price: {order.totalPrice}</Text>
                <Text style={styles.orderText}>Date: {order.created_at}</Text>
                <Text style={styles.orderText}>Cart Items:</Text>
                {renderCartItems(order.cartItems)}
            </View>
        ));
    };

    const renderCartItems = (cartItems) => {
        const parsedCartItems = JSON.parse(cartItems);
        return parsedCartItems.map((item, index) => (
            <Text key={index}>{item.name}</Text>
        ));
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>
                <Text style={styles.orderTitle}>Orders from Shop ID: {shopID}</Text>
                {renderOrders()}
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
    orderContainer: {
        backgroundColor: '#E4E4E4',
        padding: 20,
        marginBottom: 20,
        borderRadius: 10,
    },
    orderTitle: {
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    orderText: {
        fontSize: 16,
        marginBottom: 5,
    },
});