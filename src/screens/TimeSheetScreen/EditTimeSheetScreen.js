import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  Platform,
  Text,
  TouchableOpacity,
} from 'react-native';
import moment from 'moment';
import {useSelector} from 'react-redux';
import AntDesign from 'react-native-vector-icons/FontAwesome';
import {commonStyles, selectStyles, textStyles} from '../../styles';
import {NativeBaseProvider, Select} from 'native-base';
import CustomButton from '../../components/Button';
import CalenderInput from '../../components/CalenderInput';
import CustomHeader from '../../components/CustomHeader';
import {scale} from 'react-native-size-matters';
import UpLoadComponent from '../../components/Uploadcomponent';
import WeeklySummary from './AddSummary';
import Spacer from '../../components/Spacer';
import DrawLine from '../../components/DrawLine';
import {AppScreenWidth} from '../../constants/sacling';
import {colors, fonts} from '../../constants/theme';
import BlockLoading from '../../components/BlockLoading';
import AlertModal from '../../components/AlertModal';
import ErrorModal from '../../components/ErrorModal';
import SuccessModal from '../../components/SuccessModal';
import {
  getEditTimeSheetDetails,
  getJobWorkingDays,
  EditTimeSheet,
  jobTimeTypes,
} from '../../api';
import BaseUrl from '../../api/BaseUrl';
import CustomStatusBar from '../../components/StatusBar';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import CustomTextInput from '../../components/TextInput';
const MODULE_ID = '52';
const EditTimeSheetScreen = ({navigation, route}) => {
  let item = route.params.item;

  const {user} = useSelector(state => state.LoginReducer);
  const {status} = useSelector(state => state.StatusReducer);
  const [timesheet_status, setTimeSheetStatus] = useState(
    status.filter(obj => obj.module_id === MODULE_ID),
  );
  const [submit, setSubmit] = useState(false);
  const [draft, setDraft] = useState(false);
  const [comments, setComments] = useState('');
  const [startDate, setStartDate] = useState(item.log_date);
  const [loading, setLoading] = useState(true);
  const [filepath, setFilePath] = useState({
    path: null,
    ext: null,
    name: null,
  });
  // Data from API
  const [job_working_days, set_job_working_days] = useState([]); // get this from API
  const [job_time_types, set_job_time_types] = useState([]); // get this from database
  const [jobs, setJobs] = useState([]); // get this from API
  /*
        //  when user tap on ta this will chnage with this we will 
            reset the following 
            alldata
            week_days
            time_type
        */
  const [time_sheet_type, set_time_sheet_type] = useState(item.time_sheet_view);
  const [selected_job, set_selected_job] = useState(item.job_id); // user  select job
  const [week_days, setWeekDays] = useState([]);

  // these both are reset with tab chnages
  const [alldata, setAlldata] = useState([]);
  const [time_type, setTimeType] = useState([]);
  const [date_error_message, setDateErrorMessage] = useState(null);
  const [error_messaage, set_error_messsage] = useState(null);
  const [visible, setVisible] = useState(false);
  const [All_Done, setAllDone] = useState(false);
  const [submissionError, setsubmissionError] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [message_to_show_in_modal, setMessageToShowInMdodal] = useState('');
  useEffect(() => {
    getnumberofworkingdays(item.log_date);
    getEditTimeSheetDetails(
      item.time_sheet_id,
      user.candidate_id,
      user.account_id,
      item.job_id,
    )
      .then(response => {
        setJobs(response.data.jobs);
        let arr2 = Object.entries(
          JSON.parse(response.data.working_days[0].working_days_config),
        );
        // convert two dmnentional arra to one dimentional array
        set_job_working_days(arr2.map(([day, value]) => ({day, value})));
        set_job_time_types(response.data.job_time_types);
        setTimeType(response.data.timesheet_time_types);

        setFilePath({
          ...filepath,
          path: response.data.timesheet_data.document_file,
          name: response.data.timesheet_data.document_title,
        });
        let data = groupBy(response.data.timesheet_logs, 'type');
        console.log(data, 'dataa');
        let d2 = Object.entries(data);
        let temp = [...alldata];
        d2.map((item, index) => temp.push(item[1]));
        setAlldata(temp);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  function groupBy(arr, property) {
    return arr.reduce(function (memo, x) {
      if (!memo[x[property]]) {
        memo[x[property]] = [];
      }
      memo[x[property]].push(x);
      return memo;
    }, {});
  }

  // Pure API Call on job Selection
  const getJobtimetype = () => {
    setAlldata([]);
    setLoading(true);
    getJobWorkingDays(user.account_id, selected_job)
      .then(response => {
        if (response.status === 200) {
          // convert object to two dimentional arrays ,
          let arr2 = Object.entries(
            JSON.parse(response.data.data[0].working_days_config),
          );
          // convert twodmnentional arra to one dimentional array
          set_job_working_days(arr2.map(([day, value]) => ({day, value})));
        } else {
          alert('Some Error');
        }
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });

    jobTimeTypes(user.account_id, selected_job)
      .then(response => {
        if (response.status === 200) {
          set_job_time_types(response.data.data);
        } else {
          alert('Some Error');
        }

        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  };

  function getISOWeekDates(isoWeekNum = 1, year = new Date().getFullYear()) {
    let d = moment()
      .isoWeek(0)
      .startOf('isoWeek')
      .add(isoWeekNum - 1, 'weeks');
    for (var dates = [], i = 0; i < 7; i++) {
      dates.push({
        date: d.format('DD-MMM-YYYY'),
        insert_date: d.format('DD-MMM-YYYY'),
        hours: null,
      });
      d.add(1, 'day');
    }
    return dates;
  }
  const localTimeType = (val, index) => {
    console.log(val, index);
    let temp = [...time_type];
    temp[index].id = val;
    setTimeType(temp);
  };

  const getnumberofworkingdays = async date => {
    if (time_sheet_type === 'Week') {
      const weekNumber = moment(date).format('w');
      let weekdays = await getISOWeekDates(weekNumber);
      setWeekDays(weekdays);
    } else {
      let weekdays = moment(date).format('DD-MMM-YYYY');
      setWeekDays([
        {
          date: weekdays,
          insert_date: weekdays.format('DD-MMM-YYYY'),
          hours: null,
        },
      ]);
    }
  };
  // call this function when user change StartDate
  const getNumberofdays = async date => {
    setTimeType([{name: null, error: false}]);
    setStartDate(date);
    if (time_sheet_type === 'Week') {
      const weekNumber = moment(date).format('w');
      let weekdays = await getISOWeekDates(weekNumber);
      setWeekDays(weekdays);
      setAlldata([[...weekdays]]);
    } else {
      let weekdays = moment(date).format('DD-MMM-YYYY'); //ddd DD MMM
      setWeekDays([
        {
          date: weekdays,
          insert_date: weekdays.format('DD-MMM-YYYY'),
          hours: null,
        },
      ]);
      setAlldata([[...weekdays]]);
    }
  };

  const FunsetHours = (i, text, index) => {
    let temparray = alldata;
    temparray[index][i].hours = text;
    setAlldata(temparray);
  };

  const ValidateData = is_draft => {
    let error = false;
    if (selected_job == null) {
      setVisible(true);
      set_error_messsage('Please select job first');
      return;
    }
    if (startDate === '') {
      setVisible(true);
      set_error_messsage('Please select start Date');
      return;
    }
    if (alldata.length < 1) {
      setVisible(true);
      set_error_messsage('Please enter at least one value');
      return;
    }
    const logs = [];
    alldata.every((item, i) => {
      let is_value_not_zero = item.some(e => e.hours > 0);
      if (time_type[i].name == null) {
        let temp = [...time_type];
        temp[i].error = true;
        error = true;
        setTimeType(temp);
      } else {
        let temp = [...time_type];
        temp[i].error = false;
        setTimeType(temp);
      }
      setVisible(!is_value_not_zero);
      error = !is_value_not_zero;
      set_error_messsage('Please enter at least one value');
      return is_value_not_zero;
    });
    if (!error) {
      setLoading(true);
      alldata.forEach((item, i) => {
        item.forEach((itm, index) => {
          if (itm.hours > 0 && itm.hours !== null) {
            logs.push({
              log_type: itm.type,
              log_date: itm.date,
              log_hours: moment(itm.hours.toString(), 'LT').format('hh:mm:ss'),
            });
          }
        });
      });

      if (filepath.path !== null) {
        let s_job = jobs.find(x => (x.job_id = selected_job));
        var formdata = new FormData();
        formdata.append('account_id', user.account_id);
        formdata.append('module_pk_id', '52');
        formdata.append('module_id', '52');
        formdata.append('user_id', user.candidate_id);
        formdata.append('file', {
          uri:
            Platform.OS === 'android'
              ? 'file:///' + filepath.path.split('file:/').join('')
              : filepath.path.replace('file://', ''),
          type: filepath.ext,
          name: `${Date.now()}_${filepath.name}`,
        });
        formdata.append('upload_file', '1');
        formdata.append('filename_prefix', 'time_sheet');
        var requestOptions = {
          method: 'POST',
          headers: {
            Authorization: 'Bearer 4545980ce66bd555d903f7dc739f91e631606eb1',
            'Content-Type': 'multipart/form-data; ',
          },
          body: formdata,
        };

        fetch(`${BaseUrl}files`, requestOptions)
          .then(data => data.json())
          .then(data2 => {
            let data = {
              job_id: selected_job,
              candidate_id: user.candidate_id,
              account_id: user.account_id,
              module_status_id: is_draft
                ? timesheet_status
                    .filter(obj => obj.module_status_name === 'Draft')
                    .map(o => o.module_status_id)[0]
                : timesheet_status
                    .filter(obj => obj.module_status_name === 'Submitted')
                    .map(o => o.module_status_id)[0],
              time_sheet_view: time_sheet_type,
              time_sheet_view: time_sheet_type,
              placement_id: s_job.placement_id,
              comments: comments,
              is_attachment: filepath.path !== null ? '1' : '0',
              time_sheet_id: data2.insert_doc_id,
              title: filepath.name,
              path: data2.path,
              logs: logs,
            };

            EditTimeSheet(item.time_sheet_id, data)
              .then(response => {
                if (response.status === 200) {
                  if (is_draft) {
                    setMessageToShowInMdodal(
                      'TimeSheet draft saved successfully',
                    );
                  } else {
                    setMessageToShowInMdodal(
                      'TimeSheet submitted successfully',
                    );
                  }

                  setProcessing(false);
                  setAllDone(true);
                  setsubmissionError(false);
                } else {
                  if (is_draft) {
                    setMessageToShowInMdodal('TimeSheet draft has some error');
                  } else {
                    setMessageToShowInMdodal('TimeSheet has some error');
                  }

                  setProcessing(false);
                  setAllDone(true);
                  setsubmissionError(true);
                }
                setLoading(false);
              })
              .catch(err => {
                if (is_draft) {
                  setMessageToShowInMdodal('TimeSheet draft has some error');
                } else {
                  setMessageToShowInMdodal('TimeSheet has some error');
                }
                setProcessing(false);
                setAllDone(true);
                setsubmissionError(true);
                setLoading(false);
              });
          })
          .catch(err => {
            setMessageToShowInMdodal('Attachment does not uploaded');
            setProcessing(false);
            setAllDone(true);
            setsubmissionError(true);
            setLoading(false);
          });
      } else {
        let s_job = jobs.find(x => (x.job_id = selected_job));
        let data = {
          job_id: selected_job,
          candidate_id: user.candidate_id,
          account_id: user.account_id,
          module_status_id: is_draft
            ? timesheet_status
                .filter(obj => obj.module_status_name === 'Draft')
                .map(o => o.module_status_id)[0]
            : timesheet_status
                .filter(obj => obj.module_status_name === 'Submitted')
                .map(o => o.module_status_id)[0],

          time_sheet_view: time_sheet_type,
          placement_id: s_job.placement_id,
          comments: comments,
          is_attachment: '0',
          logs: logs,
        };

        EditTimeSheet(item.time_sheet_id, data)
          .then(response => {
            if (response.status === 200) {
              if (is_draft) {
                setMessageToShowInMdodal('TimeSheet draft saved successfully');
              } else {
                setMessageToShowInMdodal('TimeSheet submitted successfully');
              }

              setProcessing(false);
              setAllDone(true);
              setsubmissionError(false);
            } else {
              if (is_draft) {
                setMessageToShowInMdodal('TimeSheet draft has some error');
              } else {
                setMessageToShowInMdodal('TimeSheet has some error');
              }

              setProcessing(false);
              setAllDone(true);
              setsubmissionError(true);
            }
            setLoading(false);
          })
          .catch(err => {
            if (is_draft) {
              setMessageToShowInMdodal('TimeSheet draft has some error');
            } else {
              setMessageToShowInMdodal('TimeSheet has some error');
            }
            setProcessing(false);
            setAllDone(true);
            setsubmissionError(true);
            setLoading(false);
          });
      }
    }
  };

  const addButton = () => {
    if (startDate == '') {
      setDateErrorMessage('Please select date first');
      return;
    }
    setDateErrorMessage(null);
    if (time_sheet_type === 'Week') {
      let t_type = [time_type];
      t_type.push({name: null, error: false});
      setTimeType(t_type);
      let temp = [...alldata];
      temp.push(week_days);
      setAlldata(temp);
    } else {
      let t_type = time_type;
      t_type.push({name: null, error: false});
      setTimeType(t_type);
      let temp = alldata;

      temp.push(week_days);
      setAlldata(temp);
    }
  };

  const deleteItem = index => {
    if (alldata.length > 1) {
      let temp = [...alldata];
      temp.splice(index, 1);
      setAlldata(temp);
      let t_type = [...time_type];
      t_type.splice(index, 1);
      setTimeType(t_type);
    } else {
      alert('Must have a least one item');
    }
  };

  const changeTab = async value => {
    if (startDate == '') {
      setDateErrorMessage('Please select date first');
      return;
    }
    set_time_sheet_type(value);
    setDateErrorMessage(null);
    setAlldata([]);
    setTimeType([]);
    if (value === 'Week') {
      const weekNumber = moment(startDate).format('w');
      let wdays = await getISOWeekDates(weekNumber);
      setWeekDays(wdays);
    } else {
      let wdays = moment(startDate).format('DD-MMM-YYYY'); //ddd DD MMM
      setWeekDays([
        {
          date: wdays,
          insert_date: moment(startDate).format('DD-MMM-YYYY'),
          hours: null,
        },
      ]);
    }
  };
  // return null

  return (
    <SafeAreaProvider>
      <CustomStatusBar />
      <NativeBaseProvider>
        <View style={commonStyles.container}>
          <CustomHeader
            show_backButton={true}
            isdrawer={false}
            onPress={() => navigation.goBack()}
            title={'Edit TimeSheet'}
          />
          <View style={styles.Row}>
            <View>
              <Text style={styles.label}>Select Job</Text>
              <Spacer height={scale(3)} />
              <Select
                selectedValue={selected_job}
                width={AppScreenWidth / 2 - scale(5)}
                placeholderTextColor={colors.text_primary_color}
                fontFamily={fonts.Regular}
                maxHeight={'10'}
                accessibilityLabel="Please select type"
                placeholder="Please select type"
                _item={selectStyles._item}
                _selectedItem={selectStyles._selectedItem}
                onValueChange={itemValue => {
                  set_selected_job(itemValue);
                  getJobtimetype();
                }}>
                {jobs.map((item, index) => {
                  return (
                    <Select.Item
                      key={`${item.job_id}`}
                      label={item.job_title}
                      value={item.job_id}
                    />
                  );
                })}
              </Select>
            </View>
            <View>
              <Text style={styles.label}>Select Date</Text>

              <CalenderInput
                placeholder={'Start Date'}
                value={startDate}
                errorMessage={''}
                w={AppScreenWidth / 2 - scale(5)}
                show_label={false}
                hght={scale(40)}
                onChangeText={data => getNumberofdays(data)}
              />
            </View>
          </View>
          <Spacer />
          <View>
            <Text style={styles.label}>Select TimeSheet Type</Text>
            <Spacer height={scale(3)} />
            <View style={{...styles.tabview}}>
              <TouchableOpacity
                onPress={() => changeTab('Day')}
                style={{
                  ...styles.tabitem,
                  backgroundColor:
                    time_sheet_type === 'Day'
                      ? colors.dark_primary_color
                      : '#fff',
                  borderRightWidth: 1,
                }}>
                <Text
                  style={{
                    ...styles.label,
                    color: time_sheet_type === 'Day' ? '#fff' : '#000',
                  }}>
                  Day
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => changeTab('Week')}
                style={{
                  ...styles.tabitem,
                  backgroundColor:
                    time_sheet_type === 'Week'
                      ? colors.dark_primary_color
                      : '#fff',
                }}>
                <Text
                  style={{
                    ...styles.label,
                    color: time_sheet_type === 'Week' ? '#fff' : '#000',
                  }}>
                  Week
                </Text>
              </TouchableOpacity>
            </View>
            {date_error_message !== null && (
              <Text style={{...textStyles.errorText, marginTop: scale(3)}}>
                {date_error_message}
              </Text>
            )}
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom: scale(100)}}>
            <Spacer />
            <WeeklySummary
              editable={true}
              job_time_types={job_time_types}
              alldata={alldata}
              setHours={(i, text, index) => FunsetHours(i, text, index)}
              time_type={time_type}
              job_working_days={job_working_days}
              deleteItem={i => deleteItem(i)}
              localTimeType={(val, i) => localTimeType(val, i)}
            />
            <Spacer />
            <TouchableOpacity onPress={() => addButton()} style={styles.button}>
              <AntDesign name={'plus'} size={scale(16)} color={'#fff'} />
            </TouchableOpacity>

            <View>
              <CustomTextInput
                placeholder={'Comments'}
                value={comments}
                borderWidth={1}
                lableColor={colors.dark_primary_color}
                borderRadius={scale(5)}
                onChangeText={text => {
                  setComments(text);
                }}
                errorMessage={''}
              />
            </View>
            <Spacer />
            <DrawLine />
            <UpLoadComponent
              filepath={filepath}
              setFilePath={file => setFilePath(file)}
            />
            <Spacer />
            <DrawLine />
            <Spacer />
            <View style={styles.bottomButtons}>
              <CustomButton
                loading={submit}
                loadingText={'Submitting'}
                onPress={() => ValidateData(false)}
                backgroundColor={'#0073B4'}
                text={'Submit'}
                marginTop={scale(10)}
              />
              <Spacer />
              <CustomButton
                loading={draft}
                loadingText={'Saving'}
                onPress={() => ValidateData(true)}
                text={'Update'}
                //backgroundColor={colors.delete_icon}
                marginTop={scale(10)}
              />
            </View>
          </ScrollView>
        </View>
        {loading && <BlockLoading />}
        {visible && (
          <AlertModal
            is_error={true}
            visible={visible}
            setVisible={() => setVisible(false)}
            error_messaage={error_messaage}
            title={'Form Submission Error'}
          />
        )}
        {All_Done ? (
          submissionError ? (
            <ErrorModal
              is_error={true}
              isVisible={visible}
              onClose={() => setVisible(false)}
              error_messaage={error_messaage}
              title={error_messaage}
            />
          ) : (
            <SuccessModal
              isVisible={All_Done}
              title={`${message_to_show_in_modal}`}
              onClose={() => {
                setAllDone(false);
                navigation.goBack();
              }}
            />
          )
        ) : null}
      </NativeBaseProvider>
    </SafeAreaProvider>
  );
};

export default EditTimeSheetScreen;

const styles = StyleSheet.create({
  Row: {
    flexDirection: 'row',
    width: AppScreenWidth,
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  button: {
    backgroundColor: 'green',
    padding: scale(10),
    width: scale(50),
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'flex-start',
    borderWidth: 1,

    borderColor: 'rgba(0,0,0,.3)',
    borderRadius: scale(5),
  },
  text: {
    ...textStyles.smallheading,
    backgroundColor: '#0000',
    alignSelf: 'flex-start',
    includeFontPadding: false,
    color: '#fff',
    marginLeft: scale(5),
    textAlign: 'left',
  },
  label: {
    ...textStyles.smallheading,
    fontSize: scale(12),
    color: colors.text_primary_color,
  },
  bottomButtons: {
    position: 'absolute',
    width: AppScreenWidth,
    flex: 1,
    bottom: 0,
    height: scale(100),
  },

  tabview: {
    flexDirection: 'row',
    width: AppScreenWidth,
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 42,
    borderRadius: 5,
    borderWidth: 1,
    overflow: 'hidden',
    borderColor: colors.divide_color,
    backgroundColor: '#fff',
  },
  tabitem: {
    width: AppScreenWidth / 2,
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    borderRadius: 0,
    borderWidth: 0,
    borderColor: colors.divide_color,
    backgroundColor: '#fff',
  },
});
