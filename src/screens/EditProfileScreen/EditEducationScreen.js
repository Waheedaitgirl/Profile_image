import axios from 'axios';
import moment from 'moment';
import {NativeBaseProvider, Select} from 'native-base';
import React, {useReducer} from 'react';
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  View,
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
import {commonStyles, selectStyles} from '../../styles';
const EditEducationScreen = ({navigation, route}) => {
  let item = route.params;
  const initialState = {
    education_id: item.candidate_education_id,
    degreeLevel: item.education_level,
    degreeTitle: item.education_title,
    startDate: item.education_start_date,
    endDate: item.education_end_date,
    educationDetails: item.education_details,
    currentlyWorking: item.is_currently_working,
  };
  const [educationData, dispatch] = useReducer(reducer, initialState);
  const {user, token} = useSelector(state => state.LoginReducer);
  function reducer(state, action) {
    switch (action.type) {
      case 'degreeLevel':
        return {...state, degreeLevel: action.payload};
      case 'degreeTitle':
        return {...state, degreeTitle: action.payload};
      case 'startDate':
        return {...state, startDate: action.payload};
      case 'endDate':
        return {...state, endDate: action.payload};
        z;
      case 'educationDetails':
        return {...state, educationDetails: action.payload};
      case 'currentlyWorking':
        return {...state, currentlyWorking: action.payload};
      default:
        return initialState;
    }
  }

  const editEducation = () => {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append(
      'Authorization',
      'Bearer 4545980ce66bd555d903f7dc739f91e631606eb1',
    );

    let data = JSON.stringify({
      candidate_id: user.candidate_id,

      education_title: educationData.degreeTitle,
      education_level: educationData.degreeLevel,
      education_details: educationData.educationDetails,
      education_start_date: educationData.startDate,
      education_end_date: educationData.endDate,
      is_currently_studying: educationData.currentlyWorking ? '1' : '0',
    });

    let config = {
      method: 'PATCH',
      // maxBodyLength: Infinity,
      url: `https://api.recruitbpm.com/education/${item.candidate_education_id}`,
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
        Alert.alert(
          'Education Edited Successfully'
         
        );
      })
      .catch(error => {
        console.log(error.response);
        Alert.alert('There is some issue with request. Please try agian later');
      });
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.white}}>
      <StatusBar barStyle={'light-content'} />
      <View style={commonStyles.container}>
        <ScrollView
          keyboardShouldPersistTaps={'handled'}
          contentContainerStyle={{
            flexGrow: 1,
          }}
          showsVerticalScrollIndicator={false}>
          <View
            style={{
              alignItems: 'center',
              flex: 1,
            }}>
            <Image
              style={{
                width: wp(25),
                height: wp(25),
                marginVertical: wp(5),
                // tintColor:colors.dark_primary_color,
                borderRadius: wp(15),
              }}
              source={require('../../assets/images/study.png')}
            />
          </View>
          <CustomTextInput
            placeholder={'Degree Title'}
            value={educationData.degreeTitle}
            borderWidth={1}
            lableColor={colors.dark_primary_color}
            borderRadius={scale(5)}
            onChangeText={text => {
              dispatch({type: 'degreeTitle', payload: text});
            }}
            errorMessage={''}
          />
          <NativeBaseProvider>
            <View
              style={{
                width: AppScreenWidth,

                alignSelf: 'center',
              }}>
              <Text
                style={{
                  color: colors.dark_primary_color,
                  fontFamily: fonts.Medium,
                  fontSize: scale(12),
                }}>
                Degree Level
              </Text>
            </View>
            <Select
              selectedValue={educationData.degreeLevel}
              width={AppScreenWidth}
              placeholderTextColor={colors.text_primary_color}
              maxHeight={'10'}
              alignSelf={'center'}
              fontFamily={fonts.Medium}
              fontSize={scale(13)}
              placeholder="Degree Level"
              _item={selectStyles._item}
              _selectedItem={selectStyles._selectedItem}
              onValueChange={itemValue => {
                dispatch({type: 'degreeLevel', payload: itemValue});
              }}>
              <Select.Item key={'1'} label={'Associate'} value={'Associate'} />
              <Select.Item key={'2'} label={'Bachelor'} value={'Bachelor'} />
              <Select.Item key={'3'} label={'Masters'} value={'Masters'} />
              <Select.Item key={`4`} label={'Doctoral'} value={'Doctoral'} />
              <Select.Item
                key={`5`}
                label={'Post Doctoral'}
                value={'Post Doctoral'}
              />
              <Select.Item
                key={`6`}
                label={'High School'}
                value={'High School'}
              />
              <Select.Item
                key={`7`}
                label={'Some College'}
                value={'Some College'}
              />
              <Select.Item
                key={`8`}
                label={'Technical College'}
                value={'Technical College'}
              />
            </Select>
          </NativeBaseProvider>

          <CalenderInput
            placeholder={'Start Date'}
            value={educationData.startDate}
            errorMessage={''}
            onChangeText={date =>
              dispatch({
                type: 'startDate',
                payload: moment(new Date(date)).format('YYYY-MM-DD'),
              })
            }
          />

          {!educationData.currentlyWorking && (
            <CalenderInput
              placeholder={'End Date'}
              value={educationData.endDate}
              errorMessage={''}
              onChangeText={date =>
                dispatch({
                  type: 'endDate',
                  payload: moment(new Date(date)).format('YYYY-MM-DD'),
                })
              }
            />
          )}

          <CustomTextInput
            placeholder={'Education Details'}
            value={educationData.educationDetails}
            borderWidth={1}
            lableColor={colors.dark_primary_color}
            borderRadius={scale(5)}
            onChangeText={text => {
              dispatch({type: 'educationDetails', payload: text});
            }}
            errorMessage={''}
          />

          <View
            style={{
              width: AppScreenWidth,
              marginVertical: scale(10),
              alignSelf: 'center',
            }}>
            <Text
              style={{
                color: colors.dark_primary_color,
                fontFamily: fonts.Medium,
                fontSize: scale(12),
              }}>
              Currently Studying
            </Text>
            <TouchableOpacity
              onPress={() => {
                dispatch({
                  type: 'currentlyWorking',
                  payload: !educationData.currentlyWorking,
                });
              }}
              style={{
                width: scale(22),
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: educationData.currentlyWorking
                  ? colors.dark_primary_color
                  : '#fff',
                height: scale(22),
                marginTop: scale(5),
                borderWidth: educationData.currentlyWorking ? 0 : 1,
                borderRadius: scale(5),
                borderColor: '#0002',
              }}>
              {educationData.currentlyWorking && (
                <Entypo name="check" color={'#fff'} size={scale(20)} />
              )}
            </TouchableOpacity>
          </View>
          <CustomButton
            loading={false}
            loadingText={'Saving'}
            onPress={() => {
              editEducation();
            }}
            text={'Save'}
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default EditEducationScreen;

