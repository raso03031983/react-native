import React, { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icons from "react-native-vector-icons/MaterialIcons";

import Header from "../../component/Header";

import Esporte from "./esporte";
import Atualidades from "./atualidades";
import Tech from "./tech";
import Geral from "./geral";
import Entretenimento from "./entretenimento";

const Tab = createBottomTabNavigator();

export default function App() {
  const icons = {
    Geral: {
      name: "face",
    },
    Atualidades: {
      name: "stars",
    },
    Esportes: {
      name: "whatshot",
    },
    Tech: {
      name: "memory",
    },
    Entretenimento: {
      name: "local-bar",
    },
  };
  const [title, setTitle] = useState();

  return (
    <>
      <Header />
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            const { name } = icons[route.name];
            return <Icons name={name} color={color} size={size} />;
          },
        })}
        tabBarOptions={{
          style: {
            backgroundColor: "#121212",
          },
          activeTintColor: "#ffd700",
        }}
      >
        <Tab.Screen name="Geral" component={Geral} />
        <Tab.Screen name="Atualidades" component={Atualidades} />
        <Tab.Screen name="Esportes" component={Esporte} />
        <Tab.Screen name="Tech" component={Tech} />
        <Tab.Screen name="Entretenimento" component={Entretenimento} />
      </Tab.Navigator>
    </>
  );
}
