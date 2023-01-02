import { store } from "quasar/wrappers";
import { createStore } from "vuex";
import auth from "./auth";
import users from "./users";
import account from "./account";
import company from "./company";
import s1 from "./s1";
import asc_user from "./asc_user";
import admin_api from "./admin_api";
import sessions from "./sessions";

// import example from './module-example'

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default store(function (/* { ssrContext } */) {
  const Store = createStore({
    modules: {
      // example
      auth,
      users,
      account,
      company,
      s1,
      asc_user,
      admin_api,
      sessions,
    },

    // enable strict mode (adds overhead!)
    // for dev mode and --debug builds only
    strict: process.env.DEBUGGING,
  });

  return Store;
});
