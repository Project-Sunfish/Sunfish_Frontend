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

type DefaultCharacterProps = {
  setModal: React.Dispatch<React.SetStateAction<string>>;
  id: string;
  tutorial: boolean;
  focusedBoguId: string;
  setFocusedBoguId: React.Dispatch<React.SetStateAction<string>>;
};

export default function DefaultCharacter(props: DefaultCharacterProps) {
  const id = props.id;
  const focusedBoguId = props.focusedBoguId;
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

    const speed = 100; // 일정한 속도
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
        }, 2000);
      }
    });
  };

  const setNewDestination = (prevX: number) => {
    // const randomX = Math.floor(
    //   Math.random() * Dimensions.get('window').width - 80,
    // );
    const randomX = Math.floor(Math.random() * 80 - 40);
    const randomY = Math.floor(Math.random() * 300);
    const directionNow = prevX < randomX ? 'right' : 'left';
    setDirection(prevX < randomX ? 'right' : 'left');
    if (directionNow !== direction && !isPaused) {
      setIsChangingDirection(true);
      setTimeout(() => {
        setIsChangingDirection(false);
        setDestination({x: randomX, y: randomY});
      }, 200);
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
      style={[styles.character, {transform: position.getTranslateTransform()}]}>
      <Pressable
        onPress={() => {
          props.setModal('selectCategory');
          props.setFocusedBoguId(id);
        }}
        style={
          direction === 'right' ? styles.characterRight : styles.characterLeft
        }>
        {/* {isChangingDirection ? (
          <Image
            source={require('../assets/temp2.gif')}
            style={{width: 88, height: 88}}
          />
        ) : (
        )} */}
        {props.tutorial && (
          <Svg height="50" width="50">
            {direction === 'right' ? (
              <Circle cx="10" cy="10" r="10" fill="red" />
            ) : (
              <Circle cx="10" cy="10" r="10" fill="green" />
            )}
          </Svg>
        )}
        {direction === 'right' ? (
          <Image
            source={require('../assets/gifs/temp.gif')}
            style={{width: 88, height: 88}}
          />
        ) : (
          // <SvgXml xml={svgList.temp.defaultBogu} width={88} height={88} />
          <Image
            source={require('../assets/gifs/temp.gif')}
            style={{width: 88, height: 88}}
          />
        )}
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  character: {
    position: 'absolute',
  },
  characterRight: {
    // 오른쪽을 향하는 SVG 스타일
  },
  characterLeft: {
    // 왼쪽을 향하는 SVG 스타일
  },
});
