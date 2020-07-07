import React, { createContext, useState, useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import { Keyboard } from "react-native";
import firebase from "../Config/firebase";
import AsyncStorage from "@react-native-community/async-storage";
import Toast from "react-native-tiny-toast";

export const AuthContext = createContext({});

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loaduser();
  }, []);

  async function loaduser() {
    const uid = await AsyncStorage.getItem("uid");
    const nome = await AsyncStorage.getItem("nome");
    const email = await AsyncStorage.getItem("email");
    if (uid) {
      setUser({
        nome: nome,
        uid: uid,
        email: email,
      });
    }
    setLoading(false);
  }

  async function cadastrar(nome, email, password) {
    Toast.showLoading("Verificando Dados");
    await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async (value) => {
        await firebase
          .database()
          .ref("usuarios")
          .child(value.user.uid)
          .set({
            nome: nome,
            saldo: 0,
            email: email,
          });
        setUser({
          nome: nome,
          uid: value.user.uid,
          email: email,
        });
        gravaUser(nome, value.user.uid, email);
        Keyboard.dismiss();
        Toast.hide();
        Toast.showSuccess(`Cadastro Realizado`);
      })
      .catch((error) => {
        Keyboard.dismiss();
        Toast.hide();

        if (error.code == "auth/invalid-email") {
          Toast.show("Email inválido");
        } else if (error.code == "auth/email-already-in-use") {
          Toast.show("Email já cadastrado");
        } else if (error.code == "auth/weak-password") {
          Toast.show("A senha dever ter no minímo 6 caracteres");
        } else {
          Toast.show("Erro interno tente mais tarde");
        }
      });
  }

  async function logar(email, password) {
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
            setUser({
              nome: resp.val().nome,
              uid: value.user.uid,
              email: resp.val().email,
            });
            gravaUser(resp.val().nome, value.user.uid, resp.val().email);
            Keyboard.dismiss();
            Toast.hide();
            Toast.showSuccess(`Login Realizado`);
          })
          .catch((error) => {
            console.log(error.code);
            Toast.hide();
            Toast.show("Erro ao Logar");
          });
      })
      .catch((error) => {
        console.log(error.code);
        Toast.hide();
        if ((error.code = "auth/wrong-password")) {
          Toast.show("Login ou senha inválidos");
        } else {
          Toast.show("Erro interno tente mais tarde");
        }
      });
  }

  async function logout() {
    Toast.showLoading("Verificando Dados");

    await firebase.auth().signOut();
    await AsyncStorage.clear()
      .then(() => {
        setUser(null);
        Toast.hide();
        Toast.showSuccess("Deslgoado com sucesso!");
      })
      .error(() => {
        console.log(error);
        Toast.hide();
        Toast.show("Erro ao desLogar");
      });
  }

  async function gravaUser(nome, uid, email) {
    await AsyncStorage.setItem("uid", uid);
    await AsyncStorage.setItem("nome", nome);
    await AsyncStorage.setItem("email", email);
  }

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#ffd700" />
      </View>
    );
  }

  return (
    <AuthContext.Provider
      value={{ signed: !!user, user, cadastrar, logar, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
