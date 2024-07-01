import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, Switch, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ShopkeeperProductHome({ route }) {
    const navigation = useNavigation();
    const [isVisible, setIsVisible] = useState(true);
    const [isVisible1, setIsVisible1] = useState(true); // State for "Make Store LIVE" switch
    const [shopkeeperName, setShopkeeperName] = useState('');
    const [shopkeeperPhoneNumber, setShopkeeperPhoneNumber] = useState('');
    const [selectedSubCategory, setSelectedSubCategory] = useState('');
    const { phoneNumber, selectedCategory, userType } = route.params;
    
    useEffect(() => {
        fetchShopkeeperDetails();
    }, []);

    const fetchShopkeeperDetails = async () => {
        try {
            const response = await fetch(`http://192.168.29.67:3000/shopkeeperDetails/${phoneNumber}`);
            if (response.ok) {
                const data = await response.json();
                setShopkeeperName(data.shopkeeperName);
                setShopkeeperPhoneNumber(route.params.phoneNumber);
                setSelectedSubCategory(data.selectedSubCategory);
            } else {
                console.error('Failed to fetch shopkeeper details:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching shopkeeper details:', error);
        }
    };

    const buttonsData = [
        { id: 6, title: 'My Products', screen: 'ShopkeeperMyProducts' },
        { id: 1, title: 'My Orders', screen: 'ShopkeeperOrders' },
        { id: 3, title: 'My Customers', screen: 'ShopkeeperCustomer' },
        { id: 4, title: 'Discount Codes', screen: 'ShopkeeperDiscountCode' },
        { id: 5, title: 'My Payments', screen: 'ShopkeeperPayments' },
        { id: 7, title: 'My Profile', screen: 'ShopkeeperProfileScreen' },
        { id: 10, title: 'ProductInventory', screen: 'ProductInventory' },
    ];

    // Function to handle button press and navigate to a specific screen
    const handleButtonPress = (screenName) => {
        if (screenName === 'ProductInventory') {
            // Pass selectedSubCategory as a parameter when navigating to the Inventory screen
            navigation.navigate(screenName, { 
                selectedSubCategory: selectedSubCategory,  
                phoneNumber: phoneNumber,  
                shopkeeperName: shopkeeperName,
                selectedCategory: selectedCategory,
                shopkeeperPhoneNumber: shopkeeperPhoneNumber,
                userType: userType
            });
        } else if (screenName === 'ShopkeeperMyProducts') {
            // Pass selectedSubCategory as a parameter when navigating to the My Products screen
            navigation.navigate(screenName, { 
                selectedSubCategory: selectedSubCategory,  
                shopkeeperName: shopkeeperName,
                selectedCategory: selectedCategory,
                shopkeeperPhoneNumber: phoneNumber,
                userType: userType
            });
        } else if (screenName === 'ShopkeeperProfileScreen') {
            // Pass selectedSubCategory as a parameter when navigating to the Profile screen
            navigation.navigate(screenName, { 
                selectedSubCategory: selectedSubCategory,  
                phoneNumber: phoneNumber,  
                shopkeeperName: shopkeeperName,
                selectedCategory: selectedCategory,
                shopkeeperPhoneNumber: shopkeeperPhoneNumber,
                userType: userType
            });
        } else {
            navigation.navigate(screenName);
        }
    };

    const handleLogout = async () => {
        try {
            // Retrieve session token from AsyncStorage
            const sessionToken = await AsyncStorage.getItem('sessionToken');
            
            console.log('Session token:', sessionToken); // Log the session token
    
            // Call logout API
            const response = await fetch('http://192.168.29.67:3000/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId: phoneNumber }), // Assuming phoneNumber is the userId
            });
    
            if (response.ok) {
                // Clear session token from AsyncStorage
                await AsyncStorage.removeItem('sessionToken');
    
                // Navigate to login screen
                navigation.navigate('HomePage');
            } else {
                // Handle error
                console.error('Logout failed:', response.statusText);
            }
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    return (
        <FlatList
            style={styles.container}
            data={[{ key: 'content' }]}
            keyExtractor={(item) => item.key}
            renderItem={() => (
                <View>
                    <View style={styles.headerContainer}>
                        <Image source={require('../../../../assets/logo.png')} style={styles.storeImage} />
                        <View style={styles.headerText}>
                            <Text style={styles.welcomeText}>Welcome: {phoneNumber}</Text>
                            <Text style={styles.shoppingAt}>Shop ID: {shopkeeperPhoneNumber}</Text>
                            <Text style={styles.shoppingAt}>Subscription Valid till 10 October 2024</Text>
                        </View>
                    </View>

                    <Image source={require('../../../../assets/general.png')} style={styles.fullWidthImage} />

                    <View style={styles.circularImageContainer}>
                        <Image source={require('../../../../assets/name.png')} style={styles.circularImage} />
                    </View>

                    <View style={styles.visibilityContainer}>
                        <View style={styles.visibilityItem}>
                            <Text style={styles.visibilityHeading}>Store Visibility</Text>
                            <Switch
                                trackColor={{ false: '#D3D3D3', true: '#4A90E2' }}
                                thumbColor={isVisible ? '#318D00' : '#f4f3f4'}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={() => setIsVisible(previousState => !previousState)}
                                value={isVisible}
                                style={styles.toggleButton}
                            />
                        </View>

                        <View style={styles.visibilityItem}>
                            <Text style={styles.visibilityHeading}>Make Store LIVE</Text>
                            <Switch
                                trackColor={{ false: '#D3D3D3', true: '#FF0000' }}
                                thumbColor={isVisible1 ? '#FF0000' : '#f4f3f4'}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={() => setIsVisible1(previousState => !previousState)}
                                value={isVisible1}
                                style={styles.toggleButton}
                            />
                        </View>
                    </View>

                    <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                        <Text style={styles.logoutText}>Logout</Text>
                    </TouchableOpacity>

                    <FlatList
                        data={buttonsData}
                        keyExtractor={(item, index) => item.id ? item.id.toString() : index.toString()}
                        renderItem={({ item }) => (
                            <TouchableOpacity style={styles.button} onPress={() => handleButtonPress(item.screen)}>
                                <Text style={styles.buttonText}>{item.title}</Text>
                            </TouchableOpacity>
                        )}
                    />
                </View>
            )}
        />
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f4f7',
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
        color: '#333',
    },
    shoppingAt: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#555',
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
        marginTop: 30,
        paddingHorizontal: 10,
    },
    visibilityItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 10,
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#d0d0d0',
    },
    visibilityHeading: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
    },
    toggleButton: {
        transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }],
    },
    logoutButton: {
        backgroundColor: '#FF4F4F',
        paddingVertical: 15,
        marginVertical: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    logoutText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    button: {
        backgroundColor: '#4A90E2',
        paddingVertical: 15,
        borderRadius: 10,
        marginBottom: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
