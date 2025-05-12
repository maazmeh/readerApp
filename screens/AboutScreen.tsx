import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text, TouchableOpacity, StyleSheet, Switch } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

const AboutScreen: React.FC = ({ navigation, route }) => {
  const { type } = route.params;
  const [selectedOption, setSelectedOption] = useState('Monthly');
  const [isAutoRecurring, setIsAutoRecurring] = useState(false);

  useEffect(() => {
    console.log("type =>", type);
  }, [type]);

  const goBack = () => {
    navigation.navigate('MainScreens');
  }
  
  
  const renderContent = () => {
    switch (type) {
      case 'Subscription':
        return (
          <View style={{padding:15}}>
      <TouchableOpacity
        style={[styles.option, selectedOption === 'Monthly' && styles.selectedOption]}
        onPress={() => setSelectedOption('Monthly')}>
        <View style={styles.optionHeader}>
          <Text style={styles.optionTitle}>Monthly</Text>
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>50% OFF</Text>
          </View>
        </View>
        <Text style={styles.optionSubtitle}>Cancel at anytime</Text>
        <Text style={styles.optionPrice}>$3.99</Text>
        <Text style={styles.optionDescription}>*Free trial for one month</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.option, selectedOption === 'Free' && styles.selectedOption]}
        onPress={() => setSelectedOption('Free')}>
        <Text style={styles.optionTitle}>Free</Text>
        <Text style={styles.optionSubtitle}>Lorem Ipsum is simply dummy</Text>
        <Text style={styles.optionPrice}>$0</Text>
        <Text style={styles.optionDescription}>7 Day trials</Text>
      </TouchableOpacity>

      <View style={styles.autoRecurringContainer}>
        <Text style={styles.autoRecurringText}>Auto recurring</Text>
        <Switch
          value={isAutoRecurring}
          onValueChange={setIsAutoRecurring}
        />
      </View>

      <Text style={styles.yearlyPrice}>
        <Text style={styles.originalPrice}>$79.99/year</Text> {' '}
        <Text style={styles.discountedPrice}>$39.99/year (50% OFF)</Text>
      </Text>

      <TouchableOpacity style={styles.subscribeButton}>
        <Text style={styles.subscribeButtonText}>Subscribe Now</Text>
      </TouchableOpacity> 
          </View> 
        );
      case 'FAQ':
        return (
          <View>

          </View>
        );
      case 'About Us':
        return (
          <View>
            
          </View>
        );
        case 'Privacy & Policy':
          return (
            <View>
              
            </View>
          );
          case 'Terms & Conditions':
            return (
              <View>
                
              </View>
            );
            case 'Security':
              return (
                <View>
                  
                </View>
              );
      default:
        return <View></View>;
    }
  };

  return (
    <ScrollView style={styles.container}>
    <View style={styles.topRow}>
      <TouchableOpacity style={styles.menuIcon} onPress={() => goBack()}>
        <AntDesign name="left" size={25} color={'#08546B'} />
      </TouchableOpacity>
      <Text style={styles.title}>{type ? type : ''}</Text>
    </View>

   {renderContent()}

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
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
    color: '#777',
  },
  option: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
  },
  selectedOption: {
    borderColor: '#06CBD1',
    backgroundColor: '#f0f8ff',
  },
  optionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  optionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  discountBadge: {
    backgroundColor: '#06CBD1',
    borderRadius: 5,
    padding: 5,
  },
  discountText: {
    color: '#fff',
    fontSize: 12,
  },
  optionSubtitle: {
    fontSize: 14,
    color: '#777',
  },
  optionPrice: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 10,
  },
  optionDescription: {
    fontSize: 12,
    color: '#777',
  },
  autoRecurringContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 20,
  },
  autoRecurringText: {
    fontSize: 16,
  },
  yearlyPrice: {
    textAlign: 'center',
    marginBottom: 20,
  },
  originalPrice: {
    textDecorationLine: 'line-through',
    color: '#777',
  },
  discountedPrice: {
    fontWeight: 'bold',
  },
  subscribeButton: {
    backgroundColor: '#06CBD1',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  subscribeButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AboutScreen;