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
  const [cartItems, setCartItems] = useState([]);
  const [customerName, setCustomerName] = useState('');
  const [shopID, setShopID] = useState('');
  const [shopName, setShopName] = useState('');
  const [custAddress , setCustAddress] = useState('');
  const [pincode, setPincode] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [storeName, setStoreName] = useState('');
  const [userType, setUserType] = useState('customer'); // Add userType state
  const [custPhoneNumber, setCustPhoneNumber] = useState('');

  const addToCart = (product) => { // Modify addToCart to accept userType
    // Check if the product is already in the cart
    const existingItem = cartItems.find(item => item.id === product.id);
    if (existingItem) {
      // If the product already exists, increase its quantity
      existingItem.quantity++;
      setCartItems([...cartItems]); // Update the cartItems state
    } else {
      // If the product is not in the cart, add it with quantity 1
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    setCartItems(cartItems.filter(item => item.id !== productId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{ 
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
      userType, // Include userType in the context value
      setUserType, // Include setUserType in the context value
    }}>
      <CustomerContext.Provider value={{ 
        customerName, 
        setCustomerName, 
        shopID, 
        setShopID, 
        shopName, 
        setShopName,
        custAddress , 
        setCustAddress, 
        pincode,
        setPincode, 
        state, 
        setState, 
        city, 
        setCity ,  
        custPhoneNumber, 
        setCustPhoneNumber 
      }}>
        {children}
      </CustomerContext.Provider>
    </CartContext.Provider>
  );
};
