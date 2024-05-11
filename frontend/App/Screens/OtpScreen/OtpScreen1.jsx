import React, { useState , useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Button, Image, Dimensions, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Colors from '../../utils/Colors';
import { useCustomer } from '../../Context/ContextApi';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function OtpScreen1() {
    const { setCustPhoneNumber } = useCustomer();
    const [phoneNumber, setPhoneNumber] = useState('');
    const navigation = useNavigation();
    
    useEffect(() => {
        // Set custPhoneNumber when the component mounts
        setCustPhoneNumber(phoneNumber);
    }, []);

    const handleSubmitPhoneNumber = () => {
        // Validate phone number
        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(phoneNumber)) {
            alert('Please enter a valid 10-digit phone number');
            return;
        }
    
        // Send a request to check if any user exists with the provided phone number
        fetch('http://172.16.16.145:3000/checkPhoneNumber', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ phoneNumber }),
        })
        .then(response => {
            if (response.ok) {
                // Phone number is available, navigate to Otp2 with userType 'unregistered'
                navigation.navigate('Otp2', { phoneNumber, userType: 'unregistered' });
            } else {
                return response.json();
            }
        })
        .then(data => {
            if (data) {
                // Phone number already exists, navigate to Otp2 with the correct userType
                navigation.navigate('Otp2', { phoneNumber, userType: data.message.includes('shopkeepers') ? 'shopkeeper' : 'customer' });
            }
        })
        .catch(error => {
            console.error('An error occurred while checking the phone number:', error);
            alert('An error occurred while checking the phone number.');
        });
    };
    

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image
                    source={require('../../../assets/logo.png')}
                    style={styles.logo}
                />
            </View>
            <View style={styles.contentContainer}>
                <Text style={styles.heading}>Enter Your Mobile Number</Text>
                <View style={styles.blueBox}>
                    <View style={styles.countryCodeContainer}>
                        <Text style={styles.countryCode}>+91</Text>
                    </View>
                    <TextInput
                        style={styles.input}
                        placeholder="10 digits mobile number"
                        keyboardType="phone-pad"
                        onChangeText={(text) => setPhoneNumber(text)}
                    />
                </View>
                <View style={styles.buttonContainer}>
                    <Button
                        style={styles.btn1}
                        title="Submit"
                        onPress={handleSubmitPhoneNumber}
                    />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start', // Align items at the top
        alignItems: 'center',
        paddingTop: windowHeight * 0.05, // Add top padding based on device height
    },
    imageContainer: {
        marginBottom: windowHeight * 0.1, // Adjust margin bottom based on device height
    },
    logo: {
        resizeMode: 'contain',
        width: windowWidth * 0.8, // Adjust as needed
        height: windowHeight * 0.2, // Adjust as needed
    },
    contentContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    heading: {
        fontSize: windowWidth * 0.06, // Adjust font size based on device width
        textAlign: 'center',
        fontWeight: "bold",
        marginBottom: windowHeight * 0.03, // Adjust margin bottom based on device height
    },
    blueBox: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '80%',
        borderWidth: 1,
        borderRadius: windowWidth * 0.01, // Adjust border radius based on device width
        marginBottom: windowHeight * 0.03, // Adjust margin bottom based on device height
    },
    countryCodeContainer: {
        backgroundColor: '#007bff',
        paddingHorizontal: windowWidth * 0.03, // Adjust padding based on device width
        paddingVertical: windowHeight * 0.023, // Adjust padding based on device height
        borderTopLeftRadius: windowWidth * 0.01, // Adjust border radius based on device width
        borderBottomLeftRadius: windowWidth * 0.01, // Adjust border radius based on device width
    },
    countryCode: {
        color: '#fff',
        fontSize: windowWidth * 0.04, // Adjust font size based on device width
    },
    input: {
        flex: 1,
        height: windowHeight * 0.07, // Adjust height based on device height
        color: '#000',
        fontSize: windowWidth * 0.05, // Adjust font size based on device width
        textAlign: "center"
    },
    buttonContainer: {
        width: '80%',
    },
    btn1: {
        backgroundColor: Colors.BUTTONCOLOR,
    }
});
