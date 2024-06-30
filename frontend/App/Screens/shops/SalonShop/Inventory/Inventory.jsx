import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, TouchableOpacity, Image, useWindowDimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Inventory = ({ route }) => {
    const { phoneNumber, shopkeeperName, shopkeeperPhoneNumber, selectedSubCategory } = route.params;
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();
    const screenWidth = useWindowDimensions().width;
    const numColumns = screenWidth >= 600 ? 3 : 2; // Adjust based on screen width

    useEffect(() => {
        const fetchMainServices = async () => {
            try {
                const response = await fetch(`http://192.168.29.67:3000/mainServices/${selectedSubCategory}`);
                if (response.ok) {
                    const data = await response.json();
                    setServices(data);
                } else {
                    console.error('Failed to fetch main services:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching main services:', error);
            } finally {
                setLoading(false); 
            }
        };

        fetchMainServices();

        // Clean up function (optional) for async operations
        return () => {
            // Clean-up logic if needed
        };
    }, [selectedSubCategory]);

    const renderService = ({ item }) => (
        <TouchableOpacity
            style={styles.serviceContainer}
            onPress={() => navigation.navigate('SubSalonService',
            {
                mainServiceId: item.id,
                phoneNumber,
                shopkeeperName
            })}
        >
            <View style={styles.card}>
                <Text style={styles.serviceName}>{item.name}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Image source={require('../../../../../assets/logo.png')} style={styles.storeImage} />
                <View style={styles.headerText}>
                    <Text style={styles.welcomeText}>Welcome: {shopkeeperName}</Text>
                    <Text style={styles.shoppingAt}>Shop ID: {shopkeeperPhoneNumber}</Text>
                    <Text style={styles.shoppingAt}>Subscription Valid till 10 October 2024</Text>
                </View>
            </View>
            <Text style={styles.title}>Inventory</Text>
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <FlatList
                    data={services}
                    renderItem={renderService}
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={styles.listContainer}
                    numColumns={numColumns} // Display dynamic number of columns
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#f0f4f7',
        padding: 20,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
    },
    listContainer: {
        paddingHorizontal: 5,
        paddingTop: 10,
        paddingBottom: 20,
    },
    serviceContainer: {
        width: '50%', // Ensure two items per row initially
        paddingHorizontal: 5,
        marginBottom: 10,
    },
    card: {
        backgroundColor: '#4A90E2',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        height: 120, // Fixed height for uniform card size
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
    serviceName: {
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center', // Center text within the card
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
        color: '#333',
    },
    shoppingAt: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#555',
    },
});

export default Inventory;
