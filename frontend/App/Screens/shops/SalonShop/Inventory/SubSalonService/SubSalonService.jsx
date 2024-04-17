import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';

export default function SubSalonService({ route }) {
    const { mainServiceId } = route.params;

    // State to store the fetched sub-services and selected services
    const [subServices, setSubServices] = useState([]);
    const [selectedServices, setSelectedServices] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch sub-services based on the main service ID
    useEffect(() => {
        const fetchSubServices = async () => {
            try {
                const response = await fetch(`http://192.168.29.68:3000/subservices/mainservice/${mainServiceId}`);
                const data = await response.json();
                setSubServices(data);
            } catch (error) {
                console.error('Error fetching sub-services:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchSubServices();
    }, [mainServiceId]);

    // Function to handle button click for selecting services
    const handleServiceSelect = (serviceId) => {
        setSelectedServices((prevSelectedServices) => {
            if (prevSelectedServices.includes(serviceId)) {
                // If the service is already selected, remove it from the array
                return prevSelectedServices.filter((id) => id !== serviceId);
            } else {
                // If the service is not selected, add it to the array
                return [...prevSelectedServices, serviceId];
            }
        });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sub-Services</Text>
            
            {/* Display loading indicator while fetching data */}
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <FlatList
                    data={subServices}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.card}>
                            <Text style={styles.itemText}>{item.name}</Text>
                            <Text style={styles.description}>{item.description}</Text>
                            <Text style={styles.price}>Price: ${item.price.toFixed(2)}</Text>

                            {/* Button to select the service */}
                            <TouchableOpacity
                                style={[
                                    styles.button,
                                    selectedServices.includes(item.id) && styles.buttonSelected
                                ]}
                                onPress={() => handleServiceSelect(item.id)}
                            >
                                <Text style={styles.buttonText}>
                                    {selectedServices.includes(item.id) ? 'Selected' : 'Select'}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    )}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    card: {
        padding: 15,
        margin: 5,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    itemText: {
        fontSize: 16,
    },
    description: {
        marginTop: 10,
    },
    price: {
        marginTop: 10,
        color: 'green',
        fontWeight: 'bold',
    },
    button: {
        marginTop: 10,
        paddingVertical: 10,
        paddingHorizontal: 15,
        backgroundColor: '#ccc',
        borderRadius: 5,
    },
    buttonSelected: {
        backgroundColor: '#007BFF',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});
