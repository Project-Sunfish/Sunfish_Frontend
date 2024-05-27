import React from 'react';
import LottieView from 'lottie-react-native';
import {StyleProp, ViewStyle} from 'react-native';
type EvolutionProps = {
  style?: StyleProp<ViewStyle>;
};
export default function Evolution(props: EvolutionProps) {
  return (
    <LottieView
      source={require('../../assets/animations/evolution.json')}
      autoPlay
      loop
      style={[{width: 200, height: 200}, props.style]}
    />
  );
}
