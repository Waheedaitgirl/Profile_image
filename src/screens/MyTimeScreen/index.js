import React, {useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import {scale, verticalScale} from 'react-native-size-matters';
import {commonStyles, textStyles} from '../../styles';
import CustomHeader from '../../components/CustomHeader';
import {MainRoutes} from '../../constants/routes';
import {colors, fonts} from '../../constants/theme';
import {AppScreenWidth, hp, width} from '../../constants/sacling';
import {useSelector} from 'react-redux';
const MyTimeScreen = ({navigation}) => {
  const {user} = useSelector(state => state.LoginReducer);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.dark_primary_color}}>
      <StatusBar barStyle={'light-content'} />
      <View style={commonStyles.container}>
        <CustomHeader
          show_backButton={true}
          isdrawer={true}
          onPress={() => navigation.openDrawer()}
          title={'My Time'}
        />

        <View style={styles.main2}>
          <Text style={styles.paragraph}>
            Copyright @{new Date().getFullYear()} RecruitBPM All Rights Reserved
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default MyTimeScreen;

const styles = StyleSheet.create({
  main: {
    height: hp(55),
    width: width * 1.2,
    zIndex: -1,
    position: 'absolute',
    top: verticalScale(40),
    borderBottomRightRadius: hp(100),
    backgroundColor: colors.dark_primary_color,
  },
  main2: {
    height: hp(5),
    width: width,
    zIndex: 10,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: scale(5),
    bottom: scale(0),

    borderTopLeftRadius: hp(3),
    borderTopRightRadius: hp(3),
    backgroundColor: colors.dark_primary_color,
  },
  headingtext: {
    ...textStyles.heading,
    fontSize: scale(22),
    color: '#fff',
    textAlign: 'left',
  },
  nameText: {
    ...textStyles.title,
    fontSize: scale(18),
    marginTop: scale(2),
    marginHorizontal: scale(5),
    color: '#fff',
    textAlign: 'left',
  },
  paragraph: {
    ...textStyles.paragraph,
    fontSize: scale(12),
    color: '#fff',
    includeFontPadding: false,
    marginHorizontal: scale(5),
    textAlign: 'left',
  },
  row: {
    width: AppScreenWidth,
    alignSelf: 'center',
    flexDirection: 'row',
    marginVertical: hp(2),
    justifyContent: 'space-evenly',
  },
  box: {
    width: AppScreenWidth / 2 - scale(20),
    height: AppScreenWidth / 2 - scale(20),
    backgroundColor: '#fff',
    elevation: 10,
    padding: hp(5),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scale(10),
    borderBottomWidth: 3,
    borderWidth: 0,
    borderColor: '#fff',
    borderBottomColor: colors.secondary_text_color,
  },
  textStyle: {
    marginTop: scale(10),
    fontFamily: fonts.Medium,
    fontSize: scale(14),
    color: colors.secondary_text_color,
  },
});
