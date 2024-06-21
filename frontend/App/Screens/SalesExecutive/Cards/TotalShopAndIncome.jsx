import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';

export default function MyTotalCommission({ route }) {
    const [totalCommission, setTotalCommission] = useState(0);
    const { mobileNumber } = route.params; // Assuming you retrieve the mobile number from route params

    useEffect(() => {
        // Fetch total commission data for the logged-in user from the backend
        const fetchTotalCommission = async () => {
            try {
                const response = await fetch(`http://172.16.16.19:3000/myTotalCommission?mobileNumber=${mobileNumber}`);
                if (response.ok) {
                    const data = await response.json();
                    setTotalCommission(data.totalCommission);
                } else {
                    console.error('Failed to fetch total commission');
                }
            } catch (error) {
                console.error('Error fetching total commission:', error);
            }
        };

        fetchTotalCommission();
    }, [mobileNumber]);

    return (
        <View>
            <Text>Total Commission: {totalCommission}</Text>
        </View>
    );
}
