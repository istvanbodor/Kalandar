import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { StatusBar } from "expo-status-bar";
import { useState, ReactNode, useEffect } from "react";
import { ToastAndroid } from "react-native";
import { View } from "react-native-animatable";
import { AuthContext } from "../contexts/AuthContext";
import { AuthToken } from "../interfaces/AuthToken";
import { UserLoingDto } from "../interfaces/UserLoginDto";
import { BaseUrl } from "../url/BaseUrl";

interface AuthContextProviderProps {
  children: ReactNode;
}



const AuthContextProvider: React.FC<AuthContextProviderProps> = ({
  children,
}: AuthContextProviderProps) => {

    const [token, setToken] = useState<AuthToken | null>(null);
    const [init, setInit] = useState<boolean>(false);

    useEffect(()=>{
    

      const setTokenIfExists= async ()=>{
         console.log('lefutott')

       // await new Promise(resolve=>setTimeout(resolve, 1000))
        const token = await AsyncStorage.getItem('token').catch((e)=>{console.log(e)});
        console.log('At start: '+token)
        if(token!=null){
        setToken({token: token});
        }
        setInit(true);
      }

       setTokenIfExists();
},[])

  const login = async (user: UserLoingDto) => {

     await axios.post(BaseUrl+'/api/auth/login', {email: user.email, password: user.password})
     .then(async (response)=>{
      setToken({token: response.data.token})
      console.log('received token: '+response.data.token)
      ToastAndroid.showWithGravity('Logged in!', 2000, ToastAndroid.CENTER)
      await AsyncStorage.setItem('token', response.data.token).catch((e)=>{console.log(e)});
     })
     .catch((e)=>{console.log(e+user.email, user.password); ToastAndroid.showWithGravity('Wrong credentials!',2000, ToastAndroid.CENTER)})


    


  };

  const register = async (user: UserRegisterDto) =>{

      await axios.post(BaseUrl+'/api/auth/register', {firstName: user.firstName, lastName: user.lastName, username: user.username, password: user.password, email: user.email})
      .then(async (response)=>{
        ToastAndroid.showWithGravity('Success!', 2000, ToastAndroid.CENTER)
      }).catch((e)=>{
        console.log(e);
        ToastAndroid.showWithGravity('Could not register', 2000, ToastAndroid.CENTER)
      })
  }

  const logout = async () => {
    setToken(null);
    await AsyncStorage.removeItem('token').catch((e)=>{console.log(e)});
  };

  return (
    
    <AuthContext.Provider value={{ token, login, logout, init, register }}>
       {children}   
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;