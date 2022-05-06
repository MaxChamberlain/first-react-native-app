import { TextInput, ScrollView, Alert, Modal, StyleSheet, Text, Pressable, View, Dimensions } from 'react-native';
import Animated, { FadeOutUp, FadeInUp } from 'react-native-reanimated'
import { useState, useEffect } from 'react'
import expoPushTokens from '../../expoPushTokens.js';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Switch } from 'react-native-gesture-handler';
const shiphero = require('../../fetchData/shiphero.js')
const requestDB = require('../../fetchData/requestDB.js')
const { getName } = require('../../fetchData/getName.js')

export default function CustomerServiceScreen(){
    const [ list, setList ] = useState(null)
    const [ modalVisible, setModalVisible ] = useState(false);
    const [ response, setResponse ] = useState(null)
    const [ name, setName ] = useState(null)
    const [ loading, setLoading ] = useState(0)
    const [ showFilters, setShowFilters ] = useState(false)
    const [ newFilter, setNewFilter ] = useState(false)
    const [ completeFilter, setCompleteFilter ] = useState(false)
    const [ issueFilter, setIssueFilter ] = useState(false)

    useEffect(() => {
        const init = async () => {
            setList(await getList());
            setName(await getName())
        };
        init();
        const interval = setInterval(async () => {
            setList(await getList());
        }, 2000)
        return () => clearInterval(interval);
    }, [])

    const styles = StyleSheet.create({
        centeredView: {
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          marginTop: 22,
          position: 'relative'
        },
        modalView: {
          margin: 20,
          backgroundColor: "#202225",
          padding: 35,
          alignItems: "center",
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2
          },
          shadowOpacity: 0.25,
          shadowRadius: 4,
          elevation: 5
        },
        button: {
          padding: 10,
          elevation: 2
        },
        buttonOpen: {
          paddingTop: 30
        },
        buttonClose: {
          backgroundColor: "#2196F3",
        },
        textStyle: {
          color: "white",
          fontWeight: "bold",
          textAlign: "center"
        },
        modalText: {
          marginBottom: 15,
          textAlign: "center"
        }
      });      

    return(
        <>
        {loading === 1 && 
            <Animated.View style={{
                backgroundColor: '#36393f',
                opacity: 0.8,
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
                opacity: 0.8,
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
                opacity: 0.8,
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

            <View style={{ zIndex: 999, alignItems: 'flex-end', paddingTop: 10, paddingRight: 10, backgroundColor: '#171717' }}>
            <Pressable
                onPress={() => {
                    setShowFilters(shownFilters => !shownFilters);
            }}
            >
                <Ionicons name={newFilter || completeFilter || issueFilter ? 'funnel' : 'funnel-outline'} size={30} color='white' />
            </Pressable>
            </View>

            {showFilters && 
            <>
                <Pressable
                    style={{top: 0, left: 0, right: 0, bottom: 0, position: 'absolute', zIndex: 998}}
                    onPress={() => {
                        setShowFilters(false);
                    }} />
                <View style={{ padding: 10, position: 'absolute', top: 40, left: '40%', right: 10, bottom: '20%', zIndex: 9999, backgroundColor: '#272727' }}
                    onBlur={() => setShowFilters(false)}
                >
                    
                    <Text style={{alignSelf: 'center', color: 'white', fontSize: 20, fontWeight: 'bold'}}>
                        Status
                    </Text>
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 20, paddingRight: 20 }}>
                            <Text style={{
                                color: 'white',
                                fontSize: 20,
                                alignSelf: 'center',
                                marginTop: 30,
                                marginBottom: 10,
                                alignSelf: 'flex-start'
                            }}>
                                New
                            </Text>
                            <Switch
                            trackColor={{ false: "#767577", true: "#429aff" }}
                            thumbColor='white'
                            ios_backgroundColor="#3e3e3e"
                            style={{alignSelf: 'flex-end', marginTop: 10}}
                            onValueChange={() => setNewFilter(wantedNew => !wantedNew)}
                            value={newFilter}
                        />
                    </View>
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 20, paddingRight: 20 }}>
                            <Text style={{
                                color: 'white',
                                fontSize: 20,
                                alignSelf: 'center',
                                marginTop: 30,
                                marginBottom: 10,
                                alignSelf: 'flex-start'
                            }}>
                                Complete
                            </Text>
                            <Switch
                            trackColor={{ false: "#767577", true: "#429aff" }}
                            thumbColor='white'
                            ios_backgroundColor="#3e3e3e"
                            style={{alignSelf: 'flex-end', marginTop: 10}}
                            onValueChange={() => setCompleteFilter(wantedComplete => !wantedComplete)}
                            value={completeFilter}
                        />
                    </View>
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 20, paddingRight: 20 }}>
                            <Text style={{
                                color: 'white',
                                fontSize: 20,
                                alignSelf: 'center',
                                marginTop: 30,
                                marginBottom: 10,
                                alignSelf: 'flex-start'
                            }}>
                                Issue
                            </Text>
                            <Switch
                            trackColor={{ false: "#767577", true: "#429aff" }}
                            thumbColor='white'
                            ios_backgroundColor="#3e3e3e"
                            style={{alignSelf: 'flex-end', marginTop: 10}}
                            onValueChange={() => setIssueFilter(wantedIssue => !wantedIssue)}
                            value={issueFilter}
                        />
                    </View>
                </View>
            </>
            }

            <ScrollView style={{ backgroundColor: '#171717' }}>
                { list && list.map((e) => {
                    let showFromFilters = [newFilter ? 'new' : '', completeFilter ? 'in progress' : '', issueFilter ? 'issue' : '']
                    if(showFromFilters[0] === '' && showFromFilters[1] === '' && showFromFilters[2] === ''){
                        showFromFilters = ['new','in progress','issue']
                    }
                    if(showFromFilters.includes(e[6])){
                        return(<View 
                            key={e[12]}
                            style={{marginTop: 10}}>
                            <Modal
                                animationType="slide"
                                transparent={true}
                                visible={modalVisible === e[12]}
                                onRequestClose={() => {
                                Alert.alert("Modal has been closed.");
                                setModalVisible(modalVisible ? false : e[12]);
                                }}
                            >
                                <View style={styles.centeredView}>
                                    <View style={styles.modalView}>
                                        <Pressable
                                        style={[styles.button, styles.buttonClose, { position: 'absolute', top: 0, right: 0, width: Dimensions.get('screen').width - 40, margin: 0, zIndex: 999}]}
                                        onPress={() => setModalVisible(false)}
                                        >
                                        <Text style={styles.textStyle}>Close</Text>
                                        </Pressable>



                                        <Text style={[styles.textStyle, { color: 'white', fontWeight: 'bold', fontSize: 20, marginTop: 20 }]}>{e[0]}</Text>
                                        <Text style={[styles.textStyle, {color: 'white', fontWeight: 'bold', marginTop: 10}]}>{e[1]}</Text>
                                        <Text style={[styles.textStyle, {color: 'white', fontWeight: 'bold', marginBottom: 40, marginTop: 10}]}>From {e[5].slice(0, 1) + e[5].slice(1).toLowerCase()}</Text> 
                                        <ScrollView
                                        contentContainerStyle={{
                                            width: '96%'
                                        }}>

                                            {e[2].map(e => {
                                                return(
                                                    <View key={e[12]} style={{ backgroundColor: 'rgba(255,255,255,0.1)', width: '100%', margin: 5, paddingBottom: 5, borderRadius: 5 }}>
                                                        <Text style={[styles.textStyle, { textAlign: 'center', marginTop: 10, fontSize: 20, color: 'white', fontWeight: 'bold' }]}>{e[0]}</Text>

                                                        <View key={e[12]} style={{ width: '100%', flexDirection: 'row', display: 'flex', justifyContent: 'space-around' }}>  
                                                            <Text style={[styles.textStyle, { textAlign: 'center', flex: 1, color: 'white', fontWeight: 'bold', marginLeft: 5 }]}>Committed {'\n' + e[1]}</Text>
                                                            <Text style={[styles.textStyle, { textAlign: 'center', flex: 1.2, color: 'white', fontWeight: 'bold', marginLeft: 5 }]}>Backordered {'\n' + e[2]}</Text>
                                                            <Text style={[styles.textStyle, { textAlign: 'center', flex: 1, color: 'white', fontWeight: 'bold' }]}>Bin {'\n' + e[3]}</Text>
                                                        </View>
                                                    </View>
                                                )
                                            })}
                                        </ScrollView>
                                        
                                        {e[6] === 'new' ?
                                            <>
                                                <TextInput 
                                                    style={{ backgroundColor: 'white', marginTop: 10, borderWidth: 1, width: Dimensions.get('screen').width - 110, height: 40 }}
                                                    onChangeText={setResponse}
                                                    value={response}
                                                    placeholder="Comment or Response"
                                                />
                                                <View style={{display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-around'}}>
                                                    
                                                    <Pressable
                                                    style={[styles.button, styles.buttonClose, { width: '50%', margin: 0, zIndex: 999}]}
                                                    onPress={() => {
                                                        setModalVisible(false);
                                                        rectifyItem(e[0], e[5], response , name.trim(), e[12])
                                                    }}
                                                    >
                                                    <Text style={styles.textStyle}>Complete</Text>
                                                    </Pressable>
                                                    <Pressable
                                                    style={[styles.button, styles.buttonClose, {backgroundColor: 'gray', width: '50%', margin: 0, zIndex: 999}]}
                                                    onPress={() => {
                                                        setModalVisible(false);
                                                        elevateItem(e[0], e[5], response, name.trim(), e[12], e._id)
                                                    }}
                                                    >
                                                    <Text style={styles.textStyle}>Issue</Text>
                                                    </Pressable>
                                                </View>
                                            </>
                                            :
                                            <View style={{ marginTop: 20, display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-around'}}>   
                                                <Pressable
                                                style={[styles.button, styles.buttonClose, { width: '100%', margin: 0, zIndex: 999}]}
                                                onPress={() => {
                                                    setModalVisible(false);
                                                    completeItem(e[0], e[5], e[12])
                                                }}
                                                >
                                                <Text style={styles.textStyle}>Clear</Text>
                                                </Pressable>
                                            </View>}
                                    </View>
                                </View>
                            </Modal>
                            <Pressable
                                style={[styles.button, styles.buttonOpen, { backgroundColor:  e[6] === 'new' ? '#22599c' : e[6] === 'in progress' ? '#487537' : '#994343'}]}
                                onPress={() => setModalVisible(e[12])}
                            >
                                <Text style={styles.textStyle}>{e[0]}</Text>
                                <Text style={styles.textStyle}>{e[1]}</Text>
                                <Text style={styles.textStyle}>From {e[5].slice(0, 1) + e[5].slice(1).toLowerCase()}</Text>
                                <Text style={[styles.textStyle, { position: 'absolute', top: 10, right: 15 }]}>{e[8]}</Text>
                                <Text style={[styles.textStyle, { position: 'absolute', top: 10, left: 15 }]}>{e[9]}</Text>
                                <Text style={[styles.textStyle, { marginTop: 10 }]}>{e[3]}</Text>
                                <Text style={[styles.textStyle, { marginTop: 10 }]}>{
                                    e[7] && 'Fixed by ' + e[7].slice(0, 1) + e[7].slice(1).toLowerCase() + ':\n\n' +
                                    e[10]
                                }</Text>
                            </Pressable>
                        </View>)
                    }
                })}
            </ScrollView>
        </>
    )

    async function getList(){
        let reference = []

        const data = await requestDB.getData('find', 'cs_orders', {'status': {"$ne": 'complete'}})

        let list = data.data.documents.map((e, i) => {
            let ageDays = (new Date().getDate() - (e.timestamp.split(' ')[0].split('-')[2] > 9 ? e.timestamp.split(' ')[0].split('-')[2] : e.timestamp.split(' ')[0].split('-')[2].replace(0,'')))
            let ageHours = (new Date().getHours() - e.timestamp.split(' ')[1].split(':')[0].replace(0,''))
            let ageMinutes = (new Date().getMinutes() - e.timestamp.split(' ')[1].split(':')[1].replace(0,''))
            let age = ageDays > 0 ? `${ageDays}d` : ageHours > 0 ? `${ageHours}h` : ageMinutes > 0 ? `${ageMinutes}m` : '< 1 minute'
            let orderDate = new Date(e.order_date)
                let sublist = [e.order_number, e.email, [], e.note, e[6], e.fromname.trim(), e.status, e.fixedname, age, `${orderDate.getMonth() + 1}/${orderDate.getDate()}/${orderDate.getFullYear()}`, e.response, e[13], e._id]
                for (let x = 0; x < e.sku.split(',').length; x++){
                    let currSku = e.sku.split(',')[x]
                    console.log(currSku)
                    sublist[2].push([
                        currSku.replace('[','').replace(']','').replace('"',''),
                        e.quantity.split(',')[x], 
                        e.backordered.split(',')[x]
                    ])
                    reference.push(e.sku.split(',')[x])
                }
                return sublist
            })

        // const binList = await requestDB.getData('find', 'inventory_snapshot', {'sku': {"$in": reference.join("','")}})

        // list.forEach((e) => {
        //     for (let x = 0; x < e[2].length; x++){
        //         e[2][x].push(binList.find(b => b[0] === e[2][x][0])[1] ?? 'N/A')
        //     }
        // })
        return list.filter(e => e[6] !== 'complete')
    }

    async function completeItem(order, name, id){
        try{
            console.log(name)
            setList(null)
            setLoading(true)
            console.log(`Removing ${order}`)
          requestDB.getData('updateOne', 'cs_orders', {"_id" : { "$oid" : id}}, {"update" : { "$set" : { "status": "complete" }}})
          setLoading(3)
          setTimeout(() => setLoading(0), 3000)
        }catch(e){
            console.log(e)
            setLoading(2)
            setTimeout(() => setLoading(0), 3000)
        }
    }

    async function rectifyItem(order, name, response, fixedby, id){
        try{
            setList(null)
            setLoading(1)
            console.log(`Completing ${order}`)
          requestDB.getData('updateOne', 'cs_orders', {"_id" : { "$oid" : id}}, {"update" : { "$set" : { "status": "in progress", "fixedname": fixedby, "response": response }}})
          await expoPushTokens('Vishi', `${fixedby} has completed ${order}: ${response}`, 'customerservice')
            setLoading(3)
            setTimeout(() => setLoading(0), 3000)
        }catch(e){
            console.log(e)
            setLoading(2)
            setTimeout(() => setLoading(0), 3000)
        }
    }

    async function elevateItem(order, name, response, fixedby, id){
        try{

            setList(null)
            setLoading(1)
            console.log(`Escalating ${order}`)
          requestDB.getData('updateOne', 'cs_orders', {"_id" : { "$oid" : id}}, {"update" : { "$set" : { "status": "issue", "fixedname": fixedby, "response": response }}})
          await expoPushTokens('Vishi', `${fixedby} has elevated ${order}: ${response}`, 'customerservice')
            setLoading(3)
            setTimeout(() => setLoading(0), 3000)
        }catch(e){
            console.log(e)
            setLoading(2)
            setTimeout(() => setLoading(0), 3000)
        }
    }   
}