import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button, ScrollView, Dimensions, Image, TouchableOpacity } from 'react-native';
import Colors from '../../../utils/Colors';
import { useNavigation } from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function AddNewAddress({ route }) {
  const [fullName, setFullName] = useState('');
  const [doorNo, setDoorNo] = useState('');
  const [streetArea, setStreetArea] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [landmark, setLandmark] = useState('');
  const [phone, setPhone] = useState('');
  const navigation = useNavigation();
  const { addresses = [], custAddress = '' } = route.params || {};

  const handleSubmit = () => {
    // Handle form submission logic here
    console.log("Full Name:", fullName);
    console.log("Door No:", doorNo);
    console.log("Street / Area:", streetArea);
    console.log("City:", city);
    console.log("State:", state);
    console.log("Landmark:", landmark);
    console.log("Phone:", phone);

    // Add the new address to the list of addresses
    const newAddress = {
      fullName,
      doorNo,
      streetArea,
      city,
      state,
      landmark,
      phone,
    };

    // Merge the existing addresses with the new one
    const updatedAddresses = [...addresses, newAddress];

    // Pass the updated list of addresses and custAddress back to the ChangeAddress screen
    navigation.navigate('ChangeAddress', {
      custAddress: custAddress,
      addresses: updatedAddresses,
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent} keyboardShouldPersistTaps="handled">
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.headerContainer}>
          <Image source={require('../../../../assets/logo.png')} style={styles.storeImage} />
          <View style={styles.headerText}>
            <Text style={styles.welcomeText}>Welcome:  </Text>
            <Text style={styles.shoppingAt}>Shopping at:  </Text>
            <TouchableOpacity >
              <Text style={styles.shoppingAt}>Change Address</Text>
            </TouchableOpacity>
            <Text style={styles.shoppingAt}>Shop ID: </Text>
          </View>
        </View>
        {/* End Header */}

        <Text style={styles.heading}>Add New Address</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Full Name</Text>
          <TextInput
            style={styles.input}
            placeholder="John Doe"
            value={fullName}
            onChangeText={setFullName}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Flat / Door No.*</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter door number"
            value={doorNo}
            onChangeText={setDoorNo}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Street / Area*</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter street or area"
            value={streetArea}
            onChangeText={setStreetArea}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>City</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter city"
            value={city}
            onChangeText={setCity}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>State</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter state"
            value={state}
            onChangeText={setState}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Landmark</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter landmark"
            value={landmark}
            onChangeText={setLandmark}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Phone</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter phone number"
            value={phone}
            onChangeText={setPhone}
          />
        </View>
        <Button
          title="Save Address"
          onPress={handleSubmit}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.BACKGROUND
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "flex-start", // Aligns items to the beginning and end of the container
    marginBottom: 20,
    width: '100%', // Ensures the header spans the full width
  },
  storeImage: {
    width: 90,
    height: 90,
    borderRadius: 10,
  },
  headerText: {
    marginLeft: 20,
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  shoppingAt: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  label: {
    color: Colors.LABELcCOLOR,
    marginBottom: 5,
  },
  input: {
    width: '100%',
    height: windowHeight * 0.05,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  button: {
    padding: 20
  }
});
