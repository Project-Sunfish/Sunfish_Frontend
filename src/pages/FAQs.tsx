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
    // [
    //   {
    //     Q: '푸쉬 알림이 오지 않아요.',
    //     A: '푸쉬 알림이 오지 않았을 때에는 마이페이지에서 알림이 켜져있는지 확인해주세요. 또는 휴대폰 환경설정에 들어가셔서 알림 권한이 설정되어있는지 확인해주세요.',
    //   },
    //   {
    //     Q: '알림을 끄고 싶어요.',
    //     A: '마이페이지에서 알림을 끄시거나, 휴대폰 환경설정에 들어가셔서 알림 권한을 해제해주세요.',
    //   },
    // ],
    // [
    //   {
    //     Q: '멤버십은 무엇인가요?',
    //     A: '멤버십에 가입함으로써 복어의 하루 생성 횟수를 3회에서 10회로 늘릴 수 있어요. 또한 더욱 다양한 귀여운 스킨들을 만나볼 수 있습니다!',
    //   },
    //   {
    //     Q: '멤버십에 가입하고 싶어요.',
    //     A: '멤버십 정책을 열심히 준비하고 있습니다. 한 달 내로 업데이트할게요!',
    //   },
    //   {
    //     Q: '구독권을 환불하고 싶어요.',
    //     A: '구독권 환불 정책에 따라 일부 제약이 있을 수 있습니다.',
    //   },
    // ],
    [
      {
        Q: '복어를 더 생성하려고 하면 ‘최대 횟수’에 \n도달했다고 떠요.',
        A: '하루에 생성할 수 있는 복어의 횟수는 3회로 제한되어있습니다.',
        //  멤버십에 구독하시면 하루 10회로 늘릴 수 있어요! 이외에도 다양한 혜택이 있으니 마이페이지에 멤버십 버튼을 눌러 구경해보세요.
      },
      {
        Q: '어제 터뜨린 복어가 오늘 들어와보니 다시 나타나 있어요. 왜 그런 거죠?',
        A: '당신의 고민을 흡수한 복어는 리스폰 능력을 갖게 돼요. 우리들의 걱정이 바이러스처럼 계속계속 생각나는 것처럼 말예요. 하지만 영원히 리스폰되는 것은 아닙니다. 똑같은 복어를 3회 이상 터뜨릴 시 알림창이 뜰 거예요. 해당 고민이 더 이상 당신의 고민이 아니라고 생각되면, 복어가 더 이상 리스폰되지 않도록 해방시킬 수 있어요!',
      },
      {
        Q: '복어들이 크기가 점점 커져서 게임 플레이가 불편해요.',
        A: '정상입니다. 머릿속에 있는 걱정과 불안은 주기적으로 돌봐주고 처치해야하는 법. 방치해버리면 무의식 어딘가에서 점점 크기가 커져가요. 골치아픈 고민이 되어버리기 전에 이따금씩 고민을 퇴치하는 연습이 되길!',
      },
    ],
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
            {/* <Pressable
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
            </Pressable> */}
            {/* <Pressable
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
                멤버십
              </Text>
            </Pressable> */}
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
                플레이
              </Text>
            </Pressable>
          </View>
          <FlatList
            style={styles.FAQs}
            data={faqs[tab]}
            ListFooterComponent={<View style={{height: 120}} />}
            renderItem={({item, index}: itemProps) => (
              <View style={styles.eachQuestion}>
                <Pressable
                  style={[
                    styles.eachQuestionToggle,
                    push_toggle[index] && {paddingBottom: 8},
                  ]}
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
                    <SvgXml
                      xml={svgList.mypage.faqToggleUp}
                      style={{margin: 4, marginLeft: 8}}
                    />
                  ) : (
                    <SvgXml
                      xml={svgList.mypage.faqToggleDown}
                      style={{margin: 4, marginLeft: 8}}
                    />
                  )}
                </Pressable>
                {push_toggle[index] && (
                  <View style={styles.eachAnswerView}>
                    <Text style={styles.eachAnswerViewTxt}>{item.A}</Text>
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
    // backgroundColor: 'red',
    // paddingBottom: 66,
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
    // marginBottom: 66
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
    // padding: 12
    backgroundColor: '#FFFFFF',
  },
  eachQuestionToggle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
  },
  eachQuestionToggleTxt: {
    fontSize: 13,
    fontWeight: '400',
    color: '#6EA5FF',
    flex: 1,
  },
  eachAnswerView: {
    paddingHorizontal: 12,
    paddingBottom: 12,
    paddingTop: 0,
  },
  eachAnswerViewTxt: {
    fontSize: 11,
    fontWeight: '400',
    color: '#002B5D',
  },
});
