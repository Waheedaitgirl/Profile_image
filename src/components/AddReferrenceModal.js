import React, {useReducer} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Image,
  Platform,
  Text,
  StatusBar,
  View,
} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';
import {AppScreenWidth, hp} from '../constants/sacling';
import Modal from 'react-native-modal';
import CustomTextInput from './TextInput';
import CustomButton from './Button';
import {textStyles} from '../styles';
import {colors, fonts} from '../constants/theme';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
};
const AddReferrenceModal = ({
  title = 'Add Referrence',
  isModalVisible,
  setIsModalVisible,
}) => {
  const [referrenceData, dispatch] = useReducer(reducer, initialState);

  function reducer(state, action) {
    switch (action.type) {
      case 'firstName':
        return {...state, firstName: action.payload};
      case 'lastName':
        return {...state, lastName: action.payload};
      case 'email':
        return {...state, email: action.payload};
      case 'phone':
        return {...state, phone: action.payload};
      default:
        return initialState;
    }
  }
  return (
    <Modal
      style={{
        justifyContent: 'flex-end',
        margin: 0,
      }}
      useNativeDriver={true}
      hideModalContentWhileAnimating={true}
      backdropTransitionOutTiming={0}
      animationInTiming={500}
      animationOutTiming={500}
      isVisible={isModalVisible}
      onBackdropPress={() => setIsModalVisible(false)}>
      <View style={styles.main_view}>
        <Text style={styles.upLoadText}>{title}</Text>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{flex: 1}}>
            <CustomTextInput
                placeholder={'First Name'}
                value={referrenceData.firstName}
                borderWidth={1}
                lableColor={colors.dark_primary_color}
                borderRadius={scale(5)}
                onChangeText={text => {
                dispatch({type: 'firstName', payload: text});
                }}
                errorMessage={''}
            />
            <CustomTextInput
                placeholder={'Last Name'}
                value={referrenceData.lastName}
                borderWidth={1}
                lableColor={colors.dark_primary_color}
                borderRadius={scale(5)}
                onChangeText={text => {
                dispatch({type: 'lastName', payload: text});
                }}
                errorMessage={''}
            />
            <CustomTextInput
                placeholder={'Email'}
                value={referrenceData.email}
                borderWidth={1}
                lableColor={colors.dark_primary_color}
                borderRadius={scale(5)}
                onChangeText={text => {
                dispatch({type: 'email', payload: text});
                }}
                errorMessage={''}
            />
            <CustomTextInput
                placeholder={'Phone'}
                value={referrenceData.phone}
                borderWidth={1}
                lableColor={colors.dark_primary_color}
                borderRadius={scale(5)}
                onChangeText={text => {
                dispatch({type: 'phone', payload: text});
                }}
                errorMessage={''}
            />
             <View  style={{height:hp(1)}} />
            <CustomButton
                loading={false}
                loadingText={'Saving'}
                onPress={() =>
                    dispatch({
                        type: 'reset',
                        payload: !referrenceData.currentlyWorking,
                    })
                }
                text={'Save'}
            />
            <View  style={{height:hp(1)}} />
            <CustomButton
                loading={false}
                backgroundColor={"red"}
                loadingText={'Saving'}
                onPress={() =>
                    setIsModalVisible(false)
                }
                text={'Cancel'}
            />
          
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
};
export default AddReferrenceModal;

const styles = StyleSheet.create({
  mainView: {
    alignSelf: 'center',
    marginVertical: scale(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    ...textStyles.smallheading,
    fontSize: scale(12),
    color: colors.dark_primary_color,
    backgroundColor: '#0000',
    alignSelf: 'flex-start',
    textAlign: 'left',
  },
  textplaceholder: {
    ...textStyles.smallheading,
    fontSize: scale(12),
    color: colors.text_primary_color,
    backgroundColor: '#0000',

    includeFontPadding: false,
    textAlign: 'left',
  },
  Row: {
    borderWidth: 1,
    borderRadius: scale(5),
    borderColor: colors.divide_color,
    paddingHorizontal: scale(10),
    height: scale(40),
    alignItems: 'center',
    marginTop: scale(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  main_view: {
    justifyContent: 'center',
    backgroundColor: colors.white,
    height:hp(60),
    borderTopLeftRadius: scale(20),
    borderTopRightRadius: scale(20),
  },
  upLoadText: {
    ...textStyles.smallheading,
    padding: scale(10),
    alignSelf: 'center',
    color: colors.dark_primary_color,
    textAlign: 'center',
  },
  cancel_button: {
    marginTop: verticalScale(8),
    marginBottom: verticalScale(16),
    borderRadius: scale(14),
    height: verticalScale(34),
    alignItems: 'center',
    width: 250,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonStyle: {
    borderColor: colors.divide_color,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginVertical: scale(10),
    width: AppScreenWidth,
    borderRadius: scale(5),
    height: verticalScale(40),
  },
});
