import React, { createContext, useContext, useState } from 'react';

// Create CartContext
const CartContext = createContext();
 
// Create CustomerContext
export const CustomerContext = createContext();

// Define custom hooks for using contexts
export const useCart = () => useContext(CartContext);
export const useCustomer = () => useContext(CustomerContext);

// Create CartProvider component
export const CartProvider = ({ children }) => {
  // State values
  const [cartItems, setCartItems] = useState([]);
  const [customerName, setCustomerName] = useState('');
  const [shopID, setShopID] = useState('');
  const [shopName, setShopName] = useState('');
  const [custAddress, setCustAddress] = useState('');
  const [pincode, setPincode] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [storeName, setStoreName] = useState('');
  const [userType, setUserType] = useState('customer');
  const [custPhoneNumber, setCustPhoneNumber] = useState('');
  const [shopkeeperPhoneNumber, setShopkeeperPhoneNumber] = useState('');
  const [name, setName] = useState('');
  const [firstCustomerName, setFirstCustomerName] = useState(''); 
  const [phoneNumber, setPhoneNumber] = useState(''); 
  const [shopPhoneNumber, setShopPhoneNumber] = useState('');

  // Function to add item to cart
  const addToCart = (service) => {
    const existingItemIndex = cartItems.findIndex(item => item.id === service.id);

    if (existingItemIndex !== -1) {
      const updatedCartItems = [...cartItems];
      updatedCartItems[existingItemIndex].quantity++;
      setCartItems(updatedCartItems);
    } else {
      setCartItems(prevItems => [
        ...prevItems,
        {
          id: service.id,
          name: service.subServiceName,
          price: service.subServicePrice,
          quantity: 1,
          phoneNumber: custPhoneNumber,
          firstcustomerName: firstCustomerName,
        },
      ]);
    }
  };

  // Function to remove item from cart
  const removeFromCart = productId => {
    setCartItems(cartItems.filter(item => item.id !== productId));
  };

  // Function to clear cart
  const clearCart = () => {
    setCartItems([]);
  };
  
  const setGlobalPhoneNumber = (number) => {
    setPhoneNumber(number);
  };

  // Return the provider with context values
  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        customerName,
        setCustomerName,
        shopID,
        setShopID,
        shopName,
        setShopName,
        custAddress,
        setCustAddress,
        pincode,
        setPincode,
        state,
        setState,
        city,
        setCity,
        storeName,
        setStoreName,
        userType,
        setUserType,
        shopkeeperPhoneNumber, 
        name,
        setName,
        firstCustomerName, 
        setFirstCustomerName, 
        phoneNumber, 
        setPhoneNumber, 
        shopPhoneNumber,
        setShopPhoneNumber,
        custPhoneNumber, // Make custPhoneNumber accessible globally
        setCustPhoneNumber, // Provide setter for custPhoneNumber
        setGlobalPhoneNumber, 
      }}>
      <CustomerContext.Provider
        value={{
          customerName,
          setCustomerName,
          shopID,
          setShopID,
          shopName,
          setShopName,
          custAddress,
          setCustAddress,
          pincode,
          setPincode,
          state,
          setState,
          city,
          setCity,
          custPhoneNumber,
          setCustPhoneNumber,
          firstCustomerName,
          setFirstCustomerName,
          phoneNumber,
          setPhoneNumber,
          shopPhoneNumber,
          setShopPhoneNumber
        }}>
        {children}
      </CustomerContext.Provider>
    </CartContext.Provider>
  );
};
