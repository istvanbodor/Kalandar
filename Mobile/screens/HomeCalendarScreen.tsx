import { View, Text, Button, StyleSheet, Dimensions } from 'react-native'
import React, { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { Agenda } from 'react-native-calendars';


export default function HomeCalendarScreen() {

  const {logout} = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Agenda  theme={{calendarBackground: '#121212'}} scrollEnabled={true} />
    </View>
  )
}

const {height, width} = Dimensions.get('screen')
const styles = StyleSheet.create({

  container: {
    backgroundColor: '#121212',
    height: height
  }


})