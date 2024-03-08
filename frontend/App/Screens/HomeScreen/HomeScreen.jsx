import { View, Text, Button,StyleSheet } from 'react-native'
import React from 'react'
import DropdownComponent from '../../Components/DropDownComponent/DropDownComponent'

export default function HomeScreen() {
  return (
	<View>
	  <Text>Near Ki Dukan</Text>
	  
	  <DropdownComponent/>
	  
	  <View style={styles.buttonContainer}>
      <Button title="continue"/>
    </View>
	</View>
  )
}

const styles = StyleSheet.create({
	buttonContainer: {
	  width: '80%', // Adjust width as needed
	  alignSelf: 'center',
	  backgroundColor: 'blue',
	  borderRadius: 8,
	},
  });