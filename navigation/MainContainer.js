import React from 'react'
import { StyleSheet } from 'react-native'
import { NavigationContainer, DarkTheme } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Header as HeaderRNE } from '@rneui/themed'

import HomeScreen from './screens/HomeScreen'
import RestocksScreen from './screens/RestocksScreen'
import SettingsScreen from './screens/SettingsScreen'
import RequestScreen from './screens/RequestScreen'
import CustomerServiceScreen from './screens/CustomerServiceScreen'

const homeName = 'Home'
const restocksName = 'Restocks'
const settingsName = 'Settings'
const requestName = 'Request'
const csName = 'Customer Service'

const Tab = createBottomTabNavigator();

export let currRoute = 'Home'

export default function MainContainer({navigation}) {
    const [ showSettings, setShowSettings ] = React.useState(false)

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
            currRoute === csName ? '#7000bf' : '#171717' }
            centerComponent={{ text: 'Vishi', style: styles.heading }}
            rightComponent={{ paddingRight: 10, color: 'white', icon: 'settings', onPress: () => setShowSettings(showedSettings => !showedSettings) }}
            containerStyle={{ height: 100, paddingTop: 45 }}
            />

        <NavigationContainer theme={DarkTheme} >
            <Tab.Navigator
            initialRouteName={homeName}
            screenOptions={({route}) => ({
                tabBarStyle: {
                    backgroundColor: '#171717'
                },
                headerStyle: { 
                    backgroundColor: route.name === homeName ? '#171717' :
                    route.name === restocksName ? '#ffa600' :      
                    route.name === settingsName ? '#0062ff' :
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
                    }
                    return <Ionicons name={iconName} size={size} color={color} />
                }
            })}>
                <Tab.Screen theme={DarkTheme} name={homeName} component={HomeScreen} />
                <Tab.Screen theme={DarkTheme} name={restocksName} component={RestocksScreen} />
                <Tab.Screen theme={DarkTheme} name={requestName} component={RequestScreen} />
                <Tab.Screen theme={DarkTheme} name={csName} component={CustomerServiceScreen} />

            </Tab.Navigator>
        </NavigationContainer>
        </>
    )
}