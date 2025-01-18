import {
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import Text from '../components/Text';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useCallback, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {BarChart, LineChart} from 'react-native-gifted-charts';
import {Circle, Polyline, Svg} from 'react-native-svg';
export default function DashBoard() {
  const navigation = useNavigation();

  // generate random int score from 50 to 100 on every focus
  const [score, setScore] = useState(100);
  useFocusEffect(
    useCallback(() => {
      setScore(Math.floor(Math.random() * 51) + 50);
    }, []),
  );

  const [width, setWidth] = useState(0);

  return (
    <ImageBackground
      source={require('../assets/pictures/Base.webp')}
      style={{flex: 1}}>
      <ScrollView style={styles.entire}>
        <Pressable style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.backBtnTxt}>{'<'}</Text>
        </Pressable>
        <View style={styles.Content}>
          <View style={styles.titleView}>
            <Text style={styles.titleTxt}>대시보드</Text>
          </View>
          <View style={styles.tabView}>
            <View style={[styles.tabBtn, {backgroundColor: '#6EA5FFE5'}]}>
              <Text style={[styles.tabBtnTxt, {color: '#FFFFFF'}]}>
                오늘의 점수
              </Text>
            </View>
          </View>
          <View style={styles.dashBG}>
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 0, y: 1}}
              colors={['#FFFFFF', '#FFFFFF99']}
              style={styles.dashBGGradient}>
              <View
                style={[
                  styles.pointCircle,
                  {
                    top: 14,
                    left: 19,
                  },
                ]}
              />
              <View
                style={[
                  styles.pointCircle,
                  {
                    top: 14,
                    right: 19,
                  },
                ]}
              />
              <View
                style={[
                  styles.pointCircle,
                  {
                    bottom: 14,
                    left: 19,
                  },
                ]}
              />
              <View
                style={[
                  styles.pointCircle,
                  {
                    bottom: 14,
                    right: 19,
                  },
                ]}
              />
              <Text style={{fontSize: 80, color: '#6EA5FF'}}>{score}</Text>
              <View style={{width: 20}} />
              <Text style={{fontSize: 50, color: '#6EA5FF', paddingTop: 30}}>
                점
              </Text>
            </LinearGradient>
          </View>
          <View style={[styles.tabView, {marginTop: 0}]}>
            <View style={[styles.tabBtn, {backgroundColor: '#6EA5FFE5'}]}>
              <Text style={[styles.tabBtnTxt, {color: '#FFFFFF'}]}>
                성과도 추이
              </Text>
            </View>
          </View>
          <View style={[styles.dashBG, {height: 230}]}>
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 0, y: 1}}
              colors={['#FFFFFF', '#FFFFFF99']}
              style={[
                styles.dashBGGradient,
                {paddingVertical: 8, paddingHorizontal: 38},
              ]}>
              <View
                style={{
                  width: '100%',
                  height: '100%',
                  flexDirection: 'row',
                  alignItems: 'flex-end',
                  justifyContent: 'space-between',
                }}
                onLayout={event => {
                  setWidth(event.nativeEvent.layout.width);
                }}>
                <GradientGraph score={35} date={'1/18'} />
                <GradientGraph score={60} date={'1/19'} />
                <GradientGraph score={45} date={'1/20'} />
                <GradientGraph score={score} date={'1/21'} today />
              </View>
              <Svg
                height={230}
                width={width}
                style={{position: 'absolute', top: 8 + 10}}>
                <Polyline
                  points={`${getX(0, width)},${getY(35)} ${getX(
                    1,
                    width,
                  )},${getY(60)} ${getX(2, width)},${getY(45)} ${getX(
                    3,
                    width,
                  )},${getY(score)}`}
                  fill="none"
                  stroke="#6EA5FF"
                  strokeWidth="1"
                  strokeDasharray={[5, 3]}
                />
                <Circle
                  cx={getX(0, width)}
                  cy={getY(35)}
                  r="4"
                  fill="#6EA5FF"
                />
                <Circle
                  cx={getX(1, width)}
                  cy={getY(60)}
                  r="4"
                  fill="#6EA5FF"
                />
                <Circle
                  cx={getX(2, width)}
                  cy={getY(45)}
                  r="4"
                  fill="#6EA5FF"
                />
                <Circle
                  cx={getX(3, width)}
                  cy={getY(score)}
                  r="4"
                  fill="black"
                />
              </Svg>
            </LinearGradient>
          </View>
        </View>
        <View style={{height: 110}} />
      </ScrollView>
    </ImageBackground>
  );
}

const getX = (index: number, width: number) => {
  const gap = (width - 160) / 3;
  return 20 + gap * index + 40 * index;
};

const getY = (score: number) => {
  return 184 - score * 1.5 - 11;
};

const GradientGraph = (props: {
  score: number;
  date: string;
  today?: boolean;
}) => {
  return (
    <View style={{width: 40, alignItems: 'center'}}>
      <Text style={[styles.graphText, props.today && {color: 'black'}]}>
        {props.score}
      </Text>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 0, y: 1}}
        colors={['#6EA5FF', '#CCEDFF']}
        style={{
          width: 40,
          height: props.score > 95 ? 95 * 1.5 : props.score * 1.5,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          marginTop: props.score > 95 ? 5 * 1.5 + 22 : 22,
          marginBottom: 2,
        }}
      />
      <Text style={[styles.graphText, props.today && {color: 'black'}]}>
        {props.date}
      </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  entire: {
    flex: 1,
    backgroundColor: '#E5F2FFCC',
    paddingHorizontal: 33,
    position: 'relative',
    paddingBottom: 200,
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
    marginTop: 26,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tabBtn: {
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabBtnTxt: {
    fontSize: 16,
    fontWeight: '400',
  },
  dashBG: {
    width: '100%',
    height: 150,
    marginVertical: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dashBGGradient: {
    borderRadius: 15,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  pointCircle: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: '#6EA5FF',
    borderRadius: 6,
    width: 6,
    height: 6,
  },
  graphText: {
    color: '#6EA5FF',
    fontSize: 12,
    fontWeight: '400',
    textAlign: 'center',
    letterSpacing: 1.2,
  },
});