// import axios from 'axios';
// import moment from 'moment';
// import {NativeBaseProvider, Select} from 'native-base';
// import React, {useReducer} from 'react';
// import {
//   Alert,
//   Image,
//   KeyboardAvoidingView,
//   Platform,
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
// import {commonStyles, selectStyles} from '../../styles';

// const EditEducationScreen = ({navigation}, route) => {
//   let item = route.params;
//   const initialState = {
//     education_id: item?.candidate_education_id,
//     degreeLevel: item?.education_level,
//     degreeTitle: item?.education_title,
//     educationDetails: item?.education_details,
//     startDate: item?.education_start_date,
//     endDate: item?.education_end_date,
//     // jobDuties:item.job_duties,
//     currentlyWorking: item?.is_currently_working,
//   };
//   const [educationData, dispatch] = useReducer(reducer, initialState);
//   const {user, token} = useSelector(state => state.LoginReducer);
//   function reducer(state, action) {
//     switch (action.type) {
//       case 'degreeLevel':
//         return {...state, degreeLevel: action.payload};
//       case 'degreeTitle':
//         return {...state, degreeTitle: action.payload};
//       case 'startDate':
//         return {...state, startDate: action.payload};
//       case 'endDate':
//         return {...state, endDate: action.payload};
//       case 'educationDetails':
//         return {...state, educationDetails: action.payload};
//       case 'currentlyWorking':
//         return {...state, currentlyWorking: action.payload};
//       default:
//         return initialState;
//     }
//   }

//   const addEducation = () => {

//     let data = {
//       candidate_id: user?.candidate_id,
//       education_title: educationData?.degreeTitle,
//       education_level: educationData?.degreeLevel,
//       education_details: educationData?.educationDetails,
//       education_start_date: educationData?.startDate,
//       education_end_date: educationData?.endDate,
//       is_currently_working: educationData?.currentlyWorking ? '1' : '0',
//     };

//     let config = {

//       method: 'PATCH',

//       url: `https://api.recruitbpm.com/education/${item?.candidate_education_id}`,

//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: 'Bearer 4545980ce66bd555d903f7dc739f91e631606eb1',

//       },
//       data: JSON.stringify(data),
//     };

//     axios

//       .request(config)

