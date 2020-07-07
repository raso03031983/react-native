import React from "react";
import {
  View,
  StyleSheet,
  Modal,
  Text,
  TextInput,
  ScrollView,
  Linking,
  TouchableHighlight,
} from "react-native";

function modalEditar(props) {
  const [visible, setVisible] = React.useState(false);
  const [nome, setNome] = useState("");

  React.useEffect(() => {
    setVisible(props.open);
  }, []);

  const handleEditar = () => {
    alert(123);
  };

  return (
    <Modal animationType={"slide"} transparent={false} visible={visible}>
      <ScrollView>
        <View style={styles.header}>{props.onClose}</View>
      </ScrollView>
    </Modal>
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
    marginBottom: 10,
    marginLeft: 5,
    marginRight: 5,
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
    borderRadius: 30,
  },
});

export default modalEditar;
