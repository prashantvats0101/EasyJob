import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

const LanguageButton = ({ language, isSelected, onPress }) => (
  <TouchableOpacity
    style={[
      styles.languageButton,
      isSelected && styles.selectedLanguageButton,
    ]}
    onPress={onPress}
  >
    <Image source={language.flag} style={styles.flag} />
    <Text style={styles.languageText}>{language.name}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  languageButton: {
    flexDirection: "row",
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 15,
    marginVertical: 5,
    width: '80%',
    borderRadius: 13,
    shadowRadius:8,
    elevation:5,
  },
  selectedLanguageButton: {
    borderColor: 'black',
  },
  flag: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  languageText: {
    fontSize: 20,
    color:'black'
  },
});

export default LanguageButton;