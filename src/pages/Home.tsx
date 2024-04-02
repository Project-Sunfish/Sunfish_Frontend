import {FlatList, Pressable, StyleSheet, Text, View} from 'react-native';
import {useAppDispatch} from '../store';
import Character from '../components/Character';
import {useState} from 'react';

export default function Home() {
  const [cnt, setCnt] = useState(0);

  return (
    <View style={styles.entire}>
      <View style={styles.gameContainer}>
        {[...Array(cnt)].map((_, index) => (
          <Character key={index} />
        ))}
      </View>
      <Pressable
        style={({pressed}) => [
          styles.btn,
          {backgroundColor: pressed ? 'red' : 'blue'},
        ]}
        onPress={() => {
          setCnt(cnt + 1);
        }}>
        <Text style={{color: 'white'}}>Count: {cnt}</Text>
      </Pressable>
      <Pressable
        style={({pressed}) => [
          styles.btn,
          {backgroundColor: pressed ? 'gray' : 'black'},
        ]}
        onPress={() => {
          setCnt(0);
        }}>
        <Text style={{color: 'white'}}>reset</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  entire: {
    flex: 1,
  },
  gameContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  btn: {
    padding: 20,
    alignItems: 'center',
  },
});
