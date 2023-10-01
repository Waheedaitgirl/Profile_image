import axios from 'axios';
import React, { useState } from 'react';
import {
  Alert,
  Image,
  ScrollView,
  Text,
  View
} from 'react-native';
import { scale } from 'react-native-size-matters';
import CustomButton from '../../components/Button';
import CustomHeader from '../../components/CustomHeader';
import Spacer from '../../components/Spacer';
import CustomTextInput from '../../components/TextInput';
import { AuthRoutes } from '../../constants/routes';
import { AppScreenWidth, width } from '../../constants/sacling';
import { colors } from '../../constants/theme';
import { commonStyles, textStyles } from '../../styles';
const ResetPasswordScreen = ({navigation, route}) => {
  const candidate_auth_id = route?.params?.candidate_auth_id;
  const [is_api_error, set_api_error] = useState('');
  const [apiErrorMessage, setApiErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [newpassword, setNewPassword] = useState('');
  const [newpasswordErrorMessage, setNewPasswordErrorMessage] = useState('');
  const [confirm_newpassword, setConfirm_NewPassword] = useState('');
  const [confirm_newpasswordErrorMessage, setConfirm_NewPasswordErrorMessage] =
    useState('');
  const [loading, setLoading] = useState(false);
  const RequestCode = () => {

   
    // const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (newpassword.length <4) {
      setNewPasswordErrorMessage('Please enter password at least 4 characters');
    return;
    }
    if (confirm_newpassword === newpassword) {
      setSuccessMessage('Password is correct');
    } else {
      setConfirm_NewPasswordErrorMessage('Pasword mis-matched');
      return;
    }

    setLoading(true);
    setNewPasswordErrorMessage("");
    setConfirm_NewPasswordErrorMessage("");
    setSuccessMessage("");
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://api.recruitbpm.com/candidatemobilelogin?changepassword=1',
      headers: {
        Authorization: 'Bearer 4545980ce66bd555d903f7dc739f91e631606eb1',
        //   'Cookie': 'PHPSESSID=o074gvappb0ishmsln1trrb676',
        //   ...data.getHeaders()
      },
      data: {
        candidate_auth_id: candidate_auth_id,
        password: newpassword,
        confirm_newpassword: confirm_newpassword,
      },
    };

    axios
      .request(config)
      .then(response => {
        // console.log(response?.data)
        setLoading(false);
        if (response?.data?.status == true) {
        
          if (response.data?.status == true) {
            Alert.alert(`${response?.data?.message}`);
            navigation.replace(AuthRoutes.SignInScreen);
          } else {
            setApiErrorMessage(response?.data?.error);
            set_api_error(true);
          }
        } else {
          setApiErrorMessage(
            `Server Error ${response?.status} occured. Please try again`,
          );
          set_api_error(true);
        }
     
      })
      .catch(error => {
        setLoading(false);
        setApiErrorMessage(`Server Error  occured. Please try again`);
        set_api_error(true);
      });
  };
  return (
    <View style={commonStyles.container}>
      <CustomHeader
        show_backButton={true}
        onPress={() => navigation.navigate(AuthRoutes.VerifyCodeScreen)}
        isdrawer={false}
        title={'Password Reset'}
      />
      {/* <CustomHeader 
                    show_backButton={true}
                    onPress={() => navigation.navigate(AuthRoutes.SignInScreen)}
                    isdrawer={false}
                    title={"Restore password"}
                /> */}

      {/* <Spacer />
                <CustomTextInput
                    placeholder={'Old Password'}
                    value={oldpassword}
                    secureTextEntry={true}
                    onChangeText={text => setOldPassword(text)}
                    errorMessage={oldpasswordErrorMessage}
                /> */}

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          backgroundColor: '#fff',
          flexGrow: 1,
          alignItems: 'center',
        }}>
        <Image
          resizeMode={'cover'}
          resizeMethod={'resize'}
          style={{width: width}}
          source={require('../../assets/images/login.png')}
        />
        {/* <DrawLine height={0.6} /> */}
        <Spacer />

        <CustomTextInput
          placeholder={'New Password'}
          value={newpassword}
          secureTextEntry={true}
          onChangeText={text => setNewPassword(text)}
          errorMessage={newpasswordErrorMessage}
        />
        {/* <DrawLine height={0.6} /> */}
        <Spacer />
        <CustomTextInput
          placeholder={'Confirm New Password'}
          value={confirm_newpassword}
          secureTextEntry={true}
          onChangeText={text => setConfirm_NewPassword(text)}
          errorMessage={confirm_newpasswordErrorMessage}
        />
        <View style={{alignSelf: 'center', width: AppScreenWidth}}>
          {is_api_error ? (
            <Text style={{...textStyles.errorText, textAlign: 'left'}}>
              {apiErrorMessage}
            </Text>
          ) : null}
        </View>

        <Spacer />
        <View style={{width: width - scale(20), alignItems: 'flex-start'}}>
          <Text style={{...textStyles.title, color: colors.dark_primary_color}}>
            {successMessage}
          </Text>
        </View>
        <CustomButton
          onPress={() => RequestCode()}
          loading={loading}
          text={'Submit'}
          loadingText={'Processing'}
        />
      </ScrollView>
    </View>
  );
};

