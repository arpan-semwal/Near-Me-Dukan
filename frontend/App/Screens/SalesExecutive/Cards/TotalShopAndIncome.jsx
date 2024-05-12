import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function TotalShopAndIncome({ route }) {
    const [totalIncome, setTotalIncome] = useState(0);
    const [shops, setShops] = useState([]);
    const navigation = useNavigation();
    const { mobileNumber } = route.params;

    useEffect(() => {
        // Fetch shops registered with your mobile number
        fetchShops();
    }, []);

    const fetchShops = async () => {
        try {
            const response = await fetch(`http://192.168.29.67:3000/shops?salesAssociateNumber=${mobileNumber}`);
            if (response.ok) {
                const data = await response.json();
                setShops(data);
            } else {
                console.error('Failed to fetch shops');
            }
        } catch (error) {
            console.error('Error fetching shops:', error);
        }
    };

    useEffect(() => {
        // Calculate total income based on the number of registered shops
        const calculateTotalIncome = () => {
            const incomePerShop = 500; // Your income per shop
            const totalShops = shops.length;
            const income = totalShops * incomePerShop;
            setTotalIncome(income);
        };

        calculateTotalIncome();
    }, [shops]);

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.heading}>Total Shop and Income</Text>

            <Text style={styles.incomeText}>Total Income: Rs. {totalIncome}</Text>

            <Text style={styles.shopListHeading}>Shops Registered:</Text>
            {shops.map((shop, index) => (
                <TouchableOpacity key={index} onPress={() => navigation.navigate('ShopDetails', { shopId: shop.id })}>
                    <Text style={styles.shopItem}>{shop.name}</Text>
                </TouchableOpacity>
            ))}
        </ScrollView>
    );
}

const styles = {
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        paddingVertical: 20,
        paddingHorizontal: 10,
    },
    heading: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    incomeText: {
        fontSize: 18,
        marginBottom: 10,
    },
    shopListHeading: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 20,
    },
    shopItem: {
        fontSize: 16,
        marginTop: 5,
    },
};
