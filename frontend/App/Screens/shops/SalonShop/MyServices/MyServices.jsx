// MyServices.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';

const MyServices = ({ route, navigation }) => {
    const { phoneNumber } = route.params;
    const [mainServices, setMainServices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMainServices = async () => {
            try {
                const response = await fetch(`http://192.168.29.68:3000/shopkeeper/selectedMainServices/${phoneNumber}`);
                const data = await response.json();
                setMainServices(data);
            } catch (error) {
                console.error('Error fetching selected main services:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchMainServices();
    }, [phoneNumber]);

    const handleMainServiceClick = (mainServiceId) => {
        navigation.navigate('SelectedServices', { phoneNumber, mainServiceId });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>My Selected Services: {phoneNumber}</Text>
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : mainServices.length === 0 ? (
                <Text>No selected services found for this phone number: {phoneNumber}</Text>
            ) : (
                <FlatList
                    data={mainServices}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => handleMainServiceClick(item.mainServiceId)}>
                            <View style={styles.item}>
                                <Text>Main Service: {item.mainServiceName}</Text>
                            </View>
                        </TouchableOpacity>
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
