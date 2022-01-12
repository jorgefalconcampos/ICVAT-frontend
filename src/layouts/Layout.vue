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
// import NavBar from "./navbar/NavBar.vue";
import Sidebar from "./sidebar/SideBar.vue";

import { mapState, mapMutations } from "vuex";

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
  computed: {
    ...mapState(["Customizer_drawer"])
  },

  methods: {
    ...mapMutations({
      setCustomizerDrawer: "SET_CUSTOMIZER_DRAWER"
    })
  }
};
</script>
