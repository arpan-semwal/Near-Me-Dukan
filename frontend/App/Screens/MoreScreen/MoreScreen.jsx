import { View, Text , Button } from 'react-native'
import React from 'react'

export default function MoreScreen({navigation}) {
  return (
	<View>
	  <Text>MoreScreen</Text>
	  <Button title="Go to new screen" onPress={() => navigation.navigate("Another")}></Button>
	</View>
  )
}