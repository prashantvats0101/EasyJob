/* eslint-disable prettier/prettier */
import {StyleSheet, Text, View, ScrollView,TouchableOpacity} from 'react-native';
import React from 'react';
// import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next';
import '../../../components/i18n';


const selected = [
    {id:1, name: 'Internship', img : require('../../../assets/Images/file1.png')},
    {id:2, name: 'I need Job', img : require('../../../assets/Images/file3.png')},
    {id:3, name: 'I want to hire', img : require('../../../assets/Images/file2.png')},
];


const Selection = () => {
    const navigation = useNavigation();
    const { t } = useTranslation();
    const select = (name) => {
        switch (name) {
          case 'Internship':
            navigation.replace('Internship');
            break;
          case 'I need Job':
            navigation.replace('personalinfo');
            break;
          case 'I want to hire':
            navigation.replace('Hire');
            break;
          default:
            break;
        }
      };
  return (
      
    <SafeAreaView style={styles.contentContainer}>
    <View style={styles.container}>
      {selected.map((item) => (
          <TouchableOpacity style={styles.profile} onPress={() => select(item.name)}>
            <View style={styles.imgContainer}>
              <Image style={styles.image} source={item.img} resizeMode="contain"  />
            </View>
            <View style={styles.textcontainer}>
              <Text style={styles.text}>{t(item.name)}</Text>
            </View>
          </TouchableOpacity>
      ))}
    </View>
  </SafeAreaView>
);
};

export default Selection;

const styles = StyleSheet.create({
contentContainer: {
  flex: 1,
  backgroundColor: '#3DB2FF',
},
container: {
  flex: 1,
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: 30,
},
profile: {
  backgroundColor: '#3DB2FF',
  flex: 1,
},
imgContainer: {
  color: 'green',
  backgroundColor: '#85c4ee',
  height: 170,
  width: 170,
  borderRadius: 85,
  alignContent: 'center',
  justifyContent: 'center',
  alignItems: 'center',
  elevation: 8,
  shadowColor: 'black',
},
image: {
  height: 210,
},
textcontainer: {
  alignItems: 'center',
  paddingTop: 10,
},
text: {
  fontSize: 25,
  fontWeight:'bold',
},
});