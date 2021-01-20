import React, {useState, useEffect} from 'react'
import {View,Modal, Text, TouchableHighlight, FlatList, Alert} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import Style from './../../assets/styles/Style'
import Icon  from 'react-native-vector-icons/Feather'
import {LessNumberBills} from '../calc/Calcs'

export default function ({route, navigation}) {
    const idiom = route.params.idiom
    const [allReports, setAllReports] = useState([])

    const f = async() => {
        try {
            const y = await AsyncStorage.getAllKeys()
            for (let i=0;i<y.length;i++) {
                if (y[i] != 'Definition') {
                    allReports.push({id: i, report: y[i]})
                    setAllReports([...allReports])
                }
            }
            console.log(allReports)
        } catch (e) {
            console.log(e)
        }
    }

    const deleteAllReports = () => {
        for (let i=0;i<allReports.length; i++) {
            AsyncStorage.removeItem(allReports[i].report);
        }
        setAllReports([]);
        {(idiom == "English")?Alert.alert("ALERT","All reports sucessful deleted!"):Alert.alert("ALERTA","Todos os relatórios foram deletados com sucesso!")}
        
    }

    const deleteOne = (index) => { 
        AsyncStorage.removeItem(allReports[index].report);
        allReports.splice(index,1)
        setAllReports ([...allReports])
        {(idiom == "English")?Alert.alert("ALERT","Report sucessful deleted!"):Alert.alert("ALERTA","Relatório deletado com sucesso!")}
        
    }

    const Report = async (index) =>{
        try {
            const x = await AsyncStorage.getItem(allReports[index].report)
            const data = JSON.parse(x)
            //console.log(data)
            let money = []
            let totalOwned = 0
            let totalNeeded = 0
            let ans = []
            for(let i=0;i<data.data.length;i++) {
                money.push({id: data.data[i].id, value: data.data[i].value, quant: data.data[i].qOwned }) //obs no id safado
                totalOwned = totalOwned + (data.data[i].value*data.data[i].qOwned)
                totalNeeded = totalNeeded + (data.data[i].value*data.data[i].qNeeded)
                ans.push({id: data.data[i].id, value: data.data[i].value, quant: data.data[i].qNeeded })
            }

            navigation.navigate('TelaReports', 
            {
                ans: ans, 
                money: money, 
                totalNeeded: totalNeeded, 
                totalOwned: totalOwned,
                idiom: idiom
            })
        } catch (e) {
            console.log (e)
        }
    }

    useEffect(()=>{
        f()
    },[]);

    return (
        <View style={{flex: 1}}>
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}>
            <View style={{flex:8, justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{fontSize: 35, fontWeight: 'bold'}}>
                    {(idiom == "English")?"Saved Reports":"Relatórios Salvos"}
                    </Text>
                </View>
                
                <View style={{alignItems:'flex-end', justifyContent:'flex-end', flex:1, marginRight: 10}}>
                    <TouchableHighlight 
                        underlayColor='#eee' 
                        style={{}} 
                        onPress={() => {
                            {(idiom == "English")
                            ?
                            Alert.alert('ALERT', 'Do you want to delete ALL reports saved?',  [
                            {
                                text: "Cancel",
                                onPress: () => console.log("Cancel Pressed"),
                                style: "cancel"
                            },
                            { 
                                text: "Yes, for sure!", 
                                onPress: () => {
                                    console.log("OK Pressed"); 
                                    deleteAllReports()
                                }
                            }
                            ])
                            :
                            Alert.alert('ALERTA', 'Você quer deletar TODOS os relatórios salvos?',  [
                            {
                                text: "Cancelar",
                                onPress: () => console.log("Cancel Pressed"),
                                style: "cancel"
                            },
                            { 
                                text: "Sim, vai nessa!", 
                                onPress: () => {
                                    console.log("OK Pressed"); 
                                    deleteAllReports()
                                }
                            }
                            ])
                            }
                        }}
                    >
                        <Icon size={40} name="trash-2" />
                    </TouchableHighlight>
                </View>
            </View>
            <View style={{flex: 8, margin: 10, padding: 10, backgroundColor: '#ddd', borderWidth: 2, borderRadius: 5}}>
            <View style={{flexDirection:'row'}}>
                    <FlatList
                        style={{margin: 5}}
                        data={allReports}
                        keyExtractor={item=>item.id.toString()} 
                        renderItem={ ({item,index}) =>
                            <View style={{ flexDirection: 'row', marginBottom: 10, justifyContent: 'space-between'}}>
                                <TouchableHighlight underlayColor='#ded' style={{}} onPress={() => Report(index)}>
                                    <View style={{borderWidth: 2, padding: 5, borderRadius: 10, borderColor: 'green'}}> 
                                        <Text style={{ fontSize: 20, color: 'green'}}>{(idiom == "English")?"Report ":"Relatório "}{index +1}: {item.report}</Text>
                                    </View>
                                </TouchableHighlight>
                               <View style={{ alignItems:'center', justifyContent: 'center' }}>
                                    <TouchableHighlight 
                                        underlayColor='#edd' 
                                        style={{}} 
                                        onPress={() => {
                                            {(idiom == "English")
                                            ?
                                            Alert.alert('ALERT', 'Do you want to delete this report?',  [
                                                {
                                                  text: "Cancel",
                                                  onPress: () => console.log("Cancel Pressed"),
                                                  style: "cancel"
                                                },
                                                { 
                                                  text: "Yes, Im pretty sure!", 
                                                  onPress: () => {
                                                      console.log("OK Pressed"); 
                                                      deleteOne(index)
                                                    }
                                                }
                                            ])
                                            :
                                            Alert.alert('ALERTA', 'Você quer deletar esse relatório?',  [
                                                {
                                                  text: "Cancelar",
                                                  onPress: () => console.log("Cancel Pressed"),
                                                  style: "cancel"
                                                },
                                                { 
                                                  text: "Sim, sem dúvidas!", 
                                                  onPress: () => {
                                                      console.log("OK Pressed"); 
                                                      deleteOne(index)
                                                    }
                                                }
                                            ])
                                            }
                                        }}
                                    >
                                        <Icon size={25} name="delete" color='red' />
                                    </TouchableHighlight>
                                </View>
                            </View>
                        }
                    />
                </View>
            </View>
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
                <TouchableHighlight onPress={()=>navigation.goBack()} underlayColor='#555' style={{marginTop: 5, marginBottom: 12, marginRight: 10, marginLeft: 10}}>
                    <View style={{backgroundColor: '#ddd',alignItems: 'center', justifyContent: 'center', flexDirection: 'row', borderWidth: 2, borderRadius: 5, padding: 5, width: 140}}>
                        <Icon size={20} name="home"/>
                        <Text>{(idiom == "English")?" Back to Menu":" Voltar ao Menu"}</Text>
                    </View>
                </TouchableHighlight>
            </View>
        </View>
    )
}