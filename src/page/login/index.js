import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icons from 'react-native-vector-icons/MaterialIcons';

import Login from './Login';
import Cadastrar from './Cadastrar';

const Tab = createBottomTabNavigator();

export default function App() {
  const icons = {
    Login: {
      name: 'face',
    },
    Cadastrar: {
      name: 'stars',
    },
  };

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({color, size}) => {
          const {name} = icons[route.name];
          return <Icons name={name} color={color} size={size} />;
        },
      })}
      tabBarOptions={{
        style: {
          backgroundColor: '#121212',
        },
        activeTintColor: '#ffd700',
      }}>
      <Tab.Screen name="Login" component={Login} />
      <Tab.Screen name="Cadastrar" component={Cadastrar} />
    </Tab.Navigator>
  );
}
