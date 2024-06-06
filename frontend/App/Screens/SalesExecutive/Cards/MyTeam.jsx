import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';

export default function MyTeam({ route }) {
  const { mobileNumber } = route.params;
  const [teamMembers, setTeamMembers] = useState([]);

  useEffect(() => {
    axios.get(`http://172.16.16.41:3000/my-team/${mobileNumber}`)
      .then(response => {
        setTeamMembers(response.data);
      })
      .catch(error => {
        console.error('Error fetching team members:', error);
      });
  }, [mobileNumber]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>My Team ({mobileNumber})</Text>
      {teamMembers.map(member => (
        <View key={member.id} style={styles.memberContainer}>
          <Text style={styles.memberName}>{member.firstName} {member.lastName}</Text>
          <Text style={styles.memberMobile}>Mobile: {member.mobileNo}</Text>
          {/* Display other details */}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  memberContainer: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    width: '100%',
  },
  memberName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  memberMobile: {
    fontSize: 16,
    color: '#555',
  },
});