export default ResetPasswordScreen;















// {........... ................. ............ .................... ................. ............. ......... ......}

// import React, {useState} from 'react';
// import {
//   SafeAreaView,
//   View,
//   StyleSheet,
//   Text,
//   Image,
//   ScrollView,
//   Alert,
// } from 'react-native';
// import CustomTextInput from '../../components/TextInput';
// import {AppScreenWidth} from '../../constants/sacling';
// import {width} from '../../constants/sacling';
// import DrawLine from '../../components/DrawLine';
// import CustomHeader from '../../components/CustomHeader';
// import {commonStyles, textStyles} from '../../styles';
// import CustomButton from '../../components/Button';
// import {AuthRoutes} from '../../constants/routes';
// import {scale} from 'react-native-size-matters';
// import Spacer from '../../components/Spacer';
// import {colors} from '../../constants/theme';
// import {useDispatch} from 'react-redux';
// import axios from 'axios';
// const ResetPasswordScreen = ({navigation, route}) => {
//   const candidate_auth_id = route?.params?.candidate_auth_id;
//   const [is_api_error, set_api_error] = useState('');
//   const [apiErrorMessage, setApiErrorMessage] = useState('');
//   const [successMessage, setSuccessMessage] = useState('');
//   const [newpassword, setNewPassword] = useState('');
//   const [newpasswordErrorMessage, setNewPasswordErrorMessage] = useState('');
//   const [confirm_newpassword, setConfirm_NewPassword] = useState('');
//   const [confirm_newpasswordErrorMessage, setConfirm_NewPasswordErrorMessage] =
//     useState('');
//   const [loading, setLoading] = useState(false);
//   const RequestCode = () => {
//     const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
//     if (!reg.test(newpassword.trim().length < 4)) {
//       setNewPasswordErrorMessage('Please enter password at least 4 characters');
//     }
//     if (confirm_newpassword == newpassword) {
//       setSuccessMessage('Password is correct');
//     } else {
//       setConfirm_NewPasswordErrorMessage('Pasword mis-matched');
//     }

//     setLoading(true);
//     let config = {
//       method: 'post',
//       maxBodyLength: Infinity,
//       url: 'https://api.recruitbpm.com/candidatemobilelogin?changepassword=1',
//       headers: {
//         Authorization: 'Bearer 4545980ce66bd555d903f7dc739f91e631606eb1',
//         //   'Cookie': 'PHPSESSID=o074gvappb0ishmsln1trrb676',
//         //   ...data.getHeaders()
//       },
//       data: {
//         candidate_auth_id: candidate_auth_id,
//         password: newpassword,
//         confirm_newpassword: confirm_newpassword,
//       },
//     };

