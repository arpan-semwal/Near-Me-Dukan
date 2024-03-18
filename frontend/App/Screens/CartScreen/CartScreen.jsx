import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useCart } from '../../Context/ContextApi'; // Import useCart hook
import { FontAwesome } from '@expo/vector-icons';
import Colors from '../../utils/Colors';
import { useNavigation } from '@react-navigation/native';

const CartScreen = ({ route }) => {
  const { cartItems, removeFromCart, customerName, shopID, shopName,custAddress , pincode , setPincode , state,setState,city,setCity } = useCart(); // Access customerName and shopName from useCart hook
  const [totalPrice, setTotalPrice] = useState(0);
  const [itemCount, setItemCount] = useState(0);
  const navigation = useNavigation();

  function calculateTotalPrice(items) {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  function calculateItemCount(items) {
    return items.reduce((total, item) => total + item.quantity, 0);
  }

  useEffect(() => {
    setTotalPrice(calculateTotalPrice(cartItems));
    setItemCount(calculateItemCount(cartItems));
  }, [cartItems]);

  const handleIncreaseQuantity = (item) => {
    item.quantity++;
    setTotalPrice(calculateTotalPrice(cartItems));
    setItemCount(calculateItemCount(cartItems));
  };

  const handleDecreaseQuantity = (item) => {
    if (item.quantity > 1) {
      item.quantity--;
      setTotalPrice(calculateTotalPrice(cartItems));
      setItemCount(calculateItemCount(cartItems));
    }
  };

  const handleDeleteItem = (itemId, itemPrice, itemQuantity) => {
    removeFromCart(itemId);
    const itemTotalPrice = itemPrice * itemQuantity;
    setTotalPrice(totalPrice - itemTotalPrice);
    setItemCount(itemCount - itemQuantity);
  };

  const handleContinueShopping = () => {
    navigation.goBack();
  };

  const changeAddress = (address) => {
    navigation.navigate("ChangeAddress", { custAddress},{pincode},{state},{city});
  };
  
  const handleCheckout = () => {
    navigation.navigate("Checkout")
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Image source={require('../../../assets/logo.png')} style={styles.storeImage} />
        <View style={styles.headerText}>
          <Text style={styles.welcomeText}>Welcome: {customerName}</Text>
          <Text style={styles.shoppingAt}>Shopping at: {shopName}</Text>
          
          <TouchableOpacity onPress={changeAddress}>
            <Text style={styles.shoppingAt}>Change Address</Text>
          </TouchableOpacity>
          <Text style={styles.shoppingAt}>Shop ID: {shopID}</Text>
        </View>
      </View>
      <View style={styles.line} />
      <Text style={styles.cartTitle}>My Shopping Cart</Text>
      <Text style={styles.cartSubTitle}>Items: {itemCount}</Text>
      
      <View style={styles.line} />
      <FlatList
        data={cartItems}
        keyExtractor={(item, index) => `${item.id}_${index}`}
        renderItem={({ item }) => (
          <View style={styles.productContainer}>
            <View style={styles.productBackground}>
              <Image source={item.image} style={styles.productImage} />
              <View style={styles.productDetails}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.info}>₹{item.price} × {item.quantity} = ₹{item.price * item.quantity}</Text>
                <View style={styles.quantityContainer}>
                  <TouchableOpacity style={styles.quantityButton} onPress={() => handleDecreaseQuantity(item)}>
                    <Text style={styles.quantityButtonText}>-</Text>
                  </TouchableOpacity>
                  <Text>{item.quantity}</Text>
                  <TouchableOpacity style={styles.quantityButton} onPress={() => handleIncreaseQuantity(item)}>
                    <Text style={styles.quantityButtonText}>+</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleDeleteItem(item.id, item.price, item.quantity)}>
                    <FontAwesome name="trash-o" size={24} color="red" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        )}
        ListFooterComponent={
          <View style={styles.totalPriceContainer}>
            <Text style={[styles.totalPriceText, styles.bold]}>Total Price: ₹{totalPrice}</Text>
            <Text style={styles.deliveryText}>Deliver to address below</Text>
            <Text style={styles.addressText}>{custAddress}</Text>
            <Text style={styles.addressText}>Pincode: {pincode}</Text>
            <Text style={styles.addressText}> {city} ,{state}</Text>
             
            <TouchableOpacity onPress={() => changeAddress(custAddress)}>
              <Text style={styles.shoppingAt}>Change Address</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleContinueShopping}>
              <Text style={styles.buttonText}>Continue Shopping</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleCheckout}>
              <Text style={styles.buttonText}>Proceed to Pay</Text>
            </TouchableOpacity>
          </View>
        }
      />
    </View>
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
    marginBottom: 5
  },
  cartTitle: {
    fontSize: 21,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: "center"
  },
  cartSubTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: "center"
  },
  line: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 10,
  },
  productContainer: {
    marginVertical: 7,
  },
  productBackground: {
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 20,
  },
  productDetails: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  info: {
    fontSize: 14,
    marginBottom: 5,
    color: Colors.LABELcCOLOR,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  quantityButton: {
    borderWidth: 1,
    borderColor: 'black',
    paddingVertical: 7,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginHorizontal: 10,
    backgroundColor: Colors.BUTTONCOLOR
  },
  quantityButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  deleteIcon: {
    marginLeft: 'auto',
  },
  totalPriceContainer: {
    borderTopWidth: 1,
    borderColor: '#ccc',
    paddingTop: 10,
    marginTop: 10,
    alignItems: 'center',
  },
  button: {
    backgroundColor: Colors.BUTTONCOLOR,
    padding: 13,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    width: '50%',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  totalPriceText: {
    marginBottom: 10,
    fontSize: 18, // Increase font size
  },
  bold: {
    fontWeight: 'bold',
  },
  deliveryText: {
    marginTop: 10,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  addressText: {
    marginBottom: 10,
  },
  changeAddressButton: {
    
    padding: 13,
   
    alignItems: 'center',
    marginTop: 10,
    width: '40%',
  },
  changeAddressButtonText: {
    color: 'black',
    fontWeight: 'bold',
  },
});

export default CartScreen;
