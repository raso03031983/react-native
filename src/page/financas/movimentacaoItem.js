import React, { useEffect } from "react";
import { format, isPast } from "date-fns";
import Toast from "react-native-tiny-toast";
import firebase from "../../Config/firebase";
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";

export default function movimentacaoItem(props) {
  useEffect(() => {}, []);

  function handleDelete(param) {
    if (isPast(new Date(param.date))) {
      Toast.show("Não é permitido excluir registros antigos");
    }
    Alert.alert(
      "Confirmação !!",
      `Voçê deseja excluir o registro ${param.desc}`,
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Confirmar",
          onPress: () => handleConfirnDelete(param),
        },
      ]
    );
  }

  async function handleConfirnDelete(param) {
    Toast.showLoading("Verificando Dados");
    try {
      await firebase
        .database()
        .ref("historico")
        .child(param.user)
        .child(param.key)
        .remove();

      let userBD = firebase
        .database()
        .ref("usuarios")
        .child(param.user);

      await userBD.once("value").then((snapchot) => {
        let saldo = parseFloat(snapchot.val().saldo);

        //devolvendo valores ao excluir
        param.tipo == "despesa"
          ? (saldo += parseFloat(param.valor))
          : (saldo -= parseFloat(param.valor));

        userBD.child("saldo").set(saldo);

        Toast.hide();
        Toast.showSuccess("Transação Realizada !");
      });
    } catch (error) {
      Toast.show("Erro na transação");
    }
  }

  return (
    <TouchableWithoutFeedback onLongPress={() => handleDelete(props.param)}>
      <View style={styles.container}>
        <View style={styles.desc}>
          <Text style={styles.font}>{props.param.desc}</Text>
        </View>
        <View style={styles.subDesc}>
          <Text
            style={[
              styles.text,
              props.param.tipo == "receita" ? styles.tipoGreen : styles.tipoRed,
            ]}
          >
            {props.param.tipo}
          </Text>
          <Text style={styles.font2}>{props.param.valor}</Text>
          <Text style={styles.font2}>{props.param.date}</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 5,
  },
  font: {
    fontSize: 20,
    fontWeight: "bold",
  },
  font2: {
    fontSize: 20,
  },
  desc: {
    textAlign: "center",
    justifyContent: "center",
    flexDirection: "row",
    marginBottom: 10,
    fontSize: 25,
    backgroundColor: "#ffd700",
    fontWeight: "bold",
    padding: 4,
    borderRadius: 10,
  },
  descView: {
    flexDirection: "row",
  },
  subDesc: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  tipoGreen: {
    color: "white",
    backgroundColor: "green",
    fontWeight: "bold",
    fontSize: 20,
    borderRadius: 5,
    padding: 3,
  },
  tipoRed: {
    color: "white",
    backgroundColor: "red",
    fontWeight: "bold",
    fontSize: 20,
    borderRadius: 5,
    padding: 3,
  },
});
