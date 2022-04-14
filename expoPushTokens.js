import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default async function expoPushTokens(title, message, method){

  if(method === 'restocks'){
      const _notifsRestocks = async () => {
        try {
          const value = await AsyncStorage.getItem('@restocks_notifs_key:vishi')
          if (value === 'true') {
            return true
          } else {
            return false
          }
        } catch (error) {
          console.log(error)
          return false
        }
      };
    
      const toSendRestocks = await _notifsRestocks()
      console.log('toSendRestocks: ' + toSendRestocks)
    
        if (toSendRestocks) {
            axios.post(`https://app.nativenotify.com/api/indie/notification`, {
                subID: 'restocks',
                appId: 2471,
                appToken: 'h8bDuld55KMwdbyTEKDJds',
                title: title,
                message: message
            })
        }
  }else if(method === 'customerservice'){
      const _notifsCs = async () => {
          try {
            const value = await AsyncStorage.getItem('@cuserv_notifs_key:vishi')
            if (value === 'true') {
              return true
            } else {
              return false
            }
          } catch (error) {
            console.log(error)
            return false
          }
        };
      
        const toSendCs = await _notifsCs()
        console.log('toSendCs: ' + toSendCs)
      
          if (toSendCs) {
              axios.post(`https://app.nativenotify.com/api/indie/notification`, {
                  subID: 'customerservice',
                  appId: 2471,
                  appToken: 'h8bDuld55KMwdbyTEKDJds',
                  title: title,
                  message: message
              })
          }
  }


}