import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

import IndicatorConnection from './indicator-connection.component';
import {COLOR_BACKGROUND} from '../../../../styles/colors.style';
import * as connectionBackendService from '../../../../services/connection-backend.service';
import * as connectionWatchService from '../../../../services/connection-watch.service';

const TEXT_CONNECTIONS_HEADER = 'Connections Status';

const SectionConnectionStatus = props => {
  /**
   * Props
   */
  const {style} = props;

  /**
   * Render
   */
  return (
    <View style={[styles.container, props.style]}>
      <Text style={styles.connectionsHeaderText}>
        {' '}
        {TEXT_CONNECTIONS_HEADER}{' '}
      </Text>
      <IndicatorConnection
        device={'backend'}
        checkConnectionFunction={() =>
          connectionBackendService.getIsConnectedStatus()
        }
      />
      <IndicatorConnection
        device={'watch'}
        checkConnectionFunction={() =>
          connectionWatchService.getIsConnectedStatus()
        }
      />
    </View>
  );
};

/**
 * Style Sheet
 */
const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLOR_BACKGROUND.ItemSection,
    borderRadius: 10,
    padding: 20,
    paddingLeft: 40,
    paddingRight: 40,
  },
  connectionsHeaderText: {
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
  },
});

export default SectionConnectionStatus;
