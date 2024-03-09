// OtpScreen2.js

import React from 'react';
import { View, Text, TextInput, StyleSheet, Button } from 'react-native';
import Colors from '../../utils/Colors';

export default function OtpScreen2({ route }) {
    const { phoneNumber } = route.params;

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
                value={phoneNumber} // Display the phone number passed as a parameter
                editable={false} // Make the input field disabled
            />
            </View>
            
            <View style={styles.buttonContainer}>
            <Button
                style={styles.btn1}
                title="Submit"
               
                
            />
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
    blueBox: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '80%', 
        borderWidth:1,// Set width to fill the container
        
        
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
        marginLeft:20,
         
        
    },
    buttonContainer:{
       marginTop:20 
    },
    btn1:{
        backgroundColor:Colors.BUTTONCOLOR,
    }
});
