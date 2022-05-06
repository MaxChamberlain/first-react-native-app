import React from 'react'
import { View, Text, TextInput, Image, ScrollView, Dimensions, Pressable } from 'react-native'
import { getName } from '../../fetchData/getName'
import { Card, Button } from '@rneui/themed'
import { TouchableOpacity } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons'
import Animated, { FadeOutUp, FadeInUp } from 'react-native-reanimated'
import { get } from '../../fetchData/shiphero'
const shiphero = require('../../fetchData/shiphero.js')

export default function MainContainer({navigation, setCurrRoute}) {
    const [ sku, setSku ] = React.useState(null)
    const [ loading, setLoading ] = React.useState(0)
    const [ selection, setSelection ] = React.useState(null)
    const [ adjusting, setAdjusting ] = React.useState(false)
    const [ amount , setAmount ] = React.useState(0)
    const [ inStock , setInStock ] = React.useState(0)
    
    return (
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

            <View style={{ height: '100%', backgroundColor: '#171717' }}> 
                <Text style={{
                    color: 'white',
                    fontSize: 40,
                    fontWeight: 'bold',
                    marginTop: 10,
                    alignSelf: 'center',
                    opacity: 0.8
                }}>
                    Search a Sku
                </Text>
                <TextInput
                    clearButtonMode={true}
                    style={{
                        height: 40, 
                        borderColor: 'gray', 
                        borderWidth: 1,
                        backgroundColor: '#fff',
                        marginTop: 10,
                        width: '80%',
                        alignSelf: 'center',
                        zIndex: 9998
                    }}
                    onChangeText={setSku}
                    value={sku}
                    placeholder="Enter a SKU"
                />
                <View style={{
                position: 'absolute',
                top: '50%',
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
            <ScrollView>
                {selection &&
                    <Card containerStyle={{ marginBottom: 150, backgroundColor: '#303235', borderWidth: 0, }}>

                        <Pressable style={{
                            position: 'absolute',
                            top: 0,
                            marginBottom: 0,
                            width: '100%',
                            backgroundColor: '#429aff',
                            height: 40,
                            zIndex: 9999,
                            opacity: 0.8
                        }}
                        onPress={() => {
                            setAdjusting(wasAdjusting => !wasAdjusting)
                            setInStock(() => selection.warehouse_products[0].on_hand)
                            }}>
                            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20, alignSelf: 'center', paddingTop: 7.5 }}>Adjust Inventory</Text>
                        </Pressable>
                        <Card.Title style={{color: 'white', fontSize: 20, marginBottom: 20, marginTop: 60}}>{ selection.name }</Card.Title>
                        <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold', alignSelf: 'center', marginBottom: 20}}>{ selection.warehouse_products[0].on_hand } On Hand</Text>
                        <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around'}}>
                            <Text style={{color: '#a7a7a7', fontSize: 15, fontWeight: 'bold',}}>Weight: { selection.dimensions.weight }</Text>
                            <Text style={{color: '#a7a7a7', fontSize: 15, fontWeight: 'bold',}}>{ selection.active ? 'Active' : 'Inactive' }</Text>
                        </View>
                        <View style={{ marginTop: 20, display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-around'}}>
                            <View style={{padding: 20, display: 'flex', justifyContent: 'space-around'}}>
                                <Text style={{color: 'white', fontSize: 15, fontWeight: 'bold'}}>Bin { selection.warehouse_products[0].inventory_bin }</Text>
                                <Text style={{color: 'white', fontSize: 15, fontWeight: 'bold'}}>{ selection.warehouse_products[0].available } Available</Text>
                                <Text style={{color: 'white', fontSize: 15, fontWeight: 'bold'}}>{ selection.warehouse_products[0].backorder } Backordered</Text>
                            </View>
                            <Image
                                style={{
                                    width: 150,
                                    height: 150,
                                    borderRadius: 5,
                                }}
                                source={{
                                    uri: selection.large_thumbnail,
                                }}
                            />
                        </View>
                    </Card>
                }
            </ScrollView>
            </View>
            {adjusting && <Animated.View
            entering={FadeInUp}
            exiting={FadeOutUp}
            style={{
                position: 'absolute',
                top: 15,
                left: 5,
                right: 5,
                bottom: 10,
                backgroundColor: 'black',
                opacity: 0.9
            }}>
                <View style={{
                    height: '80%',
                    width: '90%',
                    backgroundColor: '#202020',
                    marginTop: '15%',
                    marginLeft: '5%'
                }}>

                <Pressable style={{
                    position: 'absolute',
                    top: 0,
                    right: 0
                }}
                onPress={() => setAdjusting(false)}>
                    <Ionicons name='close' size={40} color='white'/>
                </Pressable>
                    <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold', marginTop: 35, marginLeft: 50, alignSelf: 'center'}}>Adjusting {sku}</Text>
                    <Image
                        style={{
                            position: 'absolute',
                            top: 10,
                            left: 10,
                            width: 60,
                            height: 60,
                            borderRadius: 5,
                        }}
                        source={{
                            uri: selection.large_thumbnail,
                        }}
                    />
                    <Text style={{color: 'gray', fontSize: 30, fontWeight: 'bold', marginTop: 70, alignSelf: 'center'}}>{inStock} On Hand</Text>
                    <View style={{
                        display: 'flex', justifyContent: 'space-around', flexDirection: 'row', marginTop: 50
                    }}>
                        <Pressable
                        onPress={() => setAmount(currAmount => currAmount - 1)}>
                            <Text style={{color: 'white', fontSize: 60, fontWeight: 'bold'}}>-</Text>
                        </Pressable>
                            <Text style={{color: 'white', fontSize: 40, fontWeight: 'bold', marginTop: 20}}>{amount > 0 ? `+${amount}` : amount}</Text>
                        <Pressable
                        onPress={() => setAmount(currAmount => currAmount + 1)}>
                                <Text style={{color: 'white', fontSize: 60, fontWeight: 'bold'}}>+</Text>
                        </Pressable>
                    </View>

                    <Pressable style={{
                        position: 'absolute',
                        bottom: 0,
                        marginBottom: 0,
                        width: '100%',
                        backgroundColor: '#429aff',
                        height: 80,
                        zIndex: 9999
                    }}
                    onPress={() => submitAdjustment(sku, amount)}>
                        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20, alignSelf: 'center', paddingTop: 7.5 }}>Submit Changes</Text>
                    </Pressable>
                </View>
            </Animated.View>}
        </>
    )

    async function getProducts(skuInput) {
        try{
              setLoading(1)
              setAmount(0)
              setInStock(null)
            let query = `
            
            {
                product(sku: "${skuInput}") {
                request_id
                complexity
                data {
                        id
                        name
                        sku
                        active
                        large_thumbnail
                        product_note
                        price
                        warehouse_products {
                            on_hand
                            inventory_bin
                            available
                            backorder
                        }
                        dimensions{
                            weight
                        }
                    }
                }
            }
            `;

            let data = JSON.parse(await get(query))
            data = data.data.data.product.data
            setSelection(data)
            setLoading(3)
            setTimeout(() => setLoading(0), 1000)
        }catch(e){
            setLoading(2)
            setTimeout(() => setLoading(0), 3000)
            console.log(e)
        }
        
    }

    async function submitAdjustment(skuKey, amtKey){
        try{
            setLoading(1)
              let query = `
              mutation {
                inventory_${amtKey > 0 ? 'add' : 'remove'}(data: {
                sku: "${skuKey}"
                quantity: ${amtKey},
                warehouse_id:"V2FyZWhvdXNlOjgzODY="
                }) {
                request_id
                complexity
                warehouse_product {
                id
                sku
                warehouse_id
                on_hand
                }
                }
                }
              `
              shiphero.get(query)
              setAmount(0)
              setTimeout(() => getProducts(skuKey), 1000)
              setLoading(3)
              setTimeout(() => setLoading(0), 1000)
          }catch(e){
              setLoading(2)
              setTimeout(() => setLoading(0), 3000)
              console.log(e)
        }
      }

}