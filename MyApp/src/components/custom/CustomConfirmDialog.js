import React from 'react';
import {Button, Dialog, Portal, Text} from 'react-native-paper';

const CustomConfirmDialog = ({visible, title, message, hideDialog, next}) => {
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={hideDialog}>
        <Dialog.Title>{title}</Dialog.Title>
        <Dialog.Content>
          <Text variant="bodyMedium">{message}</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button labelStyle={{color: '#EF4040'}} onPress={hideDialog}>
            Cancel
          </Button>

          <Button labelStyle={{color: '#76ABAE'}} onPress={next}>
            Sure
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default CustomConfirmDialog;
