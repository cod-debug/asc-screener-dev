const { LocalStorage, Notify } = require("quasar");
import axios from "axios";

const headers = {
  'Content-Type': 'application/json; charset=utf-8',
  'Authorization': `Bearer ${localStorage.getItem('token')}` 
}

const config = {
  API_BASE_URL: window?.appConfig?.ADMIN_API_BASE_URL || process.env.ADMIN_API_BASE_URL
}

export function getEnv(name) {
  return config[name];
}

export const getAllUsers = async ({ commit }, payload) => {
  let res = await axios({
    url: `${getEnv('API_BASE_URL')}/users/all/`,
    data: payload,
    method: "get",
  })
  return res;
}


export const updateProfile = async ({ commit }, payload) => {
  let res = {};
  try {
      res = await axios({
      method: "post",
      url: `${getEnv('API_BASE_URL')}/users/update/`,
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

export const updatePassword = async ({ commit }, payload) => {
  let res = {};
  try {
      res = await axios({
      method: "post",
      url: `${getEnv('API_BASE_URL')}/users/update/password/`,
      data: payload,
      headers: headers,
      })
  } catch (e) {
      console.log(e);
      res.data = e.response.data
      res.status = e.response.status
  }
  return res
}

export const updateESign = async ({ commit }, payload) => {
  let res = {};
  try {
      res = await axios({
      method: "post",
      url: `${getEnv('API_BASE_URL')}/users/upload/`,
      data: payload,
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${localStorage.getItem('token')}` 
      },
      })
  } catch (e) {
      console.log(e);
      res.data = e.response.data
      res.status = e.response.status
  }
  return res
}

