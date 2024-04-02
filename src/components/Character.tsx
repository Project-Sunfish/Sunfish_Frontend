import {useEffect, useRef, useState} from 'react';
import {View, Text, Animated, Easing, Dimensions} from 'react-native';
import Svg, {Circle} from 'react-native-svg';

export default function Character() {
  const [direction, setDirection] = useState('right');
  let prev = 0;
  const position = useRef(new Animated.ValueXY()).current;

  useEffect(() => {
    const moveCharacter = () => {
      const randomX = Math.floor(
        Math.random() * Dimensions.get('window').width - 20,
      );
      const randomY = Math.floor(Math.random() * 300);
      prev = randomX;

      Animated.timing(position, {
        toValue: {x: randomX, y: randomY},
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: false,
      }).start(() => {
        moveCharacter();
      });
    };

    moveCharacter();

    position.addListener(({x}) => {
      if (x < prev) {
        setDirection('right');
      } else if (x > prev) {
        setDirection('left');
      } else {
      }
    });

    return () => {
      position.removeAllListeners();
    };
  }, []);

  return (
    <Animated.View
      style={{
        transform: [{translateX: position.x}, {translateY: position.y}],
      }}>
      <Svg height="50" width="50">
        {direction === 'right' ? (
          <Circle cx="10" cy="10" r="10" fill="red" />
        ) : (
          <Circle cx="10" cy="10" r="10" fill="green" />
        )}
      </Svg>
    </Animated.View>
  );
}
