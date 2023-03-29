import { View, Text, Button, TouchableOpacity, Dimensions, StyleSheet } from 'react-native'
import * as Animatable from 'react-native-animatable'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Feather from 'react-native-vector-icons/Feather'
import React from 'react'

export default function LoginScreen({navigation}: any) {
  return (
    <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.welcomeText}>Welcome!</Text>
        </View>


        <View style={styles.footer}>



        </View>
    </View>
  )
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212'
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 50
  },
  footer: {
    flex: 3,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30
  },
  welcomeText: {
    color: '#FFD700',
    fontWeight: 'bold',
    fontSize: 30
  }

})



