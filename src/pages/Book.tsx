import {
  Dimensions,
  FlatList,
  ImageBackground,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import Text from '../components/Text';
import {BookStackParamList, typeID} from '../navigations/BookNav';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useFocusEffect} from '@react-navigation/native';
import {useCallback, useState} from 'react';
import {SvgXml} from 'react-native-svg';
import {svgList} from '../assets/svgList';
import axios from 'axios';
import Config from 'react-native-config';
import {BOGU_TYPE} from '../assets/info';

type BookScreenNavigationProp = NativeStackNavigationProp<
  BookStackParamList,
  'Book'
>;
type BookProps = {
  navigation: BookScreenNavigationProp;
};

type itemProps = {
  typeId: typeID;
  name: string;
  newFlag: boolean;
  liberatedFlag: boolean;
};

export default function Book(props: BookProps) {
  const itemSize = (Dimensions.get('window').width - 100) / 2;
  const [openData, setOpenData] = useState<itemProps[]>([
    {newFlag: false, typeId: '-1', name: '', liberatedFlag: false},
    {newFlag: false, typeId: '-1', name: '', liberatedFlag: false},
    {newFlag: false, typeId: '-1', name: '', liberatedFlag: false},
    {newFlag: false, typeId: '-1', name: '', liberatedFlag: false},
    {newFlag: false, typeId: '-1', name: '', liberatedFlag: false},
    {newFlag: false, typeId: '-1', name: '', liberatedFlag: false},
    {newFlag: false, typeId: '-1', name: '', liberatedFlag: false},
    {newFlag: false, typeId: '-1', name: '', liberatedFlag: false},
  ]);

  useFocusEffect(
    useCallback(() => {
      getData();
    }, []),
  );

  const getData = async () => {
    try {
      const response = await axios.get(`${Config.API_URL}/api/collection`);
      let data: itemProps[] = [];
      for (let i = 0; i < BOGU_TYPE; i++) {
        data.push({
          newFlag: false,
          typeId: '-1',
          name: '',
          liberatedFlag: false,
        });
      }
      for (let i = 0; i < response.data.collectedBogus.length; i++) {
        data[response.data.collectedBogus[i].typeId] =
          response.data.collectedBogus[i];
      }
      setOpenData(data);
      console.log(response.data.collectedBogus);
    } catch (error: any) {
      const errorResponse = error.response;
      console.log('cannot get evolved bogu info', errorResponse);
    }
  };
  return (
    <ImageBackground
      source={require('../assets/pictures/Base.png')}
      style={{flex: 1}}>
      <View style={styles.entire}>
        <View style={styles.header}>
          <SvgXml xml={svgList.tabbar.book} />
          <Text style={styles.headerText}>복어 도감</Text>
        </View>
        <FlatList
          data={openData}
          ListFooterComponent={<View style={{height: 100}} />}
          renderItem={({item, index}) => (
            <View style={{maxHeight: 170, maxWidth: 170}}>
              <Pressable
                style={[
                  styles.item,
                  {
                    width: itemSize,
                    height: itemSize,
                    maxHeight: 150,
                    maxWidth: 150,
                  },
                  item.typeId != '-1' ? styles.itemKnown : styles.itemUnknown,
                ]}
                onPress={() => {
                  if (item.typeId !== '-1')
                    props.navigation.navigate('BookDetail', {
                      id: item.typeId,
                      liberated: item.liberatedFlag,
                    });
                }}>
                {item.typeId !== '-1' &&
                  (item.liberatedFlag ? (
                    <SvgXml
                      xml={svgList.bogus.liberated[item.typeId]}
                      width={itemSize > 150 ? 130 : itemSize - 20}
                      height={itemSize > 150 ? 130 : itemSize - 20}
                      style={[
                        {marginBottom: 10},
                        item.typeId == 9 && {opacity: 0.5},
                      ]}
                    />
                  ) : (
                    <SvgXml
                      xml={svgList.bogus[item.typeId]}
                      width={itemSize > 150 ? 130 : itemSize - 20}
                      height={itemSize > 150 ? 130 : itemSize - 20}
                      style={[
                        {marginBottom: 10},
                        item.typeId == 9 && {opacity: 0.5},
                      ]}
                    />
                  ))}
                {item.typeId !== '-1' && (
                  <View style={styles.itemKnownNameView}>
                    <Text style={styles.itemKnownText}>{item.name}</Text>
                    {item.newFlag && <Text style={styles.itemNew}>!!</Text>}
                  </View>
                )}
                {item.typeId === '-1' && (
                  <Text style={styles.itemUnknownText}>?</Text>
                )}
              </Pressable>
            </View>
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
    justifyContent: 'center',
    alignItems: 'center',
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
    // flex: 1,
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
  },
  itemUnknown: {
    backgroundColor: '#FFFFFF33',
    borderColor: '#AEAEAE',
  },
  itemKnownNameView: {
    position: 'absolute',
    bottom: -5,
    paddingHorizontal: 15,
    paddingVertical: 4,
    backgroundColor: '#6EA5FF',
    borderRadius: 32,
    marginBottom: 10,
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
