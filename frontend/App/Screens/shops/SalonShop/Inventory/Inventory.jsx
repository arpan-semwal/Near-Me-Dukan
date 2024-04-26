import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator , StyleSheet , TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Inventory = ({ route }) => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const { selectedSubCategory } = route.params;
    const navigation = useNavigation();

    useEffect(() => {
        fetchMainServices();
    }, []);

    const fetchMainServices = async () => {
        try {
            const response = await fetch(`http://192.168.29.68:3000/mainServices/${selectedSubCategory}`);
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
            onPress={() => navigation.navigate('SubSalonService', { mainServiceId: item.id })}
        >
            <Text style={styles.serviceName}>{item.name}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Inventory</Text>
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <FlatList
                    data={services}
                    renderItem={renderService}
                    keyExtractor={(item) => item.id.toString()}
                />
            )}
        </View>
    );
};

export default Inventory;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    serviceContainer: {
        padding: 10,
        marginVertical: 5,
        backgroundColor: '#eaeaea',
        borderRadius: 5,
        width: 300,
    },
    serviceName: {
        fontSize: 16,
    },
});