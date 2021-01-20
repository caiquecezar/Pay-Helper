import React from 'react'
import {View,Modal, Text, TouchableHighlight, FlatList, Alert,ScrollView} from 'react-native'
import Style from './../../assets/styles/Style'
import Icon  from 'react-native-vector-icons/Feather'
export default function ({route, navigation}) {
    const idiom = route.params.idiom
    return (
        <View style={{flex: 1}}>
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}>
                <View style={{flex:8, justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{fontSize: 35, fontWeight: 'bold'}}>
                        {(idiom == "English")?"How To Use":"Tutorial"}
                    </Text>
                </View>
                
                <View style={{alignItems:'flex-end', justifyContent:'flex-end', flex:1, marginRight: 10}}>
                    
                        <Icon size={40} name="bookmark" />
                  
                </View>
            </View>
            <ScrollView style={{height: '70%', margin: 10, padding: 10, backgroundColor: '#ddd', borderWidth: 2, borderRadius: 5}}>
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                {(idiom == "English")?"1. Why to use this app?":"1. Por que usar este aplicativo?"}
                </Text>
                <Text style={{fontSize: 15, textAlign:'justify'}}>
                {(idiom == "English")?"First of all, you have to know 'why to use this app'.\nThe function of this app is very simple:  to chose the amount of bills for a amount of money.\nSome people, that have to pay employees, need exacts amounts of bills to do the payment.\nThis app comes to help that people.":"Em primeiro lugar, você deve saber por que usar este aplicativo.\nA função deste aplicativo é muito simples: calcular a quantidade de notas de cada valor necessária para uma determinada quantia em dinheiro. \nAlgumas pessoas, que têm que pagar aos funcionários em dinheiro precisam de quantias exatas de cédulas para fazer o pagamento.\nEste aplicativo vem para ajudar essas pessoas ajudando a fazer o cálculo.\n"}
                </Text>
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                {(idiom == "English")?"2. Payment Definitions":"2. Definições de Pagamento"}
                </Text>
                <Text style={{fontSize: 15, textAlign:'justify'}}>
                {(idiom == "English")?"The first screen when you \"start\" the app called \"Payments\" is to define the values you have to separe the bills.\nI explain: Imagine you need to separe bills to pay 5 employees, each employee must receive $115,00. How much bills of each value you need?\nIn this screen you must insert the value of payment and the number(qnt) of employees.\nUse de icon on top to save your definition to use later.\n":"A primeira tela quando você \"iniciar\" o aplicativo chamada \"Pagamentos\" é para definir os valores que você precisa. \nEu explico: Imagine que você precise pagar 5 funcionários, cada funcionário deve receber R$ 115,00, e você quer saber quantas cédulas/notas de cada valor você precisa? \nNesta tela você deve inserir o valor do pagamento (R$115,00) e o número (5) de funcionários. \n Use o ícone na parte superior para salvar sua definição se quiser que ela seja sempre carregada inicialmente. \n"}

                </Text>
                <Text style={{fontSize: 20, fontWeight: 'bold'}}> 
                {(idiom == "English")?"3. Money":"3. Dinheiro"}
                </Text>
                <Text style={{fontSize: 15, textAlign:'justify'}}>
                {(idiom == "English")?"The next screen its to you insert the bills you alread have. \nNote that que you can use 0 bills in 'Qnt' to all values if you only wanna know how much of each value for the bills you need.\n":"A próxima tela é para você inserir o dinheiro que você possui separadamente por cada valor de cédula.\nNote que você pode deixar todas as entradas em branco (0 cédulas) caso você queira apenas saber a quantidade de cada cédula que você precisa.\n"}

                </Text>
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                {(idiom == "English")?"4. Reports":"4. Relatórios"}
                </Text>
                <Text style={{fontSize: 15, textAlign:'justify'}}>
                {(idiom == "English")?"The last screen 'Report', show to you the results.\nYou can use the icon (?) to see tips and when you finish you can save the report and acess from home screen.\n":"A última tela, Relatório, mostrará os resultados.\nVocê pode usar o ícone (?) para ver algumas dicas e, quando terminar, você pode salvar o relatório para acessá-lo posteriormente em Tela Inicial > Relatórios.\n"}

                </Text>
            </ScrollView>
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
                <TouchableHighlight onPress={()=>navigation.goBack()} underlayColor='#555' style={{marginTop: 5, marginBottom: 10, marginRight: 10, marginLeft: 10}}>
                    <View style={{backgroundColor: '#ddd', alignItems: 'center', justifyContent: 'center', flexDirection: 'row', borderWidth: 2, borderRadius: 5, padding: 5, width: 140}}>
                    <Icon size={20} name="home"/>
                    <Text>{(idiom == "English")?" Back to Menu":" Voltar ao Menu"}</Text>
                    </View>
                </TouchableHighlight>
            </View>
        </View>
    )
}