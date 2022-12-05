import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Text} from 'react-native-paper';
import {Subject} from 'rxjs';

import InputQueryParameter from './input-query-parameter.component';
import OutputDisplayTremorMetric from './output-display-tremor-metric.component';
import PanelItem from '../../panel-item.component';

import {mainStyles} from '../../../../styles/main.styles';
import MessageBubble from '../../../message-bubble.component';
import * as problemDimensionTypeService from '../../../../services/problem-dimension-type.service';
import * as queryService from '../../../../services/query.service';
import * as tremorPointService from '../../../../services/tremor-point.service';
import {SettingsMessageType} from '../../../../const/settings';

const ITEM_TITLE = 'Input Parameters';

const BUTTON_TEXT_QUERY = 'PERFORM QUERY';
const BUTTON_TEXT_RESET = 'RESET TO RECOMMENDED';

const TEXT_FILL_ALL_VALUES = 'Please, fill all the values';

const IMPOSED_VALUE_TYPE_SUGGESTED = 'suggested';

const PanelItemParameters = () => {
  /**
   * States
   */
  const [stateIsQuerying, setStateIsQuerying] = useState(false);
  const [stateIsFirstQurey, setStateIsFirstQuery] = useState(
    !queryService.hasDoneQueryPreviously(),
  );
  const [stateParametersList, setStateParametersList] = useState(
    problemDimensionTypeService.getParametersList(),
  );
  const [
    stateSelectedParametersValueList,
    setStateSelectedParametersValueList,
  ] = useState(problemDimensionTypeService.getDefaultValuesList());
  const [
    stateSuggestedParametersValueList,
    setStateSuggestedParametersValueList,
  ] = useState(problemDimensionTypeService.getDefaultValuesList());
  const [
    statePreviousParametersValueList,
    setStatePreviousParametersValueList,
  ] = useState([]);

  const [stateAreValuesReadyForQuery, setStateAreValuesReadyForQuery] =
    useState(false);

  const [stateSubject] = useState(new Subject());

  /**
   * Functions
   */
  const changeParametersUsed = () => {
    setStateParametersList(problemDimensionTypeService.getParametersList());
    setStateSelectedParametersValueList(
      problemDimensionTypeService.getDefaultValuesList(),
    );
    setStateSuggestedParametersValueList(
      problemDimensionTypeService.getDefaultValuesList(),
    );
    setStatePreviousParametersValueList(
      problemDimensionTypeService.getDefaultValuesList(),
    );
  };

  const performQuery = async () => {
    try {
      setStateIsQuerying(true);
      await queryService.performQuery(
        stateSelectedParametersValueList,
        tremorPointService.getAveragedTremorMetric(),
      );
      setStateSuggestedParametersValueList(
        queryService.getCurrentSuggestedParametersList(),
      );
      setStatePreviousParametersValueList(
        queryService.getLastQueryParametersList(),
      );
      updateStatus();
      setAllParameterValuesToSuggestedValues();
      setStateIsQuerying(false);
    } catch (error) {
      setStateIsQuerying(false);
      console.error(error);
    }
  };

  const setParameterValue = (index, value) => {
    const currentParameterValuesList = stateSelectedParametersValueList.slice();
    currentParameterValuesList[index] = value;
    setStateSelectedParametersValueList(currentParameterValuesList);
  };

  const setAllParameterValuesToSuggestedValues = () => {
    // setStateSelectedParametersValueList(
    //   stateSuggestedParametersValueList.map(value => String(value)),
    // );
    stateSubject.next(IMPOSED_VALUE_TYPE_SUGGESTED);
  };

  const updateStatus = () => {
    setStateIsFirstQuery(!queryService.hasDoneQueryPreviously());
    verifyIfAllInputsAreReady();
  };

  const verifyIfAllInputsAreReady = () => {
    let areAllInputsReady = true;
    for (
      let index = 0;
      index < stateSelectedParametersValueList.length;
      index++
    ) {
      const parameter = stateParametersList[index];
      const value = stateSelectedParametersValueList[index];
      const {isAccepted} = parameter.isValueAccepted(value);
      if (!isAccepted || (!value && value === '')) areAllInputsReady = false;
    }
    setStateAreValuesReadyForQuery(areAllInputsReady);
  };

  /**
   * Effects
   */
  useEffect(() => {
    // Initialization
    changeParametersUsed();

    // Reactive subcribtion
    const subscription = problemDimensionTypeService.subject.subscribe({
      next: changeParametersUsed,
    });

    // Cleanup
    return function cleanup() {
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    updateStatus();
  }, [stateSelectedParametersValueList]);

  /**
   * Render
   */
  return (
    <PanelItem isActive={true} title={ITEM_TITLE}>
      <View style={[mainStyles.sectionContent, styles.interSectionSpacing]}>
        {stateParametersList.map((parameter, index) => {
          return (
            <InputQueryParameter
              key={index}
              style={styles.interSubSectionSpacing}
              isFirstInput={stateIsFirstQurey}
              isDisabled={stateIsQuerying}
              parameter={parameter}
              parentSubject={stateSubject}
              previousValue={String(statePreviousParametersValueList[index])}
              suggestedValue={String(stateSuggestedParametersValueList[index])}
              setParentValueFunction={value => setParameterValue(index, value)}
              value={String(stateSelectedParametersValueList[index])}
            />
          );
        })}
        {!stateIsFirstQurey && (
          <Button
            icon="sync"
            mode="elevated"
            dark={false}
            loading={false}
            onPress={setAllParameterValuesToSuggestedValues}
            uppercase={true}
            disabled={stateIsQuerying}>
            <Text variant="labelLarge" adjustsFontSizeToFit={true}>
              {BUTTON_TEXT_RESET}
            </Text>
          </Button>
        )}
      </View>

      <View style={mainStyles.sectionContent}>
        <OutputDisplayTremorMetric
          style={styles.interSubSectionSpacing}
          isFrozen={stateIsQuerying}
        />
        <Button
          icon="tab-search"
          mode="elevated"
          dark={false}
          loading={stateIsQuerying}
          onPress={performQuery}
          uppercase={true}
          disabled={stateIsQuerying || !stateAreValuesReadyForQuery}>
          <Text variant="labelLarge" adjustsFontSizeToFit={true}>
            {BUTTON_TEXT_QUERY}
          </Text>
        </Button>
        {!stateAreValuesReadyForQuery && (
          <MessageBubble
            type={SettingsMessageType.DISABLED}
            message={TEXT_FILL_ALL_VALUES}
          />
        )}
      </View>
    </PanelItem>
  );
};

/**
 * Style Sheet
 */
const styles = StyleSheet.create({
  interSectionSpacing: {
    marginBottom: 10,
  },
  interSubSectionSpacing: {
    marginBottom: 10,
  },
  buttonArea: {
    backgroundColor: 'green',
  },
});

export default PanelItemParameters;
