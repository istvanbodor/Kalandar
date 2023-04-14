import { View, StyleSheet, Dimensions, Image, Modal, Text, ScrollView, TouchableOpacity, TextInput, KeyboardAvoidingView, ToastAndroid } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { Calendar } from 'react-native-calendars'
import { EventsResponseDto } from '../interfaces/EventsResponseDto';
import axios from 'axios';
import { BaseUrl } from '../url/BaseUrl';
import { MarkedDates } from 'react-native-calendars/src/types';
import Feather from 'react-native-vector-icons/Feather';
import { AddEventDto } from '../interfaces/AddEventDto';
import { Picker } from '@react-native-picker/picker';
import CheckBox from 'react-native-check-box'


export default function HomeCalendarScreen() {

  const { token } = useContext(AuthContext);
  const [selectedDay, setSelectedDay] = useState(new Date().toISOString().slice(0, 10))
  const [events, setEvents] = useState<EventsResponseDto[]>([])
  const [toMarkDates, setToMarkDates] = useState<string[]>([])
  const [modalVisible, setModalVisible] = useState<boolean>(false)
  const [addModalVisible, setAddModalVisible] = useState<boolean>(false)
  const [editId, setEditId] = useState<string>()
  const [markedDates, setMarkedDates] = useState<MarkedDates>({
    [selectedDay]: {
      selected: true,
      selectedColor: '#FFD700',
    },
  })
  const [editEvent, setEditEvent] = useState<AddEventDto>({
    event: '',
    category: 'Testcategory',
    startTime: '',
    endTime: '',
    fullDay: false,
    address: {
      country: '',
      city: '',
      street: '',
      houseNumber: '',
      zip: ''
    }
  })
  const defdata = {
    event: '',
    category: 'Testcategory',
    startTime: '',
    endTime: '',
    fullDay: false,
    address: {
      country: '',
      city: '',
      street: '',
      houseNumber: '',
      zip: ''
    }
  }
  const [editing, setEditing] = useState<boolean>(false)
  const [eventFormData, setEventFormData] = useState<AddEventDto>(defdata)
  const config = {
    headers: {
      Authorization: 'Bearer ' + token?.token
    }
  }
  const [currentEvents, setCurrentEvents] = useState<EventsResponseDto[]>([]);
  /* const fetchEvents = async ()=>{
 
       await axios.get(BaseUrl+'/api/events/user', config).then((response)=>{
       setEvents(response.data)
       setToMarkDates(events.map((event)=>event.startTime.slice(0,10)))
       console.log(toMarkDates)
     }).catch((e)=>{
       console.log(e)
     })
 
   }*/
  const fetchEvents = async () => {
    try {
      const response = await axios.get(BaseUrl + '/api/events/user', config);
      const eventsResponse: EventsResponseDto[] = response.data;
      setEvents(eventsResponse);
      const markedDates = eventsResponse.map((event) => event.startTime.slice(0, 10));
      setToMarkDates(markedDates);
    } catch (e) {
      console.log(e);
    }
  };



  useEffect(() => {

    fetchEvents()
    setToMarkDates(events.map((event) => event.startTime.slice(0, 10)))
    console.log(token)


  }, [])

  useEffect(() => {
    const markedDates: MarkedDates = {
      [selectedDay]: {
        selected: true,
        selectedColor: '#FFD700',
      },
      ...toMarkDates.reduce((acc: any, cur) => {
        if (cur == selectedDay) {
          acc[cur] = { marked: true, dotColor: 'red', selected: true, selectedColor: '#FFD700' };
        }
        else {
          acc[cur] = { marked: true, dotColor: 'red' };
        }

        return acc;
      }, {}),
    };

    setMarkedDates(markedDates);
  }, [toMarkDates, selectedDay]);



  function getCurrentDateString() {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    return `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
  }

  /*const markedDates: MarkedDates = {
    [selectedDay]: {
      selected: true,
      selectedColor: '#FFD700',
    },
    ...toMarkDates.reduce((acc: any, cur) => {
      acc[cur] = { marked: true, dotColor: 'red' };
      return acc;
  }, {}),
   
    
  };  */

  const [day2, setDay2] = useState<any>()

  const onDayPress = (day: any) => {
    setSelectedDay(day.dateString)
    setDay2(day)
    console.log(day.dateString)
    console.log('asdasdaadad ' + day.dat)
    console.log(selectedDay + 'asd')
    setCurrentEvents(events.filter(e => e.startTime.slice(0, 10) == day.dateString))
    console.log(selectedDay)
    console.log(currentEvents?.length)
    console.log(currentEvents)
    setModalVisible(true);
  }

  const handleDeleteEvent = async (id: string) => {
    console.log(id)
    console.log(BaseUrl + '/api/events/' + id)
    await axios.delete((BaseUrl + '/api/events/' + id), config)
      .catch((e) => { console.log(e) })
    await fetchEvents()
    setCurrentEvents(currentEvents.filter(e => e.id != id))
    console.log()
  }

  const handleEventForm = async () => {
    if (
      !(eventFormData.address.city.length > 0 && eventFormData.address.country.length > 0 && eventFormData.address.houseNumber.length > 0 && eventFormData.address.street.length > 0 && eventFormData.address.zip.length > 0)
    ) {

      setEventFormData({
        ...eventFormData,
        address: {
          country: '',
          city: '',
          street: '',
          houseNumber: '',
          zip: ''
        }
      })
    }

    const testTimes: RegExp = /^\d{2}:\d{2}$/
    if (eventFormData.fullDay && eventFormData.event.length > 0 && !testTimes.test(eventFormData.startTime)) {
      await axios.post(BaseUrl + "/api/events/user", {
        ...eventFormData,
        startTime: selectedDay + 'T00:00'
      }, config).then(() => {
        ToastAndroid.showWithGravity('Event added', 2000, ToastAndroid.CENTER)

      })
        .catch((e) => {
          console.log(e)
          console.log(selectedDay + 'T00:00')
          console.log(eventFormData)

        })

      setEventFormData(defdata)
    }
    else if (!eventFormData.fullDay && eventFormData.event.length > 0 && testTimes.test(eventFormData.startTime) && testTimes.test(eventFormData.endTime)) {
      await axios.post(BaseUrl + "/api/events/user", {
        ...eventFormData,
        startTime: selectedDay + 'T' + eventFormData.startTime,
        endTime: selectedDay + 'T' + eventFormData.endTime,
      }, config).then(() => {
        ToastAndroid.showWithGravity('Event added', 2000, ToastAndroid.CENTER)

      })
        .catch((e) => console.log(e))

      setEventFormData(defdata)
    }
    else if (eventFormData.fullDay && eventFormData.event.length > 0 && testTimes.test(eventFormData.startTime) && eventFormData.endTime.length == 0) {
      await axios.post(BaseUrl + "/api/events/user", {
        ...eventFormData,
        startTime: selectedDay + 'T' + eventFormData.startTime,
      }, config).then(() => {
        ToastAndroid.showWithGravity('Event added', 2000, ToastAndroid.CENTER)

      })
        .catch((e) => console.log(e))

      setEventFormData(defdata)
    }
    else {
      ToastAndroid.showWithGravity('Not a valid event', 2000, ToastAndroid.CENTER)
    }





    await fetchEvents()


  }

  const editPress = (item: AddEventDto, id: string) => {
    setEditing(true)
    setEventFormData(item)
    setEditId(id)
    console.log(item)
    setAddModalVisible(true);

  }


  const handleBack = async () => {
    setCurrentEvents(events.filter(e => e.startTime.slice(0, 10) == selectedDay))
    setAddModalVisible(false)
    setEventFormData(defdata)
    setEditing(false)
  }

  const handleEditEvent = async () => {

    await axios.put(BaseUrl + "/api/events/" + editId, eventFormData, config).then(() => {
      ToastAndroid.showWithGravity("Updated", 2000, ToastAndroid.CENTER)
      setEventFormData(defdata)
    })
      .catch((e) => { console.log(e), ToastAndroid.showWithGravity("Failed to update", 2000, ToastAndroid.CENTER) })
    await fetchEvents()


  }

  return (
    <>

      <Modal visible={addModalVisible}>
        <ScrollView style={styles.addmodalcontainer}>
          <TouchableOpacity onPress={() => handleBack()} activeOpacity={0.5} style={{ marginLeft: 10 }}><Feather name='arrow-left-circle' size={40} color='#fff' /></TouchableOpacity>

          {/* <Text style={styles.modalDate}><Feather name='plus' size={20} color='#FFD700' /> Event</Text> */}
          <View style={styles.formContainer}>
            <View style={styles.formLeft}>
              <Text style={{ color: '#FFD700', marginBottom: 10, fontSize: 20, fontWeight: 'bold', alignSelf: 'center' }}>Event</Text>

              <Text style={styles.formText}>Event</Text>
              <TextInput value={eventFormData.event} onChangeText={(value) => { setEventFormData({ ...eventFormData, event: value }) }} style={styles.inps} />
              <Text style={styles.formText}>Start time</Text>
              <TextInput value={eventFormData.startTime} onChangeText={(value) => { setEventFormData({ ...eventFormData, startTime: value }) }} placeholder='hh:mm' placeholderTextColor='#fff' style={styles.inps} />
              <Text style={styles.formText}>End time</Text>
              <TextInput value={eventFormData.endTime} onChangeText={(value) => { setEventFormData({ ...eventFormData, endTime: value }) }} placeholder='hh:mm' placeholderTextColor='#fff' style={styles.inps} />

              <Text style={styles.formText}>Category</Text>
              <Picker selectedValue={eventFormData.category} onValueChange={(value) => setEventFormData({ ...eventFormData, category: value })} style={{ backgroundColor: '#fff', width: 200 }}>
                <Picker.Item label="Testcategory" value="Testcategory" />
                <Picker.Item label="Business" value="Business" />
                <Picker.Item label="Free-time" value="Free-time" />
                <Picker.Item label="School" value="School" />
                <Picker.Item label="Personal" value="Personal" />
                <Picker.Item label="Charity" value="Charity" />
                <Picker.Item label="Travel" value="Travel" />
                <Picker.Item label="Entertainment" value="Entertainment" />
              </Picker>
              <CheckBox
                onClick={() => { setEventFormData({ ...eventFormData, fullDay: !eventFormData.fullDay }) }}
                style={{ marginTop: 10 }}
                checkBoxColor='#fff'
                isChecked={eventFormData.fullDay}
                leftText='All day long'
                leftTextStyle={{ color: '#fff', fontSize: 20 }}
              />

            </View>
            <View style={styles.formRight}>
              <Text style={{ color: '#FFD700', marginBottom: 10, fontSize: 20, fontWeight: 'bold', alignSelf: 'center', paddingLeft: 0 }}>Location</Text>
              <Text style={styles.formText}>Country</Text>

              <TextInput value={eventFormData.address.country} onChangeText={(value) => { setEventFormData({ ...eventFormData, address: { ...eventFormData.address, country: value } }) }} style={styles.inps} />
              <Text style={styles.formText}>City</Text>
              <TextInput value={eventFormData.address.city} onChangeText={(value) => { setEventFormData({ ...eventFormData, address: { ...eventFormData.address, city: value } }) }} style={styles.inps} />
              <Text style={styles.formText}>Street</Text>
              <TextInput value={eventFormData.address.street} onChangeText={(value) => { setEventFormData({ ...eventFormData, address: { ...eventFormData.address, street: value } }) }} style={styles.inps} />

              <View style={{ flexDirection: 'row' }}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.formText}>House Number</Text>
                  <TextInput value={eventFormData.address.houseNumber} onChangeText={(value) => { setEventFormData({ ...eventFormData, address: { ...eventFormData.address, houseNumber: value } }) }} style={styles.inps} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.formText}>ZIP</Text>
                  <TextInput value={eventFormData.address.zip} onChangeText={(value) => { setEventFormData({ ...eventFormData, address: { ...eventFormData.address, zip: value } }) }} style={styles.inps} />

                </View>

              </View>
              {
                editing ? <TouchableOpacity onPress={() => handleEditEvent()} activeOpacity={0.7} style={styles.buttonContainer}>
                  <Text style={styles.buttonText}>Edit event</Text>
                </TouchableOpacity> :
                  <TouchableOpacity onPress={() => handleEventForm()} activeOpacity={0.7} style={styles.buttonContainer}>
                    <Text style={styles.buttonText}>Add event</Text>
                  </TouchableOpacity>

              }

            </View>
          </View>




        </ScrollView>

      </Modal>

      <Modal animationType='slide' visible={modalVisible} >

        <View style={styles.modalContainer}>
          <TouchableOpacity onPress={() => setModalVisible(false)} activeOpacity={0.5} style={{ marginLeft: 10 }}><Feather name='arrow-left-circle' size={40} color='#fff' /></TouchableOpacity>

          <Text style={styles.modalDate}><Feather name='calendar' size={20} color='#FFD700' /> {selectedDay}</Text>
          <View style={styles.itemswrapper}>
            {currentEvents.length == 0 ? <View><Text style={{ fontSize: 30, marginTop: 5, marginBottom: 5, fontStyle: 'italic', fontWeight: 'bold', color: '#fff', alignSelf: 'center' }}>No events yet!</Text></View> :
              <ScrollView style={{ borderBottomColor: '#fff' }}>
                {

                  currentEvents.map((item, i) => {
                    return (
                      <View key={i} style={styles.item}>
                        <View style={styles.itemleft}>
                          {item.fullDay && item.startTime.slice(11, 16) == '00:00' ? <Text style={styles.clockText}><Feather name='clock' /> All day!</Text> :
                            <Text style={styles.clockText}><Feather size={15} name='clock' /> {item.startTime.slice(11, 16)} - {item.endTime ? item.endTime.slice(11, 16) : ''}</Text>

                          }
                          <View>
                            <Text style={styles.clockText}><Feather size={15} name='star' /> {item.category}</Text>
                          </View>
                        </View>
                        <View style={styles.itemcenter}>
                          <Text style={{ fontSize: 15, paddingLeft: 5, paddingRight: 5, textAlign: 'justify' }}><Text style={{ fontWeight: 'bold' }}>Event:</Text> {item.event}

                          </Text>

                        </View>
                        <View style={styles.itemright}>
                          <View>
                            {
                              item.address ? <Text style={{ fontSize: 10, fontWeight: 'bold' }}><Feather color={'black'} size={20} name='map-pin' />{item.address.city} {item.address.zip} {item.address.street} {item.address.houseNumber} {item.address.country}</Text> :
                                <Text><Feather color={'black'} size={20} name='map-pin' /></Text>
                            }

                          </View>

                          <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity onPress={() => editPress({
                              event: item.event,
                              startTime: item.startTime,
                              endTime: item.endTime,
                              category: item.category,
                              fullDay: JSON.parse(item.fullDay),
                              address: item.address ? item.address : {
                                country: '',
                                city: '',
                                street: '',
                                houseNumber: '',
                                zip: ''
                              }
                            }, item.id)}>
                              <Feather color={'blue'} size={20} name='edit' />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handleDeleteEvent(item.id)} style={{ paddingRight: 5, paddingLeft: 15 }}>
                              <Feather color={'red'} size={20} name='trash-2' />
                            </TouchableOpacity>
                          </View>

                        </View>
                      </View>
                    )
                  }, [currentEvents])
                }
              </ScrollView>}
          </View>
          <View>
            <TouchableOpacity onPress={() => setAddModalVisible(true)}>
              <View style={styles.addWrapper}>
                <Text style={styles.addText}>+</Text>
              </View>
            </TouchableOpacity>
          </View>

        </View>



      </Modal>



      <Calendar style={{ paddingTop: 40, height: '70%' }}
        theme={theme}
        disableAllTouchEventsForDisabledDays={true}
        firstDay={1}
        enableSwipeMonths={true}
        markedDates={markedDates}
        onDayPress={onDayPress}
      />
      <View style={styles.container}>
        <Image source={require('../assets/kalandar_icon.png')} style={styles.logo} resizeMode="stretch" />
      </View>
    </>
  )
}

const { height, width } = Dimensions.get('screen')
const styles = StyleSheet.create({

  container: {
    backgroundColor: '#121212',
    height: '100%',
    marginTop: -180,
    flex: 1,
    justifyContent: 'center'
  },
  logo: {
    width: width * 0.8,
    height: height * 0.2,
    alignSelf: 'center',

  },
  modalContainer: {
    backgroundColor: '#121212',
    height: height,
    paddingTop: 20
  },
  modalDate: {
    color: '#FFD700',
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center'
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: '#121212',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#fff',
    alignSelf: 'flex-end',
    marginRight: 20,
    bottom: -50

  },
  addText: {
    fontSize: 30,
    color: '#FFD700',
  },
  itemswrapper: {
    maxHeight: 500,
    marginTop: 30,
    marginLeft: 10,
    marginRight: 10,
    borderWidth: 2,
    borderBottomColor: '#fff',
    borderTopColor: '#fff'
  },
  item: {
    backgroundColor: '#FFD700',
    height: 200,
    borderRadius: 20,
    marginTop: 5,
    marginBottom: 5,
    maxHeight: 200

  },
  itemleft: {
    flex: 1,
    borderBottomWidth: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  itemright: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: 10,
    marginRight: 10
  },
  itemcenter: {
    flex: 3,
    borderBottomWidth: 2,
  },
  clockText: {
    paddingTop: 5,
    paddingLeft: 10,
    fontStyle: 'italic',
    fontWeight: 'bold',
    paddingRight: 10

  },
  addmodalcontainer: {
    height: height,
    backgroundColor: '#121212'
  },
  formContainer: {
    marginTop: 15
  },
  formText: {
    color: '#fff',
    marginBottom: 5,
    fontWeight: 'bold',
  },
  formLeft: {
    paddingLeft: 15,

  },
  formRight: {
    paddingLeft: 15
  },
  inps: {
    borderBottomColor: '#fff',
    borderBottomWidth: 2,
    marginRight: 30,
    marginTop: 5,
    color: '#fff',
    fontSize: 20,
    marginBottom: 10
  },
  buttonContainer: {

    marginTop: 20,
    borderRadius: 30,
    backgroundColor: '#FFD700',
    alignSelf: 'center',
    paddingVertical: 8,
    width: width * 0.7,
    bottom: 10

  },
  buttonText: {
    color: '#121212',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    flexDirection: 'row',

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