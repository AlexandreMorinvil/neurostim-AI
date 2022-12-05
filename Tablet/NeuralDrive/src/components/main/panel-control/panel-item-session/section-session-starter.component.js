import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Text} from 'react-native-paper';
import {Stopwatch} from 'react-native-stopwatch-timer';

import {postStartNewSession} from '../../../../services/http-request.service';
import * as problemDimensionTypeService from '../../../../services/problem-dimension-type.service';
import {COLOR_BACKGROUND} from '../../../../styles/colors.style';
import DialogSaveSession from './dialog-save-session/dialog-save-session';

const TEXT_TIMER_HEADER = 'Session Time';

const SectionSessionStarter = () => {
  const [value, setValue] = React.useState(0);

  // stopwatch
  const [sessionStarted, setSessionStarted] = React.useState(false);
  const [stopwatchReset, setStopwatchReset] = React.useState(false);

  // reference to dialog when session end
  const dialogRef = React.useRef();

  /**
   * Render
   */
  return (
    <View style={styles.container}>
      <View style={styles.timerSubSection}>
        <Text style={styles.timerHeaderText}> {TEXT_TIMER_HEADER} </Text>
        <Stopwatch
          start={sessionStarted}
          reset={stopwatchReset}
          options={styles.stopwatchOptions}
        />
      </View>
      <Button
        style={styles.button}
        icon={sessionStarted ? 'stop' : 'play'}
        mode="elevated"
        buttonColor={sessionStarted ? '#CC958F' : '#A3D9A3'}
        dark={false}
        loading={false}
        onPress={async () => {
          if (!sessionStarted) {
            let status = await postStartNewSession(
              problemDimensionTypeService.getProblemDimensionsList(),
            );
            session_status = status;
          } else {
            dialogRef.current.showDialog();
          }
          setValue(value => value + 1);

          // stopwatch
          setSessionStarted(!sessionStarted);

          if (sessionStarted) {
            // TODO: get start time
            // time = getTime()
          } else {
            // TODO: get end time
            // time = getTime()
            setStopwatchReset(true);
            setStopwatchReset(false);
          }
        }}
        uppercase={true}>
        <Text
          variant="labelLarge"
          adjustsFontSizeToFit={true}
          numberOfLines={1}>
          {!sessionStarted ? 'start session' : 'stop session'}
        </Text>
      </Button>
      <DialogSaveSession ref={dialogRef}></DialogSaveSession>
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
    padding: 30,
  },
  button: {
    marginTop: 10,
  },
  timerSubSection: {
    backgroundColor: COLOR_BACKGROUND.ItemSubSection,
    padding: 10,
    borderRadius: 10,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  timerHeaderText: {
    fontWeight: 'bold',
  },
  stopwatchOptions: {
    container: {
      backgroundColor: '#00000000',
      padding: 0,
      borderRadius: 15,
      width: 150,
      alignItems: 'center',
    },
    text: {
      fontSize: 25,
      color: '#000',
    },
  },
});

export default SectionSessionStarter;
