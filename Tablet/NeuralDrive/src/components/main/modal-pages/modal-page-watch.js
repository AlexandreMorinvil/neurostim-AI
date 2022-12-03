

import * as React from 'react';
import { View, ScrollView} from 'react-native';
import { Button, Paragraph, Dialog, Text,  Portal, Provider } from 'react-native-paper';
import SectionConnectionWatch from '../../settings/menu-item-connection-watch/section-connection-watch.component';

const ModalWatch = () => {
  const [visible, setVisible] = React.useState(false);

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);

  return (
      <View>
        <Button onPress={showDialog}>Show Dialog Watch</Button>
        <Portal>
          <Dialog visible={visible} onDismiss={hideDialog}>
            <Dialog.Title>Watch has been disconnected</Dialog.Title>
            <Dialog.Content>
              <Dialog.ScrollArea>
                <ScrollView>
                  <SectionConnectionWatch/>
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

export default ModalWatch;
