import * as React from "react";
import { Text, StyleSheet } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import store from "../redux/store";
import Icons from "react-native-vector-icons/MaterialIcons";

import Home from "../page/home";
import Noticias from "../page/noticias";
import Login from "../page/login";
import Financas from "../page/financas";
import Food from "../page/food";

const Drawer = createDrawerNavigator();

const colorIcon = "#121212";
const sizeIcon = 30;

const styles = StyleSheet.create({
  text: {
    fontWeight: "bold",
    fontSize: 20,
  },
});

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Drawer.Navigator
          initialRouteName="Home"
          drawerStyle={{
            backgroundColor: "#ffd700",
          }}
        >
          <Drawer.Screen
            name="Home"
            component={Home}
            options={{
              drawerLabel: () => <Text style={styles.text}>Home</Text>,
              drawerIcon: () => (
                <Icons name={"home"} color={colorIcon} size={sizeIcon} />
              ),
            }}
          />
          <Drawer.Screen
            name="Login"
            component={Login}
            options={{
              drawerLabel: () => <Text style={styles.text}>Login</Text>,
              drawerIcon: () => (
                <Icons
                  name={"account-circle"}
                  color={colorIcon}
                  size={sizeIcon}
                />
              ),
            }}
          />
          <Drawer.Screen
            name="Noticias"
            component={Noticias}
            options={{
              drawerLabel: () => <Text style={styles.text}>Noticias</Text>,
              drawerIcon: () => (
                <Icons
                  name={"announcement"}
                  color={colorIcon}
                  size={sizeIcon}
                />
              ),
            }}
          />
          <Drawer.Screen
            name="Finanças"
            component={Financas}
            options={{
              drawerLabel: () =>
                1 > 0 ? <Text style={styles.text}>Finanças</Text> : null,
              drawerIcon: () =>
                1 > 0 ? (
                  <Icons
                    name={"attach-money"}
                    color={colorIcon}
                    size={sizeIcon}
                  />
                ) : null,
            }}
          />
          <Drawer.Screen
            name="Food"
            component={Food}
            options={{
              drawerLabel: () =>
                1 > 0 ? <Text style={styles.text}>Food</Text> : null,
              drawerIcon: () =>
                1 > 0 ? (
                  <Icons
                    name={"local-pizza"}
                    color={colorIcon}
                    size={sizeIcon}
                  />
                ) : null,
            }}
          />
        </Drawer.Navigator>
        {/* </AuthProvider> */}
      </NavigationContainer>
    </Provider>
  );
}
