<template lang="pug">
  v-container(fluid)
    v-content
    v-layout(row, wrap)
      v-flex(xs12).mb-4
        font(size='5') MovieSpot
      v-flex(xs12)
        v-card
          v-card-title
            v-btn(@click="returnMovieDialog.active = true", outline, color="green", small, round)
              | Return
            v-dialog(v-model="returnMovieDialog.active", max-width="500px", persistent)
              v-card
                v-card-title.headline.grey.lighten-2 Return movie
                v-card-text
                  v-layout(row, wrap)
                    v-flex(xs8).pr-1
                      v-text-field(v-model="returnMovieDialog.rentsFilter")
                    v-flex(xs12)
                      v-list
                        v-list-tile(v-for='rent in filteredRentals', :key='rent.id', avatar, @click='returnMovieInfo.selectedRent = rent', :ripple='rent.status == "RENTED"')
                          v-list-tile-content
                            v-list-tile-title {{ rent.movie.title }}
                            v-list-tile-sub-title
                              span Due date: {{ rent.due_date | dateFormat }}
                              span.ml-3 Client: {{ rent.client.email }}
                          v-list-tile-action
                            v-icon(:color='isPassedDue(rent.due_date) ? "red":"green"') info

                    v-flex(xs12)
                      v-label Total: $ {{ returnMovieInfo.selectedRent ? (returnMovieInfo.selectedRent.movie.borrow_price * (isPassedDue(returnMovieInfo.selectedRent.due_date) ? 1.05 : 1)) : '' }}

                    v-flex(xs12)
                      v-divider
                v-card-actions
                  v-spacer
                  v-btn(color="blue darken-1", flat, @click="returnMovieInfo.selectedRent = null; returnMovieDialog.active = false") Close
                  v-btn(color="blue darken-1", flat, @click="returnMovie") Accept
            v-spacer
            v-text-field(v-model='search', append-icon='search', label='Search', single-line, hide-details)
          v-data-table(:headers='headers', :items='movies', :search='search')
            template(slot='items', slot-scope='props')
              td {{ props.item.title }}
              td.text-xs-center
                v-chip(v-for="genre in splitGenres(props.item.genres)") {{ genre }}
              td.text-xs-right {{ props.item.length }} min
              td.text-xs-right {{ props.item.year }}
              td.text-xs-right {{ props.item.in_stock_qty }}
              td.text-xs-right {{ '$' + props.item.borrow_price }}
              td.justify-center.text-xs-center
                v-btn(@click="rentDialogInfo.selectedMovie = props.item; rentDialog.active = true", outline, :disabled="props.item.in_stock_qty <= 0"
                      color="blue", small, round)
                  | Rent
                v-dialog(v-model="rentDialog.active", max-width="500px", persistent)
                  v-card
                    v-card-title.headline.grey.lighten-2 New rent
                    v-card-text
                      v-layout(row, wrap)
                        v-flex(xs12)
                          font(size="4") {{rentDialogInfo.selectedMovie ? rentDialogInfo.selectedMovie.title : ""}}
                        v-flex(xs8).pr-1
                          v-menu(ref='rentDialogMenu', :close-on-content-click='false', v-model='rentDialog.menu', :nudge-right='40', :return-value.sync='rentDialogInfo.due_date', lazy, transition='scale-transition', offset-y, full-width, min-width='290px')
                            v-text-field(slot='activator' v-model='rentDialogInfo.due_date' label='Select due date' prepend-icon='event' readonly)
                            v-date-picker(v-model='rentDialogInfo.due_date' no-title scrollable)
                              v-spacer
                              v-btn(flat color='primary' @click='rentDialogMenu = false') Cancel
                              v-btn(flat color='primary' @click='$refs.menu.save(rentDialogInfo.due_date)') OK
                        v-flex(xs12)
                          v-label Client

                        v-flex(xs12)
                          v-divider
                        v-flex(xs12)
                          v-form(ref="form")
                            v-layout(row, wrap)
                              v-flex(xs7).pl-1
                                v-text-field(v-model="rentDialogInfo.client.email", label="Email", :rules="[v => !!v || 'Field cannot be empty']", required)
                              v-flex(xs4).pl-1
                                v-select(v-model="rentDialogInfo.client.gender", :items="['M', 'F']" label="Gender", offset-y)
                              v-flex(xs6).pl-1
                                v-text-field(v-model="rentDialogInfo.client.first_name", label="First name", :rules="[v => !!v || 'Field cannot be empty']", required)
                              v-flex(xs6).pl-1
                                v-text-field(v-model="rentDialogInfo.client.last_name", label="Last name", :rules="[v => !!v || 'Field cannot be empty']", required)
                              v-flex(xs6).pl-1
                                v-text-field(v-model="rentDialogInfo.client.address", label="Address", :rules="[v => !!v || 'Field cannot be empty']", required)
                              v-flex(xs6).pl-1
                                v-text-field(v-model="rentDialogInfo.client.phone", label="Phone", mask='phone' :rules="[v => !!v || 'Field cannot be empty']", required)
                    v-card-actions
                      v-spacer
                      v-btn(color="blue darken-1", flat, @click="rentDialogInfo.selectedMovie = null; rentDialog.active = false") Close
                      v-btn(color="blue darken-1", flat, @click="rentMovie") Accept
            v-alert(slot='no-results', :value='true', color='error', icon='warning')
              | Your search for &quot;{{ search }}&quot; found no results.
