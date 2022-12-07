import {
  post_save_session,
  post_get_session_by_ID,
  post_get_save_session_info,
  post_delete_session,
  post_save_session_local_tablet,
  post_export_session_to_distant_server,
} from '../class/http';

import {getIsInLocalhostMode} from '../services/connection-backend.service';

var RNFS = require('react-native-fs');
RNFS.mkdir(RNFS.DocumentDirectoryPath + '/storage');

/************************************************************** */
/************************************************************** */
/************************************************************** */

export async function save_session() {
  if (getIsInLocalhostMode()) {
    return await save_session_local();
  } else {
    return await post_save_session();
  }
}

export async function load_all_sessions_info() {
  if (getIsInLocalhostMode()) {
    return await get_all_session_info();
  } else {
    return await post_get_save_session_info();
  }
}

export async function delete_sessions(listID) {
  if (getIsInLocalhostMode()) {
    return await delete_session_local(listID);
  } else {
    return await post_delete_session(listID);
  }
}

export async function get_session_info_by_ID(id) {
  if (getIsInLocalhostMode()) {
    return await read_session(id);
  } else {
    return await post_get_session_by_ID(id);
  }
}

export async function export_local_to_distant() {
  listID = await read_all_sessions_id();
  console.log(listID);
  for (let id of listID) {
    session = await read_session_by_id(id);
    console.log(session);
    response = await post_export_session_to_distant_server(session);
    console.log(response);
  }
  //delete_session_local();
}
/************************************************************** */
/************************************************************** */
/************************************************************** */

export async function save_session_local() {
  json_session = await post_save_session_local_tablet();
  await write_sessions(json_session);
  return await get_all_session_info();
}

function write_sessions(session) {
  var path =
    RNFS.DocumentDirectoryPath + '/storage/' + session.session_id + '.json';

  // write the file
  RNFS.writeFile(path, JSON.stringify(session), 'utf8')
    .then(success => {
      console.log('FILE WRITTEN!');
    })
    .catch(err => {
      console.log(err.message);
    });
}

async function read_all_sessions_id() {
  listFileName = [];
  result = await RNFS.readDir(RNFS.DocumentDirectoryPath + '/storage');
  console.log('GOT RESULT', result);
  for (let file of result) {
    console.log(file.name);
    listFileName.push(file.name);
  }
  return listFileName;
}

async function read_session(id) {
  file = await RNFS.readFile(
    RNFS.DocumentDirectoryPath + '/storage/' + id + '.json',
    'utf8',
  ).catch(err => {
    console.log(err.message, err.code);
  });
  return await JSON.parse(file);
}

async function read_session_by_id(id) {
  file = await RNFS.readFile(
    RNFS.DocumentDirectoryPath + '/storage/' + id,
    'utf8',
  ).catch(err => {
    console.log(err.message, err.code);
  });
  return await JSON.parse(file);
}

async function delete_file(path) {
  return (
    RNFS.unlink(path)
      .then(() => {
        console.log('FILE DELETED');
      })
      // `unlink` will throw an error, if the item to unlink does not exist
      .catch(err => {
        console.log(err.message);
      })
  );
}

async function delete_session_local(listID) {
  for (let id of listID) {
    await delete_file(RNFS.DocumentDirectoryPath + '/storage/' + id + '.json');
  }
  return await get_all_session_info();
}

async function get_all_session_info() {
  listInfo = [];
  listFile = await read_all_sessions_id();
  console.log('list file : ', listFile);
  for (let file of listFile) {
    file = await RNFS.readFile(
      RNFS.DocumentDirectoryPath + '/storage/' + file,
      'utf8',
    ).catch(err => {
      console.log(err.message, err.code);
    });
    session = JSON.parse(file);
    listInfo.push({
      session_id: session.session_id,
      patient_id: session.patient_id,
      date: session.date,
      time: session.time,
      dimension: session.dimension,
      parameter_count: session.parameter_count,
    });
  }
  return listInfo;
}
