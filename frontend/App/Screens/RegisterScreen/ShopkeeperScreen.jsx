import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Button, ScrollView, Dimensions, Image, Alert, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function ShopkeeperScreen({ route }) {
    const [shopkeeperName, setShopKeeperName] = useState('');
    const [shopID, setShopId] = useState('');
    const [pincode, setPincode] = useState('');
    const [shopState, setShopState] = useState('');
    const [city, setCity] = useState('');
    const [address, setAddress] = useState('');
    const [salesAssociateNumber, setSalesAssociateNumber] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [requiredFields, setRequiredFields] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [shopBanner, setShopBanner] = useState(null);
    const [profilePicture, setProfilePicture] = useState(null);
    const navigation = useNavigation();
    
    const { phoneNumber } = route.params || {};


    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    Alert.alert('Permission Required', 'Sorry, we need camera roll permissions to make this work!');
                }
            }
        })();
    }, []);

    const handleSubmit = async () => {
        setSubmitted(true);
    
        if (!shopkeeperName.trim() || !shopID.trim() || !pincode.trim() || !shopState.trim() || !city.trim() || !address.trim() || !shopBanner || !profilePicture || !salesAssociateNumber || !selectedCategory) {
            Alert.alert("Missing Fields", "Please fill in all required fields and upload both shop banner and profile picture.");
            return;
        }
    
        try {
            const response = await fetch('http://192.168.29.68:3000/shopkeeperRegister', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    phoneNumber,
                    shopkeeperName,
                    shopID,
                    pincode,
                    shopState,
                    city,
                    address,
                    salesAssociateNumber,
                    selectedCategory,
                }),
            });
    
            if (!response.ok) {
                throw new Error('Failed to register shopkeeper');
            }
    
            const responseData = await response.json();
            alert("Shopkeeper registered")
            console.log(responseData.message);
            navigation.navigate('Subscription' , {phoneNumber:phoneNumber});
        } catch (error) {
            console.error('Error registering shopkeeper:', error);
            Alert.alert('Error', 'Failed to register shopkeeper. Please try again later.');
        }
    };

    const handleInputChange = (value, fieldName) => {
        switch (fieldName) {
            case 'shopkeeperName':
                setShopKeeperName(value);
                setRequiredFields({ ...requiredFields, shopkeeperName: value.trim() !== '' });
                break;
            case 'shopID':
                setShopId(value);
                setRequiredFields({ ...requiredFields, shopID: value.trim() !== '' });
                break;
            case 'pincode':
                setPincode(value);
                setRequiredFields({ ...requiredFields, pincode: value.trim() !== '' });
                break;
            case 'shopState':
                setShopState(value);
                setRequiredFields({ ...requiredFields, shopState: value.trim() !== '' });
                break;
            case 'city':
                setCity(value);
                setRequiredFields({ ...requiredFields, city: value.trim() !== '' });
                break;
            case 'address':
                setAddress(value);
                setRequiredFields({ ...requiredFields, address: value.trim() !== '' });
                break;
            case 'salesAssociateNumber':
                setSalesAssociateNumber(value);
                setRequiredFields({ ...requiredFields, salesAssociateNumber: value.trim() !== '' });
                break;
            default:
                break;
        }
    };

    const handleShopBannerUpload = async () => {
        try {
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
        } catch (error) {
            console.error("Error while uploading shop banner:", error);
        }
    };
    
    const handleProfilePictureUpload = async () => {
        try {
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
        } catch (error) {
            console.error("Error while uploading profile picture:", error);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollViewContent} keyboardShouldPersistTaps="handled">
            <View style={styles.container}>
                <Text style={styles.heading}>Shopkeeper Registration</Text>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Phone Number</Text>
                    <TextInput
                        style={[styles.input, !requiredFields.pincode && submitted && styles.requiredInput]}
                        placeholder={phoneNumber}
                        value={phoneNumber}
                        editable={false}
                        keyboardType="numeric"
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Your Name *</Text>
                    <TextInput
                        style={[styles.input, !requiredFields.shopkeeperName && submitted && styles.requiredInput]}
                        placeholder="Your Name"
                        value={shopkeeperName}
                        onChangeText={(value) => handleInputChange(value, 'shopkeeperName')}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Your Store Name*</Text>
                    <TextInput
                        style={[styles.input, !requiredFields.shopID && submitted && styles.requiredInput]}
                        placeholder="Your Store Name"
                        value={shopID}
                        onChangeText={(value) => handleInputChange(value, 'shopID')}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Sales Associate's Number (Optional)</Text>
                    <TextInput
                        style={[styles.input, !requiredFields.salesAssociateNumber && submitted && styles.requiredInput]}
                        placeholder="Sales Associate's Number"
                        value={salesAssociateNumber}
                        onChangeText={(value) => handleInputChange(value, 'salesAssociateNumber')}
                        keyboardType="numeric"
                    />
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
                    <Text style={styles.label}>State*</Text>
                    <TextInput
                        style={[styles.input, !requiredFields.shopState && submitted && styles.requiredInput]}
                        placeholder="Your State"
                        value={shopState}
                        onChangeText={(value) => handleInputChange(value, 'shopState')}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>City*</Text>
                    <TextInput
                        style={[styles.input, !requiredFields.city && submitted && styles.requiredInput]}
                        placeholder="Your City"
                        value={city}
                        onChangeText={(value) => handleInputChange(value, 'city')}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Complete Address *</Text>
                    <TextInput
                        style={[styles.input, { height: windowHeight * 0.1, textAlignVertical: 'top' }, !requiredFields.address && submitted && styles.requiredInput]}
                        placeholder="Complete Address"
                        value={address}
                        onChangeText={(value) => handleInputChange(value, 'address')}
                        multiline
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
                        <Picker.Item label="Grocery Shop" value="Grocery Shop" />
                        <Picker.Item label="Sweets Shop" value="Stationary Shop" />
                        <Picker.Item label="Barber" value="Sweets and Namkeen Shop" />
                        <Picker.Item label="Vegetables shop  " value="Vegetables Shop" />
                        <Picker.Item label="Snacks Shop" value="Vegetables Shop" />
                    </Picker>
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
                    disabled={!Object.values(requiredFields).every(field => field) || !shopBanner || !profilePicture || !selectedCategory}
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
