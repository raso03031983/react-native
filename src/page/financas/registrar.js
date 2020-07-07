import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-community/async-storage";
import Picker from "../../component/Picker";
import Toast from "react-native-tiny-toast";
import firebase from "../../Config/firebase";
import { useNavigation } from "@react-navigation/native";
import { format } from "date-fns";

import {
  View,
  TouchableHighlight,
  StyleSheet,
  TextInput,
  SafeAreaView,
  Text,
  Keyboard,
  Alert,
} from "react-native";

import Header from "../../component/Header";

export default function financas(props) {
  const [formData, setFormData] = useState({});
  const [desc, setDesc] = useState({});
  const [logado, setLogado] = useState({});
  const [tipo, setTipo] = useState({});
  const navigation = useNavigation();
  const [selectTipo, setSelectTipo] = useState([
    { label: "Receita", value: "receita", color: "#222" },
    { label: "Despesa", value: "despesa", color: "#222" },
  ]);

  useEffect(() => {
    getUser();
  }, []);

  const verificaLogin = () => {
    if (!logado.uid) {
      Alert.alert(
        "Confirmação !!",
        "É necessário fazer Login para registrar uma transação ",
        [
          {
            text: "Cancelar",
            style: "cancel",
          },
          {
            text: "Fazer Login",
            onPress: () => navigation.navigate("Login"),
          },
        ]
      );
      return false;
    }
  };

  async function getUser() {
    const storageUser = await AsyncStorage.getItem("uid");
    const storageNome = await AsyncStorage.getItem("nome");
    setLogado({ ...logado, uid: storageUser, nome: storageNome });
  }

  const handleRegistrar = () => {
    Keyboard.dismiss(); //fecha o teclado
    if (verificaLogin() == false) {
      return false;
    }
    if (isNaN(parseFloat(formData)) || tipo === null) {
      Toast.show("Todos os Campos são Obrigatórios");
      return;
    }

    Alert.alert(
      "Confirmação !!",
      `Tipo: ${tipo} Valor: ${parseFloat(formData)}`,
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Continuar",
          onPress: () => handleAdd(),
        },
      ]
    );
  };

  async function handleAdd() {
    Toast.showLoading("Verificando Dados");

    let key = firebase
      .database()
      .ref("historico")
      .child(logado.uid)
      .push().key;

    await firebase
      .database()
      .ref("historico")
      .child(logado.uid)
      .child(key)
      .set({
        tipo: tipo,
        valor: formatCurrency(parseFloat(formData)),
        date: format(new Date(), "dd/MM/yy"),
        descricao: !desc ? "sem descrição" : desc,
      });

    let userBD = firebase
      .database()
      .ref("usuarios")
      .child(logado.uid);

    await userBD.once("value").then((snapchot) => {
      let saldo = parseFloat(snapchot.val().saldo);

      tipo == "despesa"
        ? (saldo -= parseFloat(formData))
        : (saldo += parseFloat(formData));

      userBD.child("saldo").set(saldo);

      setFormData("");
      setDesc("");
      Toast.hide();
      Toast.showSuccess("Transação Realizada !");
    });
  }

  const formatCurrency = (amount) => {
    return Number(amount)
      .toFixed(2)
      .replace(/\d(?=(\d{3})+\.)/g, "$&,");
  };

  return (
    <View>
      <SafeAreaView>
        <Text style={styles.texto}>Descrição</Text>
        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          onChangeText={(texto) => setDesc(texto)}
          value={desc}
        />

        <Text style={styles.texto}>Valor</Text>
        <TextInput
          keyboardType="numeric"
          style={styles.input}
          underlineColorAndroid="transparent"
          onChangeText={(texto) => setFormData(texto)}
          value={formData}
        />

        <Text style={styles.texto}>Tipo de Registro</Text>
        <Picker onChange={setTipo} itensSelect={selectTipo} />

        <View style={{ marginTop: 10 }}>
          <TouchableHighlight onPress={handleRegistrar}>
            <Text style={styles.btn}>Registrar</Text>
          </TouchableHighlight>
        </View>
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
