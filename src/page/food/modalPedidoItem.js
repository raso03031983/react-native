import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-community/async-storage";
import Toast from "react-native-tiny-toast";
import Icons from "react-native-vector-icons/MaterialIcons";
import {
  View,
  StyleSheet,
  Modal,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";

function ArticleModal(props) {
  const [visible, setVisible] = React.useState(false);
  const [qtd, setQtd] = useState(0);
  let arrayItens = [];

  useEffect(() => {
    setVisible(props.open);
    carregaPedido();
  }, []);

  useEffect(() => {
    carregaPedido();
  }, [arrayItens]);

  async function carregaPedido() {
    await AsyncStorage.getItem("itemPedido")
      .then((cart) => {
        if (cart !== null) {
          const cartfood = JSON.parse(cart);

          cartfood.map((item) => {
            let data = {
              name: item.name,
              price: item.price,
              categorie: item.categorie,
              image: item.image,
              qtd: item.qtd,
            };
            arrayItens.push(data);
          });
        }
      })
      .catch((err) => {
        alert(err);
        console.warn(err);
      });
  }

  async function storageCarrinho() {
    try {
      addCarrinho();
      await AsyncStorage.setItem("itemPedido", JSON.stringify(arrayItens));
    } catch (error) {
      console.log(error);
      Toast.show("Erro ao Adicionar Item");
    }
  }

  function addCarrinho() {
    if (qtd == 0) {
      Toast.show("Adicione Quantidade");
      return;
    }

    let data = {
      name: props.itens.name,
      price: props.itens.price,
      categorie: props.itens.categorie,
      image: props.itens.image,
      qtd: qtd,
    };

    arrayItens.push(data);
  }

  return (
    <Modal
      animationType={"fade"}
      transparent={true}
      onRequestClose={props.onClose}
      visible={visible}
    >
      <View style={styles.popupOverlay}>
        <View style={styles.popup}>
          <View style={styles.popupContent}>
            <ScrollView contentContainerStyle={styles.modalInfo}>
              <Image style={styles.image} source={{ uri: props.itens.image }} />
              <Text style={styles.name}>{props.itens.name}</Text>
              <Text style={styles.position}>{props.itens.price}</Text>
              <Text style={styles.about}>
                blá blá blá blá blá blá blá blá blá blá blá blá blá blá blá blá
                blá blá blá blá blá blá blá blá blá blá blá blá blá blá blá blá
                blá blá blá blá blá blá blá blá blá blá blá blá blá blá blá blá
                blá blá blá blá blá blá blá blá blá blá blá blá blá blá blá blá
                blá blá
              </Text>
            </ScrollView>
            <View style={styles.containerCount}>
              <TouchableOpacity>
                <Icons
                  name="add-circle"
                  size={30}
                  color={"#ffd700"}
                  onPress={() => {
                    setQtd(qtd + 1);
                  }}
                />
              </TouchableOpacity>
              <Text
                style={{
                  paddingHorizontal: 8,
                  fontWeight: "bold",
                  fontSize: 20,
                }}
              >
                {qtd}
              </Text>
              <TouchableOpacity>
                <Icons
                  name="remove-circle"
                  size={30}
                  color={"#ffd700"}
                  onPress={() => {
                    if (qtd > 0) {
                      setQtd(qtd - 1);
                    }
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.popupButtons}>
            <TouchableOpacity
              onPress={() => {
                {
                  storageCarrinho();
                }
              }}
              style={styles.btnClose}
            >
              <Text style={styles.txtClose}>Adicionar</Text>
            </TouchableOpacity>

            {props.onClose}
          </View>
        </View>
      </View>
    </Modal>
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

export default ArticleModal;
