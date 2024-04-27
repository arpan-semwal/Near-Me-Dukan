import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';

const MyServices = ({ route }) => {
    const { phoneNumber } = route.params;
    const [selectedServices, setSelectedServices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSelectedServices = async () => {
            try {
                const response = await fetch(`http://192.168.29.68:3000/shopkeeper/selectedSubServices/${phoneNumber}`);
                const data = await response.json();
                setSelectedServices(data);
            } catch (error) {
                console.error('Error fetching selected services:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchSelectedServices();
    }, [phoneNumber]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>My Selected Services: {phoneNumber}</Text>
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : selectedServices.length === 0 ? (
                <Text>No selected services found for this phone number: {phoneNumber}</Text>
            ) : (
                <FlatList
                    data={selectedServices}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.item}>
                            <Text>Main Service: {item.mainServiceName}</Text>
                            <Text>Sub Service: {item.subServiceName}</Text>
                            {item.subServicePrice ? (
                                <Text>Price: ${item.subServicePrice.toFixed(2)}</Text>
                            ) : (
                                <Text>Price: N/A</Text>
                            )}
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
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    item: {
        padding: 10,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
    },
});

export default MyServices;
