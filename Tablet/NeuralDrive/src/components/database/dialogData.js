import * as React from 'react';
import {useState, useImperativeHandle, useEffect, forwardRef} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Button, Paragraph, Dialog, Portal, Provider} from 'react-native-paper';
import {LineChart, Grid} from 'react-native-svg-charts';
import {Image} from 'react-native-elements';
//import Swiper from 'react-native-swiper';

const DialogData = (props, ref) => {
  const [visible, setVisible] = React.useState(false);
  const [session, setSession] = React.useState('No ID');
  const [data, setData] = React.useState([
    50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80,
  ]);

  const showDialog = session => {
    setSession(session);
    setVisible(true);
    unpackData(session.points);
  };

  const unpackData = data => {
    new_data = [];
    for (let point of data) {
      n = (Number(point.acc_x) + Number(point.acc_x) + Number(point.acc_x)) / 3;
      new_data.push(n);
    }
    setData(new_data);
  };
  console.log(session);

  const hideDialog = () => setVisible(false);

  useImperativeHandle(ref, () => ({
    showDialog,
  }));

  return (
    <View>
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog} style={styles.dialog}>
          <Dialog.Title>Session {session.session_id}</Dialog.Title>
          <Dialog.Content>
            <Text style={styles.text}>Date : {session.date}</Text>
            <Text style={styles.text}>Heure : {session.time}</Text>
            {/* <LineChart
              style={{height: '90%', width: '90%'}}
              data={data}
              svg={{stroke: 'rgb(134, 65, 244)'}}
              contentInset={{top: 20, bottom: 20}}>
              <Grid />
            </LineChart> */}
            <Image
              source={{
                uri: `data:image/jpeg;base64,${session.hashHeatMap}`,
              }}
              resizeMode="contain"
              style={styles.image}
            />
          </Dialog.Content>
        </Dialog>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  dialog: {
    width: '95%',
    height: '95%',
    backgroundColor: 'white',
    flexDirection: 'column',
  },
  text: {
    color: 'black',
  },
  image: {
    //flex: 1,
    height: '90%',
    minWidth: '90%',
    //backgroundColor: 'black',
  },
});

export default forwardRef(DialogData);
