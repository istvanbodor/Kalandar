import { View, Text, Button, StyleSheet, Dimensions, Image, TextInput, TouchableOpacity, ToastAndroid } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import Feather from 'react-native-vector-icons/Feather';
import { UserProfileDto } from '../interfaces/UserProfileDto';
import axios from 'axios';
import { BaseUrl } from '../url/BaseUrl';

export default function ProfileScreen() {

  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');

  const {logout, token, login} = useContext(AuthContext);

  const [data, setData] = useState<UserProfileDto>()
  const config = {
    headers: {
      Authorization: 'Bearer '+token?.token
    }
  }
  useEffect(()=>{
    
    const getData = async ()=>{
      console.log('asd')
      console.log('sent token'+token)
      console.log(config.headers)
      await axios.get(BaseUrl+'/api/user/profile',config).then((response)=>{
        setData({firstName: response.data.firstName, lastName: response.data.lastName})
        console.log(response.data.firstName)
      }).catch((e)=>{
        console.log(e)
      }) 
        
    }
    getData();

  }, [] )

  const handleFirstPasswordChange = (value : string)=>{
  setPassword(value);
 }

  const handleSecondPasswordChange = (value : string)=>{
  setPassword2(value);
 }
  const handleNewPassword = async () =>{

    if(password===password2&&password.length<3)
    {
      ToastAndroid.showWithGravity('Password must be 3 characters minimum!', 2000, ToastAndroid.CENTER)
    }
    else if (password!=password2) {
      ToastAndroid.showWithGravity('Unmatching passwords!', 2000, ToastAndroid.CENTER)
    }
    else {
      const config = {
        headers: {
          Authorization: 'Bearer '+token
        }
      }
      await axios.put(BaseUrl+'/api/user/password', {password: password}, config).then(()=>{
        ToastAndroid.showWithGravity('Password changed!', 2000, ToastAndroid.CENTER)
      })
      .catch(e=>{
        console.log(e);
        ToastAndroid.showWithGravity('Something went wrong!', 2000, ToastAndroid.CENTER)
      })
    }
    
  }


  return (
    <View style={stlyes.container}>
              <View style={{flex: 1, alignItems: 'center'}}>
              <Feather name='user' color='#fff' size={150} style={{marginTop: 80}} />
              <Text style={stlyes.text}>{data?.firstName} {data?.lastName}</Text>
              </View>
              <View style={{flex: 2, marginLeft: 30}}>
              <Text style={stlyes.pwtext}>New Password</Text>
              <TextInput value={password} onChangeText={(value)=>handleFirstPasswordChange(value)} secureTextEntry={true} style={stlyes.inps} />
              <Text style={[stlyes.pwtext, {marginTop: 30}]}>New Password Again</Text>
              <TextInput value={password2} onChangeText={(value)=>handleSecondPasswordChange(value)} secureTextEntry={true} style={stlyes.inps} />
              <TouchableOpacity activeOpacity={0.7} style={{...stlyes.buttonContainer, backgroundColor:'#fff', borderWidth: 1}} onPress={()=>handleNewPassword()} >
                    <Text style={{color: '#121212', fontSize: 20, textAlign: 'center'}}>Change password</Text>
                    
                </TouchableOpacity>

                <TouchableOpacity activeOpacity={0.7} style={{...stlyes.buttonContainer, backgroundColor:'#121212', borderWidth: 1, borderColor: '#fff', marginTop: 100}} onPress={()=>logout()} >
                    <Text style={{color: '#fff', fontSize: 20, textAlign: 'center'}}>Log Out</Text>
                    <Feather name='log-out' size={40} color={'#fff'} style={{alignSelf: 'center'}} />
                    
                </TouchableOpacity>
              </View>
            

    </View>
  )
}

const {height, width} = Dimensions.get('screen');
const stlyes = StyleSheet.create({

    container: {
        backgroundColor: '#121212',
        height: height,
        
    },
    text: {color: '#fff', fontSize: 30},
    pwtext: {
      color: '#fff',
      fontSize: 20,
    },
    inps: {
      borderBottomColor: '#fff',
      borderBottomWidth: 2,
      marginRight: 30,
      marginTop: 5,
      color: '#fff',
      fontSize: 20,
    },
    buttonContainer: {
        
      marginTop: 30,
      borderRadius: 30,
      backgroundColor: '#FFD700',
      paddingVertical: 10,
      width: width*0.5,
      alignSelf:'center',
      
    }


})