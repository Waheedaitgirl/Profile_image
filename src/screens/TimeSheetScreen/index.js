import React, {useEffect, useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  View,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {scale, verticalScale} from 'react-native-size-matters';
import {commonStyles, textStyles} from '../../styles';
import TimeSheetFlatListItem from './TimeSheetFlatListItem';
import CalenderInput from '../../components/CalenderInput';
import CustomHeader from '../../components/SearchHeader';
import {MainRoutes} from '../../constants/routes';
import {colors} from '../../constants/theme';
import {AppScreenWidth} from '../../constants/sacling';
import {useSelector} from 'react-redux';
import {listTimeSheetByCandidateId} from '../../api';
import Spacer from '../../components/Spacer';
import CustomStatusBar from '../../components/StatusBar';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {useIsFocused} from '@react-navigation/native';
import moment from 'moment';
const TimeSheetListScreen = ({navigation}) => {
  const {user} = useSelector(state => state.LoginReducer);
  const [data, setData] = useState([]);
  const [filterdata, setFilterData] = useState([]);
  const [endDate, setEndDate] = useState('');
  const [startDate, setStartDate] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [error_message, setErrorMessage] = useState('');
  const isFocused = useIsFocused();

  useEffect(() => {
    getList();
  }, [isFocused]);
  useEffect(() => {}, [filterdata, filterdata.length]);
  const getList = () => {
    setLoading(true);
    listTimeSheetByCandidateId(user?.account_id, user?.candidate_id)
      .then(response => {
        if (response.status === 200) {
          console.log('[All TimeSheets]', response?.data?.data);
          setData(response?.data?.data);
          setFilterData(response?.data?.data);
          setLoading(false);
        } else {
          setError(true);
          setLoading(false);
          setErrorMessage(
            'Some Error Ocured with status code' + response.status,
          );
        }
      })
      .catch(error => {
        setError(true);
        setLoading(false);
        setErrorMessage('Some Error Ocured with status code 200');
      });
  };

  let getMonday = d => {
    d = new Date(d);
    var day = d.getDay(),
      diff = d.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday
    return new Date(d.setDate(diff)).toDateString();
  };

  const renderItem = ({item}) => {
    return (
      <TimeSheetFlatListItem
        time={
          item.time_sheet_view == 'Week'
            ? 'Week Starts at ' + getMonday(item.log_date)
            : 'Day ' + new Date(item.log_date).toDateString()
        }
        // time={`${item.time_sheet_view} Starts At ${item.log_date}`}
        name={item.job_title}
        item={item}
        submittedto={`Time Approver Manager - ${item?.u_approver_name}`}
        // submittedto={
        //   item.module_id === '3'
        //     ? item.cc_approver_name
        //     : item.module_id === '0'
        //     ? item.p_approver_name
        //     : item.module_id === '4'
        //     ? item.cn_approver_name
        //     : item.cc_approver_name
        // }
        status={item.module_status_name}
        status_style={item.status_colour_code}
        hours={`${item.log_hours} Hours`}
        onPress={() =>
          navigation.navigate(MainRoutes.DetailsSheetScreen, {item})
        }
        onEdit={() =>
          navigation.navigate(MainRoutes.EditTimeSheetScreen, {item})
        }
        onDelete={() => getList()}
      />
    );
  };

  const filterbydate = (date, is_start) => {
    if (is_start) {
      setStartDate(date);
    } else {
      setEndDate(date);
    }
    if (startDate !== '' || endDate !== '') {
      let date_filter = data.filter(function (item) {
        if (
          moment(item.log_date).isBetween(moment(startDate), moment(endDate))
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
      //Approved
      let draft_data = data.filter(function (item) {
        return item.module_status_name === 'Approved';
      });
      setFilterData(draft_data);
    } else if (status === '1') {
      //Submitted
      let draft_data = data.filter(function (item) {
        return item.module_status_name === 'Submitted';
      });
      setFilterData(draft_data);
    } else if (status === 'Draft') {
      //Unsubmitted
      let draft_data = data.filter(function (item) {
        return item.module_status_name === 'Draft';
      });
      setFilterData(draft_data);
    } else if (status === '3') {
      //Rejected
      let draft_data = data.filter(function (item) {
        return item.module_status_name === 'Rejected';
      });
      setFilterData(draft_data);
    }
    // if (status === 'Draft') {
    //   let draft_data = data.filter(function (item) {
    //     return item.module_status_name === status;
    //   });
    //   setFilterData(draft_data);
    // } else {
    //   setFilterData(data);
    // }
  };

  const FilterByTitle = title => {
    let se = title.toLowerCase();
    const regex = new RegExp(`${se}`);
    let draft_data = data.filter(function (item) {
      console.log('[Item Data Testing]' , item);
      return (
        item.job_title.toLowerCase().match(regex) ||
        item.comments.toLowerCase().match(regex) ||
        item.log_date.toLowerCase().match(regex) ||
        item.log_hours.toLowerCase().match(regex) ||
        item.module_status_name
        .toLowerCase().match(regex) ||
        (item.time_sheet_view == 'Week'
        ? 'Week Starts at ' + getMonday(item.log_date)
        : 'Day ' + new Date(item.log_date).toDateString()
      )
        ?.toLowerCase().match(regex) ||
        `Time Approver Manager - ${item?.u_approver_name}`.toLowerCase().match(regex) 
      );
    });
    setFilterData(draft_data);
  };
  if (loading) {
    return (
      <SafeAreaProvider>
        <CustomStatusBar />
        <View style={commonStyles.container}>
          <CustomHeader
            show_backButton={true}
            isdrawer={true}
            SearchPress={text => FilterByTitle(text)}
            NotificationPress={() => alert('NotificationPress')}
            FilterPress={status => FilterbyStatus(status)}
            onPress={() => navigation.openDrawer()}
            title={'Time Sheet'}
          />
          <Spacer height={verticalScale(100)} />
          <ActivityIndicator size={'large'} color={colors.dark_primary_color} />
        </View>
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider style={{flex: 1}}>
      <CustomStatusBar />
      <SafeAreaView style={commonStyles.container}>
        <CustomHeader
          show_backButton={true}
          isdrawer={true}
          SearchPress={text => FilterByTitle(text)}
          NotificationPress={() => alert('NotificationPress')}
          FilterPress={status => FilterbyStatus(status)}
          onPress={() => navigation.openDrawer()}
          title={'Time Sheet'}
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
            onChangeText={data => filterbydate(data, true)}
          />

          <CalenderInput
            placeholder={'End Date'}
            value={endDate}
            errorMessage={''}
            w={AppScreenWidth / 2 - scale(5)}
            onChangeText={data => filterbydate(data, false)}
          />
        </View>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={filterdata}
          bounces={false}
          renderItem={renderItem}
          maxToRenderPerBatch={20}
          updateCellsBatchingPeriod={80}
          initialNumToRender={20}
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
          windowSize={35}
          getItemLayout={(filterdata, index) => {
            return {
              length: verticalScale(100),
              offset: verticalScale(100) * filterdata.length,
              index,
            };
          }}
          keyExtractor={(item, index) => index.toString()}
        />
        <TouchableOpacity
          onPress={() => navigation.navigate(MainRoutes.AddTimeSheetScreen)}
          style={{
            alignSelf: 'flex-end',
            paddingHorizontal: scale(20),
            paddingVertical: scale(10),
            position: 'absolute',
            right: scale(10),
            bottom: verticalScale(30),
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

export default TimeSheetListScreen;

//  {....... ....... ........ ............ .............. .............. ............ .......... .......}