</template>

<script>
import { mapActions, mapState } from "vuex";
import moment from 'moment'

export default {
  filters: {
    dateFormat(date){
      if(date == undefined || date == null)
        return ""
      return moment(date).format('MM-DD-YYYY')
    }
  },
  data() {
    return {
      rentDialog: {
        active: false,
        menu: null,
        emails: []
      },
      returnMovieDialog: {
        active: false,
        menu: null,
        rentsFilter: ""
      },
      returnMovieInfo: {
        movie: null,
        selectedRent: null
      },
      searchEmail: null,
      rentDialogInfo: {
        client: {},
        movie: null,
        due_date: new Date().toISOString().substr(0, 10)
      },
      selectedMovie: null,
      search: '',
      headers: [
        {
          text: 'Title',
          align: 'left',
          sortable: true,
          value: 'title'
        },
        { text: 'Genres', value: 'genres', sortable: false, align: 'center' },
        { text: 'Length', value: 'length', sortable: false },
        { text: 'Year', value: 'year', sortable: true },
        { text: 'In stock', value: 'in_stock_qty', sortable: true },
        { text: 'Rental price', value: 'borrow_price', sortable: true },
        { text: 'Actions', value: 'actions', sortable: false, align: 'center' }
      ]
    }
  },
  created(){
    this.getMovies()
    this.requestRentals()
  },
  computed: {
    ...mapState({
      movies: 'movies',
      rentals: 'rentals'
    }),
    filteredRentals(){
      return this.rentals.filter(rent => rent.movie.title.toLocaleLowerCase().includes(this.returnMovieDialog.rentsFilter.toLocaleLowerCase()))
    }
  },
  methods: {
    ...mapActions({
      getMovies: 'requestMovies',
      createRental: 'createRental',
      requestRentals: 'requestRentals',
      returnRental: 'returnRental'
    }),
    isPassedDue(date){
      return this.$moment(date).isBefore(this.$moment(Date.now()))
    },
    splitGenres(genres){
      return genres.split(/,/)
    },
    returnMovie(){
      this.returnRental(this.rentDialogInfo.selectedRent.id)
    },
    rentMovie(){
      if(!this.$refs.form.validate()){
        return
      }
      this.createRental({
          movie: this.rentDialogInfo.selectedMovie.id,
          client: {
            id: this.rentDialogInfo.client.id,
            first_name: this.rentDialogInfo.client.first_name,
            last_name: this.rentDialogInfo.client.last_name,
            gender: this.rentDialogInfo.client.gender,
            email: this.rentDialogInfo.client.email,
            address: this.rentDialogInfo.client.address,
            phone: this.rentDialogInfo.client.phone
          },
          due_date: new Date(this.$moment(this.rentDialogInfo.due_date, 'YYYY-MM-DD'))
        })
        .then(res => {
          this.rentDialogInfo.selectedMovie.in_stock_qty -= 1
          this.rentDialog.active = false
        })
        .catch(console.log)
    }
  }
}
</script>
