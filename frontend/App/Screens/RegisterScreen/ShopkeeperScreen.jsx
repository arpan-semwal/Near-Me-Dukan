import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Button, ScrollView, Dimensions, Image, Alert, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import { Camera } from 'expo-camera';
import { ImageManipulator } from 'expo-image-manipulator';
import axios from 'axios';





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
    const [selectedSubCategory, setSelectedSubCategory] = useState('');
    const [subCategories, setSubCategories] = useState([]);
    const navigation = useNavigation();
    const [categories, setCategories] = useState([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState('');
    const [selectedSubCategoryId, setSelectedSubCategoryId] = useState('');
    const [selectedCategoryType, setSelectedCategoryType] = useState('');

    const { phoneNumber , userType } = route.params || {};

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

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('http://172.16.16.41:3000/categories'); // Change to your server's endpoint
                if (response.ok) {
                    const data = await response.json();
                    setCategories(data);
                } else {
                    console.error('Failed to fetch categories');
                }
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };
        fetchCategories();
    }, []);

    useEffect(() => {
        const fetchSubCategories = async () => {
            try {
                if (selectedCategoryId) {
                    const response = await fetch(`http://172.16.16.41:3000/subcategories/${selectedCategoryId}`);
                    if (response.ok) {
                        const data = await response.json();
                        setSubCategories(data);
                    } else {
                        console.error('Failed to fetch sub-categories');
                    }
                }
            } catch (error) {
                console.error('Error fetching sub-categories:', error);
            }
        };

        fetchSubCategories();
    }, [selectedCategoryId]);

    const handleSubmit = async () => {
        // Check for required fields and validate data
    
        // Prepare data
        const data = {
            phoneNumber,
            shopkeeperName,
            shopID,
            pincode,
            shopState,
            city,
            address,
            salesAssociateNumber,
            selectedCategory,
            selectedSubCategory,
            selectedCategoryType, // Include the selected category type in the data
            shopBanner,
            profilePicture
        };
    
        try {
            const response = await fetch('http://172.16.16.41:3000/shopkeeperRegister', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
    
            if (!response.ok) {
                throw new Error('Failed to register shopkeeper');
            }
    
            const responseData = await response.json();
            alert("Shopkeeper registered");
            console.log(responseData.message);
    
            navigation.navigate('Subscription', {
                phoneNumber: phoneNumber,
                selectedCategory:selectedCategory,
                selectedSubCategory: selectedSubCategory,
                selectedSubCategoryId: selectedSubCategoryId,
                selectedCategoryType: selectedCategoryType,// Pass the category type to the next screen
                userType:userType
            });
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

    const pickImage = async (setImage) => {
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });

            if (!result.cancelled) {
                setImage(result.uri);
            }
        } catch (error) {
            console.error('Error picking image:', error);
            Alert.alert('Error', 'Failed to pick image. Please try again later.');
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
                        style={[styles.input, { height: 100, textAlignVertical: 'top' }, !requiredFields.address && submitted && styles.requiredInput]}
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
                        onValueChange={(itemValue) => {
                            setSelectedCategory(itemValue);
                            // Find the ID and type of the selected category
                            const category = categories.find(cat => cat.name === itemValue);
                            setSelectedCategoryId(category ? category.id : '');
                            setSelectedCategoryType(category ? category.type : ''); // Update the selected category type state
                        }}
                        style={styles.picker}
                    >
                        {categories.map((category, index) => (
                            <Picker.Item key={index} label={category.name} value={category.name} />
                        ))}
                    </Picker>
                </View>
                
                {selectedCategory === 'Salon Shop' && (
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Type of shop</Text>
                        <Picker
                            selectedValue={selectedSubCategory}
                            onValueChange={(itemValue) => {
                                // Update the selected subcategory
                                setSelectedSubCategory(itemValue);
                                
                                // Find the subcategory object that matches the selected subcategory name
                                const subCategory = subCategories.find(sub => sub.sub_category === itemValue);
                                
                                // Update the selected subcategory ID
                                setSelectedSubCategoryId(subCategory ? subCategory.id : '');
                            }}
                            style={styles.picker}
                            enabled={!!subCategories.length} // Enable or disable the picker based on the availability of subcategories
                        >
                            {subCategories.map((subCategory, index) => (
                                <Picker.Item key={index} label={subCategory.sub_category} value={subCategory.sub_category} />
                            ))}
                        </Picker>
                    </View>
                )}

                <View style={styles.inputContainer}>
                    <Button title="Add Shop Banner" onPress={() => pickImage(setShopBanner)} />
                    {shopBanner && <Image source={{ uri: shopBanner }} style={styles.image} />}
                </View>

                <View style={styles.inputContainer}>
                    <Button title="Add Profile Picture" onPress={() => pickImage(setProfilePicture)} />
                    {profilePicture && <Image source={{ uri: profilePicture }} style={styles.image} />}
                </View>
                
                <Button
                    title="Submit"
                    onPress={handleSubmit}
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
    },
    cameraContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    camera: {
        width: windowWidth * 0.8,
        height: windowHeight * 0.4,
    },
    cameraControls: {
        flex: 1,
        backgroundColor: 'transparent',
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 20,
    },
    previewImage: {
        width: windowWidth * 0.4,
        height: windowHeight * 0.2,
        marginLeft: 20,
    },
});