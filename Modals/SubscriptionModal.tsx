import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal, TextInput, StyleSheet } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

const SubscriptionModal = ({ modalVisible, onCancel, onConfirm }) => {
 

  const closeModal = () => {
    onCancel();
  };

  return (
    <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={onCancel}>
      <View style={styles.modalContainer}>
       
        <View style={styles.topRow}>
          <TouchableOpacity style={styles.menuIcon} onPress={closeModal}>
            <AntDesign name="close" size={25} color={'#ef6ccc'} />
          </TouchableOpacity>
            <Text style={styles.title}></Text>
        </View>

        <View style={styles.modalContent}>
          <Text style={styles.heading}>Unlock Exclusive Benefits:</Text>
          <Text style={styles.bulletPoint}>- A months notice is required to cancel the subscription.</Text>
          <Text style={styles.bulletPoint}>- The payment will be taken automatically on a monthly basis unless stopped by the subscriber. </Text>
          <Text style={styles.bulletPoint}>- A subscriber can join and cancel as many times as they like.</Text>
          <Text style={styles.bulletPoint}>- Get all this in £8.99 per month.</Text>
          <TouchableOpacity style={styles.subscribeButton} onPress={onConfirm}>
            <Text style={styles.subscribeButtonText}>Subscribe Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1, 
    backgroundColor: '#ededed'
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    width: '100%',
    height: '100%',
  },
  topRow: {
    backgroundColor: '#ffffff',
    padding: 3,
  },
  menuIcon: { 
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 1,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  bulletPoint: {
    marginBottom: 10,
  },
  subscribeButton: {
    backgroundColor: '#ef6ccc',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  subscribeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#ef6ccc',
    textAlign: 'center',
    marginTop: 14,
  },
});

export default SubscriptionModal;