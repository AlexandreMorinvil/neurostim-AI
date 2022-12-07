import {Action, ERROR_CODE, Status} from '../class/actions';
import {getBackendUrl} from './connection-backend.service';
import {getPatientId} from '../services/patient.service';

// Exported methods
export async function postStartNewSession(dimensions) {
  // Request format
  const command = {
    action: Action.START_SESSION,
    arg: {
      dimensions: dimensions,
      patientID: getPatientId(),
    },
  };
  response = await sendCommand(command);
  if (response === ERROR_CODE.FAIL_CONNECT_TO_SERVER) {
    return Status.STOP;
  } else {
    // Response format
    return {
      status: response.content?.status,
    };
  }
}

export async function postExecuteQuery(parametersValueList, tremorMetric) {
  // Request format
  const command = {
    action: Action.EXECUTE_QUERY,
    arg: {
      parameters_value_list: parametersValueList,
      tremor_metric: tremorMetric,
    },
  };

  // Send request and handle errors
  response = await sendCommand(command);
  if (response === ERROR_CODE.FAIL_CONNECT_TO_SERVER) {
    return Status.STOP;
  } else {
    // Response format
    console.log(
      'response.content?.suggested_parameters_list',
      response.content?.suggested_parameters_list,
    );
    return {
      suggestedParametersList: JSON.parse(
        response.content?.suggested_parameters_list,
      ),
    };
  }
}

export async function getVisualizationsForParameters(
  firstParameterIndex,
  secondParameterIndex,
  firstParameterName,
  secondParameterName,
) {
  // Request format
  const command = {
    action: Action.GET_VIZUALIZATIONS,
    arg: {
      first_parameter: firstParameterIndex,
      second_parameter: secondParameterIndex,
      first_parameter_name: firstParameterName,
      second_parameter_name: secondParameterName,
    },
  };

  // Send request and handle errors
  console.log("The problem hasn't occured so far");
  response = await sendCommand(command);
  if (response === ERROR_CODE.FAIL_CONNECT_TO_SERVER) {
    return Status.STOP;
  } else {
    // Response format
    return {
      heatMapBase64JpegImage: response.content?.heatmap_base64_jpeg_image,
      parameterGraphBase64JpegImage:
        response.content?.parameter_graph_base64_jpeg_image,
    };
  }
}

// Private methods
async function sendCommand(command, method) {
  try {
    console.log('Send HTTP request for command :', command);
    const response = await fetch(getBackendUrl() + '/command', {
      method: method || 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: command.action,
        arg: command.arg,
      }),
    });
    const json = await response.json();
    return json;
  } catch (error) {
    console.error('Http request failed');
    return ERROR_CODE.FAIL_CONNECT_TO_SERVER;
  }
}
