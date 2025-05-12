import React, { useEffect, useState } from 'react';
import { View, Text, Modal, Image, StyleSheet, TouchableOpacity, TextInput, ScrollView, ActivityIndicator } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Share from 'react-native-share';
import Feather from 'react-native-vector-icons/Feather';
import RNFS from 'react-native-fs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { showToastWithGravity } from '../Providers/http';

const PostDetailsModal: React.FC = ({ navigation, route }) => {
  const { postDetails } = route.params;
  const imageDef = require('../src/assets/logo.png');
  const [commentBox, setCommentBox] = useState<any>(false);
  const [comment, setComment] = useState<any>();
  const [isLoading, setIsLoading] = useState<any>(false);
  const [localLoading, setLocalLoading] = useState<any>(false);

  useEffect(() => {
    console.log("postDetails ==>", postDetails);
  }, [postDetails]);

  const openCommentBox = () => {
    setCommentBox(!commentBox);
  }

  const handleComment = () => {
    console.log('Comment:', comment);
    setComment('');
  };

  const handleShare = async () => {
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
        // Share the downloaded image
        setIsLoading(false);
        const shareOptions = {
          title: postDetails?.title,
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

  const openChanelPage = (item:any) => {
    console.log("View channel detail page =>", item);
    navigation.navigate('ChannelDescription',{data: item, page:'postDetails'});
  }

  const saveToBookMark = async () => {
    try {
      setLocalLoading(true);
      const downloadDest = `${RNFS.DocumentDirectoryPath}/bookmark_image.jpg`;
      const imageUrl = postDetails?.postImage;

      // Download the image
      const downloadResponse = await RNFS.downloadFile({
        fromUrl: imageUrl,
        toFile: downloadDest,
      }).promise;

      if (downloadResponse.statusCode === 200) {
        // Save post details with local image path to AsyncStorage
        const bookmarkedPost = {
          ...postDetails,
          postImage: `file://${downloadDest}`,
        };
        const existingBookmarks = await AsyncStorage.getItem('bookmarkedPosts');
        const bookmarks = existingBookmarks ? JSON.parse(existingBookmarks) : [];
        bookmarks.push(bookmarkedPost);
        await AsyncStorage.setItem('bookmarkedPosts', JSON.stringify(bookmarks));
        console.log('Post saved to bookmark');
        setLocalLoading(false);
        showToastWithGravity('Post saved to bookmark');
      } else {
        console.log('Error downloading image for bookmark');
        setLocalLoading(false);
      }
    } catch (error: any) {
      console.log('Error saving bookmark:', error.message);
      setLocalLoading(false);
    }
  };

  const goBack = () => {
    navigation.navigate('MainScreens');
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.topRow}>
        <TouchableOpacity style={styles.menuIcon} onPress={() => { goBack() }}>
          <AntDesign name="left" size={25} color={'#08546B'} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => openChanelPage(postDetails)}>
          <Text style={styles.title}>{postDetails ? postDetails.channelName : 'Channel Name'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.rightMenuIcon} onPress={() => saveToBookMark()}>
          {
            localLoading ?
            <ActivityIndicator size="small" color="#08546B" />
            :
            <Feather name="bookmark" size={25} color={'#08546B'} />
          }
        </TouchableOpacity>
      </View>

      <View style={styles.modalContent}>
        {/* Title */}
        <Text style={styles.heading}>{postDetails?.title}</Text>

        {/* Image */}
        <Image source={{ uri: postDetails?.postImage }} style={styles.image} />

        {/* Content/Description */}
        <Text style={styles.description}>{postDetails?.description}</Text>

        <View style={styles.actionsContainer}>
          <TouchableOpacity style={styles.actionButton}>
            <AntDesign name="like2" size={20} color={'white'} />
            <Text style={styles.actionText}>Like</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton} onPress={() => handleShare()}>
            <AntDesign name="sharealt" size={20} color={'white'} />
            {isLoading ? <ActivityIndicator size="small" color="white" /> :
              <Text style={styles.actionText}>Share</Text>
            }
          </TouchableOpacity>
        </View>

        {commentBox ? (
          <View>
            <TextInput
              style={styles.commentInput}
              placeholder="Write a comment..."
              value={comment}
              onChangeText={setComment}
            />
            <TouchableOpacity style={styles.commentButton} onPress={handleComment}>
              <Text style={styles.commentButtonText}>Post Comment</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View></View>
        )}
      </View>
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
  centerTitle: {
    marginRight: 10,
  },
  rightMenuIcon: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 1,
  },
  modalContent: {
    backgroundColor: 'transparent',
    borderRadius: 10,
    padding: 0,
    margin: 20,
    alignItems: 'center',
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color:'black'
  },
  image: {
    width: 300,
    height: 200,
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'left',
    color:'black'
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    width: '100%',
    backgroundColor: '#08546B',
    padding: 10,
    borderRadius: 26,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionText: {
    marginLeft: 5,
    color: 'white',
  },
  commentInput: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  commentButton: {
    backgroundColor: '#08546B',
    padding: 10,
    borderRadius: 5,
  },
  commentButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default PostDetailsModal;