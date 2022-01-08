<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/documents">Documents</router-link> |
    <span v-if="isLoggedIn">
      <a @click="logout">Logout</a>
    </span>
    <span v-else>
      <router-link to="/register">Register</router-link> |
      <router-link to="/login">Login</router-link>
    </span>
    <p v-if="isLoggedIn">
      {{userData.email}} | {{userData.user}}
    </p>
  </div>
</template>
<script>
export default {
  name: 'NavBar',
  computed : {
      isLoggedIn: function() { return this.$store.getters.isAuthenticated },
      userData: function() { return this.$store.getters.userInfo }
    },
    methods: {
      async logout (){
        await this.$store.dispatch('LogOut')
        this.$router.push('/login')
      }
    },
}
</script>

<style>
#nav {
  padding: 30px;
}
#nav a {
  font-weight: bold;
  color: #2c3e50;
}
a:hover {
  cursor: pointer;
}
#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
