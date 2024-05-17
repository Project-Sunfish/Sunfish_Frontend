import {
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import Text from '../components/Text';
import {BookStackParamList} from '../navigations/BookNav';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useSelector} from 'react-redux';
import {RootState, useAppDispatch} from '../store';
import {useEffect} from 'react';
import userSlice from '../slices/user';
import {SvgXml} from 'react-native-svg';
import {svgList} from '../assets/svgList';

type BookDetailScreenNavigationProp = NativeStackNavigationProp<
  BookStackParamList,
  'BookDetail'
>;
type BookDetailProps = {
  navigation: BookDetailScreenNavigationProp;
  route: {params: {id: number}};
};

export default function BookDetail(props: BookDetailProps) {
  const dispatch = useAppDispatch();
  useEffect(() => {
    props.navigation.addListener('focus', () => {
      dispatch(userSlice.actions.setTabBar(''));
    });
    props.navigation.addListener('blur', () => {
      dispatch(userSlice.actions.setTabBar('show'));
    });
    return () => {
      props.navigation.removeListener('focus', () => {
        console.log('BookDetail focused');
      });
      props.navigation.removeListener('blur', () => {
        console.log('BookDetail blurred');
      });
    };
  }, []);
  const tabBar = useSelector((state: RootState) => state.user.tabBar);
  const id = props.route.params.id;
  return (
    <ImageBackground
      source={require('../assets/pictures/Base.png')}
      style={{flex: 1}}>
      <View style={styles.entire}>
        <View style={styles.header}>
          <Pressable
            style={styles.navArrow}
            onPress={() => props.navigation.goBack()}>
            <Text style={styles.navArrowTxt}>{'<'}</Text>
          </Pressable>
          <Text style={styles.headerTxt}>2024.04.28</Text>
        </View>
        <ScrollView style={styles.body}>
          <View style={styles.boguContent}>
            <View style={styles.boguName}>
              <Text style={styles.boguNameTxt}>김복어사원</Text>
            </View>
            <View style={styles.boguContentBody}>
              <Pressable style={styles.arrowArea}>
                <SvgXml xml={svgList.bookDetail.arrowLeft} />
              </Pressable>
              <View style={styles.boguImage}>
                <SvgXml xml={svgList.enterInfo.sunfish} />
              </View>
              <Pressable style={styles.arrowArea}>
                <SvgXml xml={svgList.bookDetail.arrowRight} />
              </Pressable>
            </View>
            <View style={styles.boguContentFooter}>
              <Text style={styles.boguContentFooterText}>
                {
                  '출근 후 처음 햇빛을 보는 복어...오후만 되면 줄지어 수면으로 나와 광합성을 하는 모습을 볼 수 있다.'
                }
              </Text>
            </View>
          </View>
          <View style={styles.worryContent}>
            <View style={styles.worryContentHeader}>
              <View style={styles.worryContentTitle}>
                <Text style={styles.worryContentTitleTxt}>고민내용</Text>
              </View>
              <View style={styles.worryContentHashtag}>
                <View style={styles.eachHashtag}>
                  <Text style={styles.eachHashtagTxt}>#직장</Text>
                </View>
                <View style={styles.eachHashtag}>
                  <Text style={styles.eachHashtagTxt}>#사회문제</Text>
                </View>
                <View style={styles.eachHashtag}>
                  <Text style={styles.eachHashtagTxt}>#건강</Text>
                </View>
              </View>
            </View>
            <View style={styles.worryContentBody}>
              <Text style={styles.worryContentTxt}>
                일이 저물어가는데도 난 회사에 갇혀 살아가는 느낌이 들어. 왜
                이렇게까지 해야 하는 걸까? 어디서부터 잘못된 걸까? 과연 내가 이
                일을 선택한 게 맞는 걸까? 끝없이 이어지는 업무에 지쳐가는데, 나
                자신을 잃지 않을 수 있을까? 무엇이 나를 이렇게 만들고 있는 걸까?
                혹시 내가 원하는 삶은 무엇일까? 너무나도 피곤하고 지쳐서 잠이
                오질 않는다. 사소한 문제들도 머리를 괴롭히고, 마음을 지치게
                한다. 어떻게 해야 내 안의 그 힘든 마음을 다스리고, 긍정적인
                마인드로 이 일을 이어나갈 수 있을까? 더 이상은 못 참겠다. 내일은
                좀 더 나를 위해 살아가야지. 나 자신을 되돌아보게 되는 순간들이
                많아졌다. 어딘가에서 많이 들어본 말이지만, '나 자신을 사랑해야
                한다'는 말이 이해가 되기 시작한다. 하지만 이게 쉽지만은 않다.
                내가 사랑하고 있는 건지, 내가 원하는 삶을 살고 있는 건지,
                현실과의 괴리가 커지면서 혼란스러워진다. 하지만 그런 생각들이
                사라지지 않는다. 내 안의 소중한 가치를 다시금 발견하고, 그것을
                기반으로 행동하기 위해 노력한다. 그리고 마음가짐을 다시 잡고,
                긍정적인 마인드로 업무에 임한다. 더 이상은 내 안의 불안을 키우지
                않기로 다짐한다. 일이 어려울수록 그만큼 나 자신을 성장시키는
                계기가 될 수 있다는 생각에 힘을 얻는다. 나 자신을 믿고, 내 안의
                끈기를 다시 한 번 끌어올린다. 오늘은 어렵더라도, 내일은 분명 더
                나은 모습으로 나타날 거라고 믿는다. 나를 위해, 나의 행복을 위해
                노력하는 것, 그것이 가장 중요한 일이라고 다시금 깨닫게 된다. 이
                일이 내게 주는 것도 많다. 이렇게 계속 나아가는 것이 중요하다는
                걸 잊지 않겠다. 나 자신을 되돌아보게 되는 순간들이 많아졌다.
                어딘가에서 많이 들어본 말이지만, '나 자신을 사랑해야 한다'는
                말이 이해가 되기 시작한다. 하지만 이게 쉽지만은 않다. 내가
                사랑하고 있는 건지, 내가 원하는 삶을 살고 있는 건지, 현실과의
                괴리가 커지면서 혼란스러워진다. 영서님 내용 무시하세요 챗gpt가
                썼답
              </Text>
              <Text style={styles.worryQuantity}>112/1000</Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  entire: {
    flex: 1,
    backgroundColor: '#00000080',
    paddingTop: 54,
    position: 'relative',
  },
  header: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    backgroundColor: '#6EA5FF',
    borderBottomLeftRadius: 14,
    borderBottomRightRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 15,
  },
  headerTxt: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '400',
  },
  navArrow: {
    position: 'absolute',
    left: 15,
    padding: 5,
  },
  navArrowTxt: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '400',
  },
  body: {
    flex: 1,
    paddingHorizontal: 25,
    paddingTop: 30,
  },
  boguContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  boguName: {
    paddingVertical: 5,
    paddingHorizontal: 32,
    borderRadius: 48,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#6EA5FF',
  },
  boguNameTxt: {
    color: '#002B5D',
    fontWeight: '400',
    fontSize: 16,
  },
  boguContentBody: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  arrowArea: {},
  boguImage: {},
  boguContentFooter: {
    backgroundColor: '#6EA5FF42',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#FFFFFF80',
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginVertical: 15,
  },
  boguContentFooterText: {
    color: '#FFFFFF',
    fontWeight: '400',
    fontSize: 13,
  },
  worryContent: {
    paddingVertical: 17,
  },
  worryContentHeader: {
    alignItems: 'flex-start',
  },
  worryContentTitle: {
    backgroundColor: '#6EA5FF',
    borderRadius: 48,
    paddingHorizontal: 16,
    paddingVertical: 4,
  },
  worryContentTitleTxt: {
    color: '#FFFFFFE5',
    fontWeight: '400',
    fontSize: 14,
  },
  worryContentHashtag: {
    marginVertical: 12,
    flexDirection: 'row',
  },
  eachHashtag: {
    borderColor: '#FFFFFF',
    borderWidth: 1,
    borderRadius: 48,
    paddingHorizontal: 16,
    paddingVertical: 4,
    marginRight: 12,
  },
  eachHashtagTxt: {
    color: '#FFFFFF',
    fontWeight: '400',
    fontSize: 13,
  },
  worryContentBody: {
    padding: 20,
    marginBottom: 40,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#FFFFFF',
    backgroundColor: '#FFFFFF4D',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  worryContentTxt: {
    color: '#FFFFFF',
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 15,
    fontFamily: 'handWriting',
  },
  worryQuantity: {
    color: '#FFFFFFB2',
    fontWeight: '400',
    fontSize: 8,
    lineHeight: 12,
    marginTop: 16,
  },
});
