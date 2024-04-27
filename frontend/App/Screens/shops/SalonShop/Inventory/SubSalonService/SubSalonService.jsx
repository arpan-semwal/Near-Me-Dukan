import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, FlatList, ActivityIndicator, StyleSheet, TouchableOpacity, Button,Image } from 'react-native';

export default function SubSalonService({ route, navigation }) {
    const { mainServiceId } = route.params;
    const { phoneNumber , shopkeeperName } = route.params;

    // State to store the fetched sub-services, selected services, and search query
    const [subServices, setSubServices] = useState([]);
    const [selectedServices, setSelectedServices] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);

    // Fetch sub-services based on the main service ID
    useEffect(() => {
        const fetchSubServices = async () => {
            try {
                const response = await fetch(`http://192.168.29.68:3000/subservices/mainservice/${mainServiceId}`);
                const data = await response.json();
                setSubServices(data);
            } catch (error) {
                console.error('Error fetching sub-services:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchSubServices();
    }, [mainServiceId]);

    // Function to handle button click for selecting services
    const handleServiceSelect = (serviceId) => {
        setSelectedServices((prevSelectedServices) => {
            if (prevSelectedServices.includes(serviceId)) {
                // Remove the service from the array if it's already selected
                return prevSelectedServices.filter((id) => id !== serviceId);
            } else {
                // Add the service to the array if it's not selected
                return [...prevSelectedServices, serviceId];
            }
        });
    };

    // Function to handle navigation to MyServices screen and save selected services
    const goToMyServices = async () => {
        try {
            await fetch('http://192.168.29.68:3000/saveSelectedServices', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    phoneNumber: phoneNumber,
                    selectedServices: selectedServices.map(serviceId => ({ mainServiceId, subServiceId: serviceId }))
                }),
            });
    
            setSelectedServices([]);
            navigation.navigate('MyServices', { phoneNumber: phoneNumber });
        } catch (error) {
            console.error('Error navigating to MyServices:', error);
        }
    };
    
    // Filter sub-services based on search query
    const filteredSubServices = subServices.filter((service) =>
        service.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
            <Image source={require('../../../../../../assets/logo.png')} style={styles.storeImage} />
                <View style={styles.headerText}>
                    <Text style={styles.welcomeText}>Welcome :{shopkeeperName}  </Text>
                    <Text style={styles.shoppingAt}>Shop ID: {phoneNumber}</Text>
                    <Text style={styles.shoppingAt}>Subscription Valid till 10 October 2024</Text>
                </View>
            </View>

            {/* Search bar */}
            <TextInput
                style={styles.searchBar}
                placeholder="Search sub-services..."
                value={searchQuery}
                onChangeText={setSearchQuery}
            />

            {/* Display loading indicator while fetching data */}
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <FlatList
                    data={filteredSubServices}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.card}>
                            <Text style={styles.itemText}>{item.name}</Text>
                            <Text style={styles.description}>{item.description}</Text>
                            <Text style={styles.price}>Price: ${item.price.toFixed(2)}</Text>

                            {/* Button to select the service */}
                            <TouchableOpacity
                                style={[
                                    styles.button,
                                    selectedServices.includes(item.id) && styles.buttonSelected
                                ]}
                                onPress={() => handleServiceSelect(item.id)}
                            >
                                <Text style={styles.buttonText}>
                                    {selectedServices.includes(item.id) ? 'Selected' : 'Select'}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    )}
                />
            )}

            {/* Button to navigate to MyServices screen */}
            <Button title="Go to MyServices" onPress={goToMyServices} />

            {/* Display selected services */}
             
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
    searchBar: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
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
    button: {
        marginTop: 10,
        paddingVertical: 10,
        paddingHorizontal: 15,
        backgroundColor: '#ccc',
        borderRadius: 5,
    },
    buttonSelected: {
        backgroundColor: '#007BFF',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    selectedServicesContainer: {
        marginTop: 20,
    },
    selectedServicesTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
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
});
