import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

import { settingsStyles } from "../../../styles/settings.styles";
import { SettingsStatus } from "../../../const/settings";
import { store } from "../../../services/store.service";

import AccodionItem from "../accordion-item.component";
import ConfirmButton from "../confirm-button.component";
import SectionChoiceBackend from "./section-choice-backend.component";
import SectionExternalBackend from "./section-external-backend.component";
import SectionLocalBackend from "./section-local-backend.component";

import * as connectionBackendService from "../../../services/connection-backend.service";

const CONFIRM_BUTTON_TEXT = "Connect";

const CONNECTED_EXTERNAL_BACKEND_HEADER_SUMMARY = (ipAddress) => `Connected (${ipAddress})`;
const CONNECTED_LOCAL_BACKEND_HEADER_SUMMARY = "Connected Locally";
const NOT_CONNECTED_EXTERNAL_HEADER_SUMMARY = (ipAddress) => `No connection (${ipAddress})`;
const NOT_CONNECTED_LOCAL_HEADER_SUMMARY = "No Connection";


const SettingsMenuItemConnectionBackend = ({accordionIsActive}) => {

  /**
   * States
   */
  const [stateHeaderSummary, setStateHeaderSummary] = useState("");
  const [stateSettingStatus, setStateSettingStatus] = useState(SettingsStatus.UNSET);
  const [stateIsLocalBackendTypeSelected, setStateIsLocalBackendTypeSelected] = useState(false);
  const [stateInputIpAddress, setStateInputIpAddress] = useState("");
  const [statIsInputIpAddressValid, setStatIsInputIpAddressValid] = useState(true);
  const [stateIsConnectButtonActive, setStateIsConnectButtonActive] = useState(false);

  /**
   * Functions
   */
  const commitConnection = () => {
    connectionBackendService.connect();
    if (stateIsLocalBackendTypeSelected) {
      connectionBackendService.activateLocalHostMode();
    }
    else {
      connectionBackendService.deactivateLocalHostMode();
      connectionBackendService.setBackendIpAddress(stateInputIpAddress);
    }
  }

  const setConnectButtonActivation = () => {
    // Local backend mode
    if (stateIsLocalBackendTypeSelected) {
      const isAlreadyConnectedLocally = false;
      setStateIsConnectButtonActive(!isAlreadyConnectedLocally);
    }

    // External backend mode
    else {
      const isInputIpValid = statIsInputIpAddressValid;
      const isAlreadyToExternalBackend = false;
      const isIpAddressDifferentFromRegisteredIpAddress = true;
      setStateIsConnectButtonActive(
        isInputIpValid &&
        !isAlreadyToExternalBackend &&
        isIpAddressDifferentFromRegisteredIpAddress
      );
    }
  }

  const updateSettingStatus = () => {
    const ipAddressConnected = connectionBackendService.getBackendIpAddress();
    const isInLocalhostMode = connectionBackendService.getIsInLocalhostMode();

    if (connectionBackendService.getIsConnectedStatus()) {
      setStateSettingStatus(SettingsStatus.SET);
      isInLocalhostMode ?
        setStateHeaderSummary(CONNECTED_LOCAL_BACKEND_HEADER_SUMMARY) :
        setStateHeaderSummary(CONNECTED_EXTERNAL_BACKEND_HEADER_SUMMARY(ipAddressConnected));
    }

    else {
      setStateSettingStatus(SettingsStatus.PROBLEMATIC);
      isInLocalhostMode ?
        setStateHeaderSummary(NOT_CONNECTED_LOCAL_HEADER_SUMMARY) :
        setStateHeaderSummary(NOT_CONNECTED_EXTERNAL_HEADER_SUMMARY(ipAddressConnected));
    }
  }

  /**
   * Effects
   */
  useEffect(() => {
    setConnectButtonActivation();
  }, [stateInputIpAddress, statIsInputIpAddressValid, stateIsLocalBackendTypeSelected]);

  useEffect(() => {
    // Initilization
    updateSettingStatus();

    // Reactive subcribtion
    const subscription = connectionBackendService.subject.subscribe({
      next: updateSettingStatus
    });
    
    // Cleanup
    return function cleanup() {
      subscription.unsubscribe()
    }
  }, []);

  /**
   * Render
   */
  return (
    <AccodionItem
      title="Backend Connection"
      summaryText={stateHeaderSummary}
      settingStatus={stateSettingStatus}
      isActive={accordionIsActive}
    >
      <View>
        <SectionChoiceBackend
          style={settingsStyles.sectionSpacing}
          initialIsLocalBackendTypeSelected={connectionBackendService.getIsInLocalhostMode()}
          setParentIsLocalBackendTypeSelected={setStateIsLocalBackendTypeSelected}
        />
        <View style={styles.spacing}>
          {stateIsLocalBackendTypeSelected ?
            <SectionLocalBackend /> :
            <SectionExternalBackend
              setParentInputIpAddressFunction={setStateInputIpAddress}
              setParentIsInputIpAddressValidFunction={setStatIsInputIpAddressValid}
            />
          }
        </View>
      </View>
      <View style={[styles.spacing, styles.alignRight]}>
        <ConfirmButton
          isActive={stateIsConnectButtonActive}
          text={CONFIRM_BUTTON_TEXT}
          handleButtonPressedParentFunction={commitConnection}
        />
      </View>
    </AccodionItem>
  );
};

/**
 * Style Sheet
 */
const styles = StyleSheet.create({
  spacing: {
    marginTop: 20,
  },
  alignRight: {
    flexDirection: "column",
    alignItems: "flex-end",
  }
});

export default SettingsMenuItemConnectionBackend;
