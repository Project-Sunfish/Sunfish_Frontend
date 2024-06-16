import React, {useEffect, useState} from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import {
  BottomTabNavigationProp,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {
  PixelRatio,
  Platform,
  StyleSheet,
  View,
  useWindowDimensions,
} from 'react-native';

import {useSelector} from 'react-redux';
import {RootState, useAppDispatch} from './src/store';

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
import Config from 'react-native-config';
import EncryptedStorage from 'react-native-encrypted-storage';
import userSlice from './src/slices/user';
import axios, {AxiosError} from 'axios';

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
  const {width, height} = useWindowDimensions();

  const Ultra24Width = 1440;
  const BigScreen = (Ultra24Width * 160) / 500;
  const isBigScreen = width > BigScreen;

  useEffect(() => {
    BootSplash.hide();
  }, []);
  const isLoggedIn = useSelector(
    (state: RootState) => !!state.user.accessToken,
  );
  const [showModal, setShowModal] = useState('no');

  const dispatch = useAppDispatch();
  const reissue = async () => {
    try {
      // EncryptedStorage.removeItem('refreshToken');
      const refreshToken = await EncryptedStorage.getItem('refreshToken');
      console.log('before', refreshToken);
      if (!refreshToken) {
        dispatch(
          userSlice.actions.setToken({
            accessToken: '',
          }),
        );
        return;
      }
      const response = await axios.post(`${Config.API_URL}/reissue`, {
        refreshToken: refreshToken,
      });
      console.log('after', response.data.refreshToken);
      dispatch(
        userSlice.actions.setToken({
          accessToken: response.data.accessToken,
        }),
      );
      await EncryptedStorage.setItem(
        'refreshToken',
        response.data.refreshToken,
      );
      console.log('Token 재발급(자동로그인)');
      console.log('accessToken', response.data.accessToken);
    } catch (error) {
      const errorResponse = (
        error as AxiosError<{message: string; code: number}>
      ).response;
      console.log('errorResponse', errorResponse?.data);
      if (errorResponse?.data.code == 7) {
        EncryptedStorage.removeItem('refreshToken');
      }
    }
  };
  useEffect(() => {
    if (!isLoggedIn) reissue();
  }, [isLoggedIn]);
  return (
    <View style={styles.containerOutside}>
      <View
        style={[styles.containerInside, isBigScreen && {maxWidth: BigScreen}]}>
        <NavigationContainer>
          {isLoggedIn ? (
            <Safe color="#ffffff">
              <Tab.Navigator
                initialRouteName="Home"
                screenOptions={screenoptions}
                tabBar={props => (
                  <CustomTabbarWithCustomIndexingIcon {...props} />
                )}>
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
                      <SvgXml
                        width={43}
                        height={43}
                        xml={svgList.tabbar.home}
                      />
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
                      <SvgXml
                        width={43}
                        height={43}
                        xml={svgList.tabbar.book}
                      />
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
                      <SvgXml
                        width={43}
                        height={43}
                        xml={svgList.tabbar.mypage}
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
      </View>
    </View>
  );
}

export default AppInner;

const styles = StyleSheet.create({
  containerOutside: {
    flex: 1,
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  containerInside: {
    width: '100%',
  },
});
