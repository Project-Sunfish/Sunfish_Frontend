import {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  Animated,
  Easing,
  Dimensions,
  Pressable,
  Vibration,
} from 'react-native';
import Svg, {Circle} from 'react-native-svg';

export default function Character() {
  const [direction, setDirection] = useState('right');
  let prev = 0;
  const position = useRef(new Animated.ValueXY()).current;

  useEffect(() => {
    const moveCharacter = () => {
      const randomX =
        Math.floor(Math.random() * Dimensions.get('window').width - 20) + 10;
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
      <Pressable onPress={() => Vibration.vibrate(200)}>
        <Svg height="50" width="50">
          {direction === 'right' ? (
            <Circle cx="10" cy="10" r="10" fill="red" />
          ) : (
            <Circle cx="10" cy="10" r="10" fill="green" />
          )}
        </Svg>
      </Pressable>
    </Animated.View>
  );
}
