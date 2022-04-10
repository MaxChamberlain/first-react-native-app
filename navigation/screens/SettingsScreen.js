import React, { useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text, View, Dimensions, TextInput } from 'react-native'
import { Button } from '@rneui/themed'
import { getName, setName } from '../../fetchData/getName'

export default function MainContainer({navigation}) {
    const [ currName, setCurrName ] = useState(null);

    return (
        <View style={{ height: '100%', backgroundColor: '#171717' }}>
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

            <View style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                top: Dimensions.get('window').height * 0.69,
            }}>
                <Button 
                buttonStyle={{
                    width: '100%',
                    height: 40,
                    padding: 0,
                    baackgroundColor: currName ? '#429aff' : 'gray',
                }}
                titleStyle={{
                    fontWeight: 'bold',
                }}
                title='SAVE CHANGES'
                onPress={() => {currName && setName(currName.replace(/[^a-zA-Z ]/g, "").toUpperCase()); setCurrName(null)}}
            />
            </View>
            
        </View>
    )
}