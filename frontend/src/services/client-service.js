import {
  ClientResource
} from '../services/resources'

export default {
  getAll(){
    return ClientResource.getAll()
  },
  getByEmail(email) {
    return ClientResource.getByEmail({email:email})
  }
}
