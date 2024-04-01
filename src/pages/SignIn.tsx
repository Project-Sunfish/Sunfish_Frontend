import {Pressable, StyleSheet, Text, View} from 'react-native';
import {useAppDispatch} from '../store';
import userSlice from '../slices/user';

export default function SignIn() {
  const dispatch = useAppDispatch();
  return (
    <View>
      <Text>Sign In</Text>
      <Pressable
        onPress={() => {
          dispatch(userSlice.actions.setToken({accessToken: '1234'}));
        }}>
        <Text>로그인</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({});