//     axios
//       .request(config)
//       .then(response => {
//         // console.log(response?.data)
//         setLoading(false);
//         if (response?.data?.status == true) {
//           console.log(response);
//           if (response.data?.status == true) {
//             Alert.alert(`${response?.data?.message}`);
//             navigation.replace(AuthRoutes.SignInScreen);
//           } else {
//             setApiErrorMessage(response?.data?.error);
//             set_api_error(true);
//           }
//         } else {
//           setApiErrorMessage(
//             `Server Error ${response?.status} occured. Please try again`,
//           );
//           set_api_error(true);
//         }
//         // else
//         // Alert.alert(`${response?.data?.error}`);
//       })
//       .catch(error => {
//         console.log(error);
//         setLoading(false);
//         setApiErrorMessage(`Server Error  occured. Please try again`);
//         set_api_error(true);
//       });
//   };
//   return (
//     <View style={commonStyles.container}>
//       <CustomHeader
//         show_backButton={true}
//         onPress={() => navigation.navigate(AuthRoutes.VerifyCodeScreen)}
//         isdrawer={false}
//         title={'Password Reset'}
//       />
//       {/* <CustomHeader 
//                     show_backButton={true}
//                     onPress={() => navigation.navigate(AuthRoutes.SignInScreen)}
//                     isdrawer={false}
//                     title={"Restore password"}
//                 /> */}

//       {/* <Spacer />
//                 <CustomTextInput
//                     placeholder={'Old Password'}
//                     value={oldpassword}
//                     secureTextEntry={true}
//                     onChangeText={text => setOldPassword(text)}
//                     errorMessage={oldpasswordErrorMessage}
//                 /> */}

