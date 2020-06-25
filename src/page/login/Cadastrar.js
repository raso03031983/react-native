import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  TouchableHighlight,
  ActivityIndicator,
} from 'react-native';
import firebase from '../../Config/firebase';
import Header from '../../component/Header';

console.disableYellowBox = true;

export default function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nome, setNome] = useState('');
  const [user, setUser] = useState('');
  const [refreshing, setRefreshing] = React.useState(false);

  async function logar() {
    await firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(value => {
        alert('Bem-vindo: ' + value.user.email);
        setUser(value.user.email);
      })
      .catch(error => {
        alert('Ops algo deu errado!');
        return;
      });

    setEmail('');
    setPassword('');
  }

  async function logout() {
    await firebase.auth().signOut();
    setUser('');
    alert('Deslgoado com sucesso!');
  }

  async function cadastrar() {
    console.log(email, password);
    await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(value => {
        firebase
          .database()
          .ref('usuarios')
          .child(value.user.uid)
          .set({
            nome: nome,
          });
        setEmail('');
        setNome('');
        setPassword('');
        alert(`Cadastro Realizado ${value.user.email}`);
      })
      .catch(error => {
        alert(`Erro: ${error}`);
      });
  }

  return (
    <View>
      <Header />
      <Text style={styles.texto}>Nome</Text>
      <TextInput
        style={styles.input}
        underlineColorAndroid="transparent"
        onChangeText={texto => setNome(texto)}
        value={nome}
      />

      <Text style={styles.texto}>Email</Text>
      <TextInput
        style={styles.input}
        underlineColorAndroid="transparent"
        onChangeText={texto => setEmail(texto)}
        value={email}
      />

      <Text style={styles.texto}>Senha</Text>
      <TextInput
        style={styles.input}
        underlineColorAndroid="transparent"
        onChangeText={texto => setPassword(texto)}
        value={password}
        secureTextEntry
      />

      <TouchableHighlight onPress={cadastrar}>
        <Text style={styles.btn}>Cadastrar</Text>
      </TouchableHighlight>
    </View>
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
    borderColor: '#121212',
    height: 45,
    fontSize: 17,
  },
  btn: {
    marginLeft: 5,
    marginRight: 5,
    fontSize: 25,
    textAlign: 'center',
    backgroundColor: '#ffd700',
    padding: 5,
  },
});
