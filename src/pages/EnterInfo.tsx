import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  Pressable,
  BackHandler,
  TextInput,
  Keyboard,
  ImageBackground,
  Text as RNText,
  useWindowDimensions,
  PixelRatio,
} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {svgList} from '../assets/svgList';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../AppInner';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useAppDispatch} from '../store';
import userSlice from '../slices/user';
import Text from '../components/Text';
import axios, {AxiosError} from 'axios';
import Config from 'react-native-config';
import {useSelector} from 'react-redux';
import {RootState} from '../store/reducer';
import {LinearGradient} from 'react-native-linear-gradient';
import EncryptedStorage from 'react-native-encrypted-storage';

type EnterInfoScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'EnterInfo'
>;

export default function EnterInfo({navigation, route}: EnterInfoScreenProps) {
  const preAcc = useSelector((state: RootState) => state.user.preAcc);

  useEffect(() => {
    const backButtonPressHandler = () => {
      navigation.pop();
      route.params.setShowModal('show');
      return true;
    };
    const keyBoardHideHandler = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboard(false);
      return true;
    });
    const keyBoardShowHandler = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboard(true);
      return true;
    });
    BackHandler.addEventListener('hardwareBackPress', backButtonPressHandler);
    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        backButtonPressHandler,
      );
      keyBoardHideHandler.remove();
      keyBoardShowHandler.remove();
    };
  }, []);
  const fold5Width = 904;
  const fold5Height = 2176;
  const {width, height} = useWindowDimensions();
  const currentDPI = PixelRatio.get();
  const scaleFactor = currentDPI / PixelRatio.getFontScale();
  const adjustedWidth = width * scaleFactor;
  const adjustedHeight = height * scaleFactor;
  const isSmallScreen = adjustedWidth < fold5Width;

  const dispatch = useAppDispatch();
  const [keyboard, setKeyboard] = useState(false);

  const [name, setName] = useState('');
  const [birth, setBirth] = useState('');
  const [calendar, setCalendar] = useState('');
  const [sex, setSex] = useState('');

  const nameRef = useRef<TextInput>(null);
  const birthRef = useRef<TextInput>(null);
  useEffect(() => {
    if (isSmallScreen) {
      nameRef.current?.setNativeProps({
        style: {fontFamily: 'DNFBitBitv2', fontSize: 9},
      });
      birthRef.current?.setNativeProps({
        style: {fontFamily: 'DNFBitBitv2', fontSize: 8},
      });
    } else {
      nameRef.current?.setNativeProps({style: {fontFamily: 'DNFBitBitv2'}});
      birthRef.current?.setNativeProps({style: {fontFamily: 'DNFBitBitv2'}});
    }
  });

  const isValidDate = (date: string) => {
    const year = date.slice(0, 4);
    if (year < '1900' || year > `${new Date().getFullYear()}`) {
      return false;
    }
    const month = date.slice(4, 6);
    if (month < '01' || month > '12') {
      return false;
    }
    const day = date.slice(6, 8);
    if (month == '02' && (day < '01' || day > '29')) {
      return false;
    }
    if (month == '04' || month == '06' || month == '09' || month == '11') {
      if (day < '01' || day > '30') {
        return false;
      }
    }
    if (day < '01' || day > '31') {
      return false;
    }
    const newDate = new Date(`${year}-${month}-${day}`);
    return (
      newDate instanceof Date && !isNaN(newDate.getTime()) && date.length == 8
    );
  };
  const SignUp = async () => {
    try {
      const response = await axios.post(
        `${Config.API_URL}/signup`,
        {
          name: name,
          birthType: calendar == 'solar' ? 'Solar' : 'Lunar',
          birth: `${birth.slice(0, 4)}-${birth.slice(4, 6)}-${birth.slice(
            6,
            8,
          )}`,
          gender: sex,
        },
        {
          headers: {
            Authorization: `Bearer ${preAcc}`,
          },
        },
      );
      dispatch(
        userSlice.actions.setToken({accessToken: response.data.accessToken}),
      );
      await EncryptedStorage.setItem(
        'refreshToken',
        response.data.refreshToken,
      );
    } catch (error) {
      const errorResponse = (error as AxiosError<{message: string}>).response;
      // const errorResponse = error.response;
      console.log(errorResponse);
    }
  };
  // const Login = async () => {
  //   console.log(Config.API_URL);
  //   try {
  //     const response = await axios.post(`${Config.API_URL}/login`, {
  //       username: tempName,
  //       password: tempPassword,
  //     });
  //     console.log(response.headers);
  //     dispatch(
  //       userSlice.actions.setToken({
  //         accessToken: response.headers['authorization'].replace('Bearer ', ''),
  //       }),
  //     );
  //   } catch (error: any) {
  //     const errorResponse = error.response;
  //     console.log(errorResponse);
  //   }
  // };
  return (
    <ImageBackground
      source={require('../assets/pictures/EnterInfo.png')}
      style={{flex: 1}}>
      <View style={styles.entire}>
        <KeyboardAwareScrollView
          // keyboardShouldPersistTaps={'always'}
          style={{flex: 1, width: '100%'}}>
          <View style={styles.header}>
            <SvgXml xml={svgList.enterInfo.sunfish} width={100} height={100} />
            <LinearGradient
              colors={['#BFFFFB99', '#FFFFFF59']}
              style={styles.headerView}>
              <Text style={styles.headerText}>너에 대한 정보를 알고싶복복</Text>
            </LinearGradient>
          </View>
          <View style={styles.body}>
            <View style={[styles.eachQuestion, {marginTop: 0}]}>
              <View style={styles.questionContent}>
                <SvgXml xml={svgList.enterInfo.fishHead} />
                <Text style={styles.questionText}>당신의 이름은?</Text>
                {name.trim() ? (
                  <SvgXml xml={svgList.enterInfo.check} />
                ) : (
                  <SvgXml xml={svgList.enterInfo.checkTransparent} />
                )}
              </View>
              <View style={styles.answerContent}>
                <TextInput
                  style={[
                    styles.answerTextInput,
                    name.trim()
                      ? {backgroundColor: 'rgba(255, 255, 255, 0.50)'}
                      : {backgroundColor: 'rgba(255, 255, 255, 0.30)'},
                  ]}
                  placeholder="이름"
                  placeholderTextColor="rgba(255, 255, 255, 0.70)"
                  value={name}
                  onChangeText={txt => setName(txt.trim())}
                  ref={nameRef}
                  onSubmitEditing={() => birthRef.current?.focus()}
                />
              </View>
            </View>
            <View style={styles.eachQuestion}>
              <View style={styles.questionContent}>
                <SvgXml xml={svgList.enterInfo.fishHead} />
                <Text style={styles.questionText}>당신의 생년월일은?</Text>
                {isValidDate(birth) && calendar ? (
                  <SvgXml xml={svgList.enterInfo.check} />
                ) : (
                  <SvgXml xml={svgList.enterInfo.checkTransparent} />
                )}
              </View>
              <View style={styles.answerContent}>
                <TextInput
                  style={[
                    styles.answerTextInput,
                    birth.trim()
                      ? {backgroundColor: 'rgba(255, 255, 255, 0.50)'}
                      : {backgroundColor: 'rgba(255, 255, 255, 0.30)'},
                  ]}
                  placeholder="8자리 ex) 20010203"
                  placeholderTextColor="rgba(255, 255, 255, 0.70)"
                  value={birth}
                  onChangeText={txt => setBirth(txt.trim())}
                  keyboardType="number-pad"
                  maxLength={8}
                  onSubmitEditing={() => Keyboard.dismiss()}
                  ref={birthRef}
                  onBlur={() => {
                    Keyboard.dismiss();
                  }}
                />
                <View style={styles.calendarButtonView}>
                  <Pressable
                    style={styles.calendarButton}
                    onTouchEnd={() => setCalendar('solar')}>
                    <Text
                      style={[
                        styles.calendarButtonText,
                        calendar == 'solar'
                          ? {color: 'white'}
                          : {color: '#FFFFFFB2'},
                      ]}>
                      양력
                    </Text>
                  </Pressable>
                  <View>
                    <Text
                      style={[styles.calendarButtonText, {color: '#FFFFFFB2'}]}>
                      |
                    </Text>
                  </View>
                  <Pressable
                    style={styles.calendarButton}
                    onTouchEnd={() => setCalendar('lunar')}>
                    <Text
                      style={[
                        styles.calendarButtonText,
                        calendar == 'lunar'
                          ? {color: 'white'}
                          : {color: '#FFFFFFB2'},
                      ]}>
                      음력
                    </Text>
                  </Pressable>
                </View>
              </View>
            </View>
            <View style={styles.eachQuestion}>
              <View style={styles.questionContent}>
                <SvgXml xml={svgList.enterInfo.fishHead} />
                <Text style={styles.questionText}>당신의 성별은?</Text>
                {sex ? (
                  <SvgXml xml={svgList.enterInfo.check} />
                ) : (
                  <SvgXml xml={svgList.enterInfo.checkTransparent} />
                )}
              </View>
              <View style={styles.answerContent}>
                <Pressable
                  style={[
                    styles.answerButton,
                    sex == 'M' && {
                      backgroundColor: 'rgba(255, 255, 255, 0.50)',
                    },
                  ]}
                  onPress={() => setSex('M')}>
                  <Text
                    style={
                      sex == 'M' ? styles.answerText : styles.answerButtonText
                    }>
                    남자
                  </Text>
                </Pressable>
                <View style={{width: 15}}></View>
                <Pressable
                  style={[
                    styles.answerButton,
                    sex == 'F' && {
                      backgroundColor: 'rgba(255, 255, 255, 0.50)',
                    },
                  ]}
                  onPress={() => setSex('F')}>
                  <Text
                    style={
                      sex == 'F' ? styles.answerText : styles.answerButtonText
                    }>
                    여자
                  </Text>
                </Pressable>
                <View style={{width: 15}}></View>
                <Pressable
                  style={[
                    styles.answerButton,
                    sex == 'Non' && {
                      backgroundColor: 'rgba(255, 255, 255, 0.50)',
                    },
                  ]}
                  onPress={() => setSex('Non')}>
                  <Text
                    style={
                      sex == 'Non' ? styles.answerText : styles.answerButtonText
                    }>
                    논바이너리
                  </Text>
                </Pressable>
              </View>
            </View>
            <View style={styles.checkBtnView}>
              <Pressable
                style={[
                  styles.checkBtn,
                  name.trim() && isValidDate(birth) && sex && calendar
                    ? {backgroundColor: 'rgba(255, 255, 255, 0.90)'}
                    : {backgroundColor: 'rgba(255, 255, 255, 0.50)'},
                ]}
                onPress={() => {
                  SignUp();
                  // dispatch(userSlice.actions.setToken({accessToken: '1234'}));
                }}
                disabled={
                  !(name.trim() && isValidDate(birth) && sex && calendar)
                }>
                <Text style={styles.checkBtnTxt}>확인</Text>
              </Pressable>
            </View>
          </View>
        </KeyboardAwareScrollView>
        {!keyboard && (
          <View style={styles.helperButtonView}>
            <Pressable style={[styles.helperButton, {paddingBottom: 30}]}>
              {/* <Text style={styles.helperButtonText}>앱스토어</Text>
              <Text style={styles.helperButtonText}>플레이스토어</Text> */}
              <SvgXml xml={svgList.socialLoginLogo.playStore} opacity={0.5} />
              <View style={{height: 4}}></View>
              <SvgXml xml={svgList.socialLoginLogo.appStore} opacity={0.5} />
            </Pressable>
            <Pressable style={[styles.helperButton, {paddingTop: 10}]}>
              <SvgXml xml={svgList.socialLoginLogo.usTransparent} />
            </Pressable>
          </View>
        )}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  entire: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 20,
    paddingBottom: 44,
    alignItems: 'center',
    // backgroundColor: '#00000080',
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 50,
  },
  headerView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    paddingHorizontal: 45,
    paddingVertical: 10,
    backgroundColor: 'transparent',
    // 'linear-gradient(180deg, rgba(191, 255, 251, 0.52) 0%, rgba(255, 255, 255, 0.35) 100%)',
    borderRadius: 45,
    borderWidth: 1,
    borderColor: '#73CDFF',
    borderStyle: 'dashed',
  },
  headerText: {
    color: '#FFFFFF',
    fontWeight: '400',
    fontSize: 16,
    textAlign: 'center',
  },
  body: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 15,
  },
  eachQuestion: {
    flexDirection: 'column',
    marginVertical: 25,
  },
  questionContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  questionText: {
    color: '#FFFFFF',
    fontWeight: '400',
    marginHorizontal: 8,
    fontSize: 12,
  },
  answerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  answerButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.30)',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#FFFFFF',
  },
  answerButtonText: {
    color: 'rgba(255, 255, 255, 0.70)',
    fontWeight: '400',
    fontSize: 12,
  },
  answerTextInput: {
    flex: 1,
    paddingVertical: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.30)',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#FFFFFF',
    color: '#FFFFFF',
    paddingHorizontal: 15,
    textAlign: 'center',
    fontSize: 12,
  },
  answerText: {
    color: '#FFFFFF',
    fontWeight: '400',
    fontSize: 12,
  },
  calendarButtonView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  calendarButton: {},
  calendarButtonText: {
    fontWeight: '400',
    marginHorizontal: 5,
    fontSize: 12,
  },
  checkBtnView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkBtn: {
    paddingVertical: 10,
    paddingHorizontal: 75,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  checkBtnTxt: {
    color: '#002B5DCC',
    fontWeight: '400',
    fontSize: 12,
  },
  helperButtonView: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  helperButton: {
    width: 73,
    height: 28,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  helperButtonText: {
    fontSize: 9,
    fontWeight: '400',
    color: '#FFFFFF',
  },
});
