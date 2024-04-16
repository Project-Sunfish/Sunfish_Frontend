import React, {useEffect, useRef, useState} from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import Modal from 'react-native-modal';

type TermModalProps = {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function TermModal(props: TermModalProps) {
  const showModal = props.showModal;
  const setshowModal = props.setShowModal;
  return (
    <Modal
      style={styles.entire}
      isVisible={showModal}
      hasBackdrop={true}
      onBackdropPress={() => setshowModal(false)}
      onBackButtonPress={() => setshowModal(false)}>
      <Pressable style={styles.modalBGView}>
        <Pressable style={styles.modalView} onPress={e => e.stopPropagation()}>
          <View style={styles.modalContent}>
            <Text>Term</Text>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  entire: {},
  modalBGView: {},
  modalView: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    borderRadius: 60,
    borderColor: '#FFFFFF',
    borderWidth: 2,
    padding: 19,
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 50,
    padding: 20,
  },
  modalHeader: {},
  modalHeaderTxt: {},
  modalBody: {},
  modalBodyTxt: {},
  modalBtnView: {},
  modalBtn: {},
  modalBtnTxt: {},
});
