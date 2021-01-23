import React, {useState, useEffect} from 'react'
import {View,Modal, Text, TouchableHighlight, BackHandler, Alert, Image} from 'react-native'
import Style from '../../assets/styles/Style'
import Icon  from 'react-native-vector-icons/Feather'
import AsyncStorage from '@react-native-community/async-storage'



export default function ({navigation}) {
    const [visible,setVisible] = useState(false);
    const [logoVisible,setLogoVisible] = useState(true);
    const [idiomVisible, setIdiomVisible] = useState(false);
    const [idiom, setIdiom] = useState("Portuguese")
    

    const teste = async () => {
        {(idiom == "English")
        ?
        Alert.alert('ALERT', 'Are you sure? This action will clear data from DEFINITIONS!',  [
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel"
            },
            { 
              text: "Go ahead!", 
              onPress: () => {
                  console.log("OK Pressed"); 
                  AsyncStorage.removeItem('Definition');
                  Alert.alert('ALERT', 'Data sucessful deleted!')
                }
            }
        ])
        :
        Alert.alert('ALERTA', 'Você tem certeza? Essa ação limpará os dados salvos das definições de pagamento!',  [
            {
              text: "Cancelar",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel"
            },
            { 
              text: "Vá em frente!", 
              onPress: () => {
                  console.log("OK Pressed"); 
                  AsyncStorage.removeItem('Definition');
                  Alert.alert('ALERTA', 'Dados deletados com sucesso!')
                }
            }
        ])
        }
        
    }

    useEffect ( () => {
        setTimeout( () => {
           setLogoVisible(false)
        }, 3500)
    }, []);

    return (
        <View style={Style.mainViewLogo}>

            <Modal
                animationType='slide'
                transparent={true}
                visible={logoVisible}
            > 
                <View style={Style.mainViewLogo}>
                    <Image 
                        source={require('../../assets/images/calculadora.png')}
                        style={Style.mainImageLogo}
                    />
                </View>
            </Modal>

            <Modal
                animationType='fade'
                transparent={true}
                visible={idiomVisible}
            >
                <View style={{justifyContent: 'center',flex: 1, margin: 10,}}>
                    <View style={{ backgroundColor: "#999", borderRadius: 15, alignItems: 'center', borderWidth: 2, paddingBottom: 10}}>
                        <View style={{flexDirection: 'row'}}>
                            <View style={{alignItems:'center', margin: 5, flex: 10}}>
                                <Text style={{alignSelf:'center', color: 'white', fontSize: 30, fontWeight: 'bold', alignContent: 'center'}}>{(idiom == "English")?"Language":"Idioma"}</Text>
                            </View>
                            <View style={{alignItems:'flex-end', justifyContent: 'flex-start'}}>
                            <View style={{padding:5, position:'absolute'}}>
                                <TouchableHighlight underlayColor='none' style={{}} onPress={() => {setIdiomVisible(false)}}>
                                    <Icon size={35} name="x-circle" color='white' />
                                </TouchableHighlight>
                            </View>    
                            </View>
                        </View>
                        <TouchableHighlight underlayColor='#888' style={{margin: 5}} onPress={() => {
                            setIdiom("English")
                        }}
                        >
                            <View style={{alignItems:'center', width: 200, borderWidth: 2, borderColor: 'white', borderRadius: 10, backgroundColor: '#555'}}>
                                <Text style={{color: 'white', fontSize: 25, alignContent: 'center'}}> <Image source={require('../../assets/images/euaflat.png')} style={{width: 20, height: 20}} />{(idiom == "English")?" English":" Inglês"}</Text>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight underlayColor='#888' style={{margin: 5}} onPress={() => {
                            setIdiom("Portuguese")
                        }}
                        >
                            <View style={{alignItems:'center', width: 200, borderWidth: 2, borderColor: 'white', borderRadius: 10, backgroundColor: '#555'}}>
                                <Text style={{color: 'white', fontSize: 25, alignContent: 'center'}}> <Image source={require('../../assets/images/brazilflat.png')} style={{width: 20, height: 20}} />{(idiom == "English")?" Portuguese":" Português"}</Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                </View>
                
            </Modal>

            <Modal
                animationType='fade'
                transparent={true}
                visible={visible}
            >
                <View style={{ flex:1, backgroundColor: '#666', marginTop: 90, marginBottom:70, marginLeft: 20, marginRight: 20, borderWidth: 0, borderRadius: 15}}>
                    <View style={{ flex:1, flexDirection: 'row'}}>
                        <View style={{flex:8,  alignItems: 'center'}}>
                            <Text style={{fontSize: 30, fontWeight: 'bold', color: 'white'}}>
                                {(idiom=="English")?"Settings":"Configurações"}
                            </Text>
                        </View>
                        <View style={{alignItems:'flex-end', justifyContent: 'flex-start'}}>
                            <View style={{padding:5, position:'absolute'}}>
                            <TouchableHighlight underlayColor='none' style={{}} onPress={() => {setVisible(false)}}>
                                <Icon size={35} name="x-circle" color='white' />
                            </TouchableHighlight>
                        </View>
                        </View>
                    </View>
                    <View style={{ flex:8, margin: 10, alignItems: 'center', justifyContent: 'center', paddingBottom: 20}}>
                        
                        <TouchableHighlight underlayColor='#888' style={{margin: 5}} onPress={() => {
                            setIdiomVisible(true)
                        }}
                        >
                            <View style={{alignItems:'center', width: 200, borderWidth: 2, borderColor: 'white', borderRadius: 10, backgroundColor: '#555'}}>
                                <Text style={{color: 'white', fontSize: 25}}> <Icon size={30} name="globe" color='white' />{(idiom == "English")?" LANGUAGE":" IDIOMA"}</Text>
                            </View>
                        </TouchableHighlight>
                        
                        <TouchableHighlight underlayColor='#888' style={{margin: 5}} onPress={() => {
                            teste()
                        }}
                        >
                            <View style={{alignItems:'center', width: 200, borderWidth: 2, borderColor: 'white', borderRadius: 10, backgroundColor: '#555'}}>
                                <Text style={{color: 'white', fontSize: 25}}> <Icon size={30} name="database" color='white' />{(idiom == "English"?" DATA":" DADOS")}</Text>
                            </View>
                        </TouchableHighlight>

                        <TouchableHighlight underlayColor='#888' style={{margin: 5}} onPress={() => {
                            (idiom == "English")
                            ?
                            Alert.alert('ABOUT', 'Thanks to Caique Cézar (1993-?), PAY HELPERs creator!')
                            :
                            Alert.alert('SOBRE', 'Agradeça a Caique Cézar (1993-?), criador do PAY HELPER')
                            }}
                        >
                            <View style={{alignItems:'center', width: 200, borderWidth: 2, borderColor: 'white', borderRadius: 10, backgroundColor: '#555'}}>
                                <Text style={{color: 'white', fontSize: 25}}> <Icon size={30} name="info" color='white' />{(idiom=="English"?" ABOUT":" SOBRE")}</Text>
                            </View>
                        </TouchableHighlight>

                    </View>
                </View>
            </Modal>

            <View style={{flex:1, width: '100%', alignItems: 'flex-end', padding: 5}}>
                <TouchableHighlight
                    onPress = {
                        () => {setVisible(true)}
                    }
                    underlayColor = 'eef'
                >
                        <Icon name='settings' size={35} color='white' style={{}}/>
                </TouchableHighlight>
            </View>
            <View style={{flex: 14 , justifyContent: 'flex-end'}}>
                <TouchableHighlight
                    onPress = {
                        () => {navigation.navigate('TelaDefinitions', {idiom: idiom})}
                    }
                    underlayColor = '#ddd'
                >
                    <View style={Style.viewTouchable}>
                        <Icon name='play' size={35} color='white'/>
                        <Text style={Style.textTouchable}> 
                            {(idiom == "English")?" Start":" Iniciar"}
                        </Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight
                    onPress = {
                        () => {navigation.navigate('TelaSavedReports', {idiom: idiom})}
                    }
                    underlayColor = 'none'
                >
                    <View style={{flexDirection: 'row', marginTop: 10, alignItems: 'center', justifyContent: 'center'}}>
                        <Icon name='file-text' size={25} color='#444'/>
                        <Text style={{color: '#444', fontSize: 20}}> 
                        {(idiom == "English")?" Reports":" Relatórios"}
                        </Text>
                    </View>
                </TouchableHighlight>
            </View>
            <View style={{flex: 10, justifyContent: 'center'}}>
                <TouchableHighlight onPress = {() => navigation.navigate('TelaHowTo', {idiom: idiom})} underlayColor = 'none' >
                        <View style={{flexDirection: 'row',borderRadius: 5, marginTop: 10, paddingRight: 5}}>
                            <Icon name='hash' size={35} color='red'/>
                            <Text style={{color: '#f33', fontSize: 30}}> 
                            {(idiom == "English")?"HowToUse":"Tutorial"}
                            </Text>
                        </View>
                </TouchableHighlight>
            </View>
            <View style={{flex: 1, justifyContent: 'flex-end'}}>
                <TouchableHighlight
                    onPress = {
                        () => {BackHandler.exitApp()}
                    }
                    underlayColor = '#ddf'
                >
                    <Text style={Style.textSair}>               
                        <Icon name='corner-down-right' size={25} color='blue'/>{(idiom == "English")?"EXIT":"SAIR"}
                    </Text>
                </TouchableHighlight>
            </View>
            <View style={{flex: 1, justifyContent: 'flex-end'}}>
                
                    <Text style={{fontSize: 10, color: 'black'}}>{(idiom=="English")?"Version":"Versão"} 1.0.1</Text>
                
            </View>
        </View>
    )
}