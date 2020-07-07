import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-community/async-storage";
import firebase from "../../Config/firebase";
import { View, StyleSheet, Text, SafeAreaView, FlatList } from "react-native";
import { format } from "date-fns";
import MovimentacaoItem from "./movimentacaoItem";

export default function financas() {
  const [logado, setLogado] = useState({});
  const [saldo, setSaldo] = useState(0);
  const [historico, setHistorico] = useState([]);

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    getSaldo();
    getHistorico();
  }, [logado]);

  async function getUser() {
    const storageUser = await AsyncStorage.getItem("uid");
    const storageNome = await AsyncStorage.getItem("nome");
    setLogado({ ...logado, uid: storageUser, nome: storageNome });
  }

  async function getSaldo() {
    await firebase
      .database()
      .ref("usuarios")
      .child(logado.uid)
      .on("value", (snapshot) => {
        setSaldo(snapshot.val().saldo);
      });
  }

  async function getHistorico() {
    await firebase
      .database()
      .ref("historico")
      .child(logado.uid)
      .orderByChild("date")
      .on("value", (snapchot) => {
        setHistorico([]);

        snapchot.forEach((item) => {
          let list = {
            key: item.key,
            tipo: item.val().tipo,
            valor: item.val().valor,
            desc: item.val().descricao,
            date: item.val().date,
            user: logado.uid,
          };
          setHistorico((oldArray) => [...oldArray, list].reverse());
        });
      });
  }

  return (
    <View>
      <SafeAreaView>
        <Text style={styles.texto}>
          Olá {logado.nome} seu saldo é de{" "}
          {saldo.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")}
        </Text>
        <FlatList
          data={historico}
          renderItem={({ item }) => <MovimentacaoItem param={item} />}
          keyExtractor={(item) => item.key}
        />
      </SafeAreaView>
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
    marginBottom: 15,
  },
  input: {
    margin: 5,
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
