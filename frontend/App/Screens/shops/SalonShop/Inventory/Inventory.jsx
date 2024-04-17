import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';

export default function Inventory({ route }) {
    const { selectedSubCategoryId } = route.params;

    // State to store the fetched services
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch services based on the selected subcategory ID
    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await fetch(`http://192.168.29.68:3000/services/subcategory/${selectedSubCategoryId}`);
                const data = await response.json();

                // Update the state with the fetched services
                setServices(data);
            } catch (error) {
                console.error('Error fetching services:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchServices();
    }, [selectedSubCategoryId]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Inventory</Text>
            
            {/* Display loading indicator while fetching data */}
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <FlatList
                    data={services}
                    keyExtractor={(item) => item.id.toString()}  // Assume 'id' is a unique identifier in your data
                    renderItem={({ item }) => (
                        <View style={styles.item}>
                            <Text style={styles.itemText}>{item.name}</Text>
                            <Text style={styles.itemText}>{item.description}</Text>
                            <Text style={styles.itemText}>Price: ₹{item.price}</Text>
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
    item: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    itemText: {
        fontSize: 16,
    },
});
