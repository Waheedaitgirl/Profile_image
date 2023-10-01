import React, { useEffect, useState } from 'react';
import {SafeAreaView,StyleSheet, FlatList,Text,TouchableOpacity, StatusBar,View} from 'react-native';
import { commonStyles, textStyles } from '../../styles';
import CustomHeader from '../../components/CustomHeader';
import { colors, fonts } from '../../constants/theme';
import { useSelector } from 'react-redux';
import { AppScreenWidth, width } from '../../constants/sacling';
import Ionicons from 'react-native-vector-icons/Ionicons'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import Feather from 'react-native-vector-icons/Feather'
import { scale } from 'react-native-size-matters';
import RenderHtml from 'react-native-render-html';
    const JobApplyScreen = ({navigation, route}) => {
        const {user} = useSelector(state => state.LoginReducer)
        const [job , setjob] = useState(route.params.item)
        
        return (
            <SafeAreaView style={{flex:1, backgroundColor:colors.dark_primary_color}} >
                <StatusBar barStyle={"light-content"} />
                <View style={commonStyles.container} >
                    <CustomHeader 
                        show_backButton={true}
                        isdrawer={false}
                        onPress={() => navigation.goBack()}
                        title={job.JobTitle}
                    />
                    <View style={{flex:1}} >
                       {/* <View style={styles.CardView} >
                            <View style={styles.Row} >
                                <Ionicons name={"md-briefcase"} size={scale(16)} style={{marginRight:scale(10)}} color={colors.dark_primary_color} />
                                <Text style={textStyles.smallheading}>{job.JobTitle}</Text>
                            </View>
                            <View style={styles.Row} >
                                <Ionicons name={"md-location"} size={scale(16)} style={{marginRight:scale(10)}} color={colors.dark_primary_color} />
                                <Text style={textStyles.smallheading}>{job.Location}</Text>
                            </View>
                            <View style={styles.Row} >
                                <Ionicons name={"md-earth"} size={scale(16)} style={{marginRight:scale(10)}} color={colors.dark_primary_color} />
                                <Text style={textStyles.smallheading}>{job.country_name}</Text>
                            </View>
                            <View style={styles.Row} >
                                <Feather name={"type"} size={scale(16)} style={{marginRight:scale(10)}} color={colors.dark_primary_color} />
                                <Text style={textStyles.smallheading}>{job.JobType}</Text>
                            </View>
                            <View style={styles.Row} >
                                <Ionicons name={"md-calendar"} size={scale(16)} style={{marginRight:scale(10)}} color={colors.dark_primary_color} />
                                <Text style={textStyles.smallheading}>{job.Date}</Text>
                            </View>
                            <View style={styles.Row} >
                                <Ionicons name={"md-briefcase"} size={scale(16)} style={{marginRight:scale(10)}} color={colors.dark_primary_color} />
                                <Text style={textStyles.smallheading}>{job.job_recruiters} is recruiting for this job.</Text>
                            </View>
                          


                           
                            <View style={{...styles.Row, justifyContent:"space-between"}}>
                                <TouchableOpacity style={styles.IconTextView}>
                                    <Ionicons name={"md-mail"} size={scale(16)} style={{marginRight:scale(5)}} color={"#004f9f"} />
                                    <Text style={{...textStyles.icons_text, color:"#004f9f"}}>E-mail</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.IconTextView}>
                                    <Ionicons name={"logo-twitter"} size={scale(16)} style={{marginRight:scale(5)}} color={"#00acee"} />
                                    <Text style={{...textStyles.icons_text, color:"#00acee"}}>Tweet</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.IconTextView}>
                                    <Ionicons name={"md-logo-linkedin"} size={scale(16)} style={{marginRight:scale(5)}} color={"#0072b1"} />
                                    <Text style={{...textStyles.icons_text, color:"#0072b1"}}>Share</Text>
                                </TouchableOpacity>
                                
                            </View>

                            <View style={{...styles.Row, justifyContent:"space-between"}}>
                                <TouchableOpacity style={styles.IconTextView}>
                                    <Ionicons name={"md-logo-whatsapp"} size={scale(16)} style={{marginRight:scale(5)}} color={'#25D366'} />
                                    <Text style={{...textStyles.icons_text, color:"#25D366"}}>WhattsApp</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.IconTextView}>
                                    <Ionicons name={"md-logo-facebook"} size={scale(16)} style={{marginRight:scale(5)}} color={"#004f9f"} />
                                    <Text style={{...textStyles.icons_text, color:"#004f9f"}}>Like</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.IconTextView}>
                                    <EvilIcons name={"sc-google-plus"} size={scale(16)} style={{marginRight:scale(5)}} 
                                    color={"#db4139"} />
                                    <Text style={{...textStyles.icons_text, color:"#db4139"}}>Plus</Text>
                                </TouchableOpacity>                              
                            </View>
                            <Text style={{...textStyles.Label}}>Description</Text>
                           
                          
                       </View> */}
                        <RenderHtml
                            contentWidth={AppScreenWidth}
                            source={{html:`${job.job_description}`}}
                        />
                   
                    </View>
                </View>
            </SafeAreaView>
            
        );
    };


export default JobApplyScreen;

const styles = StyleSheet.create({
    CardView:{
        backgroundColor:"#fff",
        overflow:"hidden",
        width:width-10, 
        margin:5, 
        borderWidth:0, 
        borderRadius:5,  
        alignSelf:"center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.39,
        shadowRadius: 8.30,
        elevation: 13,
    },
    Row:{
        flexDirection:"row",
        paddingHorizontal:10,
        paddingVertical:5
    },
    ColumnLeft:{
        width:AppScreenWidth/2,
        paddingVertical:5, 
        paddingHorizontal:10, 
        borderRightWidth:1
    },
    ColumnRight:{
        width:AppScreenWidth/2, 
        paddingVertical:5, 
        paddingHorizontal:10
    },
    button:{
        width:width-14,
        justifyContent:"center",
        backgroundColor:colors.dark_primary_color,
        padding:10, 
        alignItems:"center", 
        flex:1, 
        borderBottomWidth:0
    },
    IconTextView:{
        flexDirection:"row", 
        justifyContent:"center", 
        alignItems:"center", 
        marginRight:scale(20)
    }
})

