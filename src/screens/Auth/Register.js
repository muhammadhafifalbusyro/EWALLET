import React,{useState} from 'react';
import {View, Text, SafeAreaView, StyleSheet, ScrollView, Image, ToastAndroid} from 'react-native';
import {colors, dimens} from '../../utils';
import {fonts, icons, images} from '../../assets';
import { ButtonCustom, TextInputWithIcon, TextInputWithoutIcon } from '../../components';
import { register } from '../../services/Auth';

const Register = ({navigation, route}) => {
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [phone,setPhone] = useState('')
    const [password,setPassword] = useState('')
    const [passwordConfirmation,setPasswordConfirmation] = useState('')
    const [secure,setSecure] = useState(true)
    const [secureConfirm,setSecureConfirm] = useState(true)
    const [loading,setLoading] = useState(false)

    const handlerNavigateToLogin = () => navigation.replace("Login")

    const handlerSubmit = async () => {

        const formData = new FormData()
        formData.append("name", name)
        formData.append('email', email)
        formData.append('phone', phone)
        formData.append('password',password)
        formData.append("password_confirmation",passwordConfirmation)
        
        console.log('form data:',formData)
        
        setLoading(true)
        const response = await register(formData)
        console.log("response register", response)

        if(response?.data){
            setLoading(false)
            ToastAndroid.show(
                'Berhasil',
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
            )
            navigation.replace('Otp',{ phone: phone })
        }else{
            setLoading(false)
            ToastAndroid.show(
                'Gagal',
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
            )
            
        }
       
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.contentContainerScroll}>
                <Image source={images.logo} style={styles.logo}/>
                <TextInputWithoutIcon placeholder='Name' value={name} onChangeText={setName}/>
                <TextInputWithoutIcon placeholder='Email' value={email} onChangeText={setEmail}/>
                <TextInputWithoutIcon placeholder='No. Hp' keyboardType={'numeric'} value={phone} onChangeText={setPhone}/>
                <TextInputWithIcon placeholder='Password' iconOff={icons.eyeOff} iconOn={icons.eyeOpen} secureTextEntry={secure} onPress={() => setSecure(!secure)} isActive={secure} value={password} onChangeText={setPassword}/>
                <TextInputWithIcon placeholder='Konfirmasi Password' iconOff={icons.eyeOff} iconOn={icons.eyeOpen} secureTextEntry={secureConfirm} onPress={() => setSecureConfirm(!secureConfirm)} isActive={secureConfirm} value={passwordConfirmation} onChangeText={setPasswordConfirmation}/>
                <View style={styles.buttonWrapper}>
                    <ButtonCustom title={loading? 'Loading...' : 'Submit'} buttonStyle={styles.buttonStyle} color={colors.primary} onPress={handlerSubmit}/>
                </View>  
                <Text style={styles.text}>Sudah punya akun? <Text style={[styles.text,{fontFamily:fonts.PoppinsMedium, color: colors.primary}]} onPress={handlerNavigateToLogin}>Login</Text> </Text> 
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
export default Register;
