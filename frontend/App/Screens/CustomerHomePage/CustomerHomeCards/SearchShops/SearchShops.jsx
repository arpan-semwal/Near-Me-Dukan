import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, TextInput, Modal, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook
import { AntDesign } from '@expo/vector-icons'; // Import AntDesign icon
import dummyData from "../../../dummy/dummy";
import Colors from '../../../../utils/Colors';

import StoreScreen from '../../StoreScreen/StoreScreen';
import { useCart } from '../../../../Context/ContextApi';

export default function SearchShops({ route }) {
    const { phoneNumber } = route.params || {};
    const navigation = useNavigation();
    const [showChangePincode, setShowChangePincode] = useState(false);
    const [newPincode, setNewPincode] = useState('');
    const [pincode, setPincode] = useState('');
    const [customerName, setCustomerName] = useState('');
    const [filteredShops, setFilteredShops] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [shopID , setShopID] = useState("");

    const handleSubmit = () => {
        setShowChangePincode(true);
    }

    const handlePincodeChange = () => {
        // Check if the new pincode is valid
        if (newPincode.trim() === '') {
            Alert.alert('Invalid Pincode', 'Please enter a valid pincode.');
            return;
        }

        setPincode(newPincode); // Update the pincode state
        setShowChangePincode(false);
    }

    useEffect(() => {
        // Fetch customer's details when component mounts
        fetchCustomerDetails();
    }, []);

    useEffect(() => {
        // Fetch shops based on the pincode when pincode changes
        if (pincode) {
            fetchShopsInArea(pincode);
        }
    }, [pincode]);

    const fetchCustomerDetails = async () => {
        try {
            const response = await fetch(`http://192.168.29.68:3000/customerDetails/${phoneNumber}`);
            const data = await response.json();
            setCustomerName(data.name); // Set customer's name
            setPincode(data.pincode); // Set customer's pincode
            setShopID(data.shopID); // Set customer's shopID
    
            // Prioritize the customer's shop if available
            if (data.shopID) {
                prioritizeShop(data.shopID);
            }
        } catch (error) {
            console.error('Error fetching customer details:', error);
            setError('Error fetching customer details');
        }
    };

    const prioritizeShop = async (shopID) => {
        try {
            const response = await fetch(`http://192.168.29.68:3000/shopDetails/${shopID}`);
            const data = await response.json();

            // Check if the shopID exists in the shopkeepers database
            const shopExists = await checkShopExists(shopID);
            if (shopExists) {
                // Move the shop with the matching shopID to the beginning of the array
                setFilteredShops([data, ...filteredShops.filter(shop => shop.shopID !== shopID)]);
            }
        } catch (error) {
            console.error('Error prioritizing shop:', error);
        }
    }

    const checkShopExists = async (shopID) => {
        try {
            const response = await fetch(`http://192.168.29.68:3000/shopkeepers/${shopID}`);
            const data = await response.json();
            return data.length > 0;
        } catch (error) {
            console.error('Error checking shop existence:', error);
            return false;
        }
    }

    const fetchShopsInArea = async (pincode) => {
        setLoading(true);
        try {
            const response = await fetch(`http://192.168.29.68:3000/shopsInArea/${pincode}`);
            const data = await response.json();
            setFilteredShops(data);
            setError('');
        } catch (error) {
            console.error('Error fetching shops in area:', error);
            setError('Error fetching shops in area');
        } finally {
            setLoading(false);
        }
    }

    const handleShopPress = (shopID) => {
        // Implement navigation logic here
    }

    const renderSeparator = () => (
        <View style={styles.separator} />
    );

    const renderHeartIcon = () => (
        <AntDesign name="hearto" size={24} color="black" />
    );

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <View style={styles.leftContainer}>
                    <Image source={require('../../../../../assets/logo.png')} style={styles.welcomeImage} />
                </View>
                <View style={styles.rightContainer}>
                    <Text style={styles.welcomeText}>Welcome, {shopID}</Text>
                    <Text style={styles.pincodeText}>Shops at Pincode: {pincode}</Text>
                    <TouchableOpacity onPress={handleSubmit}>
                        <Text style={styles.changePincodeText}>Change Pincode</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.locationTextContainer}>
                <Text style={styles.locationText}>Shops in Your Location</Text>
            </View>
            {error ? (
                <Text style={styles.errorText}>{error}</Text>
            ) : (
                <FlatList
                data={filteredShops}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => handleShopPress(item.shopID)}>
                        <View style={styles.itemContainer}>
                            {/* Shop details */}
                            <View style={styles.shopDetails}>
                                <Text>{item.shopkeeperName}</Text>
                                <Text>Pincode: {item.pincode}</Text>
                                <Text>Shop: {item.selectedCategory}</Text>
                            </View>
                            {/* Heart icon */}
                            <View style={styles.heartIcon}>
                                <AntDesign name="hearto" size={24} color="black" />
                            </View>
                        </View>
                        {renderSeparator()}
                    </TouchableOpacity>
                )}
                keyExtractor={item => item.id.toString()}
                ListEmptyComponent={<Text>No shops found</Text>}
            />
            )}
            {/* Render ChangePincode component as a modal */}
            <Modal
                visible={showChangePincode}
                transparent={true}
                animationType="slide"
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter New Pincode"
                            value={newPincode}
                            onChangeText={setNewPincode}
                        />
                        <TouchableOpacity onPress={handlePincodeChange}>
                            <Text style={styles.closeButton}>Change</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setShowChangePincode(false)}>
                            <Text style={styles.closeButton}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: Colors.BACKGROUND,
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    leftContainer: {
        marginRight: 40,
        marginLeft: 20
    },
    rightContainer: {
        flex: 1,
    },
    welcomeImage: {
        width: 100,
        height: 100,
        borderRadius: 10,
    },
    welcomeText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    pincodeText: {
        fontSize: 16,
        marginBottom: 5,
    },
    changePincodeText: {
        color: '#9F9F9F',
        fontSize: 14,
        marginBottom: 20,
    },
    locationTextContainer: {
        alignItems: 'center',
        marginBottom: 20,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
    },
    locationText: {
        fontSize: 26,
        fontWeight: 'bold',
    },
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    separator: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        marginBottom: 10,
    },
    // Modal styles
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Transparent background
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: '80%',
        alignItems: 'center',
    },
    heading: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        padding: 10,
        marginBottom: 20,
    },
    button: {
        backgroundColor: Colors.BUTTONCOLOR,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    closeButton: {
        color: 'blue',
        fontSize: 16,
        marginTop: 10,
    },
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    shopDetails: {
        flex: 1,
    },
    heartIcon: {
        marginLeft: 10,
    },
});
