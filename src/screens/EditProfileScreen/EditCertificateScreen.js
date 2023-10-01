import axios from 'axios';
import moment from 'moment';
import React, {useReducer, useState} from 'react';
import {Alert, SafeAreaView, StatusBar, View} from 'react-native';
import {moderateScale, scale} from 'react-native-size-matters';
import {useSelector} from 'react-redux';
import CustomButton from '../../components/Button';
import CalenderInput from '../../components/DateInputMethod';
import Spacer from '../../components/Spacer';
import CustomTextInput from '../../components/TextInput';
import UpLoadComponent from '../../components/Uploadcomponent';
import {colors} from '../../constants/theme';
import {commonStyles} from '../../styles';

const EditCertificateScreen = ({navigation, route}) => {
  let item = route.params;
  const initialState = {
    certification_id: item.candidate_certification_id,
    certification_no: item.certification_no,
    credentials: item.credentials,
    expiry_date: item.expiry_date,
    upload_file: {
      name: item.document_link,
      mime_type: 'application/pdf',
      content: '',
    },
  };
  const [certificateData, dispatch] = useReducer(reducer, initialState);
  const {user, token} = useSelector(state => state.LoginReducer);
  const [filepath, setFilePath] = useState({
    name: '',
  });
  function reducer(state, action) {
    switch (action.type) {
      case 'certification_no':
        return {...state, certification_no: action.payload};
      case 'credentials':
        return {...state, credentials: action.payload};
      case 'expiry_date':
        return {...state, expiry_date: action.payload};
      default:
        return initialState;
    }
  }
  const editCertificate = () => {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append(
      'Authorization',
      'Bearer 4545980ce66bd555d903f7dc739f91e631606eb1',
    );
    // myHeaders.append('Cookie', 'PHPSESSID=o356k5uak3a7o7ds19ukqtru4s');

    var data = JSON.stringify({
      candidate_id: user.candidate_id,
      account_id: user.account_id,
      user_id: user.candidate_id,
      certification_id:certificateData.certification_no,
      certification_no: certificateData.certification_no,
      credentials: certificateData.credentials,
      expiry_date: certificateData.expiry_date,
      account_id: user.account_id,
      upload_file: {
        name: filepath.name,
        mime_type: `${filepath.ext}`,
        content: filepath.base64,
      },
    });

    let config = {
      method: 'put',
      
      url: `https://api.recruitbpm.com/certifications/${item.candidate_certification_id}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer 4545980ce66bd555d903f7dc739f91e631606eb1',
      },
      data: data,
    };

    axios
      .request(config)
      .then(response => {
       // console.log(response.data.data)
         Alert.alert('Certificate Edited succesfully');
        console.log(JSON.stringify(response));
      })
      .catch(error => {
         console.log(error)
        Alert.alert('There is some issue with your request');
      });
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.dark_primary_color}}>
      <StatusBar barStyle={'light-content'} />
      <View style={commonStyles.container}>
        <Spacer />
        <Spacer />
        <Spacer />
        <Spacer />
        <View style={{height: moderateScale(100)}} />
        <CustomTextInput
          placeholder={'Certificate Number'}
          value={certificateData.certification_no}
          borderWidth={1}
          lableColor={colors.dark_primary_color}
          borderRadius={scale(5)}
          onChangeText={text => {
            dispatch({type: 'certification_no', payload: text});
          }}
          errorMessage={''}
        />
        <CustomTextInput
          placeholder={'Certificate Credentials'}
          value={certificateData.credentials}
          borderWidth={1}
          lableColor={colors.dark_primary_color}
          borderRadius={scale(5)}
          onChangeText={text => {
            dispatch({type: 'credentials', payload: text});
          }}
          errorMessage={''}
        />

        <CalenderInput
          placeholder={'Expiry Date'}
          value={certificateData.expiry_date}
          errorMessage={''}
          onChangeText={date =>
            dispatch({
              type: 'expiry_date',
              payload: moment(new Date(date)).format('YYYY-MM-DD'),
            })
          }
        />
        <UpLoadComponent
          is_profile_image={false}
          title={'Upload Certificate File'}
          filepath={filepath}
          setFilePath={file => {
            setFilePath(file);
          }}
        />
        <Spacer />
        <Spacer />
        <Spacer />
        <Spacer />
        <CustomButton
          loading={false}
          loadingText={'Saving'}
          onPress={() => {
            editCertificate();
          }}
          text={'Save'}
        />
      </View>
    </SafeAreaView>
  );
};

export default EditCertificateScreen;
















// import React from 'react';
// import {SafeAreaView, StatusBar, View} from 'react-native';
// import CustomHeader from '../../components/CustomHeader';
// import {colors} from '../../constants/theme';
// import {commonStyles} from '../../styles';
// import {useSelector} from 'react-redux';


// const EditCertificateScreen = ({navigation ,}) => {
 
//   useEffect(() => {
//     onEditCertificate();
//   }, []);

//   const onEditCertificate = () => {
//     let config = {
//       method: 'patch',
//       maxBodyLength: Infinity,
//       url: 'https://api.recruitbpm.com/certifications/1914',
//       headers: { 
//         'Content-Type': 'application/json', 
//         'Authorization': 'Bearer 4545980ce66bd555d903f7dc739f91e631606eb1', 
//         'Cookie': 'PHPSESSID=0dl9djf2s6aajqcllff5np75a0'
//       },
//       data : data
//     };
//     axios.request(config)
//     .then(response => {
//       Alert.alert(response.data.message);
//       console.log(JSON.stringify(response.data));
//     })
//     .catch(error => {
//       Alert.alert('Ther is some issue with your request');
//     });
//   };
//   return (
//     <SafeAreaView style={{flex: 1, backgroundColor: colors.dark_primary_color}}>
//       <StatusBar barStyle={'light-content'} />
//       <View style={commonStyles.container}>
//         <CustomHeader
//           show_backButton={true}
//           isdrawer={false}
//           onPress={() => navigation.goBack()}
//           title={'Edit Certificate'}
//         />
//       </View>
//     </SafeAreaView>
//   );
// };

// export default EditCertificateScreen;
