import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  StyleSheet,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {textStyles} from '../../styles';
import CustomHeader from '../../components/CustomHeader';
import {colors, fonts} from '../../constants/theme';
import {width, wp} from '../../constants/sacling';
import {useWindowDimensions} from 'react-native';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import AddReferrenceModal from '../../components/AddReferrenceModal';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {scale, verticalScale} from 'react-native-size-matters';
const Item = ({setIsModalVisible}) => {
  let rowRefs = new Map();
  const rightButtons = () => {
    return (
      <View style={styles.ActionButtonRows}>
        <TouchableOpacity
          onPress={() => alert('Sure to Delete')}
          style={{...styles.ActionButton, backgroundColor: colors.error_text}}>
          <AntDesign name="delete" color={colors.white} size={scale(18)} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setIsModalVisible()}
          style={styles.ActionButton}>
          <AntDesign name="edit" color={colors.white} size={scale(18)} />
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <Swipeable
      containerStyle={{alignSelf: 'center', width: width - scale(10)}}
      renderRightActions={rightButtons}>
      <View style={{...styles.Row, flexDirection: 'column'}}>
        <View style={styles.CardRowView}>
          <Text style={styles.CardTextLeft}>Referral Name</Text>
          <Text style={styles.CardTextRight}>Mical Jakson</Text>
        </View>
        <View style={styles.CardRowView}>
          <Text style={styles.CardTextLeft}>Email</Text>
          <Text style={styles.CardTextRight}>MicalJakson@gmail.com</Text>
        </View>
      </View>
    </Swipeable>
  );
};
const MyReferences = ({navigation}) => {
  const {width} = useWindowDimensions();
  const [isModalVisible, setIsModalVisible] = useState(false);
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <StatusBar barStyle={'light-content'} />
      <CustomHeader
        show_backButton={true}
        isdrawer={true}
        onPress={() => navigation.openDrawer()}
        title={'My References'}
      />
      <ScrollView style={{flex: 1}}>
        <Item setIsModalVisible={() => setIsModalVisible(!isModalVisible)} />
        <Item setIsModalVisible={() => setIsModalVisible(!isModalVisible)} />
        <Item setIsModalVisible={() => setIsModalVisible(!isModalVisible)} />
        <Item setIsModalVisible={() => setIsModalVisible(!isModalVisible)} />
        <Item setIsModalVisible={() => setIsModalVisible(!isModalVisible)} />
        <Item setIsModalVisible={() => setIsModalVisible(!isModalVisible)} />
        <Item setIsModalVisible={() => setIsModalVisible(!isModalVisible)} />
        <Item setIsModalVisible={() => setIsModalVisible(!isModalVisible)} />
        <Item setIsModalVisible={() => setIsModalVisible(!isModalVisible)} />
        <Item setIsModalVisible={() => setIsModalVisible(!isModalVisible)} />
        <Item setIsModalVisible={() => setIsModalVisible(!isModalVisible)} />
        <Item setIsModalVisible={() => setIsModalVisible(!isModalVisible)} />
        <Item setIsModalVisible={() => setIsModalVisible(!isModalVisible)} />
        <Item setIsModalVisible={() => setIsModalVisible(!isModalVisible)} />
        <Item setIsModalVisible={() => setIsModalVisible(!isModalVisible)} />
        <Item setIsModalVisible={() => setIsModalVisible(!isModalVisible)} />
        <Item setIsModalVisible={() => setIsModalVisible(!isModalVisible)} />
        <Item setIsModalVisible={() => setIsModalVisible(!isModalVisible)} />
        <Item setIsModalVisible={() => setIsModalVisible(!isModalVisible)} />
        <Item setIsModalVisible={() => setIsModalVisible(!isModalVisible)} />
        <Item setIsModalVisible={() => setIsModalVisible(!isModalVisible)} />
      </ScrollView>
      <TouchableOpacity
        onPress={() => setIsModalVisible(!isModalVisible)}
        style={{
          alignSelf: 'flex-end',
          paddingHorizontal: widthPercentageToDP(5),
          paddingVertical: widthPercentageToDP(5),
          position: 'absolute',
          bottom: widthPercentageToDP(0),
        }}>
        <AntDesign
          name={'pluscircle'}
          size={widthPercentageToDP(10)}
          color={colors.dark_primary_color}
        />
      </TouchableOpacity>
      <AddReferrenceModal
        isModalVisible={isModalVisible}
        setIsModalVisible={() => setIsModalVisible(!isModalVisible)}
      />
    </SafeAreaView>
  );
};

export default MyReferences;

const styles = StyleSheet.create({
  Row: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    elevation: 5,
    margin: 5,
    borderRadius: 5,
    paddingVertical: widthPercentageToDP(2),
    justifyContent: 'space-evenly',
  },
  CardRowView: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingVertical: widthPercentageToDP(0.5),
    borderRadius: 5,
    justifyContent: 'space-evenly',
  },
  tab: {
    paddingHorizontal: wp(2),
    paddingVertical: wp(1),
    borderRadius: wp(2),
    backgroundColor: colors.dark_primary_color,
  },
  tabText: {
    ...textStyles.Label,
    color: '#fff',
  },
  CardTextLeft: {
    ...textStyles.Label,
    fontFamily: fonts.Medium,
    flex: 0.3,
  },
  CardTextRight: {
    ...textStyles.Label,
    fontFamily: fonts.Regular,
    flex: 0.6,
  },
  ActionButtonRows: {
    borderTopRightRadius: scale(5),
    overflow: 'hidden',
    borderBottomRightRadius: scale(5),
    justifyContent: 'space-evenly',
    backgroundColor: 'red',
    alignItems: 'center',
    marginVertical: scale(5),
  },
  ActionButton: {
    paddingHorizontal: scale(10),
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#e6a020',
  },
});
