<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12 sm6 offset-sm3 mt-3>
        <ul>
          <li v-for="(data,key) in fireData" :key=key >
            <div>
              <h2>Company: {{data.company_details[0]}}</h2>
              <h3>Location: {{data.company_details[1]}}</h3>

              <!--<button class="btn btn-xs btn-primary" @click='editFormMode.push(key);'>Edit</button>-->
              <button class="btn btn-xs btn-danger" @click='deleteMovie(key);'>Delete</button>
              <br><br>

              <input v-if='editFormMode.includes(key)' type="text" v-model='editingMovie[key]' @keyup.enter='editMovie(key)' class="form-control">
            </div>


          </li>

        </ul>
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
        name: '',
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
        this.company_details.push(this.name, this.company)
        firebase.database().ref('data').push({
          company_details: this.company_details
        })
        console.log(this.company_details)
        // this.company_details = null
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
