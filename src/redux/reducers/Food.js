const defaultState = {
  ListBannerCategoria: [],
  bannerCategoria: {},
  default: {},
  nwstate: "",
  error: null,
  formError: {
    hasError: false,
    fields: {},
  },
  formOptions: {
    perfis: [],
  },
};

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case "FETCH_BANNER_CATEGORIA": {
      return {
        ...state,
        ListBannerCategoria: action.payload,
        nwstate: "FETCHING",
      };
    }

    case "FETCH_BANNER_CATEGORIA_FULFILLED": {
      return {
        ...state,
        nwstate: "FETCHED",
        ListBannerCategoria: action.payload,
      };
    }

    case "FETCH_BANNER_CATEGORIA_REJECTED": {
      return {
        ...state,
        nwstate: "REJECTED",
        error: action.payload,
      };
    }

    case "RESET": {
      return {
        ...state,
        default: {},
      };
    }

    case "NOTICIAS_ERRORS_FULFILLED": {
      return {
        ...state,
        nwstate: "ERRORS_FULFILLED",
        formError: action.payload,
      };
    }

    case "NOTICIAS_ERRORS_RESET": {
      return {
        ...state,
        nwstate: "ERRORS_RESET",
        formError: defaultState.formError,
      };
    }

    default: {
      return state;
    }
  }
}
