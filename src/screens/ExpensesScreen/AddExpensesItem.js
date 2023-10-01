import React, {memo} from "react"
import { View,Text, StyleSheet, TouchableOpacity } from "react-native"
import { scale } from "react-native-size-matters"
import { colors, fonts } from "../../constants/theme"
import { AppScreenWidth } from "../../constants/sacling"
import MPerson from '../../assets/images/mperson.svg'
import Company from '../../assets/images/company.svg'
import Person from '../../assets/images/person.svg'
import Job from '../../assets/images/job.svg'
import Status from '../../assets/images/status.svg'
const AddExpensesItem = memo(({billtype, company, name,date, job, status=null,onPress}) => {
    return(
        <TouchableOpacity 
            onPress={onPress}
            style={styles.mainView}>
            <View   
                style={styles.btnView}>
                <View style={{width:scale(20), height:scale(20)}} >
                    <MPerson width={scale(20)} height={scale(20)} />
                </View>
                <Text style={styles.textStyle}>{billtype}</Text>
            </View>
            <View   
                style={styles.btnView}>
                <View style={{width:scale(20), height:scale(20)}} >
                    <Job width={scale(20)} height={scale(20)} />
                </View>
                <Text style={styles.textStyle}>{company}</Text>
            </View>
            <View   
                style={styles.btnView}>
                <View style={{width:scale(20), height:scale(20)}} >
                    <Company width={scale(20)} height={scale(20)} />
                </View>
                <Text style={styles.textStyle}>{name}</Text>
            </View>
            <View   
                style={styles.btnView}>
                <View style={{width:scale(20), height:scale(20)}} >
                    <Person width={scale(20)} height={scale(20)} />
                </View>
                <Text style={styles.textStyle}>{job}</Text>
            </View>
            <View   
                style={styles.btnView}>
                <View style={{width:scale(20), height:scale(20)}} >
                    <Person width={scale(20)} height={scale(20)} />
                </View>
                <Text style={styles.textStyle}>{date}</Text>
            </View>
            {
                status !== null &&
                <View  
                    style={styles.btnView}>
                    <View style={{width:scale(20), height:scale(20)}} >
                        <Status width={scale(20)} height={scale(20)} />
                    </View>
                    <Text style={styles.textStyle}>{status}</Text>
                </View>
            }
        </TouchableOpacity>
    )
})

export default AddExpensesItem

const styles = StyleSheet.create({
    mainView:{
        width:AppScreenWidth, 
        alignSelf:"center",
        elevation:2,
        backgroundColor:"#fefefe",
        marginVertical:scale(5),
        padding:scale(10),
        borderRadius:scale(10)
    },
    btnView: {
      
        marginBottom:scale(12),
        flexDirection: 'row',
        alignItems:"center"
    },
    textStyle: {
        marginLeft:scale(10), 
        fontFamily:fonts.Medium,
        color: colors.text_primary_color
    },
})