//       .then(response => {
//         console.log(response.data);
//         Alert.alert(
//           'Education Edited Successfully',
//           response?.data?.message,
//         );
//       })
//       .catch(error => {
//         console.log(error);
//         Alert.alert('There is some issue with request. Please try agian later', JSON.stringify(error.message));
//       });

//     // var myHeaders = new Headers();
//     // myHeaders.append('Content-Type', 'application/json');
//     // myHeaders.append(
//     //   'Authorization',
//     //   'Bearer 4545980ce66bd555d903f7dc739f91e631606eb1',
//     // );
//     // myHeaders.append('Cookie', 'PHPSESSID=o6hf5ebrbakffek9jieg5fi0m4');

//     // var data = {
//     //   candidate_id: user.candidate_id,
//     //   education_title: educationData.degreeTitle,
//     //   education_level: educationData.degreeLevel,
//     //   education_details: educationData.educationDetails,
//     //   education_start_date: educationData.startDate,
//     //   education_end_date: educationData.endDate,
//     //   is_currently_studying: educationData.currentlyWorking,
//     // };

//     // let config = {
//     //   method: 'post',
//     //   maxBodyLength: Infinity,
//     //   url: 'https://api.recruitbpm.com/education',
//     //   headers: {
//     //     'Content-Type': 'application/json',
//     //     Authorization: 'Bearer 4545980ce66bd555d903f7dc739f91e631606eb1',
//     //     Cookie: 'PHPSESSID=vrp9dvjpod52nh5omdtb28gccj',
//     //   },
//     //   data: data,
//     // };

//     // axios
//     //   .request(config)
//     //   .then(response => {
//     //     Alert.alert(response.data.message);
//     //   })
//     //   .catch(error => {
//     //     Alert.alert('THere is some issue with request. Please try agian later');
//     //   });
//   };

//   return (
//     <KeyboardAvoidingView
//       behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//       style={{flex: 1}}>
//       <SafeAreaView style={{flex: 1, backgroundColor: colors.white}}>
//         <StatusBar barStyle={'light-content'} />
//         <View style={commonStyles.container}>
//           <ScrollView
//             keyboardShouldPersistTaps={'handled'}
//             contentContainerStyle={{
//               flexGrow: 1,
//             }}
//             showsVerticalScrollIndicator={false}>
//             <View
//               style={{
//                 alignItems: 'center',
//                 flex: 1,
//               }}>
//               <Image
//                 style={{
//                   width: wp(25),
//                   height: wp(25),
//                   marginVertical: wp(5),
//                   // tintColor:colors.dark_primary_color,
//                   borderRadius: wp(15),
//                 }}
//                 source={require('../../assets/images/study.png')}
//               />
//             </View>
//             <CustomTextInput
//               placeholder={'Degree Title'}
//               value={educationData.degreeTitle}
//               borderWidth={1}
//               lableColor={colors.dark_primary_color}
//               borderRadius={scale(5)}
//               onChangeText={text => {
//                 dispatch({type: 'degreeTitle', payload: text});
//               }}
//               errorMessage={''}
//             />
//             <NativeBaseProvider>
//               <View
//                 style={{
//                   width: AppScreenWidth,

//                   alignSelf: 'center',
//                 }}>
//                 <Text
//                   style={{
//                     color: colors.dark_primary_color,
//                     fontFamily: fonts.Medium,
//                     fontSize: scale(12),
//                   }}>
//                   Degree Level
//                 </Text>
//               </View>
//               <Select
//                 selectedValue={educationData.degreeLevel}
//                 width={AppScreenWidth}
//                 placeholderTextColor={colors.text_primary_color}
//                 maxHeight={'10'}
//                 alignSelf={'center'}
//                 fontFamily={fonts.Medium}
//                 fontSize={scale(13)}
//                 placeholder="Degree Level"
//                 _item={selectStyles._item}
//                 _selectedItem={selectStyles._selectedItem}
//                 onValueChange={itemValue => {
//                   dispatch({type: 'degreeLevel', payload: itemValue});
//                 }}>
//                 <Select.Item
//                   key={'1'}
//                   label={'Associate'}
//                   value={'Associate'}
//                 />
//                 <Select.Item key={'2'} label={'Bachelor'} value={'Bachelor'} />
//                 <Select.Item key={'3'} label={'Masters'} value={'Masters'} />
//                 <Select.Item key={`4`} label={'Doctoral'} value={'Doctoral'} />
//                 <Select.Item
//                   key={`5`}
//                   label={'Post Doctoral'}
//                   value={'Post Doctoral'}
//                 />
//                 <Select.Item
//                   key={`6`}
//                   label={'High School'}
//                   value={'High School'}
//                 />
//                 <Select.Item
//                   key={`7`}
//                   label={'Some College'}
//                   value={'Some College'}
//                 />
//                 <Select.Item
//                   key={`8`}
//                   label={'Technical College'}
//                   value={'Technical College'}
//                 />
//               </Select>
//             </NativeBaseProvider>

