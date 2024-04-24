// SubServices.js

import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';

export default function SubServices({ route }) {
    const { phoneNumber, selectedService } = route.params;

    // State to store the selected sub-services from the inventory
    const [selectedSubServices, setSelectedSubServices] = useState([]);
    const [loading, setLoading] = useState(true); // Initialize loading state

    // Function to fetch selected sub-services from the inventory
	useEffect(() => {
		const fetchSelectedSubServices = async () => {
			try {
				setLoading(true);
				const response = await fetch(`http://192.168.29.68:3000/shopkeeper/selectedSubServices/${phoneNumber}/${selectedService.id}`);
				if (!response.ok) {
					throw new Error('Network response was not ok');
				}
				const data = await response.json();
				setSelectedSubServices(data);
			} catch (error) {
				console.error('Error fetching selected sub-services:', error);
			} finally {
				setLoading(false);
			}
		};
	
		fetchSelectedSubServices();
	}, [phoneNumber, selectedService]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sub-Services for {selectedService.name}</Text>

            {/* Display loading indicator while fetching data */}
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <FlatList
                    data={selectedSubServices}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.card}>
                            <Text style={styles.itemText}>{item.name}</Text>
                            <Text style={styles.itemText}>Price: ${item.price}</Text>
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
        flex: 1,
        marginVertical: 5,
        padding: 15,
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
        marginVertical: 5,
    },
});
