import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './screens/SplashScreen';
import SettingsScreen from './screens/SettingsScreen';
import AboutScreen from './screens/AboutScreen';
import TermsScreen from './screens/TermsScreen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SelectUser from './screens/SelectUser';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import VerificationScreen from './screens/VerificationScreen';
import SelectChannels from './screens/SelectChannels';
import ReaderHome from './screens/ReaderHome';
import SearchScreen from './screens/SearchScreen';
import BookmarkScreen from './screens/BookmarkScreen';
import EditProfile from './screens/EditProfile';
import ChannelDescriptionScreen from './screens/ChannelDescriptionScreen';
import PostDetails from './screens/PostDetails';
import UploadNewPost from './screens/UploadNewPost';
import AnalyticsScreen from './screens/AnalyticsScreen';
import JournalistSettings from './screens/JournalistSettings';
import JournalistProfile from './screens/JournalistProfile';
import JournalistAbout from './screens/JournalistAbout';
import DetailModal from './Modals/DetailModal';
import NotificationScreen from './screens/NotificationScreen';
import JounalistSignupScreen from './screens/JounalistSignupScreen';
import CreateChannelScreen from './screens/CreateChannelScreen';

const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();

const MainScreens = () => {
  return (
    <Tab.Navigator 
    initialRouteName="ReaderHome" 
    activeColor="#06CBD1"
    inactiveColor="#F2F2F2"
    barStyle={{ backgroundColor: '#08546B', marginBottom:-25 }}
  >
    <Tab.Screen
      name="ReaderHome"
      component={ReaderHome}
      options={{
        tabBarLabel: null || '',
        tabBarColor:'#08546B',
        tabBarIcon: ({ color }) => (
          <AntDesign name="home" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name="Search"
      component={SearchScreen}
      options={{
        tabBarIcon: ({ color }) => (
          <AntDesign name="search1" color={color} size={26} />
        ),
        tabBarLabel: null,
      }}
    />
    <Tab.Screen
      name="BookMark"
      component={BookmarkScreen}
      options={{
        tabBarIcon: ({ color }) => (
          <AntDesign name="book" color={color} size={26} />
        ),
        tabBarLabel: null,
      }}
    />
    <Tab.Screen
      name="Settings"
      component={SettingsScreen}
      options={{
        tabBarIcon: ({ color }) => (
          <AntDesign name="setting" color={color} size={26} />
        ),
        tabBarLabel: null,
      }}
    />
  </Tab.Navigator>
  );
};

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen
          name="MainScreens"
          component={MainScreens}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="SelectUser" component={SelectUser} options={{ headerShown: false }}/>
         <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }}/>
         <Stack.Screen name="Signup" component={SignupScreen} options={{ headerShown: false }}/>
         <Stack.Screen name="JournalistSignup" component={JounalistSignupScreen} options={{ headerShown: false }}/>
         <Stack.Screen name="About" component={AboutScreen} options={{ headerShown: false }}/>
         <Stack.Screen name="Terms" component={TermsScreen} options={{ headerShown: false }}/> 
         <Stack.Screen name="Verify" component={VerificationScreen} options={{ headerShown: false }}/>
         <Stack.Screen name="SelectChannel" component={SelectChannels} options={{ headerShown: false }}/>
         <Stack.Screen name="EditProfile" component={EditProfile} options={{ headerShown: false }}/>
         <Stack.Screen name="ChannelDescription" component={ChannelDescriptionScreen} options={{ headerShown: false }}/>
         <Stack.Screen name="PostDetails" component={PostDetails} options={{ headerShown: false }}/>
         <Stack.Screen name="UploadPost" component={UploadNewPost} options={{ headerShown: false }}/>
         <Stack.Screen name="Analytics" component={AnalyticsScreen} options={{ headerShown: false }}/>
         <Stack.Screen name="JournalistSettings" component={JournalistSettings} options={{ headerShown: false }}/>
         <Stack.Screen name="JournalistProfile" component={JournalistProfile} options={{ headerShown: false }}/>
         <Stack.Screen name="JournalistAbout" component={JournalistAbout} options={{ headerShown: false }}/>
         <Stack.Screen name="Details" component={DetailModal} options={{ headerShown: false }}/>
         <Stack.Screen name="notification" component={NotificationScreen} options={{headerShown:false}}/>
         <Stack.Screen name="CreateChannel" component={CreateChannelScreen} options={{headerShown:false}}/>
         
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;