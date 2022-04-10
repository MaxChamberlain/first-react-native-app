import React from 'react'
import { View, Text } from 'react-native'
import { getName } from '../../fetchData/getName'
import { Card, Button } from '@rneui/themed'
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function MainContainer({navigation}) {
    const [ name, setName ] = React.useState(null);
    
    React.useEffect(()=> {
        nameSetter()
    }, [])

    return (
        <View style={{ height: '100%', backgroundColor: '#171717' }}>
            <Text style={{
                color: 'white',
                fontSize: 18,
                fontWeight: 'bold',
                alignSelf: 'center',
            }}>Hello, {name}</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Restocks')}>
                <Card containerStyle={{ height: 100, borderWidth: 0, borderRadius: 10, position: 'relative', padding: 0, backgroundColor: '#303235'}}>
                    <Text style={{
                        marginTop: 35,
                        color: 'white',
                        fontSize: 18,
                        fontWeight: 'bold',
                        alignSelf: 'center',
                    }}>Restock Requests</Text>
                </Card>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
                <Card containerStyle={{ height: 100, borderWidth: 0, borderRadius: 10, position: 'relative', padding: 0, backgroundColor: '#303235'}}>
                    <Text style={{
                        marginTop: 35,
                        color: 'white',
                        fontSize: 18,
                        fontWeight: 'bold',
                        alignSelf: 'center',
                    }}>Settings</Text>
                </Card>
            </TouchableOpacity>
        </View>
    )

    async function nameSetter(){
        setName((await getName()).substring(0,1).toUpperCase() + (await getName()).substring(1).toLowerCase())
    }
}