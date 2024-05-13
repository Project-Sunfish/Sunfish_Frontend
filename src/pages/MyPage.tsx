import {ImageBackground, Pressable, StyleSheet, View} from 'react-native';
import userSlice from '../slices/user';
import {useAppDispatch} from '../store';
import Text from '../components/Text';
import {useState} from 'react';
import {LinearGradient} from 'react-native-linear-gradient';
import {SvgXml} from 'react-native-svg';
import {svgList} from '../assets/svgList';
import {useNavigation} from '@react-navigation/native';

export default function MyPage() {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  return (
    <ImageBackground
      source={require('../assets/pictures/Base.png')}
      style={{flex: 1}}>
      <View style={styles.entire}>
        {/* <Text>MyPage</Text>
        <Pressable
          onPress={() => {
            dispatch(userSlice.actions.setToken({accessToken: ''}));
          }}>
          <Text>로그아웃</Text>
        </Pressable> */}
        <View style={styles.profileView}>
          <View style={styles.profileImgView}>
            <SvgXml xml={svgList.mypage.profileImg} width={212} height={212} />
          </View>
          <Text style={styles.nameText}>복어펑펑이</Text>
          <Pressable style={styles.editButton}>
            <Text style={styles.editText}>수정하기</Text>
          </Pressable>
        </View>

        <View style={styles.menuButtonView}>
          <Pressable
            style={styles.menuButtonBG}
            onPress={() => {
              navigation.navigate('FAQs');
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
              navigation.navigate('Contact');
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
              <View style={styles.menuButtonContent}>
                <Text style={[styles.menuButtonTxt, {color: '#FFFFFF'}]}>
                  업데이트 노트
                </Text>
              </View>
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
              <View style={styles.menuButtonContent}>
                <Text style={[styles.menuButtonTxt, {color: '#6EA5FF'}]}>
                  복어펑 이야기
                </Text>
              </View>
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
              dispatch(userSlice.actions.setToken({accessToken: ''}));
            }}>
            <Text style={styles.logoutBtnTxt}>로그아웃</Text>
          </Pressable>
          <Pressable style={styles.quitBtn}>
            <Text style={styles.quitBtnTxt}>계정 탈퇴</Text>
          </Pressable>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  entire: {
    flex: 1,
    backgroundColor: '#E5F2FFCC',
    paddingBottom: 66,
    paddingHorizontal: 22,
    justifyContent: 'center',
  },
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
});
