import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const SelectUser: React.FC = ({ navigation }) => {
    

  const moveToNextScreenReader = () => { 
    navigation.navigate('Login', {type:'reader'})
  }

  const moveToNextScreenJournalist = () => { 
    navigation.navigate('Login', {type:'journalist'})
  }


  return (
    <ImageBackground
    source={require('../src/assets/screenBg1.png')}
    style={styles.backgroundImage}>

    <View style={styles.cardContainer}>
      <View style={styles.topBox}>
        <Text style={styles.topBoxCharacter}>Select User Type</Text>
        <Text style={styles.subtitle}>Choose the Role that describes you best</Text>
      </View>

       <View style={styles.userTypeContainer}>
          <TouchableOpacity style={styles.userTypeBox} onPress={moveToNextScreenReader}>
          <FontAwesome5 name="book-reader" size={30} color={'#03566b'} />
            <Text style={styles.userTypeText}>Reader</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.userTypeBox} onPress={moveToNextScreenJournalist}>
          <MaterialCommunityIcons name="typewriter" size={30} color={'#03566b'} />
            <Text style={styles.userTypeText}>Journalist</Text>
          </TouchableOpacity>
        </View>

    </View>

    </ImageBackground>
  );
};

const styles = StyleSheet.create({
backgroundImage: {
  flex: 1,
  resizeMode: 'cover',
  justifyContent: 'center',
},
topBoxCharacter: {
    fontWeight: 'bold',
    color: '#03566b',
    fontSize: 24,
    textAlign: 'center',
  },

  topBox:{
    textAlign:'center',
    padding:20,
    marginTop: '-35%',
  },

  cardContainer:{
    alignItems: 'center',
    marginTop:'-30%'
  },

  subtitle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'black',
    textAlign: 'center',
  },
  userTypeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  userTypeBox: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: 150,
    height: 150,
    borderColor: '#03566b', // Set border color to transparent by default
    borderWidth: 2, // Set border width
    marginRight:4
  },
  userTypeText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default SelectUser;