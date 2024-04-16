import {Pressable, StyleSheet, Text, Vibration, View} from 'react-native';
import {Ex} from '../components/animations';

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
