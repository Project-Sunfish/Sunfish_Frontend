import {
  Dimensions,
  FlatList,
  ImageBackground,
  Pressable,
  StyleSheet,
  Vibration,
  View,
} from 'react-native';
import {Ex} from '../components/animations';
import Text from '../components/Text';
import {BookStackParamList} from '../navigations/BookNav';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useAppDispatch} from '../store';
import userSlice from '../slices/user';
import {useFocusEffect} from '@react-navigation/native';
import {useCallback, useState} from 'react';
import {SvgXml} from 'react-native-svg';
import {svgList} from '../assets/svgList';

type BookScreenNavigationProp = NativeStackNavigationProp<
  BookStackParamList,
  'Book'
>;
type BookProps = {
  navigation: BookScreenNavigationProp;
};

export default function Book(props: BookProps) {
  const itemSize = (Dimensions.get('window').width - 100) / 2;
  const [openData, setOpenData] = useState([{id: 2, name: '김복어사원'}]);
  let data = [];
  for (let i = 0; i < 10; i++) {
    data.push({id: -1, name: ''});
  }
  for (let i = 0; i < openData.length; i++) {
    data[openData[i].id] = openData[i];
  }
  return (
    // <View style={{flex: 1}}>
    //   <Pressable onPress={() => Vibration.vibrate(100)}>
    //     <Text>Haptic</Text>
    //   </Pressable>
    //   <Text>Book</Text>
    //   <Ex />
    //   <Pressable
    //     onPress={() => {
    //       props.navigation.navigate('BookDetail');
    //     }}>
    //     <Text>go</Text>
    //   </Pressable>
    // </View>
    <ImageBackground
      source={require('../assets/pictures/Base.png')}
      style={{flex: 1}}>
      <View style={styles.entire}>
        <View style={styles.header}>
          <SvgXml xml={svgList.tabbar.book} />
          <Text style={styles.headerText}>복어 도감</Text>
        </View>
        <FlatList
          data={data}
          ListFooterComponent={<View style={{height: 100}} />}
          renderItem={({item, index}) => (
            <Pressable
              style={[
                styles.item,
                {width: itemSize, height: itemSize},
                item.id != -1 ? styles.itemKnown : styles.itemUnknown,
              ]}
              onPress={() => {
                if (item.id !== -1)
                  props.navigation.navigate('BookDetail', {id: index});
              }}>
              {item.id !== -1 && (
                <SvgXml
                  xml={svgList.enterInfo.sunfish}
                  width={itemSize - 30}
                  height={itemSize - 30}
                />
              )}
              {item.id !== -1 && (
                <View style={styles.itemKnownNameView}>
                  <Text style={styles.itemKnownText}>{item.name}</Text>
                  <Text style={styles.itemNew}>!!</Text>
                </View>
              )}
              {item.id === -1 && <Text style={styles.itemUnknownText}>?</Text>}
            </Pressable>
          )}
          keyExtractor={(item, index) => index.toString()}
          numColumns={2}
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  entire: {
    flex: 1,
    backgroundColor: '#00000080',
    paddingHorizontal: 34,
    position: 'relative',
  },
  header: {
    alignItems: 'center',
    paddingVertical: 20,
    marginBottom: 10,
    marginTop: 30,
  },
  headerText: {
    fontSize: 32,
    fontWeight: '400',
    color: '#FFFFFF',
  },
  item: {
    margin: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 14,
    borderWidth: 2,
    position: 'relative',
  },
  itemKnown: {
    backgroundColor: '#FFFFFF',
    borderColor: '#DEEAFF',
    paddingVertical: 4,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  itemUnknown: {
    backgroundColor: '#FFFFFF33',
    borderColor: '#AEAEAE',
  },
  itemKnownNameView: {
    paddingHorizontal: 15,
    paddingVertical: 4,
    backgroundColor: '#6EA5FF',
    borderRadius: 32,
  },
  itemKnownText: {
    fontSize: 12,
    fontWeight: '400',
    color: '#FFFFFF',
  },
  itemUnknownText: {
    fontSize: 40,
    fontWeight: '400',
    color: '#B8B8B8',
  },
  itemNew: {
    color: '#FFD789',
    fontSize: 14,
    fontWeight: '400',
    position: 'absolute',
    right: 5,
    top: -10,
  },
});
