import React from 'react';
import { View, Text, ScrollView , TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native'; 

export default function SalesHomePage({route}) {
	
	const navigation = useNavigation();
	const { mobileNumber } = route.params;
	
	
  return (
    <ScrollView contentContainerStyle={styles.container}>
   
   <TouchableOpacity  onPress={() => navigation.navigate('TotalShopAndIncome' , {mobileNumber:mobileNumber})}>
	  <Card name="Total shops and Total income" />
	  </TouchableOpacity>
	  
	  <TouchableOpacity  onPress={() => navigation.navigate('IncomeCalculator' , {mobileNumber:mobileNumber})}>
	  <Card name="Income Caluclator" />
	  </TouchableOpacity>
     
      <TouchableOpacity onPress={() => navigation.navigate('AddTeamMember' , {mobileNumber:mobileNumber})}>
        <Card name="Add a Team Member" />
      </TouchableOpacity>
	  
	  <TouchableOpacity onPress={() => navigation.navigate('MyTeam' , {mobileNumber:mobileNumber})}>
	  		<Card name="My Team : " />
	  </TouchableOpacity>
     
      <TouchableOpacity  onPress={() => navigation.navigate('MyProfile' , {mobileNumber:mobileNumber})}>
	  		<Card name="My Profile" />
	  </TouchableOpacity>
	  
	  <TouchableOpacity  onPress={() => navigation.navigate('RegisterShop' , {mobileNumber:mobileNumber})}>
	  <Card name="Register Shop" />
	  </TouchableOpacity>
     
   
    </ScrollView>
  );
}

const Card = ({ name }) => (
  <View style={styles.card}>
    <Text>{name}</Text>
  </View>
);

const styles = {
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingVertical: 20,
  },
  card: {
    height: 100,
    backgroundColor: '#FDE0D9',
    borderRadius: 8,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
};
