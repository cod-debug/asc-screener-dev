const { LocalStorage, Notify } = require("quasar");
import axios from "axios";

const config = {
  API_BASE_URL: window?.appConfig?.API_BASE_URL || process.env.API_BASE_URL
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
