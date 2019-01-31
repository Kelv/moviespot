export const UPDATE_AUTH = (state, auth) => {
  state.auth = auth
}

export const UPDATE_USER = (state, user) => {
  state.user = user
}

export const UPDATE_MOVIES = (state, movies) => {
  state.movies = movies
}

export const UPDATE_RENTALS = (state, rentals) => {
  state.rentals = rentals
}

export const UPDATE_CLIENTS = (state, clients) => {
  state.clients = clients
}

export const CLEAR_ALL_DATA = (state) => {
  state.auth.isLoggedIn = false
  state.auth.access = null
  state.auth.refresh = null
}
