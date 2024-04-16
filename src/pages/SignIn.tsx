import {Pressable, StyleSheet, Text, View} from 'react-native';
import {useAppDispatch} from '../store';
import userSlice from '../slices/user';
import {Svg, SvgXml} from 'react-native-svg';
import {svgList} from '../assets/svgList';
import TermModal from '../components/TermModal';
import {useState} from 'react';

export default function SignIn() {
  const dispatch = useAppDispatch();
  const [showModal, setShowModal] = useState(true);
  return (
    <View style={styles.entire}>
      <Pressable
        onPress={() => {
          // dispatch(userSlice.actions.setToken({accessToken: '1234'}));
          setShowModal(true);
        }}>
        <Text>로그인</Text>
      </Pressable>
      <View style={styles.top}></View>
      <View style={styles.bottom}>
        <View style={styles.loginButtonView}>
          <Pressable style={styles.loginButton}>
            <SvgXml xml={svgList.socialLoginLogo.kakao} />
          </Pressable>
          <Pressable style={styles.loginButton}>
            <SvgXml xml={svgList.socialLoginLogo.google} />
          </Pressable>
          <Pressable style={styles.loginButton}>
            <SvgXml xml={svgList.socialLoginLogo.naver} />
          </Pressable>
        </View>
        <View style={styles.helperButtonView}>
          <Pressable style={styles.helperButton}>
            <Text style={styles.helperButtonText}>앱스토어</Text>
            <Text style={styles.helperButtonText}>플레이스토어</Text>
          </Pressable>
          <Pressable style={styles.helperButton}>
            <Text style={styles.helperButtonText}>제작사</Text>
          </Pressable>
        </View>
      </View>
      <TermModal showModal={showModal} setShowModal={setShowModal} />
    </View>
  );
}

const styles = StyleSheet.create({
  entire: {
    flex: 1,
    backgroundColor: 'pink',
  },
  top: {
    flex: 1,
  },
  bottom: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 44,
    alignItems: 'center',
    backgroundColor: 'yellow',
  },
  loginButtonView: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'red',
  },
  loginButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.50)',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#FFFFFF',
    borderWidth: 1,
    margin: 6,
  },
  helperButtonView: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'blue',
  },
  helperButton: {
    width: 73,
    height: 28,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#FFFFFF',
    borderWidth: 0.7,
    borderRadius: 3,
  },
  helperButtonText: {
    fontSize: 9,
    fontWeight: '400',
    color: '#FFFFFF',
  },
});
