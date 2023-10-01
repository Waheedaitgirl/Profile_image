import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  TextInput,
  StyleSheet,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {colors, fonts} from '../constants/theme';
import {scale, verticalScale} from 'react-native-size-matters';
import {AppScreenWidth, width} from '../constants/sacling';
import Animated, {
  LightSpeedInRight,
  LightSpeedOutLeft,
  FadeOutDown,
  FadeInDown,
} from 'react-native-reanimated';
import Menu, {
  renderers,
  MenuProvider,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import {commonStyles, textStyles} from '../styles';
const {ContextMenu} = renderers;
const CustomHeader = ({
  title,
  onPress,
  NotificationPress,
  is_leave_header = false,
  is_expense_header = false,
  is_timesheet_header = false,
  FilterPress,
  SearchPress,
}) => {
  const [showmenu, setShowMenu] = useState(false);
  const [show_search, setShowSearch] = useState(false);

  if (show_search) {
    return (
      <View style={{...commonStyles.hedaerWithIcons, justifyContent: 'center'}}>
        <Animated.View
          style={styles.AnimatedView}
          entering={LightSpeedInRight.duration(1000)}
          exiting={LightSpeedOutLeft.duration(1000)}>
          <TouchableOpacity
            style={styles.LeftSearchIcon}
            onPress={() => setShowSearch(!show_search)}>
            <FontAwesome name={'search'} color={'#000'} size={scale(20)} />
          </TouchableOpacity>
          <TextInput
            placeholder={'Search Here'}
            placeholderTextColor={'#000'}
            style={styles.TextInput}
            onChangeText={text => SearchPress(text)}
          />

          <TouchableOpacity onPress={() => setShowSearch(!show_search)}>
            <AntDesign name={'close'} color={'#000'} size={scale(20)} />
          </TouchableOpacity>
        </Animated.View>
      </View>
    );
  } else {
    return (
      <View style={{...commonStyles.hedaerWithIcons}}>
        <TouchableOpacity style={styles.menuButton} onPress={onPress}>
          <AntDesign color={colors.white} name="menu-fold" size={scale(28)} />
        </TouchableOpacity>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.LeftIconView}>
          <TouchableOpacity onPress={() => setShowSearch(!show_search)}>
            <FontAwesome name={'search'} color={'#fff'} size={scale(18)} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setShowMenu(!showmenu)}>
            {is_leave_header ? (
              <Menu
                onBackdropPress={() => setShowMenu(!showmenu)}
                renderer={ContextMenu}>
                <MenuTrigger>
                  <FontAwesome
                    name={'filter'}
                    color={'#fff'}
                    size={scale(18)}
                  />
                </MenuTrigger>
                <MenuOptions customStyles={optionsStyles}>
                  <MenuOption
                    customStyles={optionStyles}
                    value={'All'}
                    onSelect={() => FilterPress('All')}>
                    <Text style={textStyles.Label}>All</Text>
                  </MenuOption>
                  <MenuOption
                    customStyles={optionStyles}
                    value="Pending"
                    onSelect={() => FilterPress('0')}>
                    <Text style={textStyles.Label}>Pending</Text>
                  </MenuOption>
                  <MenuOption
                    customStyles={optionStyles}
                    value="Approved"
                    onSelect={() => FilterPress('1')}>
                    <Text style={textStyles.Label}>Approved</Text>
                  </MenuOption>
                  <MenuOption
                    customStyles={optionStyles}
                    value="Declined"
                    onSelect={() => FilterPress('2')}>
                    <Text style={textStyles.Label}>Declined</Text>
                  </MenuOption>
                </MenuOptions>
              </Menu>
            ) : (
              (is_expense_header = <Menu
                onBackdropPress={() => setShowMenu(!showmenu)}
                renderer={ContextMenu}>
                <MenuTrigger>
                  <FontAwesome
                    name={'filter'}
                    color={'#fff'}
                    size={scale(18)}
                  />
                </MenuTrigger>
                <MenuOptions customStyles={optionsStyles}>
                  <MenuOption
                    customStyles={optionStyles}
                    value={'All'}
                    onSelect={() => FilterPress('All')}>
                    <Text style={textStyles.Label}>All</Text>
                  </MenuOption>
                  <MenuOption
                    customStyles={optionStyles}
                    value={'Approved'}
                    onSelect={() => FilterPress('0')}>
                    <Text style={textStyles.Label}>Approved</Text>
                  </MenuOption>
                  <MenuOption
                    customStyles={optionStyles}
                    value={'Submitted'}
                    onSelect={() => FilterPress('1')}>
                    <Text style={textStyles.Label}>Submitted</Text>
                  </MenuOption>
                  <MenuOption
                    customStyles={optionStyles}
                    value={'Unsubmitted'}
                    onSelect={() => FilterPress('2')}>
                    <Text style={textStyles.Label}>Unsubmitted</Text>
                  </MenuOption>
                  <MenuOption
                    customStyles={optionStyles}
                    value={'Rejected'}
                    onSelect={() => FilterPress('3')}>
                    <Text style={textStyles.Label}>Rejected</Text>
                  </MenuOption>
                </MenuOptions>
              </Menu> ? (
                (is_timesheet_header = (
                  <Menu
                    onBackdropPress={() => setShowMenu(!showmenu)}
                    renderer={ContextMenu}>
                    <MenuTrigger>
                      <FontAwesome
                        name={'filter'}
                        color={'#fff'}
                        size={scale(18)}
                      />
                    </MenuTrigger>
                    <MenuOptions customStyles={optionsStyles}>
                      <MenuOption
                        customStyles={optionStyles}
                        value={'All'}
                        onSelect={() => FilterPress('All')}>
                        <Text style={textStyles.Label}>All</Text>
                      </MenuOption>
                      <MenuOption
                        customStyles={optionStyles}
                        value={'Approved'}
                        onSelect={() => FilterPress('0')}>
                        <Text style={textStyles.Label}>Approved</Text>
                      </MenuOption>
                      <MenuOption
                        customStyles={optionStyles}
                        value={'Submitted'}
                        onSelect={() => FilterPress('1')}>
                        <Text style={textStyles.Label}>Submitted</Text>
                      </MenuOption>
                      <MenuOption
                        customStyles={optionStyles}
                        value={'Unsubmitted'}
                        onSelect={() => FilterPress('Draft')}>
                        <Text style={textStyles.Label}>Unsubmitted</Text>
                      </MenuOption>
                      <MenuOption
                        customStyles={optionStyles}
                        value={'Rejected'}
                        onSelect={() => FilterPress('3')}>
                        <Text style={textStyles.Label}>Rejected</Text>
                      </MenuOption>
                    </MenuOptions>
                  </Menu>
                ))
              ) : null)
            )}
          </TouchableOpacity>
          {/* <TouchableOpacity onPress={NotificationPress}>
            <Ionicons name={'notifications'} color={'#fff'} size={scale(18)} />
          </TouchableOpacity> */}
        </View>
      </View>
    );
  }
};
const styles = StyleSheet.create({
  AnimatedView: {
    backgroundColor: 'rgba(255,255,255,1)',
    justifyContent: 'space-between',
    paddingRight: scale(7),
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: scale(5),
    overflow: 'hidden',
    alignSelf: 'center',
    height: verticalScale(35),
    width: width - scale(10),
  },
  TextInput: {
    paddingTop: 0,
    paddingBottom: 0,
    paddingHorizontal: scale(10),
    fontFamily: fonts.Light,
    fontSize: scale(12),
    color: '#000',
    includeFontPadding: false,
    height: verticalScale(30),
    width: AppScreenWidth - scale(60),
    borderRadius: scale(5),
    backgroundColor: 'rgba(0,0,0,0)',
  },
  LeftSearchIcon: {
    backgroundColor: 'rgba(0,0,0,.3)',
    justifyContent: 'center',
    alignItems: 'center',
    width: scale(35),
    height: verticalScale(35),
  },
  menuButton: {
    marginLeft: 12,
    shadowColor: '#fff',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontFamily: fonts.Medium,
    fontSize: scale(15),
    color: colors.white,
  },
  LeftIconView: {
    flexDirection: 'row',
    width: width / 5,
    justifyContent: 'space-around',
  },
});

const optionsStyles = {
  optionsContainer: {
    backgroundColor: '#fff',
    padding: 5,
  },
  optionsWrapper: {
    backgroundColor: '#fff',
  },
  optionWrapper: {
    backgroundColor: '#fff',
    margin: 5,
  },
  optionText: {
    color: '#fff',
  },
};

const optionStyles = {
  optionTouchable: {
    underlayColor: '#fff',
    activeOpacity: 40,
  },
  optionWrapper: {
    backgroundColor: '#fff',
    margin: 5,
  },
};

export default CustomHeader;
