import React, {Children, useEffect, useRef, useState} from 'react';
import {View, StyleSheet, Pressable} from 'react-native';
import Modal from 'react-native-modal';
import Text from './Text';

type MyPageModalProps = {
  showModal: string;
  setShowModal: React.Dispatch<React.SetStateAction<string>>;
  condition: string;
  children: React.ReactNode;
  headerTxt: string;
};

export default function MyPageModal(props: MyPageModalProps) {
  const showModal = props.showModal;
  const setshowModal = props.setShowModal;

  return (
    <Modal
      style={styles.entire}
      isVisible={showModal == props.condition}
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
    paddingHorizontal: 30,
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
  },
  modalBody: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
});
