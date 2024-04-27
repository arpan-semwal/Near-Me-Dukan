import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const MyServices = ({ route, navigation }) => {
    const { phoneNumber, storeImage, shopkeeperName } = route.params;
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
            <View style={styles.headerContainer}>
            <Image source={require('../../../../../assets/logo.png')} style={styles.storeImage} />
                <View style={styles.headerText}>
                    <Text style={styles.welcomeText}>Welcome : {shopkeeperName}</Text>
                    <Text style={styles.shoppingAt}>Shop ID: {phoneNumber}</Text>
                    <Text style={styles.shoppingAt}>Subscription Valid till 10 October 2024</Text>
                </View>
            </View>

            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : mainServices.length === 0 ? (
                <Text>No selected services found for this phone number: {phoneNumber}</Text>
            ) : (
                <View style={styles.mainServiceContainer}>
                    {mainServices.map((item, index) => (
                        <TouchableOpacity
                            key={index}
                            onPress={() => handleMainServiceClick(item.mainServiceId)}
                            style={styles.item}
                        >
                            <MaterialIcons name="people-alt" size={24} color="black" style={styles.icon} />
                            <Text style={styles.itemText}>{item.mainServiceName}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
        paddingHorizontal: 10,
    },
    storeImage: {
        width: 90,
        height: 90,
        borderRadius: 10,
    },
    headerText: {
        flex: 1,
        marginLeft: 20,
    },
    welcomeText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    shoppingAt: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    mainServiceContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    item: {
        width: '47%', // Adjust for spacing
        height: 156,
        backgroundColor: '#44C7F4',
        padding: 20,
        marginBottom: 20,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        marginBottom: 10,
    },
    itemText: {
        color: 'black',
        fontSize: 16,
        textAlign: 'center',
    },
});

export default MyServices;
