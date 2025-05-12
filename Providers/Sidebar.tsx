import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';


const Sidebar = ({ onClose }) => {
  const navigation:any = useNavigation();
  const menuSelect = (item:any) => {
       if(item === 'Home'){
      navigation.navigate('Analytics');
    } else if(item === 'Posts'){
      navigation.navigate('UploadPost')
    } else if(item === 'Profile'){
      navigation.navigate('JournalistProfile')
    } else if(item === 'Settings'){
      navigation.navigate('JournalistSettings')
    }
    onClose();
  }

  return (
    <View style={styles.sidebarContainer}>
      <TouchableOpacity onPress={onClose} style={styles.closeButton}>
        <Icon name="close" size={25} color="#08546B" />
      </TouchableOpacity>
      
      <View style={styles.logoContainer}>
        <Image
          source={require('../src/assets/fullLogo.png')}
          style={styles.logo}
        />
      </View>

      <TouchableOpacity style={styles.menuItem} onPress={() => menuSelect('Home')}>
        <Icon name="linechart" size={20} color="white" style={styles.menuIcon} />
        <Text style={styles.menuItemText}>Home</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem} onPress={() => menuSelect('Posts')}>
        <Icon name="inbox" size={20} color="white" style={styles.menuIcon} />
        <Text style={styles.menuItemText}>Create Post</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem} onPress={() => menuSelect('Profile')}>
        <Icon name="layout" size={20} color="white" style={styles.menuIcon} />
        <Text style={styles.menuItemText}>My Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem} onPress={() => menuSelect('Settings')}>
        <Icon name="setting" size={20} color="white" style={styles.menuIcon} />
        <Text style={styles.menuItemText}>Settings</Text>
      </TouchableOpacity>
    </View>
    
  );
};

const styles = StyleSheet.create({
  sidebarContainer: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 250,
    backgroundColor: '#fff',
    padding: 10,
    elevation: 5,
    zIndex: 1000,
  },
  closeButton: {
    alignSelf: 'flex-end',
  },
  sidebarTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#08546B',
    marginBottom: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 7,
    padding:8,
    borderRadius:12,
    backgroundColor:'#03566b',
    marginBottom:10
  },
  menuIcon: {
    marginRight: 10,
  },
  menuItemText: {
    fontSize: 18,
    color: 'white',
  },
  logoContainer: {
    marginTop: '-10%', // Adjust the margin top as needed
    alignSelf:'center'
  },
  logo: {
    width: 200, // Adjust the width of the logo as needed
    height: 200,
    resizeMode: 'contain',
  },
});

export default Sidebar;