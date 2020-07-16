import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";

function endereco() {
  const [formData, setFormData] = useState({});

  const handleRegistrar = () => {};

  return (
    <View>
      <View style={{ marginTop: 10 }}>
        <TouchableOpacity onPress={handleRegistrar}>
          <Text style={styles.btn}>Localização Atual</Text>
        </TouchableOpacity>

        <Text style={styles.texto}>Bairro</Text>
        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          onChangeText={(texto) => setFormData(texto)}
          value={formData.Bairro}
        />
        <Text style={styles.texto}>Endereço</Text>
        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          onChangeText={(texto) => setFormData(texto)}
          value={formData.Endereco}
        />
        <Text style={styles.texto}>CEP</Text>
        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          onChangeText={(texto) => setFormData(texto)}
          value={formData.Cep}
        />
        <Text style={styles.texto}>N°</Text>
        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          onChangeText={(texto) => setFormData(texto)}
          value={formData.Num}
        />
        <Text style={styles.texto}>Complemento</Text>
        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          onChangeText={(texto) => setFormData(texto)}
          value={formData.Complemento}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  btn: {
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 10,
    fontSize: 25,
    textAlign: "center",
    backgroundColor: "#ffd700",
    padding: 5,
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
});

export default endereco;
