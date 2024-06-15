import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button, TouchableOpacity , Dimensions , Image } from 'react-native';
import Colors from '../../utils/Colors';
import { useNavigation } from '@react-navigation/native';
 

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function OtpScreen2({ route }) {
    const { phoneNumber, userType } = route.params;
    const [otp, setOtp] = useState('');
    const [isCorrectOtp, setIsCorrectOtp] = useState(true);
    const [isResent, setIsResent] = useState(false);
    const navigation = useNavigation();

    const handleOtpChange = (text, index) => {
        let newOtp = otp.split('');
        newOtp[index] = text;
        setOtp(newOtp.join(''));
        setIsCorrectOtp(true);
    };

    const handleSubmit = async () => {
        const correctOtp = '1234'; // Example correct OTP
    
        // Perform OTP verification
        if (otp === correctOtp) {
            setIsCorrectOtp(true);
            
            try {
                // Make a request to create a session in the backend
                const response = await fetch('http://192.168.29.67:3000/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ userId: phoneNumber }), // Assuming phoneNumber is the userId
                });
    
                if (response.ok) {
                    const data = await response.json();
                    // Navigate user based on userType
                    if (userType === 'shopkeeper') {
                        navigation.navigate('ShopkeeperHome', { phoneNumber: phoneNumber, userType: userType });
                    } 
                    else if (userType === 'customer') {
                        navigation.navigate('CustomerHomePage', { custPhoneNumber: phoneNumber, userType: userType });
                    }
                    else if (userType === 'unregistered') {
                        navigation.navigate('Register', { phoneNumber: phoneNumber, userType: userType });
                    }
                } else {
                    console.error('Error creating session:', response.statusText);
                }
            } catch (error) {
                console.error('Error creating session:', error);
            }
        } else {
            setIsCorrectOtp(false);
        }
    };
    

    const handleResend = () => {
        setIsResent(true);
        setIsCorrectOtp(true);
    };

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image
                    source={require('../../../assets/logo.png')}
                    style={styles.logo}
                />
            </View>
            <Text style={styles.heading}>Enter OTP : {userType}</Text>
            <View style={styles.blueBox}>
                <View style={styles.countryCodeContainer}>
                    <Text style={styles.countryCode}>+91</Text>
                </View>
                <TextInput
                    style={[styles.input, { width: '100%' }]}
                    placeholder="10 digits mobile number"
                    keyboardType="phone-pad"
                    value={phoneNumber || ''}
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
    imageContainer: {
        marginBottom: windowHeight * 0.05, // Adjust margin bottom based on device height
    },
    logo: {
        resizeMode: 'contain',
        width: windowWidth * 0.4, // Adjust width based on device width
        height: windowHeight * 0.2, // Adjust height based on device height
    },
    heading: {
        fontSize: 26,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
    },
    subheadingContainer: {
        alignItems: 'flex-start',
        marginBottom: 10,
    },
    subheading: {
        fontSize: 16,
        fontWeight: '500',
        color: '#484848',
    },
    otpMainContainer: {
        alignItems: 'center',
    },
    otpContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: '70%',
    },
    otpInput: {
        width: '22%',
        height: 30,
        borderWidth: 1,
        borderColor: '#707070',
        textAlign: 'center',
        fontSize: 18,
        borderRadius: 5,
        marginHorizontal: 5,
    },
    resendText: {
        fontSize: 14,
        marginTop: 10,
    },
    sentTextContainer: {
        width: '60%',
        alignItems: 'center',
    },
    sentText: {
        color: 'blue',
        padding: 3,
        textAlign: 'center',
    },
    errorText: {
        color: 'red',
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
});
