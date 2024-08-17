import {
  Dimensions,
  ImageBackground,
  Platform,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import axios, {AxiosError} from 'axios';
import {useAppDispatch} from '../store';
import userSlice from '../slices/user';
import {SvgXml} from 'react-native-svg';
import {svgList} from '../assets/svgList';
import {useEffect, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../AppInner';
import Config from 'react-native-config';
import Text from '../components/Text';
import EncryptedStorage from 'react-native-encrypted-storage';
import * as KakaoLogin from '@react-native-seoul/kakao-login';
import NaverLogin, {NaverLoginResponse} from '@react-native-seoul/naver-login';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import appleAuth from '@invertase/react-native-apple-authentication';
// import auth from '@react-native-firebase/auth';

type SignInScreenProps = NativeStackScreenProps<RootStackParamList, 'SignIn'>;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function SignIn({navigation, route}: SignInScreenProps) {
  const dispatch = useAppDispatch();
  // const [showModal, setShowModal] = useState('no');
  const showModal = route.params.showModal;
  const setShowModal = route.params.setShowModal;

  const [success, setSuccessResponse] =
    useState<NaverLoginResponse['successResponse']>();
  const [failure, setFailureResponse] =
    useState<NaverLoginResponse['failureResponse']>();

  const Login = async (id: number) => {
    console.log(Config.API_URL);
    try {
      const response = await axios.post(`${Config.API_URL}/admin/login`, {
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
      console.log('kakao token:', token.accessToken);
      const response = await axios.post(`${Config.API_URL}/admin/login`, {
        socialType: 'Kakao',
        accessToken: token.accessToken,
      });
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
        // dispatch(
        //   userSlice.actions.setTutorialFlag({
        //     tutorialFlag: response.data.tutorialFlag,
        //   }),
        // );
        await EncryptedStorage.setItem(
          'refreshToken',
          response.data.refreshToken,
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const LoginWithNaver = async () => {
    const initANDROID = {
      consumerKey: Config.NAVER_CLIENT_ID ? Config.NAVER_CLIENT_ID : '',
      consumerSecret: Config.NAVER_CLIENT_SECRET
        ? Config.NAVER_CLIENT_SECRET
        : '',
      appName: '복어펑',
    };
    const initIOS = {
      consumerKey: Config.NAVER_CLIENT_ID ? Config.NAVER_CLIENT_ID : '',
      consumerSecret: Config.NAVER_CLIENT_SECRET
        ? Config.NAVER_CLIENT_SECRET
        : '',
      appName: '복어펑',
      serviceUrlSchemeIOS: 'naverlogin.sunfish',
    };
    NaverLogin.initialize(Platform.OS === 'android' ? initANDROID : initIOS);
    console.log('네이버 로그인');
    const {failureResponse, successResponse} = await NaverLogin.login();
    setSuccessResponse(successResponse);
    setFailureResponse(failureResponse);
    console.log(successResponse ? 'success' : 'failure');

    console.log('successResponse:', successResponse?.accessToken);
    if (successResponse) {
      try {
        const response = await axios.post(`${Config.API_URL}/admin/login`, {
          socialType: 'Naver',
          accessToken: successResponse.accessToken,
        });
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
            userSlice.actions.setToken({
              accessToken: response.data.accessToken,
            }),
          );
          // dispatch(
          //   userSlice.actions.setTutorialFlag({
          //     tutorialFlag: response.data.tutorialFlag,
          //   }),
          // );
          await EncryptedStorage.setItem(
            'refreshToken',
            response.data.refreshToken,
          );
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const LoginWithApple = async () => {
    console.log('애플 로그인');
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    });
    console.log('response', appleAuthRequestResponse);
    const {authorizationCode, user} = appleAuthRequestResponse;
    const credentialState = await appleAuth.getCredentialStateForUser(user);
    if (credentialState === appleAuth.State.REVOKED) {
      console.log('revoked');
      // quitWithApple();
      return;
    } else if (credentialState === appleAuth.State.AUTHORIZED) {
      if (!authorizationCode) return;
      console.log('auth', authorizationCode);
      const response = await axios.post(`${Config.API_URL}/admin/login`, {
        socialType: 'Apple',
        accessToken: authorizationCode,
      });
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
          userSlice.actions.setToken({
            accessToken: response.data.accessToken,
          }),
        );
        // dispatch(
        //   userSlice.actions.setTutorialFlag({
        //     tutorialFlag: response.data.tutorialFlag,
        //   }),
        // );
        await EncryptedStorage.setItem(
          'refreshToken',
          response.data.refreshToken,
        );
      }
    }
  };

  useEffect(() => {
    if (Platform.OS === 'android') {
      GoogleSignin.configure({
        webClientId: Config.GOOGLE_CLIENT_ID,
        offlineAccess: true,
      });
    } else {
      GoogleSignin.configure({
        iosClientId: Config.GOOGLE_IOS_CLIENT_ID,
        webClientId: Config.GOOGLE_CLIENT_ID,
        offlineAccess: true,
      });
    }
  }, []);
  const LoginWithGoogle = async () => {
    console.log('로그인 시도 중');
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const resp = await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        body: JSON.stringify({
          code: userInfo.serverAuthCode,
          client_id: Config.GOOGLE_CLIENT_ID,
          client_secret: Config.GOOGLE_CLIENT_SECRET,
          grant_type: 'authorization_code',
          redirect_uri: 'https://sunfish-79106.firebaseapp.com/__/auth/handler',
        }),
      });
      const data = await resp.json();
      const response = await axios.post(`${Config.API_URL}/admin/login`, {
        socialType: 'Google',
        accessToken: data.access_token,
      });
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
          userSlice.actions.setToken({
            accessToken: response.data.accessToken,
          }),
        );
        // dispatch(
        //   userSlice.actions.setTutorialFlag({
        //     tutorialFlag: response.data.tutorialFlag,
        //   }),
        // );
        await EncryptedStorage.setItem(
          'refreshToken',
          response.data.refreshToken,
        );
      }
    } catch (error) {
      console.log(error);
      const errorResponse = (error as AxiosError<{message: string}>).response;
      // console.log(errorResponse);
    }
  };
  return (
    <View style={styles.entire}>
      <ImageBackground
        source={require('../assets/pictures/SignIn.png')}
        style={{flex: 1}}>
        <View style={styles.top}></View>
        <View style={styles.bottom}>
          <View style={styles.loginButtonView}>
            <View style={styles.loginButtonViewContainer}>
              <Pressable
                style={styles.eachLoginButton}
                onPress={() => {
                  LoginWithKakao();
                }}>
                <View style={styles.loginButton}>
                  <SvgXml
                    xml={svgList.socialLoginLogo.kakao}
                    width={Platform.OS == 'ios' ? 32 : 44}
                    height={Platform.OS == 'ios' ? 30 : 40}
                  />
                </View>
                {/* <View style={styles.loginButtonTxtView}>
                  <Text style={styles.loginButtonTxt}>카카오톡</Text>
                </View> */}
              </Pressable>
              <Pressable
                style={styles.eachLoginButton}
                onPress={() => {
                  LoginWithGoogle();
                }}>
                <View style={styles.loginButton}>
                  <SvgXml
                    xml={svgList.socialLoginLogo.google}
                    width={Platform.OS == 'ios' ? 30 : 40}
                    height={Platform.OS == 'ios' ? 30 : 41}
                  />
                </View>
                {/* <View style={styles.loginButtonTxtView}>
                  <Text style={styles.loginButtonTxt}>구글</Text>
                </View> */}
              </Pressable>
              <Pressable
                style={styles.eachLoginButton}
                onPress={() => {
                  LoginWithNaver();
                }}>
                <View style={styles.loginButton}>
                  <SvgXml
                    xml={svgList.socialLoginLogo.naver}
                    width={Platform.OS == 'ios' ? 24 : 32}
                    height={Platform.OS == 'ios' ? 22 : 30}
                  />
                </View>
                {/* <View style={styles.loginButtonTxtView}>
                  <Text style={styles.loginButtonTxt}>네이버</Text>
                </View> */}
              </Pressable>
              {Platform.OS === 'ios' && (
                <Pressable
                  style={styles.eachLoginButton}
                  onPress={() => {
                    LoginWithApple();
                  }}>
                  <View style={styles.loginButton}>
                    <SvgXml xml={svgList.socialLoginLogo.apple} />
                    <View style={{height: 3}} />
                  </View>
                  {/* <View style={styles.loginButtonTxtView}>
                    <Text style={styles.loginButtonTxt}>애플</Text>
                  </View> */}
                </Pressable>
              )}
            </View>
            {/* {Platform.OS === 'ios' && (
              <Pressable onPress={() => LoginWithApple()}>
                <Text style={styles.appleLoginTxt}>애플 로그인</Text>
              </Pressable>
            )} */}
          </View>
          <View style={styles.helperButtonView}>
            <Pressable style={[styles.helperButton, {paddingTop: 10}]}>
              {/* <View style={{height: 20}} /> */}
              {Platform.OS == 'android' ? (
                <SvgXml xml={svgList.socialLoginLogo.playStore} />
              ) : (
                <SvgXml xml={svgList.socialLoginLogo.appStore} />
              )}
            </Pressable>
            <Pressable style={[styles.helperButton, {paddingTop: 10}]}>
              <SvgXml xml={svgList.socialLoginLogo.us} />
            </Pressable>
          </View>
        </View>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginButtonViewContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  appleLoginTxt: {
    fontSize: 12,
    fontWeight: '400',
    color: '#FFFFFF',
    marginTop: 16,
    textDecorationLine: 'underline',
  },
  eachLoginButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginButton: {
    width: Platform.OS == 'ios' ? 60 : 80,
    height: Platform.OS == 'ios' ? 60 : 80,
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
