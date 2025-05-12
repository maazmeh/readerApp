import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text, Image, TouchableOpacity, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/FontAwesome';
import { fetchChannelDetails, fetchAllPostOFAChannels, checkForSubscription, subscribeToChannel, showToastWithGravity, unsubscribeChannel } from '../Providers/http';
import Share from 'react-native-share';
import RNFS from 'react-native-fs';
import { useSelector } from 'react-redux';

const ChannelDescriptionScreen = ({navigation, route}) => {
  const {data,page} = route.params;
  const [totalPosts, setTotalPosts] = useState<any>();
  const [subscribers, setSubscribers] = useState<any>();
  const [posts, setPosts] = useState<any>([]);
  const [IsLoading, setIsLoading] = useState<any>(false);
  const [subLoading, setSubLoading] = useState<any>(false);
  const [channelId, setChannelId] =  useState<any>();
  const userData = useSelector((state:any) => state.user.userData); //All user Data
  const [showButton, setShowButton] = useState<any>(false);

  useEffect(() => {
    console.log("data from chanel Description =>", data, "page =>", page);
    if (data) {
      const id = data.id ? data.id : data.channelID ? data.channelID : null;
      if (id) {
        setChannelId(id);
        console.log("channelId set to =>", id);
        fetchChanelDetails(id);
        fetchAllPostByChannel(id);
        checkSubscriptionStatus(id);
      }
    }
  },[data])

 const goBack = () => {
    navigation.navigate('MainScreens')
  }

const checkSubscriptionStatus = (channelId:any) => {
  checkForSubscription(channelId, userData.id).then((resp:any) => {
    console.log("check for subscription res =>", resp);
    if(resp === 'exist' || resp === "exist"){
      console.log("hide subscribe button");
      setShowButton(false)
    } else {
      console.log("show subscribe button");
      setShowButton(true)
    }
  }).catch((err:any) => {
    console.log("err =>", err);
  })
}

const unsubscriber = () => {
  setSubLoading(true)
  unsubscribeChannel(channelId, userData.id).then((resp:any) => {
    console.log("resp from unsubscribe", resp);
    showToastWithGravity("Un-Subscribed Successfully !");
    if (data) {
      const id = data.id ? data.id : data.channelID ? data.channelID : null;
      if (id) {
        setChannelId(id);
        console.log("channelId set to =>", id);
        fetchChanelDetails(id);
        fetchAllPostByChannel(id);
        checkSubscriptionStatus(id);
      }
    }
    setSubLoading(false);
  }).catch((err:any) => {
    console.log("err =>", err);
    setSubLoading(false)
  })
}

const subscriber = () => {
  setSubLoading(true)
  console.log("Subscribe =>");
  subscribeToChannel(channelId, userData.id).then((resp:any) => {
    console.log("subscription resp =>", resp);
    showToastWithGravity("Subscribed Successfully !");
    if (data) {
      const id = data.id ? data.id : data.channelID ? data.channelID : null;
      if (id) {
        setChannelId(id);
        console.log("channelId set to =>", id);
        fetchChanelDetails(id);
        fetchAllPostByChannel(id);
        checkSubscriptionStatus(id);
      }
    }
    setSubLoading(false);
  }).catch((err:any) => {
    console.log("subs err =>", err);
    setSubLoading(false)
  })
}

  const handleShare = async (postDetails:any) => {
    try {
      setIsLoading(true);
      const downloadDest = `${RNFS.DocumentDirectoryPath}/shared_image.jpg`;
      const imageUrl = postDetails?.postImage;

      // Download the image
      const downloadResponse = await RNFS.downloadFile({
        fromUrl: imageUrl,
        toFile: downloadDest,
      }).promise;

      if (downloadResponse.statusCode === 200) {
        setIsLoading(false);
        const shareOptions = {
          message: `${postDetails?.title}\n\n${postDetails?.description}\n\n`,
          url: `file://${downloadDest}`,
        };
        await Share.open(shareOptions);
      } else {
        console.log('Error downloading image');
        setIsLoading(false);
      }
    } catch (error: any) {
      console.log('Error sharing:', error.message);
      setIsLoading(false);
    }
  };


  const fetchAllPostByChannel = (id:any) => {
    fetchAllPostOFAChannels(id).then((resp:any) => {
      setPosts(resp.data)
    }).catch((err:any) => {
      console.log("err =>", err);
    })
  }

  const fetchChanelDetails = (id:any) => {
    fetchChannelDetails(id).then((resp:any) => {
      setTotalPosts(resp.data[0].totalPosts)
      setSubscribers(resp.data[0].subscribers)
    }).catch((err:any) => {
      console.log("err =>", err);
    })
  }

  return (
     <ScrollView style={styles.container}>
    <View style={styles.topRow}>
      <TouchableOpacity style={styles.menuIcon} onPress={() => goBack()}>
        <AntDesign name="left" size={25} color={'#08546B'} />
      </TouchableOpacity>
      <Text style={styles.title}>{data ? data.channelName : ''}</Text>
    </View>
    
      <View style={styles.header}>
        <Text style={styles.subtitle}>{data ? data.description : ''}</Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.stat}>
          <Text style={styles.statNumber}>{totalPosts ? totalPosts : ''}</Text>
          <Text style={styles.statLabel}>Posts</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statNumber}>{subscribers ? subscribers : ''}</Text>
          <Text style={styles.statLabel}>Subscribers</Text>
        </View>
      </View>

      {
        showButton ? 
        <View style={styles.statsContainer}>
        <TouchableOpacity style={styles.loginButton} onPress={() => subscriber()}>
        {subLoading ? <ActivityIndicator size="small" color="white" /> :
        <Text style={styles.loginButtonText}>Subscribe Now</Text>
        }
        </TouchableOpacity>
        </View>
        :
        <View style={styles.statsContainer}>
        <TouchableOpacity style={styles.loginButton} onPress={() => unsubscriber()}>
        {subLoading ? <ActivityIndicator size="small" color="white" /> :
        <Text style={styles.loginButtonText}>Un-Subscribe</Text>
        }
        </TouchableOpacity>
        </View>
      }


      <FlatList
        data={posts}
        keyExtractor={(item: any, index: any) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.postContainer}>
          <View style={styles.postHeader}>
            <Image style={styles.avatar} source={{ uri: item.channelLogo }} />
            <View style={styles.postHeaderText}>
              <Text style={styles.postAuthor}>{item ? item.channelName : ''}</Text>
              <Text style={styles.postTime}>{item ? item.dateOfPost : ''}</Text>
            </View>
          </View>
          <Text style={styles.postContent}>{item ? item.title : ''}</Text>
          <Text style={styles.postContent}>{item ? item.description : ''}</Text>
          <Image style={styles.postImage} source={{ uri: item.postImage }} />
          <View style={styles.postFooter}>
            <TouchableOpacity style={styles.footerButton}>
              <Icon name="heart" size={20} color="#e74c3c" />
              <Text style={styles.footerButtonText}>2335</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.footerButton} onPress={() => handleShare(item)}>
            {IsLoading ? 
            <ActivityIndicator size="small" color="#e74c3c" /> : 
            <Icon name="share" size={20} color="#555" />
            }
            </TouchableOpacity>
          </View>
        </View>
        )}
      />
{/*       
      <Post />
      <Post /> */}
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
  header: {
    padding: 20,
    alignItems: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#777',
    textAlign: 'center',
    marginTop: 10,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  stat: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#08546B',
  },
  statLabel: {
    fontSize: 14,
    color: '#777',
    marginTop: 5,
  },
  postContainer: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  postHeaderText: {
    marginLeft: 10,
  },
  postAuthor: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#08546B',
  },
  postTime: {
    fontSize: 12,
    color: '#777',
  },
  postContent: {
    marginTop: 10,
    fontSize: 16,
    color: '#333',
  },
  postImage: {
    marginTop: 10,
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  postFooter: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  footerButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  footerButtonText: {
    marginLeft: 5,
    fontSize: 14,
    color: '#555',
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
});

export default ChannelDescriptionScreen;
