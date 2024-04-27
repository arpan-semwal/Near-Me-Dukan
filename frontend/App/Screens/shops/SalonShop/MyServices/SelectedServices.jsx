// SubServices.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';

const SubServices = ({ route }) => {
    const { phoneNumber, mainServiceId } = route.params;
    const [subServices, setSubServices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
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

        fetchSubServices();
    }, [phoneNumber, mainServiceId]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sub Services for Main Service: {mainServiceId}</Text>
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : subServices.length === 0 ? (
                <Text>No sub services found for this main service</Text>
            ) : (
                <FlatList
                    data={subServices}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.item}>
                            <Text>Sub Service: {item.subServiceName}</Text>
                            <Text>Price: ${item.subServicePrice.toFixed(2)}</Text>
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

export default SubServices;
