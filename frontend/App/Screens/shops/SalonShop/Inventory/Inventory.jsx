import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Inventory({ route }) {
    const { selectedSubCategoryId } = route.params;

    // State to store the fetched services
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();

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

    // Group services into rows of 3
    const groupedServices = [];
    for (let i = 0; i < services.length; i += 3) {
        groupedServices.push(services.slice(i, i + 3));
    }

    // Render each row of services
    const renderRow = ({ item }) => (
        <View style={styles.row}>
            {item.map((service, index) => (
                <TouchableOpacity
                    key={index}
                    style={styles.card}
                    onPress={() => navigation.navigate('SubSalonService', { mainServiceId: service.id })}
                >
                    <Text style={styles.itemText}>{service.name}</Text>
                </TouchableOpacity>
            ))}
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Inventory</Text>

            {/* Display loading indicator while fetching data */}
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <FlatList
                    data={groupedServices}
                    renderItem={renderRow}
                    keyExtractor={(item, index) => index.toString()}
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
        textAlign:"center"
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    card: {
        flex: 1,
        padding: 15,
        marginHorizontal: 5,
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
        alignItems: 'center',
    },
    itemText: {
        fontSize: 16,
        textAlign: 'center',
    },
});
