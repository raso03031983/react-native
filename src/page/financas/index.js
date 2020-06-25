import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icons from 'react-native-vector-icons/MaterialIcons';

import Registrar from './registrar';
import Movimentacao from './movimentacao';
import Historico from './historico';

const Tab = createBottomTabNavigator();

export default function App() {
  const icons = {
    Registrar: {
      name: 'done-all',
    },
    Movimentação: {
      name: 'format-line-spacing',
    },
    Histórico: {
      name: 'equalizer',
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
      <Tab.Screen name="Registrar" component={Registrar} />
      <Tab.Screen name="Movimentação" component={Movimentacao} />
      <Tab.Screen name="Histórico" component={Historico} />
    </Tab.Navigator>
  );
}
