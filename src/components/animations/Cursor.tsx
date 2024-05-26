import React from 'react';
import LottieView from 'lottie-react-native';

export default function Cursor() {
  return (
    <LottieView
      source={require('../../assets/animations/cursor.json')}
      autoPlay
      loop
      style={{width: 200, height: 200}}
    />
  );
}