//             <CalenderInput
//               placeholder={'Start Date'}
//               value={educationData.startDate}
//               errorMessage={''}
//               onChangeText={date =>
//                 dispatch({
//                   type: 'startDate',
//                   payload: moment(new Date(date)).format('YYYY-MM-DD'),
//                 })
//               }
//             />

//             {!educationData.currentlyWorking && (
//               <CalenderInput
//                 placeholder={'End Date'}
//                 value={educationData.endDate}
//                 errorMessage={''}
//                 onChangeText={date =>
//                   dispatch({
//                     type: 'endDate',
//                     payload: moment(new Date(date)).format('YYYY-MM-DD'),
//                   })
//                 }
//               />
//             )}

//             <CustomTextInput
//               placeholder={'Education Details'}
//               value={educationData.educationDetails}
//               borderWidth={1}
//               lableColor={colors.dark_primary_color}
//               borderRadius={scale(5)}
//               onChangeText={text => {
//                 dispatch({type: 'educationDetails', payload: text});
//               }}
//               errorMessage={''}
//             />

//             <View
//               style={{
//                 width: AppScreenWidth,
//                 marginVertical: scale(10),
//                 alignSelf: 'center',
//               }}>
//               <Text
//                 style={{
//                   color: colors.dark_primary_color,
//                   fontFamily: fonts.Medium,
//                   fontSize: scale(12),
//                 }}>
//                 Currently Studying
//               </Text>
//               <TouchableOpacity
//                 onPress={() => {
//                   dispatch({
//                     type: 'currentlyWorking',
//                     payload: !educationData.currentlyWorking,
//                   });
//                 }}
//                 style={{
//                   width: scale(22),
//                   justifyContent: 'center',
//                   alignItems: 'center',
//                   backgroundColor: educationData.currentlyWorking
//                     ? colors.dark_primary_color
//                     : '#fff',
//                   height: scale(22),
//                   marginTop: scale(5),
//                   borderWidth: educationData.currentlyWorking ? 0 : 1,
//                   borderRadius: scale(5),
//                   borderColor: '#0002',
//                 }}>
//                 {educationData.currentlyWorking && (
//                   <Entypo name="check" color={'#fff'} size={scale(20)} />
//                 )}
//               </TouchableOpacity>
//             </View>
//             <CustomButton
//               loading={false}
//               loadingText={'Saving'}
//               onPress={() => {
//                 addEducation();
//               }}
//               text={'Save'}
//             />
//           </ScrollView>
//         </View>
//       </SafeAreaView>
//     </KeyboardAvoidingView>
//   );
// };

// export default EditEducationScreen;

// // import axios from 'axios';
// // import moment from 'moment';
// // import {NativeBaseProvider, Select} from 'native-base';
// // import React, {useReducer} from 'react';
// // import {
// //   Alert,
// //   Image,
// //   KeyboardAvoidingView,
// //   Platform,
// //   SafeAreaView,
// //   ScrollView,
// //   StatusBar,
// //   Text,
// //   View,
// // } from 'react-native';
// // import {TouchableOpacity} from 'react-native-gesture-handler';
// // import {
// //   heightPercentageToDP as hp,
// //   widthPercentageToDP as wp,
// // } from 'react-native-responsive-screen';
// // import {scale} from 'react-native-size-matters';
// // import Entypo from 'react-native-vector-icons/Entypo';
// // import {useSelector} from 'react-redux';
// // import CustomButton from '../../components/Button';
// // import CalenderInput from '../../components/DateInputMethod';
// // import CustomTextInput from '../../components/TextInput';
// // import {AppScreenWidth} from '../../constants/sacling';
// // import {colors, fonts} from '../../constants/theme';
// // import {commonStyles, selectStyles} from '../../styles';
// // const initialState = {
// //   degreeLevel: '',
// //   degreeTitle: '',
// //   startDate: '',
// //   endDate: '',
// //   currentlyWorking: true,
// //   educationDetails: '',
// // };
// // const AddEducationScreen = ({navigation}) => {
// //   const [educationData, dispatch] = useReducer(reducer, initialState);
// //   const {user, token} = useSelector(state => state.LoginReducer);
// //   function reducer(state, action) {
// //     switch (action.type) {
// //       case 'degreeLevel':
// //         return {...state, degreeLevel: action.payload};
// //       case 'degreeTitle':
// //         return {...state, degreeTitle: action.payload};
// //       case 'startDate':
// //         return {...state, startDate: action.payload};
// //       case 'endDate':
// //         return {...state, endDate: action.payload};
// //       case 'educationDetails':
// //         return {...state, educationDetails: action.payload};
// //       case 'currentlyWorking':
// //         return {...state, currentlyWorking: action.payload};
// //       default:
// //         return initialState;
// //     }
// //   }

