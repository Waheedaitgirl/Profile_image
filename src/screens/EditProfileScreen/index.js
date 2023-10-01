import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import React, {useEffect, useState} from 'react';
import {
  Animated,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {scale, verticalScale} from 'react-native-size-matters';
import CustomHeader from '../../components/CustomHeader';
import {AppScreenWidth, hp, width} from '../../constants/sacling';
import {colors, fonts} from '../../constants/theme';
import {commonStyles, textStyles} from '../../styles';
import AddCertificateScreen from './AddCertificateScreen';
import AddEducationScreen from './AddEducationScreen';
import AddExperienceScreen from './AddExperienceScreen';
import GeneralProfileScreen from './GeneralProfileScreen';
function MyTabBar({state, descriptors, navigation, position}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        backgroundColor: colors.dark_primary_color,
        height: heightPercentageToDP(6),
        width: widthPercentageToDP(100),
      }}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({name: route.name, merge: true});
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        const inputRange = state.routes.map((_, i) => i);
        const opacity = position.interpolate({
          inputRange,
          outputRange: inputRange.map(i => (i === index ? 1 : 0)),
        });

        return (
          <TouchableOpacity
            key={`${index}`}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{
              alignItems: 'center',
              height: heightPercentageToDP(4),
              borderRadius: scale(100),
              justifyContent: 'center',
              width: widthPercentageToDP(23),
              backgroundColor: isFocused ? '#000' : '#fff',
            }}>
            <Animated.Text
              style={{
                ...textStyles.Label,
                color: isFocused ? '#fff' : colors.dark_primary_color,
              }}>
              {label}
            </Animated.Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
const EditProfileScreen = ({navigation}) => {
  const Tab = createMaterialTopTabNavigator();
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.dark_primary_color}}>
      <StatusBar barStyle={'light-content'} />
      <View style={commonStyles.container}>
        <CustomHeader
          show_backButton={true}
          isdrawer={true}
          onPress={() => navigation.openDrawer()}
          title={'Profile'}
        />
        <View
          style={{
            height: hp(93),
            backgroundColor: '#fff',
            alignSelf: 'center',
          }}>
          <Tab.Navigator
            screenOptions={{
              swipeEnabled: false,
            }}
            tabBar={props => <MyTabBar {...props} />}>
            <Tab.Screen
              name={'GeneralProfileScreen'}
              children={() => <GeneralProfileScreen />}
              options={{tabBarLabel: 'Summary'}}
            />

            <Tab.Screen
              name={'AddEducationScreen'}
              children={() => <AddEducationScreen />}
              options={{tabBarLabel: 'Education'}}
            />
            <Tab.Screen
              name={'AddExperienceScreen'}
              children={() => <AddExperienceScreen />}
              options={{tabBarLabel: 'Experience'}}
            />
            <Tab.Screen
              name={'AddCertificateScreen'}
              children={() => <AddCertificateScreen />}
              options={{tabBarLabel: 'Certificate'}}
            />
          </Tab.Navigator>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default EditProfileScreen;

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

