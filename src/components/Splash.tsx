import {Animated, Easing, StyleSheet, View} from 'react-native';
import Text from './Text';
import {BarPercent, Loading} from './animations';
import {useEffect, useRef, useState} from 'react';

export default function Splash() {
  const [ready, setReady] = useState(false);
  const [displayedValue, setDisplayedValue] = useState(10);
  const percent = useRef(new Animated.Value(10)).current;
  useEffect(() => {
    Animated.timing(percent, {
      toValue: 100,
      duration: 2000,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start();

    percent.addListener(({value}) => {
      setDisplayedValue(Math.floor(value));
    });

    return () => {
      percent.removeAllListeners();
    };
  }, [percent]);

  return (
    <View style={styles.entire}>
      <Loading style={styles.loading} />
      <Animated.View style={styles.container}>
        <Text style={styles.text}>복어가 생성되고 있어요!</Text>
        <BarPercent style={styles.barPercent} />
        {/* <Video
          source={{uri: require('../assets/gifs/percent.mp4')}}
          style={[styles.image, {opacity: ready ? 1 : 0}]}
          paused={false} // 재생/중지 여부
          resizeMode={'cover'} // 프레임이 비디오 크기와 일치하지 않을 때 비디오 크기를 조정하는 방법을 결정합니다. cover : 비디오의 크기를 유지하면서 최대한 맞게
          onLoad={() => setReady(true)} // 미디어가 로드되고 재생할 준비가 되면 호출되는 콜백 함수입니다.
          repeat={false} // video가 끝나면 다시 재생할 지 여부
        /> */}
        <Text
          style={[
            styles.text,
            {marginTop: 30, fontSize: 11},
          ]}>{`${displayedValue}%`}</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  entire: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#6EA5FF',
    paddingBottom: 150,
  },
  loading: {
    width: 210,
    height: 210,
  },
  container: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 13,
    color: 'white',
    fontWeight: '400',
  },
  barPercent: {
    position: 'absolute',
    top: -55,
    width: 280,
  },
  image: {
    width: 31,
    height: 16,
    marginTop: 30,
    backgroundColor: '#6EA5FF',
  },
});
