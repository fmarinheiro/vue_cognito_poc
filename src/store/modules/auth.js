import axios from 'axios';
import { login, logout } from '../../lib/AuthHelpers'
import jwt_decode from "jwt-decode";

const state = {
  user: null,
  email: null,
  apiTest: null,
  idToken: null,
  accessToken: null,
  refreshToken: null,
};

const getters = {
  isAuthenticated: (state) => !!state.user,
  StateApiResponse: (state) => state.apiTest,
  StateUser: (state) => state.user,
  AccessToken: (state) => state.accessToken,
  IdToken: (state) => state.idToken,
  RefreshToken: (state) => state.refreshToken,
};

const actions = {
  async LogIn({commit}, user) {
    const result = await login(user.get("username"), user.get("password"))
    await commit("setUser", result);
  },

  async LogOut({ commit }) {
    await logout()
    await commit("logout", null);
  },

  async GetApiResponse({ commit }) {
    let response = await axios.get("checkauth");
    commit("setApiResponse",
        response == undefined ? null : response.data
    );
  },
};

const mutations = {
  setUser(state, result) {
    state.accessToken = result.getAccessToken().getJwtToken()
    state.idToken = result.getIdToken().getJwtToken()
    state.refreshToken = result.getRefreshToken().getToken()

    const userDetails = jwt_decode(state.idToken)
    state.email = userDetails.email
    state.user = userDetails['cognito:username']
  },

  setApiResponse(state, result) {
    state.apiTest = result;
  },

  logout(state, user) {
    state.user = user
    state.email = null
    state.apiTest = null
    state.accessToken = null
    state.idToken = null
    state.refreshToken = null
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};