import React from 'react';
import LottieView from 'lottie-react-native';

export default function Ex() {
  return (
    <LottieView
      source={require('../../assets/animations/ex.json')}
      autoPlay
      loop
      style={{width: 200, height: 200}}
    />
  );
}
