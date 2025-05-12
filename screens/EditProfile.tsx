import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
  Image,
  ActivityIndicator,
} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker'; 
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useSelector } from 'react-redux';

const EditProfile: React.FC = ({ navigation }) => {
  const [name, setname] = useState<any>(null);
  const [password, setpassword] = useState<any>(null);
  const [email, setemail] = useState<any>(null);
  const [profilePicture, setprofilePicture] = useState<any>(null);
  const [isLoading, setisLoading] = useState<any>(false);
  const userData = useSelector((state:any) => state.user.userData); //All user Data

  useEffect(() => {
    console.log("userData =>", userData);
    if (userData && userData.profilePicture) {
      let updateURL = userData.profilePicture.replace('/profileImage/', '/profileImage%2F');
      console.log('Modified URL:', updateURL);
      setprofilePicture(userData ? updateURL : null)
    }
    setname(userData.username)
    setemail(userData.email)
  },[])

  const handleImageUpload = async () => {
    try {
      console.log("Upload image pressed");
      const options:any = {
        mediaType: 'photo',
        includeBase64: false,
        maxHeight: 200,
        maxWidth: 200,
      };
      launchImageLibrary(options, (response:any) => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else {
          console.log("Response images =>", response);
          console.log("Response URI =>", response.uri);
          console.log("resp 0=>", response?.assets[0].uri);
          setprofilePicture(response?.assets[0].uri);
        }
      });
    } catch (error) {
      console.log("Error while selecting image =>", error);
    }
  };

  const updateProfile = () => {
    console.log("Update profile hit");
  }
  
  const goBack = () => {
    navigation.navigate('MainScreens');
  }

  return (
    <ScrollView style={styles.container}>
    <View style={styles.topRow}>
      <TouchableOpacity style={styles.menuIcon} onPress={() => goBack()}>
        <AntDesign name="left" size={25} color={'#08546B'} />
      </TouchableOpacity>
      <Text style={styles.title}>Edit Profile</Text>
    </View>

        <View style={styles.logoContainer}>   
        {profilePicture ? (
            <TouchableOpacity onPress={handleImageUpload}>
            <Image source={{ uri: profilePicture }} style={styles.profileImage} resizeMode="cover" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={handleImageUpload}>
              <Image source={require('../src/assets/profilePic.png')} style={styles.logo} resizeMode="contain" />
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.cardContainer}>
          <View style={styles.card}>
            
            <TextInput
              style={styles.input}
              placeholder="Enter Your Username"
              placeholderTextColor="grey"
              value={name}
              onChangeText={setname}/>

            <TextInput
              style={styles.input}
              placeholder="Enter Your Email"
              placeholderTextColor="grey"
              value={email}
              onChangeText={setemail}/>

            <TextInput
              style={styles.input}
              placeholder="Enter Your Password"
              placeholderTextColor="grey"
              secureTextEntry={true}
              value={password}
              onChangeText={setpassword}/>
          
            <TouchableOpacity style={styles.loginButton} onPress={updateProfile}>
              {isLoading ? <ActivityIndicator size="small" color="white" /> : <Text style={styles.loginButtonText}>Save Changes</Text>}
            </TouchableOpacity>
          
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
  topRow: {
    backgroundColor: '#ffffff',
    padding: 10,
  },
  menuIcon: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#08546B',
    textAlign: 'center',
    paddingTop: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    paddingLeft:10,
    paddingRight:10  
  },
  searchInput: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 10,
    fontSize: 16,
    color: '#08546B',
  },
  channelItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  channelInfo: {
    flex: 1,
  },
  channelName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#08546B',
  },
  genre: {
    fontSize: 16,
    color: '#777',
  },
  logoContainer: {
    marginTop: '0%', // Adjust the margin top as needed
    alignItems: 'center',
  },
  logo: {
    width: 100, // Adjust the width of the logo as needed
    height: 100,
    resizeMode: 'contain',
  },
  card: {
    backgroundColor: 'transparent',
    borderRadius: 14,
    padding: 20,
    width: '100%',
    alignItems: 'center',
  },
    input: {
      width: '100%',
      height: 40,
      backgroundColor: 'transparent',
      borderRadius: 15,
      color: 'black',
      paddingHorizontal: 10,
      marginBottom: 10,
      borderWidth:2,
      borderTopColor:'#03566b',
      borderLeftColor: '#03566b',
      borderRightColor: '#03566b',
      borderBottomColor: '#03566b'
    },
  profileImage: {
    width: 125,
    height: 125,
    borderRadius: 62.5, // Half of width and height to make it circular
    marginBottom: 20,
    borderWidth: 2,
    borderColor: 'white',
  },
  forgetPass: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 12,
  },
  loginButton: {
    backgroundColor: '#00eadf',
    padding: 10,
    borderRadius: 26,
    marginBottom: 20,
    width: '75%',
    marginTop: '8%',
  },
  loginButtonText: {
    color: '#03566b',
    textAlign: 'center',
    fontWeight: 'bold',
  },

  subtitle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    textAlign: 'center',
  },

  linkContainer: {
    borderBottomWidth: 1, // Add an underline
    borderBottomColor: 'white',
    marginVertical: 10,
  },

  linkText: {
    fontWeight: 'bold',
    color: '#03566b',
  },

  sideBoxCharacter: {
    fontWeight: 'bold',
    color: '#03566b',
    fontSize: 24,
  },

  sideBox:{
    textAlign:'left',
    marginTop: '10%', // Adjust the margin top as needed
    paddingLeft:23
  },

  cardContainer:{
    alignItems: 'center',
  },
});

export default EditProfile;