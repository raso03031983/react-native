import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icons from "react-native-vector-icons/MaterialIcons";
import AsyncStorage from "@react-native-community/async-storage";
import { useNavigation } from "@react-navigation/native";
import Registrar from "./registrar";
import Movimentacao from "./movimentacao";
import Historico from "./historico";
import Header from "../../component/Header";

const Tab = createBottomTabNavigator();

export default function App() {
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
    Registrar: {
      name: "done-all",
    },
    Movimentação: {
      name: "format-line-spacing",
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
        <Tab.Screen name="Registrar" component={Registrar} />
        <Tab.Screen name="Movimentação" component={Movimentacao} />
        <Tab.Screen name="Histórico" component={Historico} />
      </Tab.Navigator>
    </>
  );
}
