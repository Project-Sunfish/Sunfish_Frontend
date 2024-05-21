import {
  Dimensions,
  FlatList,
  ImageBackground,
  Pressable,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import Text from '../components/Text';
import Character from '../components/Character';
import {useEffect, useRef, useState} from 'react';
import MyPageModal from '../components/MyPageModal';
import {SvgXml} from 'react-native-svg';
import {svgList} from '../assets/svgList';
import {Ex, FocusHand, TempPoint} from '../components/animations';
import axios from 'axios';
import Config from 'react-native-config';
import useAxiosInterceptor from '../hooks/useAxiosIntercepter';
import DefaultCharacter from '../components/DefaultCharacter';

type defaultBogu = {
  id: number;
};

type evolvedBogu = {
  id: number;
  level: number;
  categories: string[];
  selected_category: string;
  variation: number;
  name: string;
  status: number;
  count: number;
  problem: string;
};

export default function Home() {
  useAxiosInterceptor();
  const [modal, setModal] = useState('no');
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
  const [worry, setWorry] = useState('');

  const [cnt, setCnt] = useState(0);
  const [newBogus, setNewBogus] = useState(false);
  const [tutorial, setTutorial] = useState(false);
  const [defaultBogu, setDefaultBogu] = useState<defaultBogu[]>([]);
  const [evolvedBogu, setEvolvedBogu] = useState<evolvedBogu[]>([]);

  const [focusedBoguId, setFocusedBoguId] = useState(-1);
  const [focusedBoguName, setFocusedBoguName] = useState('');
  const [focusedBoguProblem, setFocusedBoguProblem] = useState('');

  const ref = useRef<TextInput>(null);
  useEffect(() => {
    ref.current?.setNativeProps({style: {fontFamily: 'KCCDodamdodam'}});
  });
  useEffect(() => {
    getBasicInfo();
    console.log('getBasicInfo');
  }, []);
  useEffect(() => {
    if (modal === 'pop') {
      getEvolvedBoguInfo();
    }
  }, [modal]);
  const getBasicInfo = async () => {
    try {
      const response = await axios.get(`${Config.API_URL}/api/bogu`);
      setNewBogus(response.data.todayQuota >= 1);
      setDefaultBogu(response.data.defaultBogus);
      setEvolvedBogu(response.data.evolvedBogus);
      console.log(response.data);
    } catch (error: any) {
      const errorResponse = error.response;
      console.log(errorResponse.status);
    }
  };
  const createDefaultBogu = async () => {
    try {
      const response = await axios.post(`${Config.API_URL}/api/bogu`);
      console.log(response.data);
      getBasicInfo();
    } catch (error: any) {
      const errorResponse = error.response;
      console.log('cannot create', errorResponse);
    }
  };
  const evolveDefaultBogu = async () => {
    try {
      const response = await axios.post(
        `${Config.API_URL}/api/bogu/evolution`,
        {
          evolvedBoguId: focusedBoguId,
        },
      );
      console.log(response.data);
    } catch (error: any) {
      const errorResponse = error.response;
      console.log('cannot evolve', errorResponse);
    }
  };
  const getEvolvedBoguInfo = async () => {
    try {
      const response = await axios.get(
        `${Config.API_URL}/api/bogu/${focusedBoguId}`,
      );
      console.log(response.data);
      setFocusedBoguName(response.data.name);
      setFocusedBoguProblem(response.data.problem);
    } catch (error: any) {
      const errorResponse = error.response;
      console.log('cannot get evolved bogu info', errorResponse);
    }
  };
  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1
    const day = String(date.getDate()).padStart(2, '0');
    const weekDays = ['일', '월', '화', '수', '목', '금', '토'];
    const dayOfWeek = weekDays[date.getDay()];

    return `${year}.${month}.${day}(${dayOfWeek})`;
  };

  return (
    <ImageBackground
      source={require('../assets/pictures/Base.png')}
      style={{flex: 1}}>
      <View style={styles.entire}>
        <View
          style={[
            styles.gameContainer,
            {width: Dimensions.get('window').width - 40, height: 300},
          ]}>
          {defaultBogu.map((_, index) => (
            <DefaultCharacter
              key={index}
              setModal={setModal}
              id={defaultBogu[index].id}
              tutorial={tutorial}
              setFocusedBoguId={setFocusedBoguId}
            />
          ))}
          {evolvedBogu.map((_, index) =>
            [...Array(evolvedBogu[index].count)].map((_, index) => (
              <Character
                key={index}
                setModal={setModal}
                id={evolvedBogu[index].id}
                level={evolvedBogu[index].level}
                selectedCategory={evolvedBogu[index].selected_category}
                variation={evolvedBogu[index].variation}
                name={evolvedBogu[index].name}
                status={evolvedBogu[index].status}
                problem={evolvedBogu[index].problem}
                setFocusedBoguId={setFocusedBoguId}
              />
            )),
          )}
        </View>
        <Pressable
          onPress={() => {
            if (newBogus) {
              createDefaultBogu();
            } else {
              setModal('cannotCreate');
            }
          }}
          style={[
            styles.newBogu,
            newBogus
              ? {backgroundColor: '#FFFFFF'}
              : {backgroundColor: '#FFFFFF40'},
          ]}>
          <Text
            style={[
              styles.newBoguText,
              newBogus ? {color: '#6EA5FF'} : {color: '#FFFFFF'},
            ]}>
            생성하기
          </Text>
          <View style={{position: 'absolute', right: -50, top: 30}}>
            {/* <TempPoint style={{width: 400, height: 400}} /> */}
            {<SvgXml xml={svgList.temp.tempPoint} />}
          </View>
        </Pressable>
      </View>
      <MyPageModal
        showModal={modal}
        setShowModal={setModal}
        condition="cannotCreate"
        headerTxt="하루 최대 생성 횟수를 초과했습니다 !!">
        <SvgXml xml={svgList.termModal.separator} style={{marginTop: 8}} />
        <View style={styles.cannotCreateContent}>
          <Text style={styles.cannotCreateContentTxt}>
            생성 횟수를 무한으로 늘려보세요.
          </Text>
          <Text style={styles.cannotCreateContentTxtLink}>
            멤버십 구독하러 가기
          </Text>
        </View>
        <SvgXml xml={svgList.termModal.separator} style={{marginBottom: 15}} />
        <Pressable style={styles.cannotCreateBtn}>
          <Text style={styles.cannotCreateBtnTxt}>닫기</Text>
        </Pressable>
      </MyPageModal>
      <MyPageModal
        showModal={modal}
        setShowModal={setModal}
        condition="selectCategory"
        headerTxt={`걱정의 종류를\n‘최대 3개’\n선택해주세요`}>
        <SvgXml xml={svgList.termModal.separator} style={{marginTop: 8}} />
        <View
          style={{
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <FlatList
            style={styles.selectCategoryView}
            data={[
              '학업',
              '직장',
              '가족',
              '친구',
              '연인',
              '건강',
              '사회문제',
              '이유없음',
              '기타',
            ]}
            renderItem={({item, index}) => (
              <Pressable
                style={[
                  styles.cateBtn,
                  selectedCategory.includes(item) && {
                    borderWidth: 1,
                    borderColor: '#002B5D',
                  },
                ]}
                onPress={() => {
                  if (selectedCategory.includes(item)) {
                    setSelectedCategory(
                      selectedCategory.filter(e => e !== item),
                    );
                  } else {
                    if (selectedCategory.length <= 2) {
                      setSelectedCategory([...selectedCategory, item]);
                    }
                  }
                }}>
                <Text
                  style={[
                    styles.cateBtnTxt,
                    selectedCategory.includes(item) && {
                      color: '#002B5D',
                    },
                  ]}>
                  {item}
                </Text>
              </Pressable>
            )}
            keyExtractor={(item, index) => index.toString()}
            numColumns={3}
          />
        </View>
        <View style={styles.selectCategoryBtnView}>
          <Pressable
            style={styles.selectCategoryBtn}
            onPress={() => {
              setModal('no');
              setSelectedCategory([]);
            }}>
            <Text style={styles.cannotCreateBtnTxt}>취소</Text>
          </Pressable>
          <View style={{width: 16}}></View>
          <Pressable
            disabled={selectedCategory.length < 1}
            onPress={() => {
              setModal('no');
              setTimeout(() => {
                setModal('worry');
              }, 400);
            }}
            style={[
              styles.selectCategoryBtn,
              selectedCategory.length >= 1 && {backgroundColor: '#6EA5FF'},
            ]}>
            <Text
              style={[
                styles.cannotCreateBtnTxt,
                selectedCategory.length >= 1 && {color: '#FFFFFF'},
              ]}>
              다음
            </Text>
          </Pressable>
        </View>
      </MyPageModal>
      <MyPageModal
        showModal={modal}
        setShowModal={setModal}
        condition={'worry'}
        headerTxt="어떤 걱정인가요?">
        <View style={styles.worryContent}>
          <Text style={styles.date}>{formatDate(new Date())}</Text>
          <TextInput
            ref={ref}
            style={[
              styles.worryInput,
              worry.length >= 1 && {paddingBottom: 30},
            ]}
            placeholder="오늘 하루를 기록해보세요."
            placeholderTextColor={'#002B5D80'}
            value={worry}
            onChangeText={text => setWorry(text)}
            multiline={true}
          />
          {worry.length >= 1 && (
            <Text style={styles.quantity}>{`${worry.length}/1000`}</Text>
          )}
        </View>
        <View style={styles.selectCategoryBtnView}>
          <Pressable
            style={styles.selectCategoryBtn}
            onPress={() => {
              setModal('no');
              setTimeout(() => {
                setModal('selectCategory');
              }, 400);
            }}>
            <Text style={styles.cannotCreateBtnTxt}>이전</Text>
          </Pressable>
          <View style={{width: 16}}></View>
          <Pressable
            disabled={worry.length < 1}
            onPress={() => {
              evolveDefaultBogu();
            }}
            style={[
              styles.selectCategoryBtn,
              worry.trim().length >= 1 && {backgroundColor: '#6EA5FF'},
            ]}>
            <Text
              style={[
                styles.cannotCreateBtnTxt,
                worry.trim().length >= 1 && {color: '#FFFFFF'},
              ]}>
              진화
            </Text>
          </Pressable>
        </View>
      </MyPageModal>
      <MyPageModal
        showModal={modal}
        setShowModal={setModal}
        condition="pop"
        headerTxt="진화 복어 기본 정보">
        <View
          style={{
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text>{`복어 id:${focusedBoguId}`}</Text>
          <Text>{`복어 이름:${focusedBoguName}`}</Text>
          <Text>{`복어 고민:${focusedBoguProblem}`}</Text>
        </View>
      </MyPageModal>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  entire: {
    flex: 1,
    paddingBottom: 66,
    position: 'relative',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  //temp from here
  gameContainer: {
    backgroundColor: 'white',
  },
  btn: {
    padding: 20,
    alignItems: 'center',
  },
  //temp to here
  newBogu: {
    // position: 'absolute',
    // bottom: 150
    position: 'relative',
    marginBottom: 90,
    paddingHorizontal: 26,
    paddingVertical: 4,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 48,
  },
  newBoguText: {
    fontSize: 20,
    fontWeight: '400',
  },
  cannotCreateContent: {
    paddingVertical: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cannotCreateContentTxt: {
    color: '#002B5D',
    fontSize: 11,
    fontWeight: '400',
  },
  cannotCreateContentTxtLink: {
    color: '#6EA5FF',
    fontSize: 11,
    fontWeight: '400',
    textDecorationLine: 'underline',
  },
  cannotCreateBtn: {
    backgroundColor: '#4F85C54D',
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 84,
  },
  cannotCreateBtnTxt: {
    color: '#002B5D',
    fontSize: 13,
    fontWeight: '400',
  },
  selectCategoryView: {
    flexDirection: 'row',
    marginBottom: 12,
    marginTop: 23,
  },
  cateBtn: {
    flex: 1,
    width: 60,
    height: 60,
    margin: 4,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 7,
    backgroundColor: '#E6EEF7',
  },
  cateBtnTxt: {
    color: '#002B5D80',
    fontSize: 11,
    fontWeight: '400',
  },
  selectCategoryBtnView: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  selectCategoryBtn: {
    backgroundColor: '#4F85C54D',
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 32,
  },
  worryContent: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  date: {
    marginVertical: 12,
    color: '#6EA5FF',
    fontSize: 11,
    fontWeight: '400',
  },
  worryInput: {
    backgroundColor: '#E6EEF7',
    borderRadius: 16,
    paddingVertical: 8,
    paddingHorizontal: 16,
    width: '100%',
    marginBottom: 12,
    textAlign: 'center',
    maxHeight: 220,
    fontFamily: 'KCCDodamdodam',
    color: '#002B5D',
    fontWeight: '400',
    fontSize: 16,
  },
  quantity: {
    color: '#002B5D80',
    fontSize: 8,
    fontWeight: '400',
    position: 'absolute',
    bottom: 20,
    right: 7,
  },
});
