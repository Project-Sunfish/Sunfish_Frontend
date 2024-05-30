import React from 'react';
import LottieView from 'lottie-react-native';
import {StyleProp, ViewStyle} from 'react-native';
type BarPercentProps = {
  style?: StyleProp<ViewStyle>;
};
export default function BarPercent(props: BarPercentProps) {
  return (
    <LottieView
      source={require('../../assets/animations/bar_percent.json')}
      autoPlay
      loop={false}
      style={[{width: 200, height: 200}, props.style]}
    />
  );
}
