import {
  ImageBackground,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import Text from '../components/Text';
import {BookStackParamList, typeID} from '../navigations/BookNav';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useSelector} from 'react-redux';
import {RootState, useAppDispatch} from '../store';
import {useEffect, useState} from 'react';
import userSlice from '../slices/user';
import {SvgXml} from 'react-native-svg';
import {svgList} from '../assets/svgList';
import axios from 'axios';
import Config from 'react-native-config';
import {selectedCategory} from '../components/Character';
import {idList, info} from '../assets/info';
import {Loading_Android, Loading_IOS} from '../components/animations';

type BookDetailScreenNavigationProp = NativeStackNavigationProp<
  BookStackParamList,
  'BookDetail'
>;
type BookDetailProps = {
  navigation: BookDetailScreenNavigationProp;
  route: {params: {id: typeID; liberated: boolean}};
};

type itemProps = {
  evolvedBoguId: number;
  name: string;
  categories: selectedCategory[];
  problem: string;
  createdAt: string;
  liberatedAt: string;
};

export default function BookDetail(props: BookDetailProps) {
  const dispatch = useAppDispatch();

  const id = props.route.params.id;
  const [data, setData] = useState<itemProps[]>([
    {
      evolvedBoguId: 0,
      name: '',
      categories: [],
      problem: '',
      createdAt: '',
      liberatedAt: '',
    },
  ]);
  const [idx, setIdx] = useState(0);
  const [loading, setLoading] = useState(false);

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

  useEffect(() => {
    setLoading(true);
    getData();
    deleteNew();
  }, []);

  const getData = async () => {
    try {
      const response = await axios.get(
        `${Config.API_URL}/api/collection/${id}`,
      );
      console.log(response.data);
      setData(response.data);
      setLoading(false);
    } catch (error: any) {
      const errorResponse = error.response;
      console.log('cannot get evolved bogu info', errorResponse);
    }
  };
  const deleteNew = async () => {
    try {
      const response = await axios.post(`${Config.API_URL}/api/deleteNew`, {
        id: id,
      });
      console.log('deleteNew', response.data);
    } catch (error: any) {
      const errorResponse = error.response;
      console.log('cannot delete new', errorResponse);
    }
  };
  const formateDate = (date: string) => {
    const year = date.slice(0, 4);
    const month = date.slice(5, 7);
    const day = date.slice(8, 10);
    return `${year}.${month}.${day}`;
  };
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
          <Text style={styles.headerTxt}>
            {formateDate(data[idx].createdAt)}
          </Text>
        </View>
        <ScrollView style={styles.body}>
          <View style={styles.boguContent}>
            <View style={styles.boguName}>
              <Text style={styles.boguNameTxt}>{idList[id].name}</Text>
            </View>
            <View style={[styles.boguContentBody, {height: 250}]}>
              <Pressable
                style={styles.arrowArea}
                onPress={() => {
                  if (idx === 0) return;
                  // if (idx === 0) {
                  //   setIdx(data.length - 1);
                  // } else {
                  // }
                  console.log(idx);
                  setIdx(idx - 1);
                }}>
                {idx != 0 ? (
                  <SvgXml xml={svgList.bookDetail.arrowLeftThick} />
                ) : (
                  <SvgXml xml={svgList.bookDetail.arrowLeft} strokeWidth={1} />
                )}
              </Pressable>
              <View style={styles.boguImage}>
                {props.route.params.liberated ? (
                  <SvgXml
                    xml={svgList.bogus.liberated[id]}
                    width={280}
                    height={280}
                    style={[
                      {marginTop: 40},
                      idList[id].name == '아싸 복어' && {opacity: 0.5},
                    ]}
                  />
                ) : (
                  <SvgXml
                    xml={svgList.bogus[id]}
                    width={280}
                    height={280}
                    style={[
                      {marginTop: 40},
                      idList[id].name == '아싸 복어' && {opacity: 0.5},
                    ]}
                  />
                )}
              </View>
              <Pressable
                style={styles.arrowArea}
                onPress={() => {
                  if (data.length === idx + 1) return;
                  // if (idx === data.length - 1) {
                  //   setIdx(0);
                  // } else {
                  // }
                  setIdx(idx + 1);
                }}>
                {idx == data.length - 1 ? (
                  <SvgXml xml={svgList.bookDetail.arrowRight} strokeWidth={1} />
                ) : (
                  <SvgXml xml={svgList.bookDetail.arrowRightThick} />
                )}
              </Pressable>
            </View>
            <View style={styles.boguContentFooter}>
              <Text style={styles.boguContentFooterText}>
                {idList[id].playText}
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
                  <Text style={styles.eachHashtagTxt}>
                    {data[idx].categories[0]
                      ? `#${data[idx].categories[0]}`
                      : '#'}
                  </Text>
                </View>
                {data[idx].categories.length > 1 && (
                  <View style={styles.eachHashtag}>
                    <Text
                      style={
                        styles.eachHashtagTxt
                      }>{`#${data[idx].categories[1]}`}</Text>
                  </View>
                )}
                {data[idx].categories.length > 2 && (
                  <View style={styles.eachHashtag}>
                    <Text
                      style={
                        styles.eachHashtagTxt
                      }>{`#${data[idx].categories[2]}`}</Text>
                  </View>
                )}
              </View>
            </View>
            <View style={styles.worryContentBody}>
              <Text style={styles.worryContentTxt}>{data[idx].problem}</Text>
              <Text style={styles.worryQuantity}>
                {data[idx].problem.length.toString()}/1000
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
      {loading && (
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            top: 0,
            right: 0,
            left: 0,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {Platform.OS == 'android' ? (
            <Loading_Android style={{width: 400, height: 400}} />
          ) : (
            <Loading_IOS style={{width: 150, height: 150}} />
          )}
        </View>
      )}
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
    fontSize: 20,
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
    fontFamily: 'KCCDodamdodam',
    paddingTop: 2,
  },
  worryQuantity: {
    color: '#FFFFFFB2',
    fontWeight: '400',
    fontSize: 8,
    lineHeight: 12,
    marginTop: 16,
  },
});
