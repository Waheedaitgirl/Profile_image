import React,{useEffect, useState} from 'react';
import {View,Text,StyleSheet,TouchableOpacity,SafeAreaView, ScrollView,Platform} from 'react-native';
import {NativeBaseProvider, Select } from "native-base";
import { useSelector } from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import CustomTextInput from '../../components/TextInput';
import { commonStyles,selectStyles, textStyles } from '../../styles';
import CustomHeader from '../../components/CustomHeader';
import { scale, verticalScale } from 'react-native-size-matters';
import { colors, fonts } from '../../constants/theme';
import { AppScreenWidth} from '../../constants/sacling';
import Spacer from '../../components/Spacer';
import CalenderInput from '../../components/CalenderInput';
import CustomButton from '../../components/Button';
import UpLoadComponent from "../../components/Uploadcomponent"
import {getEditExpensesDetails, getExpenseTypeCategoryBillType, EditExpense } from '../../api';
import BlockLoading from '../../components/BlockLoading';
import Entypo from 'react-native-vector-icons/Entypo'
import moment from 'moment';
import ErrorModal from '../../components/ErrorModal';
import SuccessModal from '../../components/SuccessModal';
import BaseUrl from '../../api/BaseUrl';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import CustomStatusBar from '../../components/StatusBar';
const MODULE_ID = '54'
    const EditExpenseScreen = ({navigation, route}) => {
        let item = route.params.item
    
        const {user} = useSelector(state => state.LoginReducer)
        const {status} = useSelector(state => state.StatusReducer)
        const [expense_status , setExpenseStatus] = useState(status.filter(obj => obj.module_id === MODULE_ID )) 
        const [submit , setSubmit] = useState(false)
        const [draft, setDraft] = useState(false)
        const [selected_job,set_selected_job] = useState(null)
        const [selected_job_error,set_selected_job_error] = useState(false)
        const [jobs , setJobs] = useState([])
        const [loading, setLoading ] = useState(true)
       
        const [expenses_report_title, setExpensesReportTitle] = useState(null);
        const [expenses_report_title_error, setExpensesReportTitle_error] = useState(false);

        const [bill_type , setBillType] = useState([])
        const [caregory , setCategoryType] = useState([])
        const [expensetype , setExpenseType] = useState([])
        const [All_Done , setAllDone] = useState(false)
        const [submissionError , setsubmissionError] = useState(false)
        const [expense_list , setExpenseList] = useState([
            {
                date:"",
                date_error:false,
                expense_category:"",
                expense_category_error:false,
                expense_type:"",
                expense_type_error:false,
                expense_bill_type:"",
                expense_bill_type_error:false,
                comments:"",
                amount:null,
                amount_error:false,
                filepath:{
                    path:null, ext:null, name:null
                },
                filepath_error:false,
            }
        ])

        useEffect(() => {
         
            //account_id, expense_id, job_id, candidate_id
            getEditExpensesDetails(user.account_id,item.expense_id,user.candidate_id).then((response) => {
                if(response.status === 200){
                    setJobs(response.data.jobs)
                    setBillType(response.data.expense_bill_types)
                    setCategoryType(response.data.categories)
                    setExpenseType(response.data.expenses_type)
                    setExpenseList(response.data.logs)
                    setExpensesReportTitle(response.data.logs[0].expense_report_title)
                    if(response.data.jobs.length === 1){
                        set_selected_job(response.data.jobs[0].job_id)
                    }
                }
                setLoading(false)
            }).catch((err) => {
                console.log(err);
            })
        },[])

       

        const Submit = (is_draft) => {
            let error = false
           if(selected_job == null){
                error = true
                set_selected_job_error(true)
                return;
           }
           if(expenses_report_title === null || expenses_report_title.trim().length < 1){
                error = true
                setExpensesReportTitle_error(true)
                set_selected_job_error(false)
                return;
           }
           let temp = [...expense_list]
           setExpensesReportTitle_error(false)
        
           temp.map((item, index) => {
                if(item.date === ""){
                    item.date_error = true;
                    error = true
                }
                if(item.expense_type === ""){
                    item.expense_type_error = true
                    error = true
                }
                if(item.expense_bill_type === ""){
                    item.expense_bill_type_error = true
                    error = true
                }
                if(item.expense_category === ""){
                    item.expense_category_error = true
                    error = true
                }
                if(item.amount === "" || item.amount < 1){
                    item.amount_error = true
                    error = true
                }
                if(item.filepath.path === null){
                        item.filepath_error = true
                        error = true
                }
                if(item.date !== ""){
                    item.date_error = false;
                }
                if(item.expense_type !== ""){
                    item.expense_type_error = false
                }
                if(item.expense_bill_type !== ""){
                    item.expense_bill_type_error = false
                }
                if(item.expense_category !== ""){
                    item.expense_category_error = false
                }
                if(item.amount !== "" || item.amount > 1){
                    item.amount_error = false
                }
                if(item.filepath.path !== null){
                        item.filepath_error = false
                }
           })
           setExpenseList(temp)
         
            if(!error){
                setLoading(true)
               let s_job = jobs.find(x => x.job_id = selected_job)
               let formdata  = new FormData()
               formdata.append("expense_report_title",expenses_report_title)
               formdata.append("job_id",selected_job)
               formdata.append("is_update","yes")
               formdata.append("expense_id",item.expense_id)
               formdata.append("placement_id",s_job.placement_id)
               formdata.append("module_status_id",is_draft
               ?
               expense_status.filter(obj => obj.module_status_name === 'Draft').map(o => o.module_status_id)[0]
               :
               expense_status.filter(obj => obj.module_status_name === 'Submitted').map(o => o.module_status_id)[0])
               formdata.append("type","employee")
               formdata.append("candidate_id",user.candidate_id)
               formdata.append("approver_id","0")
               formdata.append("account_id",user.account_id)
               formdata.append("user_id","0")
               expense_list.forEach((item, index) => {
                    formdata.append("logs[]",JSON.stringify({
                        "expense_date":moment(item.date).format("YYYY-MM-DD"),
                        "expense_category":item.expense_category,
                        "expense_type":item.expense_type,
                        "expense_bill_type":item.expense_bill_type,
                        "expense_comments":item.comments,
                        "expense_amount":item.amount
                    }))

                    formdata.append("expense_receipt[]",{
                        uri:
                            Platform.OS === 'android'
                            ? item.filepath.path
                            : item.filepath.path.replace('file://', ''),    
                        type: item.filepath.ext,
                        name: `${Date.now()}_${item.filepath.name}`,
                    })
               })
               var requestOptions = {
                method: 'POST',
                headers:{
                    "Authorization":"Bearer 4545980ce66bd555d903f7dc739f91e631606eb1",
                    'Content-Type': 'multipart/form-data; ',
                },
                body: formdata,
              };
              fetch(`${BaseUrl}expenses`, requestOptions)
              .then((data) => data.json()) 
              .then((response) => {
                console.log(response, "Response");
                  if(response.status){
                    setsubmissionError(false)
                  }else{
                    setsubmissionError(true)
                  }
                  setAllDone(true)
                  setLoading(false)
              }).catch((err) => {
                  console.log(err);
                  setLoading(false)
                  setsubmissionError(true)
                  setAllDone(true)
              })
                
            }
        }

        const fun_set_selected_job = (itemValue) => {
            setLoading(true)
            set_selected_job(itemValue)
            let result = jobs.find(obj =>obj.job_id === itemValue)
           
            getExpenseTypeCategoryBillType(user.account_id, result.company_id)
            .then((response) => {
                setLoading(false)
                if(response.status === 200){
                    setCategoryType(response.data.categories)
                    setExpenseType(response.data.expenses_type)
                    setBillType(response.data.expense_bill_types)
                }else{
                    alert("Some Error with stauts code" , response.status)
                }
            }).catch((err) => {
                console.log(err);
                setLoading(false)
            })
        }

        const addNewCard =  () => {
                const temp = [...expense_list]
                let obj =  {
                    date:"",
                    date_error:false,
                    expense_category:"",
                    expense_category_error:false,
                    expense_type:"",
                    expense_type_error:false,
                    expense_bill_type:"",
                    expense_bill_type_error:false,
                    comments:"",
                    amount:null,
                    amount_error:false,
                    filepath:{
                        path:null, ext:null, name:null
                    },
                    filepath_error:false,
                }
                temp.push(obj)
                setExpenseList(temp)
        }

        const deleteCard = (index) =>{
            if(expense_list.length> 1){
                let temp = [...expense_list]
                temp.splice(index, 1)
                setExpenseList(temp)
            }else{
                alert("Must have a least one item")
            }
        }

        useEffect(() => {

        },[expense_list])
        
        return (
            <SafeAreaProvider>
                <CustomStatusBar />
                <NativeBaseProvider>
                    <SafeAreaView style={commonStyles.container} >
                        <CustomHeader 
                            show_backButton={true}
                            isdrawer={false}
                            onPress={() => navigation.goBack()}
                            title={"Edit Expense"}
                        />
                        <ScrollView 
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={{paddingBottom:verticalScale(115)}} >
                        
                                <View style={{marginTop:scale(10)}}>
                                    <Text
                                        style={{...styles.label, marginLeft:scale(5)}}>
                                        Select Job
                                    </Text>
                                    <Spacer height={scale(3)} />
                                    <Select
                                        selectedValue={selected_job}
                                        isDisabled={jobs.length === 1 ? true :false}
                                        width={AppScreenWidth}
                                        placeholderTextColor={colors.text_primary_color}
                                    
                                        maxHeight={Platform.OS === "android"?"10":"20"}
                                        alignSelf={"center"}
                                        fontFamily={fonts.Medium}
                                        fontSize={scale(13)}
                                        placeholder="Please select  type"
                                        _item={selectStyles._item}
                                        _selectedItem={selectStyles._selectedItem}
                                        onValueChange={(itemValue) => {
                                            fun_set_selected_job(itemValue)
                                        }}>
                                        {
                                            jobs.map((item, index) => {
                                                return(
                                                    <Select.Item key={`${item.job_id}`} label={item.job_title} value={item.job_id} />
                                                )
                                            })
                                        }
                                    </Select>
                                    {selected_job_error && <Text style={{...textStyles.errorText, marginLeft:scale(5)}}>Please select job</Text>}
                                    <Spacer height={scale(3)} />
                                    <CustomTextInput
                                        placeholder={'Expenses Report Title'}
                                        value={expenses_report_title}
                                        borderWidth={1}
                                        lableColor={colors.dark_primary_color}
                                        borderRadius={scale(5)}
                                        onChangeText={text => setExpensesReportTitle(text)}
                                        errorMessage={""}
                                    />
                                    {expenses_report_title_error && <Text style={{...textStyles.errorText, marginLeft:scale(5)}}>Please enter title</Text> }
                                </View>
                                
                                <Spacer/>
                                {
                                    expense_list.map((item, index) => {
                                      
                                        return(
                                            <View key={`${index}`} style={styles.cardView} >
                                            <View style={styles.Row} >
                                            
                                                <View>
                                                    <Text
                                                        style={styles.label}>
                                                        Select Date
                                                    </Text>
                                            
                                                    <CalenderInput 
                                                        placeholder={"Expense Date"}
                                                        value={item.date}
                                                        errorMessage={""}
                                                        w={AppScreenWidth/2-scale(5)}
                                                        show_label={false}
                                                        hght={scale(40)}
                                                        onChangeText={(data) => {
                                                            let temp = [...expense_list]
                                                            temp[index].date = data
                                                            setExpenseList(temp)  
                                                        }}
                                                    />
                                                    {
                                                        item.date_error  &&
                                                        <Text
                                                            style={textStyles.errorText}>
                                                                Please select date
                                                        </Text>
                                                    }
                                                </View>
            
                                                <View>
                                                    <Text style={styles.label}>Expense type</Text>
                                                    <Spacer  height={scale(5)}  />
                                                    <Select
                                                        selectedValue={item.expense_type}
                                                        width={AppScreenWidth/2-scale(10)}
                                                        bg={"#fff"}
                                                        placeholderTextColor={colors.text_primary_color}
                                                    
                                                        fontFamily={fonts.Medium}
                                                        fontSize={scale(13)}
                                                        maxHeight={"10"}
                                                        accessibilityLabel="Select type"
                                                        placeholder="Select type"
                                                        _item={selectStyles._item}
                                                        _selectedItem={selectStyles._selectedItem}
                                                        onValueChange={(itemValue) => {
                                                            let temp = [...expense_list]
                                                            temp[index].expense_type = itemValue
                                                            setExpenseList(temp)  
                                                        }}>
                                                        {
                                                            expensetype.map((item, index) => {
                                                                return(
                                                                    <Select.Item key={`${index}`} label={item.name} value={item.id} />
                                                                )
                                                            })
                                                        }
                                                    </Select>
                                                    {
                                                        item.expense_type_error &&
                                                        <Text
                                                            style={textStyles.errorText}>
                                                                Please select expense type
                                                        </Text>
                                                    }
                                                </View>
                                            </View>
                                    
                                            <View style={styles.Row} >
                                                <View>
                                                    <Text
                                                        style={styles.label}>
                                                        Expense Bill type
                                                    </Text>
                                                    <Spacer  height={scale(5)}  />
                                                    <Select
                                                        selectedValue={item.expense_bill_type}
                                                        width={AppScreenWidth/2-scale(10)}
                                                        placeholderTextColor={colors.text_primary_color}
                                                        fontFamily={fonts.Medium}
                                                        fontSize={scale(13)}
                                                        maxHeight={"10"}
                                                        placeholder="Select type"
                                                        _item={selectStyles._item}
                                                        _selectedItem={selectStyles._selectedItem}
                                                        bg={"#fff"}
                                                        onValueChange={(itemValue) => { 
                                                            let temp = [...expense_list]
                                                            temp[index].expense_bill_type = itemValue
                                                            setExpenseList(temp)  
                                                                
                                                        }}>
                                                        {
                                                            bill_type.map((item, index) => {
                                                                return(
                                                                    <Select.Item key={`${index}`} label={item.name} value={item.id} />
                                                                )
                                                            })
                                                        }
                                                    </Select>
                                                    {
                                                        item.expense_bill_type_error &&
                                                        <Text
                                                            style={textStyles.errorText}>
                                                                Please select expense bill
                                                        </Text>
                                                    }
                                                </View>
                                                <View>
                                                    <Text
                                                        style={styles.label}>
                                                        Category type
                                                    </Text>
                                                    <Spacer  height={scale(5)}  />
                                                    <Select
                                                        selectedValue={item.expense_category}
                                                        width={AppScreenWidth/2-scale(10)}
                                                        placeholderTextColor={colors.text_primary_color}
                                                        fontFamily={fonts.Medium}
                                                        fontSize={scale(13)}
                                                        maxHeight={"10"}
                                                        bg={"#fff"}
                                                    
                                                        placeholder="Select category"
                                                        _item={selectStyles._item}
                                                        _selectedItem={selectStyles._selectedItem}
                                                    
                                                        onValueChange={(itemValue) => {                                                       
                                                                let temp = [...expense_list]
                                                                temp[index].expense_category = itemValue
                                                                setExpenseList(temp)
                                                            
                                                            }}>
                                                        
                                                        {
                                                            caregory.map((item, index) => {
                                                                return(
                                                                    <Select.Item key={`${index}`} label={item.name} value={item.id} />
                                                                )
                                                            })
                                                        }
                                                    </Select>
                                                    {
                                                        item.expense_category_error &&
                                                        <Text
                                                            style={textStyles.errorText}>
                                                                Please select category
                                                        </Text>
                                                    }
                                                </View>
                                            </View>


                                            <View>
                                                <CustomTextInput
                                                    placeholder={'Amount'}
                                                    value={item.amount}
                                                    borderWidth={1}
                                                    lableColor={colors.dark_primary_color}
                                                    borderRadius={scale(5)}
                                                    onChangeText={text => {
                                                        let temp = [...expense_list]
                                                        temp[index].amount = text
                                                        setExpenseList(temp)
                                                    }}
                                                    errorMessage={""}
                                                />
                                                {
                                                    item.amount_error && 
                                                    <Text
                                                        style={textStyles.errorText}>
                                                            Please select Amount
                                                    </Text> 
                                                }
                                            </View>

                                            <View>
                                                <CustomTextInput
                                                    placeholder={'Comments'}
                                                    value={item.comments}
                                                    borderWidth={1}
                                                    lableColor={colors.dark_primary_color}
                                                    borderRadius={scale(5)}
                                                    onChangeText={text => {
                                                        let temp = [...expense_list]
                                                        temp[index].comments = text
                                                        setExpenseList(temp)
                                                    }}
                                                    errorMessage={""}
                                                />
                                            </View>
                                            <View style={styles.Row} >
                                                <UpLoadComponent 
                                                    filepath={item.filepath}
                                                    setFilePath={(file) => {
                                                        console.log(file, "fileee");
                                                        let temp = [...expense_list]
                                                        temp[index].filepath = file
                                                        setExpenseList(temp)
                                                    }}
                                                    wdt={AppScreenWidth/1.2} 
                                                />
                                                <TouchableOpacity 
                                                
                                                    onPress={() =>deleteCard(index)}           
                                                    style={styles.deletebutton}>
                                                    <Entypo 
                                                        name={'cross'} 
                                                        color={"#fff"} 
                                                        size={scale(40)} />
                                                </TouchableOpacity>
                                            </View>
                                            {
                                            item.filepath_error && 
                                            <Text
                                                style={textStyles.errorText}>
                                                    Please select attachment
                                            </Text> 
                                            }
                                        
                                        </View>
                                    )})
                                }
                            
                                <Spacer/>
                            
                                <TouchableOpacity 
                                    onPress={() => addNewCard()}
                                    style={styles.button} >
                                        <FontAwesome name={"plus"} size={scale(16)} color={"#fff"} />
                                    
                                </TouchableOpacity>
                                
                                <Spacer/>
                        
                        </ScrollView>
                        <View style={styles.bottomView} >
                            <CustomButton
                                loading={submit}
                                loadingText={"Submitting"}
                                onPress={() => Submit(false)}
                                backgroundColor={"#0073B4"}
                                text={"Submit"}
                                marginTop={scale(10)}
                            />
                            <Spacer />
                            <CustomButton
                                loading={draft}
                                loadingText={"Saving"}
                                onPress={() =>Submit(true) }
                                text={"Save as a Draft"}
                                marginTop={scale(10)}
                            />
                        </View>
                        {
                            loading && 
                            <BlockLoading/>
                        }
                    </SafeAreaView>
                    {
                        All_Done
                        ?
                        submissionError ? 
                                <ErrorModal 
                                    isVisible={All_Done}
                                    title='Some Error in Updating Expense'
                                    onClose={() =>  setAllDone(false)}
                                /> 
                            : 
                                <SuccessModal 
                                    isVisible={All_Done}
                                    title='Expense Updated Successfully'
                                    onClose={() =>  setAllDone(false)}
                                /> 
                        :
                        null
                    }
                </NativeBaseProvider>
            </SafeAreaProvider>
        );
    };


