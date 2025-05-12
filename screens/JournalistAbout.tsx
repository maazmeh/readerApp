import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text, TouchableOpacity, StyleSheet, Switch, ActivityIndicator, TextInput, Image } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useSelector } from 'react-redux';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker'; 

const JournalistAbout: React.FC = ({ navigation, route }) => {
  const { type } = route.params;
  const [selectedOption, setSelectedOption] = useState('Monthly');
  const [isAutoRecurring, setIsAutoRecurring] = useState(false);
  const [name, setname] = useState<any>(null);
  const [password, setpassword] = useState<any>(null);
  const [email, setemail] = useState<any>(null);
  const [profilePicture, setprofilePicture] = useState<any>(null);
  const [isLoading, setisLoading] = useState<any>(false);
  const channelData = useSelector((state:any) => state.user.userData.channel); //All user Data
  const userData = useSelector((state:any) => state.user.userData.user); //All user Data

  useEffect(() => {
    console.log("type =>", type);
  }, [type]);

  const goBack = () => {
    navigation.navigate('JournalistSettings');
  }

  useEffect(() => {
    console.log("userData =>", userData);
    if (userData && userData.profilePicture) {
      let updateURL = userData.profilePicture.replace('/profileImage/', '/profileImage%2F');
      console.log('Modified URL:', updateURL);
      setprofilePicture(userData ? updateURL : null)
    }
    setname(userData.firstName + ' ' + userData.lastName)
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
  
  
  const renderContent = () => {
    switch (type) {
      case 'Subscription':
        return (
          <View style={{padding:15}}>
      <TouchableOpacity
        style={[styles.option, selectedOption === 'Monthly' && styles.selectedOption]}
        onPress={() => setSelectedOption('Monthly')}>
        <View style={styles.optionHeader}>
          <Text style={styles.optionTitle}>Monthly</Text>
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>50% OFF</Text>
          </View>
        </View>
        <Text style={styles.optionSubtitle}>Cancel at anytime</Text>
        <Text style={styles.optionPrice}>$3.99</Text>
        <Text style={styles.optionDescription}>*Free trial for one month</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.option, selectedOption === 'Free' && styles.selectedOption]}
        onPress={() => setSelectedOption('Free')}>
        <Text style={styles.optionTitle}>Free</Text>
        <Text style={styles.optionSubtitle}>Lorem Ipsum is simply dummy</Text>
        <Text style={styles.optionPrice}>$0</Text>
        <Text style={styles.optionDescription}>7 Day trials</Text>
      </TouchableOpacity>

      <View style={styles.autoRecurringContainer}>
        <Text style={styles.autoRecurringText}>Auto recurring</Text>
        <Switch
          value={isAutoRecurring}
          onValueChange={setIsAutoRecurring}
        />
      </View>

      <Text style={styles.yearlyPrice}>
        <Text style={styles.originalPrice}>$79.99/year</Text> {' '}
        <Text style={styles.discountedPrice}>$39.99/year (50% OFF)</Text>
      </Text>

      <TouchableOpacity style={styles.subscribeButton}>
        <Text style={styles.subscribeButtonText}>Subscribe Now</Text>
      </TouchableOpacity> 
          </View> 
        );
      case 'FAQ':
        return (
          <View>

          </View>
        );
      case 'About Us':
        return (
          <View>
            
          </View>
        );
        case 'Privacy & Policy':
          return (
            <View>
              
            </View>
          );
          case 'Terms & Conditions':
            return (
              <View>
                
              </View>
            );
            case 'Security':
              return (
                <View>
                  
                </View>
              );
              case 'Profile':
                return (
                  <View>
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
                    
                      <TouchableOpacity style={styles.loginButton} >
                        {isLoading ? <ActivityIndicator size="small" color="white" /> : <Text style={styles.loginButtonText}>Save Changes</Text>}
                      </TouchableOpacity>
                    
                      </View>
                    </View>
                  </View>
                );
      default:
        return <View></View>;
    }
  };

  return (
    <ScrollView style={styles.container}>
    <View style={styles.topRow}>
      <TouchableOpacity style={styles.menuIcon} onPress={() => goBack()}>
        <AntDesign name="left" size={25} color={'#08546B'} />
      </TouchableOpacity>
      <Text style={styles.title}>{type ? type : ''}</Text>
    </View>

   {renderContent()}

    </ScrollView>
  );
};

const styles = StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor: 'white',
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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#08546B',
    textAlign: 'center',
    marginTop: 14,
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
    color: '#777',
  },
  option: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
  },
  selectedOption: {
    borderColor: '#06CBD1',
    backgroundColor: '#f0f8ff',
  },
  optionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  optionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color:'black'
  },
  discountBadge: {
    backgroundColor: '#06CBD1',
    borderRadius: 5,
    padding: 5,
  },
  discountText: {
    color: '#ffff',
    fontSize: 12,
  },
  optionSubtitle: {
    fontSize: 14,
    color: '#777',
  },
  optionPrice: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 10,
    color:'black'
  },
  optionDescription: {
    fontSize: 12,
    color: '#777',
  },
  autoRecurringContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 20,
  },
  autoRecurringText: {
    fontSize: 16,
    color:'black'
  },
  yearlyPrice: {
    textAlign: 'center',
    marginBottom: 20,
  },
  originalPrice: {
    textDecorationLine: 'line-through',
    color: '#777',
  },
  discountedPrice: {
    fontWeight: 'bold',
    color:'black'
  },
  subscribeButton: {
    backgroundColor: '#06CBD1',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  subscribeButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
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
  cardContainer:{
    alignItems: 'center',
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
});

export default JournalistAbout;