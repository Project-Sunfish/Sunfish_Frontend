import {
  Dimensions,
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useAppDispatch} from '../store';
import userSlice from '../slices/user';
import {SvgXml} from 'react-native-svg';
import {svgList} from '../assets/svgList';
import TermModal from '../components/TermModal';
import {useEffect, useRef, useState} from 'react';
import WebView from 'react-native-webview';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import Modal from 'react-native-modal';
import {RootStackParamList} from '../../AppInner';
import Config from 'react-native-config';
import {Temp} from '../components/animations';
import FastImage from 'react-native-fast-image';

type SignInScreenProps = NativeStackScreenProps<RootStackParamList, 'SignIn'>;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function SignIn({navigation, route}: SignInScreenProps) {
  const dispatch = useAppDispatch();
  // const [showModal, setShowModal] = useState('no');
  const showModal = route.params.showModal;
  const setShowModal = route.params.setShowModal;
  const [isWebView, setIsWebView] = useState(false);

  // const [progress, setProgress] = useState(0);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setProgress(prevProgress => {
  //       if (prevProgress === 100) {
  //         return 0;
  //       }
  //       return prevProgress + 1;
  //     });
  //   }, 10);
  //   return () => clearInterval(interval);
  // }, []);

  return (
    <View style={styles.entire}>
      {/* <Pressable
        onPress={() => {
          // dispatch(userSlice.actions.setToken({accessToken: '1234'}));
          setShowModal(true);
        }}>
        <Text>로그인</Text>
      </Pressable> */}
      <View style={styles.top}>
        {/* <Temp /> */}
        <Image
          source={require('../assets/temp.gif')}
          style={{width: 500, height: 500}}
        />
        {/* <FastImage
          source={{uri: '../assets/temp.gif'}}
          style={{width: 100, height: 100}}
        /> */}
      </View>
      <View style={styles.bottom}>
        <View style={styles.loginButtonView}>
          <Pressable
            style={styles.loginButton}
            onPress={() => {
              setShowModal('show');
            }}>
            <SvgXml xml={svgList.socialLoginLogo.kakao} />
          </Pressable>
          <Pressable
            style={styles.loginButton}
            onPress={() => {
              dispatch(userSlice.actions.setToken({accessToken: '1234'}));
            }}>
            <SvgXml xml={svgList.socialLoginLogo.google} />
          </Pressable>
          <Pressable
            style={styles.loginButton}
            onPress={() => {
              setIsWebView(!isWebView);
              console.log(Config.API_URL);
            }}>
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
