import React, {useEffect, useState} from 'react'
import {View,Image, Text, TouchableHighlight, FlatList, TextInput, ScrollView} from 'react-native'
import Style from '../../assets/styles/Style'
import Icon  from 'react-native-vector-icons/Feather'
import {LessNumberBills} from '../calc/Calcs'
import NumericInput from 'react-native-numeric-input'


export default function ({route, navigation}) {
    const idiom = route.params.idiom
    const real = [
        {id:1, value: 1, quant: 0},
        {id:2, value: 2, quant: 0},
        {id:3, value: 5, quant: 0},
        {id:4, value: 10, quant: 0},
        {id:5, value: 20, quant: 0},
        {id:6, value: 50, quant: 0},
        {id:7, value: 100, quant: 0},
        {id:8, value: 200, quant: 0}
    ]

    const [data,setData] = useState([]);
    const [totalNeeded, setTotalNeeded] = useState(0);
    const [totalOwned, setTotalOwned] = useState(0);
    const [money, setMoney] = useState(real);
    
    
    useEffect (()=>{
        const received = route.params.data;
        console.log("received" + received)  
        console.log("data " + data)
        if (received) {
            for(let i=0;i<received.length;i++) {
                data.push({id: received[i].id, value:  received[i].value, quant:  received[i].quant})
                setData([...data])
                console.log(" dentro do for" +data)
            }
            updateTotalNeeded();
        }
    },[])

    const updateTotalNeeded = () => {
        let aux = 0;
        for (let i=0;i<data.length;i++) {
            aux = aux + (data[i].value * data[i].quant);
        }
        setTotalNeeded(aux);
    }

    const updateTotalOwned = () => {
        let aux = 0;
        for (let i=0;i<money.length;i++) {
            aux = aux + (money[i].value * money[i].quant);
        }
        setTotalOwned(aux);
    }

    const setQuant = (text, i) => {
        let aux = money
        aux[i].quant = text;
        setMoney(aux);
        console.log(money)
        updateTotalOwned();
    }

    const Calculate = () => {
        let ans = LessNumberBills(data)
        console.log("Calculou")
        console.log(ans);
        return ans;
    }

    return (
        <View style={{flex: 1}}>
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}>
                <View style={{flex:8, justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{fontSize: 35, fontWeight: 'bold'}}>
                    {(idiom == "English")?"Money Owned":"Dinheiro Possuído"}
                    </Text>
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
                <View style={{ borderBottomWidth:2, flexDirection:'row', alignItems: 'center', justifyContent:'center'}}> 
                    <View style={{flex: 4}}>
                        <Text style={{fontSize: 25, alignItems: 'center'}}>{(idiom == "English")?"Bill Held":"Cédulas"}</Text>
                    </View>
                    <View style={{flex: 2, alignItems: 'center', justifyContent: 'center'}}>
                        <Text style={{fontSize: 25, alignItems: 'center', justifyContent: 'center'}}>Qnt</Text>
                    </View>
                </View>
                <ScrollView style={{flex:1}}>
                    <FlatList
                        style={{marginTop: 10}}
                        data={money}
                        keyExtractor={item=>item.id.toString()} 
                        renderItem={ ({item,index}) =>
                            <View style={{flex: 1, flexDirection: 'row', marginBottom: 10}}>
                                <View style={{flex: 4, width: 150, justifyContent: 'center'}}> 
                                    <Text style={{fontSize:20}}>
                                    {(idiom == "English")?"$":"R$"}{item.value.toString()}
                                    </Text>
                                </View> 
                                <View style={{flex:2}}>  
                                <NumericInput 
                                        totalWidth={105} 
                                        totalHeight={50} 
                                        borderColor='black'
                                        rounded
                                        rightButtonBackgroundColor='#aaa' 
                                        leftButtonBackgroundColor='#aaa'
                                        iconStyle={{}}
                                        containerStyle={{ flex: 1, borderWidth: 2, borderColor: 'black', borderRadius: 10, backgroundColor: 'white'}}
                                        type='plus-minus'
                                        value = {Number(item.quant)}
                                        onChange={value => {setQuant(value.toString(), index)}} 
                                    />  
                                </View> 
                            </View>
                        }
                    />
                </ScrollView>
            </View>
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
                <TouchableHighlight onPress={()=>navigation.goBack()} underlayColor='#555' style={{marginTop: 5, marginBottom: 10, marginRight: 10, marginLeft: 10}}>
                    <View style={{backgroundColor: '#ddd', alignItems: 'center', justifyContent: 'center', flexDirection: 'row', borderWidth: 2, borderRadius: 5, padding: 5, width: 140}}>
                    <Icon size={20} name="chevrons-left"/>
                    <Text>{(idiom == "English")?"Definitions":"Definições"}</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight onPress={() => {
                    let ans = Calculate();
                    const totalNeededi = totalNeeded;
                    const totalOwnedi = totalOwned;
                    const moneyi = money;
                    setData([]);
                    setTotalNeeded(0);
                    setTotalOwned(0);
                    setMoney(real);
                    navigation.navigate('TelaReports', 
                    {
                        ans: ans, 
                        money: moneyi, 
                        totalNeeded: totalNeededi, 
                        totalOwned: totalOwnedi,
                        idiom: idiom
                    })
                    }} 
                    underlayColor='#555' 
                    style={{marginTop: 5, marginBottom: 10, marginRight: 10, marginLeft: 10}}>
                    <View style={{backgroundColor: '#ddd',alignItems: 'center', justifyContent: 'center',  flexDirection:'row', borderWidth: 2, borderRadius: 5, padding: 5, width: 140}}>
                        <Text style={{fontWeight: 'bold'}}>{(idiom == "English")?"CALC":"CALCULAR"}</Text>
                        <Icon size={20} name="chevrons-right"/>
                    </View>
                </TouchableHighlight>
            </View>
        </View>
    )
}