import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import {scale, verticalScale} from 'react-native-size-matters';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {colors, fonts} from '../constants/theme';
import {textStyles} from '../styles';
const CreateExperinceItem = ({item, index, onDelete}) => {
  const navigation = useNavigation();
  const rightButtons = () => {
    return (
      <View style={styles.ActionButtonRows}>
        <TouchableOpacity
          onPress={() => onDelete()}
          style={{...styles.actionButton}}>
            {/* style = {{...styles.ActionButton, backgroundColor: colors.error_text}} */}
              <MaterialCommunityIcons name="delete" color={colors.delete_icon} size={scale(22)} />
          {/* <AntDesign name="delete" color={colors.white} size={scale(22)} /> */}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('EditExperienceScreen', item)}
          
          style={styles.ActionButton}>
             <MaterialCommunityIcons 
                                name="clock-edit" 
                                color={colors.dark_primary_color} 
                                size={scale(22)} 
                            />
          {/* <AntDesign name="edit" color={colors.white} size={scale(22)} /> */}
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <Swipeable key={item.key} renderRightActions={rightButtons}>
      <TouchableOpacity key={`${index}`} style={styles.EducationMainView}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image
            style={styles.ImageView}
            source={require('../assets/images/job.png')}
          />
        </View>
        <View style={{marginLeft: scale(15), width: '80%'}}>
          <Text style={styles.job_tiltetext}>{item.job_title}</Text>
          <Text style={styles.Addresstext}>{item.job_duties}</Text>

          <Text style={styles.date}>
            {`${moment(item.experience_start_date).format('MMM YYYY')} -`}
            {item.is_currently_working === '1'
              ? 'Present'
              : `${moment(item.experience_end_date).format('MMM YYYY')}`}
            {'  •  '}

            {item.is_currently_working == '1'
              ? moment(item.experience_start_date).fromNow()
              : moment([item.experience_start_date]).from(
                  moment([item.experience_end_date]),
                )}
          </Text>
        </View>
      </TouchableOpacity>
    </Swipeable>
  );
};
export default CreateExperinceItem;

const styles = StyleSheet.create({
  EditButton: {
    alignSelf: 'flex-end',
    backgroundColor: colors.dark_primary_color,
    paddingHorizontal: widthPercentageToDP(2),
    paddingVertical: widthPercentageToDP(2),
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: widthPercentageToDP(14),
    height: widthPercentageToDP(14),
    borderRadius: widthPercentageToDP(10),
    right: widthPercentageToDP(2),
    bottom: widthPercentageToDP(10),
  },
  actionButton:{
    height:scale(30)-2, 
    paddingHorizontal:scale(5), 
    alignItems:"center", 
    justifyContent:"center"
},
  profileInfoText: {
    ...textStyles.Label,
    fontSize: scale(12),
    color: '#fff',
    width: widthPercentageToDP(88),
    paddingVertical: wp(1),

    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,.2)',
    marginBottom: 2,
  },
  Card: {
    borderTopLeftRadius: 25,
    elevation: 10,
    borderTopRightRadius: 25,
    backgroundColor: '#fff',
    flex: 1,
    padding: 25,
    width: wp(100),
    marginTop: hp(-5),
  },
  ActionButtonRows: {
    borderTopRightRadius: scale(5),
    overflow: 'hidden',
    borderBottomRightRadius: scale(5),
    justifyContent: 'space-evenly',
    // backgroundColor: 'red',
    alignItems: 'center',
    marginVertical: scale(5),
  },
  ActionButton: {
    paddingHorizontal: scale(10),
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    // backgroundColor: '#e6a020',
  },
  EducationMainView: {
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,.03)',

    paddingVertical: verticalScale(8),
  },
  ImageView: {
    width: wp(15),
    height: wp(15),
    // tintColor:colors.dark_primary_color,
    borderRadius: wp(15),
  },
  job_tiltetext: {
    fontFamily: fonts.Medium,
    fontSize: scale(14),
    includeFontPadding: false,
    color: '#191919',
  },
  Addresstext: {
    fontFamily: fonts.Medium,
    fontSize: scale(12),
    includeFontPadding: false,
    color: '#191919',
  },
  date: {
    fontFamily: fonts.Medium,
    fontSize: scale(11),
    includeFontPadding: false,
  },
});
