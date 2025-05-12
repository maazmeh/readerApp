import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, ScrollView, FlatList, ActivityIndicator, Image, ToastAndroid } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { fetchAllChannels, uploadSubscriptionIds } from '../Providers/http';
import { useSelector } from 'react-redux';

const SelectChannels: React.FC = ({ navigation, route }) => {
  const {userId} = route.params;
  const [selectedIds, setSelectedIds] = useState<any>([]);
  const [isLoading, setisLoading] = useState<boolean>(false);
  const [channels, setChannels] = useState<any>([]);
  const userData = useSelector((state:any) => state.user.userData);

  useEffect(() => {
    fetchData();
  },[])

  const showToastWithGravity = (title:any) => {
    ToastAndroid.showWithGravityAndOffset(
      title,
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50,
    );
  };


  const selectAndMove = () => {
    console.log("selectedIds =>", selectedIds);
    // userData.id
    const id = userData ? userData.id : userId ? userId : null;
    if (id) {
      uploadSubscriptionIds(selectedIds,id).then((resp:any) => {
        console.log("resp from subscription =>", resp);
        showToastWithGravity('Subscription Successful ! Login now...');
        navigation.navigate('Login', {type:'reader'})
      }).catch((err:any) => {
        console.log("err while subscribing =>", err);
      })
    }
  }

  const fetchData = () => {
    fetchAllChannels().then((resp: any) => {
      if (resp.data) {
        const updatedChannels = resp.data.map((channel: any) => {
          let updateURL = channel.channelLogo.replace('/profileImage/', '/profileImage%2F');
          return {
            id: channel.id,
            channelName: channel.channelName,
            description: channel.description,
            channelLogo: updateURL
          };
        });
        setChannels(updatedChannels);
      }
    }).catch((err: any) => {
      console.log("error while fetching channels =>", err);
    });
  }

  const handleSelect = (id:any) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((item:any) => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const renderItem = ({ item, index }) => (
    <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
      {(index % 2 === 0) && (
        <TouchableOpacity
          style={[styles.channelBox, selectedIds.includes(item.id) ? styles.selected : null]}
          onPress={() => handleSelect(item.id)}>
          <Image 
            source={{ uri: item.channelLogo }} 
            style={styles.channelLogo}
            onError={(error) => console.log('Image Load Error:', error.nativeEvent.error)}
          />
          <Text style={[styles.channelName, selectedIds.includes(item.id) ? styles.selectedText : null]}>
            {item.channelName}
          </Text>
        </TouchableOpacity>
      )}
      {channels[index + 1] && (index % 2 === 0) && (
        <TouchableOpacity
          style={[styles.channelBox, selectedIds.includes(channels[index + 1].id) ? styles.selected : null]}
          onPress={() => handleSelect(channels[index + 1].id)}>
          <Image 
            source={{ uri: channels[index + 1].channelLogo }} 
            style={styles.channelLogo}
            onError={(error) => console.log('Image Load Error:', error.nativeEvent.error)}
          />
          <Text style={[styles.channelName, selectedIds.includes(channels[index + 1].id) ? styles.selectedText : null]}>
            {channels[index + 1].channelName}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  )

  return (
    <ImageBackground
      source={require('../src/assets/screenBg1.png')}
      style={styles.backgroundImage}>

      <View style={styles.fixedHeader}>
        <Text style={styles.topBoxCharacter}>Select Publisher</Text>
        <Text style={styles.subtitle}>Select what content you would like to consume. It would help us in customizing your Dashboard.</Text>
      </View>

      <View style={styles.listContainer}>
        <FlatList
          data={channels}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          numColumns={1} // Just a single column since we're manually handling the layout
          contentContainerStyle={styles.scrollContainer}
        />
      </View>

      <TouchableOpacity style={styles.fixedFooter} onPress={() => selectAndMove()}>
        {isLoading ? <ActivityIndicator size="small" color="white" /> : <Text style={styles.loginButtonText}>Select</Text>}
      </TouchableOpacity>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'space-between',
  },
  fixedHeader: {
    position: 'absolute',
    top: 0,
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Slightly transparent background
    paddingTop: 40,
    paddingBottom: 20,
    alignItems: 'center',
  },
  fixedFooter: {
    position: 'absolute',
    bottom: 20,
    backgroundColor: '#00eadf',
    padding: 10,
    borderRadius: 26,
    width: '75%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#03566b',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  topBoxCharacter: {
    fontWeight: 'bold',
    color: '#03566b',
    fontSize: 24,
    textAlign: 'center',
  },
  subtitle: {
    color: 'black',
    textAlign: 'center',
  },
  listContainer: {
    flex: 1,
    marginTop: 140, // Ensure list is below the fixed header
    paddingLeft: 20,
    paddingRight: 20, // Added to ensure padding on the right side as well
  },
  scrollContainer: {
    paddingBottom: 80, // Ensure there's space for the fixed footer
  },
  channelBox: {
    backgroundColor: 'white',
    borderRadius: 10,
    paddingTop: 10,
    paddingBottom: 10,
    width: '45%', // Adjusted for 2 columns with some space between them
    borderColor: '#03566b',
    borderWidth: 2,
    marginBottom: 10,
    marginRight: 10,
    alignItems: 'center',
  },
  channelName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    marginTop: 10,
  },
  selected: {
    backgroundColor: '#03566b',  // Highlight color when selected
  },
  selectedText: {
    color: 'white',  // Text color when selected
  },
  channelLogo: {
    width: 30, // example width
    height: 30, // example height
    resizeMode: 'contain',
  },
});

export default SelectChannels;