import { TextInput, Text, View, Switch, Dimensions } from 'react-native'
import { useState } from 'react'
import { Button } from '@rneui/themed/dist/Button';
import { getName } from '../../fetchData/getName';
import Animated, { FadeOutUp, FadeInUp } from 'react-native-reanimated'
import expoPushTokens from '../../expoPushTokens.js';
import { ScrollView } from 'react-native-gesture-handler';
import { Card } from '@rneui/themed';
const requestDB = require('../../fetchData/requestDB')

export default function RequestScreen(){
  const [ sku, setSku ] = useState(null);
  const [ isNeeded, setIsNeeded ] = useState(false);
  const [ amount, setAmount ] = useState(1);
  const [ loading, setLoading ] = useState(0);
  const [ selection, setSelection ] = useState(null);
  const [ openRequest, setOpenRequest ] = useState(null);

    return(
        <>
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

            {openRequest && 
            <Animated.View style={{
                backgroundColor: '#36393f',
                height: '100%',
                width: '100%',
                opacity: 0.95,
                position: 'absolute',
                top: 0,
                left: 0,
                zIndex: 998,
                alignItems: 'center',
                padding: 20
            }}
            entering={FadeInUp}
            exiting={FadeOutUp}
            >
                {openRequest["Item Name"].split(' - ').map(e => {
                    return <Text style={{ marginBottom: 10, color: 'white', fontWeight: 'bold', fontSize: 20, textAlign: 'center' }}>{e}</Text>
                })}
                <Text style={{ marginTop: 20, marginBottom: 10, color: 'white', fontWeight: 'bold', fontSize: 20 }}>{openRequest.sku}</Text>
                
            <Text style={{
                color: '#b0b0b0',
                fontSize: 20,
                fontWeight: 'bold',
                marginTop: 30,
                alignSelf: 'center'
            }}>Do you need this? </Text>
            <Switch
                trackColor={{ false: "#767577", true: "#429aff" }}
                thumbColor='white'
                ios_backgroundColor="#3e3e3e"
                style={{alignSelf: 'center', marginTop: 10}}
                onValueChange={() => setIsNeeded(wasNeeded => !wasNeeded)}
                value={isNeeded}
            />

            {isNeeded && <><Text style={{
                color: '#b0b0b0',
                fontSize: 20,
                fontWeight: 'bold',
                marginTop: 30,
                alignSelf: 'center'
            }}>How many? </Text>
            <TextInput
                style={{
                    height: 40, 
                    borderColor: 'gray', 
                    borderWidth: 1,
                    backgroundColor: '#fff',
                    marginTop: 10,
                    width: '30%',
                    alignSelf: 'center',
                }}
                onChangeText={setAmount}
                value={amount}
                placeholder="Enter amount"
            /></>}


                <View style={{ borderWidth: 0, flex: 1, display: 'flex', flexDirection: 'row', alignItems: 'stretch', justifyContent: 'space-around', position: 'absolute', bottom: 10 }}>
                    <View style={{
                        width: '50%',
                        backgroundColor: '#429aff',
                    }}>
                        <Button
                            containerViewStyle={{width: '100%', marginLeft: 0}} 
                            buttonStyle={{
                                borderStyle: 'solid',
                                borderRadius: 0,
                                marginLeft: 0,
                                marginRight: 0,
                                marginBottom: 0,
                                alignSelf: 'stretch',
                                textAlign: 'center',
                                backgroundColor: '#429aff'
                            }}
                            titleStyle={{
                                fontWeight: 'bold',
                            }}
                            title="Confirm"
                            onPress={() => {
                                (isNeeded ? (amount && sendRequest(openRequest.sku, amount, isNeeded, openRequest.bin)) : sendRequest(openRequest.sku, amount, isNeeded, openRequest.bin))
                            }}
                        />
                    </View>
                    <View style={{
                        width: '50%',
                        backgroundColor: '#gray',
                    }}>
                        <Button
                            containerViewStyle={{width: '100%', marginLeft: 0}}
                            buttonStyle={{
                                borderStyle: 'solid',
                                borderRadius: 0,
                                marginLeft: 0,
                                marginRight: 0,
                                marginBottom: 0,
                                backgroundColor: 'gray',
                                alignSelf: 'stretch',
                                textAlign: 'center'
                            }}
                            titleStyle={{
                                fontWeight: 'bold',
                            }}
                            title="Cancel"
                            onPress={() => {
                                cancel()
                            }}
                        />
                    </View>
                </View>
            </Animated.View>}

        <View style={{ backgroundColor: '#171717', position: 'absolute', top: 0, left: 0, right: 0, bottom: 80, zIndex: 2}}>
            <Text style={{
                color: 'white',
                fontSize: 40,
                fontWeight: 'bold',
                marginTop: 10,
                alignSelf: 'center',
                opacity: 0.8
            }}>
                Request an item
            </Text>
            <TextInput
                style={{
                    height: 40, 
                    borderColor: 'gray', 
                    borderWidth: 1,
                    backgroundColor: '#fff',
                    marginTop: 10,
                    width: '80%',
                    alignSelf: 'center',
                }}
                onChangeText={setSku}
                value={sku}
                placeholder="Enter a SKU"
            />
        </View>
        <View style={{
            position: 'absolute',
            top: 120,
            bottom: 80,
            alignSelf: 'center',
            zIndex: 3
        }}>
            {selection &&
            <ScrollView style={{
                height: Dimensions.get('window').height / 2,
            }}>
                {selection.map((e,i) => {
                    return (
                        <Card key={i}
                            containerStyle={{ borderWidth: 0, position: 'relative', padding: 0, backgroundColor: '#303235', padding: 5, paddingTop: 15
                        }}
                        >
                            <Card.Title style={{ fontSize: 18, color: 'white' }}>{e['Item Name']}</Card.Title>
                            <Card.Title style={{ fontSize: 16, color: 'white' }}>{e.sku}</Card.Title>
                            <Card.Title style={{ fontSize: 16, color: 'white' }}>Bin {e.bin}</Card.Title>
                            
                            <View style={{
                                backgroundColor: '#429aff'
                                }}>
                                    <Button
                                        containerViewStyle={{width: '100%', marginLeft: 0}}
                                        buttonStyle={{
                                            borderStyle: 'solid',
                                            borderRadius: 0,
                                            marginLeft: 0,
                                            marginRight: 0,
                                            marginBottom: 0,
                                            backgroundColor: 'gray',
                                            alignSelf: 'stretch',
                                            textAlign: 'center',
                                            backgroundColor: '#429aff'
                                        }}
                                        titleStyle={{
                                            fontWeight: 'bold',
                                        }}
                                        title="I Need This"
                                        onPress={() => setOpenRequest(e)}
                                    />
                                </View>

                        </Card>
                    )
                })}
            </ScrollView>
            }
        </View>
        
        <View style={{
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            zIndex: 1
        }}>
            <View style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0
            }}>
                <Button 
                containerStyle={{
                    borderRadius: 0
                }}
                buttonStyle={{
                    width: '100%',
                    height: "100%",
                    paddingTop: 30,
                    paddingBottom: 30,
                    backgroundColor: sku ? '#429aff' : 'gray',
                    alignItems: 'flex-start',
                    borderRadius: 0
                }}
                titleStyle={{
                    fontWeight: 'bold',
                }}
                title='SEARCH'
                onPress={() => sku && getProducts(sku)}
            />
            </View>
        </View>
        </>
    )

    function cancel(){
        setOpenRequest(null)
        setSku(null)
        setIsNeeded(false)
        setAmount(1)
    }

    async function sendRequest(sku, qty, needed, bin) {
        try{
            setOpenRequest(null)
            setSku(null)
            setIsNeeded(false)
            setAmount(1)
            setLoading(1)
            const name = await getName()
            expoPushTokens('Vishi', `${name} is requesting ${ needed ? qty + 'x ' : '' }${sku} (${needed ? 'Needed' : 'Not Needed'})`, 'restocks')
            let date = new Date()
            let timestamp = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
            await requestDB.getData('insertOne', 'needed_items','',{
                "document": {
                    "picker_name": name.toUpperCase(), 
                    "item": sku.toUpperCase().split(' : ')[1], 
                    "timestamp": timestamp, 
                    "status": "unseen", 
                    "qty": needed ? qty : 'NA', 
                    "priority": needed ? 'Yes' : 'No', 
                    "bin": bin
                }
            })
            setLoading(3)
            setOpenRequest(null)
            setTimeout(() => setLoading(0), 1000)
        }catch(e){
            setLoading(2)
            setTimeout(() => setLoading(0), 3000)
            console.log(e)
        }
        
      }

    async function getProducts(skuInput) {
        try{
            setLoading(1)
            setSelection((await requestDB.getData('find', 'inventory_snapshot', {"sku": {"$regex": `(${skuInput.toUpperCase()})`}})).data.documents)
            setLoading(3)
            setTimeout(() => setLoading(0), 1000)
        }catch(e){
            setLoading(2)
            setTimeout(() => setLoading(0), 3000)
            console.log(e)
        }
        
    }
}