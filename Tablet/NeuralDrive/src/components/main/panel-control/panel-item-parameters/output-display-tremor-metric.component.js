import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import * as tremorPointService from '../../../../services/tremor-point.service';
import {COLOR_BACKGROUND} from '../../../../styles/colors.style';

const TITLE_TREMOR_METRIC = 'Average Tremor';
const UNIT_TREMOR_METRIC = 'm/s²';
const NUMBER_DECIMALS = 2;

const OutputDisplayTremorMetric = props => {
  /**
   * Props
   */
  const {isFrozen, style} = props;

  /**
   * States
   */
  const [stateTremorMetric, setStateTremorMetric] = useState(0);
  const [stateIsFrozen, setStateIsFrozen] = useState(isFrozen);

  /**
   * Function
   */
  const formatDisplayedValue = () => {
    return Number(stateTremorMetric).toFixed(NUMBER_DECIMALS);
  };

  const updateValue = () => {
    if (stateIsFrozen) return;
    setStateTremorMetric(tremorPointService.getTremorMetricToDisplay());
  };

  /**
   * Effects
   */
  useEffect(() => {
    // Initilization
    updateValue();

    // Reactive subcribtion
    const subscription = tremorPointService.subject.subscribe({
      next: updateValue,
    });

    // Cleanup
    return function cleanup() {
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    setStateIsFrozen(props.isFrozen);
  }, [props.isFrozen]);

  /**
   * Render
   */
  return (
    <View style={[styles.container, props.style]}>
      <Text style={styles.title}> {TITLE_TREMOR_METRIC} </Text>
      <View style={[styles.valueBox, stateIsFrozen && styles.disabledText]}>
        <Text style={{color: 'black'}}> {formatDisplayedValue()} </Text>
        <Text style={{color: 'black'}}> {UNIT_TREMOR_METRIC} </Text>
      </View>
    </View>
  );
};

/**
 * Style Sheet
 */
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLOR_BACKGROUND.ItemSubSection,
    borderRadius: 10,
    padding: 20,
  },
  title: {
    flex: 1,
    fontWeight: 'bold',
    color: 'black',
  },
  valueBox: {
    flex: 1,
    borderRadius: 5,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#EEEEEE',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  disabledText: {
    backgroundColor: '#BBBBBB',
  },
});

export default OutputDisplayTremorMetric;
