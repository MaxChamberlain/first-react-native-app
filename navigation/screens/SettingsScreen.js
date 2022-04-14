import React, { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text, View, Dimensions, TextInput, Switch } from 'react-native'
import { Button, Card } from '@rneui/themed'
import { getName, setName } from '../../fetchData/getName'
import Animated, { FadeOutUp, FadeInUp, FadeInRight } from 'react-native-reanimated'

export default function MainContainer({setVisible}) {
    const [ currName, setCurrName ] = useState(null);
    const [ getNotifs, setGetNotifs ] = useState(false);
    const [ getCsNotifs, setGetCsNotifs ] = useState(false);
    const [ loading, setLoading ] = useState(0);

    useEffect(() => {
        getNotifPerms()
        getCsPerms()
    }, [])

    return (
        <View style={{ backgroundColor: '#36393f' }}>
            {loading === 1 && 
            <Animated.View style={{
                backgroundColor: '#36393f',
                height: 60,
                width: '90%',
                position: 'absolute',
                top: 10,
                left: '5%',
                borderRadius: 10,
                zIndex: 999
            }}
            entering={FadeInUp}
            exiting={FadeOutUp}
            >
                <Text style={{ fontSize: 20, color: 'white', alignSelf: 'center', marginTop: 18 }}>Working...</Text>
            </Animated.View>}
            {loading === 2 && 
            <Animated.View style={{
                backgroundColor: 'red',
                height: 60,
                width: '90%',
                position: 'absolute',
                top: 10,
                left: '5%',
                borderRadius: 10,
                zIndex: 999
            }}
            entering={FadeInUp}
            exiting={FadeOutUp}
            >
                <Text style={{ fontSize: 20, color: 'white', alignSelf: 'center', marginTop: 18 }}>Failed, try again in a moment.</Text>
            </Animated.View>}
            {loading === 3 && 
            <Animated.View style={{
                backgroundColor: 'rgb(72, 117, 55)',
                height: 60,
                width: '90%',
                position: 'absolute',
                top: 10,
                left: '5%',
                borderRadius: 10,
                zIndex: 999
            }}
            entering={FadeInUp}
            exiting={FadeOutUp}
            >
                <Text style={{ fontSize: 20, color: 'white', alignSelf: 'center', marginTop: 18 }}>Success!</Text>
            </Animated.View>}

                <Animated.View style={{ paddingTop: 100, height: '100%', backgroundColor: '#171717' }}
                    entering={FadeInRight}
                    >
                    <Text style={{
                        color: 'white',
                        fontSize: 30,
                        fontWeight: 'bold',
                        alignSelf: 'center',
                        marginBottom: 10
                    }}>
                        Settings
                    </Text>
                    <Card containerStyle={{ borderWidth: 0, position: 'relative', padding: 0, backgroundColor: '#303235', paddingBottom: 30}}>
                        <View>
                            <Text style={{
                                color: 'white',
                                fontSize: 20,
                                fontWeight: 'bold',
                                alignSelf: 'center',
                                marginTop: 30,
                                marginBottom: 10
                            }}>
                                Change Name
                            </Text>
                            <TextInput style={{
                                backgroundColor: 'white',
                                height: 40,
                                marginLeft: '5%',
                                width: '90%',
                            }}
                            placeholder='Enter a new name'
                            onChangeText={setCurrName}
                            value={currName}
                            >
                            </TextInput>
                        </View>
                    </Card>

                    <Card containerStyle={{ borderWidth: 0, position: 'relative', padding: 0, backgroundColor: '#303235', paddingBottom: 30}}>
                        <Card.Title style={{ color: 'white', fontSize: 25, paddingTop: 10 }}>Notifications</Card.Title>
                        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 20, paddingRight: 20 }}>
                            <Text style={{
                                color: 'white',
                                fontSize: 20,
                                fontWeight: 'bold',
                                alignSelf: 'center',
                                marginTop: 30,
                                marginBottom: 10,
                                alignSelf: 'flex-start'
                            }}>
                                Restock Requests
                            </Text>
                            <Switch
                            trackColor={{ false: "#767577", true: "#429aff" }}
                            thumbColor='white'
                            ios_backgroundColor="#3e3e3e"
                            style={{alignSelf: 'flex-end', marginTop: 10}}
                            onValueChange={() => setGetNotifs(gotNotifs => !gotNotifs)}
                            value={getNotifs}
                        />
                        </View>

                        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 20, paddingRight: 20 }}>
                            <Text style={{
                                color: 'white',
                                fontSize: 20,
                                fontWeight: 'bold',
                                alignSelf: 'center',
                                marginTop: 30,
                                marginBottom: 10,
                                alignSelf: 'flex-start'
                            }}>
                                Customer Service
                            </Text>
                            <Switch
                            trackColor={{ false: "#767577", true: "#429aff" }}
                            thumbColor='white'
                            ios_backgroundColor="#3e3e3e"
                            style={{alignSelf: 'flex-end', marginTop: 10}}
                            onValueChange={() => setGetCsNotifs(gotCsNotifs => !gotCsNotifs)}
                            value={getCsNotifs}
                        />
                        </View>
                    </Card>

                    <View style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        top: Dimensions.get('window').height * 0.9,
                    }}>
                        <Button 
                        buttonStyle={{
                            width: '50%',
                            height: 80,
                            padding: 0,
                            baackgroundColor: '#429aff',
                            borderRadius: 0,
                        }}
                        titleStyle={{
                            fontWeight: 'bold',
                        }}
                        title='SAVE CHANGES'
                        onPress={() => setSettings()}
                    />
                    </View>

                    <View style={{
                        position: 'absolute',
                        width: '50%',
                        height: '100%',
                        top: Dimensions.get('window').height * 0.9,
                        right: 0
                    }}>
                        <Button 
                        containerStyle={{
                            borderRadius: 0
                        }}
                        buttonStyle={{
                            width: '100%',
                            height: 80,
                            padding: 0,
                            backgroundColor: 'gray',
                            borderRadius: 0,
                        }}
                        titleStyle={{
                            fontWeight: 'bold',
                        }}
                        title='CANCEL'
                        onPress={() => {
                            setVisible(false)
                            setCurrName(null)
                        }}
                    />
                    </View>
                
            </Animated.View>
        </View>
    )

    async function setSettings(){
        try{
            setLoading(1)
            currName && await setName(currName.replace(/[^a-zA-Z ]/g, "").toUpperCase()); setCurrName(null)
            await setNotifs()
            setLoading(3)
            setTimeout(() => setLoading(0), 2000)
        }catch (e) {
            console.log(e)
            setLoading(2)
        }
    }

    async function setNotifs(){
        try {
            await AsyncStorage.setItem(
            '@restocks_notifs_key:vishi',
            JSON.stringify(getNotifs)
            );
            await AsyncStorage.setItem(
                '@cuserv_notifs_key:vishi',
                JSON.stringify(getCsNotifs)
                );
            return null
        } catch (error) {
            console.log(error);
        }
    }

    async function getNotifPerms(){
      const value = await AsyncStorage.getItem('@restocks_notifs_key:vishi')
      if (value === 'true') {
        setGetNotifs(true)
      } else {
        setGetNotifs(false)
      }
      return null
    }

    async function getCsPerms(){
        const value = await AsyncStorage.getItem('@cuserv_notifs_key:vishi')
        if (value === 'true') {
          setGetCsNotifs(true)
        } else {
          setGetCsNotifs(false)
        }
        return null
      }
}