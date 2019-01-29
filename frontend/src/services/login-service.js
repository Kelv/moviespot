import {
  LoginResource
} from '../services/resources'

export default {
  login(credentials) {
    return LoginResource.login(credentials)
  },
  refresh(refresh) {
    return LoginResource.refresh({
      refresh: refresh
    })
  }
}
