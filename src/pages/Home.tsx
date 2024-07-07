import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  TextInput,
  Vibration,
  View,
} from 'react-native';
import Text from '../components/Text';
import Character, {
  level,
  selectedCategory,
  status,
  variation,
} from '../components/Character';
import {useEffect, useRef, useState} from 'react';
import Modal from 'react-native-modal';
import MyPageModal from '../components/MyPageModal';
import {SvgXml} from 'react-native-svg';
import {svgList} from '../assets/svgList';
import {Cursor, Evolution} from '../components/animations';
import axios, {AxiosError} from 'axios';
import Config from 'react-native-config';
import useAxiosInterceptor from '../hooks/useAxiosIntercepter';
import DefaultCharacter from '../components/DefaultCharacter';
import Splash from '../components/Splash';
import {RootState, useAppDispatch} from '../store';
import userSlice from '../slices/user';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {RootTabParamList} from '../../AppInner';
import {category, fileDirection} from '../assets/info';
import {useSelector} from 'react-redux';
import {act} from 'react-test-renderer';
type HomeNavigationProp = BottomTabNavigationProp<RootTabParamList, 'Home'>;
type HomeProps = {
  navigation: HomeNavigationProp;
};

type defaultBogu = {
  id: number;
};

type evolvedBogu = {
  id: number;
  level: level;
  categories: string[];
  selectedCategory: selectedCategory;
  variation: variation;
  name: string;
  status: status;
  count: number;
  problem: string;
};

