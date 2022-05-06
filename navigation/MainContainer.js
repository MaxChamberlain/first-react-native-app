import React from 'react'
import { StyleSheet, Text } from 'react-native'
import { NavigationContainer, DarkTheme } from '@react-navigation/native'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Header as HeaderRNE, Card } from '@rneui/themed'
import { getHeaderTitle } from '@react-navigation/elements';

import HomeScreen from './screens/HomeScreen'
import RestocksScreen from './screens/RestocksScreen'
import SettingsScreen from './screens/SettingsScreen'
import RequestScreen from './screens/RequestScreen'
import CustomerServiceScreen from './screens/CustomerServiceScreen'
import ItemLookupScreen from './screens/ItemLookupScreen'

const homeName = 'Home'
const restocksName = 'Restocks'
const settingsName = 'Settings'
const requestName = 'Request'
const iLookupName = 'Item Lookup'
const csName = 'Customer Service'

const Tab = createMaterialBottomTabNavigator();

export default function MainContainer({navigation}) {
    const [ showSettings, setShowSettings ] = React.useState(false)
    const [ currRoute, setCurrRoute ] = React.useState(homeName)

    const styles = StyleSheet.create({
        heading: {
            fontSize: 20,
            color: 'white',
            fontWeight: 'bold'
        }
    })

    return (
        <>
        {showSettings && <SettingsScreen setVisible={setShowSettings} />}
            <HeaderRNE
            backgroundColor={ currRoute === homeName ? '#171717' :
            currRoute === restocksName ? '#ffa600' :      
            currRoute === settingsName ? '#0062ff' :
            currRoute === requestName ? '#0062ff' :
            currRoute === iLookupName ? '#b51f1f' :
            currRoute === csName ? '#7000bf' : '#171717' }
            centerComponent={{ text: 'Vishi', style: styles.heading }}
            rightComponent={{ paddingRight: 10, color: 'white', icon: 'settings', onPress: () => setShowSettings(showedSettings => !showedSettings) }}
            containerStyle={{ height: 100, paddingTop: 45 }}
            />

        <NavigationContainer theme={DarkTheme} >
            <Tab.Navigator
            initialRouteName={homeName}
            screenOptions={({route}) => ({
                tabBarColor: route.name === homeName ? '#171717' :
                route.name === restocksName ? '#ffa600' :      
                route.name === settingsName ? '#0062ff' :
                route.name === requestName ? '#0062ff' :
                route.name === iLookupName ? '#b51f1f' :
                route.name === csName ? '#7000bf' : '#171717',
                tabBarStyle: {
                    backgroundColor: '#171717'
                },
                headerStyle: { 
                    backgroundColor: route.name === homeName ? '#171717' :
                    route.name === restocksName ? '#ffa600' :      
                    route.name === settingsName ? '#0062ff' :
                    route.name === requestName ? '#0062ff' :
                    route.name === requestName ? '#0062ff' :
                    route.name === csName ? '#7000bf' : '#171717'
                },
                tabBarIcon: ({focused, color, size}) => {
                    let iconName
                    if (route.name === homeName) {
                        iconName = focused ? 'home' : 'home-outline'
                    }else if (route.name === restocksName) {
                        iconName = focused ? 'list' : 'list-outline'
                    }else if (route.name === requestName) {
                        iconName = focused ? 'create' : 'create-outline'
                    }else if (route.name === csName) {
                        iconName = focused ? 'call' : 'call-outline'
                    }else if (route.name === iLookupName) {
                        iconName = focused ? 'search' : 'search-outline'
                    }
                    return <Ionicons name={iconName} size={20} color={color} />
                }
            })}>
                <Tab.Screen 
                    theme={DarkTheme} 
                    name={homeName} 
                    children={props => <HomeScreen {...props} setCurrRoute={setCurrRoute}/>}
                    listeners={{
                        tabPress: e => {
                          setCurrRoute(homeName)
                        },
                      }}
                />
                <Tab.Screen 
                    theme={DarkTheme} 
                    name={restocksName} 
                    component={RestocksScreen} 
                    listeners={{
                        tabPress: e => {
                          setCurrRoute(restocksName)
                        },
                      }}
                />
                <Tab.Screen 
                    theme={DarkTheme} 
                    name={requestName} 
                    component={RequestScreen} 
                    listeners={{
                        tabPress: e => {
                          setCurrRoute(requestName)
                        },
                      }}
                />
                <Tab.Screen 
                    theme={DarkTheme} 
                    name={csName} 
                    component={CustomerServiceScreen} 
                    listeners={{
                        tabPress: e => {
                          setCurrRoute(csName)
                        },
                      }}
                /> 
                <Tab.Screen 
                    theme={DarkTheme} 
                    name={iLookupName} 
                    component={ItemLookupScreen} 
                    listeners={{
                        tabPress: e => {
                          setCurrRoute(iLookupName)
                        },
                      }}
                />

            </Tab.Navigator>
        </NavigationContainer>
        </>
    )
}