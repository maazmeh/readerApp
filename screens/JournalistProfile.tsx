import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text, Image, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/FontAwesome';
import Sidebar from '../Providers/Sidebar';
import { useSelector } from 'react-redux';
import { fetchAllPostOfChannel } from '../Providers/http';

const JournalistProfile = ({navigation}) => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [posts, setPosts] = useState<any>([]);
  const channelData = useSelector((state:any) => state.user.userData.channel); //All user Data

  // useEffect(() => {
  //   fetchAllPostOfChannel(channelData.id).then((res:any) => {
  //     console.log("res =>", res.data);
  //     setPosts(res.data);
  //   }).catch((err:any) => {
  //     console.log("err while fetching all posts on journalist profile");
  //   })
  // },[channelData])
  
  useEffect(() => {
    if (channelData && channelData.id) {
      fetchAllPostOfChannel(channelData.id).then((res:any) => {
        const updatedPosts = res.data.map((post:any) => ({
          ...post,
          postImage: post.postImage ? post.postImage.replace('/profileImage/', '/profileImage%2F') : 'https://via.placeholder.com/150'
        }));
        setPosts(updatedPosts);
        console.log("Posts updated with new profile pictures.");
      }).catch((err) => {
        console.log("Error while fetching all posts on journalist profile:", err);
      });
    }
  }, [channelData.id]);

 const goBack = () => {
    navigation.navigate('MainScreens')
  }

  const Post = ({ post }) => (
    <View style={styles.postContainer}>
      <Text style={styles.postTitle}>{post.title}</Text>
      <Text style={styles.postContent}>{post.description}</Text>
      <Image style={styles.postImage} source={{ uri: post.postImage }} />
      <View style={styles.postFooter}>
        <TouchableOpacity style={styles.footerButton}>
          <Icon name="heart" size={20} color="#e74c3c" />
          <Text style={styles.footerButtonText}>{post.likes}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton}>
          <Icon name="share" size={20} color="#555" />
        </TouchableOpacity>
      </View>
    </View>
  );


  return (
    <ScrollView style={styles.container}>
      {isSidebarVisible && <Sidebar onClose={() => setIsSidebarVisible(false)} />}
      <View style={styles.topRow}>
        <TouchableOpacity style={styles.menuIcon} onPress={() => setIsSidebarVisible(true)}>
          <AntDesign name="menuunfold" size={25} color={'#08546B'} />
        </TouchableOpacity>
        <Text style={styles.title}>{channelData ? channelData.channelName : ''}</Text>
      </View>
      <View style={styles.header}>
        <Text style={styles.subtitle}>{channelData ? channelData.description : ''}</Text>
      </View>
      <FlatList
        data={posts}
        renderItem={({ item }) => <Post post={item} />}
        keyExtractor={item => item.id}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </ScrollView>
  );
}

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
  postTitle:{
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#08546B',
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
});

export default JournalistProfile;
