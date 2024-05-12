import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, TextInput, Modal, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import Colors from '../../../../utils/Colors';

export default function SearchShops({ route }) {
    const { custPhoneNumber , userType , firstcustomerName } = route.params || {};
    const navigation = useNavigation();
    const [showChangePincode, setShowChangePincode] = useState(false);
    const [newPincode, setNewPincode] = useState('');
    const [pincode, setPincode] = useState('');
    const [customerName, setCustomerName] = useState('');
    const [filteredShops, setFilteredShops] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [shopID , setShopID] = useState('');
    const [selectedShop, setSelectedShop] = useState(null);
    const [shopkeeperPhonenumber , setShopkeeperPhonenumber] = useState();
    const handleSubmit = () => {
        setShowChangePincode(true);
    }

    const handlePincodeChange = () => {
        if (newPincode.trim() === '') {
            Alert.alert('Invalid Pincode', 'Please enter a valid pincode.');
            return;
        }

        setPincode(newPincode);
        setShowChangePincode(false);
    }

    useEffect(() => {
        fetchCustomerDetails();
    }, []);

    useEffect(() => {
        if (pincode) {
            fetchShopsInArea(pincode);
        }
    }, [pincode]);

    const fetchCustomerDetails = async () => {
        try {
            const response = await fetch(`http://192.168.29.67:3000/customerDetails/${custPhoneNumber}`);
            const data = await response.json();
            setCustomerName(data.name);
            setPincode(data.pincode);
            setShopID(data.shopID);
            
    
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
            const response = await fetch(`http://192.168.29.67:3000/shopDetails/${shopID}`);
            const data = await response.json();

            const shopExists = await checkShopExists(shopID);
            if (shopExists) {
                setFilteredShops([data, ...filteredShops.filter(shop => shop.shopID !== shopID)]);
            }
        } catch (error) {
            console.error('Error prioritizing shop:', error);
        }
    }

    const checkShopExists = async (shopID) => {
        try {
            const response = await fetch(`http://192.168.29.67:3000/shopkeepers/${shopID}`);
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
            const response = await fetch(`http://192.168.29.67:3000/shopsInArea/${pincode}`);
            const data = await response.json();
            setFilteredShops(data);
            setShopkeeperPhonenumber(data.phoneNumber)
            setError('');
        } catch (error) {
            console.error('Error fetching shops in area:', error);
            setError('Error fetching shops in area');
        } finally {
            setLoading(false);
        }
    }
    const handleShopPress = (phoneNumber, storeImage, shopkeeperName ) => {
        navigation.navigate('MyServices', { phoneNumber, storeImage, shopkeeperName,   userType:userType , shopID: selectedShop , firstcustomerName:firstcustomerName , custPhoneNumber:custPhoneNumber });
    }

    const toggleShopSelection = (shopID) => {
        setSelectedShop(shopID === selectedShop ? null : shopID);
    };

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
                    <Text style={styles.welcomeText}>Welcome, {firstcustomerName}</Text>
                    <Text style={styles.welcomeText}>Welcome, {custPhoneNumber}</Text>
                    <Text style={styles.pincodeText}>Shops at Pincode: </Text>
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
                        <TouchableOpacity onPress={() => handleShopPress(item.phoneNumber, item.storeImage, item.shopkeeperName)}>
                            <View style={styles.itemContainer}>
                                <View style={styles.shopDetails}>
                                    <Text>{item.shopkeeperName}</Text>
                                    <Text>Pincode: {item.pincode}</Text>
                                    <Text>Shop: {item.selectedCategory}</Text>
                                    <Text>Shop: {item.phoneNumber}</Text>
                                </View>
                                <TouchableOpacity onPress={() => toggleShopSelection(item.shopID)}>
                                    <View style={styles.heartIcon}>
                                        <AntDesign
                                            name={selectedShop === item.shopID ? "heart" : "hearto"}
                                            size={24}
                                            color={selectedShop === item.shopID ? "red" : "black"}
                                        />
                                    </View>
                                </TouchableOpacity>
                            </View>
                            {renderSeparator()}
                        </TouchableOpacity>
                    )}
                    keyExtractor={(item) => item.id.toString()}
                    ListEmptyComponent={<Text>No shops found</Text>}
                />
            )}
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
    shopDetails: {
        flex: 1,
    },
    heartIcon: {
        marginLeft: 10,
    },
});
