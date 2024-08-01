/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next';
import '../../../components/i18n';
// import LanguageButton from './langbutton';
 function LanguageButton({ language, isSelected, onPress }) {
  return (
    <TouchableOpacity
      style={[
        styles.languageButton,
        isSelected && styles.selectedLanguageButton,
      ]}
      onPress={onPress}
    >
      <View style={styles.flagContainer}><Image source={language.flag} style={styles.flag} /></View>
      <Text style={styles.languageText}>{language.name}</Text>
      <View></View>
    </TouchableOpacity>
  );
}


const Language = () => {
  const { t, i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const navigation = useNavigation()

  const languages = [
    { name: 'हिन्दी', code: 'hi', flag: require('../../../assets/Images/download1.png') },
    { name: 'ਪੰਜਾਬੀ', code: 'pb', flag: require('../../../assets/Images/download1.png') },
    { name: 'English', code: 'en', flag: require('../../../assets/Images/download1.png') },
  ];

  const changeLanguage = (code) => {
    i18n.changeLanguage(code);
    setSelectedLanguage(code);
    navigation.replace("GetStarted");

  };

  return (
    <View style={styles.container}>
      <ImageBackground source={require('../../../assets/Images/backgroundimg.png')} style={styles.backgroundImage}>
        <View style={styles.overlay}>
          <><Image source={require('../../../assets/Images/translation1.png')} style={styles.icon} /><Text style={styles.title}>{t('Choose Your Preferred Language')}</Text><Text style={styles.subtitle}>{t('please select your language')}</Text></>
          {languages.map((language) => (
            <LanguageButton
              key={language.code}
              language={language}
              isSelected={selectedLanguage === language.code}
              onPress={() => changeLanguage(language.code)}
            />
          ))}
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'right',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding:30,
  },
  icon: {
    width: 110,
    height: 110,
    marginBottom: 25,
  },
  title: {
    fontSize: 36,
    fontWeight: '600',
    marginBottom: 10,
    color:'black',
    textShadowColor:'rgba(0, 0, 0, 0.25)',
    textShadowRadius:8,
    textShadowOffset: { width: 4 , height: 4},
  },
  subtitle: {
    fontSize: 16,
    color: '#888888',
    marginBottom: 20,
  },
  languageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 15,
    marginVertical: 5,
    width: '98%',
    height:74,
    
    borderRadius: 13,
    // borderWidth: 1,
    // borderColor: '#DDDDDD',
    shadowColor:'black',
    elevation:7,
    

  },
  selectedLanguageButton: {
    borderColor: '#000000',
  },
  flag: {
    width: 20,
    height: 15,
    marginRight:0,
    padding:0,

    
  },
  languageText: {
    fontSize: 20,
    fontWeight:'600',
    paddingLeft:20,
    // backgroundColor:'red',
    color:'black',
  },
  flagContainer:{
     backgroundColor:'grey',
     padding:10,
     borderRadius:100,

 },

});

export default Language;