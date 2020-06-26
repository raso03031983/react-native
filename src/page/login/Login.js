import React, { useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableHighlight,
} from "react-native";
import firebase from "../../Config/firebase";
import Header from "../../component/Header";
import AsyncStorage from "@react-native-community/async-storage";
import Toast from "react-native-tiny-toast";

console.disableYellowBox = true;

export default function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nome, setNome] = useState("");
  const [logado, setLogado] = React.useState({});

  React.useEffect(() => {
    getUser();
  }, []);

  async function getUser() {
    const storageUser = await AsyncStorage.getItem("uid");
    const storageNome = await AsyncStorage.getItem("nome");
    setLogado({ ...logado, uid: storageUser, nome: storageNome });
  }

  async function logar() {
    if (!email || !password) {
      Toast.hide();
      Toast.show("Email e senha são obrigatórios");
      return false;
    }

    Toast.showLoading("Verificando Dados");
    await firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(async (value) => {
        await firebase
          .database()
          .ref("usuarios")
          .child(value.user.uid)
          .once("value")
          .then(async (resp) => {
            gravauser(resp.val().nome, value.user.uid);
            Toast.hide();
            Toast.showSuccess("Login Realizado :)");
          })
          .catch((error) => {
            Toast.hide();
            Toast.show("Erro ao logar");
          });
      })
      .catch((error) => {
        Toast.hide();
        Toast.show("Ops algo deu errado!");
        return;
      });

    setEmail("");
    setPassword("");
  }

  async function gravauser(nome, uid) {
    await AsyncStorage.setItem("uid", uid);
    await AsyncStorage.setItem("nome", nome);
    getUser();
  }

  async function logout() {
    await firebase.auth().signOut();
    AsyncStorage.clear();
    setLogado({});
    Toast.showSuccess("Deslgoado com sucesso!");
  }

  return (
    <View>
      <Header />
      {logado.uid ? (
        <View style={{ marginTop: 10 }}>
          <TouchableHighlight onPress={logout}>
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
          <TouchableHighlight onPress={logar}>
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
  },
});
