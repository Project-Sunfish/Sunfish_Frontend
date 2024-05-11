import {Pressable, StyleSheet, Vibration, View} from 'react-native';
import {Ex} from '../components/animations';
import Text from '../components/Text';

export default function Book() {
  return (
    <View style={{flex: 1}}>
      <Pressable onPress={() => Vibration.vibrate(100)}>
        <Text>Haptic</Text>
      </Pressable>
      <Text>Book</Text>
      <Ex />
    </View>
  );
}

const styles = StyleSheet.create({});
