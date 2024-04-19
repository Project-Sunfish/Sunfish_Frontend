import React, {useEffect, useRef, useState} from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import Modal from 'react-native-modal';
import {SvgXml} from 'react-native-svg';
import {svgList} from '../assets/svgList';
import {useNavigation} from '@react-navigation/native';

type TermModalProps = {
  showModal: string;
  setShowModal: React.Dispatch<React.SetStateAction<string>>;
};

export default function TermModal(props: TermModalProps) {
  const showModal = props.showModal;
  const setshowModal = props.setShowModal;
  const navigation = useNavigation();

  const [usingTerm, setUsingTerm] = useState(false);
  const [personalTerm, setPersonalTerm] = useState(false);
  const [adTerm, setAdTerm] = useState(false);
  const [allTerm, setAllTerm] = useState(false);
  return (
    <Modal
      style={styles.entire}
      isVisible={showModal == 'show'}
      hasBackdrop={true}
      onBackdropPress={() => setshowModal('no')}
      onBackButtonPress={() => setshowModal('no')}>
      <Pressable
        style={styles.modalBGView}
        onPress={() => {
          setshowModal('no');
        }}>
        <Pressable style={styles.modalView} onPress={e => e.stopPropagation()}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalHeaderTxt}>이용약관</Text>
            </View>
            <View style={styles.modalBody}>
              <SvgXml
                xml={svgList.termModal.separator}
                style={styles.separator}
              />
              <Pressable
                style={styles.eachTerm}
                onPress={() => {
                  setAllTerm(!usingTerm);
                  setUsingTerm(!usingTerm);
                }}>
                <View style={styles.eachTermContent}>
                  {usingTerm && <SvgXml xml={svgList.termModal.checkEmpty} />}
                  <Text style={styles.modalBodyTxt}>
                    게임 이용약관 동의 (필수)
                  </Text>
                </View>
                <Pressable
                  style={styles.eachTermBtn}
                  onPress={e => e.stopPropagation()}>
                  <Text style={styles.eachTermBtnTxt}>보기</Text>
                </Pressable>
              </Pressable>
              <Pressable
                style={styles.eachTerm}
                onPress={() => {
                  setAllTerm(!personalTerm);
                  setPersonalTerm(!personalTerm);
                }}>
                <View style={styles.eachTermContent}>
                  {personalTerm && (
                    <SvgXml xml={svgList.termModal.checkEmpty} />
                  )}
                  <Text style={styles.modalBodyTxt}>
                    게임정보 수집 / 이용동의 (필수)
                  </Text>
                </View>
                <Pressable
                  style={styles.eachTermBtn}
                  onPress={e => e.stopPropagation()}>
                  <Text style={styles.eachTermBtnTxt}>보기</Text>
                </Pressable>
              </Pressable>
              <Pressable
                style={styles.eachTerm}
                onPress={() => {
                  setAllTerm(!adTerm);
                  setAdTerm(!adTerm);
                }}>
                <View style={styles.eachTermContent}>
                  {adTerm && <SvgXml xml={svgList.termModal.checkEmpty} />}
                  <Text style={styles.modalBodyTxt}>
                    광고성 알림 수신 동의 (선택)
                  </Text>
                </View>
              </Pressable>
              <Text style={styles.description}>
                플레이에 유용한 알림을 언제든 받을 수 있습니다.
              </Text>
              <SvgXml
                xml={svgList.termModal.separator}
                style={styles.separator}
              />
              <Pressable
                style={[styles.eachTerm, {marginTop: 30}]}
                onPress={() => {
                  if (!usingTerm || !personalTerm || !adTerm) {
                    setUsingTerm(true);
                    setPersonalTerm(true);
                    setAdTerm(true);
                    setAllTerm(true);
                  } else {
                    setAllTerm(!allTerm);
                  }
                }}>
                <View style={styles.eachTermContent}>
                  {usingTerm && personalTerm && adTerm && allTerm && (
                    <SvgXml xml={svgList.termModal.checkEmpty} />
                  )}
                  <Text style={styles.modalBodyTxt}>모두 동의</Text>
                </View>
              </Pressable>
              <Text style={styles.description}>
                선택을 포함한 모든 항목에 동의합니다.
              </Text>
            </View>
            <View style={styles.modalBtnView}>
              <Pressable
                style={styles.modalBtn}
                onPress={() => {
                  setshowModal('no');
                  navigation.navigate('EnterInfo');
                }}>
                <Text style={styles.modalBtnTxt}>확인</Text>
              </Pressable>
            </View>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  entire: {},
  modalBGView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    borderRadius: 60,
    borderColor: '#FFFFFF',
    borderWidth: 2,
    padding: 19,
    width: 330,
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 50,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalHeader: {},
  modalHeaderTxt: {
    color: '#002B5D',
    fontWeight: '400',
  },
  separator: {
    marginVertical: 10,
  },
  modalBody: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  eachTerm: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginVertical: 5,
  },
  eachTermContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  eachTermBtn: {},
  eachTermBtnTxt: {
    color: 'rgba(0, 43, 93, 0.55)',
    fontWeight: '400',
    textDecorationLine: 'underline',
    paddingBottom: 2,
  },
  modalBodyTxt: {
    marginLeft: 10,
    color: '#002B5D',
    fontWeight: '400',
  },
  description: {
    paddingLeft: 12,
    marginBottom: 5,
    color: 'rgba(0, 43, 93, 0.55)',
    fontWeight: '400',
  },
  modalBtnView: {
    paddingTop: 15,
  },
  modalBtn: {
    backgroundColor: 'rgba(79, 133, 197, 0.30)',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 70,
  },
  modalBtnTxt: {
    color: '#002B5D',
    fontSize: 16,
    fontWeight: '400',
  },
});
