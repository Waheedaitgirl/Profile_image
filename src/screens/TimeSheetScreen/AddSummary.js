import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {scale} from 'react-native-size-matters';
import {AppScreenWidth} from '../../constants/sacling';
import {colors, fonts} from '../../constants/theme';
import {textStyles} from '../../styles/textStyles';
import TimeInput from './TimeInput';
import {NativeBaseProvider, Select} from 'native-base';
import {selectStyles} from '../../styles';
import Spacer from '../../components/Spacer';
import Entypo from 'react-native-vector-icons/Entypo';
const AddWeeklySummary = ({
  localTimeType,
  time_type,
  alldata,
  editable,
  job_time_types,
  deleteItem,
  setHours,
  job_working_days,
}) => {
  return (
    <NativeBaseProvider>
      {alldata.map((item, maindex) => {
        return (
          <View style={styles.mainview} key={`${maindex}`}>
            <View style={styles.Row}>
              <View>
                <Text style={styles.label}>Time Type</Text>
                <Spacer />
                <ScrollView
                  overScrollMode={'always'}
                  nestedScrollEnabled={true}
                  horizontal={true}>
                  <Select
                    selectedValue={time_type[maindex]?.id}
                    width={AppScreenWidth / 2}
                    placeholderTextColor={colors.text_primary_color}
                    fontFamily={fonts.Regular}
                    maxHeight={'10'}
                    accessibilityLabel="Please select type"
                    placeholder="Please select  type"
                    _item={selectStyles._item}
                    _selectedItem={selectStyles._selectedItem}
                    onValueChange={itemValue => {
                      localTimeType(itemValue, maindex);
                    }}>
                    {job_time_types.map((item, index) => {
                      return (
                        <Select.Item
                          key={`${item.id}`}
                          label={item.name}
                          value={item.id}
                        />
                      );
                    })}
                  </Select>
                </ScrollView>
              </View>

              <TouchableOpacity
                onPress={() => deleteItem(maindex)}
                style={styles.deletebutton}>
                <Entypo
                  name={'squared-cross'}
                  color={colors.delete_icon}
                  size={scale(32)}
                />
              </TouchableOpacity>
            </View>
            {time_type[maindex]?.error && (
              <Text style={{...styles.label, color: colors.delete_icon}}>
                Please select time type
              </Text>
            )}
            <Spacer />
            <Text style={styles.text}>
              {editable ? 'Enter Summary' : 'Daily Summary'}
            </Text>
            <FlatList
              data={item}
              showsHorizontalScrollIndicator={false}
              keyExtractor={(_item, index) => index.toString()}
              renderItem={({item, index}) => {
                let local_edit = true;
                if (alldata[maindex]?.length === 1) {
                  local_edit = job_working_days.some(
                    item =>
                      item['day'] === 'first-day' ||
                      item['day'] === 'second-day' ||
                      item['day'] === 'third-day' ||
                      item['day'] === 'fourth-day' ||
                      item['day'] === 'fifth-day' ||
                      item['day'] === 'sixth-day' ||
                      item['day'] === 'seventh-day',
                  );
                } else {
                  if (index === 0) {
                    local_edit = job_working_days.some(
                      item => item['day'] === 'first-day',
                    );
                  }
                  if (index === 1) {
                    local_edit = job_working_days.some(
                      item => item['day'] === 'second-day',
                    );
                  }
                  if (index === 2) {
                    local_edit = job_working_days.some(
                      item => item['day'] === 'third-day',
                    );
                  }
                  if (index === 3) {
                    local_edit = job_working_days.some(
                      item => item['day'] === 'fourth-day',
                    );
                  }
                  if (index === 4) {
                    local_edit = job_working_days.some(
                      item => item['day'] === 'fifth-day',
                    );
                  }
                  if (index === 5) {
                    local_edit = job_working_days.some(
                      item => item['day'] === 'sixth-day',
                    );
                  }
                  if (index === 6) {
                    local_edit = job_working_days.some(
                      item => item['day'] === 'seventh-day',
                    );
                  }
                }
                return (
                  // <TimeInput
                  //     item={item}
                  //     editable={local_edit}
                  //     index={index}
                  //     setHours={(i, d) => setHours(i,d, maindex)}
                  // />
                  <TimeInput
                    item={item}
                    editable={true}
                    index={index}
                    setHours={(i, d) => setHours(i, d, maindex)}
                  />
                );
              }}
            />
          </View>
        );
      })}
    </NativeBaseProvider>
  );
};
export default AddWeeklySummary;

const styles = StyleSheet.create({
  text: {
    ...textStyles.smallheading,
    backgroundColor: '#0000',
    alignSelf: 'flex-start',
    textAlign: 'left',
  },
  textinput: {
    backgroundColor: 'rgba(0,0,0,.1)',
    paddingTop: 0,
    paddingBottom: 0,
    marginTop: scale(5),
    textAlign: 'center',
    height: scale(30),
    fontFamily: fonts.Regular,
    borderRadius: 5,
  },
  deletebutton: {
    width: 50,
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    borderRadius: 5,
    borderWidth: 0,
    borderColor: 'red',
    backgroundColor: '#fff',
  },
  mainview: {
    width: AppScreenWidth,
    padding: scale(5),
    alignSelf: 'center',
    borderWidth: 1,
    marginBottom: scale(5),
    borderColor: 'rgba(0,0,0,.05)',
    borderRadius: scale(5),
  },
  label: {
    ...textStyles.smallheading,
    fontSize: scale(12),
    color: colors.text_primary_color,
    paddingTop: scale(5),
  },
  Row: {
    flexDirection: 'row',
    width: AppScreenWidth,
    alignItems: 'flex-end',
  },
});
