import React from 'react';
import LottieView from 'lottie-react-native';
import {StyleProp, ViewStyle} from 'react-native';
type LoadingProps = {
  style?: StyleProp<ViewStyle>;
};
export default function Loading_Android(props: LoadingProps) {
  return (
    <LottieView
      source={require('../../assets/animations/loading_android.json')}
      autoPlay
      loop
      style={[{width: 200, height: 200}, props.style]}
    />
  );
}
