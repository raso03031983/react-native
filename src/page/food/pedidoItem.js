import React from "react";
import { View, TouchableOpacity, Image, StyleSheet, Text } from "react-native";

function pedidoItem(props) {
  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity
          style={[styles.card, { borderColor: "#00BFFF" }]}
          onPress={() => {
            props.delete();
          }}
        >
          <View style={styles.cardContent}>
            <Image
              style={[styles.image, styles.imageContent]}
              source={{ uri: props.data.image }}
            />
            <Text style={styles.name}>{props.data.name}</Text>
          </View>
          <View style={[styles.cardContent, styles.tagsContent]}>
            <Text>
              blá blá blá blá blá blá blá blá blá blá blá blá blá blá blá blá
              blá blá blá blá blá blá blá blá blá blá blá blá blá blá blá blá
              blá blá blá blá blá blá blá blá blá blá blá blá blá blá blá blá
              blá blá blá blá blá blá blá blá blá blá blá blá blá blá blá blá
              blá blá
            </Text>
          </View>
          <View style={[styles.cardContent]}>
            <Text>Preço {props.data.price}</Text>
          </View>
          <View style={[styles.cardContent]}>
            <Text>Quantidade {props.data.qtd}</Text>
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  containerSwiper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  textSwiper: {
    backgroundColor: "whitesmoke",
    padding: 20,
  },
  container: {
    flex: 1,
    backgroundColor: "#EBEBEB",
  },
  card: {
    height: null,
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 5,
    backgroundColor: "#FFFFFF",
    flexDirection: "column",
    borderTopWidth: 40,
    marginBottom: 20,
  },
  cardContent: {
    flexDirection: "row",
    marginLeft: 10,
    marginRight: 10,
  },
  cardContentDet: {
    flexDirection: "row",
    marginLeft: 10,
  },
  imageContent: {
    marginTop: -40,
  },
  tagsContent: {
    marginTop: 10,
    flexWrap: "wrap",
  },
  image: {
    width: 60,
    height: 60,
    // borderRadius: 30,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10,
    alignSelf: "center",
  },
  btnColor: {
    padding: 10,
    borderRadius: 40,
    marginHorizontal: 3,
    backgroundColor: "#eee",
    marginTop: 5,
  },
});

export default pedidoItem;
