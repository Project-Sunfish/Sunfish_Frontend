import {Pressable, StyleSheet, Text, View} from 'react-native';
import {useAppDispatch} from '../store';
import userSlice from '../slices/user';

export default function Home() {
  const dispatch = useAppDispatch();
  return (
    <View>
      <Text>Home</Text>
      <Pressable
        onPress={() => {
          dispatch(userSlice.actions.setToken({accessToken: ''}));
        }}>
        <Text>로그아웃</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({});
