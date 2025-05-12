import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ToastAndroid, ActivityIndicator, ImageBackground } from 'react-native';
import { journalistLogin, readerlogin, showToastWithGravity } from '../Providers/http';
import { useDispatch } from 'react-redux';
import { setUserData } from '../actions/userActions';


const LoginScreen: React.FC = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const {type} = route.params;
  const [isLoading, setisLoading] = useState<any>(false);
  const [email, setEmail] = useState<any>(false);
  const [password, setPassword] = useState<any>(false);

  useEffect(() =>{
    console.log("type ==>", type);
  },[type])
  
  const LoginButton = () => {
    if(type === 'reader'){
      if(email && password){
        setisLoading(true);
        readerlogin(email, password).then((result:any) => {
          console.log('Login resp =>', result);
           navigation.navigate('MainScreens');
           if (result && result.profilePicture) {
            let updateURL = result.profilePicture.replace('/profileImage/', '/profileImage%2F');
            console.log('Modified URL:', updateURL);
            result.profilePicture = updateURL;
          }
          dispatch(setUserData(result));
          setisLoading(false);
          }).catch((error) => {
          setisLoading(false);
          });
        } else {
          showToastWithGravity('Email or Password cannot be empty...');
        }

    } else if(type === 'journalist'){
      console.log('here');
      setisLoading(true);
        journalistLogin(email, password).then((result:any) => {
        console.log('Login resp =>', result);
         navigation.navigate('Analytics');
         if (result && result.profilePicture) {
          let updateURL = result.profilePicture.replace('/profileImage/', '/profileImage%2F');
          console.log('Modified URL:', updateURL);
          result.profilePicture = updateURL;
        }
        dispatch(setUserData(result));
        setisLoading(false);
        }).catch((error) => {
        setisLoading(false);
        });
      } else {
        showToastWithGravity('Email or Password cannot be empty...');
      }
  }

  const openRegister = () => {
    if(type === 'journalist'){
      navigation.navigate('JournalistSignup',{type:type});
    } else {
      navigation.navigate('Signup',{type:type});
    }
  }
  
  return (
    <ImageBackground
    source={require('../src/assets/screenBg2.png')}
    style={styles.backgroundImage}>
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require('../src/assets/fullLogo.png')}
          style={styles.logo}
        />
      </View>
      
      <View style={styles.sideBox}>
        <Text style={styles.sideBoxCharacter}>Login</Text>
        <Text style={{color:'black'}}>Let's get to Work</Text>
      </View>

    <View style={styles.cardContainer}>
      <View style={styles.card}>
        <TextInput
          style={styles.input}
          placeholder="Enter Your Email"
          placeholderTextColor="grey"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Your Password"
          placeholderTextColor="grey"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />
        <View style={{ alignSelf: 'flex-end', marginBottom: '5%' }}>
          <TouchableOpacity>
            <Text style={styles.forgetPass}>Forgot Password ?&nbsp;&nbsp;</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.loginButton} onPress={LoginButton}>
          {isLoading ? <ActivityIndicator size="small" color="white" /> : <Text style={styles.loginButtonText}>Login</Text>}
        </TouchableOpacity>
        <View style={styles.subtitle}>
          <Text style={{color:'black'}}>Don't have an Account ?</Text>
          <TouchableOpacity onPress={openRegister}>
            <View style={styles.linkContainer}>
              <Text style={styles.linkText}>&nbsp;&nbsp;Register Now !</Text>
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
  },
  logoContainer: {
    marginTop: '-35%', // Adjust the margin top as needed
  },
  logo: {
    width: 350, // Adjust the width of the logo as needed
    height: 350,
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
    forgetPass: {
      color:'#03566b',
      fontWeight: 'bold',
      fontSize:12
    },
    loginButton: {
      backgroundColor: '#00eadf',
      padding: 10,
      borderRadius: 26,
      marginBottom: 20,
      width: '75%',
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
      marginTop: '-15%', // Adjust the margin top as needed
      paddingLeft:23
    },

    cardContainer:{
      alignItems: 'center',
    }
  });

export default LoginScreen;