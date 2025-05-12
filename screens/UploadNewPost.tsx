import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
  Image,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import Sidebar from '../Providers/Sidebar';
import { Picker } from '@react-native-picker/picker';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { createChannel, fetchCategories, uploadPost } from '../Providers/http';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker'; 
import storage from '@react-native-firebase/storage';
import { useSelector } from 'react-redux';


const UploadNewPost: React.FC = ({ navigation }) => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [news, setNews] = useState('');
  const [postImage, setpostImage] =  useState<any>();
  const [category, setCategory] = useState(null);
  const [description, setdescription] =  useState<any>();
  const [categories, setCategories] = useState<any>([]);
  const [channelLogo, setchannelLogo] = useState('');
  const channelData = useSelector((state:any) => state.user.userData.channel); //All user Data
  const [loading , setLoading] = useState<any>(false);

  useEffect(() => {
    fetchCategories().then((resp:any) => {
      setCategories(resp.data)
    }).catch((err:any) => {
      console.log("err while fetching categoreis =>", err);
    })
  },[])
  

  const create = () => {
    setLoading(true)
    uploadPost(channelData.id, title, description, postImage).then((resp:any) => {
      console.log("resp =>", resp);
      setLoading(false);
      setpostImage(null)
      setTitle('')
      setdescription(null)
    }).catch((err:any) => {
      console.log("err =>", err);
      setLoading(false)
    })
  }

  const handleImageUpload = async () => {
    const options:any = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 200,
      maxWidth: 200,
    }
    launchImageLibrary(options, async (response:any) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const uri = response.assets[0].uri;
        setchannelLogo(response?.assets[0].uri);
        // Upload the image to Firebase Storage
        const uploadUri = uri;
        let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);
        // Add timestamp to file name to ensure unique filenames
        const timestamp = new Date().getTime();
        const name = filename.split('.').slice(0, -1).join('.');
        const extension = filename.split('.').pop();
        filename = `${name}_${timestamp}.${extension}`;
        const storageRef = storage().ref(`posts/${filename}`);
        const task = storageRef.putFile(uploadUri);
        
        task.on('state_changed', (taskSnapshot) => {
          console.log(`${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`);
        })

        try {
          await task;
          const url = await storageRef.getDownloadURL();
          console.log('Image uploaded to Firebase Storage:', url);
          setpostImage(url);
        } catch (e) {
          console.error(e);
        }
      }
    });
  }

  return (
    <ScrollView style={styles.container}>
    {isSidebarVisible && 
   <Sidebar onClose={() => setIsSidebarVisible(false)} />
   }
      <View style={styles.topRow}>
      <TouchableOpacity style={styles.menuIcon} onPress={() => setIsSidebarVisible(true)}>
        <AntDesign name="menuunfold" size={25} color={'#08546B'} />
      </TouchableOpacity>
      <Text style={styles.title}>Create new Post</Text>
    </View>


    <View style={{padding:10}}>
    
    <TouchableOpacity style={styles.coverPhoto} onPress={() => handleImageUpload()}>
      {channelLogo ? (
        <Image source={{ uri: channelLogo }} style={styles.coverPhotoImage} />
      ) : (
        <>
          <Icon name="plus" size={30} color="#06CBD1" />
          <Text style={styles.coverPhotoText}>Add Picture</Text>
        </>
      )}
    </TouchableOpacity>
    <View style={styles.form}>
      <Text style={styles.label}>Post Title:</Text>
      <TextInput
        style={styles.input}
        placeholder="Title"
        placeholderTextColor={'black'}
        value={title}
        onChangeText={setTitle}
      />
    
      <Text style={styles.label}>Add Description:</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Type news/article"
        value={description}
        placeholderTextColor={'black'}
        onChangeText={setdescription}
        multiline
      />
      <TouchableOpacity style={styles.publishButton} onPress={() => create()}>
      {loading ? <ActivityIndicator size="small" color="white" /> :
        <Text style={styles.publishButtonText}>Create</Text>
      }
        <Icon name="calendar" size={20} color="#fff" />
      </TouchableOpacity>
    </View>

    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'white'
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
  coverPhoto: {
    height: 150,
    borderWidth: 1,
    borderColor: '#06CBD1',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  coverPhotoText: {
    color: '#777',
    marginTop: 10,
  },
  form: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#08546B',
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
    color:'black'
  },
  textArea: {
    height: 100,
    color:'black'
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    marginBottom: 20,
  },
  picker: {
    height: 40,
    width: '100%',
  },
  publishButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#06CBD1',
    padding: 15,
    borderRadius: 10,
  },
  publishButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10,
  },
  coverPhotoImage: {
    width: '100%',
    height: '100%',
  },
});

export default UploadNewPost;