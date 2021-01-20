import React, {useEffect, useState} from 'react'
import {View,Image, Text, TouchableHighlight, Modal, FlatList, Alert} from 'react-native'
import Style from '../../assets/styles/Style'
import Icon  from 'react-native-vector-icons/Feather'
import AsyncStorage from '@react-native-community/async-storage'


export default function ({route, navigation}) {
    //const [ans,setAns] = useState([]);
    //const [money, setMoney] = useState([]);
    const idiom = route.params.idiom
    const [visible,setVisible] = useState(false)
    const [totalNeeded, setTotalNeeded] = useState(0);
    const [totalOwned, setTotalOwned] = useState(0);
    const [data, setData] = useState([]);
    const [tips, setTips] = useState([]);
    
    const saveReport = async (key) => {
        const strData = JSON.stringify(data)
        const strTips = JSON.stringify(tips)
        const dataToSave = {data: data, tips: tips}
        AsyncStorage.setItem(key,JSON.stringify(dataToSave));
        const x = await AsyncStorage.getItem(key)
        console.log(x)
        {(idiom == "English")?Alert.alert('ALERT', 'Data saved!'):Alert.alert("ALERTA", "Dados salvos!")}
        
    }

    const loadTips = () => {
        let idTip = 0; //contador para o id da FlatList
        for (let i=0;i<data.length-1;i++) { //Percorre os dados até -1 porque o ultimo valor não tem como trocar por nada
            let lack = Number(data[i].qOwned) - Number(data[i].qNeeded); //quantas sobraram(ou faltaram)
            if(lack>0) { //Se sobrou de alguma nota                
                for (let j=i+1; j<data.length;j++) { //Percorre as notas seguintes                    
                    let div = data[j].value/data[i].value; //Verifica se pode trocar uma nota por outra (uma de 20 por 10 pode mas 50 por 20 nao pode)
                    let jLack = Number(data[j].qNeeded) - Number(data[j].qOwned); //quantas preciso da nota de valor mais alto
                    if ((data[j].value%data[i].value == 0)&&(jLack>0)) { // Verifica a troca se é possivel, verifica se preciso da nota superior, 
                        if (lack >= div) { //verifica se a quantidade que sobrou é possivel fazer trocas
                            let exg = Number.parseInt((lack/div ),10); //quantas trocas pode fazer
                            if(jLack >= exg) { //se o numero de trocas é menor do que quantas preciso ainda
                                tips.push({id: idTip, excededValue: data[i].value, tradeValue: data[j].value, times: exg});
                                setTips([...tips]);
                                idTip = idTip + 1;
                            } else { //se o numero de trocas é maior do que quantas preciso
                                tips.push({id: idTip, excededValue: data[i].value, tradeValue: data[j].value, times: jLack});
                                setTips([...tips]);
                                idTip = idTip + 1;
                            }
                        }
                    }
                }
            }
        }
        console.log(tips)
    }
    useEffect (()=>{
        let received1 = route.params.ans;
        let received2 = route.params.money;
        //console.log("efeito")
        //console.log(received1)
        //console.log(received2)
        if (received1 && received2) {
            for(let i=0;i<received1.length;i++) {
                data.push({id: received1[i].id, value:  received1[i].value, qOwned:  received2[i].quant, qNeeded: received1[i].quant})
                setData([...data])
                console.log("data")
            }
        }
        setTotalOwned(route.params.totalOwned);
        setTotalNeeded(route.params.totalNeeded);

        loadTips();
    },[])

    return (
        <View style={{flex: 1}}>
            <Modal
                animationType='fade'
                transparent={true}
                visible={visible}
            >
                <View style={{ flex:1, backgroundColor: '#555', marginTop: 90, marginBottom:70, marginLeft: 20, marginRight: 20, borderWidth: 0, borderRadius: 15}}>
                    <View style={{ flex:1, flexDirection: 'row'}}>
                        <View style={{flex:8,  alignItems: 'center'}}>
                            <Text style={{fontSize: 35, fontWeight: 'bold', color: 'white'}}>
                            {(idiom == "English")?"Some Tips":"Dicas"}
                            </Text>
                        </View>
                        <View style={{alignItems:'flex-end', justifyContent: 'flex-start'}}>
                            <View style={{padding:5, position:'absolute'}}>
                            <TouchableHighlight underlayColor='#555' style={{}} onPress={() => {setVisible(false)}}>
                                <Icon size={35} name="x-circle" color='white' />
                            </TouchableHighlight>
                        </View>
                        </View>
                    </View>
                    <View style={{ flex:8, margin: 10}}>
                        { (totalNeeded>totalOwned) 
                        && 
                        <Text style={{textAlign: 'center',padding: 5, color: 'red', fontSize: 20, marginBottom: 10, borderWidth: 2, borderColor: 'red', borderRadius: 10}}>
                            <Icon size={25} name='alert-triangle' color='red' />
                            {(idiom == "English")?" You don't have enought money!":" Você não possui dinheiro suficiente!"} 
                        </Text>
                        }
                        { (tips.length>0) 
                        ? 
                        <FlatList
                            style={{}}
                            data={tips}
                            keyExtractor={item=>item.id.toString()} 
                            renderItem={ ({item,index}) =>
                                <View style={{padding: 5, flex: 3, flexDirection: 'row', marginBottom: 10,}}>
                                    <Text style={{color: 'white', fontSize: 20, textAlign: 'justify'}}>
                                        <Icon size={25} name='smile' color='green' style={{}}/>
                                        {(idiom == "English")?" You can exchange ":" Você pode trocar "}
                                        {((item.tradeValue/item.excededValue)*item.times)}
                                        {(idiom == "English")?" remainings bills $":" notas restantes de R$"}
                                        {item.excededValue}
                                        {(idiom == "English")?" to replace ":" para substituir "}
                                        {item.times}
                                        {(idiom == "English")?" required bills of $":" notas necessárias de R$"}
                                        {item.tradeValue}! 
                                    </Text> 
                                </View>
                            }
                        />
                        :
                        <Text style={{color: 'white', fontSize: 20, textAlign: 'justify'}}>
                            <Icon size={25} name='frown' color='yellow' />
                            {(idiom == "English")?" Sorry, we can't find any tips for you!":" Desculpe-nos, nós não conseguimos encontrar nenhuma dica para você!"}
                            
                        </Text>
                        }
                        
                    </View>
                </View>
            </Modal>

            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}>
                <View style={{alignItems:'flex-start', justifyContent:'flex-start', marginLeft: 10}}>
                    <TouchableHighlight underlayColor='#eee' style={{}} onPress={() => {setVisible(true)}}>
                        <Icon size={35} name="help-circle" />
                    </TouchableHighlight>
                </View>
                <View style={{flex:8, justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{fontSize: 35, fontWeight: 'bold'}}>
                        {(idiom == "English")?"Report":"Relatório"}
                    </Text>
                </View>
                <View style={{alignItems:'flex-end', justifyContent:'flex-end', marginRight: 10}}>
                    <TouchableHighlight underlayColor='#eee' style={{}} 
                        onPress={() => {
                            {(idiom == "English")
                            ?
                            Alert.alert('ALERT', 'Do you want to save this report?',  [
                                {
                                  text: "No, maybe next time...",
                                  onPress: () => console.log("Cancel Pressed"),
                                  style: "cancel"
                                },
                                { 
                                  text: "YES, of course!", 
                                  onPress: () => {
                                        console.log("OK Pressed"); 
                                        let today = new Date();
                                        let date = today.getFullYear()+""+(today.getMonth()+1)+today.getDate();
                                        let time = today.getHours()+""+today.getMinutes()+today.getSeconds();
                                        let datetime = date+time
                                        console.log(datetime)
                                        saveReport(datetime)
                                    }
                                }
                            ])
                            :
                            Alert.alert('ALERTA', 'Você quer salvar esse relatório?',  [
                                {
                                  text: "Não, quem sabe na próxima...",
                                  onPress: () => console.log("Cancel Pressed"),
                                  style: "cancel"
                                },
                                { 
                                  text: "SIM, com certeza!", 
                                  onPress: () => {
                                        console.log("OK Pressed"); 
                                        let today = new Date();
                                        let date = today.getFullYear()+""+(today.getMonth()+1)+today.getDate();
                                        let time = today.getHours()+""+today.getMinutes()+today.getSeconds();
                                        let datetime = date+time
                                        console.log(datetime)
                                        saveReport(datetime)
                                    }
                                }
                            ])
                            }
                            
                        }}
                    >
                        <Icon size={35} name="save" />
                    </TouchableHighlight>
                </View>
            </View>
            <View style={{flexDirection: 'row', paddingHorizontal: 10}}>
                <View style={{flex:1}}><Text>
                {(idiom == "English")?"owned: $":"tem: R$"}{totalOwned.toString()}
                </Text>
                </View>
                
                {
                (totalOwned>=totalNeeded)
                ?
                <View style={{flex: 1, alignItems: 'flex-end'}}>
                    <Text style={{color: 'green'}}>
                    {(idiom == "English")?"needed: $":"precisa: R$"}{totalNeeded.toString()}
                    </Text>
                </View>
                :
                <View style={{flex: 1, alignItems: 'flex-end'}}>
                    <Text style={{color: 'red'}}>
                    {(idiom == "English")?"needed: $":"precisa: R$"}{totalNeeded.toString()}
                    </Text>
                </View>
                }
            </View>
            <View style={{flex: 8, margin: 10, padding: 10, backgroundColor: '#ddd', borderWidth: 2, borderRadius: 5}}>
                <View style={{flex: 1, flexDirection:'row', paddingBottom: 0, margin:0, borderBottomWidth:2,}}> 
                    <View  style={{flex: 2, alignItems:'center'}}><Text style={{fontSize: 20, alignItems: 'center'}}>{(idiom == "English")?"Bills":"Cédulas"}</Text></View>
                    <View  style={{flex: 3, alignItems:'center'}}><Text style={{fontSize: 20, alignItems: 'center'}}>{(idiom == "English")?"Needed/Held":"Precisa/Tem"}</Text></View>
                    <View  style={{flex: 2, alignItems:'center'}}><Text style={{fontSize: 20, alignItems: 'center'}}>{(idiom == "English")?"Diff":"Diff"}</Text></View>
                </View>
                <View style={{flex:10, paddingTop: 10}}>
                    <FlatList
                        style={{}}
                        data={data}
                        keyExtractor={item=>item.id.toString()} 
                        renderItem={ ({item,index}) =>
                            <View style={{flex: 3, flexDirection: 'row', marginBottom: 10,}}>
                                <View style={{flex: 2, width: 150, justifyContent: 'center', alignItems:'center'}}> 
                                    <Text style={{fontSize:20}}>
                                        {(idiom == "English")?"$":"R$"}{item.value.toString()}
                                    </Text>
                                </View> 
                                <View style={{flex: 3, width: 150, justifyContent: 'center', alignItems:'center'}}> 
                                    <Text style={{fontSize:20, alignItems: 'center'}}>
                                        {item.qNeeded.toString()}/{item.qOwned.toString()}
                                    </Text>
                                </View> 
                                <View style={{flex: 2, width: 150, justifyContent: 'center', alignItems:'center'}}> 
                                    {(item.qOwned>=item.qNeeded)
                                    ?
                                    <Text style={{fontSize:20, color: 'green'}}>
                                        
                                        + {item.qOwned.toString() - item.qNeeded.toString()}
                                    </Text>
                                    :
                                    <Text style={{fontSize:20, color: 'red'}}>
                                        - {item.qNeeded.toString() - item.qOwned.toString()}
                                    </Text>
                                    }
                                </View> 
                            </View>
                        }
                    />
                </View>
            </View>
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
                <TouchableHighlight 
                    underlayColor='#555'
                    onPress={() => {
                        navigation.navigate('TelaMain')
                    }}  
                    style={{marginTop: 5, marginBottom: 10, marginRight: 10, marginLeft: 10}}>
                    <View style={{backgroundColor: '#ddd', alignItems: 'center', justifyContent: 'center',  flexDirection:'row', borderWidth: 2, borderRadius: 5, padding: 5, width: 140}}>
                        <Text style={{fontWeight: 'bold'}}>{(idiom == "English")?"DONE":"PRONTO"} </Text>
                        <Icon size={20} name="thumbs-up"/>
                    </View>
                </TouchableHighlight>
            </View>
        </View>
    )
}