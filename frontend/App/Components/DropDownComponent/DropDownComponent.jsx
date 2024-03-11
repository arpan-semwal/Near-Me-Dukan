import React, { useState } from 'react';
import {  StyleSheet,  View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import Colors from '../../utils/Colors';
 

const data = [
  { label: 'English', value: '1' },
  { label: 'Hindi', value: '2' },
  { label: 'Bengali', value: '3' },
  { label: 'Gujrati', value: '4' },
  { label: 'Kannada', value: '5' },
  { label: 'Marathi', value: '6' },
  { label: 'Telgu', value: '7' },
 
];

const DropdownComponent = () => {
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  return (	
		<View style={styles.container}>
			<Dropdown
				style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
				placeholderStyle={styles.placeholderStyle}
				selectedTextStyle={styles.selectedTextStyle}
				inputSearchStyle={styles.inputSearchStyle}
				iconStyle={styles.iconStyle}
				data={data}
				search
				maxHeight={300}
				labelField="label"
				valueField="value"
				placeholder={!isFocus ? 'Select language' : '...'}
				searchPlaceholder="Search..."
				value={value}
				onFocus={() => setIsFocus(true)}
				onBlur={() => setIsFocus(false)}
				onChange={item => {
				setValue(item.value);
				setIsFocus(false);
				}}
			/>
		</View>
 
  );
};

export default DropdownComponent;

const styles = StyleSheet.create({
	
	mainContainer:{
	 
		backgroundColor: Colors.BACKGROUND,
		height:'100%',
	  },
	  
	
  container: {
	padding: 16,
	
  },
  dropdown: {
	height: 50,
	borderColor: 'gray',
	borderWidth: 0.5,
	borderRadius: 8,
	paddingHorizontal: 8,
  },
  icon: {
	marginRight: 5,
  },
  label: {
	position: 'absolute',
	backgroundColor: 'white',
	left: 22,
	top: 8,
	zIndex: 999,
	paddingHorizontal: 8,
	fontSize: 14,
  },
  placeholderStyle: {
	fontSize: 16,
  },
  selectedTextStyle: {
	fontSize: 16,
  },
  iconStyle: {
	width: 20,
	height: 20,
  },
  inputSearchStyle: {
	height: 40,
	fontSize: 16,
  },
});