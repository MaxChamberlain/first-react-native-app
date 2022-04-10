import { TextInput, Text, View, Switch, Dimensions } from 'react-native'
import { useState } from 'react'
import { Button } from '@rneui/themed/dist/Button';
import { getName } from '../../../fetchData/getName';

export default function RequestItem({requestDB}){
  const [ sku, setSku ] = useState(null);
  const [ bin, setBin ] = useState(null);
  const [ isNeeded, setIsNeeded ] = useState(false);
  const [ amount, setAmount ] = useState(1);

    return(
        <>
        <View style={{ height: '100%', width: '100%' }}>
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
            top: Dimensions.get('window').height * 0.69,
        }}>
            <Button 
            buttonStyle={{
                width: '100%',
                height: 40,
                padding: 0,
                baackgroundColor: sku && bin ? '#429aff' : 'gray',
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
          setSku(null)
          setIsNeeded(false)
          setAmount(1)
          setBin(null)
          const name = await getName()
          let date = new Date()
          let timestamp = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
          requestDB.getData(`INSERT INTO "MaxChamberlain/Vitality"."needed_items" (picker_name, item, timestamp, status, qty, priority, bin) VALUES ('${sku.toUpperCase()}','${name}','${timestamp}','unseen', '${qty}', '${needed ? 'Yes' : 'No'}', '${bin.toUpperCase()}')`)
        
      }
}