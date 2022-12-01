import * as React from 'react';
import { Modal, Portal, Text, Button, Provider } from 'react-native-paper';
import { View, StyleSheet, ScrollView } from 'react-native';
import SettingsMenuItemConnectionBackend from '../../settings/menu-item-connection-backend/menu-item-connection-backend.component';

const ModalServer = () => {
  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {backgroundColor: 'white', padding: 20};

  return (
    // <Provider>
    <View>
      <Portal>
        <Modal style={styles.modalWindow} visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
          <ScrollView>
          <Text>
            You have been disconnected from the server
          </Text>
          <SettingsMenuItemConnectionBackend accordionIsActive={true}/>
          </ScrollView>
        </Modal>
      </Portal>
      <Button style={{marginTop: 30}} onPress={showModal}>
        Show
      </Button>
    </View>
    // </Provider>
  );
};

const styles = StyleSheet.create({
  modalWindow: {
    margin: 200,
    borderRadius: 25,
  },
});

export default ModalServer;
