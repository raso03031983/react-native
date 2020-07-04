import * as React from "react";
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
} from "react-native";

import CategoriaList from "./categoriaList";
import FoodList from "./foodList";

var { height, width } = Dimensions.get("window");

export default function food() {
  const { ListBannerCategoria = [], nwstate } = useSelector(
    (state) => state.Food
  );
  const [itemBanner, setItemBanner] = React.useState([]);
  const [itemCategory, setItemCategory] = React.useState([]);
  const [itemFood, setItemFood] = React.useState([]);
  const [selectCat, setSelectCat] = React.useState(0);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(ActionFood.getBannerCategoria());
  }, []);

  React.useEffect(() => {
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

  if (itemBanner.banner) {
    return (
      <>
        <ScrollView>
          <View style={styles.container}>
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
                  handleAddFood={() => {
                    alert(item.id);
                  }}
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
});
