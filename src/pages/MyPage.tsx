import {
  ActivityIndicator,
  Dimensions,
  Keyboard,
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import userSlice from '../slices/user';
import {RootState, useAppDispatch} from '../store';
import Text from '../components/Text';
import {useEffect, useRef, useState} from 'react';
import {LinearGradient} from 'react-native-linear-gradient';
import {SvgXml} from 'react-native-svg';
import {svgList} from '../assets/svgList';
import MyPageModal from '../components/MyPageModal';
import ImageBackgroundSrollViewRegardingHeight from '../components/ImageBackgroundSrollViewRegardingHeight';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {MyPageStackParamList} from '../navigations/MyPageNav';
import {useSelector} from 'react-redux';
import EncryptedStorage from 'react-native-encrypted-storage';
import * as KakaoLogin from '@react-native-seoul/kakao-login';
import NaverLogin from '@react-native-seoul/naver-login';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

import axios, {AxiosError} from 'axios';
import Config from 'react-native-config';

type MyPageScreenNavigationProp = NativeStackNavigationProp<
  MyPageStackParamList,
  'MyPage'
>;
type MyPageProps = {
  navigation: MyPageScreenNavigationProp;
};
export default function MyPage(props: MyPageProps) {
  const dispatch = useAppDispatch();

  const [pushNotification, setPushNotification] = useState(true);

  const [showModal, setShowModal] = useState('no');

  const [socialType, setSocialType] = useState('');
  const [name, setName] = useState('loading..');
  const [birth, setBirth] = useState('');
  const [calendar, setCalendar] = useState('');
  const [sex, setSex] = useState('');

  const [nameVal, setNameVal] = useState('');
  const [birthVal, setBirthVal] = useState('');
  const [calendarVal, setCalendarVal] = useState('');
  const [sexVal, setSexVal] = useState('');

  const nameRef = useRef<TextInput>(null);
  const birthRef = useRef<TextInput>(null);

  const [activityIndicator, setActivityIndicator] = useState('');

  useEffect(() => {
    nameRef.current?.setNativeProps({style: {fontFamily: 'DNFBitBitv2'}});
    birthRef.current?.setNativeProps({style: {fontFamily: 'DNFBitBitv2'}});
  });

  useEffect(() => {
    const focusListener = props.navigation.addListener('focus', () => {
      getData();
    });
    return focusListener;
  }, []);

  const getData = async () => {
    try {
      const response = await axios.get(`${Config.API_URL}/api/user`);
      console.log('userInfo', response.data);
      setName(response.data.name);
      setNameVal(response.data.name);
      setBirth(response.data.birth.replace('-', '').replace('-', ''));
      setBirthVal(response.data.birth.replace('-', '').replace('-', ''));
      setCalendar(response.data.birthType);
      setCalendarVal(response.data.birthType);
      setSex(response.data.gender);
      setSexVal(response.data.gender);
      setSocialType(response.data.socialType);
    } catch (error) {
      const errorResponse = (
        error as AxiosError<{message: string; code: number}>
      ).response;
      console.log('errorResponse', errorResponse?.data);
    }
  };

  const updateData = async () => {
    setActivityIndicator('edit');
    if (
      name == nameVal &&
      birth == birthVal &&
      calendar == calendarVal &&
      sex == sexVal
    ) {
      console.log('no change');
      setShowModal('no');
      return;
    }
    try {
      const response = await axios.put(`${Config.API_URL}/api/user`, {
        name: nameVal,
        birth:
          birthVal.slice(0, 4) +
          '-' +
          birthVal.slice(4, 6) +
          '-' +
          birthVal.slice(6, 8),
        birthType: calendarVal,
        gender: sexVal,
      });
      console.log('update', response.data);
      setActivityIndicator('');
      setShowModal('no');
      getData();
    } catch (error) {
      const errorResponse = (
        error as AxiosError<{message: string; code: number}>
      ).response;
      console.log('errorResponse', errorResponse?.data);
    }
  };

  const logout = async () => {
    try {
      const response = await axios.post(`${Config.API_URL}/admin/logout`);
      props.navigation.navigate('Home');
      console.log('logout', response.data);
      if (socialType.toLowerCase() == 'kakao') {
        KakaoLogin.logout();
      } else if (socialType.toLowerCase() == 'naver') {
        NaverLogin.logout();
      } else if (socialType.toLowerCase() == 'google') {
        GoogleSignin.signOut();
      }
      EncryptedStorage.removeItem('refreshToken');
      dispatch(userSlice.actions.setToken({accessToken: ''}));
    } catch (error) {
      console.log(error);
    }
  };

  const quit = async () => {
    setActivityIndicator('quit');
    try {
      const response = await axios.delete(`${Config.API_URL}/api/user`);
      props.navigation.navigate('Home');
      console.log('delete', response.data);
      if (socialType.toLowerCase() == 'kakao') {
        KakaoLogin.unlink();
      } else if (socialType.toLowerCase() == 'naver') {
        NaverLogin.deleteToken();
      } else if (socialType.toLowerCase() == 'google') {
        GoogleSignin.revokeAccess();
      }
      EncryptedStorage.removeItem('refreshToken');
      setActivityIndicator('');
      dispatch(userSlice.actions.setToken({accessToken: ''}));
    } catch (error) {
      const errorResponse = (
        error as AxiosError<{message: string; code: number}>
      ).response;
      console.log('errorResponse', errorResponse?.data);
    }
  };

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
  return (
    <ImageBackgroundSrollViewRegardingHeight
      criteriaWindowHeight={650}
      smallerScreenPaddingTop={20}
      smallerScreenPaddingBottom={0}
      smallerScreenMarginBottom={120}
      largerScreenPaddingTop={30}
      largerScreenPaddingBottom={80}
      largerScreenMarginBottom={66}>
      {/* <Pressable
        style={[
          {position: 'absolute', zIndex: 1},
          Dimensions.get('window').height < 670
            ? {top: 0, right: 21}
            : {top: 46, right: 21},
        ]}
        onPress={() => setPushNotification(!pushNotification)}>
        <SvgXml
          xml={
            pushNotification ? svgList.mypage.pushOn : svgList.mypage.pushOff
          }
          width={27}
          height={27}
        />
      </Pressable> */}
      <View style={styles.profileView}>
        <View style={styles.profileImgView}>
          <SvgXml xml={svgList.mypage.profileImg} width={212} height={212} />
        </View>
        <Text style={styles.nameText}>{name}</Text>
        <Pressable
          style={styles.editButton}
          onPress={() => setShowModal('edit')}>
          <Text style={styles.editText}>수정하기</Text>
        </Pressable>
      </View>

      <View style={styles.menuButtonView}>
        <Pressable
          style={styles.menuButtonBG}
          onPress={() => {
            props.navigation.navigate('FAQs');
          }}>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={['#6EA5FFE5', '#5390F4E5']}
            style={styles.menuButton}>
            <View style={styles.menuButtonContent}>
              <Text style={[styles.menuButtonTxt, {color: '#FFFFFF'}]}>
                자주 묻는 질문
              </Text>
            </View>
            <View style={styles.menuButtonArrow}>
              <Text style={[styles.menuButtonTxt, {color: '#FFFFFF'}]}>
                {'>'}
              </Text>
            </View>
          </LinearGradient>
        </Pressable>
        <Pressable
          style={styles.menuButtonBG}
          onPress={() => {
            props.navigation.navigate('Contact');
          }}>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={['#FFFFFFE5', '#F3F3F3E5']}
            style={styles.menuButton}>
            <View style={styles.menuButtonContent}>
              <Text style={[styles.menuButtonTxt, {color: '#6EA5FF'}]}>
                문의하기
              </Text>
            </View>
            <View style={styles.menuButtonArrow}>
              <Text style={[styles.menuButtonTxt, {color: '#6EA5FF'}]}>
                {'>'}
              </Text>
            </View>
          </LinearGradient>
        </Pressable>
        <Pressable style={styles.menuButtonBG}>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={['#6EA5FFE5', '#5390F4E5']}
            style={styles.menuButton}>
            <Pressable
              style={styles.menuButtonContent}
              onPress={() =>
                Linking.openURL('http://rapid-coriander-7d3.notion.site')
              }>
              <Text style={[styles.menuButtonTxt, {color: '#FFFFFF'}]}>
                업데이트 노트
              </Text>
            </Pressable>
            <View style={styles.menuButtonArrow}>
              <Text style={[styles.menuButtonTxt, {color: '#FFFFFF'}]}>
                {'>'}
              </Text>
            </View>
          </LinearGradient>
        </Pressable>
        <Pressable style={styles.menuButtonBG}>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={['#FFFFFFE5', '#F3F3F3E5']}
            style={styles.menuButton}>
            <Pressable
              style={styles.menuButtonContent}
              onPress={() => {
                Linking.openURL(
                  'https://rapid-coriander-7d3.notion.site/95814cef5a1949dabf6f925525a6d683?v=30b302aa7f8a4aea84bcda2ab712662a&pvs=4',
                );
              }}>
              <Text style={[styles.menuButtonTxt, {color: '#6EA5FF'}]}>
                복어펑 이야기
              </Text>
            </Pressable>
            <View style={styles.menuButtonArrow}>
              <Text style={[styles.menuButtonTxt, {color: '#6EA5FF'}]}>
                {'>'}
              </Text>
            </View>
          </LinearGradient>
        </Pressable>
      </View>
      <View style={styles.footerBtnView}>
        <Pressable
          style={styles.logoutBtn}
          onPress={() => {
            logout();
          }}>
          <Text style={styles.logoutBtnTxt}>로그아웃</Text>
        </Pressable>
        <Pressable
          style={styles.quitBtn}
          onPress={() => {
            setShowModal('quit');
          }}>
          <Text style={styles.quitBtnTxt}>계정 탈퇴</Text>
        </Pressable>
      </View>
      <MyPageModal
        showModal={showModal}
        setShowModal={setShowModal}
        condition={'quit'}
        headerTxt={'탈퇴할까요?'}>
        <View style={styles.quitingContent}>
          <Text style={styles.quiitingContentTxt}>
            {'계정 탈퇴 시 모든 데이터와\n기록은 사라집니다.'}
          </Text>
        </View>
        <View style={[styles.modalBtnView, {marginBottom: 10}]}>
          <Pressable
            style={[styles.modalBtn, {width: 96}]}
            onPress={() => setShowModal('no')}>
            <Text style={styles.modalBtnTransTxt}>취소</Text>
          </Pressable>
          <Pressable
            style={[styles.modalBtn, {width: 96}]}
            onPress={() => quit()}>
            <Text
              style={[
                styles.modalBtnTxt,
                activityIndicator === 'quit' && {
                  color: 'transparent',
                },
              ]}>
              탈퇴하기
            </Text>
            {activityIndicator === 'quit' && (
              <View
                style={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  top: 0,
                  bottom: 0,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <ActivityIndicator size="small" color="white" />
              </View>
            )}
          </Pressable>
        </View>
      </MyPageModal>
      <MyPageModal
        onBackButtonPress={() => {
          setNameVal(name);
          setBirthVal(birth);
          setCalendarVal(calendar);
          setSexVal(sex);
          setShowModal('no');
        }}
        showModal={showModal}
        setShowModal={setShowModal}
        condition={'edit'}
        headerTxt={'정보 수정하기'}>
        <View style={styles.editingContent}>
          <View style={styles.eachQuestion}>
            <View style={styles.eachQuestionContent}>
              <SvgXml
                xml={svgList.mypage.fishHead}
                width={19}
                height={16}
                style={{marginRight: 6, marginBottom: 1}}
              />
              <Text style={styles.eachQuestionTxt}>당신의 이름은?</Text>
            </View>
            <View style={styles.eachAnswerContent}>
              <TextInput
                style={[
                  styles.eachAnswerInput,
                  nameVal ? {color: '#002B5D'} : {color: '#002B5D80'},
                ]}
                placeholder={'이름'}
                placeholderTextColor={'#002B5D80'}
                onSubmitEditing={() => birthRef.current?.focus()}
                value={nameVal}
                onChangeText={text => setNameVal(text.trim())}
                ref={nameRef}
              />
            </View>
          </View>
          <View style={{height: 26}} />
          <View style={styles.eachQuestion}>
            <View style={styles.eachQuestionContent}>
              <SvgXml
                xml={svgList.mypage.fishHead}
                width={19}
                height={16}
                style={{marginRight: 6, marginBottom: 1}}
              />
              <Text style={styles.eachQuestionTxt}>당신의 생년월일은?</Text>
            </View>
            <View style={styles.eachAnswerContent}>
              <TextInput
                style={[
                  styles.eachAnswerInput,
                  birthVal ? {color: '#002B5D'} : {color: '#002B5D80'},
                ]}
                placeholder={'8자리 ex) 20010203'}
                placeholderTextColor={'#002B5D80'}
                onSubmitEditing={() => Keyboard.dismiss()}
                ref={birthRef}
                onBlur={() => {
                  Keyboard.dismiss();
                }}
                keyboardType="number-pad"
                maxLength={8}
                value={birthVal}
                onChangeText={text => setBirthVal(text.trim())}
              />
              <View style={styles.eachAnswerCalendarView}>
                <Pressable
                  style={styles.calendarBtn}
                  onTouchEnd={() => setCalendarVal('Solar')}>
                  <Text
                    style={[
                      styles.calendarBtnTxt,
                      calendarVal == 'Solar'
                        ? {color: '#002B5D'}
                        : {color: '#002B5D80'},
                    ]}>
                    양력
                  </Text>
                </Pressable>
                <View>
                  <Text
                    style={[
                      styles.calendarBtnTxt,
                      {marginHorizontal: 10, paddingTop: 2},
                    ]}>
                    |
                  </Text>
                </View>
                <Pressable
                  style={styles.calendarBtn}
                  onTouchEnd={() => setCalendarVal('Lunar')}>
                  <Text
                    style={[
                      styles.calendarBtnTxt,
                      calendarVal == 'Lunar'
                        ? {color: '#002B5D'}
                        : {color: '#002B5D80'},
                    ]}>
                    음력
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
          <View style={{height: 26}} />
          <View style={styles.eachQuestion}>
            <View style={styles.eachQuestionContent}>
              <SvgXml
                xml={svgList.mypage.fishHead}
                width={19}
                height={16}
                style={{marginRight: 6, marginBottom: 1}}
              />
              <Text style={styles.eachQuestionTxt}>당신의 성별은?</Text>
            </View>
            <View style={styles.eachAnswerContent}>
              <Pressable
                onPress={() => setSexVal('M')}
                style={[
                  styles.eachAnswerBtn,
                  {flex: 2},
                  sexVal == 'M'
                    ? {backgroundColor: '#6EA5FFE5'}
                    : {backgroundColor: '#EAEAEA4D'},
                ]}>
                <Text
                  style={[
                    styles.eachAnswerBtnTxt,
                    sexVal == 'M' ? {color: '#FFFFFFBD'} : {color: '#002B5D80'},
                  ]}>
                  남자
                </Text>
              </Pressable>
              <View style={{width: 4}} />
              <Pressable
                onPress={() => setSexVal('F')}
                style={[
                  styles.eachAnswerBtn,
                  {flex: 2},
                  sexVal == 'F'
                    ? {backgroundColor: '#6EA5FFE5'}
                    : {backgroundColor: '#EAEAEA4D'},
                ]}>
                <Text
                  style={[
                    styles.eachAnswerBtnTxt,
                    sexVal == 'F' ? {color: '#FFFFFFBD'} : {color: '#002B5D80'},
                  ]}>
                  여자
                </Text>
              </Pressable>
              <View style={{width: 4}} />
              <Pressable
                onPress={() => setSexVal('Non')}
                style={[
                  styles.eachAnswerBtn,
                  {flex: 3},
                  sexVal == 'Non'
                    ? {backgroundColor: '#6EA5FFE5'}
                    : {backgroundColor: '#EAEAEA4D'},
                ]}>
                <Text
                  style={[
                    styles.eachAnswerBtnTxt,
                    sexVal == 'Non'
                      ? {color: '#FFFFFFBD'}
                      : {color: '#002B5D80'},
                  ]}>
                  논바이너리
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
        <View style={styles.modalBtnView}>
          <Pressable
            onPress={updateData}
            disabled={
              !(
                nameVal &&
                birthVal &&
                isValidDate(birthVal) &&
                calendarVal &&
                sexVal
              )
            }
            style={[
              styles.modalBtn,
              {flex: 1, marginHorizontal: 14},
              nameVal &&
              birthVal &&
              isValidDate(birthVal) &&
              calendarVal &&
              sexVal
                ? {backgroundColor: '#6EA5FFE5'}
                : {},
            ]}>
            <Text
              style={[
                styles.modalBtnTxt,
                activityIndicator == 'edit' && {color: 'transparent'},
              ]}>
              확인
            </Text>
            {activityIndicator == 'edit' && (
              <View
                style={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  top: 0,
                  bottom: 0,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <ActivityIndicator size="small" color="white" />
              </View>
            )}
          </Pressable>
        </View>
      </MyPageModal>
    </ImageBackgroundSrollViewRegardingHeight>
  );
}

const styles = StyleSheet.create({
  profileView: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileImgView: {
    marginBottom: 16,
  },
  nameText: {
    fontSize: 22,
    color: '#000000',
    fontWeight: '400',
  },
  editButton: {
    marginTop: 8,
    marginBottom: 17,
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: '#6EA5FF',
    backgroundColor: '#FFFFFF',
  },
  editText: {
    color: '#002B5DE5',
    fontSize: 11,
    fontWeight: '400',
  },
  menuButtonView: {},
  menuButtonBG: {
    marginVertical: 10,
  },
  menuButton: {
    flexDirection: 'row',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 21,
  },
  menuButtonContent: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  menuButtonTxt: {
    fontSize: 13,
    fontWeight: '400',
  },
  menuButtonArrow: {
    flexShrink: 1,
  },
  footerBtnView: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutBtn: {
    marginVertical: 10,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: '#6EA5FF',
    backgroundColor: '#FFFFFF',
  },
  logoutBtnTxt: {
    fontSize: 11,
    fontWeight: '400',
    color: '#002B5DCC',
    textAlign: 'center',
  },
  quitBtn: {
    marginVertical: 3,
  },
  quitBtnTxt: {
    fontSize: 11,
    fontWeight: '400',
    color: '#002B5D99',
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  quitingContent: {
    marginVertical: 20,
  },
  quiitingContentTxt: {
    fontSize: 12,
    fontWeight: '400',
    color: '#002B5D66',
    textAlign: 'center',
  },
  modalBtnView: {
    flexDirection: 'row',
  },
  modalBtn: {
    backgroundColor: '#4F85C54D',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    marginHorizontal: 6,
    borderRadius: 20,
  },
  modalBtnTransTxt: {
    color: '#002B5D80',
    fontSize: 12,
    fontWeight: '400',
  },
  modalBtnTxt: {
    color: '#002B5D',
    fontSize: 12,
    fontWeight: '400',
  },
  editingContent: {
    marginVertical: 26,
    width: '100%',
  },
  eachQuestion: {},
  eachQuestionContent: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  eachQuestionTxt: {
    fontSize: 11,
    fontWeight: '400',
    color: '#6EA5FFE5',
  },
  eachAnswerContent: {
    marginTop: 10,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  eachAnswerInput: {
    // width: '100%',
    flex: 1,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 2,
    textAlign: 'center',
    backgroundColor: '#EAEAEA4D',
    borderWidth: 1,
    borderColor: '#6EA5FFE5',
    fontFamily: 'DNFBitBitv2',
    fontSize: 10,
    fontWeight: '400',
  },
  eachAnswerBtn: {
    borderRadius: 12,
    padding: 4,
    borderWidth: 1,
    borderColor: '#6EA5FFE5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  eachAnswerBtnTxt: {
    fontSize: 10,
    fontWeight: '400',
  },
  eachAnswerCalendarView: {
    marginLeft: 10,
    flexDirection: 'row',
  },
  calendarBtn: {
    padding: 2,
  },
  calendarBtnTxt: {
    fontSize: 10,
    fontWeight: '400',
    color: '#002B5D80',
  },
});
