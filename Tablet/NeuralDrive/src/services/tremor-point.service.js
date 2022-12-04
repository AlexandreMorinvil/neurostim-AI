import { Subject } from "rxjs";

import { FREQUENCY_WATCH_POINT_GENERATION_IN_HZ } from "../const/watch";
import * as watchDataService from "./watch-data.service";

// Constants
const MOVING_AVERAGE_WINDOW_TIME_INTERVAL_IN_SECONDS = 5;

// Computed Constants
const MOVING_AVERAGE_WINDOW_COUNT_POINTS = MOVING_AVERAGE_WINDOW_TIME_INTERVAL_IN_SECONDS * FREQUENCY_WATCH_POINT_GENERATION_IN_HZ;

// Variables
let _currentTremorMetric = 0;
let _scalarizedTremorPointsBuffer = Array(watchDataService.COUNT_BUFFER_POINTS).fill(0);
let _watchDataBufferSubscription = null;

// Reactive behavior handlers
export const subject = new Subject();

// Exported methods
export function getAveragedTremorMetric() {
  return _currentTremorMetric;
}

export function getScalarizedTremorPointListToDisplay(countPoints, keepPointFrequency) {
  const pointsList = _scalarizedTremorPointsBuffer.slice(-countPoints);
  return pointsList.filter((value, index) => { return index % keepPointFrequency === 0 })
}

export function getMovingAveragePointsListToDisplay(countPoints, keepPointFrequency) {
  const movingAverageTremorPointsBuffer = computeMovingAverageTremorPointsBuffer(MOVING_AVERAGE_WINDOW_COUNT_POINTS);
  const countPointsToTake = countPoints - Math.ceil(MOVING_AVERAGE_WINDOW_COUNT_POINTS / 2);
  const pointsList = movingAverageTremorPointsBuffer.slice(-countPointsToTake);
  return pointsList.filter((value, index) => { return index % keepPointFrequency === 0 });
}

export function getTremorMetricToDisplay() {
  return _currentTremorMetric;
}

// Private methods
function computeAverage(pointsList) {
  return pointsList.reduce((a, b) => a + b, 0) / pointsList.length;
};

function computeMovingAverageTremorPointsBuffer(windowSize) {

  const countPointsTakenBefore = Math.floor(windowSize / 2);
  const countPointsTakenAfter = Math.ceil(windowSize / 2);

  const startIndex = countPointsTakenBefore;
  const endIndex = _scalarizedTremorPointsBuffer.length - countPointsTakenAfter;

  const movingAverageList = [];
  for (let i = startIndex; i < endIndex; i++) {
    const pointsWindow = _scalarizedTremorPointsBuffer.slice(i - countPointsTakenBefore, i + countPointsTakenAfter);
    const average = computeAverage(pointsWindow);
    movingAverageList.push(average);
  }

  return movingAverageList;
}

function scalarizeTremorPoint(rawDataPoint) {
  const {
    xAcceleration,
    yAcceleration,
    zAcceleration,
    xGravityAcceleration,
    yGravityAcceleration,
    zGravityAcceleration
  } = rawDataPoint;
  return Math.sqrt(
    Math.pow((xAcceleration - xGravityAcceleration), 2) +
    Math.pow((yAcceleration - yGravityAcceleration), 2) +
    Math.pow((zAcceleration - zGravityAcceleration), 2));
}

async function updateBuffers(rawDataPointsBuffer) {
  updateScalarizedTremorPointsBuffer(rawDataPointsBuffer);
  updateCurrentTremorMetric();
  subject.next();
}

function updateCurrentTremorMetric() {
  const lastTrenorPointsWindow = _scalarizedTremorPointsBuffer.slice(-MOVING_AVERAGE_WINDOW_COUNT_POINTS);
  _currentTremorMetric = computeAverage(lastTrenorPointsWindow);
}

function updateScalarizedTremorPointsBuffer(rawDataPointsBuffer) {
  _scalarizedTremorPointsBuffer = rawDataPointsBuffer.map(scalarizeTremorPoint);
}

// Initialization
export function initialize() {
  // Subscribe to the watch data buffer
  _watchDataBufferSubscription = watchDataService.subject.subscribe({ next: updateBuffers });
}

export function cleanUp() {
  // Unsubscribe to the watch data buffer
  _watchDataBufferSubscription && _watchDataBufferSubscription.unsubscribe();
}
