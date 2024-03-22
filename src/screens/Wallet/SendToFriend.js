import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, SafeAreaView, View, Text, Modal, TouchableOpacity, ToastAndroid, TextInput } from 'react-native';
import { colors } from '../../utils';
import { getProfile } from '../../services/Profile';
import IonIcon from 'react-native-vector-icons/Ionicons'
import { fonts, icons } from '../../assets';
import { ButtonCustom, TextInputWithIcon, TextInputWithoutIcon } from '../../components';
import { sendMoney, topup } from '../../services/Wallet';

const SendToFriend = ({navigation,route}) => {
    const {data} = route?.params
    console.log("data search by phone", data)

    const [nominal,setNominal] = useState('')
    const [notes,setNotes] = useState('')
    const [loading,setLoading] = useState(false)
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [pin,setPin] = useState('')
    const [secure,setSecure] = useState(true)

    const toggleModal = () => {
        if(nominal.length == 0){
            ToastAndroid.show(
                'Isi nominal terlebih dahulu!',
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
            )
            return false
        }
        if(notes.length == 0){
            ToastAndroid.show(
                'Isi catatan terlebih dahulu!',
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
            )
            return false
        }
		setIsModalVisible(true);
	}
    const cancelHandler = () => {
        setPin('')
        setIsModalVisible(false)
    }

    const handlerSend = async()=>{
        const formData = new FormData()
        formData.append('to',data?.id)
        formData.append('nominal',nominal)
        formData.append('desc', notes)
        formData.append('password',pin)


        console.log('param kirim',formData)
        setLoading(true)
        const response = await sendMoney(formData)
        console.log("response topup", response)
        if(response?.data){
            setLoading(false)
            setIsModalVisible(false)
            setNominal('')
            setPin('')
            ToastAndroid.show(
                response?.message,
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
            )
            navigation.navigate('MainNavigator')
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
			<View style={styles.header}>
				<IonIcon name='chevron-back-outline' size={24} color={colors.black} onPress={() => navigation.goBack()}/>
				<Text style={styles.titleHeader}>Kirim ke Teman</Text>
			</View>
			<View style={{padding:12}}>
				<View style={styles.cardWrapper}>
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                        <View style={{height:48, width:48, borderRadius: 48, backgroundColor:colors.lightGray, justifyContent:'center', alignItems:'center'}}>
                            <Text style={{fontFamily:fonts.PoppinsBold, color:colors.black, fontSize:24}}>{data?.name? data?.name[0] :'...'}</Text>
                        </View>
                        <View style={{marginLeft: 10}}>
                            <Text style={{fontFamily:fonts.PoppinsRegular, color:colors.gray}}>{data?.name}</Text>
                            <Text style={{fontFamily:fonts.PoppinsMedium, color:colors.black, fontSize:18}}>{data?.phone}</Text>
                        </View>
                    </View>
                    <View style={{height:1, width:'100%', backgroundColor:colors.lightGray,marginVertical:10}}/>
                    <Text style={{fontFamily:fonts.PoppinsRegular, color:colors.gray, fontSize:12}}>JUMLAH KIRIM</Text>
                    <TextInput placeholder='100000' placeholderTextColor={colors.lightGray} style={{fontSize: 28, fontFamily:fonts.PoppinsSemibold, color:colors.black}} keyboardType='numeric' numberOfLines={1} value={nominal} onChangeText={setNominal}/>
                    <TextInput placeholder='Tulis Catatan' placeholderTextColor={colors.gray} style={{fontFamily:fonts.PoppinsRegular, color:colors.black,borderWidth:1, borderRadius:12, borderColor:colors.lightGray, paddingHorizontal:10}} numberOfLines={1} textAlignVertical='center' value={notes} onChangeText={setNotes}/>
                </View>
                <ButtonCustom title='Send' buttonStyle={{marginTop: 12}} onPress={toggleModal}/>
			</View>

            {/* Modal */}
			<Modal
				animationType="slide"
				transparent={true}
				visible={isModalVisible}
				onRequestClose={toggleModal}
			>
				<View style={styles.modalContainer}>
					<View style={styles.modalContent}>
						<Text style={styles.modalTitle}>Masukkan pin</Text>
                        <TextInputWithIcon placeholder='Masukkan Pin' iconOff={icons.eyeOff} iconOn={icons.eyeOpen} secureTextEntry={secure} onPress={() => setSecure(!secure)} isActive={secure} value={pin} onChangeText={setPin} keyboardType={'numeric'} />
						<View style={styles.modalButtonContainer}>
							<TouchableOpacity style={[styles.modalButton,{backgroundColor:colors.white,borderWidth:1,borderColor:colors.lightGray,marginRight:5}]} onPress={cancelHandler}>
								<Text style={[styles.modalButtonText,{color:colors.gray}]}>Batal</Text>
							</TouchableOpacity>
							<TouchableOpacity style={[styles.modalButton,{marginLeft:5},pin.length==0 &&{backgroundColor:colors.lightGray}]} onPress={handlerSend} disabled={pin.length==0 ?true:false}>
								<Text style={[styles.modalButtonText,pin.length==0 &&{color:colors.gray}]}>{loading ? 'Loading...' : 'Ok'}</Text>
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</Modal>
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
    cardWrapper:{
        padding: 12, 
        borderRadius: 16, 
        backgroundColor:colors.white,
        elevation: 3
    },
    // Modal styles
	modalContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
	},
	modalContent: {
		backgroundColor: colors.white,
		padding: 20,
		borderRadius: 22,
		width: '80%',
	},
	modalTitle: {
		fontSize: 18,
		fontFamily: fonts.PoppinsMedium,
		marginBottom: 10,
        color:colors.black,
        textAlign:'center'
	},
	modalButtonContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: 20,
	},
	modalButton: {
		padding: 10,
		borderRadius: 24,
		backgroundColor: colors.primary,
		flex:1,
		alignItems: 'center',
	},
	modalButtonText: {
		color: colors.white,
		fontSize: 16,
		fontFamily: fonts.PoppinsBold,
	},
	
});

export default SendToFriend;
