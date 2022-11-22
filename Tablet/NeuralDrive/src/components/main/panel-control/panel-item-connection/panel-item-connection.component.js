import React from 'react';
import { StyleSheet } from 'react-native';

import IndicatorConnection from "./indicator-connection.component";
import PanelItem from '../../panel-item.component';


import * as Structures from "../../../Structures";

const ITEM_TITLE = "Connection Status";

const PanelItemConnection = () => {

  /**
   * Render
   */
  return (
    <PanelItem
      isActive={true}
      title={ITEM_TITLE}
    >
      <Structures.FlexContainer flex={0.7}
        flexDirection={'column'}
        jc={'flex-start'}
        alignItems="center"
        pad="0"
        bgColor={'#00000000'}>
        <IndicatorConnection
          device={'server'}
          checkConnectionFunction={() => true}
        />
        <IndicatorConnection
          device={'watch'}
          checkConnectionFunction={() => true}
        />
      </Structures.FlexContainer>
    </PanelItem>
  );
};

export default PanelItemConnection;