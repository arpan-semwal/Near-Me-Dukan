import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { dummyOrders } from '../ShopkeeperOrders/dummyOrders'; // Importing dummyOrders object

export default function ShopkeeperCustomer() {
    const [selectedButton, setSelectedButton] = useState('Today');

    const buttonsData = [
        { id: 1, title: 'Today' },
        { id: 2, title: 'Yesterday' },
        { id: 3, title: 'One Week' },
        { id: 4, title: '30 Days' },
        { id: 5, title: 'All Time' },
        { id: 6, title: 'Select Date Range' },
    ];

    const renderItem = ({ item, index }) => (
        <TouchableOpacity
            style={[styles.button, selectedButton === item.title && styles.selectedButton]}
            onPress={() => setSelectedButton(item.title)}>
            <Text style={[styles.buttonText, selectedButton === item.title && styles.selectedButtonText]}>
                {item.title}
            </Text>
        </TouchableOpacity>
    );

    // Function to render orders based on selected button
    const renderOrders = () => {
        switch (selectedButton) {
            case 'Today':
                return dummyOrders.today;
            case 'Yesterday':
                return dummyOrders.yesterday;
            case 'One Week':
                return dummyOrders.oneWeek;
            case '30 Days':
                return dummyOrders.thirtyDays;
            case 'All Time':
                return dummyOrders.allTime;
            case 'Select Date Range':
                return dummyOrders.selectedRange;
            default:
                return [];
        }
    };

    // Function to handle actions on product
    const handleProductAction = (action) => {
        // Handle the action here
        console.log('Action:', action);
    };

    const renderProductItem = ({ item }) => (
		<View style={styles.productContainer}>
			{/* First Row: Product Image and Details */}
			<View style={styles.productRow}>
				<Image source={item.image} style={styles.productImage} />
				<View style={styles.productDetails}>
					<Text style={styles.title}>{item.name}</Text>
					<Text style={styles.info}>Price: {item.price}</Text>
					<Text style={styles.info}>Weight: {item.weight}</Text>
				</View>
			</View>
			{/* Second Row: Action Buttons */}
			<View style={styles.productButtonsRow}>
				<TouchableOpacity
					style={[styles.productButton, styles.fullFillButton]}
					onPress={() => handleProductAction('Full Fill Order')}
				>
					<Text style={styles.productButtonText}>Full Fill Order</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={[styles.productButton, styles.viewDetailsButton]}
					onPress={() => handleProductAction('View Details')}
				>
					<Text style={styles.productButtonText}>View Details</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={[styles.productButton, styles.cancelButton]}
					onPress={() => handleProductAction('Cancel Order')}
				>
					<Text style={styles.productButtonText}>Cancel Order</Text>
				</TouchableOpacity>
			</View>
		</View>
	);

    return (
        <FlatList
            style={styles.container}
            data={[{ key: 'content' }]} // Dummy data for the FlatList
            renderItem={() => (
                <>
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
                    <View style={styles.circularImageContainer}>
                        <Image source={require('../../../../assets/name.png')} style={styles.circularImage} />
                    </View>

                    {/* My Orders Heading */}
                    <Text style={styles.ordersHeading}>My Orders</Text>

                    {/* Buttons */}
                    <FlatList
                        data={buttonsData}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id.toString()}
                        numColumns={3}
                        contentContainerStyle={styles.buttonContainer}
                    />

                    {/* Render orders based on selected button */}
                    <FlatList
                        data={renderOrders()}
                        renderItem={renderProductItem}
                        keyExtractor={(item) => item.id.toString()}
                    />
                </>
            )}
        />
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
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
    customerName: {
        fontSize: 16,
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
        marginBottom: 20, // Add marginBottom to create space between images and heading
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
        paddingVertical: 10,
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#C7BC00',
        margin: 5,
        width: '30%', // Adjust the width according to your preference
        height: 25,
        borderRadius: 50,
    },
    buttonText: {
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold',
    },
    selectedButton: {
        backgroundColor: '#333', // Change background color when selected
    },
    selectedButtonText: {
        color: '#fff', // Change text color when selected
    },
    ordersHeading: {
        marginTop: 20,
        fontSize: 26,
        fontWeight: 'bold',
        textAlign: 'center', // Center the heading
    },
    orderItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: '#ccc',
        paddingVertical: 10,
        paddingHorizontal: 5,
    },
	productContainer: {
		marginVertical: 7,
		padding: 10,
		borderRadius: 10,
		backgroundColor: '#FFFFFF',
		elevation: 3, // Add elevation for shadow (Android)
		shadowColor: '#000000', // Add shadow color (iOS)
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
	},
	productRow: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	productDetails: {
		flex: 1,
		marginLeft: 10, // Add margin to separate from the image
	},
	productButtonsRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: 10,
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
    productButtons: {
        flexDirection: 'column', // Arrange buttons in a column
        alignItems: 'flex-end', // Align buttons to the end of the container
    },
	productImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginRight: 10,
    },
    productButton: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        paddingVertical: 5,
        marginVertical: 5,
        minWidth: 100, // Set minimum width for buttons
        maxWidth: '100%', // Set maximum width to ensure buttons don't overflow
    },
    productButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    fullFillButton: {
        backgroundColor: '#28a745',
    },
    viewDetailsButton: {
        backgroundColor: '#007bff',
    },
    cancelButton: {
        backgroundColor: '#dc3545',
    },
});
