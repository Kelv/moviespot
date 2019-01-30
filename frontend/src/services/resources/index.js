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
    url: "movies"
  }
}

// Customer Actions
const ClientResourceActions = {
  getAll: {
    method: "GET",
    url: "clients"
  },
  getByEmail: {
    method: "GET",
    url: "clients{?email}"
  },
  add: {
    method: "POST",
    url: "clients"
  },
  update: {
    method: "PUT",
    url: "clients{/id}"
  }
}

const RentalResourceActions = {
  getAll: {
    method: "GET",
    url: "rentals"
  },
  create: {
    method: "POST",
    url: "rentals"
  },
  return: {
    method: "POST",
    url: "rentals{/id}/return_movie"
  }
}

export const LoginResource = Vue.resource("api/login", {}, LoginResourceActions)
export const MovieResource = Vue.resource("api/movies", {}, MovieResourceActions)
export const ClientResource = Vue.resource("api/clients", {}, ClientResourceActions)
export const RentalResource = Vue.resource("api/rentals", {}, RentalResourceActions)
