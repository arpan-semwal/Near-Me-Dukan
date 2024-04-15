//import React, { useState, useEffect } from 'react';
//import { View, Text, TextInput, StyleSheet, Button, Picker, Alert } from 'react-native';
//import { useNavigation } from '@react-navigation/native';
 

//export default function SalonProfile({ route }) {
//    const navigation = useNavigation();
//    const { phoneNumber } = route.params || {};
//    const [shopkeeperDetails, setShopkeeperDetails] = useState(null);
//    const [updatedDetails, setUpdatedDetails] = useState({});
    
//    // Fetch shopkeeper details when the component is loaded
//    useEffect(() => {
//        fetch(`http://192.168.38.249:3000/shopkeeperDetails/${phoneNumber}`)
//            .then(response => response.json())
//            .then(data => {
//                setShopkeeperDetails(data);
//                setUpdatedDetails(data); // Initialize updated details with existing data
//            })
//            .catch(error => console.error('Error fetching shopkeeper details:', error));
//    }, [phoneNumber]);

//    const handleInputChange = (value, fieldName) => {
//        setUpdatedDetails({
//            ...updatedDetails,
//            [fieldName]: value
//        });
//    };

//    const handleUpdate = async () => {
//        try {
//            const response = await fetch(`http://192.168.38.249:3000/shopkeeperUpdate`, {
//                method: 'POST',
//                headers: {
//                    'Content-Type': 'application/json',
//                },
//                body: JSON.stringify({
//                    phoneNumber,
//                    ...updatedDetails,
//                }),
//            });

//            if (response.ok) {
//                Alert.alert('Success', 'Profile updated successfully!');
//                // Navigate back or to another screen if needed
//                navigation.goBack();
//            } else {
//                Alert.alert('Error', 'Failed to update profile. Please try again.');
//            }
//        } catch (error) {
//            console.error('Error updating profile:', error);
//            Alert.alert('Error', 'An unexpected error occurred. Please try again.');
//        }
//    };

//    if (!shopkeeperDetails) {
//        return <Text>Loading...</Text>;
//    }

//    return (
//        <View style={styles.container}>
//            <Text style={styles.heading}>My Profile</Text>
            
//            {/* Display and allow editing of shopkeeper details */}
//            <View style={styles.inputContainer}>
//                <Text style={styles.label}>Name</Text>
//                <TextInput
//                    style={styles.input}
//                    value={updatedDetails.shopkeeperName}
//                    onChangeText={value => handleInputChange(value, 'shopkeeperName')}
//                />
//            </View>

//            {/* Repeat similar input containers for other fields */}
//            <View style={styles.inputContainer}>
//                <Text style={styles.label}>Shop ID</Text>
//                <TextInput
//                    style={styles.input}
//                    value={updatedDetails.shopID}
//                    onChangeText={value => handleInputChange(value, 'shopID')}
//                />
//            </View>
            
//            <View style={styles.inputContainer}>
//                <Text style={styles.label}>Pincode</Text>
//                <TextInput
//                    style={styles.input}
//                    value={updatedDetails.pincode}
//                    onChangeText={value => handleInputChange(value, 'pincode')}
//                />
//            </View>

//            {/* Repeat similar input containers for other fields like state, city, address, salesAssociateNumber, etc. */}

//            <View style={styles.inputContainer}>
//                <Text style={styles.label}>Category</Text>
//                <Picker
//                    selectedValue={updatedDetails.selectedCategory}
//                    onValueChange={value => handleInputChange(value, 'selectedCategory')}
//                    style={styles.picker}
//                >
//                    {/* Add picker options here */}
//                </Picker>
//            </View>

//            <View style={styles.inputContainer}>
//                <Text style={styles.label}>Sub-Category</Text>
//                <Picker
//                    selectedValue={updatedDetails.selectedSubCategory}
//                    onValueChange={value => handleInputChange(value, 'selectedSubCategory')}
//                    style={styles.picker}
//                >
//                    {/* Add picker options here */}
//                </Picker>
//            </View>

//            {/* Add buttons to upload shop banner and profile picture, similar to the registration screen */}
            
//            <Button
//                title="Save"
//                onPress={handleUpdate}
//            />
//        </View>
//    );
//}

//const styles = StyleSheet.create({
//    container: {
//        flex: 1,
//        padding: 20,
//    },
//    heading: {
//        fontSize: 24,
//        fontWeight: 'bold',
//        marginBottom: 20,
//    },
//    inputContainer: {
//        marginBottom: 15,
//    },
//    label: {
//        fontSize: 16,
//        marginBottom: 5,
//    },
//    input: {
//        borderWidth: 1,
//        borderColor: 'gray',
//        padding: 10,
//        borderRadius: 5,
//    },
//    picker: {
//        borderWidth: 1,
//        borderColor: 'gray',
//        borderRadius: 5,
//        padding: 10,
//    },
//});

import { View, Text } from 'react-native'
import React from 'react'

export default function SalonProfile() {
  return (
	<View>
	  <Text>SalonProfile</Text>
	</View>
  )
}
