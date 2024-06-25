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
  const [cartItems, setCartItems] = useState({});
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

  // Function to add item to cart for a specific customer
  const addToCart = (custPhoneNumber, product) => {
    const updatedCartItems = { ...cartItems };

    if (!updatedCartItems[custPhoneNumber]) {
      updatedCartItems[custPhoneNumber] = [];
    }

    const existingItemIndex = updatedCartItems[custPhoneNumber].findIndex(item => item.id === product.id);

    if (existingItemIndex !== -1) {
      updatedCartItems[custPhoneNumber][existingItemIndex].quantity++;
    } else {
      updatedCartItems[custPhoneNumber].push({ ...product, quantity: 1 });
    }

    setCartItems(updatedCartItems);
  };

  // Function to remove item from cart for a specific customer
  const removeFromCart = (custPhoneNumber, productId) => {
    const updatedCartItems = { ...cartItems };
    updatedCartItems[custPhoneNumber] = updatedCartItems[custPhoneNumber].filter(item => item.id !== productId);
    setCartItems(updatedCartItems);
  };

  // Function to clear cart for a specific customer
  const clearCart = (custPhoneNumber) => {
    const updatedCartItems = { ...cartItems };
    updatedCartItems[custPhoneNumber] = [];
    setCartItems(updatedCartItems);
  };

  // Return the provider with context values
  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
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
      }}
    >
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
          setShopPhoneNumber,
        }}
      >
        {children}
      </CustomerContext.Provider>
    </CartContext.Provider>
  );
};
