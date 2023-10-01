import React, { useEffect, useState } from 'react';
import {SafeAreaView,StatusBar,View} from 'react-native';
import { commonStyles,textStyles } from '../../styles';
import CustomHeader from '../../components/CustomHeader';
import { colors, fonts } from '../../constants/theme';
import { useSelector } from 'react-redux';
import { getJobs } from '../../api';
import DataTable, { COL_TYPES } from 'react-native-datatable-component';
import { AppScreenWidth } from '../../constants/sacling';
    const CalendarScreen = ({navigation}) => {
    const [jobs , setJobs] = useState([])
        const {user} = useSelector(state => state.LoginReducer)
         useEffect(() => {
            getJobs(user.account_id).then((response) => {
                if(response.status === 200){
                    setJobs(response.data.result);
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
                        title={"Caclendar"}
                    />
                <View style={{flex:1}} >
                <DataTable 
                    data={jobs}
                    colNames={['Job Title', "Location", "Job Type" , "Date"]}
                    noOfPages={parseInt(jobs.length/10)}
                    onRowSelect={(item) => console.log(item, "ITemmm")}
                    colSettings={[
                        { name: 'Job Title', type: COL_TYPES.STRING }, 
                        { name: 'Location', type: COL_TYPES.STRING }, 
                        { name: 'Job Type', type: COL_TYPES.STRING },
                        { name: 'Date', type: COL_TYPES.STRING },
                    ]}
                
                /></View>
                </View>
            </SafeAreaView>
            
        );
    };


export default CalendarScreen;

