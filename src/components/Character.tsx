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
} from 'react-native';
import Svg, {Circle} from 'react-native-svg';

type CharacterProps = {
  setModal: React.Dispatch<React.SetStateAction<string>>;
  id: number;
  level: number;
  selectedCategory: string;
  variation: number;
  name: string;
  status: number;
  problem: string;
  setFocusedBoguId: React.Dispatch<React.SetStateAction<number>>;
};

export default function Character(props: CharacterProps) {
  const [direction, setDirection] = useState('right');
  let prev = 0;
  const position = useRef(new Animated.ValueXY()).current;

  useEffect(() => {
    const moveCharacter = () => {
      // set randomX to a random number between -100 to Dimesions.get('window').width - 150]
      const randomX =
        Math.floor(Math.random() * (Dimensions.get('window').width - 50)) - 100;
      const randomY = Math.floor(Math.random() * 300);
      prev = randomX;

      const distance = Math.sqrt(
        Math.pow(randomX - position.x._value, 2) +
          Math.pow(randomY - position.y._value, 2),
      );

      const speed = 100;
      const duration = (distance / speed) * 1000;
      const stopTime = 3000;

      Animated.timing(position, {
        toValue: {x: randomX, y: randomY},
        duration: duration,
        easing: Easing.ease,
        useNativeDriver: false,
      }).start(() => {
        setTimeout(() => {
          moveCharacter();
        }, stopTime);
        // moveCharacter();
      });
    };

    moveCharacter();

    position.addListener(({x}) => {
      if (x < prev) {
        setDirection('right');
      }
      if (x > prev) {
        setDirection('left');
      }
    });

    return () => {
      position.removeAllListeners();
    };
  }, []);

  return (
    <Animated.View
      style={{
        position: 'absolute',
        transform: [{translateX: position.x}, {translateY: position.y}],
      }}>
      <Pressable
        onPress={() => {
          props.setFocusedBoguId(props.id);
          props.setModal('pop');
        }}>
        <Image
          source={require('../assets/temp.gif')}
          style={{width: 200, height: 200}}
        />
      </Pressable>
    </Animated.View>
  );
}
