import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';
import {textStyles} from '../../styles';
import CustomHeader from '../../components/CustomHeader';
import {colors, fonts} from '../../constants/theme';
import {AppScreenWidth, hp, wp} from '../../constants/sacling';
import {useWindowDimensions} from 'react-native';
import {widthPercentageToDP} from 'react-native-responsive-screen';
const Item = () => {
  return (
    <View style={{...styles.Row, flexDirection: 'column'}}>
      <View style={styles.CardRowView}>
        <Text style={styles.CardTextLeft}>Referral Name</Text>
        <Text style={styles.CardTextRight}>Mical Jakson</Text>
      </View>
      <View style={styles.CardRowView}>
        <Text style={styles.CardTextLeft}>Email</Text>
        <Text style={styles.CardTextRight}>MicalJakson@gmail.com</Text>
      </View>
      <View style={styles.CardRowView}>
        <Text style={styles.CardTextLeft}>Job Order</Text>
        <Text style={styles.CardTextRight}>JOB_ODR_81231</Text>
      </View>
      <View style={styles.CardRowView}>
        <Text style={styles.CardTextLeft}>Referred On</Text>
        <Text style={styles.CardTextRight}>12-Mar-2022</Text>
      </View>
      <View style={styles.CardRowView}>
        <Text style={styles.CardTextLeft}>Status</Text>
        <Text style={styles.CardTextRight}>Accepted</Text>
      </View>
      <View style={styles.CardRowView}>
        <Text style={styles.CardTextLeft}>Referral Bonus</Text>
        <Text style={styles.CardTextRight}>$10</Text>
      </View>
    </View>
  );
};
const MyRefrerrals = ({navigation}) => {
  const {width} = useWindowDimensions();
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <StatusBar barStyle={'light-content'} />
      <ScrollView style={{flex: 1}}>
        <CustomHeader
          show_backButton={true}
          isdrawer={true}
          onPress={() => navigation.openDrawer()}
          title={'My Refrerrals'}
        />
        <View style={styles.Row}>
          <TouchableOpacity style={styles.tab}>
            <Text style={styles.tabText}>Submitted: 0</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tab}>
            <Text style={styles.tabText}>Accepted: 0</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tab}>
            <Text style={styles.tabText}>Placed: 0</Text>
          </TouchableOpacity>
        </View>
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
      </ScrollView>
    </SafeAreaView>
  );
};

export default MyRefrerrals;

const styles = StyleSheet.create({
  Row: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    elevation: 10,
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
});
