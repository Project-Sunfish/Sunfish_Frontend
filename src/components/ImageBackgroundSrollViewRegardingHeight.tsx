import {
  Dimensions,
  ImageBackground,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

export default function ImageBackGroundSrollViewRegardingHeight(props: {
  children: React.ReactNode;
  criteriaWindowHeight: number;
  smallerScreenPaddingTop: number;
  smallerScreenPaddingBottom: number;
  smallerScreenMarginBottom: number;
  largerScreenPaddingTop: number;
  largerScreenPaddingBottom: number;
  largerScreenMarginBottom: number;
}) {
  const windowHeight = Dimensions.get('window').height;
  return (
    <ImageBackground
      source={require('../assets/pictures/Base.png')}
      style={{flex: 1}}>
      {windowHeight <= props.criteriaWindowHeight ? (
        <View
          style={[
            styles.entire,
            {
              paddingTop: props.smallerScreenPaddingTop,
              paddingBottom: props.smallerScreenPaddingBottom,
            },
          ]}>
          <ScrollView>
            {props.children}

            <View
              style={{
                height: props.smallerScreenMarginBottom,
              }}
            />
          </ScrollView>
        </View>
      ) : (
        <View
          style={[
            styles.entire,
            {
              paddingTop: props.largerScreenPaddingTop,
              paddingBottom: props.largerScreenPaddingBottom,
            },
          ]}>
          <ScrollView>
            {props.children}
            <View
              style={{
                height: props.largerScreenMarginBottom,
              }}
            />
          </ScrollView>
        </View>
      )}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  entire: {
    flex: 1,
    backgroundColor: '#E5F2FFCC',
    paddingHorizontal: 22,
    justifyContent: 'center',
  },
});
