import React from 'react'
import { StyleSheet } from 'react-native'
import { NavigationContainer, DarkTheme } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Header as HeaderRNE } from '@rneui/themed'

import HomeScreen from './screens/HomeScreen'
import RestocksScreen from './screens/RestocksScreen'
import SettingsScreen from './screens/SettingsScreen'

const homeName = 'Home'
const restocksName = 'Restocks'
const settingsName = 'Settings'

const Tab = createBottomTabNavigator();

export default function MainContainer({navigation}) {
    const styles = StyleSheet.create({
        heading: {
            fontSize: 20,
            color: 'white',
            fontWeight: 'bold'
        }
    })

    return (
        <>
            <HeaderRNE
            backgroundColor='#171717'
            centerComponent={{ text: 'Vishi', style: styles.heading }}
            />

        <NavigationContainer theme={DarkTheme} >
            <Tab.Navigator
            initialRouteName={restocksName}
            screenOptions={({route}) => ({
                tabBarStyle: {
                    backgroundColor: '#171717'
                },
                headerStyle: { 
                    backgroundColor: '#171717' 
                },
                tabBarIcon: ({focused, color, size}) => {
                    let iconName
                    if (route.name === homeName) {
                        iconName = focused ? 'home' : 'home-outline'
                    }else if (route.name === restocksName) {
                        iconName = focused ? 'list' : 'list-outline'
                    }else if (route.name === settingsName) {
                        iconName = focused ? 'settings' : 'settings-outline'
                    }
                    return <Ionicons name={iconName} size={size} color={color} />
                }
            })}>
                
                <Tab.Screen theme={DarkTheme} name={homeName} component={HomeScreen} />
                <Tab.Screen theme={DarkTheme} name={restocksName} component={RestocksScreen} />
                <Tab.Screen theme={DarkTheme} name={settingsName} component={SettingsScreen} />

            </Tab.Navigator>
        </NavigationContainer>
        </>
    )
}