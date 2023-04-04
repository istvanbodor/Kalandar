import { View, Text, Button, StyleSheet, Dimensions } from 'react-native'
import React, { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'

export default function ProfileScreen() {

  const {logout} = useContext(AuthContext);

  return (
    <View style={stlyes.container}>
            <Text>szia</Text>
    </View>
  )
}

const {height} = Dimensions.get('screen');
const stlyes = StyleSheet.create({

    container: {
        backgroundColor: '#121212',
        height: height
    }


})