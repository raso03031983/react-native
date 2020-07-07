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
  Image,
} from "react-native";
import Icons from "react-native-vector-icons/MaterialIcons";
export default function movimentacaoItem(props) {
  useEffect(() => {}, []);

  function handleDelete(param) {
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
    if (isPast(new Date(param.date))) {
      Toast.show("Não é permitido excluir registros antigos");
      return;
    }
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
    // <TouchableWithoutFeedback onLongPress={() => handleDelete(props.param)}>
    //   <View style={styles.container}>
    //     <View style={styles.desc}>
    //       <Text style={styles.font}>{props.param.desc}</Text>
    //     </View>
    //     <View style={styles.subDesc}>
    //       <Text
    //         style={[
    //           styles.text,
    //           props.param.tipo == "receita" ? styles.tipoGreen : styles.tipoRed,
    //         ]}
    //       >
    //         {props.param.tipo}
    //       </Text>
    //       <Text style={styles.font2}>{props.param.valor}</Text>
    //       <Text style={styles.font2}>{props.param.date}</Text>
    //     </View>
    //   </View>
    // </TouchableWithoutFeedback>
    <TouchableWithoutFeedback onLongPress={() => handleDelete(props.param)}>
      <View style={styles.notificationBox}>
        <View>
          {props.param.tipo == "receita" ? (
            <Icons name={"arrow-upward"} color={"#32CD32"} size={35} />
          ) : (
            <Icons name={"arrow-downward"} color={"#B22222"} size={35} />
          )}
        </View>
        <View>
          <Text style={styles.texto}>{props.param.desc}</Text>
          <Text style={styles.texto}>
            {props.param.valor} - {props.param.date}
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  notificationBox: {
    padding: 20,
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 5,
    marginRight: 5,
    backgroundColor: "#121212",
    flexDirection: "row",
    borderRadius: 10,
  },
  texto: {
    color: "#ffd700",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },
});
