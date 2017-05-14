<template>
  <div class="profile">
    <h1>{{ msg }}</h1>
    <form @submit.prevent="validateBeforeSubmit">
      <div class="column is-12">
          <p class="control has-icon has-icon-right">
              <label>Name</label>
              <input name="name" v-model="metadata.name" v-validate="'alpha'" :class="{'input': true, 'is-danger': errors.has('name') }" type="text" placeholder="Name">
              <i v-show="errors.has('name')" class="fa fa-warning"></i>
              <span v-show="errors.has('name')" class="help is-danger">{{ errors.first('name') }}</span>
          </p>
      </div>
      <div class="column is-12">
          <p class="control has-icon has-icon-right">
              <label>Phone</label>
              <input name="phone" v-model="metadata.phone" v-validate="'numeric'" :class="{'input': true, 'is-danger': errors.has('phone') }" type="text" placeholder="Phone">
              <i v-show="errors.has('phone')" class="fa fa-warning"></i>
              <span v-show="errors.has('phone')" class="help is-danger">{{ errors.first('phone') }}</span>
          </p>
      </div>
      <div class="column is-12">
          <p class="control">
              <button class="btn is-primary" type="submit" @click="save()" :disabled="errors.errors.length > 0" >Submit</button>
          </p>
      </div>
    </form>
  </div>
</template>

<script>

export default {
  name: 'profile',
  data () {
    return {
      msg: 'Profile',
      endpoint: 'https://' + process.env.AUTH0.domain +
                '/api/v2/users/' + localStorage.getItem('user_id'),
      metadata: JSON.parse(localStorage.getItem('user_metadata'))
    }
  },
  methods: {
    // Make a secure call to the server by attaching
    // the user's JWT as an Authorization header
    save () {
      var jwtHeader = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('id_token')
      }

      console.log(jwtHeader)
      this.$http.patch(this.endpoint, {user_metadata: this.metadata}, {headers: jwtHeader}).then(
        response => {
        // success callback
          localStorage.setItem('user_metadata', JSON.stringify(response.body.user_metadata))
        }, response => {
        // error callback
        console.log(response)
      })
    },
    validateBeforeSubmit () {
      this.$validator.validateAll().then(() => { this.save() })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
