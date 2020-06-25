import axios from 'axios';

export async function getGeral() {
  return axios.get(
    'http://newsapi.org/v2/top-headlines?country=br&category=general&apiKey=cdcc6debda9c435aadfdd827fe2ab97a',
  );
}

export async function getAtualidades() {
  return axios.get(
    'http://newsapi.org/v2/top-headlines?country=br&category=business&apiKey=cdcc6debda9c435aadfdd827fe2ab97a',
  );
}

export async function getEsportes() {
  return axios.get(
    'http://newsapi.org/v2/top-headlines?country=br&category=sports&apiKey=cdcc6debda9c435aadfdd827fe2ab97a',
  );
}

export async function getTech() {
  return axios.get(
    'http://newsapi.org/v2/top-headlines?country=br&category=technology&apiKey=cdcc6debda9c435aadfdd827fe2ab97a',
  );
}

export async function getEntretenimento() {
  return axios.get(
    'http://newsapi.org/v2/top-headlines?country=br&category=entertainment&apiKey=cdcc6debda9c435aadfdd827fe2ab97a',
  );
}

export default {
  getGeral,
  getAtualidades,
  getEsportes,
  getTech,
  getEntretenimento,
};
