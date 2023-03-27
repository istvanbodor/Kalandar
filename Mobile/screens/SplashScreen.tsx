import { View, Text, Dimensions, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient';

export default function SplashScreen() {
  return (
    <View style={styles.containter}>
        
        <View style={styles.header}>

            <Image source={require('../assets/kalandar_icon.png')} style={styles.logo} resizeMode="stretch" />


        </View>

        <View style={styles.footer}>
            <Text style={styles.title}>Welcome to the Kalandar app!</Text>
            <Text style={styles.text}>Your adventures are awaiting you.</Text>
        </View>

    </View>
  )
}


const {height} = Dimensions.get("screen");
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
    }
    


})