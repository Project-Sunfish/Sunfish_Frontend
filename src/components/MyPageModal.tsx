import React, {Children, useEffect, useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  Pressable,
  TextInput,
  Platform,
  useWindowDimensions,
  PixelRatio,
} from 'react-native';
import Modal from 'react-native-modal';
import Text from './Text';
import {RootState} from '../store';
import {useSelector} from 'react-redux';

type MyPageModalProps = {
  showModal: string;
  setShowModal: React.Dispatch<React.SetStateAction<string>>;
  condition: string;
  children: React.ReactNode;
  headerTxt: string;
  onClosed?: () => void;
  onBackButtonPress?: () => void;
  onShow?: () => void;
};

export default function MyPageModal(props: MyPageModalProps) {
  const showModal = props.showModal;
  const setshowModal = props.setShowModal;

  const fold5Width = 904;
  const fold5Height = 2176;
  const {width, height} = useWindowDimensions();
  const currentDPI = PixelRatio.get();
  const scaleFactor = currentDPI / PixelRatio.getFontScale();
  const adjustedWidth = width * scaleFactor;
  const adjustedHeight = height * scaleFactor;
  const isSmallScreen = adjustedWidth < fold5Width;

  const Ultra24Width = 1440;
  const BigScreen = (Ultra24Width * 160) / 500;
  const isBigScreen = width > BigScreen;

  return (
    <Modal
      style={styles.entire}
      isVisible={showModal == props.condition}
      hasBackdrop={true}
      onModalShow={() => {
        props.onShow && props.onShow();
      }}
      onBackdropPress={() => {
        setshowModal('no');
        props.onBackButtonPress && props.onBackButtonPress();
      }}
      onBackButtonPress={() => {
        setshowModal('no');
        props.onBackButtonPress && props.onBackButtonPress();
      }}
      avoidKeyboard={true}>
      <Pressable
        style={[
          styles.modalBGView,
          isSmallScreen && Platform.OS != 'ios'
            ? {paddingHorizontal: 0}
            : {paddingHorizontal: 30},
          isBigScreen && {paddingHorizontal: (width - BigScreen) / 2},
        ]}
        onPress={() => {
          setshowModal('no');
          props.onBackButtonPress && props.onBackButtonPress();
        }}>
        <Pressable style={styles.modalView} onPress={e => e.stopPropagation()}>
          <View style={styles.modalContent}>
            {props.headerTxt && (
              <View style={styles.modalHeader}>
                <Text style={styles.modalHeaderTxt}>{props.headerTxt}</Text>
              </View>
            )}
            <View style={styles.modalBody}>{props.children}</View>
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
    padding: 16,
    width: '100%',
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
    fontSize: 25,
    textAlign: 'center',
  },
  modalBody: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
});
