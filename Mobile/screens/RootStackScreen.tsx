import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import SplashScreen from './SplashScreen';
import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';




const RootStack = createStackNavigator<any>();


const RootStackScreen = () => (

    <RootStack.Navigator screenOptions={{ 
        headerShown: false
     }}>

    <RootStack.Screen name="SplashScreen" component={SplashScreen} />
    <RootStack.Screen name="LoginScreen" component={LoginScreen} /> 
    <RootStack.Screen name="RegisterScreen" component={RegisterScreen} /> 

    </RootStack.Navigator>

);

export default RootStackScreen;

