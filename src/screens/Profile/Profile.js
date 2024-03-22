import React,{ useState, useEffect } from 'react';
import {View, Text, SafeAreaView, StyleSheet,Image,Pressable, ToastAndroid, ScrollView, RefreshControl} from 'react-native';
import {colors, dimens} from '../../utils';
import {fonts, images} from '../../assets';
import IonIcons from 'react-native-vector-icons/Ionicons'
import { getProfile } from '../../services/Profile';
import AsyncStorage from '@react-native-async-storage/async-storage'

const Profile = ({navigation, route}) => {
    const [data,setData] = useState(null)
    const [loading,setLoading] = useState(false)

    const handlerGetProfile = async () => {
        setLoading(true)
        const response = await getProfile()
        console.log("response get profile", response)

        if(response?.data){
            setData(response?.data)
            setLoading(false)
        }else{
            setLoading(false)
            return false
        }
    }

    const handlerLogout = () => {
        AsyncStorage.removeItem('token');
        navigation.replace("Login")
    }

    useEffect(() => {
		handlerGetProfile()
		const unsubscribe = navigation.addListener('focus', () => {
			handlerGetProfile()
		});
	
		return unsubscribe;
	  }, [navigation]);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView refreshControl={<RefreshControl refreshing={loading} onRefresh={handlerGetProfile}/>}>
                <View style={styles.body}>
                    <View style={styles.contentWrapper}>
                        <Image source={images.default_account} style={styles.imageAcc}/>
                        <Text style={styles.nama}>{data?.name}</Text>
                        <Text style={styles.email}>{data?.email}</Text>
                        <Text style={styles.phone}>{data?.phone}</Text>
                    </View>
                    <Text style={styles.logout}>LOG OUT</Text>
                    <View style={styles.logoutWrapper}>
                        <Pressable style={styles.logoutButton} onPress={handlerLogout}>
                            <IonIcons name='log-out-outline' color={colors.red} size={20}/>
                            <Text style={styles.textLogoutButton}>Log Out</Text>
                        </Pressable>
                    </View>
                </View>
            </ScrollView>
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
        backgroundColor: colors.lightGray,
    },
    text: {
        fontFamily: fonts.PoppinsRegular,
        fontSize: dimens.xxl,
        color: colors.black,
    },
    imageAcc:{
        height:56,
        width:56,
        borderRadius:56,
        resizeMode:"contain"
    },
    contentWrapper:{
        height:200,
        backgroundColor:colors.white,
        justifyContent:"center",
        alignItems:'center'
    },
    nama:{
        fontSize: 20,
        fontFamily:fonts.PoppinsMedium,
        color:colors.black
    },
    email:{
        fontFamily:fonts.PoppinsRegular,
        color:colors.gray
    },
    phone:{
        fontFamily:fonts.PoppinsRegular,
        color:colors.gray
    },
    logout:{
        fontFamily:fonts.PoppinsRegular,
        color:colors.gray,
        margin:12
    },
    logoutWrapper:{
        height:80,
        backgroundColor:colors.white,
        justifyContent:"center",
        alignItems:'center'
    },
    logoutButton:{
        flexDirection:'row',
        alignItems:"center"
    },
    textLogoutButton:{
        fontFamily:fonts.PoppinsMedium,
        color:colors.red,
        marginLeft:8
    }
});
export default Profile;
