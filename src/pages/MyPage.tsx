import {Pressable, StyleSheet, Text, View} from 'react-native';
import userSlice from '../slices/user';
import {useAppDispatch} from '../store';

export default function MyPage() {
  const dispatch = useAppDispatch();
  return (
    <View>
      <Text>MyPage</Text>
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
