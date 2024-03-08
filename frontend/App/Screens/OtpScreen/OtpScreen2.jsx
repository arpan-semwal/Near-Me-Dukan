// OtpScreen2.js

import React from 'react';
import { View, Text, TextInput, StyleSheet, Button } from 'react-native';

export default function OtpScreen2({ route }) {
    const { phoneNumber } = route.params;

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Phone Number:</Text>
            <TextInput
                style={styles.input}
                placeholder="10 digits mobile number"
                keyboardType="phone-pad"
                value={phoneNumber} // Display the phone number passed as a parameter
                editable={false} // Make the input field disabled
            />
            <Button
                title="Verify"
                onPress={() => {
                    // Implement verification logic here
                }}
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
    label: {
        fontSize: 18,
        marginBottom: 10,
    },
    input: {
        width: '100%',
        height: 50,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 20,
    },
});
