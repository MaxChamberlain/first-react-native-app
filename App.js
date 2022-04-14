import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import MainContainer from './navigation/MainContainer';
import { View, Text, TextInput } from 'react-native';
import { Button } from '@rneui/themed'
import AsyncStorage from '@react-native-async-storage/async-storage';
import registerNNPushToken, { registerIndieID } from 'native-notify';

export default function App() {
  const [ name, setName ] = useState(null);
  const [ hasName, setHasName ] = useState(false);

  registerNNPushToken(2471, 'h8bDuld55KMwdbyTEKDJds')

  const _notifsRestocks = async () => {
    try {
      const value = await AsyncStorage.getItem('@restocks_notifs_key:vishi')
      if (value === true) {
        return true
      } else {
        return false
      }
    } catch (error) {
      console.log(error)
      return false
    }
  }
  if(_notifsRestocks()){
    registerIndieID('restocks', 2471, 'h8bDuld55KMwdbyTEKDJds');
  }

  const _notifsCs = async () => {
    try {
      const value = await AsyncStorage.getItem('@cuserv_notifs_key:vishi')
      if (value === true) {
        return true
      } else {
        return false
      }
    } catch (error) {
      console.log(error)
      return false
    }
  }
  if(_notifsCs()){
    registerIndieID('customerservice', 2471, 'h8bDuld55KMwdbyTEKDJds');
  }

  const _storeName = async name => {
    console.log('Storing name:', name);
    try {
      await AsyncStorage.setItem(
        '@name_key:vishi',
        name
      );
      setHasName(true)
    } catch (error) {
      console.log(error);
    }
  };

  const _getName = async () => {
    try {
      const value = await AsyncStorage.getItem('@name_key:vishi')
      if (value !== null) {
        return true
      } else {
        return false
      }
    } catch (error) {
      console.log(error)
    }
  };

  const init = async () => {
    setHasName(await _getName())
  }
  init()

  return (
    hasName ? <>
      <StatusBar style='light' />
      <MainContainer />
    </>
    :
    <View style={{
      backgroundColor: '#171717',
      height: '100%',
      width: '100%',
    }}>
      <View style={{
        position: 'absolute',
        backgroundColor: '#505050',
        height: 180,
        width: '90%',
        top: '40%',
        transform: [{ translateY: '-50%' }],
        alignSelf: 'center',
      }}>
        <Text style={{
          color: 'white',
          fontSize: 40,
          fontWeight: 'bold',
          marginTop: '10%',
          alignSelf: 'center',
        }}>
          Who are you?
        </Text>
        <TextInput
          style={{
            width: '90%',
            backgroundColor: 'white',
            height: 40,
            alignSelf: 'center',
            marginTop: 20,
          }}
          onChangeText={setName}
          value={name}
          placeholder="Enter your name"
        />
        <Button
          title="SUBMIT"
          onPress={() => {
            name && _storeName(name.replace(/[^a-zA-Z ]/g, "").toUpperCase())
          }}
          buttonStyle={{
            backgroundColor: name ? '#429aff' : 'gray',
            width: '100%',
            height: 40,
            marginTop: 20,
          }}
          />
      </View>
    </View>
  );
}
