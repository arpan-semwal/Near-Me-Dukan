// OtpScreen1.js

import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Colors from '../../utils/Colors';

export default function OtpScreen1() {
    const [phoneNumber, setPhoneNumber] = useState('');
    const navigation = useNavigation();

    const handleSubmitPhoneNumber = () => {
        // Validate phone number format and navigate to OTP screen 2
        if (phoneNumber.length === 10) { // Assuming Indian phone numbers with 10 digits
            navigation.navigate('Otp2', { phoneNumber });
        } else {
            alert('Please enter a valid phone number.');
        }
    };

    return (
        <View style={styles.container}>
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
            <Button
                title="Submit"
                onPress={handleSubmitPhoneNumber}
                color={Colors.primary} // Assuming primary color defined in your Colors file
            />
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
    blueBox: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        width: '100%', // Set width to fill the container
    },
    countryCodeContainer: {
        backgroundColor: '#007bff',
        borderRadius: 5,
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
        color: '#000',
        fontSize: 18,
    },
});
