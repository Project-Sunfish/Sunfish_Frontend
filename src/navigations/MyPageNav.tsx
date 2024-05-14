import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import MyPage from '../pages/MyPage';
import Contact from '../pages/Contact';
import FAQs from '../pages/FAQs';

export type MyPageStackParamList = {
  MyPage: undefined;
  Contact: undefined;
  FAQs: undefined;
};

export type MyPageStackNavigationProp =
  NativeStackNavigationProp<MyPageStackParamList>;

const Stack = createNativeStackNavigator<MyPageStackParamList>();

export default function MyPageNav() {
  return (
    <Stack.Navigator screenOptions={{animation: 'none'}}>
      <Stack.Screen
        name="MyPage"
        component={MyPage}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Contact"
        component={Contact}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="FAQs"
        component={FAQs}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
