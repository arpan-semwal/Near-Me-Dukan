import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, ActivityIndicator , StyleSheet } from 'react-native';
import { useCart, useCustomer } from '../../../../Context/ContextApi'; // Import useCustomer hook

const SubServices = ({ route }) => {
    const { shopPhoneNumber, mainServiceId, userType, firstcustomerName , custPhoneNumber } = route.params;
    const { addToCart, setCustPhoneNumber } = useCart(); // Access addToCart function and setCustPhoneNumber from CartProvider
    const [subServices, setSubServices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchSubServices();
        // Set custPhoneNumber globally
        setCustPhoneNumber(custPhoneNumber);
    }, [shopPhoneNumber, mainServiceId]);

    const fetchSubServices = async () => {
        try {
            const response = await fetch(`http://172.16.16.41:3000/shopkeeper/selectedSubServices/${shopPhoneNumber}/${mainServiceId}`);
            const data = await response.json();
            setSubServices(data);
        } catch (error) {
            console.error('Error fetching selected sub services:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
           <Text style={styles.welcomeText}>Welcome :{custPhoneNumber}  </Text>
           <Text style={styles.welcomeText}>Shop Phone number :{shopPhoneNumber}  </Text>
            {/* Your existing code */}

            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : subServices.length === 0 ? (
                <Text>No sub services found for this main service</Text>
            ) : (
                <FlatList
                    contentContainerStyle={styles.cardContainer}
                    data={subServices}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.card}>
                            {/* Your existing card content */}
                            {/* Display sub service name and fetched price */}
                            <View style={styles.detailsContainer}>
                                <Text style={styles.subServiceName}>Sub Service: {item.subServiceName}</Text>
                                <Text style={styles.subServicePrice}>Price: ₹{item.subServicePrice.toFixed(2)}</Text>
                                {/* Conditionally render Add to Cart button based on userType */}
                                {userType === 'customer' && (
                                    <TouchableOpacity onPress={() => addToCart(item, custPhoneNumber, firstcustomerName , shopPhoneNumber)} style={styles.addToCartButton}>
                                        <Text style={styles.addToCartButtonText}>Add to Cart</Text>
                                    </TouchableOpacity>
                                )}
                            </View>
                        </View>
                    )}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor:"white",
        flex: 1,
        padding: 20,
        marginBottom: 20,
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    line: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
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
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    cardContainer: {
        alignItems: 'center',
    },
    card: {
        alignItems: 'center',
        padding: 20,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        width: 314,
        height: 173,
        backgroundColor: '#44C7F4',
    },
    cardContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    serviceImage: {
        width: 100,
        height: 100,
        borderRadius: 30,
        marginRight: 10,
    },
    detailsContainer: {
        flex: 1,
    },
    subServiceName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 10,
    },
    subServicePrice: {
        fontSize: 14,
        color: '#000',
    },
    addToCartButton: {
        backgroundColor: 'green',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 5,
        marginTop: 10,
    },
    addToCartButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default SubServices;
