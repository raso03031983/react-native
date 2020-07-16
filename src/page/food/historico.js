import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Icons from "react-native-vector-icons/MaterialIcons";

export default function food() {
  return (
    <View>
      <Text>Historico</Text>
      <TouchableOpacity
        onPress={() => {
          {
            console.log("123456");
          }
        }}
        style={styles.btnClose}
      >
        <Text style={styles.txtClose}>Adicionar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  containerCount: {
    flexDirection: "row",
    justifyContent: "center",
  },
  popup: {
    backgroundColor: "white",
    marginTop: 80,
    marginHorizontal: 20,
    borderRadius: 7,
  },
  popupOverlay: {
    backgroundColor: "#00000057",
    flex: 1,
    marginTop: 30,
  },
  popupContent: {
    //alignItems: 'center',
    margin: 5,
    height: 250,
  },
  popupHeader: {
    marginBottom: 45,
  },
  popupButtons: {
    marginTop: 15,
    flexDirection: "row",
    borderTopWidth: 1,
    borderColor: "#eee",
    justifyContent: "center",
  },
  popupButton: {
    flex: 1,
    marginVertical: 16,
  },
  btnClose: {
    height: 20,
    backgroundColor: "#00BFFF",
    padding: 20,
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  modalInfo: {
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 99,
    height: 90,
    //borderRadius: 45,
  },
  name: {
    fontSize: 22,
    flex: 1,
    alignSelf: "center",
    color: "#00BFFF",
    fontWeight: "bold",
  },
  position: {
    fontSize: 18,
    flex: 1,
    alignSelf: "center",
    color: "#696969",
  },
  about: {
    marginHorizontal: 10,
    fontSize: 15,
  },
  txtClose: {
    fontWeight: "bold",
  },
});
