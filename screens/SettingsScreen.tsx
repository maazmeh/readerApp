import React, { useEffect, useState } from 'react';
import { View, Alert, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { FlatList } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';

const SettingsScreen = ({navigation}) => {
  const userData = useSelector((state:any) => state.user.userData); //All user Data
  const [profilePicture ,setprofilePicture] = useState<any>();
  
  const userProfile = {
    name: userData ? userData.username : '',
  };

  useEffect(() => {
    if (userData && userData.profilePicture) {
      let updateURL = userData.profilePicture.replace('/profileImage/', '/profileImage%2F');
      console.log('Modified URL:', updateURL);
      setprofilePicture(userData ? updateURL : null)
    }
  },[])

  const settingsOptions = [
    { name: 'Subscription', icon: 'notification' },
    { name: 'Security', icon: 'exclamationcircleo' },
    { name: 'Logout', icon: 'logout' },
  ];

  const otherOptions = [
    { name: 'FAQ', icon: 'notification' },
    { name: 'About Us', icon: 'notification' },
    { name: 'Privacy & Policy', icon: 'unlock' },
    { name: 'Terms & Conditions', icon: 'exclamationcircleo' },
  ];


  const handleSettingPress = (setting: any) => {
    console.log(`Selected setting`, setting);
    if(setting === 'Logout'){
      createTwoButtonAlert();
    } else if(setting === 'FAQ'){
      navigation.navigate('About', {type: 'FAQ'})
    } else if(setting === 'About Us'){
      navigation.navigate('About', {type: 'About Us'})
    } else if(setting === 'Privacy & Policy'){
      navigation.navigate('About', {type: 'Privacy & Policy'})
    } else if(setting === 'Terms & Conditions'){
      navigation.navigate('About', {type: 'Terms & Conditions'})
    } else if(setting === 'Subscription'){
      navigation.navigate('About', {type: 'Subscription'})
    } else if(setting === 'Security'){
      navigation.navigate('About', {type: 'Security'})
    }
  }

  const createTwoButtonAlert = () =>
    Alert.alert('Do you want to Proceed ?', 'By Clicking on Ok you will be Logged out.', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'OK', onPress: () => {
        console.log('OK Pressed');
        AsyncStorage.setItem('userData', 'empty');
        navigation.navigate('SelectUser')
      }},
    ]);

  const moveToProfilePage = () => {
    navigation.navigate('EditProfile');
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.topRow}>
        <TouchableOpacity style={styles.profileContainer}>
          <Image source={{ uri: profilePicture }} style={styles.profilePic} />
          <Text style={styles.profileName}>{userProfile.name}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.editProfileButton} onPress={moveToProfilePage}>
          <Text style={styles.editProfileText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>

    <View style={styles.boxContainer}>
      <Text style={{color:'black'}}>Account</Text>
      <View style={styles.settingsList}>
       {settingsOptions.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={styles.settingItem}
            onPress={() => handleSettingPress(option.name)}>
            <AntDesign name={option.icon} size={24} color="#777" />
            <Text style={styles.settingName}>{option.name}</Text>
            <Ionicons name="chevron-forward" size={24} color="#777" />
          </TouchableOpacity>
        ))}
      </View>

      <Text style={{color:'black', marginTop:10}}>Help</Text>
      <View style={styles.settingsList}>
       {otherOptions.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={styles.settingItem}
            onPress={() => handleSettingPress(option.name)}>
            <AntDesign name={option.icon} size={24} color="#777" />
            <Text style={styles.settingName}>{option.name}</Text>
            <Ionicons name="chevron-forward" size={24} color="#777" />
          </TouchableOpacity>
        ))}
      </View>
    
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'white'
  },
  boxContainer:{
    padding:10
  },
  topRow: {
    backgroundColor: '#ffffff',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  profileName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  editProfileButton: {
    padding: 10,
    borderRadius: 26,
    backgroundColor: 'transparent',
    color:'#06CBD1',
    borderWidth:2,
    borderColor: '#06CBD1'
  },
  editProfileText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#06CBD1',
  },
  settingsList: {
    marginTop: 20,
    paddingHorizontal: 10,
    paddingLeft:20,
    paddingRight:20,
    borderRadius:12,
    backgroundColor:'#EAECF0'
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  settingName: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: '#444',
  },
});

export default SettingsScreen;