import React, { useState, useContext } from 'react';
import { View, Text, TextInput, StyleSheet, Button, ScrollView, Dimensions, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Colors from '../../utils/Colors';
import { CustomerContext } from '../../Context/ContextApi'; // Import CustomerContext

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function CustomerScreen({ route, onFormSubmit }) {
    const { setCustomerName, setShopID, setShopName, setCustAddress, setPincode, setState, setCity } = useContext(CustomerContext); // Access context setters
    const { phoneNumber } = route.params || {};
    const [name, setName] = useState('');
    const [pincode, setPincodeLocal] = useState(''); // Local state for pincode
    const [shopID, setShopId] = useState('');
    const [state, setStateLocal] = useState(''); // Local state for state
    const [city, setCityLocal] = useState(''); // Local state for city
    const [address, setAddress] = useState('');
    const [requiredFields, setRequiredFields] = useState({});
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    

    const navigation = useNavigation();

    const handleSubmit = () => {
        setSubmitted(true);

        if (!name.trim() || !pincode.trim() || !state.trim() || !city.trim() || !address.trim()) {
            console.log(alert("Please fill in all required fields."));
            return;
        }

        setFormSubmitted(true);

        console.log("Name:", name);
        console.log("Pincode:", pincode);
        console.log("Address:", address);

        if (onFormSubmit) {
            onFormSubmit();
        }
        
        setCustomerName(name);
        setShopID(shopID);
        setCustAddress(address);
        setPincode(pincode); // Set pincode using context
        setState(state); // Set state using context
        setCity(city); // Set city using context

        navigation.navigate('CustomerHomePage', {
            pincode: pincode,
            name: name,
            shopID: shopID,
            address: address
        });
    };

    const handleInputChange = (value, fieldName) => {
        switch (fieldName) {
            case 'name':
                setName(value);
                setRequiredFields({ ...requiredFields, name: value.trim() !== '' });
                break;
            case 'pincode':
                setPincodeLocal(value); // Update local state
                setRequiredFields({ ...requiredFields, pincode: value.trim() !== '' });
                break;
            case 'state':
                setStateLocal(value); // Update local state
                setRequiredFields({ ...requiredFields, state: value.trim() !== '' });
                break;
            case 'city':
                setCityLocal(value); // Update local state
                setRequiredFields({ ...requiredFields, city: value.trim() !== '' });
                break;
            case 'address':
                setAddress(value);
                setRequiredFields({ ...requiredFields, address: value.trim() !== '' });
                break;
            case 'shopID':
                setShopId(value);
                setShopID(value); // Update shopID in the context
                break;
            default:
                break;
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollViewContent} keyboardShouldPersistTaps="handled">
            <View style={styles.container}>
                <Image
                    source={require('../../../assets/logo.png')}
                    style={styles.logo}
                />
                <Text style={styles.heading}>Customer Registration</Text>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Phone Number</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Phone Number"
                        value={phoneNumber}
                        editable={false}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Your Name *</Text>
                    <TextInput
                        style={[styles.input, !requiredFields.name && submitted && styles.requiredInput]}
                        placeholder="John"
                        value={name}
                        onChangeText={(value) => handleInputChange(value, 'name')}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Shop ID</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="87361"
                        value={shopID}
                        onChangeText={setShopId}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Your Pincode *</Text>
                    <TextInput
                        style={[styles.input, !requiredFields.pincode && submitted && styles.requiredInput]}
                        placeholder="248004"
                        value={pincode}
                        onChangeText={(value) => handleInputChange(value, 'pincode')}
                        keyboardType="numeric"
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>State *</Text>
                    <TextInput
                        style={[styles.input, !requiredFields.state && submitted && styles.requiredInput]}
                        placeholder="Uttrakhand"
                        value={state}
                        onChangeText={(value) => handleInputChange(value, 'state')}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>City *</Text>
                    <TextInput
                        style={[styles.input, !requiredFields.city && submitted && styles.requiredInput]}
                        placeholder="Dehradun"
                        value={city}
                        onChangeText={(value) => handleInputChange(value, 'city')}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}> Complete Address *</Text>
                    <TextInput
                        style={[styles.input, { height: windowHeight * 0.1, textAlignVertical: 'top' }, !requiredFields.address && submitted && styles.requiredInput]}
                        placeholder="Enter your complete address"
                        value={address}
                        onChangeText={(value) => handleInputChange(value, 'address')}
                        multiline
                    />
                </View>
                <Button
                    title="Submit"
                    onPress={handleSubmit}
                    disabled={!Object.values(requiredFields).every(field => field)}
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
    logo: {
        resizeMode: 'contain',
        width: windowWidth * 0.8,
        height: windowHeight * 0.17,
        marginBottom: windowHeight * 0.03,
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
        color: Colors.LABELcCOLOR,
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
    }
});
