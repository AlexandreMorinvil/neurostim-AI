import * as connectionBackendService from "./connection-backend.service";
import * as networkService from "./network.service";

// Variables
let _isConnected = false;
let _watchTimeOut;

// Methods
export function watchIsnotConnected(){
    _isConnected = false;
}

export function stopWatchTimeOut(){
  clearTimeout(_watchTimeOut);
}

export function watchIsConnected(){
  _isConnected = true;
  _watchTimeOut = setTimeout(function(){watchIsnotConnected()}, 5000);
}

export function getIsConnectedStatus() {
  return _isConnected;
}

export function ipAddressToPutInSmartWatch() {
  return connectionBackendService.getIsInLocalhostMode() ?
    networkService.getSelfIpAddress :
    connectionBackendService.getBackendIpAddress();
}