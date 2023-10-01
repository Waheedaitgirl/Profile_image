import React, { useState } from "react";
import {View,Text,TouchableOpacity,StyleSheet} from 'react-native'
import { scale, verticalScale } from "react-native-size-matters";
import { AppScreenWidth, width } from "../constants/sacling";
import { colors, fonts } from "../constants/theme";
import Animated, {
   LightSpeedInRight, LightSpeedOutLeft, FadeOutDown, FadeInDown
  } from 'react-native-reanimated';
import DatePicker from 'react-native-date-picker'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { textStyles } from "../styles/textStyles";
import moment from 'moment'
const DateInputMethod = ({value,placeholder,errorMessage,labelColor=colors.dark_primary_color,onChangeText}) => {
    const [open, setOpen] = useState(false)
    const [date, setDate] = useState(new Date())
    
   
    return (
        <View style={styles.mainView} >
            
                <Animated.Text 
                    entering={FadeInDown} 
                    exiting={FadeOutDown}
                  
                    style={{...textStyles.Label,color:labelColor}}>
                        {placeholder}
                </Animated.Text>
           
          
            <View 
                style={{
                    flexDirection:"row", 
                    borderWidth:1,
                    borderColor:colors.divide_color,
                    padding:scale(7),
                    borderRadius:scale(5),
                    alignItems:"center",
                    justifyContent:"space-between",
                    backgroundColor:"rgba(0,0,0,0)"
                }} > 
                { 
                    value === "" 
                    ?  
                        <Text
                            style={{...textStyles.smallheading,fontSize:scale(13), color:colors.divide_color}}>
                            {placeholder}
                        </Text>  
                    :  
                        <Text
                            style={textStyles.smallheading}>
                            {value}
                        </Text> 
                } 
                       
                <TouchableOpacity 
                    onPress={() => setOpen(true)}
                    style={{ 
                        width:scale(30), 
                    
                        alignSelf:"flex-end",
                        borderTopRightRadius:5,
                        borderBottomRightRadius:5,
                        backgroundColor:"rgba(0,0,0,0)",
                        height:verticalScale(25),
                        justifyContent:"center",
                        alignItems:"center"
                    }} >
                    <FontAwesome name={"calendar"} size={scale(16)} color={colors.dark_primary_color}  />
                </TouchableOpacity>
            </View>
           
            { 
                errorMessage !== "" && 
                <Animated.Text 
                    entering={LightSpeedInRight} 
                    exiting={LightSpeedOutLeft}
                    style={textStyles.errorText}>
                        {errorMessage}
                </Animated.Text>
            }
            <DatePicker
                modal
               // androidVariant={"nativeAndroid"}
                open={open}
                date={date}
            
                //date={moment().format("YYYY-MM-DD")}
                mode={"date"}
                onConfirm={(date) => {
                setOpen(false)
                onChangeText(date)
                }}
                onCancel={() => {
                setOpen(false)
                }}
            />
        </View>
    )
};

export default DateInputMethod

const styles = StyleSheet.create({
        mainView:{
        paddingHorizontal:scale(10),
        paddingVertical:scale(1),
        width:AppScreenWidth+scale(20),
        borderRadius:3,
        borderWidth:0,
        marginTop:scale(5),
        borderColor:"rgba(0,0,0,.1)",
        justifyContent:"center",  
        backgroundColor:"#fff",
       
    }
})