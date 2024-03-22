import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, SafeAreaView, View, Text, Modal, TouchableOpacity, ToastAndroid } from 'react-native';
import { colors, formatToRupiah } from '../../utils';
import { getProfile } from '../../services/Profile';
import IonIcon from 'react-native-vector-icons/Ionicons'
import { fonts, icons } from '../../assets';
import { ButtonCustom, TextInputWithIcon, TextInputWithoutIcon } from '../../components';
import { topup } from '../../services/Wallet';
import { convertToNumber } from '../../utils/functions';

const Topup = ({navigation,route}) => {
	const [dataUser,setDataUser] = useState(null)
	const [isModalVisible, setIsModalVisible] = useState(false);
    const [total, setTotal] = useState('')
    const [pin,setPin] = useState('')
    const [secure,setSecure] = useState(true)
    const [loading,setLoading] = useState(false)

	const handlerGetProfile = async () => {
		const response = await getProfile();
		console.log("response get profile", response);

		if(response?.data){
			setDataUser(response?.data);
		}else{
			return false;
		}
	}

	useEffect(() => {
		handlerGetProfile();
		const unsubscribe = navigation.addListener('focus', () => {
			handlerGetProfile();
		});
	
		return unsubscribe;
	}, [navigation]);
	
	const toggleModal = () => {
        if(total.length == 0){
            ToastAndroid.show(
                'Isi kolom topup terlebih dahulu!',
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

    const handlerTopUp = async() => {
        const param ={
            nominal: convertToNumber(total),
            password: pin
        }
        console.log('param kirim',param)
        setLoading(true)
        const response = await topup(param)
        console.log("response topup", response)
        if(response?.data){
            setLoading(false)
            setIsModalVisible(false)
            setTotal('')
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
				<Text style={styles.titleHeader}>Topup Saldo</Text>
			</View>
			<View style={styles.balanceWrapper}>
				<Text style={styles.descBalance}>Saldo aktif yang kamu miliki</Text>
				<Text style={styles.titleBalance}>{formatToRupiah(dataUser?.saldo)}</Text>
			</View>
			<View style={{padding:12}}>
				<TextInputWithoutIcon title='Jumlah Topup' placeholder='Jumlah Topup' keyboardType={'numeric'}  onChangeText={(value) => setTotal(formatToRupiah(value.replace(/\D/g, '')))}  value={total}/>
				<ButtonCustom title='Topup' buttonStyle={{marginTop: 25}} onPress={toggleModal} />
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
							<TouchableOpacity style={[styles.modalButton,{marginLeft:5},pin.length==0 &&{backgroundColor:colors.lightGray}]} onPress={handlerTopUp} disabled={pin.length==0 ?true:false}>
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
	balanceWrapper:{
		padding:12,
		margin:12,
		backgroundColor:'#DEE7F6',
		borderRadius: 16
	},
	descBalance:{
		fontFamily:fonts.PoppinsRegular,
		color:colors.black
	},
	titleBalance:{
		fontSize: 24,
		fontFamily: fonts.PoppinsBold,
		color:colors.black
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

export default Topup;
