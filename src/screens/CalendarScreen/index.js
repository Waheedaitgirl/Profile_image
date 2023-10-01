import React, { useEffect, useState } from 'react';
import {SafeAreaView,StyleSheet,Image, FlatList,Text,TouchableOpacity, StatusBar,View} from 'react-native';
import { commonStyles, textStyles } from '../../styles';
import CustomHeader from '../../components/CustomHeader';
import { colors, fonts } from '../../constants/theme';
import { useSelector } from 'react-redux';
import { getJobs } from '../../api';
import { AppScreenWidth, width } from '../../constants/sacling';
import { scale, verticalScale } from 'react-native-size-matters';
    const CalendarScreen = ({navigation}) => {
    const [jobs , setJobs] = useState([])
        const {user} = useSelector(state => state.LoginReducer)
         useEffect(() => {
            getJobs(user.account_id,  user.candidate_id).then((response) => {
                    console.log(response.status);
                if(response.status === 200){
                    setJobs(response.data);
                }else{
                    alert("Error")
                }
            }).catch((err) => {
                console.log(err);
            })
         },[])
        
        return (
            <SafeAreaView style={{flex:1, backgroundColor:colors.dark_primary_color}} >
                <StatusBar barStyle={"light-content"} />
                <View style={commonStyles.container} >
                    <CustomHeader 
                        show_backButton={true}
                        isdrawer={true}
                        onPress={() => navigation.openDrawer()}
                        title={"New jobs opening"}
                    />
                    <View style={{flex:1}} >
                        <FlatList 
                            data={jobs}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({item, index}) => {
                                return(
                                    <View style={styles.CardView}>
                                        <View style={styles.Row}>
                                            <View style={styles.ColumnLeft} >
                                                <Text style={textStyles.title} >Job Title:</Text>
                                            </View>
                                            <View style={styles.ColumnRight} >
                                                <Text style={textStyles.title} >{item.job_title}</Text>
                                            </View>
                                        </View>

                                        <View style={styles.Row}>
                                            <View style={styles.ColumnLeft} >
                                                <Text style={textStyles.title} >Company name:</Text>
                                            </View>
                                            <View style={styles.ColumnRight} >
                                                <Text style={textStyles.title} >{item.company_name}</Text>
                                            </View>
                                        </View>

                                        <View style={styles.Row}>
                                            <View style={styles.ColumnLeft} >
                                                <Text style={textStyles.title} >Location:</Text>
                                            </View>
                                            <View style={styles.ColumnRight} >
                                                <Text style={textStyles.title} >{item.Location}</Text>
                                            </View>
                                        </View>

                                        <View style={styles.Row}>
                                            <View style={styles.ColumnLeft} >
                                                <Text style={textStyles.title} >Date:</Text>
                                            </View>
                                            <View style={styles.ColumnRight} >
                                                <Text style={textStyles.title} >{item.Date}</Text>
                                            </View>
                                        </View>

                                        <TouchableOpacity 
                                            onPress={() => navigation.navigate("JobApplyScreen", {item:item})}
                                            style={styles.button}>
                                           
                                            <Text style={{...textStyles.Label, color:"#fff"}} >Apply</Text>
                                          
                                        </TouchableOpacity>
                                    </View>
                                )
                            }}
                            ListEmptyComponent={() => {
                                return(
                                    <View style={{alignSelf:"center",marginTop:verticalScale(150), flex:1, justifyContent:"center", alignItems:"center"}} >
                                        <Image 
                                            source={require("../../assets/images/norecord.gif")}
                                            style={{
                                                width:verticalScale(150), 
                                                height:verticalScale(150),
                                                resizeMode:"contain"
                                            }} 
                                        />
                                      
                                    </View>
                                )
                            }}
                            windowSize={35}
                            getItemLayout={(filterdata, index) => {
                                return {
                                length: verticalScale(100),
                                offset: verticalScale(100) * filterdata.length,
                                index,
                                }
                            }}
                        />
                    </View>
                </View>
            </SafeAreaView>
            
        );
    };


export default CalendarScreen;

const styles = StyleSheet.create({
    CardView:{
        backgroundColor:"#fff",
        overflow:"hidden",
        width:width-10, 
        margin:5, 
        borderWidth:1, 
        borderColor:"rgba(0,0,0,.05)",
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
        borderBottomWidth:1,
        borderColor:"rgba(0,0,0,.05)",
    },
    ColumnLeft:{
        width:AppScreenWidth/2,
        paddingVertical:5, 
        justifyContent:"center",
        paddingHorizontal:10, 
        borderColor:"rgba(0,0,0,.05)",
        borderRightWidth:1
    },
    ColumnRight:{
        width:AppScreenWidth/2, 
        paddingVertical:5, 
        paddingHorizontal:10
    },
    button:{
        width:width-12,
        justifyContent:"center",
        backgroundColor:colors.dark_primary_color,
        padding:10, 
        alignItems:"center", 
        flex:1, 
        borderBottomWidth:0
    }
})

