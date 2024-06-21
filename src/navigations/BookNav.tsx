import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import Book from '../pages/Book';
import BookDetail from '../pages/BookDetail';

export type BookStackParamList = {
  Book: undefined;
  BookDetail: {id: typeID; liberated: boolean};
};

export type BookStackNavigationProp =
  NativeStackNavigationProp<BookStackParamList>;

type BookNavProps = {
  navigation: BookStackNavigationProp;
  route: any;
};

// set typeid to number 0 to 21 (-1 for exception)
export type typeID =
  | '-1'
  | 0
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19
  | 20
  | 21
  | 22;

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
