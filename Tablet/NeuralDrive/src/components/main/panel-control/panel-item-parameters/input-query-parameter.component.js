import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';

import { SettingsMessageType } from '../../../../const/settings';
import { COLOR_BACKGROUND } from '../../../../styles/colors.style';
import MessageBubble from '../../../message-bubble.component';

const TEXT_INSERT_VALUE = `Insert value`;
const TEXT_SUGGESTED_VALUE = value => `Sug : ${value}`;
const TEXT_OLD_VALUE_BUTTON = 'Old';

const IMPOSED_VALUE_TYPE_SUGGESTED = 'suggested';

const InputQueryParameter = ({ setParentValueFunction, ...props }) => {
  /**
   * Props
   */
  const {
    isDisabled,
    isFirstInput,
    parameter,
    previousValue,
    parentSubject,
    suggestedValue,
    value,
    style,
  } = props;

  /**
   * States
   */
  const [stateIsDisabled, setStateIsDisabled] = useState(isDisabled);
  const [stateIsFirstInput, setStateIsFirstInput] = useState(isFirstInput);
  const [stateParameter, setStateParameter] = useState(parameter);
  const [stateSuggestedValue, setStateSuggestedValue] = useState(suggestedValue);
  const [stateValue, setStateValue] = useState(String(value));
  const [statePreviousValue, setStatePreviousValue] = useState(previousValue);
  const [stateInvalidMessageReason, setStateInvalidMessageReason] = useState('');
  const [stateMustDisplayInvalidityReason, setStateMustDisplayInvalidityReason] = useState(false);
  const [stateIsInFocus, setStateIsInFocus] = useState(true);
  const [stateLabelText, setStateLabelText] = useState(TEXT_INSERT_VALUE);

  /**
   * Functions
   */
  const isValueEmpty = () => {
    return !Boolean(stateValue);
  };

  const setValue = newValue => {
    updateMustDisplayInvalidityMessage(newValue);
    const { isAccepted, reason } = stateParameter.isValueAccepted(newValue);
    const currentValue = stateValue;
    setParentValueFunction(
      isAccepted ? String(newValue) : String(currentValue),
    );
    setStateValue(isAccepted ? String(newValue) : String(currentValue));
  };

  const setValueToPreviousValue = () => {
    setValue(String(statePreviousValue));
  };

  const makeTitleText = () => {
    const name = stateParameter.getName();
    return `${name}`;
  };

  const updateLabelText = () => {
    if (stateIsFirstInput) {
      if (isValueEmpty()) setStateLabelText(TEXT_INSERT_VALUE);
      else setStateLabelText(stateParameter.getName());
    } else {
      if (Number(stateValue) === Number(stateSuggestedValue))
        setStateLabelText('');
      else setStateLabelText(TEXT_SUGGESTED_VALUE(stateSuggestedValue));
    }
  };

  const makePreviousButtonText = () => {
    if (stateIsFirstInput) return TEXT_OLD_VALUE_BUTTON;
    else return statePreviousValue;
  };

  const makeRangeText = () => {
    const minimumValue = stateParameter.getMinimumValue();
    const maximumValue = stateParameter.getMaximumValue();
    const unit = stateParameter.getUnit();
    return `{ ${minimumValue}, ${minimumValue + 1}, ${minimumValue + 2
      }, ... , ${maximumValue} } ${unit}`;
  };

  const updateMustDisplayInvalidityMessage = (attemptedValue = stateValue) => {
    const { isAccepted, reason } = stateParameter.isValueAccepted(attemptedValue);
    const isAttemptedValueEmpty = String(attemptedValue).length === 0;
    setStateInvalidMessageReason(reason);
    if (!stateIsInFocus || isAttemptedValueEmpty)
      setStateMustDisplayInvalidityReason(false);
    else if (isAccepted) setStateMustDisplayInvalidityReason(false);
    else setStateMustDisplayInvalidityReason(true);
  };

  const handleEnterInputFocus = () => {
    setStateIsInFocus(true);
    updateMustDisplayInvalidityMessage();
  };

  const handleEndEdittingValue = () => {
    setStateIsInFocus(false);
    updateMustDisplayInvalidityMessage();
  };

  const setToValueImposedByParent = (valueType) => {
    switch (valueType) {
      case IMPOSED_VALUE_TYPE_SUGGESTED:
        setValue(stateSuggestedValue);
        break;
      default:
        break;
    }
  }

  /**
   * Effects
   */
  useEffect(() => {
    setStateIsDisabled(props.isDisabled);
    setStateIsFirstInput(props.isFirstInput);
    setStateParameter(props.parameter);
    setStatePreviousValue(props.previousValue);
    setStateSuggestedValue(props.suggestedValue);
    setStateValue(props.value);
    updateMustDisplayInvalidityMessage();
    updateLabelText();
  }, [
    props.isDisabled,
    props.isFirstInput,
    props.parameter,
    props.previousValue,
    props.suggestedValue,
    props.value,
  ]);

  useEffect(() => {
    updateMustDisplayInvalidityMessage();
    updateLabelText();
  }, []);

  useEffect(() => {
    // Reactive subcribtion
    const subscription = parentSubject.subscribe({
      next: setToValueImposedByParent
    });

    // Cleanup
    return function cleanup() {
      subscription.unsubscribe()
    }
  }, [])

  /**
   * Render
   */
  return (
    <View style={[styles.container, props.style]}>
      <View style={styles.textArea}>
        <Text style={styles.title}>{makeTitleText()}</Text>
        <Text style={styles.precision}>{makeRangeText()}</Text>
      </View>

      <View style={styles.controlArea}>
        {!stateIsFirstInput && (
          <Button
            disabled={stateIsDisabled || stateIsFirstInput}
            style={styles.previousValueButton}
            icon="sync"
            mode="elevated"
            dark={false}
            loading={false}
            onPress={setValueToPreviousValue}
            uppercase={true}>
            <Text variant="labelLarge" adjustsFontSizeToFit={true}>
              {makePreviousButtonText()}
            </Text>
          </Button>
        )}

        <TextInput
          style={[
            styles.input,
            styles.textInput,
            stateIsDisabled && styles.disabledText,
          ]}
          mode="outlined"
          disabled={stateIsDisabled}
          activeOutlineColor="black"
          outlineColor="white"
          selectionColor="#6f6f6f"
          multiline={false}
          value={stateValue}
          onChangeText={setValue}
          onEndEditing={handleEndEdittingValue}
          onFocus={handleEnterInputFocus}
          textColor="black"
          label={stateLabelText}
          dense={true}
          keyboardType="numeric"
          defaultValue={''}
        />
      </View>

      {stateMustDisplayInvalidityReason && (
        <MessageBubble
          type={SettingsMessageType.WARNING}
          message={stateInvalidMessageReason}
        />
      )}
    </View>
  );
};

/**
 * Style Sheet
 */
const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR_BACKGROUND.ItemSubSection,
    borderRadius: 10,
    padding: 20,
  },
  textArea: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  controlArea: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
  },
  precision: {},
  previousValueButton: {
    marginRight: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
  },
  input: {
    flex: 1,
    color: 'black',
    textAlign: 'center',
  },
  disabledText: {
    backgroundColor: '#BBBBBB',
  },
});

export default InputQueryParameter;
