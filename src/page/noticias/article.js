import React, { useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AuthContext } from "../../contexts/AuthContex";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Share,
} from "react-native";
import Icons from "react-native-vector-icons/MaterialIcons";
import ArticleModal from "./ArticleModal";
import AsyncStorage from "@react-native-community/async-storage";
import firebase from "../../Config/firebase";

function article(props) {
  const { signed } = useContext(AuthContext);
  const {
    ListGeral = [],
    ListAtualidades = [],
    ListTech = [],
    ListSports = [],
    ListEntretenimento = [],
    nwstate,
  } = useSelector((state) => state.Noticias);
  const [modal, setModal] = React.useState(null);
  let [list, setList] = React.useState([]);

  React.useEffect(() => {
    if (props.paramTabFocus == "Geral") {
      setList(ListGeral);
    } else if (props.paramTabFocus == "Esportes") {
      setList(ListSports);
    } else if (props.paramTabFocus == "Atualidades") {
      setList(ListAtualidades);
    } else if (props.paramTabFocus == "Tech") {
      setList(ListTech);
    } else if (props.paramTabFocus == "Entretenimento") {
      setList(ListEntretenimento);
    }
  }, [props.paramTabFocus]);

  const handleClickOpenModal = (index) => {
    setModal(
      <ArticleModal
        open={true}
        itens={list.articles[index]}
        onClose={
          <TouchableOpacity onPress={() => handleClickCloseModal()}>
            <Icons name={"clear"} color={"#ffd700"} size={35} />
          </TouchableOpacity>
        }
      />
    );
  };

  const handleClickCloseModal = () => {
    setModal(null);
  };

  async function hadleFavoritar() {
    getUser();
    if (logado.uid) {
      const dateTime = new Date().getTime();
      firebase
        .database()
        .ref(`favoritos/${logado.uid}/${dateTime}`)
        .set({
          author: props.data.author,
          content: props.data.content,
          description: props.data.description,
          publishedAt: props.data.publishedAt,
          sourceID: props.data.source.id,
          sourceName: props.data.source.name,
          title: props.data.title,
          url: props.data.url,
          urlToImage: props.data.urlToImage,
        })
        .then(() => {
          alert("Favoritado :)");
        })
        .catch(() => {
          alert("erro ao Favoritar :(");
        });
    } else {
      alert("não esta logado");
    }
  }

  async function hadleShared() {
    try {
      const result = await Share.share({
        message: props.data.url,
      });
    } catch (error) {
      alert("error ao fatal ao compartilhar");
    }
  }

  return (
    <View style={styles.areaFeed}>
      {modal}
      <View style={styles.viewPerfil}>
        <Text style={styles.nomeUsuario}> {props.data.title} </Text>
      </View>

      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Image
          style={styles.fotoPublicacao}
          source={{ uri: props.data.urlToImage }}
        />
      </View>

      <View style={styles.viewRodape}>
        <Text style={styles.nomeRodape}>{props.data.source.name}</Text>
        <Text style={styles.descRodape}>{props.data.author}</Text>
      </View>
      <View style={styles.areaBtn}>
        <TouchableOpacity onPress={() => handleClickOpenModal(props.index)}>
          <Icons name={"turned-in"} color={"#ffd700"} size={35} />
        </TouchableOpacity>

        {signed && (
          <TouchableOpacity onPress={() => hadleFavoritar()}>
            <Icons name={"star"} color={"#ffd700"} size={35} />
          </TouchableOpacity>
        )}

        <TouchableOpacity style={styles.btnSend} onPress={() => hadleShared()}>
          <Icons name={"share"} color={"#ffd700"} size={35} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
const width_proportion = "95%";
const styles = StyleSheet.create({
  areaFeed: {
    borderColor: "#000000",
    borderBottomWidth: 1,
    borderTopWidth: 1,
  },
  nomeUsuario: {
    fontSize: 22,
    textAlign: "left",
    color: "#000000",
  },
  fotoPerfil: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  fotoPublicacao: {
    flex: 1,
    height: 400,
    alignItems: "center",
    justifyContent: "center",
    width: width_proportion,
  },
  viewPerfil: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    padding: 8,
  },
  areaBtn: {
    flexDirection: "row",
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginLeft: 5,
    marginRight: 5,
  },
  descRodape: {
    paddingLeft: 5,
    paddingRight: 5,
    fontSize: 15,
    color: "#000",
  },
  nomeRodape: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    paddingLeft: 5,
  },
});

export default article;
