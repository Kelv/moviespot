import LoginService from '../services/login-service'
import MovieService from '../services/movie-service'
import ClientService from '../services/client-service'
import RentalService from '../services/rental-service'

export const login = ({ commit, state }, credentials) => {
  return LoginService.login(credentials).then(response => {
    const data = response.data

    var auth = state.auth

    auth.access = data.access
    auth.refresh = data.refresh
    auth.isLoggedIn = true

    commit('UPDATE_AUTH', auth)
  })
}

export const refreshToken = ({ commit, state }) => {
  const token = state.auth.refresh;
  return LoginService.refresh(token)
}

export const requestMovies = ({ commit, state }) => {
  return MovieService.getAll().then(movies => commit('UPDATE_MOVIES', movies.data))
}

export const requestClients = ({ commit, state }) => {
  return ClientService.getAll().then(clients => commit('UPDATE_CLIENTS', clients.data))
}

export const requestRentals = ({ commit, state }) => {
  return RentalService.getAll().then(rentals => commit('UPDATE_RENTALS', rentals.data))
}

export const createRental = ({ commit, state }, rental) => {
  return RentalService.create(rental)
}

export const returnRental = ({ commit, state }, rentalId) => {
  return RentalService.return(rentalId)
}
