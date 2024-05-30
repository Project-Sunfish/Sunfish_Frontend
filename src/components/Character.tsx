import {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  Animated,
  Easing,
  Dimensions,
  Pressable,
  Vibration,
  Image,
  StyleSheet,
} from 'react-native';
import Svg, {Circle, SvgXml} from 'react-native-svg';
import {svgList} from '../assets/svgList';
import {category, info} from '../assets/info';

export type level = 1 | 2 | 3 | 4 | 5 | 6;
export type status = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
export type selectedCategory =
  | '학업'
  | '직장'
  | '가족'
  | '친구'
  | '연애'
  | '건강'
  | '사회문제'
  | '이유없음'
  | '기타';
export type variation = 1 | 2 | 3 | 4;

type CharacterProps = {
  setModal: React.Dispatch<React.SetStateAction<string>>;
  id: string;
  level: level;
  selectedCategory: selectedCategory;
  variation: variation;
  name: string;
  status: status;
  problem: string;
  focusedBoguId: string;
  setFocusedBoguId: React.Dispatch<React.SetStateAction<string>>;
  animationType: string;
};

export default function Character(props: CharacterProps) {
  const id = props.id;
  const focusedBoguId = props.focusedBoguId;
  const level = props.level;
  const selectedCategory = category[props.selectedCategory];
  const variation = props.variation;
  const name = props.name;
  const status = props.status;
  const problem = props.problem;
  const [position] = useState(new Animated.ValueXY({x: 0, y: 0}));
  const [prevX, setPrevX] = useState(0);
  const [direction, setDirection] = useState<'left' | 'right'>('right');
  const [isPaused, setIsPaused] = useState(false);
  const [isChangingDirection, setIsChangingDirection] = useState(false);
  const [destination, setDestination] = useState({x: 0, y: 0});
  const [shouldMove, setShouldMove] = useState(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const moveCharacter = (toX: number, toY: number) => {
    const currentPos = position;
    setPrevX(toX);
    const distance = Math.sqrt(
      Math.pow(toX - currentPos.x._value, 2) +
        Math.pow(toY - currentPos.y._value, 2),
    );

    const speed = info.level.speed[level]; // 일정한 속도
    const duration = (distance / speed) * 1000; // ms 단위로 변환

    setDirection(toX > currentPos.x._value ? 'right' : 'left');

    Animated.timing(position, {
      toValue: {x: toX, y: toY},
      duration: duration,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start(() => {
      if (!isPaused) {
        timerRef.current = setTimeout(() => {
          setNewDestination(toX);
        }, info.level.stopTime[level]);
      }
    });
  };

  const setNewDestination = (prevX: number) => {
    // const randomX = Math.floor(
    //   Math.random() * Dimensions.get('window').width - 80,
    // );
    // set randomX randomly from -160 to 160
    const randomX = Math.floor(
      Math.random() * info.status.size[status] * 2 - info.status.size[status],
    );
    const randomY = Math.floor(Math.random() * 300);
    const directionNow = prevX < randomX ? 'right' : 'left';
    setDirection(prevX < randomX ? 'right' : 'left');
    if (directionNow !== direction && !isPaused) {
      setIsChangingDirection(true);
      setTimeout(() => {
        setIsChangingDirection(false);
        setDestination({x: randomX, y: randomY});
      }, 0);
    } else {
      setDestination({x: randomX, y: randomY});
    }
  };

  useEffect(() => {
    if (shouldMove && !isPaused) {
      moveCharacter(destination.x, destination.y);
    }
  }, [destination, shouldMove, isPaused]);

  useEffect(() => {
    // -1이었다가 자기가 된 경우에 실행 필요
    if (id === focusedBoguId) {
      // 특정 행동을 수행
      if (timerRef.current) clearTimeout(timerRef.current);
      setIsPaused(true);
      console.log('paused');
      // 예: 크기 변경, 가운데로 이동 등
    } else if (isPaused) {
      // 자기였다가 -1이 된 경우 실행 필요 (isPaused가 true일 것임)
      setIsPaused(false);
      setNewDestination(prevX); // isPaused가 false로 변경되면 새로운 목적지 설정
    }
  }, [focusedBoguId]);

  return (
    <Animated.View
      style={[
        styles.character,
        {transform: position.getTranslateTransform()},
        {
          width: info.status.touchSize[status],
          height: info.status.touchSize[status],
        },
      ]}>
      <Pressable
        onPress={() => {
          if (props.animationType === 'popping') return;
          props.setFocusedBoguId(id);
          props.setModal('pop');
        }}
        style={
          direction === 'right' ? styles.characterRight : styles.characterLeft
        }>
        {/* {isChangingDirection ? (
          <Image
            source={require('../assets/high_turn.gif')}
            style={{width: 360, height: 360}}
          />
        ) :  */}
        {props.animationType === 'popping' && focusedBoguId === id ? (
          <Image
            source={require('../assets/gifs/popping.gif')}
            style={{
              width: info.status.size[status],
              height: info.status.size[status],
            }}
          />
        ) : props.animationType === 'popEnd' && focusedBoguId === id ? (
          <></>
        ) : direction == 'right' ? (
          <Image
            source={require('../assets/gifs/high_right.gif')}
            style={{
              width: info.status.size[status],
              height: info.status.size[status],
            }}
          />
        ) : (
          // <SvgXml xml={svgList.temp.defaultBogu} width={88} height={88} />
          <Image
            source={require('../assets/gifs/high_left.gif')}
            style={{
              width: info.status.size[status],
              height: info.status.size[status],
            }}
          />
        )}
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  character: {
    position: 'absolute',
    borderRadius: 2000,
    justifyContent: 'center',
    alignItems: 'center',

    // backgroundColor: 'red',
  },
  characterRight: {
    // 오른쪽을 향하는 SVG 스타일
  },
  characterLeft: {
    // 왼쪽을 향하는 SVG 스타일
  },
});
