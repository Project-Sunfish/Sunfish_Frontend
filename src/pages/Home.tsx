import {
  FlatList,
  ImageBackground,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import Text from '../components/Text';
import Character from '../components/Character';
import {useState} from 'react';
import MyPageModal from '../components/MyPageModal';
import {SvgXml} from 'react-native-svg';
import {svgList} from '../assets/svgList';

export default function Home() {
  const [cnt, setCnt] = useState(0);
  const [newBogus, setNewBogus] = useState(false);
  const [modal, setModal] = useState('no');
  return (
    <ImageBackground
      source={require('../assets/pictures/Base.png')}
      style={{flex: 1}}>
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
        <Pressable
          onPress={() => {
            if (newBogus) {
              setModal('selectCategory');
            } else {
              setModal('cannotCreate');
            }
          }}
          style={[
            styles.newBogu,
            newBogus
              ? {backgroundColor: '#FFFFFF'}
              : {backgroundColor: '#FFFFFF40'},
          ]}>
          <Text
            style={[
              styles.newBoguText,
              newBogus ? {color: '#6EA5FF'} : {color: '#FFFFFF'},
            ]}>
            생성하기
          </Text>
        </Pressable>
      </View>
      <MyPageModal
        showModal={modal}
        setShowModal={setModal}
        condition="cannotCreate"
        headerTxt="하루 최대 생성 횟수를 초과했습니다 !!">
        <SvgXml xml={svgList.termModal.separator} style={{marginTop: 8}} />
        <View style={styles.cannotCreateContent}>
          <Text style={styles.cannotCreateContentTxt}>
            생성 횟수를 무한으로 늘려보세요.
          </Text>
          <Text style={styles.cannotCreateContentTxtLink}>
            멤버십 구독하러 가기
          </Text>
        </View>
        <SvgXml xml={svgList.termModal.separator} style={{marginBottom: 15}} />
        <Pressable style={styles.cannotCreateBtn}>
          <Text style={styles.cannotCreateBtnTxt}>닫기</Text>
        </Pressable>
      </MyPageModal>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  entire: {
    flex: 1,
    paddingBottom: 66,
    position: 'relative',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  //temp from here
  gameContainer: {
    backgroundColor: 'white',
    width: 400,
    height: 400,
  },
  btn: {
    padding: 20,
    alignItems: 'center',
  },
  //temp to here
  newBogu: {
    // position: 'absolute',
    // bottom: 150,
    marginBottom: 90,
    paddingHorizontal: 26,
    paddingVertical: 4,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 48,
  },
  newBoguText: {
    fontSize: 20,
    fontWeight: '400',
  },
  cannotCreateContent: {
    paddingVertical: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cannotCreateContentTxt: {
    color: '#002B5D',
    fontSize: 11,
    fontWeight: '400',
  },
  cannotCreateContentTxtLink: {
    color: '#6EA5FF',
    fontSize: 11,
    fontWeight: '400',
    textDecorationLine: 'underline',
  },
  cannotCreateBtn: {
    backgroundColor: '#4F85C54D',
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 84,
  },
  cannotCreateBtnTxt: {
    color: '#002B5D',
    fontSize: 13,
    fontWeight: '400',
  },
});
