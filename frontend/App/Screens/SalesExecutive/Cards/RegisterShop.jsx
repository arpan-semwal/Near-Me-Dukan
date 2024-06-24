import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Button, ScrollView, Dimensions, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function RegisterShop({ route }) {
    const [shopkeeperName, setShopKeeperName] = useState('');
    const [shopID, setShopId] = useState('');
    const [pincode, setPincode] = useState('');
    const [shopState, setShopState] = useState('');
    const [city, setCity] = useState('');
    const [address, setAddress] = useState('');
    const [salesAssociateNumber, setSalesAssociateNumber] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedSubCategory, setSelectedSubCategory] = useState('');
    const navigation = useNavigation();
    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState('');
    const [selectedSubCategoryId, setSelectedSubCategoryId] = useState('');
	const [phoneNumber, setPhoneNumber] = useState('');
	
	const { mobileNumber } = route.params;

    

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
                console.error('Error fetching sub-categories: ', error);
            }
        };

        fetchSubCategories();
    }, [selectedCategoryId]);

    const handleSubmit = async () => {
        if (!shopkeeperName.trim() || !shopID.trim() || !pincode.trim() || !shopState.trim() || !city.trim() || !address.trim() || !mobileNumber || !selectedCategory) {
            Alert.alert("Missing Fields", "Please fill in all required fields.");
            return;
        }
    
        try {
            const response = await fetch('http://172.16.16.41:3000/registerSales', {
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
                    salesAssociateNumber: mobileNumber, // Use mobileNumber from route params
                    selectedCategory,
                    selectedSubCategory,
                }),
            });
    
            if (!response.ok) {
                throw new Error('Failed to register shopkeeper');
            }
    
            const responseData = await response.json();
            alert("Shopkeeper registered");
            console.log(responseData.message);
    
            navigation.navigate('Subscription', {
                phoneNumber: phoneNumber,
                selectedSubCategory: selectedSubCategory,
                selectedSubCategoryId: selectedSubCategoryId,
            });
        } catch (error) {
            console.error('Error registering shopkeeper:', error);
            Alert.alert('Error', 'Failed to register shopkeeper. Please try again later.');
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollViewContent} keyboardShouldPersistTaps="handled">
            <View style={styles.container}>
                <Text style={styles.heading}>Shopkeeper Registration:{mobileNumber}</Text>
				<View style={styles.inputContainer}>
                <Text style={styles.label}>Shopkeeper Phone Number</Text>
                <TextInput
                    style={styles.input}
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                    placeholder="Enter Shopkeeper Phone Number"
                    keyboardType="numeric"
                />
            </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Your Name *</Text>
                    <TextInput
                        style={[styles.input]}
                        placeholder="Your Name"
                        value={shopkeeperName}
                        onChangeText={(value) => setShopKeeperName(value)}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Your Store Name*</Text>
                    <TextInput
                        style={[styles.input]}
                        placeholder="Your Store Name"
                        value={shopID}
                        onChangeText={(value) => setShopId(value)}
                    />
                </View>
                <View style={styles.inputContainer}>
                <Text style={styles.label}>Sales Associate's Number (Optional)</Text>
                <TextInput
                    style={[styles.input]}
                    placeholder="Sales Associate's Number"
                    value={mobileNumber} // Set the value to mobileNumber
                    editable={false} // Make it read-only
                    keyboardType="numeric"
                />
</View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Your Pincode*</Text>
                    <TextInput
                        style={[styles.input]}
                        placeholder="Your Pincode"
                        value={pincode}
                        onChangeText={(value) => setPincode(value)}
                        keyboardType="numeric"
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>State*</Text>
                    <TextInput
                        style={[styles.input]}
                        placeholder="Your State"
                        value={shopState}
                        onChangeText={(value) => setShopState(value)}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>City*</Text>
                    <TextInput
                        style={[styles.input]}
                        placeholder="Your City"
                        value={city}
                        onChangeText={(value) => setCity(value)}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Complete Address *</Text>
                    <TextInput
                        style={[styles.input, { height: windowHeight * 0.1, textAlignVertical: 'top' }]}
                        placeholder="Complete Address"
                        value={address}
                        onChangeText={(value) => setAddress(value)}
                        multiline
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Your Shop Category*</Text>
                    <Picker
                        selectedValue={selectedCategory}
                        onValueChange={(itemValue, itemIndex) => {
                            setSelectedCategory(itemValue);
                            // Find the ID of the selected category
                            const category = categories.find(cat => cat.name === itemValue);
                            setSelectedCategoryId(category ? category.id : ''); // Update the selected category ID state
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
    submitButton: {
        marginTop: 40, // Adjust this value to change the vertical spacing
    },
});
