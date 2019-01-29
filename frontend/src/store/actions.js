import LoginService from '../services/login-service'

import router from '@/router'
import { MovieResource } from '../services/resources';

export const login = ({ commit, state }, credentials) => {
  return LoginService.login(credentials).then(response => {
    const data = response.data

    var auth = state.auth

    auth.access = data.access;
    auth.refresh = data.refresh;
    auth.isLoggedIn = true;

    commit("UPDATE_AUTH", auth);
  })
};

export const requestMovies = ({ commit, state }) => {
  return MovieResource.getAll()
}