// //   const addEducation = () => {
// //     var myHeaders = new Headers();
// //     myHeaders.append('Content-Type', 'application/json');
// //     myHeaders.append(
// //       'Authorization',
// //       'Bearer 4545980ce66bd555d903f7dc739f91e631606eb1',
// //     );
// //     myHeaders.append('Cookie', 'PHPSESSID=o6hf5ebrbakffek9jieg5fi0m4');

// //     var data = {
// //       candidate_id: user.candidate_id,
// //       education_title: educationData.degreeTitle,
// //       education_level: educationData.degreeLevel,
// //       education_details: educationData.educationDetails,
// //       education_start_date: educationData.startDate,
// //       education_end_date: educationData.endDate,
// //       is_currently_studying: educationData.currentlyWorking,
// //     };

// //     let config = {
// //       method: 'post',
// //       maxBodyLength: Infinity,
// //       url: 'https://api.recruitbpm.com/education',
// //       headers: {
// //         'Content-Type': 'application/json',
// //         Authorization: 'Bearer 4545980ce66bd555d903f7dc739f91e631606eb1',
// //         Cookie: 'PHPSESSID=vrp9dvjpod52nh5omdtb28gccj',
// //       },
// //       data: data,
// //     };

// //     axios
// //       .request(config)
// //       .then(response => {
// //         Alert.alert(response.data.message);
// //       })
// //       .catch(error => {
// //         Alert.alert('THere is some issue with request. Please try agian later');
// //       });
// //   };

// //   return (
// //     <KeyboardAvoidingView
// //       behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
// //       style={{flex: 1}}>
// //       <SafeAreaView style={{flex: 1, backgroundColor: colors.white}}>
// //         <StatusBar barStyle={'light-content'} />
// //         <View style={commonStyles.container}>
// //           <ScrollView
// //             keyboardShouldPersistTaps={'handled'}
// //             contentContainerStyle={{
// //               flexGrow: 1,
// //             }}
// //             showsVerticalScrollIndicator={false}>
// //             <View
// //               style={{
// //                 alignItems: 'center',
// //                 flex: 1,
// //               }}>
// //               <Image
// //                 style={{
// //                   width: wp(25),
// //                   height: wp(25),
// //                   marginVertical: wp(5),
// //                   // tintColor:colors.dark_primary_color,
// //                   borderRadius: wp(15),
// //                 }}
// //                 source={require('../../assets/images/study.png')}
// //               />
// //             </View>
// //             <CustomTextInput
// //               placeholder={'Degree Title'}
// //               value={educationData.degreeTitle}
// //               borderWidth={1}
// //               lableColor={colors.dark_primary_color}
// //               borderRadius={scale(5)}
// //               onChangeText={text => {
// //                 dispatch({type: 'degreeTitle', payload: text});
// //               }}
// //               errorMessage={''}
// //             />
// //             <NativeBaseProvider>
// //               <View
// //                 style={{
// //                   width: AppScreenWidth,

// //                   alignSelf: 'center',
// //                 }}>
// //                 <Text
// //                   style={{
// //                     color: colors.dark_primary_color,
// //                     fontFamily: fonts.Medium,
// //                     fontSize: scale(12),
// //                   }}>
// //                   Degree Level
// //                 </Text>
// //               </View>
// //               <Select
// //                 selectedValue={educationData.degreeLevel}
// //                 width={AppScreenWidth}
// //                 placeholderTextColor={colors.text_primary_color}
// //                 maxHeight={'10'}
// //                 alignSelf={'center'}
// //                 fontFamily={fonts.Medium}
// //                 fontSize={scale(13)}
// //                 placeholder="Degree Level"
// //                 _item={selectStyles._item}
// //                 _selectedItem={selectStyles._selectedItem}
// //                 onValueChange={itemValue => {
// //                   dispatch({type: 'degreeLevel', payload: itemValue});
// //                 }}>
// //                 <Select.Item
// //                   key={'1'}
// //                   label={'Associate'}
// //                   value={'Associate'}
// //                 />
// //                 <Select.Item key={'2'} label={'Bachelor'} value={'Bachelor'} />
// //                 <Select.Item key={'3'} label={'Masters'} value={'Masters'} />
// //                 <Select.Item key={`4`} label={'Doctoral'} value={'Doctoral'} />
// //                 <Select.Item
// //                   key={`5`}
// //                   label={'Post Doctoral'}
// //                   value={'Post Doctoral'}
// //                 />
// //                 <Select.Item
// //                   key={`6`}
// //                   label={'High School'}
// //                   value={'High School'}
// //                 />
// //                 <Select.Item
// //                   key={`7`}
// //                   label={'Some College'}
// //                   value={'Some College'}
// //                 />
// //                 <Select.Item
// //                   key={`8`}
// //                   label={'Technical College'}
// //                   value={'Technical College'}
// //                 />
// //               </Select>
// //             </NativeBaseProvider>

