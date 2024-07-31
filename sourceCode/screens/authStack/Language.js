import React, { useState } from 'react';
import { View, Text,StyleSheet, Image, ImageBackground} from 'react-native';
import { useTranslation } from 'react-i18next';
import '../../components/i18n';
import LanguageButton from './Languagebutton'



const Start = () => {
  const { t, i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  const languages = [
    { name: 'हिन्दी', code: 'hi', flag: require('../../assets/Images/india.png') },
    { name: 'ਪੰਜਾਬੀ', code: 'pb', flag: require('../../assets/Images/india.png') },
    { name: 'English', code: 'en', flag: require('../../assets/Images/uk.png') },
  ];

  const changeLanguage = (code) => {
    i18n.changeLanguage(code);
    setSelectedLanguage(code);
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={require('../../assets/Images/background.png')} style={styles.backgroundImage}>
        <View style={styles.overlay}>
          <Image source={require('../../assets/Images/logo.png')} style={styles.icon} />
          <Text style={styles.title}>{t('choose your preferred language')}</Text>
          <Text style={styles.subtitle}>{t('please select your language')}</Text>
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
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  icon: {
    width: 90,
    height: 110,
    top:60,
    position:"absolute",
    margin:30,
    alignSelf:"flex-start",
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    fontFamily:'MontserratAlternates-Bold',
    marginBottom: 20,
    color:'black',
    width:302,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowRadius: 8,
    textShadowOffset: { width: 3, height: 2 }
  },
  subtitle: {
    fontSize: 16,
    color: 'grey',
    marginBottom: 20,
    width:302,
  },
});

export default Start;