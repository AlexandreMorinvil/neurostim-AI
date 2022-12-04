import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";

import { SettingsStatus } from "../../../const/settings";
import AccodionItem from "../accordion-item.component";
import SectionConnectionWatch from "./section-connection-watch.component";

import * as connectionWatchService from "../../../services/connection-watch.service";

const CONNECTED_HEADER_SUMMARY = "Connected";
const NO_CONNECTION_HEADER_SUMMARY = "No Connection";

const SettingsMenuItemConnectionWatch = ({accordionIsActive}) => {

  /**
   * States
   */
  const [stateHeaderSummary, setStateHeaderSummary] = useState("");
  const [stateSettingStatus, setStateSettingStatus] = useState(SettingsStatus.UNSET);

  /**
   * Functions
   */
   const updateSettingStatus = () => {
    if (connectionWatchService.getIsConnectedStatus()) {
      setStateSettingStatus(SettingsStatus.SET);
      setStateHeaderSummary(CONNECTED_HEADER_SUMMARY);
    }
    else {
      setStateSettingStatus(SettingsStatus.PROBLEMATIC);
      setStateHeaderSummary(NO_CONNECTION_HEADER_SUMMARY);
    }
  }

  /**
   * Effects
  */
  useEffect(() => {
    const interval = setInterval(async () => {
      updateSettingStatus();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  /**
   * Render
   */
  return (
    <AccodionItem
      title="Smart Watch Connection"
      summaryText={stateHeaderSummary}
      settingStatus={stateSettingStatus}
      isActive={accordionIsActive}
    >
      <SectionConnectionWatch />
    </AccodionItem>
  );
};

/**
 * Style Sheet
 */
const styles = StyleSheet.create({});

export default SettingsMenuItemConnectionWatch;
