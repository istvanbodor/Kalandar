import { View, Text, Button, TouchableOpacity, Dimensions, StyleSheet, TextInput } from 'react-native'
import * as Animatable from 'react-native-animatable'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Feather from 'react-native-vector-icons/Feather'
import React from 'react'
import { Modal } from 'react-native'

interface FormData {
  email: string
  password: string
  firstName: string
  lastName: string
  username: string
  emailCheck: boolean
  lastNameCheck: boolean
  firstNameCheck: boolean
  usernameCheck: boolean
  passwordCheck: boolean
  secureTextEntry: boolean
}


export default function RegisterScreen({navigation}: any) {

  const emailExpression: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

  const namesExpression: RegExp = /^[A-Z][a-zA-Z\d]{2,}$/;

  const usernameExpression: RegExp = /^[a-zA-Z\d]{3,}$/;
  
  
  const [data, setData] = React.useState<FormData>({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    username: '',
    emailCheck: false,
    firstNameCheck: false,
    lastNameCheck: false,
    usernameCheck: false,
    passwordCheck: false,
    secureTextEntry: true
  })

  const [modalVisible, setModalVisible] = React.useState<boolean>(false);

  const handleFirstNameTextInputChange = (value: string) =>{
         
      setData(
        {
          ...data,
          firstName: value,
          firstNameCheck: namesExpression.test(value)
        }
        
      )     
  }


  const handleLastNameTextInputChange = (value: string) =>{
         
    setData(
      {
        ...data,
        lastName: value,
        lastNameCheck: namesExpression.test(value)
      }
      
    )    
}

const handleUsernameInputChange = (value: string) =>{
         
  setData(
    {
      ...data,
      username: value,
      usernameCheck: usernameExpression.test(value)
    }
    
  )    
}

const handleEmailInputChange = (value: string) =>{
         
  setData(
    {
      ...data,
      email: value,
      emailCheck: emailExpression.test(value)
    }
    
  )    
}

const handlePasswordInputChange = (value: string) =>{
         
  setData(
    {
      ...data,
      password: value,
      passwordCheck: value.length>=3
    }
    
  )    
}

 



  return (
            <>
            
                
    <Modal visible={modalVisible} animationType='slide'>
        <View style={styles.modalContainer}>
        <Text style={{color: '#fff', fontSize: 20, paddingLeft: 20, marginTop: 40, textAlign: 'justify', paddingRight: 20, fontStyle: 'italic'}}>
          - First and Last name fields must start with a capital letter and has to have a minimum length of 3 and must only contain letters!
        </Text>

        <Text style={{color: '#fff', fontSize: 20, paddingLeft: 20, marginTop: 40, textAlign: 'justify', paddingRight: 20, fontStyle: 'italic'}}>
          - The username field must contain at least 3 characters and no special characters!
        </Text>

        <Text style={{color: '#fff', fontSize: 20, paddingLeft: 20, marginTop: 40, textAlign: 'justify', paddingRight: 20, fontStyle: 'italic'}}>
          - The email field must have email format! ex: example@example.com
        </Text>

        <Text style={{color: '#fff', fontSize: 20, paddingLeft: 20, marginTop: 40, textAlign: 'justify', paddingRight: 20, fontStyle: 'italic'}}>
          - The password field must have at least 3 characters</Text>

        <TouchableOpacity onPress={()=>setModalVisible(false)} activeOpacity={0.7} style={{...styles.buttonContainer, backgroundColor:'#fff', borderWidth: 1, alignSelf: 'center', marginTop: 200}} >
                    <Text style={{...styles.buttonText, color: '#121212'}}>Understood!</Text>
                    
                </TouchableOpacity>


        </View>
    

    </Modal>


    <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={()=>setModalVisible(true)} style={styles.infoIcon}>
          <FontAwesome color='white' name='info' size={30}></FontAwesome>
          </TouchableOpacity>
        
          <Text style={styles.welcomeText}>Register!</Text>
        </View>

      
        <Animatable.View animation="fadeInUpBig" style={styles.footer}>

          <Text style={styles.footerText}>First Name</Text>
          <View style={styles.formElement}>

            <FontAwesome name='user-o' size={25}></FontAwesome>
            <TextInput placeholder='First Name'  style={styles.textInput} onChangeText={(value)=>handleFirstNameTextInputChange(value)}></TextInput>
            {data.firstNameCheck &&  <Animatable.View animation='bounceIn'><Feather name='check-circle' color="green" size={20} /></Animatable.View> }
           
          </View>

          <Text style={styles.footerText}>Last Name</Text>
          <View style={styles.formElement}>

            <FontAwesome name='user-o' size={25}></FontAwesome>
            <TextInput placeholder='Last Name' style={styles.textInput} onChangeText={(value)=>handleLastNameTextInputChange(value)}></TextInput>
            {data.lastNameCheck &&  <Animatable.View animation='bounceIn'><Feather name='check-circle' color="green" size={20} /></Animatable.View> }
           
          </View>

          <Text style={styles.footerText}>Username</Text>
          <View style={styles.formElement}>

            <FontAwesome name='user-o' size={25}></FontAwesome>
            <TextInput placeholder='Username' autoCapitalize='none' style={styles.textInput} onChangeText={(value)=>handleUsernameInputChange(value)}></TextInput>
            {data.usernameCheck &&  <Animatable.View animation='bounceIn'><Feather name='check-circle' color="green" size={20} /></Animatable.View> }
           
          </View>

          <Text style={styles.footerText}>Email</Text>
          <View style={styles.formElement}>

            <FontAwesome name='envelope-o' size={25}></FontAwesome>
            <TextInput placeholder='Email' autoCapitalize='none' style={styles.textInput} onChangeText={(value)=>handleEmailInputChange(value)}></TextInput>
            {data.emailCheck &&  <Animatable.View animation='bounceIn'><Feather name='check-circle' color="green" size={20} /></Animatable.View> }
           
          </View>

          <Text style={[styles.footerText, {marginTop: 10}]}>Password</Text>
          <View style={styles.formElement}>

            <Feather name='lock' size={25}/>
            <TextInput placeholder='Password' secureTextEntry={data.secureTextEntry} onChangeText={(value)=>handlePasswordInputChange(value)} autoCapitalize='none' style={styles.textInput}></TextInput>
            <TouchableOpacity onPress={()=>setData({...data, secureTextEntry: !data.secureTextEntry})}>
            {
              data.secureTextEntry? <Feather name='eye-off'  color="grey" size={20} /> : <Feather name='eye'  color="grey" size={20} />
            }
            </TouchableOpacity>
            {
              data.passwordCheck && <Animatable.View animation='bounceIn'><Feather name='check-circle' color="green" size={20} /></Animatable.View>
            }
          </View>




          <View style={{flex: 1, alignItems: 'center'}} >
            
          <TouchableOpacity activeOpacity={0.7} style={{...styles.buttonContainer, backgroundColor:'#121212', borderWidth: 1}} >
                    <Text style={{...styles.buttonText, color: '#fff'}}>Register</Text>
                    
                </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.7} style={styles.buttonContainer} onPress={()=>navigation.goBack()}>
                    <Text style={styles.buttonText}>Log in</Text>
      
          </TouchableOpacity>

          
          </View>
          
          

        </Animatable.View>
    </View>
    </>
  )
}


const {width, height} = Dimensions.get('screen')
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
infoIcon: {
  flex: 1,
  marginTop: 50,
  alignItems: 'flex-end'

},
modalContainer: {
  backgroundColor: '#121212',
  height: height 
}
})



