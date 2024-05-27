import React from 'react';
import LottieView from 'lottie-react-native';
import {StyleProp, ViewStyle} from 'react-native';

type FocusHandProps = {
  style?: StyleProp<ViewStyle>;
};

export default function FocusHand(props: FocusHandProps) {
  return (
    <LottieView
      source={require('../../assets/animations/FocusHand.json')}
      autoPlay
      loop
      style={[{width: 200, height: 200}, props.style]}
      // style={{width: 200, height: 200}}
    />
  );
}
