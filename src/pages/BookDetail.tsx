import {Pressable, StyleSheet, View} from 'react-native';
import Text from '../components/Text';
import {BookStackParamList} from '../navigations/BookNav';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useSelector} from 'react-redux';
import {RootState, useAppDispatch} from '../store';
import {useEffect} from 'react';
import userSlice from '../slices/user';

type BookDetailScreenNavigationProp = NativeStackNavigationProp<
  BookStackParamList,
  'BookDetail'
>;
type BookDetailProps = {
  navigation: BookDetailScreenNavigationProp;
  route: {params: {id: number}};
};

export default function BookDetail(props: BookDetailProps) {
  const dispatch = useAppDispatch();
  useEffect(() => {
    props.navigation.addListener('focus', () => {
      dispatch(userSlice.actions.setTabBar(''));
    });
    props.navigation.addListener('blur', () => {
      dispatch(userSlice.actions.setTabBar('show'));
    });
    return () => {
      props.navigation.removeListener('focus', () => {
        console.log('BookDetail focused');
      });
      props.navigation.removeListener('blur', () => {
        console.log('BookDetail blurred');
      });
    };
  }, []);
  const tabBar = useSelector((state: RootState) => state.user.tabBar);
  const id = props.route.params.id;
  return (
    <View style={{flex: 1}}>
      <Text>BookDetail</Text>
      <Text>{id}</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
