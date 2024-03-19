import * as React from 'react';
import {StyleSheet} from 'react-native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {colors} from '../utils';
import WalletNavigator from './WalletNavigator';
import ProfileNavigator from './ProfileNavigator';
import ActivityNavigator from './ActivityNavigator';

const Tab = createMaterialBottomTabNavigator();

function MainNavigator() {

    return (
        <Tab.Navigator
            initialRouteName="WalletNavigator"
            shifting={false}
            inactiveColor="#95a5a6"
            activeColor={colors.white}
            barStyle={styles.barStyle}>
            <Tab.Screen
                name="WalletNavigator"
                component={WalletNavigator}
                options={{
                    tabBarLabel: 'E Wallet',
                    tabBarIcon: ({color}) => (
                    <IonIcon name="wallet-outline" color={color} size={26} />
                    ),
                }}
                />
            <Tab.Screen
                name="ActivityNavigator"
                component={ActivityNavigator}
                options={{
                    tabBarLabel: 'Aktivitas',
                    tabBarIcon: ({color}) => (
                    <IonIcon name="reader-outline" color={color} size={26} />
                    ),
                }}
                />
            <Tab.Screen
                name="ProfileNavigator"
                component={ProfileNavigator}
                options={{
                    tabBarLabel: 'Profil',
                    tabBarIcon: ({color}) => (
                    <IonIcon name="person-outline" color={color} size={26} />
                    ),
                }}
                />
        </Tab.Navigator>
    );
}
const styles = StyleSheet.create({
    barStyle: {
        backgroundColor: colors.green,
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        paddingHorizontal: 8,
        justifyContent: 'center',
        height: 90,
        borderWidth: 1.5,
        borderColor: colors.green,
        position: 'absolute',
        width: '100%',
      },
});
export default MainNavigator;
