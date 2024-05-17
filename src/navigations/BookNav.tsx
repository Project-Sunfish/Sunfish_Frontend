import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import Book from '../pages/Book';
import BookDetail from '../pages/BookDetail';

export type BookStackParamList = {
  Book: undefined;
  BookDetail: {id: number};
};

export type BookStackNavigationProp =
  NativeStackNavigationProp<BookStackParamList>;

type BookNavProps = {
  navigation: BookStackNavigationProp;
  route: any;
};

const Stack = createNativeStackNavigator<BookStackParamList>();

export default function BookNav(props: BookNavProps) {
  return (
    <Stack.Navigator screenOptions={{animation: 'none'}}>
      <Stack.Screen
        name="Book"
        component={Book}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="BookDetail"
        component={BookDetail}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
