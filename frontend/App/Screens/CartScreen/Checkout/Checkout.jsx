import React from 'react';
import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Checkout = ({ route }) => {
  const { cartItems, totalPrice, shopkeeperName, shopID, custName, custPhoneNumber, selectedDate, selectedTime, firstCustomerName } = route.params;
  const navigation = useNavigation();

  const saveOrder = async () => {
    try {
      const response = await fetch('http://192.168.29.67:3000/saveOrder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          custName,
          custPhoneNumber,
          cartItems,
          totalPrice,
          selectedDate,
          selectedTime,
          shopID,
          shopkeeperName,
          phoneNumber: custPhoneNumber, // Assuming phoneNumber is custPhoneNumber
        }),
      });

      if (response.ok) {
        // Order saved successfully, navigate to payment success screen or another screen
        navigation.navigate('Pay'); // Replace with your desired navigation action
      } else {
        // Failed to save order
        Alert.alert('Failed to save the order. Please try again.');
      }
    } catch (error) {
      console.error('Error saving order:', error);
      Alert.alert('Failed to save the order. Please try again.');
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Header section */}
        <View style={styles.headerContainer}>
          <Image source={require('../../../../assets/logo.png')} style={styles.storeImage} />
          <View style={styles.headerText}>
            <Text style={styles.welcomeText}>Welcome: {firstCustomerName}</Text>
            <Text style={styles.shoppingAt}>Shopping at: {shopID}</Text>
          </View>
        </View>

        {/* Checkout title */}
        <View>
          <Text style={styles.checkout}>CheckOut</Text>
        </View>

        {/* Display cart items */}
        {cartItems.map((item, index) => (
          <View key={item.id}>
            {/* Item details */}
            <View style={styles.itemContainer}>
              <View style={styles.itemDetails}>
                <Text style={styles.itemText}>{item.name}</Text>
                <Text style={styles.itemPrice}>Price: ₹{item.price}</Text>
                <Text style={styles.itemQuantity}>Quantity: {item.quantity}</Text>
                <Text style={styles.itemTotal}>Total: ₹{item.price * item.quantity}</Text>
              </View>
            </View>
            {/* Divider between items */}
            {index < cartItems.length - 1 && <View style={styles.line} />}
          </View>
        ))}

        {/* Display total price */}
        <Text style={styles.totalPrice}>Total Price: ₹{totalPrice}</Text>

        {/* Payment button */}
        <View style={styles.paymentContainer}>
          <TouchableOpacity
            style={styles.paymentButton}
            onPress={saveOrder} // Call saveOrder function on button press
          >
            <Text style={styles.paymentButtonText}>Pay At Shop</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
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
    borderRadius: 5,
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
  paymentContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  paymentButton: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 50,
    alignItems: 'center',
    marginBottom: 40,
  },
  paymentButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  line: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 10,
  },
});

export default Checkout;
