import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  FlatList,
  TextInput,
  Alert
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BookmarkScreen: React.FC = ({ navigation }) => {
  const [searchText, setSearchText] = useState('');
  const [bookmarkedChannels, setBookmarkedChannels] = useState([]);
  const [filteredChannels, setFilteredChannels] = useState([]);

  useEffect(() => {
    const loadBookmarks = async () => {
      try {
        const storedBookmarks = await AsyncStorage.getItem('bookmarkedPosts');
        if (storedBookmarks) {
          const bookmarks = JSON.parse(storedBookmarks);
          setBookmarkedChannels(bookmarks);
          setFilteredChannels(bookmarks);
        }
      } catch (error) {
        console.error('Error loading bookmarks:', error);
      }
    };

    loadBookmarks();
  }, []);

  const handleSearch = (text: string) => {
    const filtered = bookmarkedChannels.filter((channel:any) =>
      channel.title.toLowerCase().includes(text.toLowerCase()) ||
      channel.channelName.toLowerCase().includes(text.toLowerCase()) ||
      (channel.date && channel.date.toLowerCase().includes(text.toLowerCase()))
    );
    setFilteredChannels(filtered);
    setSearchText(text);
  }

  const openPostModal = (post:any) => {
    console.log("post =>", post);
    navigation.navigate('PostDetails', { postDetails: post });
  };

  const deleteBookmark = async (channel:any) => {
    const updatedBookmarks = bookmarkedChannels.filter((item:any) => item !== channel);
    setBookmarkedChannels(updatedBookmarks);
    setFilteredChannels(updatedBookmarks);
    try {
      await AsyncStorage.setItem('bookmarkedPosts', JSON.stringify(updatedBookmarks));
    } catch (error) {
      console.error('Error deleting bookmark:', error);
    }
  };

  const confirmDelete = (channel:any) => {
    Alert.alert(
      "Delete Bookmark",
      "Are you sure you want to delete this bookmark?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "OK", onPress: () => deleteBookmark(channel) }
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <Text style={styles.title}>Bookmark</Text>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search..."
            placeholderTextColor={'black'}
            value={searchText}
            onChangeText={handleSearch}
          />
          <MaterialIcons name="search" size={24} color="#08546B" />
        </View>
      </View>

      <FlatList
        data={filteredChannels}
        keyExtractor={(item: any, index: any) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.channelItemContainer}>
            <TouchableOpacity style={styles.channelItem} onPress={() => openPostModal(item)}>
              <Image source={{ uri: item.channelLogo }} style={styles.profilePic} />
              <View style={styles.channelInfo}>
                <Text style={styles.channelName}>{item.title}</Text>
                <Text style={styles.genre}>{item.channelName}</Text>
              </View>
              <Text style={styles.date}>{item.dateOfPost}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.deleteButton} onPress={() => confirmDelete(item)}>
              <MaterialIcons name="delete" size={24} color="#FF0000" />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  topRow: {
    backgroundColor: '#ffffff',
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#08546B',
    textAlign: 'center',
    marginBottom: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 10,
    fontSize: 16,
    color: '#08546B',
  },
  channelItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  channelItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
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
  date: {
    fontSize: 14,
    color: '#777',
    textAlign: 'right',
  },
  deleteButton: {
    padding: 10,
  },
});

export default BookmarkScreen;