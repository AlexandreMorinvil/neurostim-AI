import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-paper';

import * as queryService from "../../../../services/query.service";
import { COLOR_BACKGROUND } from '../../../../styles/colors.style';
import { Query } from '../../../../class/query.class';

const TITLE_SECTION = "Queries History";

const TEXT_BUTTON_SET_AS_ERROR = "Set As Error"

const SectionQuriesHistory = () => {

  /**
   * States
   */
  const [stateHistoricQueriesList, setStateHistoricQueriesList] = useState([]);

  /**
   * Functions
   */
  const updateHistory = () => {
    setStateHistoricQueriesList(queryService.getQueriesHistoryList());
  }

  /**
   * Effects 
   */
  useEffect(() => {
    // Initialization
    updateHistory();

    // Reactive subcribtion
    const subscription = queryService.subject.subscribe({
      next: updateHistory
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
    <View style={styles.container}>
      <Text style={styles.title}> {TITLE_SECTION} </Text>

      {stateHistoricQueriesList.slice().reverse().map((query, index, array) => {
        return (
          <View style={styles.queryElementSubSection}>
            <View>
              <Text style={styles.queryHeader}>Query #{array.length - index}</Text>
              <Text>Values : {JSON.stringify(query.getParametersValueList())}</Text>
              <Text>Sugg.  : {JSON.stringify(query.getRecommendedValuesList())}</Text>
              <Text>Tremor : {JSON.stringify(query.getTremorValue())}</Text>
            </View>
            <Button
              mode="elevated"
              dark={false}
              onPress={() => { }}
              uppercase={true}
              disabled={false}
            >
              <Text>{TEXT_BUTTON_SET_AS_ERROR}</Text>
            </Button>
          </View>
        );
      })

      }
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
    alignItems: "stretch",
    backgroundColor: COLOR_BACKGROUND.ItemSection,
    borderRadius: 10,
    padding: 30,
  },
  title: {
    fontWeight: "bold",
    textAlign: "center",
  },
  queryElementSubSection: {
    backgroundColor: COLOR_BACKGROUND.ItemSubSection,
    borderRadius: 10,
    padding: 20,
    marginTop: 10
  },
  queryHeader: {
    fontWeight: "bold",
    textAlign: "center"
  }
});

export default SectionQuriesHistory;