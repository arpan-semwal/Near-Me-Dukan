import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useCart } from '../../../../Context/ContextApi'; // Import useCart hook

const SubServices = ({ route }) => {
    const { shopPhoneNumber, mainServiceId, userType, firstcustomerName, custPhoneNumber } = route.params;
    const { addToCart, setCustPhoneNumber } = useCart(); // Access addToCart function and setCustPhoneNumber from CartProvider
    const [subServices, setSubServices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchSubServices();
        // Set custPhoneNumber globally
        setCustPhoneNumber(custPhoneNumber);
    }, [shopPhoneNumber, mainServiceId, setCustPhoneNumber]);

    const fetchSubServices = async () => {
        try {
            const response = await fetch(`http://192.168.29.67:3000/shopkeeper/selectedSubServices/${shopPhoneNumber}/${mainServiceId}`);
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
            <Text style={styles.welcomeText}>Welcome:{firstcustomerName}</Text>
            <Text style={styles.welcomeText}>Shop Phone number: {shopPhoneNumber}</Text>

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
                            {/* Display sub service name and fetched price */}
                            <View style={styles.detailsContainer}>
                                <Text style={styles.subServiceName}>Sub Service: {item.subServiceName}</Text>
                                <Text style={styles.subServicePrice}>Price: ₹{item.subServicePrice.toFixed(2)}</Text>
                                {/* Conditionally render Add to Cart button based on userType */}
                                {userType === 'customer' && (
                                    <TouchableOpacity onPress={() => addToCart(item, custPhoneNumber)} style={styles.addToCartButton}>
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
        flex: 1,
        padding: 20,
        backgroundColor: '#f0f4f7',
    },
    welcomeText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
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
        width: '100%',
        backgroundColor: '#4A90E2',
    },
    detailsContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    subServiceName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 5,
        textAlign: 'center',
    },
    subServicePrice: {
        fontSize: 16,
        color: '#fff',
        textAlign: 'center',
    },
    addToCartButton: {
        backgroundColor: '#45CE30',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
        marginTop: 10,
    },
    addToCartButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default SubServices;
