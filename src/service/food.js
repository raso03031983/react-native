import axios from "axios";

export async function getBannerCategoria() {
  return axios.get("http://tutofox.com/foodapp/api.json");
}

export default {
  getBannerCategoria,
};
