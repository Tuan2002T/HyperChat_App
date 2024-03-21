//src/components/LanguageSelector.js
import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

const LanguageSelector = ({ currentLanguage, toggleLanguage }) => {
  return (
    <View style={styles.container}>
      <Pressable onPress={() => toggleLanguage('vi')}>
        <Text style={[styles.languageText, currentLanguage === 'vi' && styles.selectedLanguage]}>
          Tiếng Việt
        </Text>
      </Pressable>
      <Pressable onPress={() => toggleLanguage('en')}>
        <Text style={[styles.languageText, currentLanguage === 'en' && styles.selectedLanguage]}>
          English
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10, // Add some bottom margin to create space between LanguageSelector and other elements
  },
  languageText: {
    fontSize: 20,
    marginTop: 10,
    marginRight: 10,
    color: 'black',
  },
  selectedLanguage: {
    color: 'grey',
  },
});

export default LanguageSelector;
