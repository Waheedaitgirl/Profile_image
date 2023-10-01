import React,{useEffect, useState} from 'react';
import {Text,SafeAreaView,ActivityIndicator, ScrollView,View,StyleSheet} from 'react-native';
import { commonStyles, textStyles } from '../../styles';
import CustomHeader from '../../components/CustomHeader';
import ExpansesItem from './ExpansesCard';
import { scale } from 'react-native-size-matters';
import { colors } from '../../constants/theme';
import { AppScreenWidth } from '../../constants/sacling';
import Spacer from '../../components/Spacer';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { getExpensesDetails } from '../../api';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import CustomStatusBar from '../../components/StatusBar';
import {SafeAreaProvider} from 'react-native-safe-area-context';
const Item = ({date, expense_type, bill_type , category, amount , filename, approver_comments,expense_comments }) => {
   
    return(
        <View style={styles.CardView}>
        <View style={styles.row}>
            <View>
                <Text style={styles.buleText} >Date:</Text>
                <Text style={styles.title} >{date}</Text>
            </View>
            <View>
                <Text style={styles.buleText} >Expense Type:</Text>
                <Text style={styles.title} >{expense_type}</Text>
            </View>
        </View>
        
        <View style={styles.row}>
            <View>
                <Text style={styles.buleText} >Bill Type:</Text>
                <Text style={styles.title} >{bill_type}</Text>
            </View>
            <View>
                <Text style={styles.buleText} >Category:</Text>
                <Text style={styles.title} >{category}</Text>
            </View>
          
        </View>
        
        <View style={styles.row}>
            <View>
                <Text style={styles.buleText} >Amount:</Text>
                <Text includeFontPadding={false} style={styles.ButtonText} >${amount}</Text>
            </View>
            <View>
                <Text style={styles.buleText} >File name:</Text>
                <Text ellipsizeMode={"middle"} numberOfLines={1} style={{...styles.title, width:widthPercentageToDP(40)}} >{filename}</Text>
            </View>
        </View>
        {
            approver_comments !== null && approver_comments !== "" &&
            <View style={styles.row}>
                
                <Text style={styles.buleText} >Approver Comment:</Text>
                <Text style={styles.title} >{approver_comments}</Text>
            </View>
        }
        {expense_comments !== null && expense_comments !== "" &&
        <View style={styles.row}>
            <View>
                <Text style={styles.buleText} >Expense Comment:</Text>
                <Text style={styles.title} >{expense_comments}</Text>
            </View>
        </View>
        }
      
    </View>
    )
}
    const ExpenseDetailsScreen = ({navigation, route}) => {
        let item = route.params.item
        const [logs, setLogs] = useState([])
        const {user} = useSelector(state => state.LoginReducer)
        const [isModalVisible, setModalVisible] = useState(false);
        const [error, setError] = useState(false)
        const [loading, setLoading] = useState(true)
        
        useEffect(() => {
            getExpensesDetails(user.account_id, item.expense_id)
            .then((response) => {
                if(response.status === 200){
                    console.log(response.data.logs);
                    setLoading(false)
                    setLogs(response.data.logs)
                }else{
                    setLoading(false)
                    setError(true)
                }
              
            }).catch((err) => {
                setLoading(false)
                setError(true)
                console.log(err, "Error");
            })
        },[])
        if(loading){
            return(
                <SafeAreaProvider>
                    <CustomStatusBar />
                    <View style={commonStyles.container} >
                        <CustomHeader 
                            show_backButton={true}
                            isdrawer={false}
                            onPress={() => navigation.goBack()}
                            title={"Details TimeSheet"}
                        />
                        <Spacer height={AppScreenWidth} />
                        <ActivityIndicator size={"large"} color={colors.dark_primary_color} />
                    </View>
                </SafeAreaProvider>
            )
        }
        if(error){
            return(
                <SafeAreaProvider>
                    <CustomStatusBar />
                    <View style={commonStyles.container} >
                        <CustomHeader 
                            show_backButton={true}
                            isdrawer={false}
                            onPress={() => navigation.goBack()}
                            title={"Details TimeSheet"}
                        />
                        <Spacer height={AppScreenWidth/2} />
                        <Image 
                            source={require("../../assets/images/error.gif")}
                            style={{
                                width:verticalScale(150), 
                                height:verticalScale(150),
                                resizeMode:"contain"
                            }} 
                        />
                    </View>
                </SafeAreaProvider>
            )
        }
        return (
            <SafeAreaProvider>
                <CustomStatusBar />
                <SafeAreaView style={commonStyles.container} >
                    <CustomHeader 
                        show_backButton={true}
                        isdrawer={false}
                        onPress={() => navigation.goBack()}
                        title={"Expense  Details"}
                    />
                <ScrollView showsVerticalScrollIndicator={false}>
                    <ExpansesItem 
                        item={item}
                        billtype={item.expense_report_title} 
                        company={item.type} 
                        status={"Approved"}
                        date={moment(item.created_date).format('DD-MMM-YYYY')}
                        job={item.job_title}
                        status_colour_code={item.status_colour_code}
                        price={`$ ${parseFloat(item.total_amount).toFixed(2)}`}
                        onPress={() => {navigation.navigate(MainRoutes.ExpenseDetailsScreen,{item:item})}}
                    />
                    {logs.map((item, index) => {
                            return(
                                <View key={`${index}`}>
                                    <Item
                                        date={item.expense_date} 
                                        expense_type={item.expense_type_name} 
                                        bill_type={item.expense_bill_type_name} 
                                        category={item.category_name} 
                                        amount={item.expense_amount} 
                                        approver_comments={item.approver_comments}
                                        expense_comments={item.expense_comments}
                                        filename={item.expense_receipt}
                                    />
                                </View>
                            )
                        })}
                    <Spacer  />
                
                    
                    </ScrollView>
                

                </SafeAreaView>
            </SafeAreaProvider>
        );
    };


export default ExpenseDetailsScreen;

const styles = StyleSheet.create({
    row:{
        flexDirection:"row", 
    },
    CardView:{
        elevation:2,
        alignSelf:"center",
        marginTop:10,
        backgroundColor:"#fff",
        borderRadius:scale(10),
        width:AppScreenWidth, 
        padding:scale(10),
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,

        elevation: 8,
    },
    buleText:{
        ...textStyles.smallheading,
        fontSize:scale(10),
        backgroundColor:"rgba(0,0,0,.1)",
        paddingLeft:5,
        paddingTop:0,
        paddingBottom:0,
        width:AppScreenWidth/2.1,
        color:colors.blue
    },
    ButtonText:{
        ...textStyles.title, 
        paddingHorizontal:0,
        includeFontPadding:false, 
        borderRadius:scale(5),
    },
    title:{
        ...textStyles.title,
        paddingLeft:5,
        marginBottom:scale(3)
    }
})

