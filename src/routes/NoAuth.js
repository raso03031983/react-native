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
        {/* <AuthProvider> */}
        <Drawer.Navigator
          initialRouteName="Login"
          drawerStyle={{
            backgroundColor: "#ffd700",
          }}
        >
          {/* <Drawer.Screen
            name="Home"
            component={Home}
            options={{
              drawerLabel: () => <Text style={styles.text}>Home</Text>,
              drawerIcon: () => (
                <Icons name={"home"} color={colorIcon} size={sizeIcon} />
              ),
            }}
          /> */}
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
        </Drawer.Navigator>
        {/* </AuthProvider> */}
      </NavigationContainer>
    </Provider>
  );
}
