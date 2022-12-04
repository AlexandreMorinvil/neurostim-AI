import { Subject } from "rxjs";
import { watchIsConnected, stopWatchTimeOut } from "./connection-watch.service";
import { FREQUENCY_WATCH_POINT_GENERATION_IN_HZ } from "../const/watch";

// Constants
const COUNT_BUFFER_POINTS = 600;
const INTERVAL_BUFFER_PULL_IN_MS = 200;

// Computed contants
export const TIME_INTERVAL_BETWEEN_POINTS_IN_MS = 1 / FREQUENCY_WATCH_POINT_GENERATION_IN_HZ * 1000;
const MIN_POINTS_RENEWED_PER_BUFFER_PULL = INTERVAL_BUFFER_PULL_IN_MS / 1000 * FREQUENCY_WATCH_POINT_GENERATION_IN_HZ;

// Variables
let _intervalBufferRefresh = 0;
let _watchPointsNewRawDataBuffer = [];
let _watchPointsRawDataBuffer = Array(COUNT_BUFFER_POINTS).fill(0);

// Reactive behavior handlers
export const subject = new Subject();

// Exported methods
export function getWatchRawDataBuffer() {
  return _watchPointsRawDataBuffer.map(makeWatchPoint).slice();
}

export async function handleReceivedWatchPacket(watchPacket) {
  try {
    const parsedWatchPacket = JSON.parse(watchPacket);
    _watchPointsNewRawDataBuffer = _watchPointsNewRawDataBuffer.concat(parsedWatchPacket);
    stopWatchTimeOut();
    watchIsConnected();
  } catch (error) {
    console.error("Watch data format is invalid: ", error);
  }
}

// Private methods
function makeWatchPoint(watchPointObject) {
  const { acc_x, acc_y, acc_z, gir_x, gir_y, gir_z, grav_x, grav_y, grav_z } = watchPointObject || {};
  return {
    xAcceleration: acc_x || 0,
    yAcceleration: acc_y || 0,
    zAcceleration: acc_z || 0,
    xRotation: gir_x || 0,
    yRotation: gir_y || 0,
    zRotation: gir_z || 0,
    xGravityAcceleration: grav_x || 0,
    yGravityAcceleration: grav_y || 0,
    zGravityAcceleration: grav_z || 0, 
  }
}

async function updateWatchPointDisplayedBuffer() {

  // Retreive the points from the buffer
  let newPointsList = _watchPointsNewRawDataBuffer.splice(0, _watchPointsNewRawDataBuffer.length);

  // Shift the points in the buffer of points to diplay
  _watchPointsRawDataBuffer.splice(0, newPointsList.length);
  _watchPointsRawDataBuffer = _watchPointsRawDataBuffer.concat(newPointsList);

  // Notify subscribers with a deep copy of the buffer
  subject.next(getWatchRawDataBuffer());
}

// Initialization
export function initialize() {
  _intervalBufferRefresh = setInterval(updateWatchPointDisplayedBuffer, INTERVAL_BUFFER_PULL_IN_MS);
}

export function cleanUp() {
  clearInterval(_intervalBufferRefresh);
}
