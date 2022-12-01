import React from 'react';
import { StyleSheet, View, Text} from 'react-native';

import ModalWatch from "../../modal-pages/modal-page-watch";
import ModalServer from "../../modal-pages/modal-page-server";
import { COLOR_BACKGROUND } from '../../../../styles/colors.style';

const TEXT_MODALBUTTONS_HEADER = "Temporary Modal Buttons"

const SectionModalButtons = (props) => {

  /**
   * Props
   */
  const { style } = props;

  /**
   * Render
   */
  return (
    <View style={[
      styles.container,
      props.style
    ]}>
      <Text style={styles.connectionsHeaderText}> {TEXT_MODALBUTTONS_HEADER} </Text>
      <ModalServer/>
      <ModalWatch/>
    </View>
  );
};

/**
 * Style Sheet
 */
const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLOR_BACKGROUND.ItemSection,
    borderRadius: 10,
    padding: 20,
    paddingLeft: 40,
    paddingRight: 40,
    marginTop: 10,
  },
  connectionsHeaderText: {
    fontWeight: "bold",
    marginBottom: 10
  }
});

export default SectionModalButtons;
