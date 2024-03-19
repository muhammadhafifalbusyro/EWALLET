import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Image, SafeAreaView, TouchableOpacity, Dimensions, Animated, PanResponder } from 'react-native';
import { fonts, images } from '../../assets';
import { colors } from '../../utils';
import IonIcons from 'react-native-vector-icons/Ionicons'

const { height } = Dimensions.get('window');

const Wallet = () => {
  const [sheetHeight, setSheetHeight] = useState(height * 0.8);
  const [datas,setDatas] = useState([
    {
        id:1,
        date:'04 Februari 2024',
        transaction:[
            {
                id:1,
                label_id:1,
                label_name:'Isi Saldo',
                desc:'Isi saldo ke nomor + 628 77 87 berhasil',
                status_id:1,
                status_name:'Berhasil',
                amount_label:'+Rp 100.000',
                amount:100000
            }
        ]
    },
    {
        id:2,
        date:'05 Februari 2024',
        transaction:[
            {
                id:1,
                label_id:1,
                label_name:'Isi Saldo',
                desc:'Isi saldo ke nomor + 628 77 87 berhasil',
                status_id:1,
                status_name:'Berhasil',
                amount_label:'+Rp 100.000',
                amount:100000
            },
            {
                id:2,
                label_id:2,
                label_name:'Transfer Saldo',
                desc:'Transfer saldo ke nomor + 628 77 87 berhasil',
                status_id:1,
                status_name:'Berhasil',
                amount_label:'-Rp 100.000',
                amount:100000
            },
            {
                id:3,
                label_id:2,
                label_name:'Transfer Saldo',
                desc:'Transfer saldo ke nomor + 628 77 87 gagal',
                status_id:0,
                status_name:'Gagal',
                amount_label:'-Rp 100.000',
                amount:100000
            }
        ]
    },
    {
        id:3,
        date:'06 Februari 2024',
        transaction:[
            {
                id:1,
                label_id:1,
                label_name:'Isi Saldo',
                desc:'Isi saldo ke nomor + 628 77 87 berhasil',
                status_id:1,
                status_name:'Berhasil',
                amount_label:'+Rp 100.000',
                amount:100000
            }
        ]
    },
])
  

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
		<Text style={{ fontSize: 16, fontFamily: fonts.PoppinsBold, color: colors.white }}>Hallo, Hafif</Text>
		{/* Nomor Telepon */}
		<Text style={{ fontSize: 14, fontFamily: fonts.PoppinsRegular, color: colors.white }}>087787332901</Text>

		{/* Saldo Aktif */}
		<Text style={{ fontSize: 14, fontFamily: fonts.PoppinsRegular, color: colors.white }}>Saldo aktif yang kamu miliki</Text>
		{/* Jumlah Saldo */}
		<Text style={{ fontSize: 24, fontFamily: fonts.PoppinsBold, color: colors.white }}>Rp 5000</Text>
		{/* Divider */}
		<View style={{ width: '100%', padding: 12 }}>
			<View style={styles.divider} />
		</View>


		{/* Tombol Topup dan Send */}
		<View style={styles.buttonRow}>
		{/* Tombol Topup */}
		<TouchableOpacity style={styles.buttonContainer} onPress={() => alert('Topup clicked')}>
			<Text style={styles.buttonText}>Topup</Text>
		</TouchableOpacity>
		{/* Spacer */}
		<View style={{ width: 20 }} />
		{/* Tombol Send */}
		<TouchableOpacity style={styles.buttonContainer} onPress={() => alert('Send clicked')}>
			<Text style={styles.buttonText}>Send</Text>
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
		{/* Isi Bottom Sheet */}
			{datas.map((value,key)=>{
					return (
						<View style={styles.contentWrapper} key={key}>
							<Text style={styles.date}>{value.date}</Text>
							{value?.transaction.map((value2, key2)=>{
								return (
									<View style={styles.subContentWrapper} key={key2}>
										<IonIcons name={value2?.label_id == 1 ? "arrow-down-circle-outline" :'arrow-up-circle-outline'} size={24} color={colors.primary}/>
										<View style={{flex:1,marginHorizontal:5}}>
											<Text style={styles.label}>{value2.label_name}</Text>
											<Text style={styles.desc}>{value2.desc}</Text>
											<Text style={[styles.status,value2.status_id == 0 && {color:colors.red}]}>{value2.status_name}</Text>
										</View>
										<View style={{width:'30%'}}>
											<Text style={[styles.amount,value2?.label_id == 2 && {color:colors.red}]}>{value2.amount_label}</Text>
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
		color: '#fff',
		fontSize: 18,
		fontWeight: 'bold',
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
	}
});

export default Wallet;
