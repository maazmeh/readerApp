import { StyleSheet } from 'react-native';

export const sidebarStyles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    // justifyContent: 'center',
  },
  profileContainer:{
     paddingLeft: 20, 
     paddingTop:30, 
     flexDirection: 'row', 
     alignItems: 'center' 
  },
  profileImage:{
    width: 75, 
    height: 75, 
    marginRight: 5 
  },
  username:{
     color: 'white', 
     fontSize: 18, 
     fontWeight: 'bold' 
  },
  ratingContainer:{
    flexDirection: 'row', 
    alignItems: 'center' 
  },
  rating:{
    color: 'white', 
    marginLeft: 5, 
    fontSize: 14
  },
  optionContainer:{
    flexDirection: 'row', 
    alignItems: 'center', 
    padding: 10,
    backgroundColor:'white', 
    paddingRight:10, 
    width:'90%', 
    borderRadius:14, 
    marginLeft:2,
    marginBottom:10
  },
  optionText:{
    color: '#ee6dca', 
    marginLeft: 10, 
    fontSize: 16
  },
  riderButton:{
    backgroundColor: '#007eff', 
    padding: 8,
    borderRadius: 18,
    marginBottom:15, 
    alignSelf:'center', 
    marginTop:20,
    width: '65%'
  },
  riderText:{
    color: 'white', 
    textAlign: 'center'
   },
   socialMediaContainer:{ 
    flexDirection: 'row', 
    justifyContent: 'center', 
    alignItems: 'center', 
    paddingBottom: 20 
   },
   socialImage: { 
    width: 40, 
    height: 40, 
    marginHorizontal: 10 
   },
   compulsoryText:{
    color:'red', 
    marginTop:-5, 
    paddingLeft:5, 
    paddingBottom:5
   },
  //  for selected card 2
  switchCardContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    elevation: 5,
    margin: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  tabButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  tabText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555',
  },
  selectedTab: {
    borderRadius:24
  },
  selectedTabText: {
    color: '#ef6ccc',
    fontSize: 18,
  },
  content: {
    padding: 10,
  },
});