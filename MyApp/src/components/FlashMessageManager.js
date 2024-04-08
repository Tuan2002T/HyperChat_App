import React from 'react';
import FlashMessage from 'react-native-flash-message';

const FlashMessageManager = ({ children }) => (
  <>
    {children}
    <FlashMessage position="top" />
  </>
);

export default FlashMessageManager;