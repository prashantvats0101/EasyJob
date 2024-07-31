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
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#DDDDDD',
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  selectedLanguageButton: {
    borderColor: 'grey',
  },
  flag: {
    width: 30,
    height: 30,
    marginRight: 10,
    borderRadius:15,
  },
  languageText: {
    fontSize: 23,
    color:'black',
  },
});

export default LanguageButton;