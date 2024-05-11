import {
  FlatList,
  ImageBackground,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import Text from '../components/Text';
import {SvgXml} from 'react-native-svg';
import {svgList} from '../assets/svgList';
import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';

type itemProps = {
  item: {Q: string; A: string};
  index: number;
};

export default function FAQs() {
  const navigation = useNavigation();
  const faqs = [
    [
      {Q: '푸시알림이 오지 않아요.', A: '그렇군요'},
      {Q: '푸시알림이 오지 않아요.', A: '네.'},
      {Q: '푸시알림이 오지 않아요.', A: '그렇군요'},
      {Q: '푸시알림이 오지 않아요.', A: '네.'},
      {Q: '푸시알림이 오지 않아요.', A: '그렇군요'},
      {Q: '푸시알림이 오지 않아요.', A: '네.'},
      {Q: '푸시알림이 오지 않아요.', A: '그렇군요'},
      {Q: '푸시알림이 오지 않아요.', A: '네.'},
      {Q: '푸시알림이 오지 않아요.', A: '그렇군요'},
      {Q: '푸시알림이 오지 않아요.', A: '네.'},
      {Q: '푸시알림이 오지 않아요.', A: '그렇군요'},
      {Q: '푸시알림이 오지 않아요.', A: '네.'},
      {Q: '푸시알림이 오지 않아요.', A: '그렇군요'},
      {Q: '푸시알림이 오지 않아요.', A: '네.'},
    ],
    [{Q: '푸시알림이 오지 않아요.', A: '네.'}],
  ];
  const [push_toggle, setPush_toggle] = useState(
    Array(faqs[0].length).fill(false),
  );
  const [tab, setTab] = useState(0);
  return (
    <ImageBackground
      source={require('../assets/pictures/Base.png')}
      style={{flex: 1}}>
      <View style={styles.entire}>
        <Pressable style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.backBtnTxt}>{'<'}</Text>
        </Pressable>
        <View style={styles.Content}>
          <View style={styles.titleView}>
            <Text style={styles.titleTxt}>자주 묻는 질문</Text>
          </View>
          <View style={styles.tabView}>
            <Pressable
              style={[
                styles.tabBtn,
                tab == 0 && {backgroundColor: '#6EA5FFE5'},
              ]}
              onPress={() => {
                setTab(0);
                setPush_toggle(Array(faqs[0].length).fill(false));
              }}>
              <Text
                style={[
                  styles.tabBtnTxt,
                  tab == 0 ? {color: '#FFFFFF'} : {color: '#002B5D80'},
                ]}>
                푸쉬 알림
              </Text>
            </Pressable>
            <Pressable
              style={[
                styles.tabBtn,
                tab == 1 && {backgroundColor: '#6EA5FFE5'},
              ]}
              onPress={() => {
                setTab(1);
                setPush_toggle(Array(faqs[1].length).fill(false));
              }}>
              <Text
                style={[
                  styles.tabBtnTxt,
                  tab == 1 ? {color: '#FFFFFF'} : {color: '#002B5D80'},
                ]}>
                푸쉬 알림
              </Text>
            </Pressable>
          </View>
          <FlatList
            style={styles.FAQs}
            data={faqs[tab]}
            renderItem={({item, index}: itemProps) => (
              <View style={styles.eachQuestion}>
                <Pressable
                  style={styles.eachQuestionToggle}
                  onPress={() => {
                    setPush_toggle(prev => {
                      const newPush = [...prev];
                      newPush[index] = !newPush[index];
                      return newPush;
                    });
                  }}>
                  <Text style={styles.eachQuestionToggleTxt}>
                    {'Q. ' + item.Q}
                  </Text>
                  {push_toggle[index] ? (
                    <SvgXml xml={svgList.mypage.faqToggleUp} />
                  ) : (
                    <SvgXml xml={svgList.mypage.faqToggleDown} />
                  )}
                </Pressable>
                {push_toggle[index] && (
                  <View style={styles.eachAnswerView}>
                    <Text style={styles.eachAnswerViewTxt}>
                      {'A. ' + item.A}
                    </Text>
                  </View>
                )}
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
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
    paddingHorizontal: 33,
    position: 'relative',
  },
  backBtn: {
    position: 'absolute',
    padding: 10,
    top: 36,
    left: 12,
  },
  backBtnTxt: {
    fontSize: 20,
    color: '#6EA5FF',
    fontWeight: '400',
  },
  Content: {
    marginTop: 102,
    marginBottom: 66,
    flex: 1,
  },
  titleView: {},
  titleTxt: {
    fontWeight: '400',
    fontSize: 22,
    color: '#002B5D',
  },
  tabView: {
    marginVertical: 26,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tabBtn: {
    paddingVertical: 2,
    paddingHorizontal: 7,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabBtnTxt: {
    fontSize: 11,
    fontWeight: '400',
  },
  FAQs: {},
  eachQuestion: {
    borderRadius: 12,
    marginBottom: 16,
    padding: 13,
    backgroundColor: '#FFFFFF',
  },
  eachQuestionToggle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  eachQuestionToggleTxt: {
    fontSize: 13,
    fontWeight: '400',
    color: '#6EA5FF',
  },
  eachAnswerView: {},
  eachAnswerViewTxt: {},
});
