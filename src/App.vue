<template>
  <div id="app">
    <nav class="navbar navbar-default">
     <div class="container">
       <ul class="nav navbar-nav">
         <li><router-link to="/">Home</router-link></li>
         <li><a v-if="!authenticated" @click="login()">Login</a></li>
         <li><router-link to="profile" v-if="authenticated">Profile</router-link></li>
         <li><a v-if="authenticated" @click="logout()">Logout</a></li>
       </ul>
     </div>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
import Auth0Lock from 'auth0-lock'
import Vue from 'vue'
export default {
  name: 'app',
  data () {
    return {
      authenticated: false,
      lock: new Auth0Lock(process.env.AUTH0.client_id, process.env.AUTH0.domain)
    }
  },
  // Check the user's auth status when the app
  // loads to account for page refreshing
  mounted () {
    var self = this
    Vue.nextTick(function () {
      self.authenticated = self.$check_auth()
      self.lock.on('authenticated', (authResult) => {
        console.log('authenticated')
        localStorage.setItem('id_token', authResult.idToken)
        self.lock.getProfile(authResult.idToken, (error, profile) => {
          if (error) {
            // Handle error
            return
          }
          // Set the token and user profile in local storage
          localStorage.setItem('profile', JSON.stringify(profile))
          localStorage.setItem('user_id', profile.user_id)
          self.authenticated = true
          self.$router.push('/profile')
        })
      })
      self.lock.on('authorization_error', (error) => {
        // handle error when authorizaton fails
        console.log(error)
        self.$router.push('/')
      })
    })
  },
  methods: {
    login () {
      this.lock.show()
    },
    logout () {
      // To log out, we just need to remove the token and profile
      // from local storage
      localStorage.removeItem('id_token')
      this.authenticated = false
      this.$router.push('/')
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
