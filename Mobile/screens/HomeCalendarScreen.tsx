import { View, StyleSheet, Dimensions, Image } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import {Calendar} from 'react-native-calendars'
import { EventsResponseDto } from '../interfaces/EventsResponseDto';
import axios from 'axios';
import { BaseUrl } from '../url/BaseUrl';
import { event } from 'react-native-reanimated';



export default function HomeCalendarScreen() {

  const {token} = useContext(AuthContext);
  const [selectedDay, setSelectedDay] = useState(new Date().toISOString().slice(0, 10))
  const [events, setEvents] = useState<object[]>([])

  const fetchEvents = async ()=>{

   await axios.get(BaseUrl+'/api/events/user', config).then((response)=>{
      setEvents(response.data)
      console.log(events)
    }).catch((e)=>{
      console.log(e)
    })

  }

  const config = {
    headers: {
      Authorization: 'Bearer '+token?.token
    }
  }
  
  useEffect(()=>{
    console.log(token)
    fetchEvents()


  },[])

  

  function getCurrentDateString() {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    return `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
  }

  const markedDates = {
    [selectedDay]: {
      selected: true,
      selectedColor: '#FFD700'
    }
  };  

  const onDayPress = (day: any) => {
    setSelectedDay(day.dateString)
  }


  return (
      <>
      <Calendar style={{paddingTop: 40, height: '70%'}}
      theme={theme}
      disableAllTouchEventsForDisabledDays={true}
      firstDay={1}
      enableSwipeMonths={true}
      markedDates={markedDates}
      onDayPress={onDayPress}
      />
      <View style={styles.container}>
      <Image  source={require('../assets/kalandar_icon.png')} style={styles.logo} resizeMode="stretch" />
      </View>
    </>
  )
}

const {height, width} = Dimensions.get('screen')
const styles = StyleSheet.create({

  container: {
    backgroundColor: '#121212',
    height: '100%',
    marginTop: -180,
    flex: 1,
    justifyContent: 'center'
  },
  logo: {
    width: width*0.8,
    height: height*0.2,
    alignSelf: 'center',
    
  },
  


})

const theme: object = {
  backgroundColor: '#121212',
  calendarBackground: '#121212',
  textSectionTitleColor: '#fff',
  selectedDayBackgroundColor: '#FFD700',
  selectedDayTextColor: '#000',
  todayTextColor: '#FFD700',
  dayTextColor: '#fff',
  textDisabledColor: '#666',
  dotColor: '#fff',
  selectedDotColor: '#000',
  arrowColor: '#fff',
  monthTextColor: '#FFD700',
  textDayFontWeight: 'bold',
  textMonthFontWeight: 'bold',
  textDayHeaderFontWeight: 'bold',
  'stylesheet.calendar.header': {
    header: {
      backgroundColor: '#121212',
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingLeft: 10,
      paddingRight: 10,
      marginTop: 6,
      alignItems: 'center',
    },
    monthText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#FFD700',
      margin: 10,
    },
    weekText: {
      color: '#FFD700'
    },
    arrow: {
      padding: 10,
    },
  },
};