import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {SelectList} from 'react-native-dropdown-select-list';

import * as queryVizualizationService from '../../../../services/query-vizualization.service';
import {COLOR_BACKGROUND} from '../../../../styles/colors.style';

const TITLE_VIZUALIZATION_PARAMETER = 'Vizualization Parameter';

const SectionVizualizationParameters = props => {
  /**
   * Props
   */
  const {style} = props;

  /**
   * States
   */
  // TODO : Integrate the values of the "problem-diension.service" once it is properly implemented. We do not want hardcoded values!
  const [stateFirstSelectedParameter, setStateFirstSelectedParameter] =
    useState(0);
  const gaussianGraphSelectionParam = [
    {key: 0, value: 'Frequency'},
    {key: 1, value: 'Amplitude'},
  ];

  /**
   * Function
   */
  const commitFirstSelectedParameter = key => {
    queryVizualizationService.setFirstSelectedParameter(key);
  };

  /**
   * Render
   */
  return (
    <View style={[styles.container, props.style]}>
      <Text style={styles.title}> {TITLE_VIZUALIZATION_PARAMETER} </Text>
      <SelectList
        color="black"
        style={styles.picklist}
        setSelected={setStateFirstSelectedParameter}
        data={gaussianGraphSelectionParam}
        save="key"
        dropdownTextStyles={{color: 'black'}}
        onSelect={() =>
          commitFirstSelectedParameter(stateFirstSelectedParameter)
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
    alignItems: 'stretch',
    backgroundColor: COLOR_BACKGROUND.ItemSection,
    borderRadius: 10,
    padding: 20,
    paddingLeft: 40,
    paddingRight: 40,
  },
  picklist: {
    backgroundColor: 'white',
    width: 300,
    color: 'black',
  },
  connectionsHeaderText: {
    fontWeight: 'bold',
    marginBottom: 10,
  },
  title: {
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: 'black',
  },
});

export default SectionVizualizationParameters;
