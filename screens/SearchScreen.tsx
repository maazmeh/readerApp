import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  FlatList,
  TextInput,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useSelector } from 'react-redux';
import { fetchAllChannels } from '../Providers/http';

const SearchScreen: React.FC = ({ navigation }) => {
  const [searchText, setSearchText] = useState('');
  const [channels, setChannels] = useState<any>([]);
  const [filteredChannels, setFilteredChannels] = useState<any>([]);
  const userData = useSelector((state: any) => state.user.userData); // All user Data

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetchAllChannels().then((resp: any) => {
      console.log("resp from all channels searching page =>", resp.data);
      setChannels(resp.data);
      setFilteredChannels(resp.data); // Update filteredChannels initially
    }).catch((err: any) => {
      console.log("err search page =>", err);
    });
  };

  const handleSearch = (text: string) => {
    const filtered = channels.filter((channel: any) =>
      channel.channelName.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredChannels(filtered);
    setSearchText(text);
  };

  const openChanelPage = (item: any) => {
    console.log("View channel detail page =>", item);
    navigation.navigate('ChannelDescription', { data: item, page: 'search' });
  };

  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <Text style={styles.title}>Search by Category</Text>
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
        keyExtractor={item => item.id.toString()} // Ensure key is a string
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.channelItem} onPress={() => openChanelPage(item)}>
            <Image source={{ uri: item.channelLogo }} style={styles.profilePic} />
            <View style={styles.channelInfo}>
              <Text style={styles.genre}>{item.channelName}</Text>
            </View>
            <Text style={styles.date}>{item.dateOfPost}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
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
    paddingRight: 10
  },
  searchInput: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 10,
    fontSize: 16,
    color: '#08546B',
  },
  channelItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
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
});

export default SearchScreen;