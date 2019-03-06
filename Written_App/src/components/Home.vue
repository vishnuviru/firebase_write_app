<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12 sm6 offset-sm3 mt-3>
        <form @submit.prevent="create">
          <v-layout column>
            <v-flex>
              <!--<v-alert type="error" dismissible v-model="alert">-->
                <!--{{ error }}-->
              <!--</v-alert>-->
            </v-flex>
			<v-flex>
              <v-text-field
                name="company"
                label="Company Name"
                id="company"
                type="text"
                v-model="company"
                required></v-text-field>
            </v-flex>
            <v-flex>
              <v-text-field
                name="location"
                label="location"
                id="location"
                type="text"
                v-model="location"
                required></v-text-field>
            </v-flex>
            <v-flex class="text-xs-center" mt-5>
              <v-btn color="primary" type="submit">Add</v-btn>
            </v-flex>
          </v-layout>
        </form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import firebase from 'firebase'
  export default {
    data () {
      return {
        company_details: [],
        location: '',
        company: '',
        fireData: null,
        editingMovie: [],
        editFormMode: [],
        alert: false
      }
    },
    computed: {
    },
    methods: {
      create () {
        this.company_details.push(this.company, this.location)
        firebase.database().ref('data').push({
          company_details: this.company_details
        })
        console.log(this.company_details)
        this.location = null
        this.company = null
      },
      editMovie (key) {
        firebase.database().ref('data/' + key).set({
          company_details: this.editingMovie[key]
        })
          .then((data) => {
            this.editingMovie[key] = null
            this.editFormMode = []
          })
      },

      deleteMovie (key) {
        firebase.database().ref('data/' + key).remove()
      },

      fetchFirebaseData () {
        firebase.database().ref('data').on('value', (snapshot) => {
          this.fireData = snapshot.val()
        })
      }
    },
    created () {
      this.fetchFirebaseData()
    },
    watch: {
    }
  }
</script>
