import { View, Text, Button, StyleSheet } from 'react-native';
import React from 'react';
import DropdownComponent from '../../Components/DropDownComponent/DropDownComponent';
import Colors from '../../utils/Colors';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
	const navigation = useNavigation();
	
	//Navigate to OTP new screen
	const handleNavigation = () => {
		navigation.navigate('Otp1');  
	  }
	
	
  return (
    <View style={styles.mainContainer}>
		<Text style={styles.heading}>Near Ki Dukan</Text>
		<View style={styles.subContainer}>
      	<Text style={styles.languageText}>Please Select Preferred Language</Text>
      	<DropdownComponent />

      <View style={styles.buttonContainer}>
        <Button title="continue" onPress={handleNavigation}/>
      </View>
		</View>
      
    </View>
  );
}

const styles = StyleSheet.create({
	mainContainer: {
	  flex: 1,
	  justifyContent: "center",
	  alignItems: "center",
	},
	 
	heading: {
	  fontSize: 26,
	  fontWeight: 'bold',
	  textAlign: 'center',
	  marginBottom: 10,
	},
	languageText: {
	  fontSize: 16,
	  textAlign: 'center',
	},
	buttonContainer: {
	  backgroundColor: Colors.BUTTONCOLOR,
	},
  });
