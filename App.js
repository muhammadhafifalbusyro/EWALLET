// import React from 'react'
// import {View,Text} from 'react-native'
// import Icon from 'react-native-vector-icons/Feather'

// const App =()=>{
//   return(
//     <View>
//       <Icon name='home' size={30}color={'red'}/>
//       <Text style={{fontSize:30}}>Hallo</Text>
//       <Text style={{fontSize:30, fontFamily:'Poppins-Regular'}}>Hallo</Text>
//     </View>
//   )
// }
// export default App

// In App.js in a new project

import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
    </View>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;