import React, { useState, useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ActionFood from "./action.food";
import Swiper from "react-native-swiper";

import {
  Text,
  FlatList,
  Image,
  StyleSheet,
  Dimensions,
  View,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";

import CategoriaList from "./categoriaList";
import FoodList from "./foodList";
import ModalItem from "./modalPedidoItem";

var { height, width } = Dimensions.get("window");

export default function food({ navigation }) {
  const { ListBannerCategoria = [], nwstate } = useSelector(
    (state) => state.Food
  );
  const [itemBanner, setItemBanner] = useState([]);
  const [itemCategory, setItemCategory] = useState([]);
  const [itemFood, setItemFood] = useState([]);
  const [modal, setModal] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(ActionFood.getBannerCategoria());
  }, []);

  useEffect(() => {
    if (nwstate == "FETCHED") {
      let banner = ListBannerCategoria.banner;
      let category = ListBannerCategoria.categories;
      let food = ListBannerCategoria.food;

      setItemBanner({ ...itemBanner, banner });
      setItemCategory({ ...itemCategory, category });
      setItemFood({ ...itemFood, food });
    }
  }, [ListBannerCategoria]);

  function handleCategoria(categoria) {
    let food = ListBannerCategoria.food.filter(
      (item) => item.categorie == categoria
    );
    setItemFood({ ...itemFood, food });
  }

  const handleClickOpenModal = (item) => {
    setModal(
      <ModalItem
        open={true}
        itens={item}
        onClose={
          <TouchableOpacity
            onPress={() => {
              handleClickCloseModal();
            }}
            style={styles.btnClose}
          >
            <Text style={styles.txtClose}>Fechar</Text>
          </TouchableOpacity>
        }
      />
    );
  };
  const handleClickCloseModal = () => {
    setModal(null);
  };

  if (itemBanner.banner) {
    return (
      <>
        <ScrollView>
          <View style={styles.container}>
            {modal}
            <View style={styles.conatinerImg}>
              <Swiper
                style={{ height: width / 2 }}
                showsButtons={false}
                autoplay={true}
                autoplayTimeout={2}
              >
                {itemBanner.banner.map((itembann) => {
                  return (
                    <Image
                      style={styles.imageBanner}
                      resizeMode="contain"
                      source={{ uri: itembann }}
                    />
                  );
                })}
              </Swiper>
            </View>
          </View>
          <View style={styles.conatinerCategory}>
            <FlatList
              horizontal={true}
              data={itemCategory.category}
              renderItem={({ item, index }) => (
                <CategoriaList
                  data={item}
                  index={index}
                  handleCategoria={() => handleCategoria(item.id)}
                />
              )}
            />

            <FlatList
              data={itemFood.food}
              numColumns={2}
              renderItem={({ item, index }) => (
                <FoodList
                  data={item}
                  index={index}
                  handleAddFood={() => handleClickOpenModal(item)}
                />
              )}
            />
          </View>
        </ScrollView>
      </>
    );
  } else {
    return (
      <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
        <ActivityIndicator color="#ffd700" size={40} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },
  conatinerImg: {
    width: width,
    alignItems: "center",
  },
  conatinerCategory: {
    width: width,
    borderRadius: 20,
    paddingVertical: 20,
    backgroundColor: "white",
  },
  imageBanner: {
    height: width / 2,
    width: width - 20,
    borderRadius: 10,
    marginHorizontal: 10,
    marginTop: 5,
  },
  btnClose: {
    height: 20,
    backgroundColor: "#00BFFF",
    padding: 20,
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  txtClose: {
    fontWeight: "bold",
  },
});
