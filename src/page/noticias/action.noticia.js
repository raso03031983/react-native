import noticiaService from '../../service/noticias';

export function getGeral() {
  return async dispatch => {
    dispatch({type: 'FETCH_GERAL'});
    try {
      const get = await noticiaService.getGeral();
      dispatch({type: 'FETCH_GERAL_FULFILLED', payload: get.data});
    } catch (error) {
      dispatch({type: 'FETCH_GERAL_REJECTED', payload: error});
    }
  };
}

export function getAtualidades() {
  return async dispatch => {
    dispatch({type: 'FETCH_ATUALIDADES'});
    try {
      const get = await noticiaService.getAtualidades();
      dispatch({type: 'FETCH_ATUALIDADES_FULFILLED', payload: get.data});
    } catch (error) {
      dispatch({type: 'FETCH_ATUALIDADES_REJECTED', payload: error});
    }
  };
}

export function getEsportes() {
  return async dispatch => {
    dispatch({type: 'FETCH_SPORTS'});
    try {
      const get = await noticiaService.getEsportes();
      dispatch({type: 'FETCH_SPORTS_FULFILLED', payload: get.data});
    } catch (error) {
      dispatch({type: 'FETCH_SPORTS_REJECTED', payload: error});
    }
  };
}

export function getTech() {
  return async dispatch => {
    dispatch({type: 'FETCH_TECH'});
    try {
      const get = await noticiaService.getTech();
      dispatch({type: 'FETCH_TECH_FULFILLED', payload: get.data});
    } catch (error) {
      dispatch({type: 'FETCH_TECH_REJECTED', payload: error});
    }
  };
}

export function getEntretenimento() {
  return async dispatch => {
    dispatch({type: 'FETCH_ENTRETENIMENTO'});
    console.log('Aqui');
    try {
      const get = await noticiaService.getEntretenimento();

      dispatch({type: 'FETCH_ENTRETENIMENTO_FULFILLED', payload: get.data});
    } catch (error) {
      dispatch({type: 'FETCH_ENTRETENIMENTO_REJECTED', payload: error});
    }
  };
}

export default {
  getGeral,
  getAtualidades,
  getEsportes,
  getTech,
  getEntretenimento,
};
