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
  const [userType, setUserType] = useState('customer');
  const [custPhoneNumber, setCustPhoneNumber] = useState('');

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
                name: service.subServiceName, // Add the name of the service
                price: service.subServicePrice, // Add the price of the service
                quantity: 1 
            }
        ]);
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
      userType,
      setUserType,
      custPhoneNumber, 
      setCustPhoneNumber 
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