//       <ScrollView
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={{
//           backgroundColor: '#fff',
//           flexGrow: 1,
//           alignItems: 'center',
//         }}>
//         <Image
//           resizeMode={'cover'}
//           resizeMethod={'resize'}
//           style={{width: width}}
//           source={require('../../assets/images/login.png')}
//         />
//         {/* <DrawLine height={0.6} /> */}
//         <Spacer />

//         <CustomTextInput
//           placeholder={'New Password'}
//           value={newpassword}
//           secureTextEntry={true}
//           onChangeText={text => setNewPassword(text)}
//           errorMessage={newpasswordErrorMessage}
//         />
//         {/* <DrawLine height={0.6} /> */}
//         <Spacer />
//         <CustomTextInput
//           placeholder={'Confirm New Password'}
//           value={confirm_newpassword}
//           secureTextEntry={true}
//           onChangeText={text => setConfirm_NewPassword(text)}
//           errorMessage={confirm_newpasswordErrorMessage}
//         />
//         <View style={{alignSelf: 'center', width: AppScreenWidth}}>
//           {is_api_error ? (
//             <Text style={{...textStyles.errorText, textAlign: 'left'}}>
//               {apiErrorMessage}
//             </Text>
//           ) : null}
//         </View>

//         <Spacer />
//         <View style={{width: width - scale(20), alignItems: 'flex-start'}}>
//           <Text style={{...textStyles.title, color: colors.dark_primary_color}}>
//             {successMessage}
//           </Text>
//         </View>
//         <CustomButton
//           onPress={() => RequestCode()}
//           loading={loading}
//           text={'Submit'}
//           loadingText={'Processing'}
//         />
//       </ScrollView>
//     </View>
//   );
// };

// export default ResetPasswordScreen;



// {................................................................ ........ .........}

// import {
//   SafeAreaView,
//   View,
//   StyleSheet,
//   Text,
//   Image,
//   ScrollView,
//   Alert,
// } from 'react-native';
// import CustomTextInput from '../../components/TextInput';
// import {width} from '../../constants/sacling';
// import DrawLine from '../../components/DrawLine';
// import CustomHeader from '../../components/CustomHeader';
// import {commonStyles, textStyles} from '../../styles';
// import CustomButton from '../../components/Button';
// import {AuthRoutes} from '../../constants/routes';
// import {scale} from 'react-native-size-matters';
// import Spacer from '../../components/Spacer';
// import {colors} from '../../constants/theme';
// import {useDispatch} from 'react-redux';
// import axios from 'axios';
// const ResetPasswordScreen = ({navigation, route}) => {
//   const candidate_auth_id = route?.params?.candidate_auth_id;
//   const [oldpassword, setOldPassword] = useState('');
//   const [oldpasswordErrorMessage, setOldPasswordErrorMessaage] = useState('');
//   const [password, setPassword] = useState(''); //123456
//   const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
//   const [newpassword, setNewPassword] = useState('');
//   // const [currentpasswordErrorMessage, setCurrentPasswordErrorMessage] =
//   //   useState('');
//   const [confrim_newpassword, confrim_setnewPassword] = useState('');
//   const [
//     confrim_currentpasswordErrorMessage,
//     confrim_setCurrentPasswordErrorMessage,
//   ] = useState('');
//   const [loading, setLoading] = useState(false);
//   //     const ResetPasswordScreen = ({navigation}) => {
//   //         const [email_address, setEmailAddress] = useState("")
//   //         const [email_addressErrorMessage, setUseremailErrorMessaage] = useState("")
//   //         const [successMessage, setSuccessMessage] = useState('')
//   //         const [disable, setDisable] = useState(false)
//   // const [loading ,setLoading] = useState(false);
//   //         const [is_api_error,  set_api_error] = useState("")
//   //         const [data,setData]= useState([]);
//   //         const[email,setEmail]=useState('');
//   //         const dispatch = useDispatch();
//   //   const  userLogin = (data) => dispatch(Login(data))
//   const RequestCode = () => {
//     const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
//     if (!reg.test(password.trim().length < 4)) {
//       Message.message('Please enter password at least 4 characters');
//       // setUseremailErrorMessaage('');
//       setPasswordErrorMessage('Please enter password at least 4 characters');
//     } else {
//       if (confrim_newpassword == newpassword) {
//         let config = {
//           method: 'post',

//           maxBodyLength: Infinity,
//           url: 'https://api.recruitbpm.com/candidatemobilelogin?changepassword=1',
//           headers: {
//             Authorization: 'Bearer 4545980ce66bd555d903f7dc739f91e631606eb1',
//             //   'Cookie': 'PHPSESSID=o074gvappb0ishmsln1trrb676',
//             //   ...data.getHeaders()
//             // userpassword:password,
//             // type:"candidate"
//           },
//           data: {candidate_auth_id: candidate_auth_id, password: password},
//         };

//         axios
//           .request(config)
//           .then(response => {
//             if (response.data?.status == true) {
//               Alert.alert(`${response?.data?.message}`);
//               navigation.replace(AuthRoutes.SignInScreen);
//             } else Alert.alert(`${response?.data?.error}`);
//           })
//           .catch(error => {
//             console.log(error);
//           });
//       } else {
//         Alert.alert('confirmed password & new password are not equal');
//       }
//     }

//     //     const Passwordvalidity = value => {
//     //       const whitespace = /^\S*$/;
//     //       if(!whitespace.test(value)){
//     //         return 'Password must not contain whitespace';
//     //       }
//     //       const isConatainUppercase = /^(?=.*[A-Z]).*$/;
//     //       if(isConatainUppercase.test(value)){
//     //         return 'Password must have at least one Uppercase Character';
//     //       }
//     //       const isContainLowercase = /^(?.=*[a-z].*$)/;
//     //       if(isContainLowercase.test(value)){
//     //         return 'Password must have at least one Lowercase character';
//     //       }
//     //       const isContainNumber = /^(?=.*[0-9]).*$/;
//     //       if(!isContainNumber.test(value)){
//     //         return 'Password must contin at least one Digit';
//     //       }
//     //       const isValidLength = /^.{4,16}$/;
//     //       if(!isValidLength.test(value)){
//     //         return ' Please Enter your password 4-16 characters long. '
//     //       }
//     //      return null ;
//     //     } ;

//     // const handleSubmit = () =>
//     // {
//     //   const checkPassword = Passwordvalidity(password);
//     //   if(!checkPassword){
//     //     alert('sucessfuly submit')
//     //   }else{
//     //     alert(checkPassword);
//     //   }
//     // }
//     // const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
//     // if (!reg.test(email_address.trim())) {
//     //   setUseremailErrorMessaage('Please enter valid email');
//     //   setPasswordErrorMessage('');
//     //   return;
//     // }
//     // if (!reg.test(password.trim().length < 4)) {
//     //    Message.message('Please enter password at least 4 characters')
//     //   // setUseremailErrorMessaage('');
//     //    setPasswordErrorMessage('Please enter password at least 4 characters');
//     //   return;
//     // }

//     // setLoading(true);
//     // setPasswordErrorMessage('');
//     // // // setUseremailErrorMessaage('');
//   };
//   return (
//     <View style={commonStyles.container}>
//       <CustomHeader
//         show_backButton={true}
//         onPress={() => navigation.navigate(AuthRoutes.VerifyCodeScreen)}
//         isdrawer={false}
//         title={'Password Reset'}
//       />
//       {/* <CustomHeader
//                     show_backButton={true}
//                     onPress={() => navigation.navigate(AuthRoutes.SignInScreen)}
//                     isdrawer={false}
//                     title={"Restore password"}
//                 /> */}

//       {/* <Spacer />
//                 <CustomTextInput
//                     placeholder={'Old Password'}
//                     value={oldpassword}
//                     secureTextEntry={true}
//                     onChangeText={text => setOldPassword(text)}
//                     errorMessage={oldpasswordErrorMessage}
//                 /> */}

//       <ScrollView
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={{
//           backgroundColor: '#fff',
//           flexGrow: 1,
//           alignItems: 'center',
//         }}>
//         <Image
//           resizeMode={'cover'}
//           resizeMethod={'resize'}
//           style={{width: width}}
//           source={require('../../assets/images/login.png')}
//         />
//         <DrawLine height={0.6} />
//         <Spacer />
//         <CustomTextInput
//           placeholder={'New Password'}
//           value={newpassword}
//           secureTextEntry={true}
//           onChangeText={text => setNewPassword(text)}
//           />
//            {/* errorMessage={currentpasswordErrorMessage} */}

//         {/*
//                <CustomTextInput
//                     placeholder={'Enter your email'}
//                     value={email_address}
//                     secureTextEntry={false}
//                     onChangeText={text => setEmailAddress(text)}
//                     errorMessage={email_addressErrorMessage}
//                 /> */}
//         <CustomTextInput
//           placeholder={'Confrim New Password'}
//           value={confrim_newpassword}
//           secureTextEntry={true}
//           onChangeText={text => confrim_setnewPassword(text)}
//           // errorMessage={confrim_newpasswordErrorMessage}
//         />

//         <CustomButton
//           onPress={() => RequestCode()}
//           text={'Submit'}
//           loadingText={'Processing'}
//           loading={loading}
//         />
//         //{' '}
//         <View style={{width: width - scale(20), alignItems: 'flex-start'}}>
//           //{' '}
//           {/* <Text style={{...textStyles.title, color:colors.dark_primary_color}}>
//         //          {successMessage}
//         //         </Text> */}
//           //{' '}
//         </View>
//         //{' '}
//         {/* <View style={{height:scale(20)}} />

//         //         <CustomButton
//         //             onPress={() => RequestCode()}
//         //             loading={loading}
//         //             text={"Request code"}
//         //             loadingText={"Processing"}
//         //         /> */}
//       </ScrollView>
//     </View>
//   );
// };

// export default ResetPasswordScreen;
