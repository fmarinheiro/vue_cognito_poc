import axios from 'axios';
import { login, logout} from '../../lib/AuthHelpers'
import jwt_decode from "jwt-decode";

const state = {
  user: null,
  email: null,
  idToken: null,
  refreshToken: null,
  accessToken: null,
  apiTest: null,
};

const getters = {
  isAuthenticated: (state) => !!state.user,
  StateApiResponse: (state) => state.apiTest,
  StateUser: (state) => state.user,
  AccessToken: (state) => state.accessToken,
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
    let response = await axios.get("test");
    commit("setApiResponse", response.data);
  },
};

const mutations = {
  setUser(state, result) {
    state.idToken = result.getIdToken().getJwtToken()
    state.accessToken = result.getAccessToken().getJwtToken()
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
    state.idToken = null
    state.accessToken = null
    state.refreshToken = null
    state.email = null
    state.apiTest = null
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};