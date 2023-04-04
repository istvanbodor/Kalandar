import { View, Text, Button, TouchableOpacity, Dimensions, StyleSheet, TextInput, ToastAndroid } from 'react-native'
import * as Animatable from 'react-native-animatable'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Feather from 'react-native-vector-icons/Feather'
import React, {useContext} from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { AxiosError } from 'axios'


interface FormData {
  email: string
  password: string
  emailCheck: boolean
  secureTextEntry: boolean
}


export default function LoginScreen({navigation}: any) {


  const emailExpression: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  
  const [data, setData] = React.useState<FormData>({
    email: '',
    password: '',
    emailCheck: false,
    secureTextEntry: true
  })

  const def: FormData = {
    email: '',
    password: '',
    emailCheck: false,
    secureTextEntry: true
  }

  const {login} = useContext(AuthContext);


  const handleEmailTextInputChange = (value: string) =>{
         
      setData(
        {
          ...data,
          email: value,
          emailCheck: emailExpression.test(value)
        }
        
      )
          
  }
  const handlePasswordTextInputChange = (value: string) =>{
         
    setData(
      {
        ...data,
        password: value,
      }
      
    )
        
}

  const handleLogin = ()=>{
    if (data.emailCheck) {
    try {
      login({email: data.email, password: data.password})
    }
    catch (e)
    { 
      
      ToastAndroid.showWithGravity('Wrong credentials', 2000, ToastAndroid.CENTER)
    }
    finally {
      setData(def);
    }
  } else {
    ToastAndroid.showWithGravity('Wrong email!', 2000, ToastAndroid.CENTER)
  }
}
  return (
    <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.welcomeText}>Welcome!</Text>
        </View>

      
        <Animatable.View animation="fadeInUpBig" style={styles.footer}>

          <Text style={styles.footerText}>Email</Text>
          <View style={styles.formElement}>

            <FontAwesome name='envelope-o' size={25}></FontAwesome>
            <TextInput value={data.email} placeholder='Email' autoCapitalize='none' style={styles.textInput} onChangeText={(value)=>handleEmailTextInputChange(value)}></TextInput>
            {data.emailCheck &&  <Animatable.View animation='bounceIn'><Feather name='check-circle' color="green" size={20} /></Animatable.View> }
           
          </View>

          <Text style={[styles.footerText, {marginTop: 35}]}>Password</Text>
          <View style={styles.formElement}>

            <Feather name='lock' size={25}/>
            <TextInput value={data.password} placeholder='Password' secureTextEntry={data.secureTextEntry} autoCapitalize='none' style={styles.textInput} onChangeText={(value)=>handlePasswordTextInputChange(value)}></TextInput>
            <TouchableOpacity onPress={()=>setData({...data, secureTextEntry: !data.secureTextEntry})}>
            {
              data.secureTextEntry? <Feather name='eye-off'  color="grey" size={20} /> : <Feather name='eye'  color="grey" size={20} />
            }
            
            </TouchableOpacity>
            
          </View>
          <View style={{flex: 1, alignItems: 'center'}} >
          <TouchableOpacity onPress={()=>handleLogin()} activeOpacity={0.7} style={styles.buttonContainer}>
                    <Text style={styles.buttonText}>Log in</Text>
      
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.7} style={{...styles.buttonContainer, backgroundColor:'#121212', borderWidth: 1}} onPress={()=>navigation.navigate('RegisterScreen')}>
                    <Text style={{...styles.buttonText, color: '#fff'}}>No account yet? Register</Text>
                    
                </TouchableOpacity>
          </View>
          
          

        </Animatable.View>
    </View>
  )
}


const {width} = Dimensions.get('screen')
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
  },
  footerText: {
        fontSize: 18
  },
  formElement: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    paddingBottom: 5,
    borderBottomColor: '#f2f2f2'
},
textInput: {
  flex: 1,
  paddingLeft: 10,
},
buttonContainer: {
        
  marginTop: 20,
  borderRadius: 30,
  backgroundColor: '#FFD700',
  paddingVertical: 10,
  paddingHorizontal: 10,
  width: width*0.7,
  
},
buttonText: {
  color: '#121212',
  fontSize: 18,
  fontWeight: 'bold',
  textAlign: 'center',
  flexDirection: 'row',
 
},
})



