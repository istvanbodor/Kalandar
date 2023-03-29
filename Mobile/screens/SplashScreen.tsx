import { View, Text, Dimensions, StyleSheet, Image, TouchableOpacity, Button } from 'react-native'
import React from 'react'
import  MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import * as Animatable from 'react-native-animatable'

export default function SplashScreen() {
  return (
    <View style={styles.containter}>
        
        <View style={styles.header}>

            <Animatable.Image animation="bounceIn" source={require('../assets/kalandar_icon.png')} style={styles.logo} resizeMode="stretch" />


        </View>

        <Animatable.View animation="fadeInUpBig" style={styles.footer}>
            <Text style={styles.title}>Welcome to the Kalandar app!</Text>
            <Text style={styles.text}>Your adventures are awaiting you.</Text>
            

                <TouchableOpacity activeOpacity={0.7} style={styles.buttonContainer}>
                    <Text style={styles.buttonText}>Get Started! <MaterialIcons name='navigate-next'  /></Text>
                    
                </TouchableOpacity>

               

        </Animatable.View>

    </View>
  )
}


const {height, width} = Dimensions.get("screen");
const logoheight = height*0.28;


const styles = StyleSheet.create({

    containter: {
        flex: 1,
        backgroundColor: '#181818',
       
    },
    title: {
        color: '#FFD700',
        fontWeight: 'bold',
        fontSize: 30
    },
    text:{
        fontSize: 12,
        fontStyle: 'italic'
    },
    header: {
            flex: 2,
            justifyContent: 'center',
            alignItems: 'center'
    },
    logo: {
        width: logoheight,
        height: logoheight
    },
    footer: {
        flex: 1,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingVertical: 50,
        paddingHorizontal: 50
    },
    buttonContainer: {
        
        marginTop: 50,
        borderRadius: 30,
        backgroundColor: '#FFD700',
        paddingVertical: 10,
        paddingHorizontal: 10,
        width: width*0.6,
        marginLeft: width*0.2
        
        
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        flexDirection: 'row',
       
    },
    
    


})