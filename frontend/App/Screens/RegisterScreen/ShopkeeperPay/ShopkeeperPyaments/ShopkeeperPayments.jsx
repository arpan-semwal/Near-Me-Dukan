import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native'; // Import ScrollView component
import { paymentModeData } from './ShopkeeperPayment'; // Importing dummy payment mode data

const buttonsData = [
  { id: 1, title: 'Today' },
  { id: 2, title: 'Yesterday' },
  { id: 3, title: 'One Week' },
  { id: 4, title: '30 Days' },
  { id: 5, title: 'All Time' },
  { id: 6, title: 'Select Date Range' },
];

export default function ShopkeeperPayments() {
  const [selectedButton, setSelectedButton] = useState('Today'); // State to keep track of the selected button

  const handleButtonPress = (title) => {
    // Set the selected button title
    setSelectedButton(title);
  };

  // Function to filter payment data based on selected time range
  const filteredPaymentData = () => {
    switch (selectedButton) {
      case 'Today':
        return paymentModeData.filter(payment => isToday(payment.date));
      case 'Yesterday':
        return paymentModeData.filter(payment => isYesterday(payment.date));
      case 'One Week':
        return paymentModeData.filter(payment => isWithinOneWeek(payment.date));
      case '30 Days':
        return paymentModeData.filter(payment => isWithin30Days(payment.date));
      case 'All Time':
        return paymentModeData;
      case 'Select Date Range':
        // Implement functionality for selecting date range
        return [];
      default:
        return [];
    }
  };

  // Helper function to check if a date is today
  const isToday = (date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  // Helper function to check if a date is yesterday
  const isYesterday = (date) => {
    const yesterday = new Date(Date.now() - 86400000);
    return date.toDateString() === yesterday.toDateString();
  };

  // Helper function to check if a date is within one week
  const isWithinOneWeek = (date) => {
    const oneWeekAgo = new Date(Date.now() - 7 * 86400000);
    return date >= oneWeekAgo;
  };

  // Helper function to check if a date is within 30 days
  const isWithin30Days = (date) => {
    const thirtyDaysAgo = new Date(Date.now() - 30 * 86400000);
    return date >= thirtyDaysAgo;
  };

  return (
    <ScrollView style={styles.container}>  
      <View style={styles.headerContainer}>
        <Image source={require('../../../../../assets/logo.png')} style={styles.storeImage} />
        <View style={styles.headerText}>
          <Text style={styles.welcomeText}>Welcome: </Text>
          <Text style={styles.shoppingAt}>Shop ID: </Text>
          <Text style={styles.shoppingAt}>Subscription Valid till 10 October 2024</Text>
        </View>
      </View>

      {/* First Image (Full Width) */}
      <Image source={require('../../../../../assets/general.png')} style={styles.fullWidthImage} />

      {/* Second Image (Circular with Overlay) */}
      <View style={styles.circularImageContainer}>
        <Image source={require('../../../../../assets/name.png')} style={styles.circularImage} />
       
      </View>
	  <Text style={styles.paymentHeading}>My Payments</Text>  

      {/* Buttons */}
      <View style={styles.buttonsContainer}>
        {buttonsData.map(button => (
          <TouchableOpacity
            key={button.id}
            style={[styles.button1, selectedButton === button.title && styles.selectedButton]}
            onPress={() => handleButtonPress(button.title)}>
            <Text style={styles.buttonText}>{button.title}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Payment Data */}
      <View style={styles.tableHeader}>
        <Text style={styles.headerText}>Amount</Text>
        <Text style={styles.headerText}>Payment Mode</Text>
        <Text style={styles.headerText}>Reference</Text>
        <Text style={styles.headerText}>Actions</Text>
      </View>
      {filteredPaymentData().map((payment) => (
        <View key={payment.id} style={styles.row}>
          <Text style={styles.cell}>{payment.amount}</Text>
          <Text style={styles.cell}>{payment.mode}</Text>
          <Text style={styles.cell}>{payment.reference}</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleButtonPress(payment.reference)}>
              <Text style={styles.buttonText}>View Details</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleButtonPress(payment.reference)}>
              <Text style={styles.buttonText}>Refund</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScrollView>  
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  storeImage: {
    width: 90,
    height: 90,
    borderRadius: 10,
  },
  headerText: {
    flex: 1,
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
  fullWidthImage: {
    width: '100%',
    height: 150,
    marginBottom: 20,
  },
  circularImageContainer: {
    alignItems: 'center',
    paddingBottom: 50,
    position: 'relative', // Added position relative for proper stacking
  },
  circularImage: {
    width: 100,
    height: 100,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: 'white',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -60 }, { translateY: -60 }],
  },
  paymentHeading: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'lightblue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    margin: 5,
  },
  button1:{
	justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#C7BC00',
        margin: 5,
        width: '30%', // Adjust the width according to your preference
        height: 35,
        borderRadius: 50,
    
  },
  selectedButton: {
    backgroundColor: 'lightblue', // Change the background color for the selected button
  },
  buttonText: {
    fontWeight: 'bold',
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  headerText: {
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 10,
    paddingLeft: 1,  
  },
  cell: {
    flex: 1,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginLeft: 10,  
  },
  button: {
    backgroundColor: 'lightblue',
    paddingVertical: 5,
	
    paddingHorizontal: 10,
    borderRadius: 5,
    marginVertical: 2,
    minWidth: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontWeight: 'bold',
  },
});
