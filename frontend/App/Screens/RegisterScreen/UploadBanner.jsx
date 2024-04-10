import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Button, ScrollView, Dimensions, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import {Picker} from '@react-native-picker/picker';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function UploadBanner({ route }) {
    const [name, setName] = useState('');
    const [shopID, setShopId] = useState('');
    const [pincode, setPincode] = useState('');
    const [state, setState] = useState('');
    const [city, setCity] = useState('');
    const [address, setAddress] = useState('');
    const [requiredFields, setRequiredFields] = useState({});
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [shopBanner, setShopBanner] = useState(null);
    const [profilePicture, setProfilePicture] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('');
    const navigation = useNavigation();

    const { phoneNumber } = route.params;

    const handleSubmit = () => {
        setSubmitted(true);
        setFormSubmitted(true);

        // Pass data to the next screen
        navigation.navigate('Subscription', {
            phoneNumber: phoneNumber,
            name: name,
            shopID: shopID,
            pincode: pincode,
            state: state,
            city: city,
            address: address,
            shopBanner: shopBanner.uri,
            profilePicture: profilePicture.uri,
            category: selectedCategory // Add selected category to the navigation params
        });
    };

    const handleInputChange = (value, fieldName) => {
        switch (fieldName) {
            case 'name':
                setName(value);
                setRequiredFields({ ...requiredFields, name: value.trim() !== '' });
                break;
            case 'shopID':
                setShopId(value);
                setRequiredFields({ ...requiredFields, shopID: value.trim() !== '' });
                break;
            case 'pincode':
                setPincode(value);
                setRequiredFields({ ...requiredFields, pincode: value.trim() !== '' });
                break;
            case 'state':
                setState(value);
                setRequiredFields({ ...requiredFields, state: value.trim() !== '' });
                break;
            case 'city':
                setCity(value);
                setRequiredFields({ ...requiredFields, city: value.trim() !== '' });
                break;
            case 'address':
                setAddress(value);
                setRequiredFields({ ...requiredFields, address: value.trim() !== '' });
                break;
            default:
                break;
        }
    };

    const handleShopBannerUpload = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log("Shop Banner Result:", result);

        if (!result.cancelled) {
            setShopBanner(result);
        }
    };

    const handleProfilePictureUpload = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        console.log("Profile Picture Result:", result);

        if (!result.cancelled) {
            setProfilePicture(result);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollViewContent} keyboardShouldPersistTaps="handled">
            <View style={styles.container}>
                <Text style={styles.heading}>Shopkeeper Registration</Text>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Your Phone (Can’t Edit)</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Your Name"
                        value={phoneNumber}
                        onChangeText={(value) => handleInputChange(value, 'name')}
                        editable={false}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Sales Associate’s Number(Optional)</Text>
                    <TextInput
                        style={[styles.input, !requiredFields.shopID && submitted && styles.requiredInput]}
                        placeholder="Your Store Name"
                        value={shopID}
                        onChangeText={(value) => handleInputChange(value, 'shopID')}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Your Shop Category*</Text>
                    <Picker
                        selectedValue={selectedCategory}
                        style={[styles.input, styles.picker]}
                        onValueChange={(itemValue, itemIndex) =>
                            setSelectedCategory(itemValue)
                        }>
                        <Picker.Item label="Grocery shop" value="option1" />
                        <Picker.Item label="Stationary shop" value="option2" />
                        <Picker.Item label="Sweets and Namkeen shop" value="option3" />
                        <Picker.Item label="Vegetable shop" value="option4" />
                    </Picker>
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Your Pincode*</Text>
                    <TextInput
                        style={[styles.input, !requiredFields.pincode && submitted && styles.requiredInput]}
                        placeholder="Your Pincode"
                        value={pincode}
                        onChangeText={(value) => handleInputChange(value, 'pincode')}
                        keyboardType="numeric"
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Upload Shop Banner*</Text>
                    <Button
                        title="Upload Shop Banner"
                        onPress={handleShopBannerUpload}
                    />
                    {shopBanner && <Image source={{ uri: shopBanner.uri }} style={styles.uploadedImage} />}
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Upload Profile Picture*</Text>
                    <Button
                        title="Upload Profile Picture"
                        onPress={handleProfilePictureUpload}
                    />
                    {profilePicture && <Image source={{ uri: profilePicture.uri }} style={styles.uploadedImage} />}
                </View>
                <Button
                    title="Submit"
                    onPress={handleSubmit}
                    //disabled={!Object.values(requiredFields).every(field => field) || !shopBanner || !profilePicture}
                    style={styles.submitButton}
                />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollViewContent: {
        flexGrow: 1,
    },
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        width: '100%',
        alignItems: 'center',
    },
    picker: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        backgroundColor: 'white', // Add background color here
    },
    heading: {
        fontSize: windowWidth * 0.06,
        fontWeight: 'bold',
        marginBottom: windowHeight * 0.03,
        textAlign: 'center',
        width: '100%',
    },
    inputContainer: {
        width: '100%',
        marginBottom: windowHeight * 0.02,
    },
    label: {
        color: 'black',
        marginBottom: 5,
    },
    input: {
        width: '100%',
        height: windowHeight * 0.05,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
    },
    requiredInput: {
        borderColor: 'red',
    },
    submitButton: {
        marginTop: 40, // Adjust this value to change the vertical spacing
    },
    uploadedImage: {
        width: 200,
        height: 200,
        marginTop: 10,
    }
});
