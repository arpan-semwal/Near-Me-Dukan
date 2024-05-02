import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import Colors from '../../../../../utils/Colors';

export default function ViewOrders() {
    const route = useRoute();
    const { shopkeeperPhoneNumber } = route.params || {};
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = () => {
        fetch(`http://192.168.29.68:3000/orders/shop/${shopkeeperPhoneNumber}`)
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
            <View key={index} style={styles.cartItemContainer}>
                <Text style={styles.cartItemText}>Name: {item.name}</Text>
                <Text style={styles.cartItemText}>Price: {item.price}</Text>
                <Text style={styles.cartItemText}>Quantity: {item.quantity}</Text>
                {/* Add other cart item details */}
            </View>
        ));
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>
                <Text style={styles.orderTitle}>Orders for Shopkeeper Phone: {shopkeeperPhoneNumber}</Text>
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
    cartItemContainer: {
        backgroundColor: '#F0F0F0',
        padding: 10,
        borderRadius: 5,
        marginBottom: 5,
    },
    cartItemText: {
        fontSize: 14,
        marginBottom: 3,
    },
});