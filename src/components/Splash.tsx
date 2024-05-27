import {StyleSheet, View} from 'react-native';
import Text from './Text';
import {Loading} from './animations';

export default function Splash() {
  return (
    <View style={styles.entire}>
      <Loading style={{width: 250, height: 250}} />
      <View style={{backgroundColor: 'pink', height: 40}}>
        <Text>복어가 생성되고 있어요!</Text>
      </View>
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
});
