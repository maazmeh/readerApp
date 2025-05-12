import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, ScrollView } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { fetchAllPostOFAChannels, fetchAllSubscribersOfAChannel } from '../Providers/http';
import Icon from 'react-native-vector-icons/AntDesign';


const DetailModal = ({ navigation, route }) => {
  const { title, channelId } = route.params;
  const [followers, setfollowers] = useState<any>([])

  useEffect(() => {
    console.log("channelId =>", channelId);
    fetchAllSubscribers();
    fetchAllPosts();
  },[title])

  const fetchAllPosts = () => {
    fetchAllPostOFAChannels(channelId).then((resp:any) => {
      console.log("resp fetchChannelDetails =>", resp);
    }).catch((err:any) => {
      console.log("fetchChannelDetails err =>", err);
    })
  }

  const fetchAllSubscribers = () => {
    fetchAllSubscribersOfAChannel(channelId).then((resp: any) => {
      if (resp.data && typeof resp.data === 'object' && Array.isArray(resp.data.data)) {
        const profileData = resp.data.data;
        const modifiedData = profileData.map((user: any) => {
          let modifiedUser = { ...user };
          if (user.profilePicture) {
            modifiedUser.profilePicture = user.profilePicture.replace('/profileImage/', '/profileImage%2F');
          } 
          return modifiedUser;
        })
        setfollowers(modifiedData);
        console.log("followers =>", followers);
      } else {
        console.error('Data is not in the expected format or is not an array:', resp.data);
      }
    }).catch((err: any) => {
      console.error("Error fetching subscribers:", err);
    });
  }

  const calculateSubscriptionDays = (dateOfSubscription:any) => {
    const currentDate:any = new Date();
    const subscriptionDate:any = new Date(dateOfSubscription);
    const timeDifference = currentDate - subscriptionDate;
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    return daysDifference;
  };

  const close = () => {
    console.log("close");
    navigation.navigate('Analytics')
  }

  const handleDelete = (userId:any) => {
    console.log("delete pressed =>", userId);
  }

  return (
    <ScrollView style={styles.container}>
    <View style={styles.topRow}>
        <Text style={styles.title}>{title ? title : ''}</Text>
      <TouchableOpacity style={styles.rightMenuIcon} onPress={() => close()}>
        <AntDesign name="closecircleo" size={25} color={'#08546B'} />
      </TouchableOpacity>
    </View>
     
  
        {title && title === 'Followers' ? (
        <FlatList
        data={followers}
        keyExtractor={(item) => item.userID}
        renderItem={({ item }) => (
          <View style={styles.followerItem}>
            <Image source={{ uri: item.profilePicture }} style={styles.avatar} />
            <View style={styles.followerInfo}>
              <Text style={styles.followerName}>{item.username}</Text>
              <Text style={styles.followerEmail}>{item.email}</Text>
              <Text style={styles.followerDate}>Subscribed on: {new Date(item.dateOfSubscription).toLocaleDateString()}</Text>
              <Text style={styles.subscriptionDays}>Subscribed for: {calculateSubscriptionDays(item.dateOfSubscription)} days</Text>
            </View>
            <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(item.userID)}>
              <Icon name="delete" size={24} color="red" />
            </TouchableOpacity>
          </View>
        )}
      />
        ) : (
          <View></View>
        )}

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
  rightMenuIcon:{
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 1,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop:20,
    paddingBottom:20,
    backgroundColor: 'white',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalDetails: {
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: '#06CBD1',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  followerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    marginVertical: 5,
    marginHorizontal: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  followerInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  followerName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  followerEmail: {
    fontSize: 14,
    color: '#666',
  },
  followerDate: {
    fontSize: 12,
    color: '#999',
  },
  subscriptionDays: {
    fontSize: 12,
    color: '#999',
  },
  deleteButton: {
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default DetailModal;