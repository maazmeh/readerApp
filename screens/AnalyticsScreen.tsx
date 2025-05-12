import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import Sidebar from '../Providers/Sidebar';
import DetailModal from '../Modals/DetailModal';  // Make sure the path is correct
import { useSelector } from 'react-redux';
import { fetchChannelAnalytics, fetchNumberOfPosts } from '../Providers/http';

const AnalyticsScreen = ({navigation}) => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [followers, setfollowers] = useState('');
  const [engagement, setengagement] = useState('');
  const [posts, setposts] = useState('');
  const [profilePicture, setprofilePicture] = useState('');
  const userData = useSelector((state:any) => state.user.userData.user); //All user Data
  const channelData = useSelector((state:any) => state.user.userData.channel); //All user Data
  
  
  useEffect(() => {
    console.log("channelData =>", channelData);
    fetchNumberOfSubscribers();
    fetchNumberOfPostsCount();
    setTimeout(() => {
      calculateEngagementRateFromResponse();
    }, 5000);
      if (userData && userData.profilePicture) {
        let updateURL = userData.profilePicture.replace('/profileImage/', '/profileImage%2F');
        console.log('Modified URL:', updateURL);
        setprofilePicture(userData ? updateURL : null)
      }
    },[userData])

    const fetchNumberOfPostsCount = () => {
      fetchNumberOfPosts(channelData.id).then((resp:any) => {
      setposts(resp.data[0].totalNoOfPosts);
    }).catch((err:any) => {
      console.log("fetchChannelDetails err =>", err);
    })
   }

   const fetchNumberOfSubscribers = () => {
    fetchChannelAnalytics(channelData.id).then((resp:any) => {
      setfollowers(resp.data[0].totalSubscribers);
    }).catch((err:any) => {
      console.log("fetchChannelDetails err =>", err);
    })
   }
   
   const calculateEngagementRateFromResponse = () => {
    const numSubscribers = parseInt(followers);
    const numPosts = parseInt(posts);
    console.log("calculateEngagementRateFromResponse =>", numSubscribers , numPosts);
    if (!isNaN(numSubscribers) && numSubscribers > 0) {
      setengagement(((numPosts / numSubscribers) * 100).toFixed(2));
    } else {
      setengagement('0')
    }
  }

  const openModal = (title:any) => {
    navigation.navigate('Details', {title: title, channelId: channelData.id})
  };


  return (
    <View style={{ flex: 1 }}>
      {isSidebarVisible && 
      <Sidebar onClose={() => setIsSidebarVisible(false)} />
      }
      <ScrollView style={styles.container}>
        <View style={styles.topRow}>
          <TouchableOpacity style={styles.menuIcon} onPress={() => setIsSidebarVisible(true)}>
            <Icon name="menuunfold" size={25} color={'#08546B'} />
          </TouchableOpacity>
          <Text style={styles.title}>Dashboard</Text>
          {
            profilePicture ?
            <Image
            style={styles.profileImage}
            source={{ uri: profilePicture }}
          />
            :
            <Image
            style={styles.profileImage}
            source={{ uri: 'https://randomuser.me/api/portraits/men/1.jpg' }}
          />
          }
          
        </View>
        


        <Text style={styles.engagementRate}>{engagement ? engagement : '0.00'}%</Text>
        <View style={styles.percentageChange}>
          <Text style={styles.percentageChangeText}>Engagement Rate</Text>
        </View>
        {/* <Text style={styles.dateRange}>July 10 - July 16</Text> */}
        <View style={styles.statsContainer}>
          <TouchableOpacity style={[styles.statBox, styles.followersBox]} onPress={() => openModal('Followers')}>
            <Text style={styles.statLabel}>FOLLOWERS</Text>
            <Text style={styles.statValue}>{followers ? followers : '0'}</Text>
            <Text style={styles.statChangePositive}>+26.00%</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.statBox, styles.engagementBox]}>
            <Text style={styles.statLabel}>Posts</Text>
            <Text style={styles.statValue}>{posts ? posts : '0'}</Text>
            <Text style={styles.statChangeNegative}>-2.96%</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  menuIcon: {
    marginRight: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#08546B',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  engagementRate: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginTop: 10,
  },
  percentageChange: {
    alignSelf: 'center',
    backgroundColor: '#E0F7FA',
    borderRadius: 10,
    padding: 5,
    marginTop: 5,
    marginBottom: 20,
  },
  percentageChangeText: {
    color: '#00C853',
    fontSize: 16,
  },
  dateRange: {
    textAlign: 'center',
    fontSize: 16,
    color: '#777',
    marginVertical: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statBox: {
    flex: 1,
    borderRadius: 10,
    padding: 20,
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  followersBox: {
    backgroundColor: '#E3F2FD',
  },
  engagementBox: {
    backgroundColor: '#FCE4EC',
  },
  viewsBox: {
    backgroundColor: '#E1F5FE',
  },
  likesBox: {
    backgroundColor: '#E8F5E9',
  },
  statLabel: {
    fontSize: 14,
    color: '#777',
    marginBottom: 10,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  statChangePositive: {
    fontSize: 16,
    color: '#00C853',
    marginTop: 5,
  },
  statChangeNegative: {
    fontSize: 16,
    color: '#D32F2F',
    marginTop: 5,
  },
});

export default AnalyticsScreen;