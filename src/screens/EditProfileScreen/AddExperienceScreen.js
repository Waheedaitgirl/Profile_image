import axios from 'axios';
import moment from 'moment';
import React, {useReducer} from 'react';
import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  View,
  StyleSheet,
  // TextInput,
  // Keyboard
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {scale} from 'react-native-size-matters';
import Entypo from 'react-native-vector-icons/Entypo';
import {useSelector} from 'react-redux';
import CustomButton from '../../components/Button';
import CalenderInput from '../../components/DateInputMethod';
import CustomTextInput from '../../components/TextInput';
import {AppScreenWidth} from '../../constants/sacling';
import {colors, fonts} from '../../constants/theme';
import {commonStyles} from '../../styles';
import { create } from 'lodash';
const initialState = {
  candidate_employer: '',
  jobTitle: '',
  startDate: '',
  endDate: '',
  currentlyWorking: true,
  jobDuties: '',
};
const AddExperienceScreen = ({navigation}) => {
  const [experienceData, dispatch] = useReducer(reducer, initialState);
  const {user, token} = useSelector(state => state.LoginReducer);
  function reducer(state, action) {
    switch (action.type) {
      case 'candidate_employer':
        return {...state, candidate_employer: action.payload};
      case 'jobTitle':
        return {...state, jobTitle: action.payload};
      case 'startDate':
        return {...state, startDate: action.payload};
      case 'endDate':
        return {...state, endDate: action.payload};
      case 'jobDuties':
        return {...state, jobDuties: action.payload};
      case 'currentlyWorking':
        return {...state, currentlyWorking: action.payload};
      default:
        return initialState;
    }
  }
const handleKeyDown = ()=> 
{
  if(e.nativeEvent.key == "Enter"){
      dismissKeyboard();
  }
}
 
  const AddExperience = () => {
    var myHeaders = new Headers();
    myHeaders.append(
      'Authorization',
      'Bearer 4545980ce66bd555d903f7dc739f91e631606eb1',
    );
    myHeaders.append('Content-Type', 'application/json');

    var data = JSON.stringify({
      candidate_id: user.candidate_id,
      candidate_employer: experienceData.candidate_employer,
      job_title: experienceData.jobTitle,
      job_duties: experienceData.jobDuties,

      experience_start_date: experienceData.startDate,
      experience_end_date: experienceData.endDate,
      is_currently_working: experienceData.currentlyWorking?"1":"0",
    });

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://api.recruitbpm.com/experiences',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer 4545980ce66bd555d903f7dc739f91e631606eb1',
      
      },
      data: data,
    };

    axios
      .request(config)
      .then(response => {
        console.log(response);
        Alert.alert("Experience Added successfuly"); 
        //JSON.stringify(response.data.message
      })
      .catch(error => {
        console.log(error);
        Alert.alert('There is some issue with request. Please try agian later');
      });
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.white}}>
      <StatusBar barStyle={'light-content'} />
      <View style={commonStyles.container}>
        <ScrollView>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Image
              style={{
                width: wp(25),
                height: wp(25),
                marginVertical: wp(5),
                // tintColor:colors.dark_primary_color,
                borderRadius: wp(15),
              }}
              source={require('../../assets/images/job.png')}
            />
          </View>
          <CustomTextInput
            placeholder={'Company name'}
            value={experienceData.candidate_employer}
            borderWidth={1}
            lableColor={colors.dark_primary_color}
            borderRadius={scale(5)}
            onChangeText={text => {
              dispatch({type: 'candidate_employer', payload: text});
            }}
            errorMessage={''}
          />
          <CustomTextInput
            placeholder={'Job Title'}
            value={experienceData.jobTitle}
            borderWidth={1}
            
            lableColor={colors.dark_primary_color}
            borderRadius={scale(5)}
            onChangeText={text => {
              dispatch({type: 'jobTitle', payload: text});
            }}
            errorMessage={''}
          />
          <CalenderInput
            placeholder={'Start Date'}
            value={experienceData.startDate}
            errorMessage={''}
            onChangeText={date =>
              dispatch({
                type: 'startDate',
                payload: moment(new Date(date)).format('YYYY-MM-DD'),
              })
            }
          />

