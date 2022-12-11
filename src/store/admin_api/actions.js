const { LocalStorage, Notify } = require("quasar");
import axios from "axios";

let prefix = "/api/v1";
let token = localStorage.getItem('token') || '';
const headers = {
  'Content-Type': 'application/json; charset=utf-8',
  'Authorization': `Bearer ${token.replace('__q_strn|', '')}`
}

const config = {
    ADMIN_API_BASE_URL: window?.appConfig?.ADMIN_API_BASE_URL || process.env.ADMIN_API_BASE_URL
}

export function getEnv(name) {
  return config[name];
}

export const getAllUsers = async ({ commit }, payload) => {
  let res = {};
  try {
      res = await axios({
      method: "get",
      url: `${getEnv('ADMIN_API_BASE_URL')}/users/getall/`,
      params: payload,
      headers: headers,
      })
  } catch (e) {
      console.log(e);
      res.data = e.response.data
      res.status = e.response.status
  }
  return res
}

export const getAllExecutionTypes = async ({ commit }, payload) => {
  let res = {};
  try {
      res = await axios({
      method: "get",
      url: `${getEnv('ADMIN_API_BASE_URL')}/execution-type/getall/`,
      params: payload,
      headers: headers,
      })
  } catch (e) {
      console.log(e);
      res.data = e.response.data
      res.status = e.response.status
  }
  return res
}

export const getAllMediums = async ({ commit }, payload) => {
  let res = {};
  try {
      res = await axios({
      method: "get",
      url: `${getEnv('ADMIN_API_BASE_URL')}/medium-type/getall/`,
      params: payload,
      headers: headers,
      })
  } catch (e) {
      console.log(e);
      res.data = e.response.data
      res.status = e.response.status
  }
  return res
}

export const getAllDialects = async ({ commit }, payload) => {
  let res = {};
  try {
      res = await axios({
      method: "get",
      url: `${getEnv('ADMIN_API_BASE_URL')}/dialect/getall/`,
      params: payload,
      headers: headers,
      })
  } catch (e) {
      console.log(e);
      res.data = e.response.data
      res.status = e.response.status
  }
  return res
}

export const getSpecificAffiliation = async ({ commit }, payload) => {
  let res = {};
  try {
      res = await axios({
      method: "get",
      url: `${getEnv('ADMIN_API_BASE_URL')}/affiliate/getone/`,
      params: payload,
      headers: headers,
      })
  } catch (e) {
      console.log(e);
      res.data = e.response.data
      res.status = e.response.status
  }
  return res
}