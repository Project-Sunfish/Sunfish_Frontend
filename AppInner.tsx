import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  BackHandler,
  Platform,
  StyleSheet,
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
import Text from './src/components/Text';

import MyPageNav from './src/navigations/MyPageNav';
import CustomTabbarWithCustomIndexingIcon from './src/components/CustomTabbarWithCustomIndexingIcon';

export type RootStackParamList = {
  SignIn: {
    showModal: string;
    setShowModal: React.Dispatch<React.SetStateAction<string>>;
  };
  EnterInfo: {setShowModal: React.Dispatch<React.SetStateAction<string>>};
  Home: undefined;
  MyPageNav: undefined;
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
    animation: 'none',
  };
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

function AppInner() {
  const isLoggedIn = useSelector(
    (state: RootState) => !!state.user.accessToken,
  );
  const [showModal, setShowModal] = useState('no');

  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <Safe color="#ffffff">
          <Tab.Navigator
            initialRouteName="Home"
            screenOptions={screenoptions}
            tabBar={props => <CustomTabbarWithCustomIndexingIcon {...props} />}>
            <Tab.Screen
              name="Home"
              component={Home}
              options={{
                headerShown: false,
                tabBarLabel: '플레이',
                tabBarIcon: (props: {
                  focused: boolean;
                  color: string;
                  size: number;
                }) => (
                  <SvgXml width={43} height={43} xml={svgList.tabbar.home} />
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
                tabBarLabel: '도  감',
                tabBarIcon: (props: {
                  focused: boolean;
                  color: string;
                  size: number;
                }) => (
                  <SvgXml width={43} height={43} xml={svgList.tabbar.book} />
                ),
              }}
            />

            <Tab.Screen
              name="MyPageNav"
              component={MyPageNav}
              options={{
                headerShown: false,
                tabBarLabel: '마이페이지',
                tabBarIcon: (props: {
                  focused: boolean;
                  color: string;
                  size: number;
                }) => (
                  <SvgXml width={43} height={43} xml={svgList.tabbar.mypage} />
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
