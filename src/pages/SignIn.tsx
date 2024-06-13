import {
  Dimensions,
  Image,
  ImageBackground,
  Pressable,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import axios from 'axios';
import {useAppDispatch} from '../store';
import userSlice from '../slices/user';
import {SvgXml} from 'react-native-svg';
import {svgList} from '../assets/svgList';
import TermModal from '../components/TermModal';
import {useEffect, useRef, useState} from 'react';
// import WebView from 'react-native-webview';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import Modal from 'react-native-modal';
import {RootStackParamList} from '../../AppInner';
import Config from 'react-native-config';
// import {Temp} from '../components/animations';
import FastImage from 'react-native-fast-image';
import Text from '../components/Text';
import EncryptedStorage from 'react-native-encrypted-storage';
import * as KakaoLogin from '@react-native-seoul/kakao-login';

type SignInScreenProps = NativeStackScreenProps<RootStackParamList, 'SignIn'>;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function SignIn({navigation, route}: SignInScreenProps) {
  const dispatch = useAppDispatch();
  // const [showModal, setShowModal] = useState('no');
  const showModal = route.params.showModal;
  const setShowModal = route.params.setShowModal;

  const Login = async (id: number) => {
    console.log(Config.API_URL);
    try {
      const response = await axios.post(`${Config.API_URL}/login`, {
        username: id == 1 ? 'ys' : id == 2 ? 'ys2' : 'ys3',
        password: '1234',
      });
      console.log(response.status);
      dispatch(
        userSlice.actions.setToken({
          accessToken: response.headers['authorization'].replace('Bearer ', ''),
        }),
      );
    } catch (error: any) {
      const errorResponse = error.response;
      console.log(errorResponse);
      if (errorResponse.status === 401) {
        if (id == 1) {
          dispatch(
            userSlice.actions.setPerson({username: 'ys', password: '1234'}),
          );
        } else if (id == 2) {
          dispatch(
            userSlice.actions.setPerson({username: 'ys2', password: '1234'}),
          );
        } else {
          dispatch(
            userSlice.actions.setPerson({username: 'ys3', password: '1234'}),
          );
        }
        setShowModal('show');
      }
    }
  };

  const LoginWithKakao = async () => {
    console.log('카카오 로그인');
    const token = await KakaoLogin.login();
    const profile = await KakaoLogin.getProfile();
    try {
      const response = await axios.post(`${Config.API_URL}/login`, {
        socialType: 'Kakao',
        accessToken: token.accessToken,
      });
      console.log('kakao token:', token.accessToken);
      console.log(response.data);
      if (response.data.role === 'ROLE_GUEST') {
        dispatch(
          userSlice.actions.setPerson({
            preAcc: response.data.accessToken,
            preRef: response.data.refreshToken,
          }),
        );

        setShowModal('show');
      } else {
        dispatch(
          userSlice.actions.setToken({accessToken: response.data.accessToken}),
        );
        await EncryptedStorage.setItem(
          'refreshToken',
          response.data.refreshToken,
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.entire}>
      <ImageBackground
        source={require('../assets/pictures/SignIn.png')}
        style={{flex: 1}}>
        {/* <Pressable
        onPress={() => {
          // dispatch(userSlice.actions.setToken({accessToken: '1234'}));
          setShowModal(true);
        }}>
        <Text>로그인</Text>
      </Pressable> */}
        <View style={styles.top}>
          {/* <Image
          source={require('../assets/temp.gif')}
          style={{width: 500, height: 500}}
        /> */}
        </View>
        <View style={styles.bottom}>
          <View style={styles.loginButtonView}>
            <Pressable
              style={styles.eachLoginButton}
              onPress={() => {
                // setShowModal('show');
                // Login(1);
                LoginWithKakao();
              }}>
              <View style={styles.loginButton}>
                <SvgXml xml={svgList.socialLoginLogo.kakao} />
              </View>
              <View style={styles.loginButtonTxtView}>
                <Text style={styles.loginButtonTxt}>카카오톡</Text>
              </View>
            </Pressable>
            <Pressable
              style={styles.eachLoginButton}
              onPress={() => {
                // setShowModal('show');
                Login(2);
              }}>
              <View style={styles.loginButton}>
                <SvgXml xml={svgList.socialLoginLogo.google} />
              </View>
              <View style={styles.loginButtonTxtView}>
                <Text style={styles.loginButtonTxt}>구글</Text>
              </View>
            </Pressable>
            <Pressable
              style={styles.eachLoginButton}
              onPress={() => {
                // setShowModal('show');
                Login(3);
              }}>
              <View style={styles.loginButton}>
                <SvgXml xml={svgList.socialLoginLogo.naver} />
              </View>
              <View style={styles.loginButtonTxtView}>
                <Text style={styles.loginButtonTxt}>네이버</Text>
              </View>
            </Pressable>
          </View>
          <View style={styles.helperButtonView}>
            <Pressable style={[styles.helperButton, {paddingBottom: 30}]}>
              {/* <Text style={styles.helperButtonText}>앱스토어</Text>
              <Text style={styles.helperButtonText}>플레이스토어</Text> */}
              <SvgXml xml={svgList.socialLoginLogo.playStore} />
              <View style={{height: 4}}></View>
              <SvgXml xml={svgList.socialLoginLogo.appStore} />
            </Pressable>
            <Pressable
              style={[styles.helperButton, {paddingTop: 10}]}
              onPress={() =>
                dispatch(userSlice.actions.setToken({accessToken: '1234'}))
              }>
              <SvgXml xml={svgList.socialLoginLogo.us} />
            </Pressable>
          </View>
        </View>
        {/* <Modal
        isVisible={isWebView}
        style={{flex: 1, justifyContent: 'center'}}
        onBackButtonPress={() => setIsWebView(false)}
        onBackdropPress={() => setIsWebView(false)}
        hasBackdrop={true}>
        <Pressable
          style={{flex: 1, padding: 20}}
          onPress={() => setIsWebView(false)}>
          <Pressable
            style={{flex: 1, backgroundColor: 'white'}}
            onPress={e => e.stopPropagation()}>
            <WebView
              style={{width: '100%'}}
              source={{
                uri: `${Config.API_URL}:8080/oauth2/authorization/kakao`,
                // uri: `https://www.naver.com`,
              }}
              javaScriptEnabled={true}
              domStorageEnabled={true}
            />
          </Pressable>
        </Pressable>
      </Modal> */}
      </ImageBackground>
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
    paddingHorizontal: 22,
    paddingBottom: 44,
    alignItems: 'center',
  },
  loginButtonView: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  eachLoginButton: {
    justifyContent: 'center',
    alignItems: 'center',
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
  loginButtonTxtView: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderColor: '#FFFFFF',
    borderWidth: 1,
    borderRadius: 12,
    marginTop: 6,
  },
  loginButtonTxt: {
    fontSize: 9,
    fontWeight: '400',
    color: '#FFFFFF',
  },
  helperButtonView: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // backgroundColor: 'blue',
  },
  helperButton: {
    width: 73,
    height: 28,
    // backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    // borderColor: '#FFFFFF',
    // borderWidth: 0.7,
    // borderRadius: 3,
  },
  helperButtonText: {
    fontSize: 9,
    fontWeight: '400',
    color: '#FFFFFF',
  },
});
