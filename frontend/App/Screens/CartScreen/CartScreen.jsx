import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, Platform, DatePickerIOS, TimePickerAndroid } from 'react-native';

import { useCart, useCustomer } from '../../Context/ContextApi';
import { FontAwesome } from '@expo/vector-icons';
import Colors from '../../utils/Colors';
import { useNavigation } from '@react-navigation/native';
import AppointmentPicker from '../../Components/Appointment/Appointment';

const CartScreen = ({ route }) => {
    const { cartItems, removeFromCart, phoneNumber } = useCart();
    const { custPhoneNumber } = useCustomer(); // Access custPhoneNumber from CustomerContext
    const { shopPhoneNumber } = cartItems[0] || {}; // Extract phoneNumber from the first item in cartItems
    

    const { customerName, shopName } = useCustomer();
    const [totalPrice, setTotalPrice] = useState(0);
    const [itemCount, setItemCount] = useState(0);
    const [shopkeeperDetails, setShopkeeperDetails] = useState(null); // State to store shopkeeper details
    const [customerDetails, setCustomerDetails] = useState(null); // State to store shopkeeper details

    const [storeName, setStoreName] = useState();
    const [shopkeeperName, setShopkeeperName] = useState();
    const [custName, setCustName] = useState();
    const [shopname, setShopName] = useState();
    const [selectedCategory, setSelectedCategory] = useState('');
    const [appointmentDateTime, setAppointmentDateTime] = useState(null);
    const [showAppointmentForm, setShowAppointmentForm] = useState(false);
    const [appointmentDate, setAppointmentDate] = useState(new Date());
    const [appointmentTime, setAppointmentTime] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const navigation = useNavigation();
    

    useEffect(() => {
        setTotalPrice(calculateTotalPrice(cartItems));
        setItemCount(calculateItemCount(cartItems));

        // Fetch shopkeeper details when component mounts
        if (phoneNumber) {
            fetchShopkeeperDetails(phoneNumber);
        }
        if (custPhoneNumber) {
            fetchCustomerDetails(custPhoneNumber);
        }
    }, [cartItems, phoneNumber, custPhoneNumber]);

    useEffect(() => {
        // Clear cart items when the phone number changes
        removeFromCart();
    }, [custPhoneNumber]);

    const calculateTotalPrice = (items) => {
        return items.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    const calculateItemCount = (items) => {
        return items.reduce((total, item) => total + item.quantity, 0);
    };

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

    const handleCheckout = () => {
        navigation.navigate("Checkout", { cartItems, totalPrice, phoneNumber: phoneNumber, shopID: shopname, custName: custName, custPhoneNumber: custPhoneNumber, shopkeeperName: shopkeeperName ,  selectedDate:selectedDate, selectedTime:selectedTime });
    };

    const fetchShopkeeperDetails = async (phoneNumber) => {
        try {
            const response = await fetch(`http://172.16.16.145:3000/shopkeeperDetails/${phoneNumber}`);
            const data = await response.json();

            // Set shopkeeper details state
            setShopkeeperDetails(data);
            setShopName(data.shopID);
            setShopkeeperName(data.shopkeeperName);

            // Check if the shop is a salon
            if (data.selectedCategory === 'Salon Shop') {
                // If it's a salon shop, you can handle appointment scheduling logic here
                // For example, display a button to make an appointment
                console.log('This is a salon shop');
                // You can also get the subcategory if needed
                console.log('Subcategory:', data.selectedSubCategory);
            } else {
                console.log('This is not a salon shop');
            }
        } catch (error) {
            console.error('Error fetching shopkeeper details:', error);
        }
    };

    const fetchCustomerDetails = async (phoneNumber) => {
        try {
            const response = await fetch(`http://172.16.16.145:3000/customerDetails/${custPhoneNumber}`);
            const data = await response.json();
            // Set shopkeeper details state
            setCustomerDetails(data);
            setCustName(data.name);

        } catch (error) {
            console.error('Error fetching shopkeeper details:', error);
        }
    };

    const handleMakeAppointment = () => {
        setShowAppointmentForm(true);
    };

    const handleAppointmentDateChange = (date) => {
        setAppointmentDate(date);
    };

    const handleAppointmentTimeChange = (time) => {
        setAppointmentTime(time);
    };

    const handleScheduleAppointment = () => {
        // Combine date and time into a single datetime string
        const dateTime = `${appointmentDate.toDateString()}, ${appointmentTime}`;
        setAppointmentDateTime(dateTime);
        // Now you can send this appointment datetime to your backend to schedule an appointment
        // Remember to include customerId, shopId, etc. in your appointment request payload
        console.log('Appointment scheduled:', dateTime);
        // You can reset the form and hide it after successful scheduling
        setShowAppointmentForm(false);
        setAppointmentDate(new Date());
        setAppointmentTime('');
    };
    
    const handleAppointmentDateSelect = (date) => {
        setSelectedDate(date);
    };
    
    const handleAppointmentTimeSelect = (time) => {
        setSelectedTime(time);
    };
    
    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const handleTimeChange = (time) => {
        setSelectedTime(time);
    };
    
    

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Image source={require('../../../assets/logo.png')} style={styles.storeImage} />
                <View style={styles.headerText}>
                    <Text style={styles.welcomeText}>Welcome: {custName}</Text>
                    <Text style={styles.shoppingAt}>Shopping at: {shopname}</Text>
                    <Text style={styles.shoppingAt}>Shop ID: {phoneNumber}</Text>
                    <Text style={styles.shoppingAt}>Shopkeeper Name: {shopkeeperName}</Text>

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
                                <Text style={styles.title}>{item.name}</Text>
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
                        {shopkeeperDetails && selectedCategory === 'Salon' && (
                            <View>
                                <TouchableOpacity style={styles.button} onPress={handleMakeAppointment}>
                                    <Text style={styles.buttonText}>Make Appointment</Text>
                                </TouchableOpacity>
                                {showAppointmentForm && (
                                    <View>
                                        <DatePickerIOS
                                            date={appointmentDate}
                                            onDateChange={handleAppointmentDateChange}
                                            mode="date"
                                        />
                                        <TimePickerAndroid
                                            value={appointmentTime}
                                            onChange={handleAppointmentTimeChange}
                                        />
                                        <TouchableOpacity style={styles.button} onPress={handleScheduleAppointment}>
                                            <Text style={styles.buttonText}>Schedule Appointment</Text>
                                        </TouchableOpacity>
                                    </View>
                                )}
                            </View>
                        )}
                        {shopkeeperDetails && shopkeeperDetails.selectedCategory === 'Salon Shop' && (
                            // Display appointment picker for salon shops
                            <AppointmentPicker
                            onDateSelect={handleAppointmentDateSelect}
                            onTimeSelect={handleAppointmentTimeSelect}
                        />
                        )}
                        <View style={styles.buttonContainer}>
                        <Text style={styles.selectedDateTime}>Selected Date: {selectedDate}</Text>
                            <Text style={styles.selectedDateTime}>Selected Time: {selectedTime}</Text>
                            <TouchableOpacity style={styles.button} onPress={handleContinueShopping}>
                                <Text style={styles.buttonText}>Continue Shopping</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button} onPress={handleCheckout}>
                                <Text style={styles.buttonText}>Proceed to Pay</Text>
                            </TouchableOpacity>
                        </View>

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
        paddingTop: 20,
        marginTop: 20,
        paddingBottom:50,
        alignItems: 'center',
    },
    button: {
        backgroundColor: Colors.BUTTONCOLOR,
        padding: 13,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 10,
        width: '30%',
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
    buttonContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: "center",
        marginTop: 10,
        width: '200%',
    },
    selectedDateTime: {
        marginTop: 10,
        fontWeight: 'bold',
    },
});

export default CartScreen