// //             <CalenderInput
// //               placeholder={'Start Date'}
// //               value={educationData.startDate}
// //               errorMessage={''}
// //               onChangeText={date =>
// //                 dispatch({
// //                   type: 'startDate',
// //                   payload: moment(new Date(date)).format('YYYY-MM-DD'),
// //                 })
// //               }
// //             />

// //             <CalenderInput
// //               placeholder={'End Date'}
// //               value={educationData.endDate}
// //               errorMessage={''}
// //               onChangeText={date =>
// //                 dispatch({
// //                   type: 'endDate',
// //                   payload: moment(new Date(date)).format('YYYY-MM-DD'),
// //                 })
// //               }
// //             />

// //             <CustomTextInput
// //               placeholder={'Education Details'}
// //               value={educationData.educationDetails}
// //               borderWidth={1}
// //               lableColor={colors.dark_primary_color}
// //               borderRadius={scale(5)}
// //               onChangeText={text => {
// //                 dispatch({type: 'educationDetails', payload: text});
// //               }}
// //               errorMessage={''}
// //             />

// //             <View
// //               style={{
// //                 width: AppScreenWidth,
// //                 marginVertical: scale(10),
// //                 alignSelf: 'center',
// //               }}>
// //               <Text
// //                 style={{
// //                   color: colors.dark_primary_color,
// //                   fontFamily: fonts.Medium,
// //                   fontSize: scale(12),
// //                 }}>
// //                 Currently Studying
// //               </Text>
// //               <TouchableOpacity
// //                 onPress={() => {
// //                   dispatch({
// //                     type: 'currentlyWorking',
// //                     payload: !educationData.currentlyWorking,
// //                   });
// //                 }}
// //                 style={{
// //                   width: scale(22),
// //                   justifyContent: 'center',
// //                   alignItems: 'center',
// //                   backgroundColor: educationData.currentlyWorking
// //                     ? colors.dark_primary_color
// //                     : '#fff',
// //                   height: scale(22),
// //                   marginTop: scale(5),
// //                   borderWidth: educationData.currentlyWorking ? 0 : 1,
// //                   borderRadius: scale(5),
// //                   borderColor: '#0002',
// //                 }}>
// //                 {educationData.currentlyWorking && (
// //                   <Entypo name="check" color={'#fff'} size={scale(20)} />
// //                 )}
// //               </TouchableOpacity>
// //             </View>
// //             <CustomButton
// //               loading={false}
// //               loadingText={'Saving'}
// //               onPress={() => {
// //                 addEducation();
// //               }}
// //               text={'Save'}
// //             />
// //           </ScrollView>
// //         </View>
// //       </SafeAreaView>
// //     </KeyboardAvoidingView>
// //   );
// // };

// // export default AddEducationScreen;

// // // import moment from 'moment';
// // // import {NativeBaseProvider, Select} from 'native-base';
// // // import React, {useReducer} from 'react';
// // // import {
// // //   Alert,
// // //   Image,
// // //   KeyboardAvoidingView,
// // //   Platform,
// // //   SafeAreaView,
// // //   ScrollView,
// // //   StatusBar,
// // //   Text,
// // //   View,
// // // } from 'react-native';
// // // import {TouchableOpacity} from 'react-native-gesture-handler';
// // // import {
// // //   heightPercentageToDP as hp,
// // //   widthPercentageToDP as wp,
// // // } from 'react-native-responsive-screen';
// // // import {scale} from 'react-native-size-matters';
// // // import Entypo from 'react-native-vector-icons/Entypo';
// // // import {useSelector} from 'react-redux';
// // // import CustomButton from '../../components/Button';
// // // import CalenderInput from '../../components/DateInputMethod';
// // // import CustomTextInput from '../../components/TextInput';
// // // import {AppScreenWidth} from '../../constants/sacling';
// // // import {colors, fonts} from '../../constants/theme';
// // // import {commonStyles, selectStyles} from '../../styles';
// // // const initialState = {
// // //   degreeLevel: '',
// // //   degreeTitle: '',
// // //   startDate: '',
// // //   endDate: '',
// // //   currentlyWorking: true,
// // //   educationDetails: '',
// // // };
// // // const AddEducationScreen = ({navigation, route}) => {
// // //   const data = route.params.item;
// // //   const [educationData, dispatch] = useReducer(reducer, data);
// // //   const {user, token} = useSelector(state => state.LoginReducer);
// // //   function reducer(state, action) {
// // //     switch (action.type) {
// // //       case 'degreeLevel':
// // //         return {...state, degreeLevel: action.payload};
// // //       case 'degreeTitle':
// // //         return {...state, degreeTitle: action.payload};
// // //       case 'startDate':
// // //         return {...state, startDate: action.payload};
// // //       case 'endDate':
// // //         return {...state, endDate: action.payload};
// // //       case 'educationDetails':
// // //         return {...state, educationDetails: action.payload};
// // //       case 'currentlyWorking':
// // //         return {...state, currentlyWorking: action.payload};
// // //       default:
// // //         return initialState;
// // //     }
// // //   }

