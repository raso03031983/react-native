const defaultState = {
  ListGeral: [],
  ListAtualidades: [],
  ListSports: [],
  ListTech: [],
  ListEntretenimento: [],
  noticia: {},
  nwstate: '',
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
    case 'FETCH_GERAL': {
      return {
        ...state,
        modulo: action.payload,
        nwstate: 'FETCHING',
      };
    }

    case 'FETCH_GERAL_FULFILLED': {
      return {
        ...state,
        nwstate: 'FETCHED',
        ListGeral: action.payload,
      };
    }

    case 'FETCH_GERAL_REJECTED': {
      return {
        ...state,
        nwstate: 'REJECTED',
        error: action.payload,
      };
    }

    case 'FETCH_ATUALIDADES': {
      return {
        ...state,
        modulo: action.payload,
        nwstate: 'FETCHING',
      };
    }

    case 'FETCH_ATUALIDADES_FULFILLED': {
      return {
        ...state,
        nwstate: 'FETCHED',
        ListAtualidades: action.payload,
      };
    }

    case 'FETCH_ATUALIDADES_REJECTED': {
      return {
        ...state,
        nwstate: 'REJECTED',
        error: action.payload,
      };
    }

    case 'FETCH_SPORTS': {
      return {
        ...state,
        modulo: action.payload,
        nwstate: 'FETCHING',
      };
    }

    case 'FETCH_SPORTS_FULFILLED': {
      return {
        ...state,
        nwstate: 'FETCHED',
        ListSports: action.payload,
      };
    }

    case 'FETCH_SPORTS_REJECTED': {
      return {
        ...state,
        nwstate: 'REJECTED',
        error: action.payload,
      };
    }

    case 'FETCH_TECH': {
      return {
        ...state,
        modulo: action.payload,
        nwstate: 'FETCHING',
      };
    }

    case 'FETCH_TECH_FULFILLED': {
      return {
        ...state,
        nwstate: 'FETCHED',
        ListTech: action.payload,
      };
    }

    case 'FETCH_TECH_REJECTED': {
      return {
        ...state,
        nwstate: 'REJECTED',
        error: action.payload,
      };
    }

    case 'FETCH_ENTRETENIMENTO': {
      return {
        ...state,
        modulo: action.payload,
        nwstate: 'FETCHING',
      };
    }

    case 'FETCH_ENTRETENIMENTO_FULFILLED': {
      return {
        ...state,
        nwstate: 'FETCHED',
        ListEntretenimento: action.payload,
      };
    }

    case 'FETCH_ENTRETENIMENTO_REJECTED': {
      return {
        ...state,
        nwstate: 'REJECTED',
        error: action.payload,
      };
    }

    case 'FETCH_DONE': {
      return {
        ...state,
        nwstate: 'DONE',
      };
    }

    case 'RESET': {
      return {
        ...state,
        antena: {},
      };
    }

    case 'NOTICIAS_ERRORS_FULFILLED': {
      return {
        ...state,
        nwstate: 'ERRORS_FULFILLED',
        formError: action.payload,
      };
    }

    case 'NOTICIAS_ERRORS_RESET': {
      return {
        ...state,
        nwstate: 'ERRORS_RESET',
        formError: defaultState.formError,
      };
    }

    default: {
      return state;
    }
  }
}
