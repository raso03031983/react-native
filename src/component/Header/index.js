import React from "react";
import {
  View,
  StyleSheet,
  TouchableHighlight,
  StatusBar,
  Text,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icons from "react-native-vector-icons/MaterialIcons";
import { color } from "react-native-reanimated";

function Header() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#121212" barStyle="#ffd700" />
      <View style={styles.header}>
        <TouchableHighlight onPress={() => navigation.toggleDrawer()}>
          <Icons name={"menu"} color={"#ffd700"} size={35} />
        </TouchableHighlight>
        <Text style={styles.title}>INFO</Text>
        <TouchableHighlight onPress={() => alert(123)}>
          <Icons name={"home"} color={"#ffd700"} size={35} />
        </TouchableHighlight>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  header: {
    height: 55,
    backgroundColor: "#121212",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 5,
  },
  title: {
    color: "#ffd700",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default Header;
