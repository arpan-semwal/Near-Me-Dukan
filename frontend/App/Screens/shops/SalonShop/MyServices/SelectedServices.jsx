import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, ActivityIndicator , StyleSheet } from 'react-native';
import {useCart} from '../../../../Context/ContextApi';


const SubServices = ({ route }) => {
    const { phoneNumber, mainServiceId, userType  , firstcustomerName , enteredPrices  } = route.params;
    const { addToCart } = useCart(); // Access addToCart function from CartProvider
    const [subServices, setSubServices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchSubServices();
    }, [phoneNumber, mainServiceId]);

    const fetchSubServices = async () => {
        try {
            const response = await fetch(`http://192.168.29.68:3000/shopkeeper/selectedSubServices/${phoneNumber}/${mainServiceId}`);
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
            <View style={styles.headerContainer}>
                <Image source={require('../../../../../assets/logo.png')} style={styles.storeImage} />
                <View style={styles.headerText}>
                    <Text style={styles.welcomeText}>Welcome : {firstcustomerName}</Text>
                    <Text style={styles.shoppingAt}>Shop ID: {phoneNumber}</Text>
                   {userType !== 'customer' && (
                    <Text style={styles.shoppingAt}>Subscription Valid till 10 October 2024</Text>
                )}
                </View>
            </View>
            <View style={styles.line}></View>
            
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
                            <View style={styles.cardContent}>
                                <Image source={require('../../../../../assets/logo.png')} style={styles.serviceImage} />
                                <View style={styles.detailsContainer}>
                                    <Text style={styles.subServiceName}>Sub Service: {item.subServiceName}</Text>
                                    <Text style={styles.subServicePrice}>Price: ${item.subServicePrice.toFixed(2)}</Text>
                                    {/* Conditionally render Add to Cart button based on userType */}
                                    {userType === 'customer' && (
                                        <TouchableOpacity onPress={() => addToCart(item, phoneNumber, firstcustomerName)} style={styles.addToCartButton}>
                                            <Text style={styles.addToCartButtonText}>Add to Cart</Text>
                                        </TouchableOpacity>
                                    )}
                                </View>
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
