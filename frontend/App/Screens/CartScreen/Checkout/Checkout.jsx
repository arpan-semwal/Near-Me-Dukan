import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Checkout = ({ route }) => {
  const { cartItems, totalPrice, shopID, custName, selectedDate, selectedTime, firstCustomerName, custPhoneNumber } = route.params;
  const navigation = useNavigation();
  const [shopkeeperDetails, setShopkeeperDetails] = useState(null);

  // Extract the shopkeeper phone number from the first cart item
  const shopkeeperPhoneNumber = cartItems[0]?.shopkeeperPhoneNumber;

  useEffect(() => {
    if (!shopkeeperPhoneNumber) {
      Alert.alert('Error', 'Shopkeeper phone number is not available.');
      return;
    }

    const fetchShopkeeperDetails = async () => {
      try {
        console.log(`Fetching details for phone number: ${shopkeeperPhoneNumber}`); // Debugging line
        const response = await fetch(`http://192.168.29.67:3000/getShopkeeperDetails?phoneNumber=${shopkeeperPhoneNumber}`);
        if (response.ok) {
          const data = await response.json();
          console.log('Fetched shopkeeper details:', data); // Debugging line
          setShopkeeperDetails(data);
        } else {
          console.error('Failed to fetch shopkeeper details:', response.status); // Debugging line
          Alert.alert('Failed to fetch shopkeeper details. Please try again.');
        }
      } catch (error) {
        console.error('Error fetching shopkeeper details:', error);
        Alert.alert('Failed to fetch shopkeeper details. Please try again.');
      }
    };

    fetchShopkeeperDetails();
  }, [shopkeeperPhoneNumber]);

  const saveOrder = async () => {
    try {
      // Get the shopkeeper's name and shopID from the fetched details or from cartItems if the details are not available
      const shopkeeperName = shopkeeperDetails ? shopkeeperDetails.shopkeeperName : cartItems[0]?.shopkeeperName;
      const shopkeeperShopID = shopkeeperDetails ? shopkeeperDetails.shopID : shopID;  // Use the fetched shopID or fallback to params
  
      const response = await fetch('http://192.168.29.67:3000/saveOrder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          custName: firstCustomerName,
          cartItems,
          totalPrice,
          selectedDate,
          selectedTime,
          shopID: shopkeeperShopID,  // Use the fetched shopID or fallback to params
          shopkeeperName,  // Using the fetched shopkeeper name
          custPhoneNumber,
          shopkeeperPhoneNumber,  // Fixed this line
        }),
      });
  
      if (response.ok) {
        navigation.navigate('Pay', { custPhoneNumber: custPhoneNumber });  // Navigate to the payment screen
      } else {
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
            <Text style={styles.shoppingAt}>Shopping at: {custPhoneNumber}</Text>
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
                <Text style={styles.itemText}>{item.product_name}</Text>
                <Text style={styles.itemPrice}>Price: ₹{item.price}</Text>
                <Text style={styles.itemQuantity}>Quantity: {item.quantity}</Text>
                <Text style={styles.itemTotal}>Total: ₹{item.price * item.quantity}</Text>
                <Text style={styles.itemTotal}>Shopkeeper Phone: {item.shopkeeperPhoneNumber}</Text>
              </View>
            </View>
            {/* Divider between items */}
            {index < cartItems.length - 1 && <View style={styles.line} />}
          </View>
        ))}

        {/*Display shopkeeper details
        {shopkeeperDetails && (
          <View style={styles.shopkeeperDetailsContainer}>
            <Text style={styles.shopkeeperDetailsTitle}>Shopkeeper Details</Text>
            <Text style={styles.shopkeeperDetail}>Name: {shopkeeperDetails.shopkeeperName}</Text>
            <Text style={styles.shopkeeperDetail}>Phone: {shopkeeperDetails.phoneNumber}</Text>
            <Text style={styles.shopkeeperDetail}>Address: {shopkeeperDetails.address}, {shopkeeperDetails.city}, {shopkeeperDetails.pincode}, {shopkeeperDetails.shopState}</Text>
            <Text style={styles.shopkeeperDetail}>Shop Type: {shopkeeperDetails.shopType}</Text>
            <Text style={styles.shopkeeperDetail}>Category: {shopkeeperDetails.selectedCategory}</Text>
            <Text style={styles.shopkeeperDetail}>Store Name: {shopkeeperDetails.shopID}</Text>
          </View>
        )}*/}

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
  shopkeeperDetailsContainer: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  shopkeeperDetailsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  shopkeeperDetail: {
    fontSize: 16,
    marginBottom: 5,
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
