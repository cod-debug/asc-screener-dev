const { LocalStorage, Notify } = require("quasar");
import axios from "axios";

let prefix = "/api/v1";
let token = localStorage.getItem('token') || '';
const headers = {
  'Content-Type': 'application/json; charset=utf-8',
  'Authorization': `Bearer ${token.replace('__q_strn|', '')}`
}

const config = {
  API_BASE_URL: window?.appConfig?.API_BASE_URL || process.env.API_BASE_URL
}

export function getEnv(name) {
  return config[name];
}

export const getS1Applications = async ({ commit }, payload) => {
  let res = {};
  try {
      res = await axios({
      method: "post",
      url: `${getEnv('API_BASE_URL')}${prefix}/screener/get-applications/`,
      data: payload.data,
      params: payload.params,
      headers: headers,
      })
  } catch (e) {
      console.log(e);
      res.data = e.response.data
      res.status = e.response.status
  }
  return res
}

export const verifyApp = async ({ commit }, payload) => {
    let res = {};
    try {
        res = await axios({
          method: "put",
          url: `${getEnv('API_BASE_URL')}${prefix}/screener/verify-applications/${payload.id}`,
          data: payload.data,
          headers: headers,
        });
    } catch (e) {
        console.log(e);
        res.data = e.response.data
        res.status = e.response.status
    }
    return res;
}

export const updateApp = async ({ commit }, payload) => {
    let res = {};
    try {
        res = await axios({
        method: "post",
        url: `${getEnv('API_BASE_URL')}${prefix}/screener/update-applications/${payload.id}`,
        data: payload.data,
        headers: headers,
        })
    } catch (e) {
        console.log(e);
        res.data = e.response.data
        res.status = e.response.status
    }
    return res;
}

export const passToReviewer = async ({ commit }, payload) => {
    let res = {};
    try {
        res = await axios({
        method: "put",
        url: `${getEnv('API_BASE_URL')}${prefix}/screener/screened-applications/${payload.id}`,
        data: payload.data,
        headers: headers,
        })
    } catch (e) {
        console.log(e);
        res.data = e.response.data
        res.status = e.response.status
    }
    return res;
}