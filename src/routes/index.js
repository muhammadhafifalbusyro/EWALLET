import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Onboarding, Splash} from '../screens';
import MainNavigator from './MainNavigator';
import { Login, Otp, Register } from '../screens/Auth';

const Stack = createNativeStackNavigator();

function AppNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Splash" component={Splash} />
                <Stack.Screen name="Onboarding" component={Onboarding} />
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Register" component={Register} />
                <Stack.Screen name="Otp" component={Otp} />
                <Stack.Screen name="MainNavigator" component={MainNavigator} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default AppNavigator;
