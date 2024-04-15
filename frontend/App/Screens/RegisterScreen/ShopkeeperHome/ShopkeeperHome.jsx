import React, { useState, useEffect } from 'react';
import { Text } from 'react-native';
import GroceryShop from '../../shops/GroceryShop/GroceryShop';
import SalonShop from '../../shops/SalonShop/SalonShop';
import BeautyPalor from '../../shops/BeautyPalor/BeautyPalor';
import SweetsAndNamkeenShop from '../../shops/SweetsAndNamkeenShop/SweetsAndNamkeenShop';
import VegetableShop from '../../shops/VegetableShop/VegetableShop';
import StationaryShop from '../../shops/StationaryShop/StationaryShop';

export default function ShopkeeperHome({ route }) {
    const [shopDetails, setShopDetails] = useState(null);
    const { phoneNumber } = route.params;

    useEffect(() => {
        const fetchShopDetails = async () => {
            try {
                const response = await fetch(`http://192.168.38.249:3000/shopkeeperDetails/${phoneNumber}`);
                const data = await response.json();
                
                console.log('API response:', data);
                
                if (response.ok) {
                    setShopDetails(data);
                } else {
                    console.error('Failed to fetch shopkeeper details:', data.message);
                }
            } catch (error) {
                console.error('Error fetching shopkeeper details:', error);
            }
        };

        fetchShopDetails();
    }, [phoneNumber]);

    if (!shopDetails) {
        return <Text>Loading...</Text>;
    }

    console.log('Selected category:', shopDetails.selectedCategory);

    switch (shopDetails.selectedCategory) {
        case 'Grocery Shop':
            return <GroceryShop />;
        case 'Salon shop':
            return <SalonShop />;
        case 'Beauty Palour':
            return <BeautyPalor />;
        case 'Sweets and Namkeen Shop':
            return <SweetsAndNamkeenShop />;
        case 'Vegetable Shop':
            return <VegetableShop />;
        case 'Stationary Shop':
            return <StationaryShop />;
        default:
            return <Text>Unknown shop type</Text>;
    }
}