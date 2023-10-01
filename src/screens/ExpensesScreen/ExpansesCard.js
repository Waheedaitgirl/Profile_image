import React, {memo, useState} from "react"
import { View,Text, StyleSheet, TouchableOpacity } from "react-native"
import { scale } from "react-native-size-matters"
import { colors, fonts } from "../../constants/theme"
import { AppScreenWidth } from "../../constants/sacling"
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Entypo from 'react-native-vector-icons/Entypo'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import transform from 'css-to-react-native';
import DeleteModal from '../../components/DeleteModal';
import { DeleteExpense } from '../../api';
const ExpansesItem = memo(({item, billtype, company, status,date,List, job,status_colour_code, price,onDelete, onPress}) => {
    let arr = (status_colour_code.split(";"))
    const [isVisible ,setIsVisible] = useState(false)
    const ss = transform([
                [arr[0].split(":")[0].trim(),arr[0].split(":")[1].trim()],
                [arr[1].split(":")[0].trim(),arr[1].split(":")[1].trim()],
                [arr[2].split(":")[0].trim(),arr[2].split(":")[1].trim()]
            ])
        const DeleteItem = () => {
            setIsVisible(false)
            DeleteExpense(item.expense_id).then((response) => {
                if(response.status == 200){
                    onDelete()
                }else{
                    alert("Error" + response.status);
                }
                
            }).catch((err) => {
                alert("Error" + err.status);
            })
        }
    return(
        <TouchableOpacity 
            onPress={List}
            style={styles.mainView}>
            <View   
                style={styles.btnView}>
                <View style={{width:scale(20), height:scale(20)}} >
                    <FontAwesome 
                        name="briefcase" 
                        color={colors.dark_primary_color} 
                        size={scale(18)} 
                    />
                </View>
                <Text style={styles.textStyle}>{job}</Text>
            </View>
            <View   
                style={styles.btnView}>
                <View style={{width:scale(20), height:scale(20)}} >
                    <MaterialCommunityIcons 
                        name="format-title" 
                        color={colors.dark_primary_color} 
                        size={scale(20)} 
                    />
                </View>
                <Text style={styles.textStyle}>{billtype}</Text>
            </View>
            {/* <View   
                style={styles.btnView}>
                <View style={{width:scale(20), height:scale(20)}} >
                    <FontAwesome 
                        name="user" 
                        color={colors.dark_primary_color} 
                        size={scale(18)} 
                    />
                </View>
                <Text style={styles.textStyle}>{company}</Text>
            </View> */}
            
           
            <View   
                style={styles.btnView}>
                <View style={{width:scale(20), height:scale(20)}} >
                    <Entypo 
                        name="calendar" 
                        color={colors.dark_primary_color} 
                        size={scale(20)}
                    />
                </View>
                <Text style={styles.textStyle}>{date}</Text>
            </View>
            {
                price !== null &&
                    <View   
                        style={styles.btnView}>
                        <View style={{width:scale(20),alignItems:"center", justifyContent:"center", height:scale(20)}} >
                            <FontAwesome5 
                                name="money-check-alt" 
                                color={colors.dark_primary_color} 
                                size={scale(15)}
                            />
                        </View>
                        <Text style={styles.pricetxt}>{price}</Text>
                    </View>
            }
            <View   
                style={styles.btnView}>
                <View style={{width:scale(20), height:scale(20)}} >
                    <MaterialCommunityIcons 
                        name="lightning-bolt" 
                        color={colors.dark_primary_color} 
                        size={scale(18)} 
                    />
                </View>
                <Text style={[styles.textStyle,ss,{
                      textAlign:"center",
                      borderRadius:scale(5),
                      fontSize:scale(10),
                      paddingVertical:scale(3),
                      paddingHorizontal:scale(10),
                      includeFontPadding:false,
                    }]}>{status}</Text>
            </View>
            {
            status !== "Approved" && status !== "Rejected"  && 
                <View style={styles.buttonView} >
                    { 
                        status !== "Submitted" && 
                        <TouchableOpacity onPress={onPress}  style={{...styles.actionButton}} >
                            <MaterialCommunityIcons 
                                name="clock-edit" 
                                color={colors.dark_primary_color} 
                                size={scale(22)} 
                            />
                        </TouchableOpacity>
                    }
                    <TouchableOpacity onPress={() => setIsVisible(true)}  style={styles.actionButton}>
                        <MaterialCommunityIcons name="delete" color={colors.delete_icon} size={scale(22)} />
                    </TouchableOpacity>
                </View>
            }
            <DeleteModal 
                isVisible={isVisible} 
                onCancel={() =>  setIsVisible(false)}
                onDelete={() => DeleteItem()}
            />
        </TouchableOpacity>
    )
})

export default ExpansesItem

const styles = StyleSheet.create({
    mainView:{
        width:AppScreenWidth, 
        alignSelf:"center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        backgroundColor:"#fefefe",
        marginVertical:scale(5),
        padding:scale(10),
        marginHorizontal:3,
        borderRadius:scale(10)
    },
    btnView: {
      
        marginBottom:scale(10),
        flexDirection: 'row',
        alignItems:"center"
    },
    textStyle: {
        marginLeft:scale(10), 
        fontFamily:fonts.Medium,
        color: colors.text_primary_color
    },
    buttonView:{
        position:"absolute",
        bottom:scale(5),
        right:scale(5),
        height:scale(30),
        borderWidth:0,
        borderColor:colors.text_primary_color,
        borderRadius:5,
        justifyContent:"space-between",
        flexDirection:"row"
    },
    actionButton:{
        height:scale(30)-2, 
        paddingHorizontal:scale(5), 
        alignItems:"center", 
        justifyContent:"center"
    },
    pricetxt:{
        marginLeft:scale(10), 
        fontFamily:fonts.Medium,
        color: colors.text_primary_color,
        backgroundColor:"#34CE44",
        color:"#fff",
        fontSize:scale(10),
        paddingVertical:scale(3),
        paddingHorizontal:scale(10),
        textAlign:"center",
        paddingHorizontal:scale(10),
        includeFontPadding:false,
        borderRadius:scale(5)
    }
})