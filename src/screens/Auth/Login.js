import React,{useState} from 'react';
import {View, Text, SafeAreaView, StyleSheet, ScrollView, Image, ToastAndroid} from 'react-native';
import {colors, dimens} from '../../utils';
import {fonts, icons, images} from '../../assets';
import { ButtonCustom, TextInputWithIcon, TextInputWithoutIcon } from '../../components';
import { login } from '../../services/Auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({navigation, route}) => {
    const [secure,setSecure] = useState(true)
    const [email,setEmail] = useState('hafif2@gmail.com')
    const [password,setPassword] = useState('123456')
    const [loading,setLoading] = useState(false)

    const handlerNavigateToSignup = () => navigation.replace("Register")

    const handlerLogin = async () => {
        const formData = new FormData()
        formData.append('email', email)
        formData.append('password',password)
        
        console.log('form data:',formData)
        
        setLoading(true)
        const response = await login(formData)
        console.log("response login", response)

        if(response?.data){
            AsyncStorage.setItem('token',response?.token)
            setLoading(false)
            ToastAndroid.show(
                'Berhasil',
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
            )
            navigation.replace('MainNavigator')
        }else{
            setLoading(false)
            ToastAndroid.show(
               response?.message,
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
            )
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.contentContainerScroll}>
                <Image source={images.logo} style={styles.logo}/>
                <TextInputWithoutIcon placeholder='Your Email' value={email} onChangeText={setEmail}/>
                <TextInputWithIcon placeholder='Password' iconOff={icons.eyeOff} iconOn={icons.eyeOpen} secureTextEntry={secure} onPress={() => setSecure(!secure)} isActive={secure} value={password} onChangeText={setPassword}/>
                <View style={styles.buttonWrapper}>
                    <ButtonCustom title={loading?'Loading...':'Login'} buttonStyle={styles.buttonStyle} color={colors.primary} onPress={handlerLogin}/>
                </View>  
                <Text style={styles.text}>Baru di E Wallet? <Text style={[styles.text,{fontFamily:fonts.PoppinsMedium, color: colors.primary}]} onPress={handlerNavigateToSignup}>Sign Up</Text> </Text> 
            </ScrollView>
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:colors.white
    },
    text: {
        fontFamily: fonts.PoppinsRegular,
        color: colors.gray,
        textAlign:'center'
    },
    logo: {
        tintColor: colors.primary,
        height: 24,
        width: 106,
        resizeMode: 'contain',
        alignSelf:'center',
        marginVertical:70
    },
    contentContainerScroll:{
        paddingHorizontal:12
    },
    buttonWrapper:{
        paddingVertical:25
    }
});
export default Login;
