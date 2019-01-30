import Vue from 'vue'
import store from '@/store'
import router from '@/router'

export default {
  install(Vue, options) {
    Vue.prototype.$auth = this
    Vue.http.interceptors.push((request, next) => {
      const token = store.state.auth.access
      let needsAuth = request.url !== 'login/refresh/' || request.url !== 'login/'
      const hasAuthHeader = request.headers.has('Authorization')

      if (needsAuth) {
        if (token && !hasAuthHeader) {
          this.setAuthHeader(request)
        }
      }

      next((response) => {
        if (needsAuth) {
          if (this._isInvalidToken(response)) {
            return this._refreshToken(request)
          }
        }
      })
    })
  },
  logout() {
    store.commit('CLEAR_ALL_DATA')
    router.push('/login')
  },
  setAuthHeader(request) {
    request.headers.set('Authorization', 'Bearer ' + store.state.auth.access)
  },
  _refreshToken(request) {
    store
      .dispatch('refreshToken')
      .then(response => {
        this._storeToken(response.data)
        this._retry(request)
      })
      .catch(error => {
        console.log(error)
      })
  },
  _retry(request) {
    this.setAuthHeader(request)

    return Vue.http(request)
      .then((response) => {
        return response
      })
      .catch((response) => {
        return response
      })
  },
  _storeToken(data) {
    const auth = store.state.auth

    auth.isLoggedIn = true
    auth.access = data.access

    store.commit('UPDATE_AUTH', auth)
  },
  _isInvalidToken(response) {
    const status = response.status

    return (status === 401)
  }
}
