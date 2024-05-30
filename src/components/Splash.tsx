import {Image, StyleSheet, View} from 'react-native';
import Text from './Text';
import {BarPercent, Loading} from './animations';

export default function Splash() {
  return (
    <View style={styles.entire}>
      <Loading style={styles.loading} />
      <View style={styles.container}>
        <Text style={styles.text}>복어가 생성되고 있어요!</Text>
        <BarPercent style={styles.barPercent} />
        <Image
          source={require('../assets/gifs/number.gif')}
          style={styles.image}
        />
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
  loading: {
    width: 250,
    height: 250,
  },
  container: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 13,
    color: 'white',
    fontWeight: '400',
  },
  barPercent: {
    position: 'absolute',
    top: -55,
    width: 280,
  },
  image: {
    width: 31,
    height: 16,
    marginTop: 30,
  },
});
