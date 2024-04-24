import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, Switch, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function SalonShop({ route }) {
    const navigation = useNavigation();
    const [isVisible, setIsVisible] = useState(true);
    const [isVisible1, setIsVisible1] = useState(true); // State for "Make Store LIVE" switch

    const buttonsData = [
        { id: 6, title: 'My Services', screen: 'MyServices' },
        { id: 1, title: 'My Appointments', screen: 'ShopkeeperOrders' },
        { id: 3, title: 'My Customers', screen: 'ShopkeeperCustomer' },
        { id: 4, title: 'Discount Codes', screen: 'ShopkeeperDiscountCode' },
        { id: 5, title: 'My Payments', screen: 'ShopkeeperPayments' },
        { id: 7, title: 'My Profile', screen: 'SalonProfile' },
        { id: 10, title: 'Inventory', screen: 'Inventory' },
        { id: 8, title: 'Log Out', screen: 'Another' },
    ];

    const { selectedSubCategory , selectedSubCategoryId ,   phoneNumber, userType} = route.params; // Access selectedSubCategory from route.params

    // Function to handle button press and navigate to a specific screen
    const handleButtonPress = (screenName) => {
        if (screenName === 'Inventory') {
            // Pass selectedSubCategory as a parameter when navigating to the Inventory screen
            navigation.navigate(screenName, { selectedSubCategory  , selectedSubCategoryId ,  phoneNumber: phoneNumber,userType:userType});
        } 
        else if (screenName === 'MyServices') {
            // Pass selectedSubCategory as a parameter when navigating to the Inventory screen
            navigation.navigate(screenName, { selectedSubCategory  , selectedSubCategoryId ,  phoneNumber: phoneNumber,userType:userType});
        }
        
        else {
            navigation.navigate(screenName);
        }
    };

    return (
        <FlatList
            data={['header', ...buttonsData]}
            keyExtractor={(item, index) => item.id ? item.id.toString() : index.toString()}
            renderItem={({ item }) => {
                if (item === 'header') {
                    return (
                        <View style={styles.container}>
                            <View style={styles.headerContainer}>
                                <Image source={require('../../../../assets/logo.png')} style={styles.storeImage} />
                                <View style={styles.headerText}>
                                    <Text style={styles.welcomeText}>Welcome</Text>
                                    <Text style={styles.shoppingAt}>Shop ID:</Text>
                                    <Text style={styles.shoppingAt}>Subscription Valid till 10 October 2024</Text>
                                </View>
                            </View>

                            {/* Full-width image */}
                            <Image source={require('../../../../assets/general.png')} style={styles.fullWidthImage} />

                            {/* Circular image with overlay */}
                            <View style={styles.circularImageContainer}>
                                <Image source={require('../../../../assets/name.png')} style={styles.circularImage} />
                            </View>

                            {/* Store Visibility switch */}
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

                            {/* Make Store LIVE switch */}
                            <View style={styles.visibilityContainer}>
                                <Text style={styles.visibilityHeading}>Make Store LIVE</Text>
                                <Switch
                                    trackColor={{ false: '#767577', true: '#81b0ff' }}
                                    thumbColor={isVisible1 ? '#FF0000' : '#f4f3f4'}
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
    fullWidthImage: {
        width: '100%',
        height: 150,
        marginBottom: 20,
    },
    circularImageContainer: {
        alignItems: 'center',
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
    visibilityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 50,
    },
    visibilityHeading: {
        paddingRight: 20,
        fontSize: 26,
        fontWeight: 'bold',
    },
    toggleButton: {
        transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }],
        borderWidth: 2,
        borderColor: '#00ff00',
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#C7BC00',
        marginHorizontal: 10,
        marginVertical: 5,
        height: 50,
        borderRadius: 10,
    },
    buttonText: {
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold',
    },
});
