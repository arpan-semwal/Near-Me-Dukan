import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, TextInput, Modal, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook
import dummyData from "../../../dummy/dummy";
import Colors from '../../../../utils/Colors';

import StoreScreen from '../../StoreScreen/StoreScreen';
import { useCart } from '../../../../Context/ContextApi';

export default function SearchShops({ route }) {
    const { phoneNumber } = route.params || {}; // Assuming phoneNumber is passed from the previous screen
    const navigation = useNavigation(); // Initialize navigation object
    const [showChangePincode, setShowChangePincode] = useState(false);
    const [newPincode, setNewPincode] = useState('');
    const [pincode, setPincode] = useState('');
    const [customerName, setCustomerName] = useState('');
    const [filteredShops, setFilteredShops] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

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
        } catch (error) {
            console.error('Error fetching customer details:', error);
            setError('Error fetching customer details');
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

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <View style={styles.leftContainer}>
                    <Image source={require('../../../../../assets/logo.png')} style={styles.welcomeImage} />
                </View>
                <View style={styles.rightContainer}>
                    <Text style={styles.welcomeText}>Welcome, {customerName}</Text>
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
                            <View>
                                <View style={styles.itemContainer}>
                                    {/* Add shop details here */}
                                    <Text>{item.shopkeeperName}</Text>
                                    <Text>Pincode: {item.pincode}</Text>
                                    <Text>Pincode: {item.selectedCategory}</Text>
                                    {/* Add more shop details as needed */}
                                </View>
                                {renderSeparator()}
                            </View>
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
const ChangePincode = ({ newPincode, setNewPincode, handlePincodeChange }) => {
    return (
        <View style={styles.card}>
            <Text style={styles.heading}>Change Pincode</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter new pincode"
                keyboardType="numeric"
                value={newPincode}
                onChangeText={text => setNewPincode(text)}
            />
            <TouchableOpacity style={styles.button} onPress={handlePincodeChange}>
                <Text style={styles.buttonText}>Search Shops</Text>
            </TouchableOpacity>
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
        flexDirection: 'column',
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
});