// // //   const editEducation = () => {
// // //     var myHeaders = new Headers();
// // //     myHeaders.append('Content-Type', 'application/json');
// // //     myHeaders.append(
// // //       'Authorization',
// // //       'Bearer 4545980ce66bd555d903f7dc739f91e631606eb1',
// // //     );
// // //     myHeaders.append('Cookie', 'PHPSESSID=o6hf5ebrbakffek9jieg5fi0m4');

// // //     var raw = JSON.stringify({
// // //       candidate_id: user.candidate_id,
// // //       education_title: educationData.degreeTitle,
// // //       education_level: educationData.degreeLevel,
// // //       education_details: educationData.educationDetails,
// // //       education_start_date: educationData.startDate,
// // //       education_end_date: educationData.endDate,
// // //       is_currently_studying: educationData.currentlyWorking,
// // //     });

// // //     var requestOptions = {
// // //       method: 'PUT',
// // //       headers: myHeaders,
// // //       body: raw,
// // //       redirect: 'follow',
// // //     };

// // //     fetch(
// // //       `https://api.recruitbpm.com/education/${data.candidate_education_id}`,
// // //       requestOptions,
// // //     )
// // //       .then(response => response.json())
// // //       .then(result => {
// // //         if (result.status == 200) {
// // //           Alert.alert(result.message);
// // //         } else {
// // //           Alert.alert(
// // //             'THere is some issue with request. Please try agian later',
// // //           );
// // //         }
// // //       })
// // //       .catch(error => {
// // //         Alert.alert('THere is some issue with request. Please try agian later');
// // //       });
// // //   };

// // //   return (
// // //     <KeyboardAvoidingView
// // //       behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
// // //       style={{flex: 1}}>
// // //       <SafeAreaView style={{flex: 1, backgroundColor: colors.white}}>
// // //         <StatusBar barStyle={'light-content'} />
// // //         <View style={commonStyles.container}>
// // //           <ScrollView
// // //             keyboardShouldPersistTaps={'handled'}
// // //             contentContainerStyle={{
// // //               flexGrow: 1,
// // //             }}
// // //             showsVerticalScrollIndicator={false}>
// // //             <View
// // //               style={{
// // //                 alignItems: 'center',
// // //                 flex: 1,
// // //               }}>
// // //               <Image
// // //                 style={{
// // //                   width: wp(25),
// // //                   height: wp(25),
// // //                   marginVertical: wp(5),
// // //                   // tintColor:colors.dark_primary_color,
// // //                   borderRadius: wp(15),
// // //                 }}
// // //                 source={require('../../assets/images/study.png')}
// // //               />
// // //             </View>
// // //             <CustomTextInput
// // //               placeholder={'Degree Title'}
// // //               value={educationData.degreeTitle}
// // //               borderWidth={1}
// // //               lableColor={colors.dark_primary_color}
// // //               borderRadius={scale(5)}
// // //               onChangeText={text => {
// // //                 dispatch({type: 'degreeTitle', payload: text});
// // //               }}
// // //               errorMessage={''}
// // //             />
// // //             <NativeBaseProvider>
// // //               <View
// // //                 style={{
// // //                   width: AppScreenWidth,

