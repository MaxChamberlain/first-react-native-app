import AsyncStorage from '@react-native-async-storage/async-storage';

exports.getName = async () => {
    const value = await AsyncStorage.getItem('@name_key:vishi')
    return value
}
exports.setName = async name => {
    console.log('Storing name:', name);
    try {
      await AsyncStorage.setItem(
        '@name_key:vishi',
        name
      )
    } catch (error) {
      console.log(error);
    }
}