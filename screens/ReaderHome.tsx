import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  FlatList,
  Animated,
  Dimensions,
  RefreshControl
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';
import { fetchPostSubscribers } from '../Providers/http';

const { width } = Dimensions.get('window');

const contentCategories = [
  { name: 'Literature', icon: 'book' },
  { name: 'Mystery & Thriller', icon: 'book' },
  { name: 'Science Fiction', icon: 'book' },
  { name: 'Biographies', icon: 'book' },
  { name: 'Self-Help', icon: 'book' },
  { name: 'History', icon: 'book' },
  { name: 'Romance', icon: 'book' },
  { name: 'Business', icon: 'book' },
  { name: 'Travel', icon: 'book' },
  { name: 'Fantasy', icon: 'book' },
];

const CustomSidebar = ({ closeSidebar }) => {

  const selectCategory = (type:any) => {
    console.log('selectCategory =>', type);
  };

  return (
    <View style={styles.drawerContainer}>
      <TouchableOpacity style={styles.closeButton} onPress={closeSidebar}>
        <Ionicons name="close" size={30} color="#fff" />
      </TouchableOpacity>
      <View style={styles.topBox}>
        <Text style={styles.topBoxCharacter}>Select Category</Text>
        <Text style={styles.subtitle}>
          Select what content you would like to consume. It would help us in
          customizing your Dashboard.
        </Text>
      </View>

      <View style={styles.channelsContainer}>
        {contentCategories.map((channel, index) => (
          <TouchableOpacity
            key={index}
            style={styles.channelBox}
            onPress={() => selectCategory(channel.name)}>
            <AntDesign name={channel.icon} size={24} color={'#08546B'} />
            <Text style={styles.channelName}>{channel.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const ReaderHome = ({ navigation }) => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const userData = useSelector((state:any) => state.user.userData); // All user Data
  const [posts, setPosts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const sidebarAnimation = useRef(new Animated.Value(-width)).current;

  useEffect(() => {
    console.log("userData =>", userData);
    fetchSubscribedPosts();
  }, [userData]);

  const fetchSubscribedPosts = () => {
    if (userData) {
      return fetchPostSubscribers(userData.id)
        .then((resp:any) => {
          // console.log("subs posts =>", resp.data);
          setPosts(resp.data);
        })
        .catch((err) => {
          console.log("err =>", err);
        });
    }
    return Promise.resolve(); // In case userData is not available, return a resolved promise
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchSubscribedPosts().finally(() => setRefreshing(false));
  }

  const opneNotification = () => {
    navigation.navigate('notification')
  }

  const openSidebar = () => {
    setIsSidebarVisible(true);
    Animated.timing(sidebarAnimation, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeSidebar = () => {
    Animated.timing(sidebarAnimation, {
      toValue: -width,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setIsSidebarVisible(false));
  };

  const truncateText = (text:any, maxLength:any) => {
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  const openPostModal = (post:any) => {
    navigation.navigate('PostDetails', { postDetails: post });
  };

  const Post = ({ post, isLast }) => (
    <View style={styles.postContainer}>
      <View style={styles.userInfo}>
        <Image source={{ uri: post.channelLogo }} style={styles.profilePic} />
        {!isLast && <View style={styles.line}></View>}
        <View style={styles.userDetails}>
          <Text style={styles.userName}>{post.channelName}</Text>
          <Text style={styles.date}>{post.dateOfPost}</Text>
        </View>
      </View>
      {post.postImage && 
       <TouchableOpacity onPress={() => openPostModal(post)}>
      <Image source={{ uri: post.postImage }} style={styles.postImage} />
       </TouchableOpacity>
      }
      <Text style={styles.content}>{truncateText(post.description, 40)}</Text>
      </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <TouchableOpacity style={styles.menuIcon} onPress={openSidebar}>
          <MaterialIcons name="category" size={25} color={'#08546B'} />
        </TouchableOpacity>
        <Text style={styles.title}>Home</Text>
        <TouchableOpacity style={styles.rightMenuIcon} onPress={opneNotification}>
          <Ionicons name="notifications-outline" size={25} color={'#08546B'} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={posts}
        keyExtractor={(item:any, index:any) => (item.id ? item.id.toString() : index.toString())}
        renderItem={({ item, index }) => <Post post={item} isLast={index === posts.length - 1} />}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />

      {isSidebarVisible && (
        <Animated.View style={[styles.sidebar, { transform: [{ translateX: sidebarAnimation }] }]}>
          <CustomSidebar closeSidebar={closeSidebar} />
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 2,
  },
  topRow: {
    backgroundColor: '#ffffff',
    padding: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  menuIcon: {
    marginLeft: 10,
  },
  rightMenuIcon: {
    marginRight: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#08546B',
    textAlign: 'center',
  },
  sidebar: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: width * 0.8,
    height: '100%',
    backgroundColor: '#08546B',
    zIndex: 10,
  },
  closeButton: {
    alignSelf: 'flex-end',
    padding: 10,
  },
  topBoxCharacter: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 24,
    textAlign: 'center',
  },
  topBox: {
    textAlign: 'center',
    padding: 5,
    marginTop: '10%',
  },
  drawerContainer: {
    flex: 1,
    padding: 5,
  },
  subtitle: {
    color: 'white',
    textAlign: 'center',
  },
  channelsContainer: {
    marginTop: 20,
    marginLeft: 2,
    marginRight: 10,
  },
  channelBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: 'white',
    borderRadius: 26,
    padding: 5,
  },
  channelName: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#08546B',
    marginLeft: 5,
  },
  postContainer: {
    backgroundColor: 'white',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  userInfo: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  line: {
    position: 'absolute',
    left: 25,
    top: 50,
    width: 2,
    backgroundColor: '#ccc',
    bottom: 0,
  },
  userDetails: {
    justifyContent: 'center',
  },
  userName: {
    fontWeight: 'bold',
    color:'black'
  },
  date: {
    color: 'grey',
  },
  content: {
    marginBottom: 10,
    marginTop: 10,
    color:'black'
  },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 12,
  },
});

export default ReaderHome;