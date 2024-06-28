import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Inventory = ({ route }) => {
    const { phoneNumber, shopkeeperName, selectedSubCategory } = route.params;
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();
    const [numColumns, setNumColumns] = useState(2); // Initial number of columns

    useEffect(() => {
        fetchMainServices();

        // Clean up function to remove event listener
        return () => {
            Dimensions.removeEventListener('change', handleLayoutChange);
        };
    }, []);

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

    // Calculate item width based on screen dimensions for dynamic number of columns
    const screenWidth = Dimensions.get('window').width;
    const itemWidth = (screenWidth - 30) / numColumns; // Subtracting padding and margin

    // Function to handle layout change, e.g., orientation change
    const handleLayoutChange = () => {
        const orientation = screenWidth > Dimensions.get('window').height ? 'landscape' : 'portrait';
        if (orientation === 'landscape') {
            setNumColumns(3); // Set to 3 columns in landscape mode
        } else {
            setNumColumns(2); // Set to 2 columns in portrait mode
        }
    };

    // Event listener for orientation change
    useEffect(() => {
        Dimensions.addEventListener('change', handleLayoutChange);
        
        // Clean up function to remove event listener
        return () => {
            Dimensions.removeEventListener('change', handleLayoutChange);
        };
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Inventory: {phoneNumber}</Text>
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
});

export default Inventory;
