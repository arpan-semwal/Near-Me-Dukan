// ProductInventory.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, ActivityIndicator, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

const ProductInventory = ({ route }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchText, setSearchText] = useState('');
	const {phoneNumber} = route.params;

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await fetch('http://192.168.29.67:3000/products'); // Replace with your actual backend URL
            if (response.ok) {
                const data = await response.json();
                setProducts(data);
            } else {
                console.error('Failed to fetch products:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    };

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchText.toLowerCase())
    );

	const handleSelectProduct = async (productId) => {
		try {
			const response = await fetch('http://192.168.29.67:3000/selectedProducts', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					phoneNumber: phoneNumber,
					productId: productId,
				}),
			});
			if (response.ok) {
				// Update the state to reflect that the product has been selected
				setProducts(prevProducts => {
					return prevProducts.map(product => {
						if (product.id === productId) {
							return { ...product, selected: true }; // Assuming there's a selected property in the product object
						}
						return product;
					});
				});
				console.log('Product selected successfully');
			} else {
				console.error('Failed to select product:', response.statusText);
			}
		} catch (error) {
			console.error('Error selecting product:', error);
		}
	};
	

    const renderProduct = ({ item }) => (
        <View style={styles.productContainer}>
            <Image source={{ uri: item.image }} style={styles.productImage} />
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productBrand}>{item.brand}</Text>
            <Text style={styles.productPrice}>${item.mrp}</Text>
            <Text style={styles.productDescription}>{item.description}</Text>
			<TouchableOpacity
    style={styles.selectButton}
    onPress={() => handleSelectProduct(item.id)}
>
    <Text style={styles.selectButtonText}>
        {item.selected ? 'Selected' : 'Select'}
    </Text>
</TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.searchBar}
                placeholder="Search Products..."
                value={searchText}
                onChangeText={setSearchText}
            />
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <FlatList
                    data={filteredProducts}
                    renderItem={renderProduct}
                    keyExtractor={(item) => item.id.toString()}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    searchBar: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 8,
        marginBottom: 16,
    },
    productContainer: {
        marginBottom: 16,
        padding: 16,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        backgroundColor: '#f9f9f9',
    },
    productImage: {
        width: '100%',
        height: 200,
        resizeMode: 'contain',
    },
    productName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 8,
    },
    productBrand: {
        fontSize: 14,
        color: '#888',
        marginVertical: 4,
    },
    productPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
        marginVertical: 4,
    },
    productDescription: {
        fontSize: 14,
        color: '#666',
        marginTop: 8,
    },
    selectButton: {
        marginTop: 10,
        backgroundColor: '#007bff',
        paddingVertical: 10,
        borderRadius: 5,
    },
    selectButtonText: {
        color: '#fff',
        textAlign: 'center',
    },
});

export default ProductInventory;
