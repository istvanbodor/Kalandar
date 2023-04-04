import React, { useContext } from 'react';
import RootStackScreen from '../screens/RootStackScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeCalendarScreen from '../screens/HomeCalendarScreen';
import { AuthContext } from '../contexts/AuthContext';
import { View } from 'react-native-animatable';
import { StatusBar } from 'react-native/Libraries/Components/StatusBar/StatusBar';
import { ActivityIndicator } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

export default function Navigation() {

  const { token, init } = useContext(AuthContext);


  return (
    <>

      {init ?
        <NavigationContainer>


          {!token ? <RootStackScreen /> :

            (
              <Tab.Navigator initialRouteName='Calendar' screenOptions={({route})=>({
                headerShown: false,
                tabBarStyle: {
                    borderTopWidth: 1
                    
                
                },
                tabBarActiveBackgroundColor: '#121212',
                tabBarInactiveBackgroundColor: '#212121',
                tabBarActiveTintColor: '#FFD700',
                tabBarIcon: ({focused, color, size}) => {
                  let iconName = '';

                  if (route.name=='Calendar') {
                    iconName = 'calendar'
                  }
                  else if (route.name =='Profile')
                  {
                    iconName = 'user'
                  }
                  return <FontAwesome size={22} color={focused? '#FFD700':'#fff'} name={iconName}  />

                }
              })}>
                <Tab.Screen name='Calendar' component={HomeCalendarScreen} />
                <Tab.Screen name='Profile' component={ProfileScreen} />
              </Tab.Navigator>
            )
          }



        </NavigationContainer> :

        <View style={{flex:1,justifyContent:'center',alignItems:'center', backgroundColor: '#121212'}}>
          <ActivityIndicator color='#999999' size="large"/>
        </View>

      }

    </>
  )
}