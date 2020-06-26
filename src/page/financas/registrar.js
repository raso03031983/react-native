import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-community/async-storage";
import Picker from "../../component/Picker";
import Toast from "react-native-tiny-toast";
import firebase from "../../Config/firebase";
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

export default function financas() {
  const [formData, setFormData] = useState({});
  const [logado, setLogado] = useState({});
  const [tipo, setTipo] = useState({});
  const [selectTipo, setSelectTipo] = useState([
    { label: "Receita", value: "receita", color: "#222" },
    { label: "Despesa", value: "despesa", color: "#222" },
  ]);

  useEffect(() => {
    getUser();
  }, []);

  async function getUser() {
    const storageUser = await AsyncStorage.getItem("uid");
    const storageNome = await AsyncStorage.getItem("nome");
    setLogado({ ...logado, uid: storageUser, nome: storageNome });
  }

  useEffect(() => {
    console.log(tipo);
  }, [tipo]);

  const handleRegistrar = () => {
    Keyboard.dismiss(); //fecha o teclado
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
        valor: parseFloat(formData),
        date: format(new Date(), "dd/MM/yy"),
      })
      .then(() => {
        Toast.hide();
        Toast.showSuccess("Transação Realizada !");
      })
      .error(() => {
        Toast.hide();
        Toast.show("Erro ao realizara transação");
      });
  }

  return (
    <View>
      <Header />
      <SafeAreaView>
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
