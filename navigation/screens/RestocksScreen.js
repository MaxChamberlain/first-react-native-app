import React, { useState, useEffect } from 'react'
import { ScrollView, Text, View, Image } from 'react-native'
import { Card, Button } from '@rneui/themed'
import Animated, { FadeOutUp, FadeInUp, FadeIn, StretchOutY, SequencedTransition } from 'react-native-reanimated'
const notificationImage = require('../../assets/notification.png')
const requestDB = require('../../fetchData/requestDB')
import expoPushTokens from '../../expoPushTokens.js';

export default function MainContainer({navigation}) {
    const [ post, setPost ] = useState(null)
    const [ loading, setLoading ] = useState(false)
    const [ failed, setFailed ] = useState(false)


    useEffect(() => {
        const init = async () => {
            setPost( await getPost() )
        }
        init()
        const interval = setInterval(async () => {
          setPost( await getPost() )
        }, 2000);
        return () => clearInterval(interval);
      }, []);

      const styles = {
          cardbody: {
              head: {
                color: 'white',
                fontWeight: 'bold',
                fontSize: 18
              },
              subhead: {
                color: 'white',
                fontSize: 18,
                fontWeight: 'bold',
              },
              body: {
                  color: 'white'
              }
          }
      }

    return (
        <>
            {loading && 
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
            {failed && 
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
            <ScrollView style={{ backgroundColor: '#171717' }}>
                <View>
                    {post ? post.map((item, i) => {
                        return(<Animated.View entering={FadeIn} exiting={StretchOutY} layout={SequencedTransition} key={item._id}>
                        <Card 
                            containerStyle={{ borderWidth: 0, position: 'relative', padding: 0, backgroundColor: item.status === 'unseen' ? '#303235' : '#A0A18C',
                        }}
                        >
                            {item.priority === 'Yes' && <Image source={notificationImage} style={{
                                position: 'absolute', 
                                right: 80,
                                top: 10,
                                width: 12,
                                height: 12,
                            }} />}
                            <View style={{padding: 20}}>
                                <Card.Title style={styles.cardbody.head}>{item.item}</Card.Title>
                                <Card.Title style={styles.cardbody.subhead}>{item.picker_name}</Card.Title>
                                <Card.Title style={styles.cardbody.subhead}>Bin: {item.bin}</Card.Title>
                                <Text style={{
                                    color: 'white',
                                    position: 'absolute', 
                                    left: 10,
                                    top: 8,
                                    fontSize: 20,
                                    fontWeight: 'bold'
                                }}>{item.qty}</Text>
                                <Text style={{
                                    color: 'white',
                                    position: 'absolute', 
                                    right: 10,
                                    top: 5,
                                    fontSize: 18,
                                    fontWeight: 'bold',
                                }}>
                                    {item.priority === 'Yes' ? 'Needed' : 'Not Needed'}
                                </Text>
                            </View>
                            {item.status === 'unseen' ?
                            <Button
                                buttonStyle={{
                                borderRadius: 0,
                                marginLeft: 0,
                                marginRight: 0,
                                marginBottom: 0,
                                width: '100%',
                                }}
                                titleStyle={{
                                    fontWeight: 'bold',
                                }}
                                title="MARK AS SEEN"
                                onPress={() => updateItem(item._id, item.item, item.picker_name)}
                            />
                            :
                            <View style={{ borderWidth: 0, flex: 1, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
                                <View style={{
                                    width: '50%',
                                    backgroundColor: '#5A9953',
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
                                            backgroundColor: '#5A9953'
                                        }}
                                        titleStyle={{
                                            fontWeight: 'bold',
                                        }}
                                        title="I FOUND IT"
                                        onPress={() => removeItem(item._id, item.item, item.picker_name)}
                                    />
                                </View>
                                <View style={{
                                    width: '50%',
                                    backgroundColor: '#B55959',
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
                                            backgroundColor: '#B55959'
                                        }}
                                        titleStyle={{
                                            fontWeight: 'bold',
                                        }}
                                        title="I DIDN'T FIND IT"
                                        onPress={() => unfoundItem(item._id, item.item, item.picker_name)}
                                    />
                                </View>
                            </View>
                    }
                        </Card>
                        </Animated.View>)
                    }) : null}
                </View>
            </ScrollView>
        </>
    )

    async function getPost() {
        try {
            // const data = await requestDB.getData('SELECT * FROM "MaxChamberlain/Vitality"."needed_items" ORDER BY status, timestamp DESC');
            const data = await requestDB.getData('find', 'needed_items', {'status': {"$ne": 'unfound'}})
            return(data.data.documents.filter(item => item.status !== 'unfound'))
        } catch (e) {
            console.log(e);
        }
    }
      
      // Update that item has been seen
      async function updateItem(id, name, item){
        try {
            setLoading(true);
          console.log(`Deleting ${id}...`);
          requestDB.getData('updateOne', 'needed_items', {"_id" : { "$oid" : id}}, {"update" : { "$set" : { "status": "complete" }}})
          
          expoPushTokens('Vishi', `${name.trim().slice(0,1) + name.trim().substring(1).toLowerCase()}, your item ${item} has been marked as seen.`, 'stocked', name)

          setLoading(false);
        } catch (e) {
          console.log(e);
          setFailed(true)
          setTimeout(setFailed(false), 1000)
        }
      }
      
      // Remove item from DB
      async function removeItem(id, name, item) {
        try {
          setLoading(true);
          console.log(`Deleting ${id}...`);
          requestDB.getData('deleteOne', 'needed_items', {"_id" : { "$oid" : id}})

        expoPushTokens('🎉 Stocked! 🎉', `${name.trim().slice(0,1) + name.trim().substring(1).toLowerCase()}, your item ${item} has been stocked.`, 'stocked', name)
        
        setLoading(false);
        } catch (e) {
            console.log(e);
            setFailed(true)
            setTimeout(setFailed(false), 1000)
        }
      }
      
      // Update that item wasnt found
      async function unfoundItem(id, name, item){
        try {
        setLoading(1);
          console.log(`Deleting ${id}...`);
          requestDB.getData('updateOne', 'needed_items', {"_id" : { "$oid" : id}}, {"update" : { "$set" : { "status": "unfound" }}})

        expoPushTokens('❗ UNFOUND ❗', `${name.trim().slice(0,1) + name.trim().substring(1).toLowerCase()}, your item ${item} was unable to be found.`, 'stocked', name)
        setLoading(false);
        } catch (e) {
            console.log(e);
            setFailed(true)
            setTimeout(setFailed(false), 1000)
        }
    }
}