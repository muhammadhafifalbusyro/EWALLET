import React,{useState,useEffect} from 'react';
import {View, Text, SafeAreaView, StyleSheet, ScrollView,Pressable} from 'react-native';
import {colors, dimens} from '../../utils';
import {fonts} from '../../assets';
import IonIcons from 'react-native-vector-icons/Ionicons'

const Activity = ({navigation, route}) => {
    const [months, setMonths] = useState([]);
    const [currentMonth,setCurrentMonth] = useState(1)
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

    const getMonthsArray = () => {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const currentDate = new Date();
        const currentMonthIndex = currentDate.getMonth();
        const prevMonthIndex = (currentMonthIndex - 1 + 12) % 12; // Handle wrapping around to previous year
        const nextMonthIndex1 = (currentMonthIndex + 1) % 12;
        const nextMonthIndex2 = (currentMonthIndex + 2) % 12;

        const currentMonth = { name: months[currentMonthIndex], id: currentMonthIndex + 1 };
        const prevMonth = { name: months[prevMonthIndex], id: prevMonthIndex + 1 };
        const nextMonth1 = { name: months[nextMonthIndex1], id: nextMonthIndex1 + 1 };
        const nextMonth2 = { name: months[nextMonthIndex2], id: nextMonthIndex2 + 1 };
      
        return [prevMonth, currentMonth, nextMonth1, nextMonth2];
    };

    useEffect(() => {
        setMonths(getMonthsArray());
    }, []);
      
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.textHeader}>Aktivitas</Text>
            </View>
            <View style={styles.monthWrapper}>
                {months.map((month,key) => (
                    <Pressable key={key} onPress={() => setCurrentMonth(key)}>
                        <View style={[styles.boxMonth,key == currentMonth && {borderBottomWidth:5,borderColor:colors.primary}]}>
                            <Text style={styles.textMonth}>{month.name}</Text>
                        </View>
                    </Pressable>
                ))}
            </View>
            <View style={styles.wrapperHeader}>
                <Text style={styles.textAllTransaction}>Semua Transaksi</Text>
            </View>
            <ScrollView showVerticalIndicator={false} style={styles.listContainer} contentContainerStyle={styles.contentContainerStyle}>
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
