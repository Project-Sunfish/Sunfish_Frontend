import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  Platform,
  StyleSheet,
  Text,
  TouchableHighlight,
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

type RootStackParamList = {
  SignIn: undefined;
  Home: undefined;
  MyPage: undefined;
};

export type RootStackNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;

const screenoptions = () => {
  return {
    tabBarStyle: {
      height: 70,
      backgroundColor: '#ffffff',
      borderTopWidth: 0,
      elevation: 0,
    },
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

function AppInner() {
  const isLoggedIn = useSelector(
    (state: RootState) => !!state.user.accessToken,
  );
  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <Safe color="#202020">
          <Tab.Navigator initialRouteName="Home" screenOptions={screenoptions}>
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
              options={() => ({
                headerShown: false,
              })}
            />
          </Stack.Navigator>
        </Safe>
      )}
    </NavigationContainer>
  );
}

export default AppInner;

const styles = StyleSheet.create({});
