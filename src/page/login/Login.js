import React, { useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableHighlight,
} from "react-native";
import Header from "../../component/Header";
import Toast from "react-native-tiny-toast";
import { AuthContext } from "../../contexts/AuthContex";

console.disableYellowBox = true;

export default function App() {
  const { logar, signed, logout } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin() {
    if (!email || !password) {
      Toast.hide();
      Toast.show("Email e senha são obrigatórios");
      return;
    }
    logar(email, password);
  }

  async function handleLogout() {
    logout();
  }

  return (
    <View>
      <Header />
      {signed ? (
        <View
          style={{
            marginTop: 10,
          }}
        >
          <TouchableHighlight onPress={handleLogout}>
            <Text style={styles.btn}>Logout</Text>
          </TouchableHighlight>
        </View>
      ) : (
        <>
          <Text style={styles.texto}>Email</Text>
          <TextInput
            keyboardType="email-address"
            style={styles.input}
            underlineColorAndroid="transparent"
            onChangeText={(texto) => setEmail(texto)}
            value={email}
          />

          <Text style={styles.texto}>Senha</Text>
          <TextInput
            style={styles.input}
            underlineColorAndroid="transparent"
            onChangeText={(texto) => setPassword(texto)}
            value={password}
          />
          <TouchableHighlight onPress={handleLogin}>
            <Text style={styles.btn}>Login</Text>
          </TouchableHighlight>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
  },
  texto: {
    fontSize: 20,
    marginLeft: 5,
    marginRight: 5,
  },
  input: {
    marginBottom: 10,
    marginLeft: 5,
    marginRight: 5,
    padding: 10,
    borderWidth: 1,
    borderColor: "#121212",
    height: 45,
    fontSize: 17,
  },
  btn: {
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 10,
    fontSize: 25,
    textAlign: "center",
    backgroundColor: "#ffd700",
    padding: 5,
    borderRadius: 30,
  },
});
