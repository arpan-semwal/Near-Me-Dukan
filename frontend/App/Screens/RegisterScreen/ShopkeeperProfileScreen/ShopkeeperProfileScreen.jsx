import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const ShopkeeperProfileScreen = ({ route }) => {
    const { phoneNumber } = route.params;

    const [shopkeeperName, setShopkeeperName] = useState('');
    const [pincode, setPincode] = useState('');
    const [shopState, setShopState] = useState('');
    const [city, setCity] = useState('');
    const [address, setAddress] = useState('');
    const [salesAssociateNumber, setSalesAssociateNumber] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');

    const handleUpdateProfile = async () => {
        try {
            const response = await fetch(`http://192.168.29.67:3000/updateProfile/${phoneNumber}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    shopkeeperName,
                    pincode,
                    shopState,
                    city,
                    address,
                    salesAssociateNumber,
                    selectedCategory,
                }),
            });
            if (response.ok) {
                console.log('Shopkeeper profile updated successfully');
            } else {
                console.error('Failed to update shopkeeper profile:', response.statusText);
            }
        } catch (error) {
            console.error('Error updating shopkeeper profile:', error);
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                value={shopkeeperName}
                onChangeText={setShopkeeperName}
                placeholder="Shopkeeper Name"
            />
            <TextInput
                style={styles.input}
                value={pincode}
                onChangeText={setPincode}
                placeholder="Pincode"
                keyboardType="numeric"
            />
            <TextInput
                style={styles.input}
                value={shopState}
                onChangeText={setShopState}
                placeholder="State"
            />
            <TextInput
                style={styles.input}
                value={city}
                onChangeText={setCity}
                placeholder="City"
            />
            <TextInput
                style={styles.input}
                value={address}
                onChangeText={setAddress}
                placeholder="Address"
            />
            <TextInput
                style={styles.input}
                value={salesAssociateNumber}
                onChangeText={setSalesAssociateNumber}
                placeholder="Sales Associate Number"
                keyboardType="numeric"
            />
            <TextInput
                style={styles.input}
                value={selectedCategory}
                onChangeText={setSelectedCategory}
                placeholder="Selected Category"
            />
            <TouchableOpacity style={styles.button} onPress={handleUpdateProfile}>
                <Text style={styles.buttonText}>Update Profile</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    input: {
        width: '100%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    button: {
        backgroundColor: 'blue',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default ShopkeeperProfileScreen;
