import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { dummyData } from '../ShopkeeperManageProducts/dummydata';

export default function ShopkeeperManageProduct() {
    const [selectedButton, setSelectedButton] = useState('Today');
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    const buttonsData = [
        { id: 1, title: 'Category 1' },
        { id: 2, title: 'Category 2' },
        { id: 3, title: 'Category 3' },
        { id: 4, title: 'Category 4' },
        { id: 5, title: 'Category 5' },
        { id: 6, title: 'Category 6' },
        { id: 7, title: 'Category 7' },
        { id: 8, title: 'Category 8' },
        { id: 9, title: 'Category 9' },
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

    const renderProductsByCategory = () => {
        // Retrieve products based on the selected category and current page
        const selectedCategoryProducts = dummyData[selectedButton]?.slice(0, page * 10);
        return selectedCategoryProducts || [];
    };

    const handleProductAction = (action) => {
        console.log('Action:', action);
    };

    const renderProductItem = ({ item }) => (
        <View style={styles.productContainer}>
            <View style={styles.productRow}>
                <Image source={item.image} style={styles.productImage} />
                <View style={styles.productDetails}>
                    <Text style={styles.title}>{item.name}</Text>
                    <Text style={styles.info}>Weight: {item.weight}</Text>
                    <Text style={styles.info}>Code: {item.code}</Text>
                </View>
            </View>
            <View style={styles.productButtonsRow}>
                <TouchableOpacity
                    style={[styles.productButton, styles.fullFillButton]}
                    onPress={() => handleProductAction('Full Fill Order')}>
                    <Text style={styles.productButtonText}>Update</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.productButton, styles.viewDetailsButton]}
                    onPress={() => handleProductAction('View Details')}>
                    <Text style={styles.productButtonText}>Hold</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.productButton, styles.cancelButton]}
                    onPress={() => handleProductAction('Cancel Order')}>
                    <Text style={styles.productButtonText}>Remove</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    const handleEndReached = () => {
        if (!isLoading) {
            setIsLoading(true);
            setPage(page + 1);
            setIsLoading(false);
        }
    };

    return (
        <FlatList
            style={styles.container}
            data={[{ key: 'content' }]}
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
                    <Image source={require('../../../../assets/general.png')} style={styles.fullWidthImage} />
                    <View style={styles.circularImageContainer}>
                        <Image source={require('../../../../assets/name.png')} style={styles.circularImage} />
                    </View>
                    <Text style={styles.ordersHeading}>My Customers</Text>
                    <FlatList
                        data={buttonsData}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id.toString()}
                        numColumns={3}
                        contentContainerStyle={styles.buttonContainer}
                    />
                    <FlatList
                        data={renderProductsByCategory()}
                        renderItem={renderProductItem}
                        keyExtractor={(item) => item.id.toString()}
                        onEndReached={handleEndReached}
                        onEndReachedThreshold={0.1} // Trigger onEndReached when 10% from the bottom
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
        marginBottom: 20,
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
    ordersHeading: {
        marginTop: 20,
        fontSize: 26,
        fontWeight: 'bold',
        textAlign: 'center',
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
        elevation: 3,
        shadowColor: '#000000',
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
        marginLeft: 10,
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
        flexDirection: 'column',
        alignItems: 'flex-end',
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
        minWidth: 100,
        maxWidth: '100%',
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
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    quantityButton: {
        fontSize: 20,
        paddingHorizontal: 10,
        paddingVertical: 5,
        backgroundColor: '#ddd',
        borderRadius: 5,
    },
    quantityText: {
        fontSize: 18,
        marginHorizontal: 10,
    },
});