export default EditExpenseScreen;

const styles = StyleSheet.create({
    Row:{
        flexDirection:"row",
        width:AppScreenWidth, 
        alignItems:"flex-end",
        justifyContent:"space-between",
        marginTop:5
    },
    cardView:{
        elevation:5,
        padding:scale(2.5), 
        margin:3,
        borderColor:colors.divide_color, 
        borderWidth:0,
        borderRadius:scale(5),marginVertical:scale(10),
        backgroundColor:"#fff"
    },
    label:{
        ...textStyles.smallheading , 
        fontSize:scale(12),
        color:colors.dark_primary_color,
       
    },
    button:{
        backgroundColor:"green",
        padding:scale(10),
        width:scale(60),
        alignItems:"center",
        flexDirection:"row",
        justifyContent:"center",
        alignSelf:"flex-start",
        borderWidth:1,
        
        borderColor:"rgba(0,0,0,.3)",
        borderRadius:scale(5)
    }, 
    text:{
        ...textStyles.smallheading,
        backgroundColor:"#0000",
        alignSelf:"flex-start", 
        includeFontPadding:false,
        color:"#fff",
        marginLeft:scale(5),
        textAlign:"left"
    },
    deletebutton:{
        width:scale(40), 
        marginRight:scale(5),
        height:scale(40),
        backgroundColor:colors.delete_icon,
        borderRadius:5,
        justifyContent:"center",
        alignItems:"center",
        borderWidth:0,
      
        marginBottom:scale(10)
        
    },
    bottomView:{
        position:"absolute", 
        justifyContent:"center", 
        alignItems:"center", 
        width:AppScreenWidth+scale(20),
        paddingVertical:10,
        backgroundColor:"#fff",
        alignSelf:"center", 
        bottom:10,
    }
})
