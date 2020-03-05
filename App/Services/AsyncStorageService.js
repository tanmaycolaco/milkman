import { AsyncStorage  } from 'react-native'

async function storeData (key, value)  {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        // Error saving data
    }
}

  // fetch the data back asyncronously
  async function retrieveData (key) {
    try {
        const value = await AsyncStorage.getItem(key);
        if (value !== null) {
            // Our data is fetched successfully
           return JSON.parse(value)
        }
        return null
    } catch (error) {
        // Error retrieving data
    }
}

export{
    storeData,
    retrieveData
}