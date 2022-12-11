const { LocalStorage, Notify } = require("quasar");
import axios from "axios";

const headers = {
  'Content-Type': 'application/json; charset=utf-8',
  'Authorization': `Bearer ${localStorage.getItem('token')}` 
}
// window?.appConfig ?

const config = {
  API_BASE_URL: window?.appConfig?.API_BASE_URL || process.env.API_BASE_URL
}

export function getEnv(name) {
  return config[name];
}

export const getAllCompanies = async ({ commit }, payload) => {
  let res = await axios({
    method: "get",
    url: `${getEnv("API_BASE_URL")}/company/getall/`,
    params: payload,
    headers: headers,
  })
  return res;
}

export const addCompany = async ({ commit }, payload) => {
  let res = await axios({
    method: "post",
    url: `${getEnv("API_BASE_URL")}/company/create/`,
    data: payload,
    headers: headers,
  })
  return res;
}


export const getAllAffiliation = async ({ commit }, payload) => {
  let res = null;
  try {
    res = await axios({
      url: `${getEnv("API_BASE_URL")}/affiliate/getall/`,
      params: payload,
      method: "get",
      headers: headers,
    })
  } catch (e) {
    res.data = e
    res.status = 400
  }
  return res;
}
