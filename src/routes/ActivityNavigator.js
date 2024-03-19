import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  Activity
} from '../screens';

const Stack = createNativeStackNavigator();

function ActivityNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Activity" component={Activity} />
    </Stack.Navigator>
  );
}

export default ActivityNavigator;
