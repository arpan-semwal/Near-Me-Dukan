import React, { useState } from 'react';
import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Colors from '../../../utils/Colors';
import { useNavigation } from '@react-navigation/native';
import { useCart, useCustomer } from '../../../Context/ContextApi';
import axios from 'axios';

const saveOrder = async (custName, custPhoneNumber, cartItems, totalPrice, selectedDate, selectedTime, shopID, shopkeeperName, phoneNumber) => {
  try {
    const response = await axios.post('http://172.16.16.41:3000/saveOrder', {
      custName: custName,
      custPhoneNumber: custPhoneNumber,
      cartItems: cartItems,
      totalPrice: totalPrice,
      selectedDate: selectedDate, 
      selectedTime: selectedTime,
      shopID: shopID, // Pass shopID parameter
      shopkeeperName: shopkeeperName,
      phoneNumber: phoneNumber
    });
    console.log(response.data.message);
    // Redirect to success page or show a success message
    return true;
  } catch (error) {
    console.error('Error saving order:', error);
    // Handle error
    return false;
  }
};

const Checkout = ({ route }) => {
  const { cartItems, totalPrice, shopkeeperName, phoneNumber, shopID, custName, custPhoneNumber, selectedDate, selectedTime } = route.params;
  const { storeName } = useCart();
  const navigation = useNavigation();

  // State to track if the notification is sent
  const [notificationSent, setNotificationSent] = useState(false);

  // Function to handle notification
  const handleNotification = async () => {
    const shopResponse = await sendShopNotification(); // Send notification to shopkeeper
    if (shopResponse) {
      const customerResponse = await sendCustomerNotification(); // Send notification to customer
      if (customerResponse) {
        Alert.alert('Success', 'Your appointment has been confirmed.');
      } else {
        Alert.alert('Error', 'Failed to send confirmation notification to the customer.');
      }
    } else {
      Alert.alert('Error', 'Failed to send appointment notification to the shopkeeper.');
    }
  };

  // Function to send notification to shopkeeper
  const sendShopNotification = async () => {
    // Code to send notification to the shopkeeper
    // Return true if notification is sent successfully, false otherwise
    return true; // Placeholder response, replace with actual implementation
  };

  // Function to send notification to customer
  const sendCustomerNotification = async () => {
    // Code to send notification to the customer
    // Return true if notification is sent successfully, false otherwise
    return true; // Placeholder response, replace with actual implementation
  };

  // Function to handle payment and notification
  const handlePayment = async () => {
    const orderSaved = await saveOrder(custName, custPhoneNumber, cartItems, totalPrice, selectedDate || null, selectedTime || null, shopID, shopkeeperName, phoneNumber);
    if (orderSaved) {
      handleNotification();
    } else {
      Alert.alert('Error', 'Failed to save the order. Please try again later.');
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Image source={require('../../../../assets/logo.png')} style={styles.storeImage} />
          <View style={styles.headerText}>
            <Text style={styles.welcomeText}>Welcome: {custName}</Text>
            <Text style={styles.shoppingAt}>Shopping at: {shopID}</Text>
            <TouchableOpacity>
              <Text style={styles.shoppingAt}>Change Address</Text>
            </TouchableOpacity>
            <Text style={styles.shoppingAt}>Shop ID: {phoneNumber}</Text>
            <Text style={styles.shoppingAt}>ShopKeeper Name: {shopkeeperName}</Text>
            <Text style={styles.shoppingAt}>Customer Phone: {selectedDate}</Text>
            <Text style={styles.shoppingAt}>Customer Phone: {selectedTime}</Text>
          </View>
        </View>
        <View>
          <Text style={styles.checkout}>CheckOut</Text>
        </View>

        {cartItems.map((item, index) => (
          <View key={item.id}>
            <View style={styles.itemContainer}>
              <Image source={item.image} style={styles.itemImage} />
              <View style={styles.itemDetails}>
                <Text style={styles.itemText}>{item.name}</Text>
                <Text style={styles.itemPrice}>Price: ₹{item.price}</Text>
                <Text style={styles.itemQuantity}>Quantity: {item.quantity}</Text>
                <Text style={styles.itemTotal}>Total: ₹{item.price * item.quantity}</Text>
              </View>
            </View>
            {index < cartItems.length - 1 && <View style={styles.line} />}
          </View>
        ))}

        <Text style={styles.totalPrice}>Total Price: ₹{totalPrice}</Text>

        <Text style={styles.paymentMethod}>Select Payment Method</Text>
        <TouchableOpacity
          style={styles.paymentButton}
          onPress={handlePayment}>
          <Text style={styles.paymentButtonText}>Pay At Shop</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
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
  customerName: {
    fontSize: 16,
    marginBottom: 5,
  },
  shoppingAt: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  checkout: {
    fontWeight: 'bold',
    fontSize: 26,
    textAlign: 'center',
    marginBottom: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0', // Grey background color
    marginBottom: 10,
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 20,
  },
  itemDetails: {
    flex: 1,
  },
  itemText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemPrice: {
    fontSize: 16,
    color: 'grey',
  },
  itemQuantity: {
    fontSize: 16,
    color: 'grey',
  },
  itemTotal: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  totalPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
  },
  paymentMethod: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
  paymentButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 50,
    alignItems: 'center',
    marginHorizontal: 50,
    marginBottom: 10,
  },
  paymentButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  line: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 10,
  },
});

export default Checkout;