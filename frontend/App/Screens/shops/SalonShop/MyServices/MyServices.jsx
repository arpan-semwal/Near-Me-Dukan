import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';

export default function MyServices({ selectedSubCategoryId }) {
  const [services, setServices] = useState([]);

  useEffect(() => {
    // Function to fetch services from the server based on the selected subcategory ID
    const fetchServices = async () => {
      try {
        const response = await fetch(`http://192.168.29.68:3000/services/${selectedSubCategoryId}`);
        if (response.ok) {
          const data = await response.json();
          setServices(data);
        } else {
          console.error('Failed to fetch services:', response.status);
        }
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };

    // Fetch services when the component mounts or the selectedSubCategoryId changes
    fetchServices();
  }, [selectedSubCategoryId]);

  // Render the services using a FlatList or similar component
  return (
    <View>
      <FlatList
        data={services}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>{item.service_type}</Text>
            <Text>{item.category}</Text>
            <Text>{item.gender_services}</Text>
            {/* Display other service details as needed */}
          </View>
        )}
      />
    </View>
  );
}
