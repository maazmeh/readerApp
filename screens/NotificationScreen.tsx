import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, FlatList } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useSelector } from 'react-redux';

const NotificationScreen = ({ navigation }) => {
  const [notifications, setNotifications] = useState([]);
  const userData = useSelector((state: any) => state.user.userData); // All user Data

  const demoNotifications: any = [
    {
      id: '1',
      title: 'Welcome to the App!',
      date: '2024-06-25',
    },
    {
      id: '2',
      title: 'Your profile is 80% complete',
      date: '2024-06-24',
    },
    {
      id: '3',
      title: 'New feature available: Dark Mode',
      date: '2024-06-23',
    },
    {
      id: '4',
      title: 'Reminder: Update your profile picture',
      date: '2024-06-22',
    },
    {
      id: '5',
      title: 'Weekly Summary: 5 new messages',
      date: '2024-06-21',
    },
  ];

  useEffect(() => {
    fetchNotifications(userData.id);
  }, []);

  const fetchNotifications = (userId: any) => {
    try {
      setNotifications(demoNotifications); // Adjust according to your API response structure
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  const moveToProfilePage = () => {
    navigation.navigate('MainScreens');
  };

  const renderItem = ({ item }) => (
    <View style={styles.notificationItem}>
      <Text style={styles.notificationTitle}>{item.title}</Text>
      <Text style={styles.notificationDate}>{item.date}</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.topRow}>
        <TouchableOpacity style={styles.menuIcon} onPress={moveToProfilePage}>
          <MaterialIcons name="cancel" size={25} color={'#08546B'} />
        </TouchableOpacity>
        <Text style={styles.title}>Notifications</Text>
        <View style={styles.menuIconPlaceholder} />
      </View>

      <FlatList
        data={notifications}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        style={styles.notificationsList}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  menuIcon: {
    marginLeft: 10,
  },
  menuIconPlaceholder: {
    width: 25, // Ensures the same width as the icon to balance the layout
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#08546B',
    textAlign: 'center',
    flex: 1, // Ensures the title takes up the remaining space
  },
  topRow: {
    backgroundColor: '#ffffff',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  editProfileButton: {
    padding: 10,
    borderRadius: 26,
    backgroundColor: 'transparent',
    color: '#06CBD1',
    borderWidth: 2,
    borderColor: '#06CBD1',
  },
  editProfileText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#06CBD1',
  },
  notificationsList: {
    marginTop: 20,
    paddingHorizontal: 10,
  },
  notificationItem: {
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#EAECF0',
    borderRadius: 10,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#444',
  },
  notificationDate: {
    fontSize: 14,
    color: '#666',
  },
});

export default NotificationScreen;