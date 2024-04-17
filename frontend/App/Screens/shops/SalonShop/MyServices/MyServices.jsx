import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

export default function MyServices({ route }) {
    const { selectedServices } = route.params; // Retrieve the selected services from the navigation parameters

    return (
        <View style={styles.container}>
            <Text style={styles.title}>My Selected Services</Text>

            {/* Display the selected services */}
            <FlatList
                data={selectedServices}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Text style={styles.itemText}>{item.name}</Text>
                        <Text style={styles.description}>{item.description}</Text>
                        <Text style={styles.price}>Price: ${item.price.toFixed(2)}</Text>
                    </View>
                )}
            />
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
});
