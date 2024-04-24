import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

export default function MyServices({ route }) {
    const { phoneNumber , userType } = route.params;

    const [selectedServices, setSelectedServices] = useState([]);
    const [loading, setLoading] = useState(true);
    console.log('User Type:', userType);

    const navigation = useNavigation();

    const fetchSelectedSubServices = async () => {
        try {
            setLoading(true);
            const response = await fetch(`http://192.168.29.68:3000/shopkeeper/selectedSubServices/${phoneNumber}`);
            const data = await response.json();
            setSelectedServices(data);
        } catch (error) {
            console.error('Error fetching selected sub-services:', error);
        } finally {
            setLoading(false);
        }
    };

    useFocusEffect(
        React.useCallback(() => {
            fetchSelectedSubServices();
        }, [phoneNumber])
    );

    const groupByMainService = () => {
        const groupedServices = {};

        selectedServices.forEach((service) => {
            if (!groupedServices[service.mainServiceName]) {
                groupedServices[service.mainServiceName] = [];
            }
            groupedServices[service.mainServiceName].push(service);
        });

        return groupedServices;
    };

    const handleMainServiceClick = (mainServiceName, subServices) => {
        navigation.navigate('SelectedServices', { mainServiceName, subServices , userType:userType });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>My Selected Services</Text>

            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <FlatList
                    data={Object.entries(groupByMainService())}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={styles.card}
                            onPress={() => handleMainServiceClick(item[0], item[1])}>
                            <Text style={styles.mainServiceName}>{item[0]}</Text>
                        </TouchableOpacity>
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
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    mainServiceName: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});
