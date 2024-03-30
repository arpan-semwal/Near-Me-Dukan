import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { discountCodesData } from './dummydata';

export default function ShopkeeperDiscountCode() {
    const [selectedButton, setSelectedButton] = useState('Codes');

    const buttonsData = [
        { id: 1, title: 'Codes' },
        { id: 2, title: 'Active' },
        { id: 3, title: 'Inactive' },
    ];

    const renderDiscountCodes = () => {
        switch (selectedButton) {
            case 'Codes':
                return discountCodesData;
            case 'Active':
                return discountCodesData.filter(code => code.active);
            case 'Inactive':
                return discountCodesData.filter(code => !code.active);
            default:
                return [];
        }
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={[styles.button, selectedButton === item.title && styles.selectedButton]}
            onPress={() => setSelectedButton(item.title)}>
            <Text style={[styles.buttonText, selectedButton === item.title && styles.selectedButtonText]}>
                {item.title}
            </Text>
        </TouchableOpacity>
    );

	const renderDiscountCodeItem = ({ item }) => (
		<View style={styles.productContainer}>
			<Text style={styles.title}>Code: {item.code}</Text>
			<Text style={[styles.info, styles.description]}>
				 <Text style={styles.lightGrey}>{item.description}</Text>
			</Text>
			<Text style={styles.info}>Status: {item.active ? 'Active' : 'Inactive'}</Text>
			
			{/* New buttons */}
			<View style={styles.buttonRow}>
				<TouchableOpacity style={styles.actionButton}>
					<Text style={styles.actionButtonText}>Change Validity</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.actionButton}>
					<Text style={styles.actionButtonText}>Make Inactive</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
	

    return (
        <FlatList
            style={styles.container}
            data={[{ key: 'content' }]} // Dummy data for the FlatList
            renderItem={() => (
                <View style={styles.container}>
                    {/* Header */}
                    <View style={styles.headerContainer}>
                        <Image source={require('../../../../assets/logo.png')} style={styles.storeImage} />
                        <View style={styles.headerText}>
                            <Text style={styles.welcomeText}>Welcome: </Text>
                            <Text style={styles.shoppingAt}>Shop ID: </Text>
                            <Text style={styles.shoppingAt}>Subscription Valid till 10 October 2024</Text>
                        </View>
                    </View>

                    {/* First Image (Full Width) */}
                    <Image source={require('../../../../assets/general.png')} style={styles.fullWidthImage} />

                    {/* Second Image (Circular with Overlay) */}
                    <View style={[styles.circularImageContainer, { marginBottom: 20 }]}>
                        <Image source={require('../../../../assets/name.png')} style={styles.circularImage} />
                    </View>

                    {/* Buttons */}
                    <FlatList
                        data={buttonsData}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id.toString()}
                        numColumns={3}
                        contentContainerStyle={styles.buttonContainer}
                    />

                    {/* Render Discount Codes */}
                    <FlatList
                        data={renderDiscountCodes()}
                        renderItem={renderDiscountCodeItem}
                        keyExtractor={(item) => item.id.toString()}
                    />
                </View>
            )}
        />
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 10,
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
        paddingHorizontal: 10,
    },
	info: {
        fontSize: 17,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    description: {
        color: '#A9A9A9', // Light grey color
    },
    lightGrey: {
        color: '#A9A9A9', // Light grey color
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
    fullWidthImage: {
        width: '100%',
        height: 150,
        marginBottom: 20,
    },
	circularImageContainer: {
		alignItems: 'center',
		paddingBottom: 20,  
	},
	
    circularImage: {
        width: 100,
        height: 100,
        borderRadius: 60,
        borderWidth: 3,
        borderColor: 'white',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: [{ translateX: -60 }, { translateY: -60 }],
		
    },
    buttonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 20,
		
		
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#C7BC00',
        margin: 5,
        width: '30%',
        height: 25,
        borderRadius: 50,
    },
    buttonText: {
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold',
    },
    selectedButton: {
        backgroundColor: '#333',
    },
    selectedButtonText: {
        color: '#fff',
    },
    productContainer: {
        marginVertical: 7,
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#FFFFFF',
        elevation: 3,
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    info: {
        fontSize: 17,
        fontWeight: 'bold',
        marginBottom: 5,
    },
	buttonRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: 10,
	},
	actionButton: {
		backgroundColor: '#C7BC00',
		borderRadius: 5,
		paddingVertical: 8,
		paddingHorizontal: 15,
	},
	actionButtonText: {
		color: '#fff',
		fontWeight: 'bold',
		fontSize: 16,
	},
});
