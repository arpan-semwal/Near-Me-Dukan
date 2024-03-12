import React from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import dummyData from "../../../dummy/dummy"
import Colors from '../../../../utils/Colors';


export default function SearchShops({ route, navigation }) {
    const { pincode , name } = route.params || {};

    // Filter the dummyData array to only include shops with the matching pin code
    const filteredData = dummyData.filter(item => item.pincode === pincode);

    const renderSeparator = () => (
        <View style={styles.separator} />
    );

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <View style={styles.leftContainer}>
                    <Image source={require('../../../../../assets/logo.png')} style={styles.welcomeImage} />
                </View>
                <View style={styles.rightContainer}>
                    <Text style={styles.welcomeText}>Welcome, {name}</Text>
                    <Text style={styles.pincodeText}>Shops at Pincode: {pincode}</Text>
                    <TouchableOpacity>
                        <Text style={styles.changePincodeText}>Change Pincode</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.locationTextContainer}>
                <Text style={styles.locationText}>Shops in Your Location</Text>
            </View>
            <FlatList
                data={filteredData}
                renderItem={({ item }) => (
                    <View>
                        <View style={styles.itemContainer}>
                            <Image source={item.image} style={styles.image} />
                            <View style={styles.detailsContainer}>
                                <Text style={styles.name}>{item.name}</Text>
                                <Text>Shop ID: {item.shopID}</Text>
                                <Text>Location: {item.location}</Text>
                                <Text>Delivery Available: {item.deliveryAvailable ? 'Yes' : 'No'}</Text>
                            </View>
                        </View>
                        {renderSeparator()}
                    </View>
                )}
                keyExtractor={item => item.id.toString()}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
		backgroundColor:Colors.BACKGROUND
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
		 
    },
    leftContainer: {
        marginRight: 40,
		marginLeft:20
    },
    rightContainer: {
        flex: 1,
		
    },
    welcomeImage: {
        width: 100,
        height: 100,
        borderRadius: 10,
    },
    welcomeText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    pincodeText: {
        fontSize: 16,
        marginBottom: 5,
    },
    changePincodeText: {
        color: '#9F9F9F',
        fontSize: 14,
        marginBottom: 20,
    },
    locationTextContainer: {
        alignItems: 'center',
        marginBottom:20,
		borderBottomColor: '#ccc',
		borderBottomWidth: 1,
    },
    locationText: {
        fontSize: 26,
        fontWeight: 'bold',
		
    },
    itemContainer: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    image: {
        width: 100,
        height: 100,
        marginRight: 10,
        borderRadius: 50,
    },
    detailsContainer: {
        flex: 1,
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    separator: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        marginBottom: 10,
    },
});