// // //                   alignSelf: 'center',
// // //                 }}>
// // //                 <Text
// // //                   style={{
// // //                     color: colors.dark_primary_color,
// // //                     fontFamily: fonts.Medium,
// // //                     fontSize: scale(12),
// // //                   }}>
// // //                   Degree Level
// // //                 </Text>
// // //               </View>
// // //               <Select
// // //                 selectedValue={educationData.degreeLevel}
// // //                 width={AppScreenWidth}
// // //                 placeholderTextColor={colors.text_primary_color}
// // //                 maxHeight={'10'}
// // //                 alignSelf={'center'}
// // //                 fontFamily={fonts.Medium}
// // //                 fontSize={scale(13)}
// // //                 placeholder="Degree Level"
// // //                 _item={selectStyles._item}
// // //                 _selectedItem={selectStyles._selectedItem}
// // //                 onValueChange={itemValue => {
// // //                   dispatch({type: 'degreeLevel', payload: itemValue});
// // //                 }}>
// // //                 <Select.Item
// // //                   key={'1'}
// // //                   label={'Associate'}
// // //                   value={'Associate'}
// // //                 />
// // //                 <Select.Item key={'2'} label={'Bachelor'} value={'Bachelor'} />
// // //                 <Select.Item key={'3'} label={'Masters'} value={'Masters'} />
// // //                 <Select.Item key={`4`} label={'Doctoral'} value={'Doctoral'} />
// // //                 <Select.Item
// // //                   key={`5`}
// // //                   label={'Post Doctoral'}
// // //                   value={'Post Doctoral'}
// // //                 />
// // //                 <Select.Item
// // //                   key={`6`}
// // //                   label={'High School'}
// // //                   value={'High School'}
// // //                 />
// // //                 <Select.Item
// // //                   key={`7`}
// // //                   label={'Some College'}
// // //                   value={'Some College'}
// // //                 />
// // //                 <Select.Item
// // //                   key={`8`}
// // //                   label={'Technical College'}
// // //                   value={'Technical College'}
// // //                 />
// // //               </Select>
// // //             </NativeBaseProvider>

// // //             <CalenderInput
// // //               placeholder={'Start Date'}
// // //               value={educationData.startDate}
// // //               errorMessage={''}
// // //               onChangeText={date =>
// // //                 dispatch({
// // //                   type: 'startDate',
// // //                   payload: moment(new Date(date)).format('MMM-YYYY'),
// // //                 })
// // //               }
// // //             />

// // //             <CalenderInput
// // //               placeholder={'End Date'}
// // //               value={educationData.endDate}
// // //               errorMessage={''}
// // //               onChangeText={date =>
// // //                 dispatch({
// // //                   type: 'endDate',
// // //                   payload: moment(new Date(date)).format('MMM-YYYY'),
// // //                 })
// // //               }
// // //             />

// // //             <CustomTextInput
// // //               placeholder={'Education Details'}
// // //               value={educationData.educationDetails}
// // //               borderWidth={1}
// // //               lableColor={colors.dark_primary_color}
// // //               borderRadius={scale(5)}
// // //               onChangeText={text => {
// // //                 dispatch({type: 'educationDetails', payload: text});
// // //               }}
// // //               errorMessage={''}
// // //             />

// // //             <View
// // //               style={{
// // //                 width: AppScreenWidth,
// // //                 marginVertical: scale(10),
// // //                 alignSelf: 'center',
// // //               }}>
// // //               <Text
// // //                 style={{
// // //                   color: colors.dark_primary_color,
// // //                   fontFamily: fonts.Medium,
// // //                   fontSize: scale(12),
// // //                 }}>
// // //                 Currently Studying
// // //               </Text>
// // //               <TouchableOpacity
// // //                 onPress={() => {
// // //                   dispatch({
// // //                     type: 'currentlyWorking',
// // //                     payload: !educationData.currentlyWorking,
// // //                   });
// // //                 }}
// // //                 style={{
// // //                   width: scale(22),
// // //                   justifyContent: 'center',
// // //                   alignItems: 'center',
// // //                   backgroundColor: educationData.currentlyWorking
// // //                     ? colors.dark_primary_color
// // //                     : '#fff',
// // //                   height: scale(22),
// // //                   marginTop: scale(5),
// // //                   borderWidth: educationData.currentlyWorking ? 0 : 1,
// // //                   borderRadius: scale(5),
// // //                   borderColor: '#0002',
// // //                 }}>
// // //                 {educationData.currentlyWorking && (
// // //                   <Entypo name="check" color={'#fff'} size={scale(20)} />
// // //                 )}
// // //               </TouchableOpacity>
// // //             </View>
// // //             <CustomButton
// // //               loading={false}
// // //               loadingText={'Saving'}
// // //               onPress={() => {
// // //                 editEducation();
// // //               }}
// // //               text={'Save'}
// // //             />
// // //           </ScrollView>
// // //         </View>
// // //       </SafeAreaView>
// // //     </KeyboardAvoidingView>
// // //   );
// // // };

// // // export default AddEducationScreen;
