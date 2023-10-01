import { useIsFocused } from '@react-navigation/native';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  SafeAreaView,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { scale, verticalScale } from 'react-native-size-matters';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useSelector } from 'react-redux';
import { getExpenseslist } from '../../api';
import CalenderInput from '../../components/CalenderInput';
import CustomHeader from '../../components/SearchHeader';
import Spacer from '../../components/Spacer';
import CustomStatusBar from '../../components/StatusBar';
import { MainRoutes } from '../../constants/routes';
import { AppScreenWidth } from '../../constants/sacling';
import { colors } from '../../constants/theme';
import { commonStyles } from '../../styles';
import ExpansesItem from './ExpansesCard';
const AllExpenseScreen = ({navigation}) => {
  const {user} = useSelector(state => state.LoginReducer);
  const [endDate, setEndDate] = useState('');
  const [startDate, setStartDate] = useState('');
  const [data, setData] = useState([]);
  const [filterdata, setFilterData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const isFocused = useIsFocused();

  const [error_message, setErrorMessage] = useState('');
  useEffect(() => {
    getExpensesList();
  }, [isFocused]);

  getExpensesList = () => {
    setLoading(true);
    getExpenseslist(user?.account_id, user?.candidate_id)
      .then(response => {
        if (response.status == 200) {
          setData(response.data.data);
          setFilterData(response.data.data);
          setLoading(false);
        } else {
          console.log('Some Error', response.status);
          setError(true);
          setLoading(false);
          setErrorMessage(
            'Some Error Ocured with status code' + response.status,
          );
        }
      })
      .catch(error => {
        setLoading(false);
        setError(true);
        setLoading(false);
        setErrorMessage('Some Error Ocured with status code 200');
      });
  };

  const renderItem = ({item}) => {
    console.log('[expense renderdata]', item);
  return(
    <ExpansesItem
      item={item}
      billtype={item.expense_report_title}
      company={item.type}
      status={item.module_status_name}
      date={moment(item.created_date).format('DD-MMM-YYYY')}
      job={item.job_title}
      status_colour_code={item.status_colour_code}
      price={`$ ${parseFloat(item.total_amount).toFixed(2)}`}
      onDelete={() => getExpensesList()}
      onPress={() => {
        navigation.navigate(MainRoutes.EditExpenseScreen, {item: item});
      }}
      List={() => {
        navigation.navigate(MainRoutes.ExpenseDetailsScreen, {item: item});
      }}
    />
  )};

  const filterbydate = (date, is_start) => {
    if (is_start) {
      setStartDate(date);
    } else {
      setEndDate(date);
    }
    if (startDate !== '' || endDate !== '') {
      let date_filter = data.filter(function (item) {
        if (
          moment(item.created_date).isBetween(
            moment(startDate),
            moment(endDate),
          )
        ) {
          return item;
        }
      });
      setFilterData(date_filter);
    }
  };

  const FilterbyStatus = status => {
    if (status === 'All') {
      setFilterData(data);
    } else if (status === '0') {
      let draft_data = data.filter(function (item) {
        return item.module_status_name === 'Approved';
      });
      setFilterData(draft_data);
    } else if (status === '1') {
      let draft_data = data.filter(function (item) {
        return item.module_status_name === 'Submitted';
      });
      setFilterData(draft_data);
    } else if (status === 'Draft') {
      let draft_data = data.filter(function (item) {
        return item.module_status_name === 'Draft';
      });
      setFilterData(draft_data);
    } else if (status === '3') {
      let draft_data = data.filter(function (item) {
        return item.module_status_name ==='Rejected';
      });
      setFilterData(draft_data);
    }
    
  };

  const FilterByTitle = title => {
    let se = title.toLowerCase();
    const regex = new RegExp(`${se}`);
    let draft_data = data.filter(function (item) {
      return (
        item.job_title.toLowerCase().match(regex) ||
        item.expense_report_title.toLowerCase().match(regex) ||
        item.module_status_name.toLowerCase().match(regex) ||
        moment(item.created_date).format('DD-MMM-YYYY').toLowerCase().match(regex) ||
        `$ ${parseFloat(item.total_amount).toFixed(2)}`.toLowerCase().match(regex)
      );
    });
    setFilterData(draft_data);
  };

  if (loading) {
    return (
      <SafeAreaProvider>
        <CustomStatusBar />
        <SafeAreaView style={commonStyles.container}>
          <CustomHeader
            show_backButton={true}
            isdrawer={true}
            SearchPress={text => FilterByTitle(text)}
            NotificationPress={() => alert('NotificationPress')}
            FilterPress={data => alert(data)}
            onPress={() => navigation.openDrawer()}
            title={'All Expenses'}
          />
          <Spacer height={verticalScale(100)} />
          <ActivityIndicator size={'large'} color={colors.dark_primary_color} />
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }
  return (
    <SafeAreaProvider>
      <CustomStatusBar />
      <SafeAreaView style={commonStyles.container}>
        <CustomHeader
          show_backButton={true}
          isdrawer={true}
          SearchPress={text => FilterByTitle(text)}
          NotificationPress={() => alert('NotificationPress')}
          FilterPress={status => FilterbyStatus(status)}
          onPress={() => navigation.openDrawer()}
          title={'All Expenses'}
        />
        <View
          style={{
            flexDirection: 'row',
            width: AppScreenWidth,
            justifyContent: 'space-between',
          }}>
          <CalenderInput
            placeholder={'Start Date'}
            value={startDate}
            errorMessage={''}
            w={AppScreenWidth / 2 - scale(5)}
            onChangeText={date => filterbydate(date, true)}
          />

          <CalenderInput
            placeholder={'End Date'}
            value={endDate}
            errorMessage={''}
            w={AppScreenWidth / 2 - scale(5)}
            onChangeText={date => filterbydate(date, false)}
          />
        </View>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={filterdata}
          renderItem={renderItem}
          maxToRenderPerBatch={20}
          updateCellsBatchingPeriod={80}
          initialNumToRender={20}
          windowSize={35}
          bounces={false}
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={() => {
            return (
              <View
                style={{
                  alignSelf: 'center',
                  marginTop: verticalScale(150),
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                {error ? (
                  <Image
                    source={require('../../assets/images/error.gif')}
                    style={{
                      width: verticalScale(150),
                      height: verticalScale(150),
                      resizeMode: 'contain',
                    }}
                  />
                ) : (
                  <Image
                    source={require('../../assets/images/norecord.gif')}
                    style={{
                      width: verticalScale(150),
                      height: verticalScale(150),
                      resizeMode: 'contain',
                    }}
                  />
                )}
              </View>
            );
          }}
        />
        <TouchableOpacity
          onPress={() => navigation.navigate(MainRoutes.AddExpenseScreen)}
          style={{
            alignSelf: 'flex-end',
            paddingHorizontal: scale(20),
            paddingVertical: scale(10),
            position: 'absolute',
            bottom: scale(55),
          }}>
          <AntDesign
            name={'pluscircle'}
            size={scale(35)}
            color={colors.dark_primary_color}
          />
        </TouchableOpacity>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default AllExpenseScreen;

















// {........ ............. ........... ........... ........}
// import React, {useEffect, useState} from 'react';
// import {
//   FlatList,
//   SafeAreaView,
//   Image,
//   View,
//   ActivityIndicator,
//   TouchableOpacity,
// } from 'react-native';
// import AntDesign from 'react-native-vector-icons/AntDesign';
// import CalenderInput from '../../components/CalenderInput';
// import {commonStyles} from '../../styles';
// import CustomHeader from '../../components/SearchHeader';
// import ExpansesItem from './ExpansesCard';
// import {scale, verticalScale} from 'react-native-size-matters';
// import {colors} from '../../constants/theme';
// import {MainRoutes} from '../../constants/routes';
// import {AppScreenWidth} from '../../constants/sacling';
// import {useSelector} from 'react-redux';
// import Spacer from '../../components/Spacer';
// import {getExpenseslist} from '../../api';
// import CustomStatusBar from '../../components/StatusBar';
// import {SafeAreaProvider} from 'react-native-safe-area-context';
// import moment from 'moment';
// import {useIsFocused} from '@react-navigation/native';
// const AllExpenseScreen = ({navigation}) => {
//   const {user} = useSelector(state => state.LoginReducer);
//   const [endDate, setEndDate] = useState('');
//   const [startDate, setStartDate] = useState('');
//   const [data, setData] = useState([]);
//   const [filterdata, setFilterData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(false);
//   const isFocused = useIsFocused();

//   const [error_message, setErrorMessage] = useState('');
//   useEffect(() => {
//     getExpensesList();
//   }, [isFocused]);

//   getExpensesList = () => {
//     setLoading(true);
//     getExpenseslist(user?.account_id, user?.candidate_id)
//       .then(response => {
//         if (response.status == 200) {
//           setData(response.data.data);
//           setFilterData(response.data.data);
//           setLoading(false);
//         } else {
//           console.log('Some Error', response.status);
//           setError(true);
//           setLoading(false);
//           setErrorMessage(
//             'Some Error Ocured with status code' + response.status,
//           );
//         }
//       })
//       .catch(error => {
//         setLoading(false);
//         setError(true);
//         setLoading(false);
//         setErrorMessage('Some Error Ocured with status code 200');
//       });
//   };

//   const renderItem = ({item}) => (
//     <ExpansesItem
//       item={item}
//       billtype={item.expense_report_title}
//       company={item.type}
//       status={item.module_status_name}
//       date={moment(item.created_date).format('DD-MMM-YYYY')}
//       job={item.job_title}
//       status_colour_code={item.status_colour_code}
//       price={`$ ${parseFloat(item.total_amount).toFixed(2)}`}
//       onDelete={() => getExpensesList()}
//       onPress={() => {
//         navigation.navigate(MainRoutes.EditExpenseScreen, {item: item});
//       }}
//       List={() => {
//         navigation.navigate(MainRoutes.ExpenseDetailsScreen, {item: item});
//       }}
//     />
//   );

//   const filterbydate = (date, is_start) => {
//     if (is_start) {
//       setStartDate(date);
//     } else {
//       setEndDate(date);
//     }
//     if (startDate !== '' || endDate !== '') {
//       let date_filter = data.filter(function (item) {
//         if (
//           moment(item.created_date).isBetween(
//             moment(startDate),
//             moment(endDate),
//           )
//         ) {
//           return item;
//         }
//       });
//       setFilterData(date_filter);
//     }
//   };

//   const FilterbyStatus = status => {
//     // if (status == 'All') {
//     //   setFilterData(data);
//     // } else if (status == '0' || status == 0) {
//     //   let draft_data = data.filter(function (item) {
//     //     return item.module_status_name == '0' || item.module_status_name == 0;
//     //   });
//     //   setFilterData(draft_data);
//     // } else if (status == '1' || status == 1) {
//     //   let draft_data = data.filter(function (item) {
//     //     return item.module_status_name == '1' || item.module_status_name == 1;
//     //   });
//     //   setFilterData(draft_data);
//     // } else if (status == '2' || status == 2) {
//     //   let draft_data = data.filter(function (item) {
//     //     return item.module_status_name == '2' || item.module_status_name == 2;
//     //   });
//     //   setFilterData(draft_data);
//     // }
//     if (status === 'Draft') {
//       let draft_data = data.filter(function (item) {
//         return item.module_status_name === status;
//       });
//       setFilterData(draft_data);
//     } else {
//       setFilterData(data);
//     }
//   };

//   const FilterByTitle = title => {
//     let se = title.toLowerCase();
//     const regex = new RegExp(`${se}`);
//     let draft_data = data.filter(function (item) {
//       return (
//         item.job_title.toLowerCase().match(regex) ||
//         item.expense_report_title.toLowerCase().match(regex) ||
//         item.module_status_name.toLowerCase().match(regex)
//       );
//     });
//     setFilterData(draft_data);
//   };

//   if (loading) {
//     return (
//       <SafeAreaProvider>
//         <CustomStatusBar />
//         <SafeAreaView style={commonStyles.container}>
//           <CustomHeader
//             show_backButton={true}
//             isdrawer={true}
//             SearchPress={text => FilterByTitle(text)}
//             NotificationPress={() => alert('NotificationPress')}
//             FilterPress={data => alert(data)}
//             onPress={() => navigation.openDrawer()}
//             title={'All Expenses'}
//           />
//           <Spacer height={verticalScale(100)} />
//           <ActivityIndicator size={'large'} color={colors.dark_primary_color} />
//         </SafeAreaView>
//       </SafeAreaProvider>
//     );
//   }
//   return (
//     <SafeAreaProvider>
//       <CustomStatusBar />
//       <SafeAreaView style={commonStyles.container}>
//         <CustomHeader
//           show_backButton={true}
//           isdrawer={true}
//           SearchPress={text => FilterByTitle(text)}
//           NotificationPress={() => alert('NotificationPress')}
//           FilterPress={status => FilterbyStatus(status)}
//           onPress={() => navigation.openDrawer()}
//           title={'All Expenses'}
//         />
//         <View
//           style={{
//             flexDirection: 'row',
//             width: AppScreenWidth,
//             justifyContent: 'space-between',
//           }}>
//           <CalenderInput
//             placeholder={'Start Date'}
//             value={startDate}
//             errorMessage={''}
//             w={AppScreenWidth / 2 - scale(5)}
//             onChangeText={date => filterbydate(date, true)}
//           />

//           <CalenderInput
//             placeholder={'End Date'}
//             value={endDate}
//             errorMessage={''}
//             w={AppScreenWidth / 2 - scale(5)}
//             onChangeText={date => filterbydate(date, false)}
//           />
//         </View>
//         <FlatList
//           showsVerticalScrollIndicator={false}
//           data={filterdata}
//           renderItem={renderItem}
//           maxToRenderPerBatch={20}
//           updateCellsBatchingPeriod={80}
//           initialNumToRender={20}
//           windowSize={35}
//           bounces={false}
//           keyExtractor={(item, index) => index.toString()}
//           ListEmptyComponent={() => {
//             return (
//               <View
//                 style={{
//                   alignSelf: 'center',
//                   marginTop: verticalScale(150),
//                   flex: 1,
//                   justifyContent: 'center',
//                   alignItems: 'center',
//                 }}>
//                 {error ? (
//                   <Image
//                     source={require('../../assets/images/error.gif')}
//                     style={{
//                       width: verticalScale(150),
//                       height: verticalScale(150),
//                       resizeMode: 'contain',
//                     }}
//                   />
//                 ) : (
//                   <Image
//                     source={require('../../assets/images/norecord.gif')}
//                     style={{
//                       width: verticalScale(150),
//                       height: verticalScale(150),
//                       resizeMode: 'contain',
//                     }}
//                   />
//                 )}
//               </View>
//             );
//           }}
//         />
//         <TouchableOpacity
//           onPress={() => navigation.navigate(MainRoutes.AddExpenseScreen)}
//           style={{
//             alignSelf: 'flex-end',
//             paddingHorizontal: scale(20),
//             paddingVertical: scale(10),
//             position: 'absolute',
//             bottom: scale(55),
//           }}>
//           <AntDesign
//             name={'pluscircle'}
//             size={scale(35)}
//             color={colors.dark_primary_color}
//           />
//         </TouchableOpacity>
//       </SafeAreaView>
//     </SafeAreaProvider>
//   );
// };

// export default AllExpenseScreen;
