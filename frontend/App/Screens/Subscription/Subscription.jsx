import React from 'react';
import { View, Text, StyleSheet, Button, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook

export default function Subscription({route}) {
	const navigation = useNavigation(); 
	const handleNavigation = () => {
		navigation.navigate("ShopkeeperPay" , {phoneNumber:phoneNumber , selectedSubCategory:selectedSubCategory , selectedSubCategoryId:selectedSubCategoryId , userType:userType , selectedCategoryType:selectedCategoryType});
	}
    const { phoneNumber , selectedSubCategory  ,selectedSubCategoryId , userType,selectedCategoryType} = route.params;
	
	
    return (
        <View style={styles.container}>
            <Image source={require('../../../assets/logo.png')} style={styles.logo} />
            <Text style={styles.heading}>Subscription Plan</Text>
            <Text style={styles.price}>₹3650</Text>
          
           

            <View style={styles.bulletPoints}>
                <Text style={styles.details}> 12 Months + 2 Months FREE</Text>
                <Text style={styles.bullet}>• Per Day Cost Less Than a Cup of Tea</Text>
                <Text style={styles.bullet}>• Get your OWN Online Shop.</Text>
                <Text style={styles.bullet}>• Manage Your Inventory.</Text>
                <Text style={styles.bullet}>• Manage Discounts on Your Fingertips.</Text>
                <Text style={styles.bullet}>• Add or Edit Your Products.</Text>
                <Text style={styles.bullet}>• Manage Billing.</Text>
                <Text style={styles.bullet}>• Manage Your Customers.</Text>
            </View>
            <Button title="Pay ₹3650" onPress={handleNavigation} style={styles.button} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 100,
        height: 100,
        marginBottom: 20,
    },
    heading: {
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 10, // Adjust the margin to match the bullet points
    },
    price: {
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    details: {
        marginBottom: 10,
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 20, // Align with the bullet points
    },
    bulletPoints: {
        width: '80%',
        marginLeft: 'auto',
        marginRight: 'auto',
        textAlign: 'left',
    },
    bullet: {
        fontSize: 15,
        marginLeft: 20,
        marginBottom: 5,
        fontWeight: '500',
    },
    
});
