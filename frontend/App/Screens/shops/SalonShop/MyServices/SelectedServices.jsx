import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useCart } from '../../../../Context/ContextApi'; // Import useCart hook

export default function SelectedServices({ route }) {
    const { mainServiceName, subServices, userType } = route.params;
    const { addToCart } = useCart(); // Access addToCart function from CartContext
    const [addedItems, setAddedItems] = useState([]); // State to manage items that have been added to cart

    const handleAddToCart = (item) => {
        addToCart(item);
        setAddedItems([...addedItems, item.id]); // Add item ID to the list of added items
    };

    const isAddedToCart = (itemId) => addedItems.includes(itemId); // Check if item is added to cart

    console.log('User Type:', userType);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{mainServiceName}</Text>

            <FlatList
                data={subServices}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Text style={styles.itemText}>Sub Service: {item.name}</Text>
                        <Text style={styles.itemText}>Price: ${item.price}</Text>
                        {userType === 'customer' && ( // Render only if userType is 'customer'
                            <TouchableOpacity
                                style={styles.addToCartButton}
                                onPress={() => handleAddToCart(item)}>
                                <Text style={styles.addToCartText}>{isAddedToCart(item.id) ? 'Added to Cart' : 'Add to Cart'}</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                )}
            />
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
        flex: 1,
        margin: 5, // Margin between cards
        padding: 15,
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
        marginVertical: 5,
    },
    addToCartButton: {
        backgroundColor: '#3498db',
        borderRadius: 5,
        padding: 10,
        marginTop: 10,
        alignItems: 'center',
    },
    addToCartText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});