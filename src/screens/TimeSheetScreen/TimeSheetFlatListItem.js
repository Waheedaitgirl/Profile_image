import React, {memo, useState} from "react"
import { View,Text, StyleSheet, TouchableOpacity } from "react-native"
import { scale, verticalScale } from "react-native-size-matters"
import { colors, fonts } from "../../constants/theme"
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Manager from '../../assets/images/Manager.svg'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { AppScreenWidth } from "../../constants/sacling"
import transform from 'css-to-react-native';
import DeleteModal from "../../components/DeleteModal"
import { DeleteTimeSheet } from "../../api"
const TimeSheetFlatListItem = memo(({name,item, time, submittedto,status_style, status, hours,onPress,onDelete, onEdit}) => {
    let arr = (status_style.split(";"))
    const [isVisible , setIsVisible] = useState(false)
    
    const DeleteItem = () => {
      
        setIsVisible(false)
        DeleteTimeSheet(item.time_sheet_id).then((response) => {
           if(response.status === 200){
            onDelete()
           }else{
            alert("error with stauts code", response.status)
           }
        }).catch((err) => {
            console.log(err);
            alert("error with stauts code 404")
        })
    }
    const ss = transform([
                [arr[0].split(":")[0].trim(),arr[0].split(":")[1].trim()],
                [arr[1].split(":")[0].trim(),arr[1].split(":")[1].trim()],
                [arr[2].split(":")[0].trim(),arr[2].split(":")[1].trim()]
            ])
   return(
        <TouchableOpacity 
            onPress={onPress}
            style={styles.mainView}>
            <View   
                style={styles.btnView}>
                <View style={{width:scale(20), height:scale(20)}} >
                    <AntDesign 
                        name="clockcircle" 
                        color={colors.dark_primary_color} 
                        size={scale(18)} 
                    />
                </View>
                <Text style={styles.textStyle}>{time}</Text>
            </View>
            <View   
                style={styles.btnView}>
                <View style={{width:scale(20), height:scale(20)}} >
                    <FontAwesome 
                        name="briefcase" 
                        color={colors.dark_primary_color} 
                        size={scale(18)} 
                    />
                </View>
                <Text style={styles.textStyle}>{name}</Text>
            </View>
            <View   
                style={styles.btnView}>
                <View style={{width:scale(20), height:scale(20)}} >
                    <FontAwesome 
                        name="user" 
                        color={colors.dark_primary_color} 
                        size={scale(18)} 
                    />
                </View>
                <Text style={styles.textStyle}>{submittedto}</Text>
            </View>
            {/* <View   
                style={styles.btnView}>
                <View style={{width:scale(20), height:scale(20)}} >
                    <FontAwesome 
                        name="users" 
                        color={colors.dark_primary_color} 
                        size={scale(18)} 
                    />
                </View>
                <Text style={styles.textStyle}>{submittedto}</Text>
            </View> */}
            <View   
                style={styles.btnView}>
                <View style={{width:scale(20), height:scale(20)}} >
                    <MaterialCommunityIcons 
                        name="lightning-bolt" 
                        color={colors.dark_primary_color} 
                        size={scale(18)} 
                    />
                </View>
                <Text style={[styles.textStyle,ss,{paddingHorizontal:8,fontSize:scale(11), paddingVertical:1,borderRadius:5,}]}>{status}</Text>
            </View>
            <View   
                style={styles.btnView}>
                <View style={{width:scale(20), height:scale(20)}} >
                    <AntDesign 
                        name="clockcircle" 
                        color={colors.dark_primary_color} 
                        size={scale(18)} 
                    />
                </View>
                <Text style={styles.textStyle}>{hours}</Text>
            </View>
        {
            status !== "Approved" && status !== "Rejected" &&
                <View style={styles.buttonView} >
                    { 
                        status !== "Submitted" && 
                        <TouchableOpacity onPress={onEdit} style={{...styles.actionButton}} >
                            <MaterialCommunityIcons name="clock-edit" color={colors.dark_primary_color} size={scale(22)} />
                        </TouchableOpacity>
                    }
                    
                    <TouchableOpacity onPress={() =>setIsVisible(true)} style={styles.actionButton}>
                        <MaterialCommunityIcons name="delete" color={colors.delete_icon} size={scale(22)} />
                    </TouchableOpacity>
                </View>
        }
        <DeleteModal 
            isVisible={isVisible}
            onCancel={() => setIsVisible(false)}
            onDelete={() => DeleteItem(false)}
        />
        </TouchableOpacity>
    )
})

export default TimeSheetFlatListItem

const styles = StyleSheet.create({
    mainView:{
        width:AppScreenWidth-scale(3), 
        marginHorizontal:scale(1.5),
        alignSelf:"center",
       
        shadowColor:colors.dark_primary_color,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,

        elevation: 4,
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
    }
})