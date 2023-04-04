import { View, Text, Button } from 'react-native'
import React, { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'

export default function HomeCalendarScreen() {

  const {logout} = useContext(AuthContext);

  return (
    <View>
      <Text>HomeCalendarScreen</Text>
      <Button title='logout' onPress={()=>{logout()}} />
    </View>
  )
}