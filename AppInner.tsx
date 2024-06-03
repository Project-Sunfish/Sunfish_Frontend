import React, {useEffect, useState} from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import {
  BottomTabNavigationProp,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {Platform, StyleSheet} from 'react-native';

import {useSelector} from 'react-redux';
import {RootState} from './src/store';

import {svgList} from './src/assets/svgList';
import {SvgXml} from 'react-native-svg';

import {NavigationContainer} from '@react-navigation/native';
import SignIn from './src/pages/SignIn';
import Home from './src/pages/Home';
import EnterInfo from './src/pages/EnterInfo';
import TermModal from './src/components/TermModal';
import MyPageNav from './src/navigations/MyPageNav';
import BookNav from './src/navigations/BookNav';

import {Safe} from './src/components/Safe';
import Text from './src/components/Text';
import CustomTabbarWithCustomIndexingIcon from './src/components/CustomTabbarWithCustomIndexingIcon';
import BootSplash from 'react-native-bootsplash';

export type RootStackParamList = {
  SignIn: {
    showModal: string;
    setShowModal: React.Dispatch<React.SetStateAction<string>>;
  };
  EnterInfo: {setShowModal: React.Dispatch<React.SetStateAction<string>>};
};

export type RootStackNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;

export type RootTabParamList = {
  Home: undefined;
  BookNav: undefined;
  MyPageNav: undefined;
};

export type RootTabNavigationProp = BottomTabNavigationProp<RootTabParamList>;

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
const Tab = createBottomTabNavigator<RootTabParamList>();

function AppInner() {
  useEffect(() => {
    BootSplash.hide();
  }, []);
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
              name="BookNav"
              component={BookNav}
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
