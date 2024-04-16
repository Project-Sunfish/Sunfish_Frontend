import {StyleSheet, Text, View} from 'react-native';
import {Ex} from '../components/animations';

export default function Book() {
  return (
    <View style={{flex: 1}}>
      <Text>Book</Text>
      <Ex />
    </View>
  );
}

const styles = StyleSheet.create({});
