import React, { useState } from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';

import { COLOR_BACKGROUND } from '../styles/colors.style.js';
import PanelControl from '../components/main/panel-control/panel-control.component.js';
import PanelVizualization from "../components/main/panel-visualization/panel-visualization.component";
// import PortalHost from 'react-native-paper/lib/typescript/components/Portal/PortalHost.js';
import { Portal } from 'react-native-paper';

const MainView = () => {

  /**
 * States
 */
  const [stateIsOrientationHorizontal, setstateIsOrientationHorizontal] = useState(true);

  /**
   * Functions
   */
  const updateLayout = () => {
    const screenWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').height;
    setstateIsOrientationHorizontal(screenWidth > screenHeight);
  }

  /**
   * Render
   */
  return (
    // <Portal.Host>
      <Portal.Host>
    <View
      style={[
        styles.viewContainer,
        stateIsOrientationHorizontal ? styles.horizontalOrientation : styles.verticalOrientation,
      ]}
      onLayout={updateLayout}
    >
      <View style={styles.controlPanelArea} >
        <PanelControl />
      </View>
      <View style={styles.vizualizationPanelArea} >
        <PanelVizualization />
      </View>
    </View>
      </Portal.Host>
    // </Portal.Host>

  );
}

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    backgroundColor: COLOR_BACKGROUND.Application,
    height: 200,
    padding:
      0,
  },
  horizontalOrientation: {
    flexDirection: "row",
  },
  verticalOrientation: {
    flexDirection: "column",
  },
  controlPanelArea: {
    flex: 1,
    minWidth: 300,
    minHeight: 300,
  },
  vizualizationPanelArea: {
    flex: 2,
    minWidth: 500,
    minHeight: 500,
  }
});

export default MainView;
