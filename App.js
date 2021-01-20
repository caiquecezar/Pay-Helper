import React from 'react';
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'


import TelaMain from './components/screens/Main'
import TelaDefinitions from './components/screens/Definitions'
import TelaCalculate from './components/screens/Calculate'
import TelaReports from './components/screens/Reports'
import TelaSavedReports from './components/screens/SavedReports'
import TelaHowTo from './components/screens/HowTo'

const Screens = createStackNavigator();

export default function App () {
  return ( 
    <NavigationContainer>
      <Screens.Navigator headerMode="none">
        <Screens.Screen
          name="TelaMain"
          component={TelaMain}
        />
        <Screens.Screen
          name="TelaDefinitions"
          component={TelaDefinitions}
        />
        <Screens.Screen
          name="TelaCalculate"
          component={TelaCalculate}
        />
        <Screens.Screen
          name="TelaReports"
          component={TelaReports}
        />
        <Screens.Screen
          name="TelaSavedReports"
          component={TelaSavedReports}
        />
        <Screens.Screen
          name="TelaHowTo"
          component={TelaHowTo}
        />
      </Screens.Navigator>
    </NavigationContainer>
      
  );
};