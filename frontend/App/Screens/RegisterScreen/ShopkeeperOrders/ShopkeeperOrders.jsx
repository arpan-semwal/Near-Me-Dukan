import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

export default function ShopkeeperOrders({ route }) {
    const [selectedButton, setSelectedButton] = useState('Today');
    const [orders, setOrders] = useState([]);
    const { shopkeeperPhoneNumber, shopkeeperName } = route.params || {};

    useEffect(() => {
        fetchShopkeeperOrders(); // Fetch orders when the component mounts
    }, []);

    const buttonsData = [
        { id: 1, title: 'Today' },
        { id: 2, title: 'Yesterday' },
        { id: 3, title: 'One Week' },
        { id: 4, title: '30 Days' },
        { id: 5, title: 'All Time' },
        { id: 6, title: 'Select Date Range' },
    ];

    const fetchShopkeeperOrders = () => {
        // Replace the URL with your backend endpoint
        fetch(`http://192.168.29.68:3000/orders/shopkeeper/${shopkeeperPhoneNumber}`)
            .then(response => response.json())
            .then(data => {
                setOrders(data);
            })
            .catch(error => console.error('Error fetching shopkeeper orders:', error));
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity
            key={item.id}
            style={[styles.button, selectedButton === item.title && styles.selectedButton]}
            onPress={() => setSelectedButton(item.title)}>
            <Text style={[styles.buttonText, selectedButton === item.title && styles.selectedButtonText]}>
                {item.title}
            </Text>
        </TouchableOpacity>
    );

    const renderOrderItem = ({ item }) => (
        <View style={styles.orderContainer}>
            <Text>Order ID: {item.id}</Text>
            <Text>Total Price: {item.totalPrice}</Text>
            <Text>Total Price: {item.selectedDate}</Text>
            {/* Add more order details as needed */}
            <View style={styles.productButtonsRow}>
                <TouchableOpacity
                    style={[styles.productButton, styles.fullFillButton]}
                    onPress={() => handleProductAction('Full Fill Order')}>
                    <Text style={styles.productButtonText}>Full Fill Order</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.productButton, styles.viewDetailsButton]}
                    onPress={() => handleProductAction('View Details')}>
                    <Text style={styles.productButtonText}>View Details</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.productButton, styles.cancelButton]}
                    onPress={() => handleProductAction('Cancel Order')}>
                    <Text style={styles.productButtonText}>Cancel Order</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    const handleProductAction = (action) => {
        console.log('Action:', action);
    };

    return (
        <FlatList
            data={[{ key: 'content' }]}
            renderItem={({ item }) => (
                <View style={styles.container}>
                    <View style={styles.headerContainer}>
                        <Image source={require('../../../../assets/logo.png')} style={styles.storeImage} />
                        <View style={styles.headerText}>
                            <Text style={styles.welcomeText}>Welcome: {shopkeeperName}</Text>
                            <Text style={styles.shoppingAt}>Shop ID: {shopkeeperPhoneNumber}</Text>
                            <Text style={styles.shoppingAt}>Subscription Valid till 10 October 2024</Text>
                        </View>
                    </View>

                    <Image source={require('../../../../assets/general.png')} style={styles.fullWidthImage} />

                    <View style={styles.circularImageContainer}>
                        <Image source={require('../../../../assets/name.png')} style={styles.circularImage} />
                    </View>

                    <Text style={styles.ordersHeading}>My Orders</Text>

                    <View style={styles.buttonContainer}>
                        {buttonsData.map(item => renderItem({ item }))}
                    </View>

                    <FlatList
                        data={orders}
                        renderItem={renderOrderItem}
                        keyExtractor={(item) => item.id.toString()}
                    />
                </View>
            )}
            keyExtractor={(item) => item.key}
            style={styles.flatList}
        />
    );
}

const styles = StyleSheet.create({
    flatList: {
        flex: 1,
        backgroundColor: '#fff',
    },
    container: {
        flex: 1,
        padding: 20,
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
        paddingHorizontal: 10,
    },
    storeImage: {
        width: 90,
        height: 90,
        borderRadius: 10,
    },
    headerText: {
        flex: 1,
        marginLeft: 20,
    },
    welcomeText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    customerName: {
        fontSize: 16,
        marginBottom: 5,
    },
    shoppingAt: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    fullWidthImage: {
        width: '100%',
        height: 150,
        marginBottom: 20,
    },
    circularImageContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    circularImage: {
        width: 100,
        height: 100,
        borderRadius: 60,
        borderWidth: 3,
        borderColor: 'white',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: [{ translateX: -60 }, { translateY: -60 }],
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexWrap: 'wrap',
        marginBottom: 20,
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#C7BC00',
        margin: 5,
        width: '30%',
        height: 40,
        borderRadius: 50,
    },
    buttonText: {
        fontSize: 14,
        color: '#fff',
        fontWeight: 'bold',
    },
    selectedButton: {
        backgroundColor: '#333',
    },
    selectedButtonText: {
        color: '#fff',
    },
    ordersHeading: {
        marginTop: 20,
        fontSize: 26,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    orderContainer: {
        backgroundColor: '#E4E4E4',
        padding: 20,
        marginBottom: 20,
        borderRadius: 10,
    },
    productButtonsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    productButton: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        paddingVertical: 10,
        marginVertical: 7,
        minWidth: 100,
        maxWidth: '100%',
    },
    productButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    fullFillButton: {
        backgroundColor: '#28a745',
    },
    viewDetailsButton: {
        backgroundColor: '#007bff',
    },
    cancelButton: {
        backgroundColor: '#dc3545',
    },
});
