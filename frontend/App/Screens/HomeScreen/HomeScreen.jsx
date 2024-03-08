import { View, Text, Button, StyleSheet } from 'react-native';
import React from 'react';
import DropdownComponent from '../../Components/DropDownComponent/DropDownComponent';
import Colors from '../../utils/Colors';

export default function HomeScreen() {
  return (
    <View style={styles.mainContainer}>
		<Text style={styles.heading}>Near Ki Dukan</Text>
		<View style={styles.subContainer}>
      	<Text style={styles.languageText}>Please Select Preferred Language</Text>
      	<DropdownComponent />

      <View style={styles.buttonContainer}>
        <Button title="continue" />
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
	  width: '80%', // Adjust width as needed
	  alignSelf: 'center',
	  backgroundColor: Colors.BUTTONCOLOR,
	  borderRadius: 8,
	},
  });
