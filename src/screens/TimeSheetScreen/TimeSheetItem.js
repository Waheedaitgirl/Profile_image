import React, {memo} from "react"
import { View,Text, StyleSheet, TouchableOpacity } from "react-native"
import { scale } from "react-native-size-matters"
import { colors, fonts } from "../../constants/theme"
import { AppScreenWidth } from "../../constants/sacling"
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import transform from 'css-to-react-native';
const TimeSheetItem = memo(({name, time, submittedto, status,status_style, contactname}) => {
    let arr = (status_style.split(";"))
    const ss = transform([
                [arr[0].split(":")[0].trim(),arr[0].split(":")[1].trim()],
                [arr[1].split(":")[0].trim(),arr[1].split(":")[1].trim()],
                [arr[2].split(":")[0].trim(),arr[2].split(":")[1].trim()]
            ])
    return(
        <TouchableOpacity 
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
                        name="user" 
                        color={colors.dark_primary_color} 
                        size={scale(18)} 
                    />
                </View>
                <Text style={styles.textStyle}>{contactname}</Text>
            </View> */}
            <View   
                style={styles.btnView}>
                <View style={{width:scale(20), height:scale(20)}} >
                    <MaterialCommunityIcons 
                        name="lightning-bolt" 
                        color={colors.dark_primary_color} 
                        size={scale(20)} 
                    />
                </View>
                <Text style={[styles.textStyle,ss,{paddingHorizontal:10,fontSize:scale(12), paddingVertical:2,borderRadius:5,}]}>{status}</Text>
                
            </View>
           
        </TouchableOpacity>
    )
})

export default TimeSheetItem

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
    buttonView:{
        position:"absolute",
        bottom:scale(5),
        right:scale(5),
        height:scale(30),
        borderWidth:1,
        borderColor:colors.text_primary_color,
        borderRadius:5,
        justifyContent:"space-between",
        flexDirection:"row"
    },
    actionButton:{
        height:scale(30)-2, 
        paddingHorizontal:10, 
        alignItems:"center", 
        justifyContent:"center"
    }
})