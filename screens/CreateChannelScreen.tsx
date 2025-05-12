import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import Sidebar from '../Providers/Sidebar';
import { Picker } from '@react-native-picker/picker';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { createChannel, fetchCategories } from '../Providers/http';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker'; 
import storage from '@react-native-firebase/storage';

const CreateChannelScreen: React.FC = ({ navigation, route }) => {
  const { userId } = route.params;
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [channelName, setchannelName] = useState('');
  const [channelLogo, setchannelLogo] = useState('');
  const [category, setCategory] = useState(null);
  const [description, setdescription] =  useState<any>();
  const [categories, setCategories] = useState<any>([]);

  useEffect(() => {
    fetchCategories().then((resp:any) => {
      setCategories(resp.data)
    }).catch((err:any) => {
      console.log("err while fetching categoreis =>", err);
    })
  },[])
  

  const create = () => {
    createChannel(userId, channelName, channelLogo, category, description).then((resp:any) => {
      console.log("resp =>", resp);
      let type:any = 'journalist';
      navigation.navigate('Login',{type})
    }).catch((err:any) => {
      console.log("err =>", err);
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
        const storageRef = storage().ref(`channelLogo/${filename}`);
        const task = storageRef.putFile(uploadUri);
        
        task.on('state_changed', (taskSnapshot) => {
          console.log(`${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`);
        })

        try {
          await task;
          const url = await storageRef.getDownloadURL();
          console.log('Image uploaded to Firebase Storage:', url);
          setchannelLogo(url);
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
      <Text style={styles.title}>Create your Channel</Text>
    </View>


   <View style={{padding:10}}>
    
      <TouchableOpacity style={styles.coverPhoto} onPress={() => handleImageUpload()}>
        {channelLogo ? (
          <Image source={{ uri: channelLogo }} style={styles.coverPhotoImage} />
        ) : (
          <>
            <Icon name="plus" size={30} color="#06CBD1" />
            <Text style={styles.coverPhotoText}>Add Profile Picture</Text>
          </>
        )}
      </TouchableOpacity>
      <View style={styles.form}>
        <Text style={styles.label}>Channel Title:</Text>
        <TextInput
          style={styles.input}
          placeholder="Title"
          value={channelName}
          onChangeText={setchannelName}
        />
        <Text style={styles.label}>Select Category:</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={category}
            onValueChange={(itemValue) => setCategory(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Choose Category" value={null} />
            {categories.map((data:any, index:any) => (
              <Picker.Item key={index} label={data.typeName} value={data.id} />
            ))}
          </Picker>
        </View>
        <Text style={styles.label}>Add Channel Description:</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Type news/article"
          value={description}
          onChangeText={setdescription}
          multiline
        />
        <TouchableOpacity style={styles.publishButton} onPress={() => create()}>
          <Text style={styles.publishButtonText}>Create</Text>
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
    overflow: 'hidden', // Ensure the image is contained within the borders
  },
  coverPhotoImage: {
    width: '100%',
    height: '100%',
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
    color:'black'
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
});

export default CreateChannelScreen;