{!experienceData.currentlyWorking && (<CalenderInput
            placeholder={'End Date'}
            value={experienceData.endDate}
            errorMessage={''}
            onChangeText={date =>
              dispatch({
                type: 'endDate',
                payload: moment(new Date(date)).format('YYYY-MM-DD'),
              })
            }
          />)}

          <CustomTextInput
          // style = {{ 
          //   height:'400',fontSize : 100}}
            placeholder={'Job Duties'}
             value={experienceData.jobDuties}
            borderWidth={1}
            // height = '40'
            lableColor={colors.dark_primary_color}
             borderRadius={scale(5)}
            onChangeText={text => {
              dispatch({type: 'jobDuties', payload: text});
            }}
            errorMessage={''}
          />
          <View
            style={{
              width: AppScreenWidth,
              marginVertical: scale(15),
              alignSelf: 'center',
            }}>
            <Text
              style={{
                color: colors.dark_primary_color,
                fontFamily: fonts.Medium,
                fontSize: scale(12),
              }}>
              Currently Working
            </Text>
            <TouchableOpacity
              onPress={() => {
                dispatch({
                  type: 'currentlyWorking',
                  payload: !experienceData.currentlyWorking,
                });
              }}
              style={{
                width: scale(25),
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: experienceData.currentlyWorking
                  ? colors.dark_primary_color
                  : '#fff',
                height: scale(25),
                marginTop: scale(5),
                borderWidth: experienceData.currentlyWorking ? 0 : 1,
                borderRadius: scale(5),
                borderColor: '#0002',
              }}>
              {experienceData.currentlyWorking && (
                <Entypo name="check" color={'#fff'} size={scale(20)} />
              )}
            </TouchableOpacity>
          </View>
          <CustomButton
            loading={false}
            loadingText={'Saving'}
            onPress={() => AddExperience()}
            text={'Save'}
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default AddExperienceScreen;

// const styles = StyleSheet.create({
//   input : {
//     padding : 30,
//     width: wp(25),
//                 height: wp(25),
//   }

// });








// import axios from 'axios';
// import moment from 'moment';
// import React, {useReducer} from 'react';
// import {
//   Alert,
//   Image,
//   SafeAreaView,
//   ScrollView,
//   StatusBar,
//   Text,
//   View,
// } from 'react-native';
// import {TouchableOpacity} from 'react-native-gesture-handler';
// import {
//   heightPercentageToDP as hp,
//   widthPercentageToDP as wp,
// } from 'react-native-responsive-screen';
// import {scale} from 'react-native-size-matters';
// import Entypo from 'react-native-vector-icons/Entypo';
// import {useSelector} from 'react-redux';
// import CustomButton from '../../components/Button';
// import CalenderInput from '../../components/DateInputMethod';
// import CustomTextInput from '../../components/TextInput';
// import {AppScreenWidth} from '../../constants/sacling';
// import {colors, fonts} from '../../constants/theme';
// import {commonStyles} from '../../styles';
// const initialState = {
//   companyName: '',
//   jobTitle: '',
//   startDate: '',
//   endDate: '',
//   currentlyWorking: true,
//   jobDuties: '',
// };
// const AddExperienceScreen = ({navigation}) => {
//   const [experienceData, dispatch] = useReducer(reducer, initialState);
//   const {user, token} = useSelector(state => state.LoginReducer);
//   function reducer(state, action) {
//     switch (action.type) {
//       case 'companyName':
//         return {...state, companyName: action.payload};
//       case 'jobTitle':
//         return {...state, jobTitle: action.payload};
//       case 'startDate':
//         return {...state, startDate: action.payload};
//       case 'endDate':
//         return {...state, endDate: action.payload};
//       case 'jobDuties':
//         return {...state, jobDuties: action.payload};
//       case 'currentlyWorking':
//         return {...state, currentlyWorking: action.payload};
//       default:
//         return initialState;
//     }
//   }

//   const AddExperience = () => {
//     var myHeaders = new Headers();
//     myHeaders.append(
//       'Authorization',
//       'Bearer 4545980ce66bd555d903f7dc739f91e631606eb1',
//     );
//     myHeaders.append('Content-Type', 'application/json');

//     var data = JSON.stringify({
//       candidate_id: user?.candidate_id,
//       candidate_employer: user?.candidate_owner_id,
//       job_title: experienceData.jobTitle,
//       job_duties: experienceData.jobDuties,
//       experience_start_date: experienceData.startDate,
//       experience_end_date: experienceData.endDate,
//       is_currently_working: experienceData.currentlyWorking,
//     });

