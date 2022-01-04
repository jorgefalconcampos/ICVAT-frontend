<template>
  <v-app>
     <!-- <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        />
      </div>

      <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        <span class="mr-2">Latest Release</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>  -->

    <NavBar/>
    
    <v-main>
      <transition name="fade" mode="out-in">
        <router-view/>
      </transition>
    </v-main>
  </v-app>
</template>


<style lang="scss">

.small-txt {
  font-size: 0.85em;
  font-weight: 400;
}

.big-title{
  font-size: 2.25em;
  font-weight: 800;
}

p {
  font-size: 1.15em;
  font-weight: 400;
}

.border15{
  border-radius: 15px;
}

.border10{
  border-radius: 10px;
}

.border10-left{
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
}

.border10-right{
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
}

.border5{
  border-radius: 5px;
}


.bgblue {
  background: #3494E6;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #EC6EAD, #3494E6);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #EC6EAD, #3494E6); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
 * {
  font-family: "Work Sans";
  font-weight: 400;
 }

 .glass{
   background: rgba(255, 255, 255, 0.116);
   box-shadow: 0 8px 32px 0 rgba(44, 45, 53, 0.37);
   backdrop-filter: blur( 4px );
   -webkit-backdrop-filter: blur( 4px );
  //  border: 2px solid rgba( 255, 255, 255, 0.18 );
 }

 

</style>

<script>

import NavBar from '@/components/NavBar.vue'

export default {
  name: 'App',
  components : {
    NavBar
  },

  data: () => ({
    //
  }),
};
</script>
