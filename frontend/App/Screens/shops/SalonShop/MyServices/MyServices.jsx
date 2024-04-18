import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

export default function MyServices({ route }) {
    const { phoneNumber } = route.params;

    // State to store the selected services
    const [selectedServices, setSelectedServices] = useState([]);
    const [loading, setLoading] = useState(true); // Initialize loading state

    // Function to fetch the selected sub-services based on the phone number
    const fetchSelectedSubServices = async () => {
        try {
            setLoading(true); // Set loading state to true
            // Fetch data from the server
            const response = await fetch(`http://192.168.29.68:3000/shopkeeper/selectedSubServices/${phoneNumber}`);
            const data = await response.json();
            // Update state with the selected services data
            setSelectedServices(data);
        } catch (error) {
            console.error('Error fetching selected sub-services:', error);
        } finally {
            // Set loading state to false
            setLoading(false);
        }
    };

    // Use useFocusEffect to refresh data when the screen is focused
    useFocusEffect(
        React.useCallback(() => {
            fetchSelectedSubServices(); // Fetch data when the screen is focused
        }, [phoneNumber])
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>My Selected Services</Text>

            {/* Display loading indicator while fetching data */}
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
              <FlatList
              data={selectedServices}
              keyExtractor={(item, index) => `${item.id}-${index}`}
              numColumns={2}
              renderItem={({ item }) => (
                  <View style={styles.card}>
                      <Text style={styles.itemText}> {item.name}</Text>
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
        margin: 5, // Margin between cards
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
