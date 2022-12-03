

import * as React from 'react';
import { View, ScrollView} from 'react-native';
import { Button, Text ,Paragraph, Dialog, Portal, Provider } from 'react-native-paper';
import SettingsMenuItemConnectionBackend from '../../settings/menu-item-connection-backend/menu-item-connection-backend.component';

const ModalServer = () => {
  const [visible, setVisible] = React.useState(false);

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);

  return (
      <View>
        <Button onPress={showDialog}>Show Dialog Server</Button>
        <Portal>
          <Dialog visible={visible} onDismiss={hideDialog}>
            <Dialog.Title>Server has been disconnected</Dialog.Title>
            <Dialog.Content>
              <Text variant='titleMedium'>
                1. Select the backend connection type
              </Text>
              <Text variant='titleMedium'>
                2. If you selected an external backend connection,
                   enter the corresponding IP address.
              </Text>
              <Dialog.ScrollArea style={{height: 600}}>
                <ScrollView>
                  <SettingsMenuItemConnectionBackend accordionIsActive={true}/>
                </ScrollView>
              </Dialog.ScrollArea>
              <Dialog.Actions>
                <Button onPress={hideDialog}>Done</Button>
              </Dialog.Actions>
            </Dialog.Content>
          </Dialog>
        </Portal>
      </View>
  );
};

export default ModalServer;
