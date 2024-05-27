import {StyleSheet, View} from 'react-native';
import Text from './Text';

export default function Splash() {
  return (
    <View style={styles.entire}>
      <Text>Thisisspalsh</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  entire: {
    flex: 1,
    backgroundColor: '#6EA5FF',
  },
});
