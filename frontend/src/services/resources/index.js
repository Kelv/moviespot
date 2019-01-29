import Vue from "vue"
import VueResource from "vue-resource"

Vue.use(VueResource)

// Login resource
const LoginResourceActions = {
  login: {
    method: "POST",
    url: "login"
  },
  refresh: {
    method: "POST",
    url: "login/refresh"
  }
}

// User resource
const MovieResourceActions = {
  getAll: {
    method: "GET",
    url: "movies/"
  }
}

// Customer Actions
const ClientResourceActions = {
  getAll: {
    method: "GET",
    url: "clients/"
  },
  add: {
    method: "POST",
    url: "clients/"
  },
  update: {
    method: "PUT",
    url: "clients{/id}"
  }
};

export const LoginResource = Vue.resource("api/login/", {}, LoginResourceActions)
export const MovieResource = Vue.resource("api/movies/", {}, MovieResourceActions)
export const ClientResource = Vue.resource("api/clients/", {}, ClientResourceActions)
