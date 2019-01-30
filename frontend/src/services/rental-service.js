import {
  RentalResource
} from './resources'

export default {
  getAll() {
    return RentalResource.getAll()
  },
  create(rental) {
    return RentalResource.create(rental)
  },
  return(rentalId) {
    return RentalResource.return({id:rentalId})
  }
}
