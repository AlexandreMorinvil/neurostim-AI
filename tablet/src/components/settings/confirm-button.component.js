import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

const DEFAULT_OPACITY = 0.75;

const ConfirmButton = ({ handleButtonPressedParentFunction, ...props }) => {

  /**
   * Props
   */
  const { isActive, text } = props;

  /**
   * States
   */
  const [stateIsActive, setStateIsActive] = useState(isActive);
  const [stateText, setStateText] = useState(text);

  /**
   * Functions
   */
  handleButtonPressedParentFunction = handleButtonPressedParentFunction ? handleButtonPressedParentFunction : () => { };

  const handlePress = () => {
    if (stateIsActive) handleButtonPressedParentFunction();
  }

  /**
   * Effects
   */
  useEffect(() => {
    setStateIsActive(props.isActive);
    setStateText(props.text);
  }, [props.isActive, props.text]);

  /**
   * Render
   */
  return (
    <TouchableOpacity
      activeOpacity={stateIsActive ? 0.2 : DEFAULT_OPACITY}
      style={[
        styles.content,
        stateIsActive ? styles.active : styles.inactive
      ]}
      onPress={handlePress}
    >
      <Text style={styles.text}>
        {stateText}
      </Text>
    </TouchableOpacity>
  );
};

/**
 * Style Sheet
 */
const styles = StyleSheet.create({
  content: {
    borderRadius: 10,
    borderStyle: "solid",
    borderWidth: 2,
    fontSize: 20,
    opacity: DEFAULT_OPACITY,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: 200,
    height: 50,
    flexDirection: "column",
  },
  active: {
    backgroundColor: "#32C832",
    borderColor: "#24C024",
  },
  inactive: {
    backgroundColor: "#AAAAAA",
    borderColor: "#929292",
  },
  text: {
    color: "#555555",
  }
});

export default ConfirmButton;