import React from 'react';
import { View, ScrollView, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

const TermsScreen: React.FC = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.topRow}>
        <TouchableOpacity style={styles.menuIcon} onPress={() => navigation.openDrawer()}>
          <AntDesign name="menufold" size={25} color={'#ef6ccc'} />
        </TouchableOpacity>
        <Text style={styles.title}>Terms & Conditions</Text>
      </View>

      <View style={styles.modalContent}>
          <Text style={styles.bulletPoint}>- A subscriber can join and cancel as many times as they like.</Text>
          <Text style={styles.bulletPoint}>- The messaging times will be from 0900 -2100, 365 days a year with no limit to number of questions. </Text>
          <Text style={styles.bulletPoint}>- Response times will vary and are not guaranteed but are guaranteed a response within a 24 hour timeframe maximum. However, the responses will aim to be as quick as possible.</Text>
          <Text style={styles.bulletPoint}>- I understand that this Service is antenatal and postnatal ‘advice’ only and is not a medical advice service.  For any medical advice I understand that I must contact my local NHS maternity unit, community Midwife or emergency service, whichever is appropriate.  </Text>
          <Text style={styles.bulletPoint}>- I will not wait for a response on this app advice service before I contact my local NHS maternity service provider, if the matter is urgent or medically related.</Text>
          <Text style={styles.bulletPoint}>- All the advice given on this app is from a fully qualified, registered Midwife and is based on credible, reliable and professional sources of evidence based information. </Text>

          <Text style={styles.bulletPoint}>- Midwife messenger will not be held accountable or responsible for any actions taken on the advice provided by Midwife Messenger.  </Text>
          <Text style={styles.bulletPoint}>- All the responses given will be based on the information provided by the user. The messaging service must be for the sole use of the app subscriber and not for a third party. The advice on this app is strictly confidential and is not to be shared with others to offer advice, as each case is individual to the user.
The information should not be screen shotted or shared on social media.  If the user requires further information, is unsure, or disagrees with the advice provided on this app then they must contact NHS maternity services.  </Text>
          <Text style={styles.bulletPoint}>- Midwife Messenger holds the right to refuse to reply to any inappropriate or medical questions and the app user will be redirected accordingly. No abusive or harassing messages will be tolerated and app user will be removed and their accounts cancelled at Midwife Messengers discretion. </Text>

      </View>


    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffb5d0',
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
    color: '#ef6ccc',
    textAlign: 'center',
    marginTop: 14,
  },
  section: {
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#ef6ccc',
  },
  sectionContent: {
    fontSize: 16,
    color: '#666',
  },
  modalContent: {
    backgroundColor: 'transparent',
    borderRadius: 10,
    padding: 20,
    width: '100%',
    height: '100%',
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  bulletPoint: {
    marginBottom: 10,
  },
});

export default TermsScreen;