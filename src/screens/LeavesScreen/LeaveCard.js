import React, {memo, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {scale} from 'react-native-size-matters';
import {colors, fonts} from '../../constants/theme';
import {AppScreenWidth} from '../../constants/sacling';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import moment from 'moment';
import DeleteModal from '../../components/DeleteModal';
import ErrorModal from '../../components/ErrorModal';
import {DeleteLeaveRequest} from '../../api';
const LeaveCard = memo(({item, onPress, onDeleteItem}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isErrorVisible, setIsErrorVisible] = useState(false);
  const onDeleteItemLocal = id => {
    DeleteLeaveRequest(id)
      .then(response => {
        if (response.status === 200) {
          setIsVisible(false);
          onDeleteItem();
        }
      })
      .catch(err => {
        setIsErrorVisible(true);
      });
  };
  console.log(item.status, 'Leave iTem');
  return (
    <TouchableOpacity style={styles.mainView}>
      <View style={styles.btnView}>
        <View style={{width: scale(20), height: scale(20)}}>
          <MaterialIcons
            size={scale(20)}
            name={'policy'}
            color={colors.dark_primary_color}
          />
        </View>
        <Text style={styles.textStyle}>{item.policy_name}</Text>
      </View>
      <View style={styles.btnView}>
        <View style={{width: scale(20), height: scale(20)}}>
          <Entypo
            size={scale(20)}
            name={'calendar'}
            color={colors.dark_primary_color}
          />
        </View>
        <Text style={styles.textStyle}>
          {moment(item.requested_date).format('DD-MMM-YYYY hh:mm a')}
        </Text>
      </View>
      <View style={styles.btnView}>
        <View style={{width: scale(20), height: scale(20)}}>
          <Entypo
            size={scale(20)}
            name={'time-slot'}
            color={colors.dark_primary_color}
          />
        </View>
        <Text style={styles.textStyle}>{item.requested_hours} Hours</Text>
      </View>
      <View style={styles.btnView}>
        <View style={{width: scale(20), height: scale(20)}}>
          <Entypo
            size={scale(20)}
            name={'calendar'}
            color={colors.dark_primary_color}
          />
        </View>
        <Text style={styles.textStyle}>
        {moment(item.start_date).format('DD-MM-YYYY')} - {moment(item.end_date).format('DD-MM-YYYY')}
          {/* {item.start_date} - {item.end_date} */}
        </Text>
      </View>
      <View style={styles.btnView}>
        <View style={{width: scale(20), height: scale(20)}}>
          <MaterialCommunityIcons
            name="lightning-bolt"
            color={colors.dark_primary_color}
            size={scale(18)}
          />
        </View>
        <Text
          style={{
            ...styles.textStyle,
            fontSize: scale(11),
            color: '#fff', //item.status == "0" ? "#000" : item.status == 1 ? "#ffff" : item.status == 2 ? "#fff":"#fff",
            backgroundColor:
              item.status === '0'
                ? '#1caf9a'
                : item.status == 1
                ? 'green'
                : item.status == 2
                ? colors.delete_icon
                : colors.delete_icon,
            paddingHorizontal: scale(10),
            paddingVertical: scale(2),
            borderRadius: scale(5),
          }}>
          {item.status == '0'
            ? 'Pending'
            : item.status == 1
            ? 'Accepted'
            : item.status == 2
            ? 'Declined'
            : 'Declined'
            }
        </Text>
      </View>
      {item.status != '1' && item.status != '2' && (
        <View style={styles.buttonView}>
          <TouchableOpacity onPress={onPress} style={{...styles.actionButton}}>
            <MaterialCommunityIcons
              name="clock-edit"
              color={colors.dark_primary_color}
              size={scale(22)}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setIsVisible(true)}
            style={styles.actionButton}>
            <MaterialCommunityIcons
              name="delete"
              color={colors.delete_icon}
              size={scale(22)}
            />
          </TouchableOpacity>
        </View>
      )}
      <DeleteModal
        isVisible={isVisible}
        onCancel={() => setIsVisible(false)}
        onDelete={() => onDeleteItemLocal(item.leave_request_id)}
      />
      <ErrorModal
        isVisible={isErrorVisible}
        title="Some Error in Deleting Leave"
        onClose={() => setIsErrorVisible(false)}
      />
    </TouchableOpacity>
  );
});

export default LeaveCard;

const styles = StyleSheet.create({
  mainView: {
    width: AppScreenWidth,
    alignSelf: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginHorizontal: scale(2),
    backgroundColor: '#fefefe',
    marginVertical: scale(5),
    padding: scale(10),
    borderRadius: scale(10),
  },
  btnView: {
    marginBottom: scale(12),
    flexDirection: 'row',
    alignItems: 'center',
  },
  textStyle: {
    marginLeft: scale(10),
    fontFamily: fonts.Medium,
    color: colors.text_primary_color,
  },
  buttonView: {
    position: 'absolute',
    bottom: scale(5),
    right: scale(5),
    height: scale(30),
    borderWidth: 0,
    borderColor: colors.text_primary_color,
    borderRadius: 5,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  actionButton: {
    height: scale(30) - 2,
    paddingHorizontal: scale(5),
    alignItems: 'center',
    justifyContent: 'center',
  },
});
