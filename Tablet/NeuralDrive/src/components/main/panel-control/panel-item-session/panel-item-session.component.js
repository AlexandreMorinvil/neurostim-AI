import React from 'react';
import { StyleSheet } from 'react-native';

import PanelItem from '../../panel-item.component';
import SectionConnectionStatus from './section-connection-status.component';
import SectionSessionStarter from './section-session-starter.component';
import SectionModalButtons from './section-temporary-modalbuttons';

const ITEM_TITLE = "Session Management";

const PanelItemSession = () => {

  /**
   * Render
   */
  return (
    <PanelItem
      isActive={true}
      title={ITEM_TITLE}
    >
      <SectionConnectionStatus style={styles.spacing} />
      <SectionSessionStarter />
      <SectionModalButtons/>
    </PanelItem>
  );
};

/**
 * Style Sheet
 */
const styles = StyleSheet.create({
  spacing: {
    marginBottom: 10
  }
});

export default PanelItemSession;
