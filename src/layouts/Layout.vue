<template>
  <v-app id="inspire">
    <!-- <NavBar v-model="expandOnHover"></NavBar> -->
    <Sidebar :expand-on-hover.sync="expandOnHover"></Sidebar>
    <v-main>
      <v-container class="">
        <router-view />
      </v-container>
    </v-main>

  </v-app>
</template>

<script>
import Sidebar from "./sidebar/SideBar.vue";


export default {
  name: "Layout",
  components: {
    // NavBar,
    Sidebar,
  },

  props: {
    source: String
  },
  data: () => ({
    expandOnHover: false
  }),

  methods: {
  }
};
</script>
