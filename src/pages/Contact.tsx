import {ImageBackground, Pressable, StyleSheet, View} from 'react-native';
import Text from '../components/Text';
import {SvgXml} from 'react-native-svg';
import {svgList} from '../assets/svgList';
import {useNavigation} from '@react-navigation/native';
import Clipboard from '@react-native-clipboard/clipboard';

export default function Contact() {
  const navigation = useNavigation();
  const email = 'email.com';

  const copyToClipboard = () => {
    Clipboard.setString(email);
  };
  return (
    <ImageBackground
      source={require('../assets/pictures/Base.png')}
      style={{flex: 1}}>
      <View style={styles.entire}>
        <Pressable style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.backBtnTxt}>{'<'}</Text>
        </Pressable>
        <View style={styles.Content}>
          <View style={styles.titleView}>
            <Text style={styles.titleTxt}>문의하기</Text>
          </View>
          <Pressable
            style={styles.emailBtn}
            onPress={() => {
              copyToClipboard();
            }}>
            <Text style={styles.emailTxt}>{email}</Text>
            <SvgXml
              xml={svgList.mypage.copyIcon}
              width={21}
              height={18}
              style={{marginLeft: 5}}
            />
          </Pressable>
          <View style={styles.discriptionView}>
            <Text style={styles.discriptionTxt}>
              {'불편하거나 궁금하신 점, 피드백이 있다면 이메일로' +
                '\n' +
                '문의 부탁드립니다. 언제든 환영입니다'}
            </Text>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  entire: {
    flex: 1,
    backgroundColor: '#E5F2FFCC',
    paddingBottom: 66,
    paddingHorizontal: 33,
    position: 'relative',
  },
  backBtn: {
    position: 'absolute',
    padding: 10,
    top: 36,
    left: 12,
  },
  backBtnTxt: {
    fontSize: 20,
    color: '#6EA5FF',
    fontWeight: '400',
  },
  Content: {
    marginTop: 102,
  },
  titleView: {},
  titleTxt: {
    fontWeight: '400',
    fontSize: 22,
    color: '#002B5D',
  },
  emailBtn: {
    marginVertical: 24,
    paddingVertical: 6,
    width: '100%',
    borderRadius: 16,
    backgroundColor: '#6EA5FFE5',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  emailTxt: {
    fontSize: 11,
    fontWeight: '400',
    color: '#FFFFFF',
  },
  discriptionView: {
    backgroundColor: '#FFFFFF99',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 13,
    paddingHorizontal: 9,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    borderStyle: 'dashed',
    borderRadius: 12,
  },
  discriptionTxt: {
    fontSize: 12,
    fontWeight: '400',
    color: '#6EA5FF',
    textAlign: 'center',
  },
});
