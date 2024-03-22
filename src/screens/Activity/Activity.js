import React,{useState,useEffect} from 'react';
import {View, Text, SafeAreaView, StyleSheet, ScrollView,Pressable, RefreshControl} from 'react-native';
import {colors, dimens} from '../../utils';
import {fonts} from '../../assets';
import IonIcons from 'react-native-vector-icons/Ionicons'
import { getAllActivity } from '../../services/Activity';

const Activity = ({navigation, route}) => {
    const [months, setMonths] = useState([]);
    const [currentMonth,setCurrentMonth] = useState(1)
    const [datas,setDatas] = useState([])
    const [loading,setLoading] = useState(false)

    const getMonthsArray = () => {
        const months = [['01','Jan'], ['02','Feb'],['03','Mar'], ['04','Apr'], ['05','Mei'], ['06','Jun'], ['07','Jul'],['08','Agu'],['09','Sep'], ['10','Okt'], ['11','Nov'], ['12','Des']];
        const currentDate = new Date();
        const currentMonthIndex = currentDate.getMonth();
        const prevMonthIndex = (currentMonthIndex - 1 + 12) % 12; // Handle wrapping around to previous year
        const nextMonthIndex1 = (currentMonthIndex + 1) % 12;
        const nextMonthIndex2 = (currentMonthIndex + 2) % 12;

        const currentMonth = { month: months[currentMonthIndex], id: currentMonthIndex + 1 };
        const prevMonth = { month: months[prevMonthIndex], id: prevMonthIndex + 1 };
        const nextMonth1 = { month: months[nextMonthIndex1], id: nextMonthIndex1 + 1 };
        const nextMonth2 = { month: months[nextMonthIndex2], id: nextMonthIndex2 + 1 };
      
        return [prevMonth, currentMonth, nextMonth1, nextMonth2];
    };


    const handlerGetActivity = async (month) => {
       
        const param ={
            month:month
        }
        console.log('param kirim',param)
        setLoading(true)
        const response = await getAllActivity(param)
        console.log("response get all activity", response)
        if(response?.data){
            setLoading(false)
            setDatas(response?.data)
        }else{
            setLoading(false)
            return false
        }
    }
    useEffect(()=>{
        setMonths(getMonthsArray());
    },[])
    useEffect(() => {
        
		setTimeout(() => {
            const month = months[currentMonth]?.month[0]
            handlerGetActivity(month)
            const unsubscribe = navigation.addListener('focus', () => {
                handlerGetActivity(month)
            });
	
		return unsubscribe;
        }, 500);
	  }, [navigation,currentMonth]);
      
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.textHeader}>Aktivitas</Text>
            </View>
            <View style={styles.monthWrapper}>
                {months.map((month,key) => (
                    <Pressable key={key} onPress={() => setCurrentMonth(key)}>
                        <View style={[styles.boxMonth,key == currentMonth && {borderBottomWidth:5,borderColor:colors.primary}]}>
                            <Text style={styles.textMonth}>{month?.month[1]}</Text>
                        </View>
                    </Pressable>
                ))}
            </View>
            <View style={styles.wrapperHeader}>
                <Text style={styles.textAllTransaction}>Semua Transaksi</Text>
            </View>
            <ScrollView showVerticalIndicator={false} style={styles.listContainer} contentContainerStyle={styles.contentContainerStyle} refreshControl={<RefreshControl refreshing={loading} onRefresh={()=>handlerGetActivity(currentMonth)}/>}>
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
            </ScrollView>
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header:{
        height:70,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:colors.white
    },
    textHeader:{
        fontFamily:fonts.PoppinsSemibold,
        color:colors.black,
        fontSize:24
    },
    monthWrapper:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        borderBottomWidth:1,
        borderColor:colors.lightGray,
        backgroundColor:colors.white,
    },
    boxMonth:{
        height:45,
        width: 60,
        justifyContent:'center',
        alignItems:'center',
    },
    textMonth:{
        fontFamily:fonts.PoppinsRegular,
        fontSize:15,
        color:colors.black
    },
    wrapperHeader:{
        paddingHorizontal:12,
        height:50,
        backgroundColor:colors.white,
        justifyContent:"center"
    },
    textAllTransaction:{
        fontFamily:fonts.PoppinsSemibold,
        color:colors.black,
        fontSize:18
    },
    listContainer:{
        backgroundColor:colors.white,
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
export default Activity;
