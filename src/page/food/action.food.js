import foodService from "../../service/food";

export function getBannerCategoria() {
  return async (dispatch) => {
    dispatch({ type: "FETCH_BANNER_CATEGORIA" });
    try {
      const get = await foodService.getBannerCategoria();

      dispatch({ type: "FETCH_BANNER_CATEGORIA_FULFILLED", payload: get.data });
    } catch (error) {
      dispatch({ type: "FETCH_BANNER_CATEGORIA_REJECTED", payload: error });
    }
  };
}

export default {
  getBannerCategoria,
};
