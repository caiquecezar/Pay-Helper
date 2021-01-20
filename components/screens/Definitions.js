import React, {useEffect, useState} from 'react'
import {View,Image, Text, TouchableHighlight, FlatList, TextInput, Alert, ScrollView} from 'react-native'
import Style from '../../assets/styles/Style'
import Icon  from 'react-native-vector-icons/Feather'
import NumericInput from 'react-native-numeric-input'
import AsyncStorage from '@react-native-community/async-storage'

let inc = 0;

export default function ({route, navigation}) {
    const idiom = route.params.idiom
    const [data,setData] = useState([]);
    const [total, setTotal] = useState(0);

    const newData = () => {
        console.log(data)
        data.push({id: inc, value: 0, quant: 0})
        inc = inc+1;
        setData ([...data])
    }

    const deleteFromData = (index) => {
        data.splice(index,1)
        inc = inc -1;
        setData ([...data])
        updateTotal();
    }

    const setValue = (text, index) => {
        data[index].value = onlyNumbers(text);
        setData([...data])
        updateTotal();
    }

    const setQuant = (text, i) => {
        data[i].quant = onlyNumbers(text)
        setData([...data]);
        updateTotal();
    }

    const onlyNumbers = (texto) => {
        let text = texto.split('');
        for(let i=0; i<text.length;i++) {
            if(text[i] != '0' && text[i] != '1' && text[i] != '2' && text[i] != '3' && text[i] != '4' && text[i] != '5' && text[i] != '6' && text[i] != '7' && text[i] != '8' && text[i] != '9' ) {
                text[i] = ""
            }
        }
        return text.join("");
    }

    const updateTotal = () => {
        let aux = 0;
        for (let i=0;i<data.length;i++) {
            aux = aux + (data[i].value * data[i].quant);
        }
        setTotal(aux);
    }

    const storeData = () => {
        {(idiom == "English")
        ?
        Alert.alert('ALERT', 'Do you want to save these definitions?',  [
        {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
        },
        { 
            text: "YES", 
            onPress: () => {
                console.log("OK Pressed"); 
                store('Definition')
            }
        }
        ])
        :
        Alert.alert('ALERTA', 'Você quer salvar essas definições?',  [
        {
            text: "Cancelar",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
        },
        { 
            text: "SIM, EU QUERO!", 
            onPress: () => {
                console.log("OK Pressed"); 
                store('Definition')
            }
        }
        ])
        }
    }

    const store = async (key) => {
        AsyncStorage.setItem(key,JSON.stringify(data));
        const x = await AsyncStorage.getItem(key)
        console.log(x)
        if (idiom=="English") Alert.alert('ALERT', 'Data saved!') 
        else Alert.alert('ALERTA', 'Dados salvos!')
    }

    const f = async() => {
        try {
            const y = await AsyncStorage.getItem('Definition')
            const x = JSON.parse(y)
            for (let i=0; i<x.length; i++) {
                data.push({id: x[i].id, value: x[i].value, quant: x[i].quant})
                inc = inc+1;
                setData ([...data])
            }
            updateTotal()
        } catch (e) {
            console.log(e)
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
                        {(idiom=="English")?"Payments":"Pagamentos"}
                    </Text>
                </View>
                
                <View style={{alignItems:'flex-end', justifyContent:'flex-end', flex:1, marginRight: 10}}>
                    <TouchableHighlight underlayColor='#eee' style={{}} onPress={() => {storeData();}}>
                        <Icon size={40} name="save" />
                    </TouchableHighlight>
                </View>
            </View>
            <View style={{alignItems: 'flex-end', paddingRight: 10}}>
                <Text>
                    total: ${total}
                </Text>
            </View>
            <View style={{flex: 8, margin: 10, padding: 10, backgroundColor: '#ddd', borderWidth: 2, borderRadius: 5}}>
                <View style={{flexDirection:'row', borderBottomWidth: 2, alignContent: 'center', justifyContent: 'center'}}> 
                    <Text style={{flex: 8, fontSize: 25}}>{( idiom == "English")?"Values":"Valores"}</Text>
                    <Text style={{flex: 5, fontSize: 25}}>Qnt</Text>
                    <TouchableHighlight 
                        underlayColor='#cdc' 
                        style={{flex: 2}} 
                        onPress={()=>newData()}
                    >
                        <Icon size={40} name="plus-square" color='green'/>
                    </TouchableHighlight>
                </View>
                <ScrollView style={{flex: 1}}>
                    <FlatList
                        style={{marginBottom: 10, marginTop: 10, flex:1}}
                        data={data}
                        keyExtractor={item=>item.id.toString()} 
                        renderItem={ ({item,index}) =>
                            <View style={{flex: 1, flexDirection: 'row', marginBottom: 10}}>
                                <View style={{flex: 8}}> 
                                    <TextInput
                                        keyboardType='numeric'
                                        style={{borderWidth: 1, borderRadius: 5, width: 150, backgroundColor: 'white'}}
                                        value = {item.value.toString()}
                                        onChangeText={text => setValue(text,index)}
                                    />
                                </View> 
                                <View style={{flex:5, paddingRight: 0, marginLeft: 0, marginRight: 0}}>
                                    <NumericInput 
                                        totalWidth={100} 
                                        totalHeight={50} 
                                        borderColor='black'
                                        rounded
                                        rightButtonBackgroundColor='#aaa' 
                                        leftButtonBackgroundColor='#aaa'
                                        iconStyle={{}}
                                        containerStyle={{ flex: 1, borderWidth: 2, borderColor: 'black', borderRadius: 10, backgroundColor: 'white'}}
                                        type='plus-minus'
                                        value = {Number(item.quant)}
                                        onChange={value => {setQuant(value.toString(), index); console.log(value)}} 
                                    />  
                                </View>
                                <View style={{flex: 2, justifyContent: 'center'}}>
                                    <TouchableHighlight 
                                        underlayColor='#dcc' 
                                        onPress={()=>deleteFromData(index)}
                                    >
                                        <Icon size={40} name="minus-square" color='red'/>
                                    </TouchableHighlight>
                                </View>
                            </View>
                        }
                    />
                </ScrollView>
            </View>
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
                <TouchableHighlight onPress={()=>navigation.goBack()} underlayColor='#555' style={{marginTop: 5, marginBottom: 10, marginRight: 10, marginLeft: 10}}>
                    <View style={{backgroundColor: '#ddd',alignItems: 'center', justifyContent: 'center', flexDirection: 'row', borderWidth: 2, borderRadius: 5, padding: 5, width: 140}}>
                    <Icon size={20} name="chevrons-left"/>
                    <Text>{(idiom == "English")?"Back to Menu":"Voltar ao Menu"}</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight onPress={()=>navigation.navigate('TelaCalculate', {data: data, idiom: idiom})} underlayColor='#555' style={{marginTop: 5, marginBottom: 10, marginRight: 10, marginLeft: 10}}>
                    <View style={{backgroundColor: '#ddd',alignItems: 'center', justifyContent: 'center',  flexDirection:'row', borderWidth: 2, borderRadius: 5, padding: 5, width: 140}}>
                        <Text>{(idiom == "English")?"Next":"Próximo"}</Text>
                        <Icon size={20} name="chevrons-right"/>
                    </View>
                </TouchableHighlight>
            </View>
        </View>
    )
}