import * as React from "react";
import { useDispatch } from "react-redux";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icons from "react-native-vector-icons/MaterialIcons";
import AsyncStorage from "@react-native-community/async-storage";
import { useNavigation } from "@react-navigation/native";
import ActionFood from "./action.food";

import Header from "../../component/Header";

import Principal from "./principal";
import Pedidos from "./pedidos";
import Historico from "./historico";

const Tab = createBottomTabNavigator();

export default function App() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [logado, setLogado] = React.useState({});

  React.useEffect(() => {
    getUser();
  }, []);

  async function getUser() {
    const storageUser = await AsyncStorage.getItem("uid");
    const storageNome = await AsyncStorage.getItem("nome");
    setLogado({ ...logado, uid: storageUser, nome: storageNome });
  }

  const icons = {
    Principal: {
      name: "local-dining",
    },
    Pedidos: {
      name: "shopping-cart",
    },
    Histórico: {
      name: "equalizer",
    },
  };

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
        <Tab.Screen name="Principal" component={Principal} />
        <Tab.Screen name="Pedidos" component={Pedidos} />
        <Tab.Screen name="Histórico" component={Historico} />
      </Tab.Navigator>
    </>
  );
}
