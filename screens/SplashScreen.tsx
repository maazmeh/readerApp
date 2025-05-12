import React, { useEffect } from 'react';
import { View, Image, StyleSheet, ImageBackground, Text, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LogBox } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setUserData } from '../reducers/userReducer';


const SplashScreen: React.FC = ({navigation}) => {
  const dispatch = useDispatch();
  const userData = useSelector((state:any) => state.user.userData);

  useEffect(()=>{
    LogBox.ignoreLogs(['new NativeEventEmitter']); // Ignore log notification by message
    LogBox.ignoreAllLogs(); //Ignore all log notifications
  },[])

  useEffect(() => {
    const retrieveData = async () => {
      try {
        AsyncStorage.getItem('userData').then((resp:any) => {
          console.log("splash resp =>", resp);
          if(resp === 'empty' || resp === null){
            setTimeout(() => {
              navigation.navigate('SelectUser');
          }, 4000); 
          } else {
          const parsedData = JSON.parse(resp);
          dispatch(setUserData(parsedData));
          if(parsedData.userTpe === 'journalist'){
            navigation.navigate('Analytics');
          } else {
            navigation.navigate('MainScreens');
          }
          }
        }).catch((err:any) => {
          console.log("err =>", err);
        })
      } catch (error) {
        console.error('Error retrieving data from AsyncStorage:', error);
      }
    };
    retrieveData();
  }, [dispatch]);


  return (
    <ImageBackground
    source={require('../src/assets/screenBg2.png')}
    style={styles.backgroundImage}>


    <View style={styles.cardContainer}>
     
      <View style={styles.topBox}>
        <Text style={styles.topBoxCharacter}>Welcome to Read Up</Text>
        <Text style={styles.subtitle}>Explore, Discover, Engage</Text>
      </View>

      <View style={styles.logoContainer}>
        <Image
          source={require('../src/assets/fullLogo.png')}
          style={styles.logo}
        />
      </View>


      <View style={styles.sideBox}>
        <Text style={styles.subtitle}>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</Text>
      </View>

      <View style={styles.loginButton}>
          <Text style={styles.loginButtonText}>Get Started</Text>
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
    textAlign: 'center',
  },

  logoContainer: {
    marginTop: '-35%', // Adjust the margin top as needed
  },
  logo: {
    width: 350, // Adjust the width of the logo as needed
    height: 500,
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
    loginButton: {
      backgroundColor: '#00eadf',
      padding: 10,
      borderRadius: 26,
      marginBottom: 20,
      width: '75%',
      justifyContent: 'center',
      textAlign: 'center',
      alignItems: 'center',
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
      color: 'black',
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
      textAlign:'center',
      marginTop: '-15%', // Adjust the margin top as needed
      padding:20
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
    }
});

export default SplashScreen;