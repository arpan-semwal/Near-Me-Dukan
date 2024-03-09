import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button, TouchableOpacity } from 'react-native';
import Colors from '../../utils/Colors';
import { useNavigation } from '@react-navigation/native';
import ShopkeeperScreen from '../RegisterScreen/ShopkeeperScreen';

export default function OtpScreen2({ route }) {
    const { phoneNumber } = route.params;
    const [otp, setOtp] = useState('');
    const [isCorrectOtp, setIsCorrectOtp] = useState(true); // Initially assuming OTP is correct
    const [isResent, setIsResent] = useState(false); // State to track if OTP has been resent
    const navigation = useNavigation();

    // Function to handle OTP input change
    const handleOtpChange = (text, index) => {
        let newOtp = otp.split('');
        newOtp[index] = text;
        setOtp(newOtp.join(''));
        setIsCorrectOtp(true); // Reset to true on OTP change
    };

    // Function to handle OTP submission
    const handleSubmit = () => {
        const correctOtp = '1234'; // Example correct OTP
        if (otp === correctOtp) {
            // Correct OTP
            setIsCorrectOtp(true);
            // Navigate to ShopkeeperScreen
            navigation.navigate('Shop');
        } else {
            // Incorrect OTP
            setIsCorrectOtp(false);
        }
    };

    // Function to handle resend OTP
    const handleResend = () => {
        // Logic to resend OTP
        setIsResent(true); // Set the state to indicate OTP has been resent
        setIsCorrectOtp(true); // Reset to true on resend
    };

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Enter OTP</Text>
            <View style={styles.blueBox}>
                <View style={styles.countryCodeContainer}>
                    <Text style={styles.countryCode}>+91</Text>
                </View>
                <TextInput
                    style={[styles.input, { width: '100%' }]}
                    placeholder="10 digits mobile number"
                    keyboardType="phone-pad"
                    value={phoneNumber}
                    editable={false}
                />
            </View>
            <View style={styles.subheadingContainer}>
                <Text style={[styles.subheading, { textAlign: 'left' }]}>Enter the OTP below *</Text>
                <View style={styles.otpMainContainer}>
                    <View style={styles.otpContainer}>
                        {[0, 1, 2, 3].map((index) => (
                            <TextInput
                                key={index}
                                style={styles.otpInput}
                                placeholder="0"
                                keyboardType="numeric"
                                maxLength={1}
                                value={otp[index]}
                                onChangeText={(text) => handleOtpChange(text, index)}
                            />
                        ))}
                    </View>
                    <TouchableOpacity onPress={handleResend}>
                        <Text style={styles.resendText}>Resend OTP</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.buttonContainer}>
                <Button
                    style={styles.btn1}
                    title="Submit"
                    onPress={handleSubmit}
                />
            </View>
            <View style={styles.sentTextContainer}>
                <Text style={[styles.sentText, !isCorrectOtp && styles.errorText]}>
                    {isCorrectOtp ? (isResent ? "We have resent OTP," : "We have sent OTP,") : "Oops! You entered the wrong OTP"}
                </Text>
                {!isCorrectOtp && <Text style={styles.errorText}>Please try again.</Text>}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    heading: {
        fontSize: 26,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
    },
    subheadingContainer: {
        alignItems: 'flex-start', // Align the subheading to the left
        marginBottom: 10,
    },
    subheading: {
        fontSize: 16,
        fontWeight: '500',
        color: '#484848',
    },
    otpMainContainer: {
        alignItems: 'center', // Center the OTP container horizontally
    },
    otpContainer: {
        flexDirection: 'row',
        justifyContent: 'center', // Center OTP inputs horizontally
        width: '70%',
    },
    otpInput: {
        width: '22%', // Adjusted width to accommodate spacing between inputs
        height: 30,
        borderWidth: 1,
        borderColor: '#707070',
        textAlign: 'center',
        fontSize: 18,
        borderRadius: 5,
        marginHorizontal: 5, // Add margin between OTP input fields
    },
    resendText: {
        fontSize: 14,
        color: '',
        marginTop: 10,
    },
    sentTextContainer: {
        width: '60%', // Make the container width cover the entire screen
        alignItems: 'center',
        backgroundColor: Colors.BACKGROUND,  
    },
    sentText: {
        color: 'blue', // Set text color to white
        backgroundColor: Colors.BACKGROUND,   // Set background color to #484848
        padding: 3, // Add padding for better visibility
        textAlign: 'center', // Center the text
    },
    errorText: {
        color: 'blue', // Set text color to red for error message
    },
    blueBox: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '70%',
        borderWidth: 1,
        marginBottom: 10,
    },
    countryCodeContainer: {
        backgroundColor: '#007bff',
        paddingHorizontal: 8,
        paddingVertical: 10,
    },
    countryCode: {
        color: '#fff',
        fontSize: 18,
    },
    input: {
        flex: 1,
        height: 39,
        color: '#707070',
        fontSize: 18,
        marginLeft: 10,
    },
    buttonContainer: {
        width: '50%',
        marginBottom: 20,
    },
    btn1: {
        backgroundColor: Colors.BUTTONCOLOR,
    },
});
