import React, {useState, useRef} from 'react';
import {View, StyleSheet} from 'react-native';
import {ToggleButton} from 'react-native-paper';
import DialogData from '../components/database/dialogData';
import {Button, DataTable, Checkbox} from 'react-native-paper';
import {
  save_session,
  load_all_sessions_info,
  // BACKEND_STATUS,
  // setBackendStatus,
  delete_sessions,
  get_session_info_by_ID,
  export_local_to_distant,
} from '../services/database.service';
import {getIsInLocalhostMode} from '../services/connection-backend.service';

const testListSessionsInfo = [
  {
    session_id: 1999,
    patient_id: 468748,
    date: '08/12/1999',
    time: '20:30',
    dimention: '50x50',
    parameter_count: 2,
  },
];

const DataBase = () => {
  const [value, setValue] = useState(0);
  const [sessions, setSessions] = useState(testListSessionsInfo);
  const dialogRef = React.useRef();

  const get_list_sessions_check = () => {
    list = [];
    for (let session of sessions) {
      if (session.isCheck) {
        list.push(session.session_id);
      }
    }
    return list;
  };

  return (
    <View style={styles.mainBox}>
      <DialogData ref={dialogRef}></DialogData>
      <View style={styles.toolBox}>
        {/* <ToggleButton.Row
          onValueChange={value => setBackendStatus(value)}
          value={value}>
          <ToggleButton icon="tablet-android" value={BACKEND_STATUS.LOCAL} />
          <ToggleButton icon="desktop-tower" value={BACKEND_STATUS.DISTANT} />
        </ToggleButton.Row> */}
        <Button
          style={styles.button}
          mode="contained"
          buttonColor="white"
          textColor="black"
          onPress={async () => {
            r = await load_all_sessions_info();
            setSessions(r);
            console.log('***********************************');
            console.log(sessions);
          }}>
          LOAD SESSIONS
        </Button>
        <Button
          style={styles.button}
          mode="contained"
          buttonColor="white"
          textColor="black"
          onPress={async () => {
            r = await delete_sessions(get_list_sessions_check());
            setSessions(r);
          }}>
          DELETE SESSIONS
        </Button>

        <Button
          style={styles.button}
          mode="contained"
          buttonColor="white"
          textColor="black"
          icon={'database-export'}
          onPress={async () => {
            if (!getIsInLocalhostMode()) {
              r = await export_local_to_distant();
              setSessions(r);
            }
          }}>
          EXPORT SESSIONS TO DISTANT
        </Button>
      </View>

      <View style={styles.tableBox}>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title style={styles.tableRow}>select</DataTable.Title>
            <DataTable.Title style={styles.tableRow}>
              Session ID
            </DataTable.Title>
            <DataTable.Title style={styles.tableRow}>
              Patient ID
            </DataTable.Title>
            <DataTable.Title style={styles.tableRow}>Date</DataTable.Title>
            <DataTable.Title style={styles.tableRow}>Time</DataTable.Title>
            <DataTable.Title style={styles.tableRow}>Dimention</DataTable.Title>
            <DataTable.Title style={styles.tableRow}>
              Number of parameters
            </DataTable.Title>
          </DataTable.Header>

          {sessions != null && sessions.length > 0
            ? sessions.map(session => {
                return (
                  <DataTable.Row
                    key={session.session_id}
                    onPress={async () => {
                      if (dialogRef) {
                        console.log('open dialog session', session.session_id);
                        session = await get_session_info_by_ID(
                          session.session_id,
                        );
                        dialogRef.current.showDialog(session);
                      }
                    }}>
                    <DataTable.Cell style={styles.tableRow}>
                      <Checkbox
                        color="grey"
                        status={session.isCheck ? 'checked' : 'unchecked'}
                        onPress={() => {
                          session.isCheck = !session.isCheck;
                          console.log(`selected session ${session.session_id}`);
                          setValue(value => value + 1);
                        }}
                      />
                    </DataTable.Cell>

                    <DataTable.Cell style={styles.tableRow}>
                      {session.session_id}
                    </DataTable.Cell>
                    <DataTable.Cell style={styles.tableRow}>
                      {session.patient_id}
                    </DataTable.Cell>
                    <DataTable.Cell style={styles.tableRow}>
                      {session.date}
                    </DataTable.Cell>
                    <DataTable.Cell style={styles.tableRow}>
                      {session.time}
                    </DataTable.Cell>
                    <DataTable.Cell style={styles.tableRow}>
                      {session.dimension}
                    </DataTable.Cell>
                    <DataTable.Cell style={styles.tableRow}>
                      {session.parameter_count}
                    </DataTable.Cell>
                  </DataTable.Row>
                );
              })
            : null}
        </DataTable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainBox: {
    width: '100%',
    height: '100%',
    //backgroundColor: 'pink',
    flexDirection: 'column',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textSession: {
    color: 'black',
    width: '100%',
    height: '100%',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 48,
  },
  sessionBox: {
    width: 150,
    height: 100,
    borderWidth: 2,
    borderColor: 'black',
    color: 'black',
    //flexBasis: '20%',
    margin: 25,
  },
  toolBox: {
    width: '90%',
    height: '10%',
    //backgroundColor: 'pink',
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  tableBox: {
    width: '90%',
    height: '90%',
    //backgroundColor: 'pink',
    flexDirection: 'row',
    flexWrap: 'wrap',
    //justifyContent: 'space-between',
  },
  button: {
    alignContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    borderColor: 'black',
    borderWidth: 2,
  },
  tableRow: {
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    //backgroundColor: 'green',
  },
});

export default DataBase;
