import {Pressable, StyleSheet, Vibration, View} from 'react-native';
import {Ex} from '../components/animations';
import Text from '../components/Text';
import {BookStackParamList} from '../navigations/BookNav';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useAppDispatch} from '../store';
import userSlice from '../slices/user';
import {useFocusEffect} from '@react-navigation/native';
import {useCallback} from 'react';

type BookScreenNavigationProp = NativeStackNavigationProp<
  BookStackParamList,
  'Book'
>;
type BookProps = {
  navigation: BookScreenNavigationProp;
};

export default function Book(props: BookProps) {
  return (
    <View style={{flex: 1}}>
      <Pressable onPress={() => Vibration.vibrate(100)}>
        <Text>Haptic</Text>
      </Pressable>
      <Text>Book</Text>
      <Ex />
      <Pressable
        onPress={() => {
          props.navigation.navigate('BookDetail');
        }}>
        <Text>go</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({});
