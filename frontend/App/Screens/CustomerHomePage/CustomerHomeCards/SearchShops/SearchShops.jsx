import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, TextInput, Modal, Alert } from 'react-native';
import dummyData from "../../../dummy/dummy";
import Colors from '../../../../utils/Colors';

export default function SearchShops({ route, navigation }) {
    const { pincode, name } = route.params || {};
    const [showChangePincode, setShowChangePincode] = useState(false);
    const [newPincode, setNewPincode] = useState('');

    const handleSubmit = () => {
        setShowChangePincode(true);
    }

    const handlePincodeChange = () => {
        // Check if the new pincode exists in the dummy data
        const isValidPincode = dummyData.some(item => item.pincode === newPincode);
        if (isValidPincode) {
            // If valid, update the pincode and close the modal
            route.params.pincode = newPincode;
            setShowChangePincode(false);
        } else {
            // If not valid, show an alert
            Alert.alert('Invalid Pincode', 'No shops found for the entered pincode.');
        }
    }

    useEffect(() => {
        const unsubscribe = navigation.addListener('blur', () => {
            // Reset the newPincode state when the modal closes
            setNewPincode('');
        });

        return unsubscribe;
    }, [navigation]);

    // Filter the dummyData array to only include shops with the matching pin code
    const filteredData = dummyData.filter(item => item.pincode === pincode);

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
                    <Text style={styles.welcomeText}>Welcome, {name}</Text>
                    <Text style={styles.pincodeText}>Shops at Pincode: {pincode}</Text>
                    <TouchableOpacity onPress={handleSubmit}>
                        <Text style={styles.changePincodeText}>Change Pincode</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.locationTextContainer}>
                <Text style={styles.locationText}>Shops in Your Location</Text>
            </View>
            <FlatList
                data={filteredData}
                renderItem={({ item }) => (
                    <View>
                        <View style={styles.itemContainer}>
                            <Image source={item.image} style={styles.image} />
                            <View style={styles.detailsContainer}>
                                <Text style={styles.name}>{item.name}</Text>
                                <Text>Shop ID: {item.shopID}</Text>
                                <Text>Location: {item.location}</Text>
                                <Text>Delivery Available: {item.deliveryAvailable ? 'Yes' : 'No'}</Text>
                            </View>
                        </View>
                        {renderSeparator()}
                    </View>
                )}
                keyExtractor={item => item.id.toString()}
            />
            {/* Render ChangePincode component as a modal */}
            <Modal
                visible={showChangePincode}
                transparent={true}
                animationType="slide"
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <ChangePincode
                            newPincode={newPincode}
                            setNewPincode={setNewPincode}
                            handlePincodeChange={handlePincodeChange}
                        />
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
        flexDirection: 'row',
        marginBottom: 20,
    },
    image: {
        width: 100,
        height: 100,
        marginRight: 10,
        borderRadius: 50,
    },
    detailsContainer: {
        flex: 1,
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
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
