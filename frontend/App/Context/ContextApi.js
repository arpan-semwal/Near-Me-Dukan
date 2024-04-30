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
  const [firstCustomerName, setFirstCustomerName] = useState(''); // Include firstCustomerName in state
  const [phoneNumber, setPhoneNumber] = useState(''); // Include phoneNumber in state

  // Function to add item to cart
  const addToCart = (service, phoneNumber, name) => {
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
          phoneNumber: phoneNumber,
          firstcustomerName: firstCustomerName, // Pass the name here
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
        custPhoneNumber,
        setCustPhoneNumber,
        shopkeeperPhoneNumber, // Provide shopkeeper phone number to the context
        name,
        setName,
        firstCustomerName, // Include firstCustomerName in context
        setFirstCustomerName, // Provide setter for firstCustomerName
        phoneNumber, // Include phoneNumber in context
        setPhoneNumber, // Provide setter for phoneNumber
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
        }}>
        {children}
      </CustomerContext.Provider>
    </CartContext.Provider>
  );
};
