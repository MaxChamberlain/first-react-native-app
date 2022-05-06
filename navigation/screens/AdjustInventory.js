import React from 'react'
import { View, Text } from 'react-native'
import { getName } from '../../fetchData/getName'
import { Card, Button } from '@rneui/themed'
import { TouchableOpacity } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons'

export default function AdjustInventory({navigation, setCurrRoute}) {
    const [ name, setName ] = React.useState(null);
    
    React.useEffect(()=> {
        nameSetter()
    }, [])
    
    return (
        <View style={{ height: '100%', backgroundColor: '#171717' }}> 
        <Text style={{
            marginTop: 20, 
            color: 'white',
            fontSize: 25,
            fontWeight: 'bold',
            alignSelf: 'center',
        }}>Hello, {name}</Text>
        <Text style={{
            color: 'white',
            opacity: 0.3,
            fontSize: 20,
            fontWeight: 'bold',
            alignSelf: 'center',
            marginTop: 20
        }}>Where would you like to go? </Text>
            <TouchableOpacity onPress={() => {navigation.navigate('Restocks'); setCurrRoute('Restocks')}}>
                <Card containerStyle={{ height: 100, borderWidth: 0, borderRadius: 10, position: 'relative', padding: 0, backgroundColor: '#ffa600'}}>
                    <Text style={{
                        alignSelf: 'flex-start',
                        marginTop: 38,
                        marginLeft: 20,
                        marginTop: 35,
                        color: 'white',
                        fontSize: 18,
                        fontWeight: 'bold',
                    }}>Restock Requests</Text>
                    <Ionicons name='list-outline' size={40} color='white' style={{
                        position: 'absolute',
                        right: 20,
                        top: 27
                    }} />
                </Card>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {navigation.navigate('Request'); setCurrRoute('Request')}}>
                <Card containerStyle={{ height: 100, borderWidth: 0, borderRadius: 10, position: 'relative', padding: 0, backgroundColor: '#0062ff'}}>
                    <Text style={{
                        alignSelf: 'flex-start',
                        marginTop: 38,
                        marginLeft: 20,
                        color: 'white',
                        fontSize: 18,
                        fontWeight: 'bold',
                    }}>Request an Item</Text>
                    <Ionicons name='create-outline' size={40} color='white' style={{
                        position: 'absolute',
                        right: 20,
                        top: 27
                    }} />
                </Card>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {navigation.navigate('Customer Service'); setCurrRoute('Customer Service')}}>
                <Card containerStyle={{ height: 100, borderWidth: 0, borderRadius: 10, position: 'relative', padding: 0, backgroundColor: '#7000bf'}}>
                    <Text style={{
                        alignSelf: 'flex-start',
                        marginTop: 38,
                        marginLeft: 20,
                        marginTop: 35,
                        color: 'white',
                        fontSize: 18,
                        fontWeight: 'bold',
                    }}>Customer Service</Text>
                    <Ionicons name='call-outline' size={40} color='white' style={{
                        position: 'absolute',
                        right: 20,
                        top: 27
                    }} />
                </Card>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {navigation.navigate('Item Lookup'); setCurrRoute('Item Lookup')}}>
                <Card containerStyle={{ height: 100, borderWidth: 0, borderRadius: 10, position: 'relative', padding: 0, backgroundColor: '#b51f1f'}}>
                    <Text style={{
                        alignSelf: 'flex-start',
                        marginTop: 38,
                        marginLeft: 20,
                        marginTop: 35,
                        color: 'white',
                        fontSize: 18,
                        fontWeight: 'bold',
                    }}>Item Lookup</Text>
                    <Ionicons name='search-outline' size={40} color='white' style={{
                        position: 'absolute',
                        right: 20,
                        top: 27
                    }} />
                </Card>
            </TouchableOpacity>
        </View>
    )

    async function nameSetter(){
        setName((await getName()).substring(0,1).toUpperCase() + (await getName()).substring(1).toLowerCase())
    }
}