import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Text from './Text';
import {LinearGradient} from 'react-native-linear-gradient';
import {BlurView} from '@react-native-community/blur';
import {useState} from 'react';
import {useSelector} from 'react-redux';
import {RootState, useAppDispatch} from '../store';
import userSlice from '../slices/user';

export default function CustomTabbarWithCustomIndexingIcon({
  state,
  descriptors,
  navigation,
}: any) {
  let beforeChangingIndex: any[] = [];
  let afterChangingIndex: any[] = [];
  state.routes.map((route: any, index: any) => {
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
        navigation.navigate(route.name);
      }
    };

    beforeChangingIndex.push(
      <TouchableOpacity
        key={index}
        accessibilityRole="button"
        accessibilityState={isFocused ? {selected: true} : {}}
        accessibilityLabel={options.tabBarAccessibilityLabel}
        testID={options.tabBarTestID}
        onPress={onPress}
        style={[
          {flex: 1, alignItems: 'center'},
          !isFocused && {marginTop: 24},
        ]}>
        <View
          style={[
            styles.tabbarEachButton,
            isFocused
              ? {backgroundColor: '#FFFFFF'}
              : {backgroundColor: '#FFFFFF50'},
          ]}>
          {options.tabBarIcon({
            focused: isFocused,
            color: isFocused ? 'blue' : 'skyblue',
            size: 28,
          })}
        </View>
        <View
          style={[
            styles.tabbarEachTextView,
            isFocused
              ? {backgroundColor: '#ffffff'}
              : {backgroundColor: '#6EA5FFA3'},
          ]}>
          <Text
            style={[
              styles.tabbarEachText,
              isFocused ? {color: '#6EA5FF'} : {color: '#ffffff'},
            ]}>
            {label}
          </Text>
        </View>
      </TouchableOpacity>,
    );
  });
  afterChangingIndex.push(
    beforeChangingIndex[1],
    beforeChangingIndex[0],
    beforeChangingIndex[2],
  );
  return (
    <View style={styles.tabbarEntire}>
      <BlurView
        style={styles.tabbarFooter}
        blurType="light"
        blurAmount={5}
        blurRadius={5}
        overlayColor="transparent">
        <LinearGradient
          colors={['#80D1FF80', '#6EA5FF80']}
          style={styles.tabbarFooter}></LinearGradient>
      </BlurView>
      <View style={styles.tabbarView}>{afterChangingIndex}</View>
    </View>
  );
}
{
}

const styles = StyleSheet.create({
  tabbarEntire: {
    height: 123,
    width: '100%',
    backgroundColor: 'transparent',
    position: 'absolute',
    bottom: 0,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  tabbarView: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
  },
  tabbarEachButton: {
    width: 72,
    height: 72,
    borderRadius: 36,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FFFFFF',
  },
  tabbarEachText: {
    fontSize: 11,
    fontWeight: '400',
  },
  tabbarEachTextView: {
    position: 'absolute',
    bottom: -7,
    width: 74,
    height: 23,
    // paddingVertical: 4,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: '#CCEDFF',
  },
  tabbarFooter: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    // backgroundColor: 'transparent',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    paddingTop: 10,
    height: 66,
    width: '100%',
    overflow: 'hidden',
  },
});
