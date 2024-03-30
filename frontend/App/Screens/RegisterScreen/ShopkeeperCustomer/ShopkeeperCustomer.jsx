import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { dummyCustomers } from './dummyCustomers'; // Importing dummyCustomers object

export default function ShopkeeperCustomer() {
    const [selectedButton, setSelectedButton] = useState('Today');

    const buttonsData = [
        { id: 1, title: 'Today' },
        { id: 2, title: 'Yesterday' },
        { id: 3, title: 'One Week' },
        { id: 4, title: '30 Days' },
        { id: 5, title: 'All Time' },
        { id: 6, title: 'Select Date Range' },
    ];

    const renderItem = ({ item, index }) => (
        <TouchableOpacity
            style={[styles.button, selectedButton === item.title && styles.selectedButton]}
            onPress={() => setSelectedButton(item.title)}>
            <Text style={[styles.buttonText, selectedButton === item.title && styles.selectedButtonText]}>
                {item.title}
            </Text>
        </TouchableOpacity>
    );

    const renderCustomers = () => {
        return dummyCustomers;
    };

    const renderProductItem = ({ item }) => (
        <View style={styles.productContainer}>
            <View style={styles.productRow}>
                <Image source={item.image} style={styles.productImage} />
                <View style={styles.productDetails}>
                    <Text style={styles.title}>{item.name}</Text>
                    <Text style={styles.info}>Weight: {item.weight}</Text>
                    <Text style={styles.info}>Code: {item.code}</Text>
                </View>
            </View>
            <View style={styles.productButtonsRow}>
                <TouchableOpacity
                    style={[styles.productButton, styles.fullFillButton]}
                    onPress={() => handleProductAction('Update')}>
                    <Text style={styles.productButtonText}>Update</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.productButton, styles.viewDetailsButton]}
                    onPress={() => handleProductAction('Hold')}>
                    <Text style={styles.productButtonText}>Hold</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.productButton, styles.cancelButton]}
                    onPress={() => handleProductAction('Remove')}>
                    <Text style={styles.productButtonText}>Remove</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    const handleProductAction = (action) => {
        console.log('Action:', action);
    };

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Image source={require('../../../../assets/logo.png')} style={styles.storeImage} />
                <View style={styles.headerText}>
                    <Text style={styles.welcomeText}>Welcome: </Text>
                    <Text style={styles.shoppingAt}>Shop ID: </Text>
                    <Text style={styles.shoppingAt}>Subscription Valid till 10 October 2024</Text>
                </View>
            </View>

            <Image source={require('../../../../assets/general.png')} style={styles.fullWidthImage} />

            <View style={[styles.circularImageContainer, { marginBottom: 20 }]}>
                <Image source={require('../../../../assets/name.png')} style={styles.circularImage} />
            </View>

            <FlatList
                data={buttonsData}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                numColumns={3}
                contentContainerStyle={styles.buttonContainer}
            />

            <FlatList
                data={renderCustomers()}
                renderItem={({ item }) => (
                    <View style={styles.customerContainer}>
                        <Image source={item.image} style={styles.customerImage} />
                        <View style={styles.customerDetails}>
                            <Text style={styles.customerName}>{item.name}</Text>
                            <Text style={styles.customerInfo}>Address: {item.address}</Text>
                            <Text style={styles.customerInfo}>Mobile: {item.mobile}</Text>
                        </View>
                    </View>
                )}
                keyExtractor={(item) => item.id.toString()}
            />

            <FlatList
                data={dummyProducts}
                renderItem={renderProductItem}
                keyExtractor={(item) => item.id.toString()}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
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
    shoppingAt: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    buttonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#C7BC00',
        margin: 5,
        width: '30%', // Adjust the width according to your preference
        height: 25,
        borderRadius: 50,
    },
    buttonText: {
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold',
    },
    selectedButton: {
        backgroundColor: '#333', // Change background color when selected
    },
    selectedButtonText: {
        color: '#fff', // Change text color when selected
    },
    customerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    customerImage: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: 10,
    },
    customerDetails: {
        flex: 1,
    },
    customerName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    customerInfo: {
        fontSize: 16,
    },
    fullWidthImage: {
        width: '100%',
        height: 150,
        marginBottom: 20,
    },
    circularImageContainer: {
        alignItems: 'center',
        paddingBottom:25
    },
    circularImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 3,
        borderColor: 'white',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: [{ translateX: -60 }, { translateY: -60 }],
    },
    productContainer: {
        marginVertical: 7,
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#FFFFFF',
        elevation: 3,
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    productRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    productImage: {
        width: 80,
        height: 80,
        borderRadius: 10,
        marginRight: 10,
    },
    productDetails: {
        flex: 1,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    info: {
        fontSize: 16,
    },
    productButtonsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    productButton: {
        borderRadius: 8,
        paddingVertical: 8,
        paddingHorizontal: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    productButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    fullFillButton: {
        backgroundColor: '#4CAF50',
        marginRight: 5,
    },
    viewDetailsButton: {
        backgroundColor: '#2196F3',
        marginRight: 5,
    },
    cancelButton: {
        backgroundColor: '#f44336',
    },
});
