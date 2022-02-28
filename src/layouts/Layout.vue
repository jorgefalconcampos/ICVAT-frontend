<template>
  <v-app id="">
    <Header v-model="expandOnHover"></Header>
    <Sidebar :expand-on-hover.sync="expandOnHover"></Sidebar>
    <v-main>
      <v-container class="" fluid>
        <router-view />
      </v-container>
    </v-main>

  </v-app>
</template>

<script>

import Sidebar from "./sidebar/SideBar.vue";
import Header from "./header/Header.vue"
import { mapState, mapMutations } from "vuex" ;

export default {
  name: "Layout",
  components: {
    Header,
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