export default function Home(props: HomeProps) {
  const dispatch = useAppDispatch();
  // const tutorialFlag = useSelector(
  //   (state: RootState) => state.user.tutorialFlag,
  // );
  useAxiosInterceptor();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    dispatch(userSlice.actions.setTabBar(''));
    setTimeout(() => {
      setIsLoading(false);
      dispatch(userSlice.actions.setTabBar('show'));
    }, 3000);
  }, []);
  const [modal, setModal] = useState('no');
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
  const [worry, setWorry] = useState('');

  const [cnt, setCnt] = useState(0);
  const [tutorial, setTutorial] = useState('0');
  const [tutorialFlag, setTutorialFlag] = useState(false);
  const [animationType, setAnimationType] = useState('no'); // making: 생성 중 => both => pop: 선물상자 open, popping: 터트리기
  const [evolvedBoguId, setEvolvedBoguId] = useState('-1');
  const [evolvedBoguStatus, setEvolvedBoguStatus] = useState(0);
  const [evolvedBoguSelectedCategory, setEvolvedBoguSelectedCategory] =
    useState('');
  const [evolvedBoguVariation, setEvolvedBoguVariation] = useState(0);
  const [evolvedBoguName, setEvolvedBoguName] = useState('');

  const [newBogus, setNewBogus] = useState(true);
  const [defaultBogu, setDefaultBogu] = useState<defaultBogu[]>([]);
  const [evolvedBogu, setEvolvedBogu] = useState<evolvedBogu[]>([]);

  const [focusedBoguId, setFocusedBoguId] = useState('-1');
  const [focusedBoguName, setFocusedBoguName] = useState('');
  const [focusedBoguProblem, setFocusedBoguProblem] = useState('');
  const [focusedBoguCategory, setFocusedBoguCategory] = useState<string[]>([]);
  const [focusedBoguVariation, setFocusedBoguVariation] = useState(0);
  const [focusedBoguSelectedCategory, setFocusedBoguSelectedCategory] =
    useState('');
  const [focusedBoguStatus, setFocusedBoguStatus] = useState(0);
  const [focusedBoguCreatedAt, setFocusedBoguCreatedAt] = useState('');
  const [focusedBoguLevel, setFocusedBoguLevel] = useState(0);

  const [activityIndicator, setActivityIndicator] = useState('');

  const ref = useRef<TextInput>(null);
  useEffect(() => {
    ref.current?.setNativeProps({style: {fontFamily: 'KCCDodamdodam'}});
  });
  useEffect(() => {
    getTutorialFlag();
  }, []);
  useEffect(() => {
    if (!tutorialFlag && (tutorial === '0' || tutorial === '1')) {
      setTutorial('1');
      if (defaultBogu.length > 0) {
        setTutorial('3');
      }
    }
    if (tutorial === '2' && defaultBogu.length > 0) {
      setTutorial('3');
    }
    if (tutorialFlag) {
      setTutorial('0');
    }
  }, [tutorialFlag, tutorial, defaultBogu]);
  useEffect(() => {
    const focusListener = props.navigation.addListener('focus', () => {
      updateBogu();
    });
    return focusListener;
  }, []);
  useEffect(() => {
    if (focusedBoguId.includes('e')) getEvolvedBoguInfo();
  }, [focusedBoguId]);
  const getTutorialFlag = async () => {
    try {
      const response = await axios.get(`${Config.API_URL}/api/user/tutorial`);
      console.log('get tutorial flag', response.data.tutorialFlag);
      setTutorialFlag(response.data.tutorialFlag);
    } catch (error: any) {
      const errorResponse = error.response;
      console.log('cannot get tutorial flag', errorResponse);
    }
  };
  const updateBogu = async () => {
    try {
      const response = await axios.post(`${Config.API_URL}/api/bogu`);
      console.log('update', response.data);
      setFocusedBoguCategory([]);
      setFocusedBoguVariation(0);
      setFocusedBoguSelectedCategory('');
      setFocusedBoguStatus(0);
      setFocusedBoguCreatedAt('');
      setFocusedBoguLevel(0);
      getBasicInfo();
    } catch (error: any) {
      const errorResponse = error.response;
      console.log('cannot update', errorResponse);
    }
  };
  const getBasicInfo = async () => {
    try {
      const response = await axios.get(`${Config.API_URL}/api/bogu`);
      setNewBogus(response.data.todayQuota >= 1);
      setFocusedBoguId('-1');
      setDefaultBogu(response.data.defaultBogus);
      setEvolvedBogu(response.data.evolvedBogus);

      console.log(response.data);
      if (response.data) {
        setFocusedBoguName('');
        setFocusedBoguProblem('');
        setFocusedBoguCategory([]);
        setFocusedBoguVariation(0);
        setFocusedBoguSelectedCategory('');
        setFocusedBoguStatus(0);
        setFocusedBoguCreatedAt('');
        setFocusedBoguLevel(0);
        // setAnimationType('no');
        setFocusedBoguId('-1');
      }
    } catch (error: any) {
      const errorResponse = error.response;
      console.log(errorResponse.status);
    }
  };
  const createDefaultBogu = async () => {
    try {
      const response = await axios.post(`${Config.API_URL}/api/bogu/creation`);
      console.log('create', response.data);
      setActivityIndicator('');
      updateBogu();
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
          defaultBoguId: focusedBoguId.replace('d', ''),
          categories: selectedCategory,
          problem: worry,
        },
      );
      if (!tutorialFlag) {
        try {
          const res = await axios.post(`${Config.API_URL}/api/user/tutorial`);
          console.log('tutorial', res.data);
          // dispatch(userSlice.actions.setTutorialFlag({tutorialFlag: true}));
          setTutorialFlag(true);
        } catch (error) {
          const errorResponse = (
            error as AxiosError<{message: string; code: number}>
          ).response;
          console.log('errorResponse', errorResponse?.data);
        }
      }
      setActivityIndicator('');
      setTutorial('0');
      setModal('no');
      setTimeout(() => {
        setAnimationType('making');
      }, 400);
      console.log('evolve', response.data);
      setEvolvedBoguId(response.data.id);
      setEvolvedBoguName(response.data.name);
      setEvolvedBoguStatus(response.data.status);
      setEvolvedBoguSelectedCategory(response.data.selectedCategory);
      setEvolvedBoguVariation(response.data.variation);
      setFocusedBoguId('-1');
      setSelectedCategory([]);
      setWorry('');
      setTimeout(() => {
        updateBogu();
      }, 500);
    } catch (error: any) {
      const errorResponse = error.response;
      console.log('cannot evolve', errorResponse);
    }
  };
  const getEvolvedBoguInfo = async () => {
    try {
      const response = await axios.post(`${Config.API_URL}/api/bogu/id`, {
        id: focusedBoguId.split('-')[0].replace('e', ''),
      });
      console.log('getEvolvedInfo', response.data);
      // setFocusedBoguId(response.data.id);
      setFocusedBoguCreatedAt(response.data.createdAt);
      setFocusedBoguStatus(response.data.status);
      setFocusedBoguSelectedCategory(response.data.selectedCategory);
      setFocusedBoguVariation(response.data.variation);
      setFocusedBoguCategory(response.data.categories);
      setFocusedBoguName(response.data.name);
      setFocusedBoguProblem(response.data.problem);
      setFocusedBoguLevel(response.data.level);
    } catch (error: any) {
      const errorResponse = error.response;
      console.log('cannot get evolved bogu info', errorResponse);
    }
  };
  const pop = async () => {
    console.log('popping');
    // console.log('level', focusedBoguLevel, time);
    // 터지는 애니메이션 넣기 (5초 후 api 전송)
    try {
      let time =
        focusedBoguLevel == 1 || focusedBoguLevel == 2
          ? 700
          : focusedBoguLevel == 3 || focusedBoguLevel == 4
          ? 1700
          : 4200;
      let t = 300;
      setAnimationType('popping');
      setTimeout(() => {
        setAnimationType('popEnd');
      }, time);
      if (time == 700) {
        Vibration.vibrate([t, t]);
      } else if (time == 1700) {
        Vibration.vibrate([t, t, t, t]);
      } else if (time == 4200) {
        Vibration.vibrate([t, t, t, t, t, t, t, t]);
      }
      const response = await axios.post(`${Config.API_URL}/api/bogu/pop`, {
        id: focusedBoguId.split('-')[0].replace('e', ''),
      });
      console.log('pop', response.data);
      if (response.data.liberationFlag) {
        // if (true) {
        setModal('no');
        setTimeout(() => {
          setModal('liberate');
        }, 400);
        // 해방시킬지 말지 결정하는 모달 띄우기
      } else {
        updateBogu();
      }
    } catch (error: any) {
      const errorResponse = error.response;
      console.log('cannot pop', errorResponse);
    }
  };
  const liberate = async () => {
    try {
      const response = await axios.post(
        `${Config.API_URL}/api/bogu/liberation`,
        {
          id: focusedBoguId.split('-')[0].replace('e', ''),
        },
      );
      console.log('liberate', response.data);
      updateBogu();
      setModal('no');
    } catch (error: any) {
      const errorResponse = error.response;
      console.log('cannot liberate', errorResponse);
    }
  };
  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1
    const day = String(date.getDate()).padStart(2, '0');
    const weekDays = ['일', '월', '화', '수', '목', '금', '토'];
    const dayOfWeek = weekDays[date.getDay()];
    if (year && month && day && dayOfWeek)
      return `${year}.${month}.${day}(${dayOfWeek})`;
    else return '로딩 중...';
  };

  return isLoading ? (
    <View style={{flex: 1, zIndex: 10}}>
      <Splash />
    </View>
  ) : (
    <ImageBackground
      source={require('../assets/pictures/Game.png')}
      style={{flex: 1}}>
      <StatusBar hidden={true} />
      <View style={styles.entire}>
        {tutorial !== '0' && (
          <View style={styles.tutorialViewTop}>
            {tutorial === '1' && (
              <Text style={styles.tutorialTxt}>
                생성하기 버튼을 눌러주세요!
              </Text>
            )}
            {tutorial === '2' && (
              <Text style={styles.tutorialTxt}>
                {'기본 복어 한 마리가\n생성되었습니다!'}
              </Text>
            )}
            {tutorial === '3' && (
              <Text style={styles.tutorialTxt}>복어를 터치해보세요!</Text>
            )}
          </View>
        )}
        <View
          style={[
            styles.gameContainer,
            {width: Dimensions.get('window').width - 40, height: 300},
          ]}>
          {defaultBogu.map((_, index) => (
            <DefaultCharacter
              key={`d${index}`}
              setModal={setModal}
              id={`d${defaultBogu[index].id}`}
              tutorial={tutorial}
              setTutorial={setTutorial}
              focusedBoguId={focusedBoguId}
              setFocusedBoguId={setFocusedBoguId}
            />
          ))}
          {evolvedBogu.map((item, index) =>
            [...Array(item.count)].map((_, idx) => (
              <Character
                key={`e${item.id}-${idx}`}
                setModal={setModal}
                id={`e${item.id}-${idx}`}
                level={item.level}
                selectedCategory={item.selectedCategory}
                variation={item.variation}
                name={item.name}
                status={item.status}
                problem={item.problem}
                focusedBoguId={focusedBoguId}
                setFocusedBoguId={setFocusedBoguId}
                animationType={animationType}
              />
            )),
          )}
        </View>
        <Pressable
          onPress={() => {
            if (newBogus) {
              setActivityIndicator('createDefaultBogu');
              if (tutorial === '1') {
                setTutorial('2');
                console.log('tutorial', tutorial);
              }
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
              activityIndicator === 'createDefaultBogu' && {
                color: 'transparent',
              },
            ]}>
            생성하기
          </Text>
          {activityIndicator === 'createDefaultBogu' && (
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
              <ActivityIndicator size="small" color="#6EA5FF" />
            </View>
          )}
          {tutorial === '1' && (
            <View style={{position: 'absolute', left: 40, bottom: -90}}>
              <Cursor />
            </View>
          )}
        </Pressable>
      </View>

      <Modal
        style={styles.animationBG}
        onModalShow={() => {
          if (animationType === 'making') {
            setTimeout(() => {
              setAnimationType('both');
              setTimeout(() => {
                setAnimationType('pop');
              }, 1000);
            }, 3000);
          }
        }}
        isVisible={
          animationType === 'making' ||
          animationType === 'both' ||
          animationType === 'pop'
        }
        hasBackdrop={false}
        backdropOpacity={0}
        avoidKeyboard={true}>
        <View style={styles.animationContainer}>
          {animationType === 'making' || animationType === 'both' ? (
            <Text style={styles.animationText}>복어 생성 중..</Text>
          ) : (
            <Text style={styles.animationText}>축하합니다!!</Text>
          )}
          {(animationType === 'making' || animationType === 'both') && (
            <Evolution
              style={{
                width: 420,
                height: 420,
                position: 'absolute',
                top: -68,
                zIndex: 1,
              }}
            />
          )}
          {(animationType === 'pop' || animationType === 'both') && (
            <Image
              source={
                fileDirection[category[evolvedBoguSelectedCategory]][
                  'var' + evolvedBoguVariation
                ]['1']['left']
              }
              style={{width: 200, height: 200}}
            />
          )}

          {animationType === 'pop' && (
            <Text
              style={styles.animationText}>{`${evolvedBoguName} 획득!`}</Text>
          )}
          {animationType === 'pop' && (
            <Pressable
              style={styles.animationBtn}
              onPress={() => {
                setAnimationType('no');
                setFocusedBoguId('-1');
              }}>
              <Text style={styles.animationBtnTxt}>확인</Text>
            </Pressable>
          )}
        </View>
      </Modal>

      <MyPageModal
        showModal={modal}
        setShowModal={setModal}
        condition="cannotCreate"
        headerTxt="하루 최대 생성 횟수를 초과했습니다 !!">
        <SvgXml xml={svgList.termModal.separator} style={{marginTop: 8}} />
        <View style={styles.cannotCreateContent}>
          <Text style={styles.cannotCreateContentTxt}>
            {/* 생성 횟수를 무한으로 늘려보세요. */}
            복어들의 컨디션 관리를 위해
          </Text>
          <Text style={styles.cannotCreateContentTxt}>
            <Text style={styles.cannotCreateContentTxtLink}>
              {/* 멤버십 구독하러 가기 */}
              "하루 3회"
            </Text>
            로 제한하고 있어요.
          </Text>
        </View>
        <SvgXml xml={svgList.termModal.separator} style={{marginBottom: 15}} />
        <Pressable
          style={styles.cannotCreateBtn}
          onPress={() => {
            setModal('no');
          }}>
          <Text style={styles.cannotCreateBtnTxt}>닫기</Text>
        </Pressable>
      </MyPageModal>
      <MyPageModal
        showModal={modal}
        setShowModal={setModal}
        condition="selectCategory"
        // onClosed={() => {
        //   if (tutorial === '4') {
        //     setTutorial('3');
        //   }
        //   setFocusedBoguId('-1');
        // }}
        // onShow={() => {
        //   if (tutorial !== '0') {
        //     setTutorial('4');
        //   }
        // }}

        // 튜토리얼이 진행중이면 (tutorial == '4') 취소시 튜토리얼을 3으로 변경, 진행시 튜토리얼 '4' 유지
        // 취소시 focusedBoguId를 -1로 변경, 진행시 유지
        // 취소시 selectCategory를 빈 배열로 변경, 진행시 유지
        onBackButtonPress={() => {
          if (tutorial === '4') {
            setTutorial('3');
          }
          setFocusedBoguId('-1');
        }}
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
              setFocusedBoguId('-1');
              setSelectedCategory([]);
              setWorry('');
              if (tutorial === '4') setTutorial('3');
              setModal('no');
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
        onBackButtonPress={() => {
          if (tutorial === '4') {
            setTutorial('3');
          }
          setFocusedBoguId('-1');
          // setSelectedCategory([]);
        }}
        headerTxt="어떤 걱정인가요?">
        <View style={styles.worryContent}>
          <Text style={styles.date}>{formatDate(new Date())}</Text>
          <View
            style={[
              styles.worryInputView,
              worry.length >= 1 && {paddingBottom: 30},
            ]}>
            <TextInput
              ref={ref}
              style={[styles.worryInput]}
              placeholder="오늘 하루를 기록해보세요."
              placeholderTextColor={'#002B5D80'}
              value={worry}
              onChangeText={text => setWorry(text)}
              multiline={true}
              maxLength={1000}
            />
          </View>
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
              setActivityIndicator('evolveBogu');
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
                activityIndicator === 'evolveBogu' && {
                  color: 'transparent',
                },
              ]}>
              진화
            </Text>
            {activityIndicator === 'evolveBogu' && (
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
        showModal={modal}
        setShowModal={setModal}
        condition="pop"
        headerTxt=""
        // onShow={() => getEvolvedBoguInfo()}
        onBackButtonPress={() => {
          // 백버튼 핸들러 사용
          setFocusedBoguId('-1');
          setFocusedBoguName('');
          setFocusedBoguProblem('');
          setFocusedBoguCategory([]);
          setFocusedBoguVariation(0);
          setFocusedBoguSelectedCategory('');
          setFocusedBoguStatus(0);
          setFocusedBoguCreatedAt('');
          setFocusedBoguLevel(0);
        }}>
        <View style={styles.popModalContent}>
          <Text style={styles.popModalCreatedAt}>
            {formatDate(new Date(focusedBoguCreatedAt))}
          </Text>
          <View style={styles.popModalView}>
            <View
              style={styles.popModalBoguImg}
              onStartShouldSetResponder={() => true}>
              {focusedBoguSelectedCategory && (
                <Image
                  source={
                    fileDirection[category[focusedBoguSelectedCategory]][
                      'var' + focusedBoguVariation
                    ][
                      focusedBoguStatus == 1 ||
                      focusedBoguStatus == 2 ||
                      focusedBoguStatus == 3
                        ? 1
                        : focusedBoguStatus == 4 ||
                          focusedBoguStatus == 5 ||
                          focusedBoguStatus == 6
                        ? 2
                        : 3
                    ]['left']
                  }
                  style={[
                    {width: 160, height: 160, marginTop: 30},
                    focusedBoguName === '아싸 복어' && {opacity: 0.5},
                  ]}
                />
              )}
            </View>
            <ScrollView style={{width: '100%'}}>
              <View
                style={styles.popModalCategoryView}
                onStartShouldSetResponder={() => true}>
                <Text style={styles.popModalCategoryTxt}>
                  {focusedBoguCategory.map(item => ` #${item} `)}
                </Text>
              </View>
              <View
                style={styles.popModalProblemView}
                onStartShouldSetResponder={() => true}>
                <Text style={styles.popModalProblemTxt}>
                  {focusedBoguProblem}
                </Text>
                <Text style={styles.popModalQuantity}>
                  {`${focusedBoguProblem.length}/1000`}
                </Text>
              </View>
            </ScrollView>
          </View>
          <Pressable
            style={styles.popModalBtn}
            disabled={focusedBoguCreatedAt === ''}
            onPress={() => {
              setModal('no');
              setTimeout(() => {
                pop();
              }, 400);
            }}>
            <Text
              style={[
                styles.popModalBtnTxt,
                focusedBoguCreatedAt == '' && {color: 'transparent'},
              ]}>
              터트리기
            </Text>
            {focusedBoguCreatedAt === '' && (
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
                <ActivityIndicator size="small" color="#6EA5FF" />
              </View>
            )}
          </Pressable>
        </View>
      </MyPageModal>
      <MyPageModal
        showModal={modal}
        setShowModal={setModal}
        condition="liberate"
        headerTxt="이 고민은 더 이상 당신의 고민이 아닌가요?"
        onBackButtonPress={() => {
          updateBogu();
        }}>
        <View style={styles.popModalContent}>
          <Text style={[styles.popModalCreatedAt, {marginTop: 12}]}>
            {formatDate(new Date(focusedBoguCreatedAt))}
          </Text>
          <View style={[styles.popModalView, {maxHeight: 300}]}>
            <ScrollView style={{width: '100%'}}>
              <View
                style={styles.popModalCategoryView}
                onStartShouldSetResponder={() => true}>
                <Text style={styles.popModalCategoryTxt}>
                  {focusedBoguCategory.map(item => ` #${item} `)}
                </Text>
              </View>
              <View
                style={styles.popModalProblemView}
                onStartShouldSetResponder={() => true}>
                <Text style={styles.popModalProblemTxt}>
                  {focusedBoguProblem}
                </Text>
                <Text style={styles.popModalQuantity}>
                  {`${focusedBoguProblem.length}/1000`}
                </Text>
              </View>
            </ScrollView>
          </View>
          <View style={{marginBottom: 12}}>
            <Text style={styles.liberateDescription}>
              {'예를 누를 경우, 이 고민의 복어는\n더 이상 리스폰되지 않아요.'}
            </Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Pressable
              style={styles.popModalBtn}
              disabled={focusedBoguCreatedAt === ''}
              onPress={() => {
                setFocusedBoguId('-1');
                setModal('no');
                updateBogu();
              }}>
              <Text style={styles.popModalBtnTxt}>아니요</Text>
            </Pressable>
            <View style={{width: 16}} />
            <Pressable
              style={[styles.popModalBtn, {backgroundColor: '#6EA5FF'}]}
              disabled={focusedBoguCreatedAt === ''}
              onPress={() => {
                liberate();
              }}>
              <Text style={[styles.popModalBtnTxt, {color: '#ffffff'}]}>
                예
              </Text>
            </Pressable>
          </View>
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
  tutorialViewTop: {
    marginTop: 102,
  },
  tutorialTxt: {
    color: 'white',
    fontSize: 25,
    fontWeight: '400',
    textAlign: 'center',
  },
  gameContainer: {
    // backgroundColor: 'white',
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
    // textDecorationLine: 'underline',
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
    position: 'relative',
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
  worryInputView: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E6EEF7',
    borderRadius: 16,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  worryInput: {
    width: '100%',
    textAlign: 'center',
    maxHeight: 200,
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
  popModalContent: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  popModalCreatedAt: {
    color: '#6EA5FF',
    fontSize: 11,
    fontWeight: '400',
    textAlign: 'center',
    letterSpacing: 2.2,
  },
  popModalView: {
    marginVertical: 12,
    borderRadius: 16,
    backgroundColor: '#E6EEF7',
    padding: 7,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    maxHeight: 450,
  },
  popModalBoguImg: {
    width: 125,
    height: 125,
    justifyContent: 'center',
    alignItems: 'center',
  },
  popModalCategoryView: {
    marginVertical: 10,
  },
  popModalCategoryTxt: {
    marginTop: 20,
    color: '#002B5D',
    fontSize: 15,
    fontWeight: '400',
    textAlign: 'center',
  },
  popModalProblemView: {
    width: '100%',
  },
  popModalProblemTxt: {
    color: '#002B5D',
    fontSize: 16,
    fontWeight: '400',
    textAlign: 'center',
    fontFamily: 'KCCDodamdodam',
  },
  liberateDescription: {
    color: '#002B5D80',
    fontSize: 10,
    fontWeight: '400',
    textAlign: 'center',
  },
  popModalBtn: {
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 20,
    backgroundColor: '#4F85C54D',
  },
  popModalBtnTxt: {
    color: '#002B5D',
    fontSize: 13,
    fontWeight: '400',
  },
  popModalQuantity: {
    color: '#002B5D80',
    fontSize: 8,
    fontWeight: '400',
    marginTop: 10,
    textAlign: 'right',
    width: '100%',
  },
  animationBG: {
    margin: 0,
    backgroundColor: '#000000B2',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  animationText: {
    color: 'white',
    fontSize: 31,
    fontWeight: '400',
  },
  animationContainer: {
    position: 'relative',
    marginTop: 150,
    alignItems: 'center',
  },
  animationBtn: {
    marginTop: 20,
    paddingVertical: 12,
    paddingHorizontal: 80,
    backgroundColor: 'white',
    borderRadius: 50,
  },
  animationBtnTxt: {
    color: '#002B5DCC',
    fontSize: 16,
    fontWeight: '400',
  },
});
