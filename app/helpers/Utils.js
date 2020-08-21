import AsyncStorage from '@react-native-community/async-storage';

const storeAsyncStorageData = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    console.log(e);
    throw e;
  }
};

const fetchAsyncStorageData = async key => {
  try {
    return await AsyncStorage.getItem(key);
  } catch (error) {
    console.log(error);
    throw e;
  }
};

const removeAsyncStorageData = async key => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.log(error);
  }
};

export default {
  storeAsyncStorageData,
  fetchAsyncStorageData,
  removeAsyncStorageData,
};
