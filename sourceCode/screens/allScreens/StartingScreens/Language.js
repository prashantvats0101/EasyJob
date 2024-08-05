import React, { useContext } from 'react';
import { View, Text, StyleSheet, Image, ImageBackground } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import '../../../language/i18n';
import LanguageButton from '../../../components/LanguageButton';
import { LanguageContext } from '../../../language/LanguageContext';

const Language = () => {
  const { t, i18n } = useTranslation();
  const navigation = useNavigation();
  const { selectedLanguage, changeLanguage } = useContext(LanguageContext);

  const languages = [
    { name: 'हिन्दी', code: 'hi', flag: require('../../../assets/Images/india.png') },
    { name: 'ਪੰਜਾਬੀ', code: 'pb', flag: require('../../../assets/Images/india.png') },
    { name: 'English', code: 'en', flag: require('../../../assets/Images/uk.png') },
  ];

  const handleLanguageChange = (code) => {
    i18n.changeLanguage(code);
    changeLanguage(code);
    navigation.replace('GetStarted');
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={require('../../../assets/Images/backgroundimg.png')} style={styles.backgroundImage}>
        <View style={styles.overlay}>
          <Image source={require('../../../assets/Images/translation.png')} style={styles.icon} />
          <Text style={styles.title}>{t('choose your\npreferred language')}</Text>
          <Text style={styles.subtitle}>{t('please select your language')}</Text>
          {languages.map((language) => (
            <LanguageButton
              key={language.code}
              language={language}
              isSelected={selectedLanguage === language.code}
              onPress={() => handleLanguageChange(language.code)}
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
    backgroundColor: 'rgba(255, 255, 255, 0)',
  },
  icon: {
    width: '20%',
    height: '20%',
    top: '8%',
    position: "absolute",
    resizeMode: 'contain',
    margin: 30,
    alignSelf: "flex-start",
  },
  title: {
    fontSize: 30,
    fontWeight: '600',
    marginBottom: 20,
    color: '#414141',
    width: 302,
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowRadius: 8,
    textShadowOffset: { width: 4, height: 4 }
  },
  subtitle: {
    fontSize: 16,
    color: 'grey',
    marginBottom: 20,
    width: 302,
  },
});

export default Language;
