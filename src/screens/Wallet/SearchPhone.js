import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, SafeAreaView, View, Text, Modal, TouchableOpacity, ToastAndroid } from 'react-native';
import { colors } from '../../utils';
import { getProfile } from '../../services/Profile';
import IonIcon from 'react-native-vector-icons/Ionicons'
import { fonts, icons } from '../../assets';
import { ButtonCustom, TextInputWithIcon, TextInputWithoutIcon } from '../../components';
import { searchPhone, topup } from '../../services/Wallet';

const SearchPhone = ({navigation,route}) => {
    const [phone,setPhone] = useState('')
    const [loading,setLoading] = useState(false)

    const handleSearchPhoneNumber = async() => {
        
        setLoading(true)
        const response = await searchPhone(phone)
		console.log("response get phone number", response)

    
		if(response?.data){
			if(response?.data.length > 0){
                setLoading(false)
                navigation.navigate('SendToFriend',{data:response?.data[0] })
            }else{
                ToastAndroid.show(
                    'Nomor telepon tidak ditemukan',
                    ToastAndroid.SHORT,
                    ToastAndroid.CENTER
                )
                setLoading(false)
            }
		}else{
            ToastAndroid.show(
                response?.message,
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
            )
            setLoading(false)
			return false
		}
    }

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.header}>
				<IonIcon name='chevron-back-outline' size={24} color={colors.black} onPress={() => navigation.goBack()}/>
				<Text style={styles.titleHeader}>Masukkan Tujuan Baru</Text>
			</View>
			<View style={{padding:12}}>
				<TextInputWithoutIcon placeholder='Nomor HP' keyboardType={'numeric'} onChangeText={setPhone} value={phone}/>
				<ButtonCustom title={loading?'Loading...':'Search'} buttonStyle={{marginTop: 25}} onPress={handleSearchPhoneNumber} />
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.white,
	},
	header:{
		height:60 ,
		width:'100%',
		flexDirection:'row',
		alignItems:'center',
		paddingHorizontal:12,
		elevation:3,
		backgroundColor:colors.white
	},
	titleHeader:{
		fontSize: 16,
		fontFamily: fonts.PoppinsBold,
		color:colors.black
	},
	
});

export default SearchPhone;
