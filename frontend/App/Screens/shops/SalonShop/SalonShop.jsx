import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, Switch, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function SalonShop({ selectedSubCategory }) {
    const navigation = useNavigation();
    const [isVisible, setIsVisible] = useState(true); // State for toggle button
    const [isVisible1, setIsVisible1] = useState(true); // State for toggle button
    const buttonsData = [
        { id: 6, title: 'My Services', screen: 'MyServices' },
        { id: 1, title: 'My Appointments', screen: 'ShopkeeperOrders' },
        { id: 3, title: 'My Customers', screen: 'ShopkeeperCustomer' },
        { id: 4, title: 'Discount Codes', screen: 'ShopkeeperDiscountCode' },
        { id: 5, title: 'My Payments', screen: 'ShopkeeperPayments' },
        { id: 7, title: 'My Profile', screen: 'SalonProfile' },
        { id: 8, title: 'Log Out', screen: 'Another' },
        { id: 9, title: 'My Inventory', screen: 'Inventory' }, // Added inventory screen
    ];

    const handleButtonPress = (screenName) => {
        // Navigate to the desired screen and pass the selectedSubCategory as a parameter
        navigation.navigate(screenName, { selectedSubCategory });
    };

    return (
        <FlatList
            data={['header', ...buttonsData]}
            keyExtractor={(item, index) => item.id ? item.id.toString() : index.toString()}
            renderItem={({ item, index }) => {
                if (item === 'header') {
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

                            {/* First Image (Full Width) */}
                            <Image source={require('../../../../assets/general.png')} style={styles.fullWidthImage} />

                            {/* Second Image (Circular with Overlay) */}
                            <View style={styles.circularImageContainer}>
                                <Image source={require('../../../../assets/name.png')} style={styles.circularImage} />
                            </View>

                            {/* Store Visibility Heading and Toggle Button */}
                            <View style={styles.visibilityContainer}>
                                <Text style={styles.visibilityHeading}>Store Visibility</Text>
                                <Switch
                                    trackColor={{ false: '#767577', true: '#81b0ff' }}
                                    thumbColor={isVisible ? '#318D00' : '#f4f3f4'}
                                    ios_backgroundColor="#3e3e3e"
                                    onValueChange={() => setIsVisible(previousState => !previousState)}
                                    value={isVisible}
                                    style={styles.toggleButton}
                                />
                            </View>
                            <View style={styles.visibilityContainer2}>
                                <Text style={styles.visibilityHeading2}>Make Store LIVE</Text>
                                <Switch
                                    trackColor={{ false: '#767577', true: '#81b0ff' }}
                                    thumbColor={isVisible1 ? '#FF0000' : '#f4f3f4'} // Green color for true, default color for false
                                    ios_backgroundColor="#3e3e3e"
                                    onValueChange={() => setIsVisible1(previousState => !previousState)}
                                    value={isVisible1}
                                    style={styles.toggleButton}
                                />
                            </View>
                        </View>
                    );
                } else {
                    return (
                        <TouchableOpacity style={styles.button} onPress={() => handleButtonPress(item.screen)}>
                            <Text style={styles.buttonText}>{item.title}</Text>
                        </TouchableOpacity>
                    );
                }
            }}
        />
    );
}