//     let config = {
//       method: 'post',
//       maxBodyLength: Infinity,
//       url: 'https://api.recruitbpm.com/experiences',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: 'Bearer 4545980ce66bd555d903f7dc739f91e631606eb1',
//         Cookie: 'PHPSESSID=vrp9dvjpod52nh5omdtb28gccj',
//       },
//       data: data,
//     };

//     axios
//       .request(config)
//       .then(response => {
//         console.log(response);
//         Alert.alert(JSON.stringify(response.data.message));
//       })
//       .catch(error => {
//         console.log(error);
//         Alert.alert('THere is some issue with request. Please try agian later');
//       });
//   };
//   return (
//     <SafeAreaView style={{flex: 1, backgroundColor: colors.white}}>
//       <StatusBar barStyle={'light-content'} />
//       <View style={commonStyles.container}>
//         <ScrollView>
//           <View
//             style={{
//               alignItems: 'center',
//               justifyContent: 'center',
//             }}>
//             <Image
//               style={{
//                 width: wp(25),
//                 height: wp(25),
//                 marginVertical: wp(5),
//                 // tintColor:colors.dark_primary_color,
//                 borderRadius: wp(15),
//               }}
//               source={require('../../assets/images/job.png')}
//             />
//           </View>
//           <CustomTextInput
//             placeholder={'Company name'}
//             value={experienceData.companyName}
//             borderWidth={1}
//             lableColor={colors.dark_primary_color}
//             borderRadius={scale(5)}
//             onChangeText={text => {
//               dispatch({type: 'companyName', payload: text});
//             }}
//             errorMessage={''}
//           />
//           <CustomTextInput
//             placeholder={'Job Title'}
//             value={experienceData.jobTitle}
//             borderWidth={1}
//             lableColor={colors.dark_primary_color}
//             borderRadius={scale(5)}
//             onChangeText={text => {
//               dispatch({type: 'jobTitle', payload: text});
//             }}
//             errorMessage={''}
//           />
//           <CalenderInput
//             placeholder={'Start Date'}
//             value={experienceData.startDate}
//             errorMessage={''}
//             onChangeText={date =>
//               dispatch({
//                 type: 'startDate',
//                 payload: moment(new Date(date)).format('YYYY-MM-DD'),
//               })
//             }
//           />

//           <CalenderInput
//             placeholder={'End Date'}
//             value={experienceData.endDate}
//             errorMessage={''}
//             onChangeText={date =>
//               dispatch({
//                 type: 'endDate',
//                 payload: moment(new Date(date)).format('YYYY-MM-DD'),
//               })
//             }
//           />

//           <CustomTextInput
//             placeholder={'Job Duties'}
//             value={experienceData.jobDuties}
//             borderWidth={1}
//             lableColor={colors.dark_primary_color}
//             borderRadius={scale(5)}
//             onChangeText={text => {
//               dispatch({type: 'jobDuties', payload: text});
//             }}
//             errorMessage={''}
//           />
//           <View
//             style={{
//               width: AppScreenWidth,
//               marginVertical: scale(15),
//               alignSelf: 'center',
//             }}>
//             <Text
//               style={{
//                 color: colors.dark_primary_color,
//                 fontFamily: fonts.Medium,
//                 fontSize: scale(12),
//               }}>
//               Currently Working
//             </Text>
//             <TouchableOpacity
//               onPress={() => {
//                 dispatch({
//                   type: 'currentlyWorking',
//                   payload: !experienceData.currentlyWorking,
//                 });
//               }}
//               style={{
//                 width: scale(25),
//                 justifyContent: 'center',
//                 alignItems: 'center',
//                 backgroundColor: experienceData.currentlyWorking
//                   ? colors.dark_primary_color
//                   : '#fff',
//                 height: scale(25),
//                 marginTop: scale(5),
//                 borderWidth: experienceData.currentlyWorking ? 0 : 1,
//                 borderRadius: scale(5),
//                 borderColor: '#0002',
//               }}>
//               {experienceData.currentlyWorking && (
//                 <Entypo name="check" color={'#fff'} size={scale(20)} />
//               )}
//             </TouchableOpacity>
//           </View>
//           <CustomButton
//             loading={false}
//             loadingText={'Saving'}
//             onPress={() => AddExperience()}
//             text={'Save'}
//           />
//         </ScrollView>
//       </View>
//     </SafeAreaView>
//   );
// };

// export default AddExperienceScreen;
