import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Fontisto, FontAwesome6 } from '@expo/vector-icons';
import Colors from '../../utils/Colors';
import { useNavigation } from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function RegisterationMainScreen() {
	
	const navigation = useNavigation();
	
	const handleCustomerPress = () => {
        // Navigate to the customer screen
        navigation.navigate('Customer');
    };
	
    return (
        <View style={styles.container}>
            <Text style={styles.registerText}>Register Now</Text>
            <TouchableOpacity style={styles.card} onPress={() => console.log('Shopkeeper pressed')}>
                <Fontisto name="person" size={windowWidth * 0.2} color="black" />
                <Text style={styles.cardText}>Shopkeeper</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.card} onPress={handleCustomerPress}>
                <FontAwesome6 name="people-group" size={windowWidth * 0.2} color="black" />
                <Text style={styles.cardText}>Customer</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    registerText: {
        fontSize: windowWidth * 0.06,
        fontWeight: 'bold',
        marginBottom: windowHeight * 0.03,
    },
    card: {
        width: windowWidth * 0.8,
        height: windowHeight * 0.20,
        backgroundColor: Colors.CARDCOLOR,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: windowHeight * 0.03,
    },
    cardText: {
        fontSize: windowWidth * 0.05,
        fontWeight: 'bold',
        textAlign: 'center',
        color: "#fff"
    },
});
