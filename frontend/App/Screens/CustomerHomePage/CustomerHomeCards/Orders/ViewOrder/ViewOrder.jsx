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
        fetch(`http://172.16.16.41:3000/orders/shop/${shopkeeperPhoneNumber}`)
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
                <Text style={styles.orderText}>Total Price: {order.totalPrice}</Text>
                <Text style={styles.orderText}>Date: {formatDate(order.created_at)}</Text>
                <Text style={styles.orderText}>Selected Time: {order.selectedTime}</Text>
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
    
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
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