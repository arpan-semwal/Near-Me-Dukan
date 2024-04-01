import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'; // Import Image component
import { paymentModeData } from './ShopkeeperPayment'; // Importing dummy payment mode data

export default function ShopkeeperPayments() {
  const handleButtonPress = (reference) => {
    // Handle button press based on the reference
    console.log('Button pressed for reference:', reference);
  };

  return (
    <View style={styles.container}>
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
      <View style={[styles.circularImageContainer, { marginBottom: 20 }]}>
        <Image source={require('../../../../../assets/name.png')} style={styles.circularImage} />
      </View>

      {/* Payment Data */}
      <View style={styles.tableHeader}>
        <Text style={styles.headerText}>Amount</Text>
        <Text style={styles.headerText}>Payment Mode</Text>
        <Text style={styles.headerText}>Reference</Text>
        <Text style={styles.headerText}>Actions</Text>
      </View>
      {paymentModeData.map((payment) => (
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
    </View>
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
    paddingBottom: 20,
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
    paddingLeft: 1, // Decrease padding from the left side of the amount
  },
  cell: {
    flex: 1,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginLeft: 10, // Add padding between reference data and buttons
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
