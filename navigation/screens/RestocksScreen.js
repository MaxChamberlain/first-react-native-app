import React, { useState, useEffect } from 'react'
import { ScrollView, Text, View, Image } from 'react-native'
import { Card, Button } from '@rneui/themed'
import Animated, { FadeOutUp, FadeInUp, FadeIn, StretchOutY, SequencedTransition } from 'react-native-reanimated'
const notificationImage = require('../../assets/notification.png')
const requestDB = require('../../fetchData/requestDB')


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
                        return(<Animated.View entering={FadeIn} exiting={StretchOutY} layout={SequencedTransition} key={item}>
                        <Card 
                            containerStyle={{ borderWidth: 0, position: 'relative', padding: 0, backgroundColor: item[3] === 'unseen' ? '#303235' : '#A0A18C',
                        }}
                        >
                            {item[5] == 'Yes' && <Image source={notificationImage} style={{
                                position: 'absolute', 
                                right: 80,
                                top: 10,
                                width: 12,
                                height: 12,
                            }} />}
                            <View style={{padding: 20}}>
                                <Card.Title style={styles.cardbody.head}>{item[1]}</Card.Title>
                                <Card.Title style={styles.cardbody.subhead}>{item[0]}</Card.Title>
                                <Card.Title style={styles.cardbody.subhead}>Bin: {item[6]}</Card.Title>
                                <Text style={{
                                    color: 'white',
                                    position: 'absolute', 
                                    left: 10,
                                    top: 8,
                                    fontSize: 20,
                                    fontWeight: 'bold'
                                }}>{item[4]}</Text>
                                <Text style={{
                                    color: 'white',
                                    position: 'absolute', 
                                    right: 10,
                                    top: 5,
                                    fontSize: 18,
                                    fontWeight: 'bold',
                                }}>
                                    {item[5] === 'Yes' ? 'Needed' : 'Not Needed'}
                                </Text>
                            </View>
                            {item[3] === 'unseen' ?
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
                                onPress={() => updateItem(item[1], item[0])}
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
                                        onPress={() => removeItem(item[1], item[0])}
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
                                        onPress={() => unfoundItem(item[1], item[0])}
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
            const data = await requestDB.getData('SELECT * FROM "MaxChamberlain/Vitality"."needed_items" ORDER BY status, timestamp DESC');
            return(JSON.parse(data).data.data.filter(item => item[3] !== 'unfound'))
        } catch (e) {
            console.log(e);
        }
    }
      
      // Update that item has been seen
      async function updateItem(name, item){
        try {
            setLoading(true);
          console.log(`Deleting ${name} & ${item} Combo...`);
          requestDB.getData(
           `UPDATE "MaxChamberlain/Vitality"."needed_items" SET status = 'complete' WHERE picker_name = '${item}' AND item = '${name}'`
          );
          const today = new Date();
          const date = today.getMonth() + 1 + '/' + today.getDate() + '/' + today.getFullYear();
          await requestDB.getData(
            `UPDATE "MaxChamberlain/Vitality"."needed_items_stats" SET qty=qty + 1 WHERE date='${date}';
            INSERT INTO "MaxChamberlain/Vitality"."needed_items_stats" (date, qty)
                   SELECT '${date}', 1
                   WHERE NOT EXISTS (SELECT date FROM "MaxChamberlain/Vitality"."needed_items_stats" WHERE date='${date}');
      
            INSERT INTO "MaxChamberlain/Vitality"."top_restocks"
            (date, sku)
            VALUES('${date}','${item}')
            `
          );
          setLoading(false);
        } catch (e) {
          console.log(e);
          setFailed(true)
          setTimeout(setFailed(false), 1000)
        }
      }
      
      // Remove item from DB
      async function removeItem(name, item, index) {
        try {
          if(index){
          }
          setLoading(true);
          console.log(`Deleting ${name} & ${item} Combo...`);
          await requestDB.getData(
           `DELETE FROM "MaxChamberlain/Vitality"."needed_items" WHERE picker_name = '${item}' AND item = '${name}'`
          );
          setLoading(false);
        } catch (e) {
            console.log(e);
            setFailed(true)
            setTimeout(setFailed(false), 1000)
        }
      }
      
      // Update that item wasnt found
      async function unfoundItem(name, item, index){
        try {
        setLoading(1);
          console.log(`Deleting ${name} & ${item} Combo...`);
          await requestDB.getData(
           `UPDATE "MaxChamberlain/Vitality"."needed_items" SET status = 'unfound' WHERE picker_name = '${item}' AND item = '${name}'`
          );
          setLoading(false);
        } catch (e) {
            console.log(e);
            setFailed(true)
            setTimeout(setFailed(false), 1000)
        }
    }
}