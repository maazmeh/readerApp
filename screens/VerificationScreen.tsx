import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, ImageBackground } from 'react-native';
import { useDispatch } from 'react-redux';


const VerificationScreen = ({ navigation, route}) => {
  const dispatch = useDispatch();
  const {type} = route.params;
  const [verificationCode, setVerificationCode] = useState<string[]>(Array(6).fill('')); // Initialize with 6 empty strings 
  const verificationCodeRefs = useRef<TextInput[]>(Array(6).fill(null));
  const [confirmVerification, setConfirmVerification] = useState(null);
  const [isLoading, setisLoading] = useState<any>(false);



  const handleVerificationCodeChange = (text: string, index: number) => {
    console.log("handleVerificationCodeChange =>", text, index);
    const newVerificationCode = [...verificationCode]; 
    newVerificationCode[index] = text; 
    setVerificationCode(newVerificationCode); 
    if (text !== '' && index < verificationCodeRefs.current.length - 1) { 
      verificationCodeRefs.current[index + 1]?.focus(); 
    } 
  };

    const resendCode = () => {
      console.log("Resend Code Pressed");
    }

  
  const onVerifyCodePress = async () => {
    try {
    //   console.log("verificationCode =>", verificationCode)
    //   const fullCode = verificationCode.join('');
    //   console.log("full Code =>", fullCode)
    //   setisLoading(true)
    //   let token:any;
    //   let checkForConfirmation:any = await confirmVerification?.confirm(fullCode);
    //   console.log('User Id =>', checkForConfirmation?.user?.uid);
    //   console.log('User Name =>', checkForConfirmation?.user?.displayName);
    //   console.log('User Data =>', checkForConfirmation?.additionalUserInfo?.isNewUser);
    //   checkUser(phoneNumber).then((result) => {
    //     console.log('Login resp =>', result);
    //     dispatch(loginUser(phoneNumber));
    //     setisLoading(false);
    if(type === 'reader'){
        navigation.navigate('SelectChannel')
    } else if(type === 'journalist'){
      navigation.navigate('Analytics')
    }
        
    //     }).catch((error) => {
    //     setisLoading(false);
    //     console.error('handleSignup Error:', error);
    //     navigation.navigate('Signup', {uid:checkForConfirmation?.user?.uid, phoneNumber: phoneNumber});
    //     });
    } catch (error) {
      setisLoading(false)
      console.error('Phone Authentication Error', error);
    }
  };

  return (
    <ImageBackground
    source={require('../src/assets/screenBg1.png')}
    style={styles.backgroundImage}>


    <View style={styles.cardContainer}>
      <View style={styles.topBox}>
        <Text style={styles.topBoxCharacter}>Check your email</Text>
        <Text style={styles.subtitle}>We have sent you an email with your verification code</Text>
      </View>

      <View style={styles.codeContainer}>
        {verificationCode.map((code, index) => (
          <TextInput
            key={index}
            style={styles.codeBox}
            keyboardType="numeric"
            maxLength={1}
            value={code}
            onChangeText={(text) => handleVerificationCodeChange(text, index)}
            ref={(ref) => (verificationCodeRefs.current[index] = ref)}
          />
        ))}
      </View>

      <TouchableOpacity style={styles.verifyButton} onPress={onVerifyCodePress}>
        {isLoading ? (
          <ActivityIndicator size="small" color="#03566b" />
        ) : (
          <Text style={styles.verifyButtonText}>Verify Code</Text>
        )}
      </TouchableOpacity>

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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#03566b',
  },
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '75%',
    marginBottom: 20,
  },
  codeBox: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 8,
    width: 40,
    height: 40,
    fontSize: 20,
    color: '#03566b',
    textAlign: 'center',
  },
  verifyButtonText: {
    color: '#03566b',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  verifyButton:{
    backgroundColor: '#00eadf',
    padding: 10,
    borderRadius: 26,
    marginBottom: 20,
    width: '75%',
  },
  sendNewCode:{
    backgroundColor: 'transparent',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  sendNewCodeText:{
    color: '#03566b',
    fontSize: 15,
    textAlign: 'center',
  }
});

export default VerificationScreen;