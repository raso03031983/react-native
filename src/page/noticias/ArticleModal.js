import React from 'react';
import {
  View,
  StyleSheet,
  Modal,
  Text,
  Image,
  ScrollView,
  Linking,
  Button,
} from 'react-native';

function ArticleModal(props) {
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    setVisible(props.open);
  }, []);

  return (
    <Modal animationType={'slide'} transparent={false} visible={visible}>
      <ScrollView>
        <View style={styles.header}>{props.onClose}</View>
        <View style={styles.areaFeed}>
          <View style={styles.viewPerfil}>
            <Text style={styles.nomeUsuario}> {props.itens.title} </Text>
          </View>

          <Image
            resizeMode="cover"
            style={styles.fotoPublicacao}
            source={{uri: props.itens.urlToImage}}
          />
          <View style={styles.viewRodape}>
            <Text style={styles.nomeRodape}>{props.itens.source.name}</Text>
            <Text style={styles.descRodape}>{props.itens.author}</Text>
          </View>
          <View style={styles.viewPerfil}>
            <Text style={styles.nomeUsuario}> {props.itens.description} </Text>
          </View>
          <Button
            title={`Ir para ${props.itens.source.name}`}
            color="#ffd700"
            onPress={() => Linking.openURL(props.itens.url)}
          />
        </View>
      </ScrollView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {},
  header: {
    height: 55,
    backgroundColor: '#121212',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: 5,
  },
  areaFeed: {},
  nomeUsuario: {
    fontSize: 22,
    textAlign: 'left',
    color: '#000000',
  },
  fotoPerfil: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  fotoPublicacao: {
    flex: 1,
    height: 200,
    alignItems: 'center',
  },
  viewPerfil: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    padding: 8,
  },
  areaBtn: {
    flexDirection: 'row',
    padding: 5,
  },
  iconelike: {
    width: 33,
    height: 33,
  },
  btnSend: {
    paddingLeft: 5,
  },
  viewRodape: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#121212',
  },
  descRodape: {
    paddingLeft: 5,
    paddingRight: 5,
    fontSize: 15,
    color: '#ffd700',
  },
  nomeRodape: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffd700',
    paddingLeft: 5,
  },
});

export default ArticleModal;
