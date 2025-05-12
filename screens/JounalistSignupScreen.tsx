import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ActivityIndicator,
  ImageBackground,
  PermissionsAndroid,
} from 'react-native';
import {journalistRegister} from '../Providers/http';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker'; 
import { RadioButton as Radio } from 'react-native-paper'; // Import RadioButton from react-native-paper
import storage from '@react-native-firebase/storage';


const JounalistSignupScreen: React.FC = ({navigation, route}) => {
  const [isLoading, setisLoading] = useState<any>(false);
  const {type} = route.params;
  const [firstName, setfirstName] = useState<any>(null);
  const [lastName, setlastName] = useState<any>(null);
  const [password, setpassword] = useState<any>(null);
  const [email, setemail] = useState<any>(null);
  const [phoneNumber, setphoneNumber] = useState<any>(null);
  const [address, setaddress] = useState<any>(null);
  const [profilePicture, setprofilePicture] = useState<any>(null);
  const [gender, setGender] = React.useState('male'); // State to hold selected gender
  const [imageURL, setImageURL] = useState<any>(null);

  useEffect(() => {
    const requestStoragePermission = async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission',
            message: 'App needs access to storage to upload images.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Storage permission granted');
        } else {
          console.log('Storage permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
    }
    requestStoragePermission();
  },[])

  const registerButton = () => {
    setisLoading(true)
    console.log('Register');
    journalistRegister(firstName, lastName, password, email, phoneNumber, address, imageURL, gender)
      .then((resp: any) => {
        setisLoading(false)
        console.log("register resp =>", resp.id);
        openChannelCreation(resp.id);
      })
      .catch((err: any) => {
        setisLoading(false)
        console.log("error register button =>", err);
      });
  }

  const moveToLogin = () => {
    navigation.navigate('Login',{type})
  }

  const openChannelCreation = (userId:any) => {
    navigation.navigate('CreateChannel',{userId})
  }


  const handleImageUpload = async () => {
    const options:any = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 200,
      maxWidth: 200,
    }
    launchImageLibrary(options, async (response:any) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const uri = response.assets[0].uri;
        setprofilePicture(response?.assets[0].uri);
        // Upload the image to Firebase Storage
        const uploadUri = uri;
        let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);
        // Add timestamp to file name to ensure unique filenames
        const timestamp = new Date().getTime();
        const name = filename.split('.').slice(0, -1).join('.');
        const extension = filename.split('.').pop();
        filename = `${name}_${timestamp}.${extension}`;
        const storageRef = storage().ref(`profileImage/${filename}`);
        const task = storageRef.putFile(uploadUri);
        
        task.on('state_changed', (taskSnapshot) => {
          console.log(`${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`);
        })

        try {
          await task;
          const url = await storageRef.getDownloadURL();
          console.log('Image uploaded to Firebase Storage:', url);
          setImageURL(url);
        } catch (e) {
          console.error(e);
        }
      }
    });
  }

  return (
    <ImageBackground
    source={require('../src/assets/screenBg2.png')}
    style={styles.backgroundImage}>
      
      <View style={styles.container}>
       
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

        <View style={styles.sideBox}>
        <Text style={styles.sideBoxCharacter}>Create Account</Text>
        <Text style={{color: '#03566b'}}>Please register to login</Text>
      </View>

        <View style={styles.cardContainer}>
          <View style={styles.card}>
            
            <TextInput
              style={styles.input}
              placeholder="Enter Your First Name"
              placeholderTextColor="grey"
              value={firstName}
              onChangeText={setfirstName}/>

              <TextInput
              style={styles.input}
              placeholder="Enter Your Last Name"
              placeholderTextColor="grey"
              value={lastName}
              onChangeText={setlastName}/>

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

              <TextInput
              style={styles.input}
              placeholder="Enter Your Address"
              placeholderTextColor="grey"
              value={address}
              onChangeText={setaddress}/>

              <TextInput
              style={styles.input}
              placeholder="Enter Your Contact Number"
              placeholderTextColor="grey"
              value={phoneNumber}
              onChangeText={setphoneNumber}/>

            <View style={styles.radioContainer}>
                <View style={styles.radioButton}>
                    <Radio.Item label="Male" value="male" color="#02cdd1" onPress={() => setGender('male')} status={gender === 'male' ? 'checked' : 'unchecked'} />
                </View>
                <View style={styles.radioButton}>
                    <Radio.Item label="Female" value="female" color="#02cdd1" onPress={() => setGender('female')} status={gender === 'female' ? 'checked' : 'unchecked'} />
                </View>
            </View>
          
            <TouchableOpacity style={styles.loginButton} onPress={registerButton}>
              {isLoading ? <ActivityIndicator size="small" color="white" /> : <Text style={styles.loginButtonText}>Signup</Text>}
            </TouchableOpacity>
            <View style={styles.subtitle}>
            <Text style={{color: '#03566b'}}>Already have an Account ?</Text>
              <TouchableOpacity onPress={moveToLogin}>
                <View style={styles.linkContainer}>
                  <Text style={styles.linkText}>&nbsp;&nbsp;Login Now !</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
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
  container: {
    flex: 1,
    justifyContent: 'center',
    marginTop:60
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
    borderRadius: 5,
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
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  radioLabel: {
    marginRight: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  radioButtons: {
    flexDirection: 'column', // Display radio buttons in a single column
  },
  radioButton: {
    flexDirection: 'column',
    alignItems: 'center',
  },
});

export default JounalistSignupScreen;
