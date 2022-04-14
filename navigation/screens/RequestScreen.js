import { TextInput, Text, View, Switch, Dimensions } from 'react-native'
import { useState } from 'react'
import { Button } from '@rneui/themed/dist/Button';
import { getName } from '../../fetchData/getName';
import Animated, { FadeOutUp, FadeInUp } from 'react-native-reanimated'
const requestDB = require('../../fetchData/requestDB')
import expoPushTokens from '../../expoPushTokens.js';

export default function RequestScreen(){
  const [ sku, setSku ] = useState(null);
  const [ bin, setBin ] = useState(null);
  const [ isNeeded, setIsNeeded ] = useState(false);
  const [ amount, setAmount ] = useState(1);
  const [ loading, setLoading ] = useState(0);

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


        <View style={{ backgroundColor: '#171717', height: '100%', width: '100%' }}>
            <Text style={{
                color: '#b0b0b0',
                fontSize: 20,
                fontWeight: 'bold',
                marginTop: 50,
                alignSelf: 'center'
            }}>Sku: </Text>
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

            <Text style={{
                color: '#b0b0b0',
                fontSize: 20,
                fontWeight: 'bold',
                marginTop: 30,
                alignSelf: 'center'
            }}>What bin? </Text>
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
                onChangeText={setBin}
                value={bin}
                placeholder="Enter a Bin"
            />
            
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
        </View>
        <View style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            top: Dimensions.get('window').height * 0.65,
        }}>
            <Button 
            buttonStyle={{
                width: '100%',
                height: 80,
                paddingTop: 18,
                backgroundColor: sku && bin ? '#429aff' : 'gray',
                alignItems: 'flex-start',
            }}
            titleStyle={{
                fontWeight: 'bold',
            }}
            title='SUBMIT'
            onPress={() => sku && bin && (isNeeded ? bin && sendRequest(sku, amount, isNeeded, bin) : sendRequest(sku, amount, isNeeded, bin))}
        />
        </View>
        </>
    )

    async function sendRequest(sku, qty, needed, bin) {
        try{
            setSku(null)
            setIsNeeded(false)
            setAmount(1)
            setBin(null)
            setLoading(1)
            const name = await getName()
            expoPushTokens('Vishi', `${name} is requesting ${ needed ? qty + 'x ' : '' }${sku} (${needed ? 'Needed' : 'Not Needed'})`, 'restocks')
            let date = new Date()
            let timestamp = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
            await requestDB.getData(`INSERT INTO "MaxChamberlain/Vitality"."needed_items" (picker_name, item, timestamp, status, qty, priority, bin) VALUES ('${sku.toUpperCase()}','${name}','${timestamp}','unseen', '${qty}', '${needed ? 'Yes' : 'No'}', '${bin.toUpperCase()}')`)
            setLoading(3)
            setTimeout(() => setLoading(0), 1000)
        }catch(e){
            setLoading(2)
            setTimeout(() => setLoading(0), 3000)
            console.log(e)
        }
        
      }
}