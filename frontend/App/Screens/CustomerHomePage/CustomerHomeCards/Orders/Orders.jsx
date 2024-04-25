import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Colors from '../../../../utils/Colors';

export default function Orders() {
    const navigation = useNavigation();
    const route = useRoute();
    const { customerPhone, shopID } = route.params;

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = () => {
        // Make API call to fetch orders and shopkeeper details based on customerPhone and shopID
        fetch(`http://192.168.29.68:3000/orders?customerPhoneNumber=${customerPhone}&shopID=${shopID}`)
            .then(response => response.json())
            .then(data => {
                setOrders(data);
            })
            .catch(error => console.error('Error fetching orders:', error));
    };

    // Render orders
    const renderOrders = () => {
        return orders.map((order, index) => (
            <View key={index} style={styles.orderContainer}>
                <Text style={styles.orderText}>Order ID: {order.id}</Text>
                <Text style={styles.orderText}>Shop ID: {order.shopID}</Text>
                <Text style={styles.orderText}>Shopkeeper: {order.shopkeeperName}</Text>
                <Text style={styles.orderText}>Total Price: {order.totalPrice}</Text>
                <Text style={styles.orderText}>Date: {order.created_at}</Text>
                <Text style={styles.orderText}>Cart Items:</Text>
                {renderCartItems(order.cartItems)}
                {/* Add other order details */}
            </View>
        ));
    };

    // Render cart items
    const renderCartItems = (cartItems) => {
        const parsedCartItems = JSON.parse(cartItems);
        return parsedCartItems.map((item, index) => (
            <Text key={index}>{item.name}</Text>
        ));
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>
                <Text style={styles.orderTitle}>My Previous Orders</Text>
                {/* Body section */}
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
        textAlign: 'center',
    },
    orderText: {
        fontSize: 16,
        marginBottom: 5,
    },
});
