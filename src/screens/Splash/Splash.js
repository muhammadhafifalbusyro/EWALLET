import React, {useEffect} from 'react';
import {View, SafeAreaView, StyleSheet, Image} from 'react-native';
import {colors} from '../../utils';
import {images} from '../../assets';

const Splash = ({navigation, route}) => {
    useEffect(() => {
        const wait = ms => {
            return new Promise(resolve => {
            setTimeout(resolve, ms);
            });
        };
        let mounted = true;
        if (mounted) {
            wait(3000).then(() => {
            navigation.replace('Onboarding');
            });
        }
        return () => {
            mounted = false;
        };
    }, []);
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.body}>
                <Image source={images.logo} style={styles.logo} />
            </View>
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    body: {
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.primary,
    },
    logo: {
        tintColor: colors.white,
        height: 150,
        width: 150,
        resizeMode: 'contain',
    },
});
export default Splash;
