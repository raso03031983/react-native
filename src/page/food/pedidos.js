import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList, Text } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import PedidoItem from "./pedidoItem";

export default function food({ navigation }) {
  const [pedido, setPedido] = useState([]);

  useEffect(() => {
    navigation.addListener("focus", () => {
      carregaPedido();
    });
  }, [navigation]);

  async function carregaPedido() {
    await AsyncStorage.getItem("itemPedido")
      .then((cart) => {
        if (cart !== null) {
          // We have data!!
          const cartfood = JSON.parse(cart);
          setPedido(cartfood);
        }
      })
      .catch((err) => {
        alert(err);
        console.warn(err);
      });
  }

  const handleDelete = (name) => {
    let newCart = pedido.filter((item) => item.name != name);
    setPedido(newCart);
    storageCarrinho(newCart);
  };

  async function storageCarrinho(newCart) {
    try {
      await AsyncStorage.setItem("itemPedido", JSON.stringify(newCart));
    } catch (error) {
      console.log(error);
      Toast.show("Erro ao Adicionar Item");
    }
  }

  return (
    <View>
      {pedido.length > 0 && (
        <FlatList
          data={pedido}
          renderItem={({ item, index }) => (
            <PedidoItem
              data={item}
              index={index}
              delete={() => handleDelete(item.name)}
            />
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  btn: {
    marginLeft: 5,
    marginRight: 5,
    fontSize: 25,
    textAlign: "center",
    backgroundColor: "#00BFFF",
    padding: 5,
    borderRadius: 30,
    top: 30,
  },
});
