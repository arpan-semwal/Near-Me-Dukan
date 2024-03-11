import { View, Text, Button, StyleSheet , Image,Dimensions  } from 'react-native';
import React from 'react';
import DropdownComponent from '../../Components/DropDownComponent/DropDownComponent';
import Colors from '../../utils/Colors';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
	const navigation = useNavigation();
	
	const windowWidth = Dimensions.get('window').width;
	const windowHeight = Dimensions.get('window').height;
	
	//Navigate to OTP new screen
	const handleNavigation = () => {
		navigation.navigate('Otp1');  
	  }
	
	
  return (
    <View style={styles.mainContainer}>
		 <Image
        source={require('../../../assets/logo.png')}
        style={{
          width: windowWidth * 0.8, // Adjust as needed
          height: windowHeight * 0.2, // Adjust as needed
          resizeMode: 'contain', // or 'cover' or 'stretch' or 'center', based on your requirements
		  marginBottom:20
        }}
      />
	 
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
	  textAlign: 'center',
	  marginBottom: 10,
	},
	languageText: {
	  fontSize: 26,
	  textAlign: 'center',
	  fontWeight:"bold"
	},
	buttonContainer: {
	  backgroundColor: Colors.BUTTONCOLOR,
	},
  });
