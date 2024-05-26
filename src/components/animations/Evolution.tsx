import React from 'react';
import LottieView from 'lottie-react-native';

export default function Evolution() {
  return (
    <LottieView
      source={require('../../assets/animations/evolution.json')}
      autoPlay
      loop
      style={{width: 200, height: 200}}
    />
  );
}
