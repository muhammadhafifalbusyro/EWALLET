import React,{useState} from 'react';
import {View, Text, SafeAreaView, StyleSheet, ScrollView, Image, ToastAndroid} from 'react-native';
import {colors, dimens} from '../../utils';
import {fonts, icons, images} from '../../assets';
import { ButtonCustom, TextInputWithIcon, TextInputWithoutIcon } from '../../components';
import { otpAuth } from '../../services/Auth';

const Otp = ({navigation, route}) => {
    const [otp,setOtp] = useState('')
    const [loading,setLoading] = useState(false)


    const handlerNavigateToSignup = () => navigation.navigate("Register")

    const handlerOtp = async() => {
        
        const phone = route.params.phone
        
        const formData = new FormData()
        formData.append('otp', otp)

        setLoading(true)
        const response = await otpAuth(phone, formData)
        console.log("response otp", response)

        if(response?.data){
            setLoading(false)
            ToastAndroid.show(
                'Berhasil',
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
            )
            navigation.replace('Login')
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
                <View style={styles.textWrapper}>
                    <Text style={styles.textTitle}>Verifikasi OTP</Text>
                    <Text style={styles.textDesc}>Kami telah mengirimkan Kode Verifikasi melalui nomor seluler anda, klik <Text style={[styles.text,{fontFamily:fonts.PoppinsMedium, color: colors.primary}]}>disini</Text> apabila anda tidak menerima kode OTP</Text>
                </View>
                <TextInputWithoutIcon placeholder='Masukkan kode OTP' keyboardType={'numeric'} value={otp} onChangeText={setOtp}/>
                <View style={styles.buttonWrapper}>
                    <ButtonCustom title={loading?'Loading...': 'Submit'} buttonStyle={styles.buttonStyle} color={colors.primary} onPress={handlerOtp}/>
                </View>  
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
    textWrapper:{
        marginBottom:70
    },
    logo: {
        tintColor: colors.primary,
        height: 24,
        width: 106,
        resizeMode: 'contain',
        alignSelf:'center',
        marginTop:70,
        marginBottom:30
    },
    contentContainerScroll:{
        paddingHorizontal:12
    },
    buttonWrapper:{
        paddingVertical:25
    },
    textTitle:{
        fontFamily:fonts.PoppinsMedium,
        color:colors.black,
        fontSize:18,
        textAlign:'center'
    },
    textDesc:{
        fontFamily:fonts.PoppinsRegular,
        color:colors.black,
        textAlign:'center'
    },
});
export default Otp;
