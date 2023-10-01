import moment from 'moment/moment';
import {Icon, NativeBaseProvider, Select} from 'native-base';
import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,SafeAreaView
} from 'react-native';

import {scale, verticalScale} from 'react-native-size-matters';
import Entypo from 'react-native-vector-icons/Entypo';
import {useSelector} from 'react-redux';
import {addLeaveRequest, getleavesBalance, getpolicylist} from '../../api';
import CustomButton from '../../components/Button';
import CalenderInput from '../../components/CalenderInput';
import CustomHeader from '../../components/CustomHeader';
import ErrorModal from '../../components/ErrorModal';
import Spacer from '../../components/Spacer';
import SuccessModal from '../../components/SuccessModal';
import CustomTextInput from '../../components/TextInput';
import {AppScreenWidth, width} from '../../constants/sacling';
import {colors, fonts} from '../../constants/theme';
import {commonStyles, textStyles} from '../../styles';
import selectStyles from '../../styles/selectStyles';

const _format = 'YYYY-MM-DD';
// var now = moment().format();
let _today = moment().format(_format);
const _maxDate = moment().add(1, 'days').format(_format);
const AddLeaveScreen = ({navigation}) => {
  const [endDate, setEndDate] = useState(_today);
  const {user} = useSelector(state => state.LoginReducer);
  const [startDate, setStartDate] = useState(_today);
  const [policy, setPolicy] = useState([]);
  const [leaveNote, setLeaveNotes] = useState('');
  const [leavenoteErrorMessage, setLeaveNoteErrorMessage] = useState('');
  const [selected_policy, setselectedPolicy] = useState(null);
  const [number_of_hours, setNumberofHours] = useState(
    moment(endDate).diff(moment(startDate), 'days') < 2 && is_half_day
      ? '04:00'
      : '08:00',
  );
  const [date_error, setDateError] = useState(false);
  const [validation_error, setValidationError] = useState(false);
  const [validation_error_messaage, setValidationErrorMessaage] =
    useState(null);
  const [remaining_balance_hours, setRemainingBalanceHours] = useState(0);
  const [remaining_balance_hours_int, setRemainingBalanceHoursInt] =
    useState(0);
  const [total_hours, setTotalHours] = useState('');
  const [All_Done, setAllDone] = useState(false);
  const [submissionError, setsubmissionError] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [is_half_day, setIsHalfDay] = useState(false);
  useEffect(() => {
    getpolicylist(user?.account_id)
      .then(response => {
        if (response.status === 200) {
          setPolicy(response.data.data);
        } else {
        }
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    setNumberofHours(
      moment(endDate).diff(moment(startDate), 'days') < 2 && is_half_day
        ? '04:00'
        : '08:00',
    );
  }, [is_half_day]);

  const filterbydate = (date, is_start) => {
    setDateError(false);
    if (is_start) {
      setStartDate(date);
      if (moment(date).isSameOrBefore(moment(endDate))) {
        setDateError(false);
        var days = moment(date).diff(moment(endDate), 'days');
        let hours = (days + 1) * 8;
        if (hours.toString().length === 1) {
          setNumberofHours(`0${hours}:00`);
        } else {
          setNumberofHours(`${hours}:00`);
        }
      } else {
        setDateError(true);
      }
    } else {
      setEndDate(date);
      if (moment(startDate).isSameOrBefore(moment(date))) {
        setDateError(false);
        let days = moment(date).diff(moment(startDate), 'days');
        let hours = (days + 1) * 8;
        console.log(hours.length);
        if (hours.toString().length === 1) {
          setNumberofHours(`0${hours}:00`);
        } else {
          setNumberofHours(`${hours}:00`);
        }
      } else {
        setDateError(true);
      }
    }
  };

  const getRemaningBalance = value => {
    setselectedPolicy(value);
    let hrs = policy
      .filter(function (item) {
        return item.leave_policy_id === value;
      })
      .map(function ({maximum_leaves}) {
        return maximum_leaves;
      });
    let t_hrs =
      parseInt(hrs[0].split(':')[0]) +
      parseFloat(hrs[0].split(':')[1] / 60) +
      parseFloat(hrs[0].split(':')[2] / 3600);
    setTotalHours(parseInt(t_hrs));
    getleavesBalance(user.account_id, user.candidate_id, value).then(
      response => {
        if (response.status === 200) {
          if (response.data.data.length > 0) {
            let t_r_h = parseInt(t_hrs - response.data.data[0].total_hours);
            if (t_r_h.length < 2) {
              setRemainingBalanceHours(`0${t_r_h}:00`);
              setRemainingBalanceHoursInt(t_r_h);
            } else {
              setRemainingBalanceHours(`${t_r_h}:00`);
              setRemainingBalanceHoursInt(t_r_h);
            }
          } else {
            if (t_hrs.length < 2) {
              setRemainingBalanceHours(`0${parseInt(t_hrs)}:00`);
              setRemainingBalanceHoursInt(t_hrs);
            } else {
              setRemainingBalanceHours(`${parseInt(t_hrs)}:00`);
              setRemainingBalanceHoursInt(t_hrs);
            }
          }
        } else {
          alert(response.status);
        }
      },
    );
  };

  const validateLeaveApplication = () => {
    setProcessing(true);
    setValidationErrorMessaage(null);
    setValidationError(false);
    if (selected_policy == null) {
      setValidationErrorMessaage('Please select policy');
      setValidationError(true);
      setProcessing(false);
      return;
    }
    if (!moment(startDate).isSameOrBefore(moment(endDate))) {
      setValidationErrorMessaage(
        'Start Date must be same or before then end date',
      );
      setValidationError(true);
      setProcessing(false);
      return;
    }
    if (leaveNote === '') {
      setValidationErrorMessaage('Please enter some notes.');
      setValidationError(true);
      setProcessing(false);
      return;
    }

    let data = {
      leave_policy_id: selected_policy,
      start_date: startDate,
      end_date: endDate,
      requested_hours: number_of_hours,
      is_half_day: is_half_day ? '1' : '0',
      status: 0,
      comments: leaveNote,
      module_id: '4',
      requested_by: user.candidate_id,
      requested_date: `${moment().format('DD-MMM-YYYY HH:mm:ss')}`,
      account_id: user.account_id,
    };

    addLeaveRequest(data)
      .then(response => {
        if (response.status === 200) {
          setProcessing(false);
          setAllDone(true);
          setsubmissionError(false);
        } else {
          setProcessing(false);
          setAllDone(true);
          setsubmissionError(true);
        }
      })
      .catch(err => {
        setProcessing(false);
        setAllDone(true);
        setsubmissionError(true);
      });
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.dark_primary_color}}>
      <NativeBaseProvider>
        <View style={commonStyles.container}>
          <CustomHeader
            show_backButton={true}
            isdrawer={false}
            onPress={() => navigation.goBack()}
            title={'Leave Application'}
          />
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom: verticalScale(100)}}>
            <Spacer />
            <CustomTextInput
              placeholder={'Employee'}
              value={`${user?.first_name} ${user?.last_name}`}
              onChangeText={text => setLeaveNotes(text)}
              errorMessage={leavenoteErrorMessage}
              borderRadius={scale(5)}
              borderWidth={1}
              editable={false}
              lableColor={colors.dark_primary_color}
            />

            <View>
              <Text
                style={{...textStyles.Label, color: colors.dark_primary_color}}>
                Leave Policy *
              </Text>

              <Select
                selectedValue={selected_policy}
                opacity={1}
                bg={'#fff'}
                width={AppScreenWidth}
                placeholderTextColor={colors.text_primary_color}
                fontFamily={fonts.Regular}
                maxHeight={'10'}
                variant={'underlined'}
                accessibilityLabel="Please select policy"
                placeholder="Please select  policy"
                _item={selectStyles._item}
                _selectedItem={selectStyles._selectedItem}
                onValueChange={itemValue => getRemaningBalance(itemValue)}>
                {policy.map((item, index) => {
                  return (
                    <Select.Item
                      key={`${index}`}
                      label={item.policy_name}
                      value={item.leave_policy_id}
                    />
                  );
                })}
              </Select>
            </View>
            <Spacer height={scale(10)} />
            <View
              style={{
                paddingVertical: scale(3),
                borderWidth: 1,
                borderRadius: 5,
                borderColor: 'rgba(0,0,0,.1)',
              }}>
              <View style={styles.Row}>
                <Text style={textStyles.Label}>Total Balance</Text>
                <Text style={textStyles.Label}>
                  {selected_policy === null ? '00:00' : `${total_hours}:00`}{' '}
                  Hours
                </Text>
              </View>

              <View style={styles.Row}>
                <Text style={textStyles.Label}>Leaves Balance</Text>
                <Text style={textStyles.Label}>
                  {selected_policy === null ? '00:00' : remaining_balance_hours}{' '}
                  Hours
                </Text>
              </View>

              <View style={styles.Row}>
                <Text style={textStyles.Label}>Requested Hours</Text>
                <Text style={textStyles.Label}>
                  {selected_policy === null ? '00:00' : number_of_hours} Hours
                </Text>
              </View>

              <View
                style={{...styles.Row, paddingBottom: 0, borderBottomWidth: 0}}>
                <Text style={textStyles.Label}>Remaining Balance</Text>
                <Text style={textStyles.Label}>
                  {selected_policy === null
                    ? '00:00'
                    : `${
                        parseInt(remaining_balance_hours_int) -
                        parseInt(number_of_hours)
                      }:00`}{' '}
                  Hours
                </Text>
              </View>
            </View>
            <Spacer height={scale(10)} />

            <View style={styles.RowDate}>
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
            {date_error && (
              <View style={styles.RowDate}>
                <Text style={textStyles.errorText}>
                  End date must greater or same then start date{' '}
                </Text>
              </View>
            )}
            <CustomTextInput
              placeholder={'Requested Hours'}
              value={number_of_hours !== '' ? `${number_of_hours} Hours` : ''}
              onChangeText={text => setLeaveNotes(text)}
              errorMessage={''}
              editable={false}
              borderRadius={scale(5)}
              borderWidth={1}
              lableColor={colors.dark_primary_color}
            />
            {moment(endDate).diff(moment(startDate), 'days') < 2 ? (
              <View>
                <Text style={{...styles.buleText, fontSize: scale(14)}}>
                  Half day{' '}
                </Text>
                <TouchableOpacity
                  onPress={() => setIsHalfDay(!is_half_day)}
                  style={{
                    width: 20,
                    backgroundColor: is_half_day
                      ? colors.dark_primary_color
                      : '#fff',
                    height: 20,
                    borderWidth: 1,
                    borderRadius: 3,
                    borderColor: '#0002',
                  }}>
                  {is_half_day && (
                    <Entypo name="check" color={'#fff'} size={18} />
                  )}
                </TouchableOpacity>
              </View>
            ) : null}

            <CustomTextInput
              placeholder={'Reason Note'}
              value={leaveNote}
              onChangeText={text => setLeaveNotes(text)}
              errorMessage={leavenoteErrorMessage}
              borderRadius={scale(5)}
              borderWidth={1}
              lableColor={colors.dark_primary_color}
            />

            <View style={styles.row}>
              <Text style={{...textStyles.smallheading, fontSize: scale(12)}}>
                Note:{' '}
              </Text>
              <Text
                style={{...styles.buleText, width: AppScreenWidth - scale(40)}}>
                These employees will be notified through email when your leave
                request is approved
              </Text>
            </View>
            {validation_error && (
              <View style={styles.RowDate}>
                <Text style={textStyles.errorText}>
                  {validation_error_messaage}{' '}
                </Text>
              </View>
            )}
          </ScrollView>
          <View style={styles.BottomView}>
            <CustomButton
              onPress={() => validateLeaveApplication()}
              loading={processing}
              text={'Submit'}
              loadingText={'Processing'}
            />
          </View>
        </View>

        {All_Done ? (
          submissionError ? (
            <ErrorModal
              isVisible={All_Done}
              title="Some Error in submitting leave request"
              onClose={() => {
                setAllDone(false), navigation.goBack();
              }}
            />
          ) : (
            <SuccessModal
              isVisible={All_Done}
              title="Leave request Added Successfully"
              onClose={() => {
                setAllDone(false), navigation.goBack();
              }}
            />
          )
        ) : null}
      </NativeBaseProvider>
    </SafeAreaView>
  );
};

export default AddLeaveScreen;

const styles = StyleSheet.create({
  dateView: {
    flexDirection: 'row',
    width: AppScreenWidth,
    justifyContent: 'space-between',
  },
  BottomView: {
    alignSelf: 'center',
    paddingHorizontal: scale(20),
    paddingVertical: scale(10),
    position: 'absolute',
    backgroundColor: '#fff',
    bottom: 0,
  },
  row: {
    flexDirection: 'row',
    marginTop: scale(2),
    width: AppScreenWidth,
  },
  Row: {
    flexDirection: 'row',
    width: AppScreenWidth,
    justifyContent: 'space-between',
    paddingVertical: scale(3),
    paddingHorizontal: scale(5),
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,.1)',
  },
  RowDate: {
    flexDirection: 'row',
    width: AppScreenWidth,
    justifyContent: 'space-between',
  },
  buleText: {
    ...textStyles.smallheading,
    color: colors.default_primary_color,
    fontSize: scale(10),
  },
  calenderButton: {
    width: scale(30),
    backgroundColor: 'rgba(0,0,0,.1)',
    height: scale(30),
    borderRadius: scale(5),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
