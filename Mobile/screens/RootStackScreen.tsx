import React from 'react'

import {createStackNavigator, Header} from '@react-navigation/stack'

import SplashScreen from './SplashScreen';


const RootStack = createStackNavigator<any>();


const RootStackScreen = () => (

    <RootStack.Navigator screenOptions={{ 
        headerShown: false
     }}>

    <RootStack.Screen name="SplashScreen" component={SplashScreen} />

    </RootStack.Navigator>

);

export default RootStackScreen;

