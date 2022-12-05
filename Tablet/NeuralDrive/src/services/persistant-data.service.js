import AsyncStorage from '@react-native-async-storage/async-storage';

export async function clearPersistantData() {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    // Error clearing data
    console.error(error);
  }
}

export async function initializeValueWithPersistantData(key, defautlValue) {
  return await loadPersistantData(key, defautlValue);
}

export async function loadPersistantData(key, defautlValue) {
  try {
    const stringValue = await AsyncStorage.getItem(key);
    if (stringValue === null) return defautlValue;
    return JSON.parse(stringValue);
  } catch (error) {
    // Error retrieving data
    console.error(error);
  }
}

export async function removePersistantData(key) {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    // Error removing data
    console.error(error);
  }
}

export async function savePersistantData(key, value) {
  try {
    const stringValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, stringValue);
  } catch (error) {
    // Error saving data
    console.error(error);
  }
}
