import * as React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  Dimensions,
} from "react-native";

var { height, width } = Dimensions.get("window");

function CategoriaList(props) {
  return (
    <View>
      <TouchableOpacity
        onPress={() => props.handleCategoria()}
        style={[styles.categorias, { backgroundColor: props.data.color }]}
      >
        <Image
          style={styles.Image}
          resizeMode="contain"
          source={{ uri: props.data.image }}
        />
        <Text style={styles.titulo}>{props.data.name}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  Image: {
    width: 100,
    height: 80,
  },
  titulo: {
    fontWeight: "bold",
    fontSize: 22,
  },
  categorias: {
    backgroundColor: "red",
    margin: 5,
    alignItems: "center",
    borderRadius: 10,
    padding: 10,
  },
});

export default CategoriaList;
