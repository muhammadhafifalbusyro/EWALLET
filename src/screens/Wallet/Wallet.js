import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Image, SafeAreaView, TouchableOpacity, Dimensions, Animated, PanResponder, Pressable } from 'react-native';
import { fonts, icons, images } from '../../assets';
import { colors } from '../../utils';
import IonIcons from 'react-native-vector-icons/Ionicons'
import { getProfile } from '../../services/Profile';
import { getAllActivity } from '../../services/Activity';

const { height } = Dimensions.get('window');

const Wallet = ({navigation,route}) => {
  	const [sheetHeight, setSheetHeight] = useState(height * 0.8);
  	const [datas,setDatas] = useState([])
	const [dataUser,setDataUser] = useState(null)

	const handlerGetProfile = async () => {
	
		const response = await getProfile()
		console.log("response get profile", response)

		if(response?.data){
			setDataUser(response?.data)
		}else{
			return false
		}
	}
	const handlerGetActivity = async () => {
       
        const response = await getAllActivity()
        console.log("response get all activity", response)
        if(response?.data){
            setDatas(response?.data.splice(0,3))
        }else{
            return false
        }
    }

	useEffect(() => {
		handlerGetProfile()
		handlerGetActivity()
		const unsubscribe = navigation.addListener('focus', () => {
			handlerGetProfile()
			handlerGetActivity()
		});
	
		return unsubscribe;
	  }, [navigation]);
	
	
  

	const panResponder = useRef(
		PanResponder.create({
			onMoveShouldSetPanResponder: (evt, gestureState) => {
				// Setiap kali pengguna menyentuh bottom sheet, izinkan pergerakan
				return true;
			},
			onPanResponderMove: (evt, gestureState) => {
			// Perbarui tinggi bottom sheet sesuai dengan pergerakan pengguna
			
			setSheetHeight(height - gestureState.moveY);
			},
			onPanResponderRelease: (evt, gestureState) => {
			//gesturestate 0-900++, 0 top
			if(gestureState.moveY < (height * 0.5)){

				setSheetHeight(height);
				console.log('height', height)
				console.log("gesturemovey",gestureState.moveY)
			}else{
				
				setSheetHeight(height * 0.8);
				console.log('height', height)
				console.log("gesturemovey",gestureState.moveY)
			}
			
			},
		})
	).current;

	return (
	<SafeAreaView style={styles.container}>
		{/* Logo */}
		<View style={styles.logoContainer}>
			<Image source={images.logo} style={styles.logo} resizeMode="contain" />
		</View>
		{/* Hallo Hafif */}
		<Text style={{ fontSize: 16, fontFamily: fonts.PoppinsBold, color: colors.white }}>Hallo, {dataUser?.name}</Text>
		{/* Nomor Telepon */}
		<Text style={{ fontSize: 14, fontFamily: fonts.PoppinsRegular, color: colors.white }}>{dataUser?.phone}</Text>

		{/* Saldo Aktif */}
		<Text style={{ fontSize: 14, fontFamily: fonts.PoppinsRegular, color: colors.white }}>Saldo aktif yang kamu miliki</Text>
		{/* Jumlah Saldo */}
		<Text style={{ fontSize: 24, fontFamily: fonts.PoppinsBold, color: colors.white }}>Rp {dataUser?.saldo}</Text>
		{/* Divider */}
		<View style={{ width: '100%', padding: 12 }}>
			<View style={styles.divider} />
		</View>


		{/* Tombol Topup dan Send */}
		<View style={styles.buttonRow}>
			{/* Tombol Topup */}
			<TouchableOpacity onPress={() => navigation.navigate('Topup')}>
				<Image source={icons.buttonTopup} style={{height:71, width: 54, resizeMode:'contain'}}/>
			</TouchableOpacity>
			{/* Spacer */}
			<View style={{ width: 30 }} />
			{/* Tombol Send */}
			<TouchableOpacity onPress={() => navigation.navigate('SearchPhone')}>
				<Image source={icons.buttonSend} style={{height:74, width: 48, resizeMode:'contain'}}/>
			</TouchableOpacity>
		</View>
		{/* Bottom Sheet */}
		<Animated.View
		style={[
			styles.bottomSheet,
			{
			height: sheetHeight,
			transform: [{ translateY: height - sheetHeight  }],
			},
		]}
		{...panResponder.panHandlers}
		>
			<View style={styles.bottomSheetHandle} />
			<View style={styles.wrapperHeader}>
				<Text style={styles.textAllTransaction}>Transaksi Terbaru</Text>
			</View>
		{/* Isi Bottom Sheet */}
			{datas.map((value,key)=>{
					return (
						<View style={styles.contentWrapper} key={key}>
                            <Text style={styles.date}>{value.date}</Text>
                            {value?.transaction.map((value2, key2)=>{
                                return (
                                    <View style={styles.subContentWrapper} key={key2}>
                                        <IonIcons name={value2?.transaction?.label_name != 'Saldo Keluar' ? "arrow-down-circle-outline" :'arrow-up-circle-outline'} size={24} color={colors.primary}/>
                                        <View style={{flex:1,marginHorizontal:5}}>
                                            <Text style={styles.label}>{value2?.transaction?.label_name}</Text>
                                            <Text style={styles.desc}>{value2?.transaction?.desc}</Text>
                                            <Text style={[styles.status,value2?.transaction?.status != true && {color:colors.red}]}>{value2.transaction?.status == true ? 'Berhasil' :'Gagal'}</Text>
                                        </View>
                                        <View style={{width:'30%'}}>
                                            <Text style={[styles.amount,value2?.transaction?.label_name == 'Saldo Keluar'  && {color:colors.red}]}>{value2?.transaction?.amount_label}</Text>
                                        </View>
                                    </View>
                                )
                            })}
                        </View>
					)
				})}
		</Animated.View>
	</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.primary,
		alignItems: 'center',
	},
	logoContainer: {
		alignSelf: 'flex-start',
		margin: 12
	},
	logo: {
		width: 90,
		height: 20,
		tintColor: colors.white
	},
	text: {
		fontSize: 20,
		textAlign: 'center',
		marginBottom: 10,
	},
	balance: {
		fontSize: 30,
		fontWeight: 'bold',
	},
	blackText: {
		color: '#000',
	},
	divider: {
		height: 1,
		backgroundColor: colors.lightGray,
	},
	buttonRow: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	buttonContainer: {
		backgroundColor: colors.green,
		paddingHorizontal: 20,
		paddingVertical: 10,
		borderRadius: 5,
	},
	buttonText: {
		color: colors.white,
		fontSize: 16,
		fontFamily:fonts.PoppinsBold

	},
	bottomSheet: {
		backgroundColor: colors.white,
		borderTopRightRadius: 24,
		borderTopLeftRadius: 24,
		position: 'absolute',
		bottom: 0,
		width: '100%',
		padding: 12
	},
	bottomSheetHandle: {
		width: 40,
		height: 6,
		backgroundColor: colors.lightGray,
		borderRadius: 3,
		alignSelf: 'center',
		marginTop: 10,
	},
	contentWrapper:{
		borderBottomWidth:1,
		borderColor:colors.lightGray,
		paddingVertical:12
	},
	date:{
		fontSize:15,
		color:colors.gray,
		fontFamily:fonts.PoppinsMedium
	},
	subContentWrapper:{
		flexDirection:'row',
		justifyContent:'space-between',
	},
	label:{
		fontSize:15,
		color:colors.black,
		fontFamily:fonts.PoppinsSemibold
	},
	desc:{
		fontSize:12,
		color:colors.black,
		fontFamily:fonts.PoppinsRegular
	},
	status:{
		fontSize:12,
		color:colors.primary,
		fontFamily:fonts.PoppinsRegular
	},
	amount:{
		fontSize:15,
		color:colors.black,
		fontFamily:fonts.PoppinsSemibold,
		textAlign:'right'
	},
	contentContainerStyle:{
		paddingHorizontal:12,
		paddingBottom:100
	},
	wrapperHeader:{
        height:50,
        backgroundColor:colors.white,
        justifyContent:"center"
    },
    textAllTransaction:{
        fontFamily:fonts.PoppinsSemibold,
        color:colors.black,
        fontSize:18
    },
});

export default Wallet;
