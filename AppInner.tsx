import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  BackHandler,
  Platform,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';

import {useSelector} from 'react-redux';
import {RootState} from './src/store';
import {Safe} from './src/components/Safe';

import {svgList} from './src/assets/svgList';
import {SvgXml} from 'react-native-svg';

import SignIn from './src/pages/SignIn';
import Book from './src/pages/Book';
import Home from './src/pages/Home';
import MyPage from './src/pages/MyPage';
import {NavigationContainer} from '@react-navigation/native';
import EnterInfo from './src/pages/EnterInfo';
import React, {useEffect, useState} from 'react';
import TermModal from './src/components/TermModal';

export type RootStackParamList = {
  SignIn: {
    showModal: string;
    setShowModal: React.Dispatch<React.SetStateAction<string>>;
  };
  EnterInfo: {setShowModal: React.Dispatch<React.SetStateAction<string>>};
  Home: undefined;
  MyPage: undefined;
};

export type RootStackNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;

const screenoptions = () => {
  return {
    tabBarHideOnKeyboard: Platform.OS === 'ios' ? false : true,
    tabBarActiveTintColor: '#00264B',
    tabBarInactiveTintColor: '#F0F0F0',
    tabBarLabelStyle: {fontSize: 11, paddingBottom: 10},
    tabBarShadowVisible: false,
    tabBarShowLabel: true,
  };
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

const CustomTabbarWithCustomIndexingIcon = ({
  state,
  descriptors,
  navigation,
}: any) => {
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
        style={{flex: 1, alignItems: 'center'}}>
        {options.tabBarIcon({
          focused: isFocused,
          color: isFocused ? 'blue' : 'skyblue',
          size: 28,
        })}
        <Text
          style={{
            color: isFocused ? 'blue' : 'skyblue',
            fontSize: 11,
            paddingBottom: 10,
          }}>
          {label}
        </Text>
      </TouchableOpacity>,
    );
  });
  afterChangingIndex.push(
    beforeChangingIndex[1],
    beforeChangingIndex[0],
    beforeChangingIndex[2],
  );
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        paddingTop: 10,
      }}>
      {afterChangingIndex}
    </View>
  );
};

function AppInner() {
  const isLoggedIn = useSelector(
    (state: RootState) => !!state.user.accessToken,
  );
  const [showModal, setShowModal] = useState('no');

  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <Safe color="#202020">
          <Tab.Navigator
            initialRouteName="Home"
            screenOptions={screenoptions}
            tabBar={props => <CustomTabbarWithCustomIndexingIcon {...props} />}>
            <Tab.Screen
              name="Home"
              component={Home}
              options={{
                headerShown: false,
                tabBarLabel: 'Home',
                tabBarIcon: (props: {
                  focused: boolean;
                  color: string;
                  size: number;
                }) => (
                  <SvgXml
                    width={28}
                    height={28}
                    xml={props.focused ? svgList.temp.imsi : svgList.temp.imsi}
                  />
                ),
              }}
            />
            <Tab.Screen
              name="Book"
              component={Book}
              options={{
                title: 'Book',
                headerShown: false,
                headerTitleAlign: 'center',
                headerTitleStyle: {
                  color: '#F0F0F0',
                  fontSize: 15,
                  fontWeight: '600',
                },
                headerStyle: {
                  backgroundColor: '#202020',
                },
                headerShadowVisible: false,
                tabBarLabel: 'Book',
                tabBarIcon: (props: {
                  focused: boolean;
                  color: string;
                  size: number;
                }) => (
                  <SvgXml
                    width={28}
                    height={28}
                    xml={props.focused ? svgList.temp.imsi : svgList.temp.imsi}
                  />
                ),
              }}
            />

            <Tab.Screen
              name="MyPage"
              component={MyPage}
              options={{
                headerShown: false,
                tabBarLabel: 'MyPage',
                tabBarIcon: (props: {
                  focused: boolean;
                  color: string;
                  size: number;
                }) => (
                  <SvgXml
                    width={28}
                    height={28}
                    xml={props.focused ? svgList.temp.imsi : svgList.temp.imsi}
                  />
                ),
              }}
            />
          </Tab.Navigator>
        </Safe>
      ) : (
        <Safe color="#202020">
          <Stack.Navigator>
            <Stack.Screen
              name="SignIn"
              component={SignIn}
              initialParams={{showModal, setShowModal}}
              options={() => ({
                headerShown: false,
              })}
            />
            <Stack.Screen
              name="EnterInfo"
              component={EnterInfo}
              initialParams={{setShowModal}}
              options={() => ({
                headerShown: false,
              })}
            />
          </Stack.Navigator>
          <TermModal showModal={showModal} setShowModal={setShowModal} />
        </Safe>
      )}
    </NavigationContainer>
  );
}

export default AppInner;

const styles = StyleSheet.create({});
