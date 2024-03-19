import React, {useEffect, useState} from 'react';
import {View, SafeAreaView, StyleSheet, Image,Text,Dimensions} from 'react-native';
import {colors} from '../../utils';
import {fonts, images} from '../../assets';
import { ButtonCustom } from '../../components';

const {height,width}= Dimensions.get('window')

const Onboarding = ({navigation, route}) => {
    const [step,setStep] = useState(1)

    const onButtonPress = () => {
        setStep(step+1)
        if(step==2) navigation.replace("Login")
    }

    const onButtonSkipPress = () => navigation.replace('Login')

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.body}>
                <View style={styles.content}>
                    <View style={styles.header}>
                        <Image source={images.logo} style={styles.logo}/>
                        <Text style={styles.textSkip} onPress={onButtonSkipPress}>Skip</Text>
                    </View>
                    {/* Banner1 */}
                    {step==1 && <View style={styles.bannerWrapper}>
                        <View>
                            <Text style={styles.textTitle}>Semudah Sentuhan Jari</Text>
                            <Text style={styles.textDesc}>Transaksi keuangan aman, cepat, dan praktis dengan E-Wallet.</Text>
                        </View>
                        <Image source={images.banner1} style={styles.banner}/>
                    </View>}
                    {/* Banner2 */}
                    {step==2 && <View style={styles.bannerWrapper}>
                        <Image source={images.banner2} style={styles.banner}/>
                        <View>
                            <Text style={styles.textTitle}>Keamanan Data Terjaga</Text>
                            <Text style={styles.textDesc}>Prioritaskan keamanan data dan privasi Anda dengan teknologi terdepan.</Text>
                        </View>
                    </View>}
                    {/* pagination */}
                    <View style={styles.paginationWrapper}>
                        <View style={[styles.paginationItem,{alignItems:step ==1 ? "flex-start":"flex-end"}]}>
                            <View style={styles.paginationSubItem}/>
                        </View>
                    </View>
                </View>  
                <View style={styles.buttonWrapper}>
                    <ButtonCustom title={step==1 ? 'Next' : 'Mulai Sekarang Juga!'} buttonStyle={styles.buttonStyle} color={colors.black} onPress={onButtonPress}/>
                </View>        
            </View>
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    body: {
        height: '100%',
        width: '100%',
        backgroundColor: colors.primary,
        justifyContent:'space-between'
    },
    content:{
        padding:12,
        backgroundColor:colors.white,
        flex:1,
        borderBottomLeftRadius:40,
        borderBottomRightRadius:40
    },
    logo: {
        height: 20,
        width: 88,
        resizeMode: 'contain',
    },
    textSkip:{
        fontFamily:fonts.PoppinsRegular,
        color:colors.black
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
    bannerWrapper:{
        flex:1,
        alignItems:'center',
        justifyContent:'space-between',
        marginTop:50,
        marginBottom:30
    },
    banner:{
        height:314,
        width:'100%',
        resizeMode:'contain'
    },
    paginationWrapper:{
        alignItems:'center',
        padding:10
    },
    paginationItem:{
        height:5, 
        width:50,
        borderRadius:100,
        backgroundColor:'rgba(76, 208, 128, 0.5)'
    },
    paginationSubItem:{
        height:5,
        width:25,
        borderRadius:100,
        backgroundColor:'rgba(76, 208, 128, 1)'
    },
    buttonWrapper:{
        padding:12
    }
});
export default Onboarding;
