import React, { useState } from 'react';
import { Button, Dialog, Portal, Text } from 'react-native-paper';

const CustomDialog = ({ visible, title, message, hideDialog }) => {
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={hideDialog}>
        <Dialog.Title>{title}</Dialog.Title>
        <Dialog.Content>
          <Text variant="bodyMedium">{message}</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button labelStyle={{ color: '#76ABAE' }} onPress={hideDialog}>
            Done
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default CustomDialog;
