<template>
    <v-navigation-drawer
        dark
        color="dark"
        mobile-breakpoint="960"
        clipped
        :right="$vuetify.rtl"
        mini-variant-width="10"
        :expand-on-hover="expandOnHover"
        app
        id="main-sidebar">
        <v-list nav>
            <v-list-item>
                <v-list-item-avatar color="white" size="60">
                  <v-avatar color="blue" size="55">
                    <span class="white--text text-h5">
                      {{userData.first_name.charAt(0)}} {{userData.last_name.charAt(0)}}
                    </span>
                  </v-avatar>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-list-item-title v-bind="attrs" v-on="on">{{userData.first_name}} {{userData.last_name}}</v-list-item-title>
                    </template>
                    <span>{{userData.first_name}} {{userData.last_name}}</span>
                  </v-tooltip>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-list-item-subtitle class="caption" v-bind="attrs" v-on="on">{{userData.email}}</v-list-item-subtitle>
                    </template>
                    <span>{{userData.email}}</span>
                  </v-tooltip>
                </v-list-item-content>
            </v-list-item>
            <div v-if="isLoggedIn">
                <v-list-item
                    v-for="item in items"
                    :key="item.title"
                    :to="item.to"
                    @click="menuAction(item.action)"
                    :active-class="`primary white--text`"
                    link>
                        <v-list-item-icon>
                            <v-icon>{{ item.icon }}</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                        <v-list-item-title>{{ item.title }}</v-list-item-title>
                        </v-list-item-content>
                </v-list-item>
            </div>
        </v-list>
    </v-navigation-drawer>
</template>

<script>

export default {
  name: "Sidebar",
  
  props: {
    expandOnHover: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    items: [
      {
        title: "Inicio",
        icon: "mdi-home",
        to: "/",
        action: ""
      },
      {
        title: "Documentos",
        icon: "mdi-file-document",
        to: "/documents",
        action: ""
      },
      {
        title: "Categorías",
        icon: "mdi-shape",
        to: "/categories",
        action: ""
      },
      {
        title: "Perfil",
        icon: "mdi-account-circle",
        to: "/profile",
        action: ""
      },
      {
        title: "Ajustes",
        icon: "mdi-cog",
        to: "/settings",
        action: "",
      },
       {
        title: "Cerrar sesión",
        icon: "mdi-logout",
        to: "",
        action: "logout"
      },

      

    ]
  }),
  computed: {
    isLoggedIn: function() { return this.$store.getters.isAuthenticated },
    userData: function() { return this.$store.getters.userInfo },
  },
  watch: {
    "$vuetify.breakpoint.smAndDown"(val) {
      this.$emit("update:expandOnHover", !val);
    }
  },

  methods: {
    async logout() { await this.$store.dispatch('LogOut'); this.$router.push('/login'); },
    menuAction(action) { action === "logout" ? this.logout() : '' },
  }
};
</script>
<style lang="scss">
#main-sidebar{
  box-shadow:1px 0 20px rgba(0,0,0,.08);
  -webkit-box-shadow:1px 0 20px rgba(0,0,0,.08);
  .v-navigation-drawer__border{
    display: none;
  }
  .v-list{
    padding: 8px 15px;
  }
  .v-list-item{
      &__icon--text,
      &__icon:first-child{
        justify-content: center;
        text-align: center;
        width: 20px;
        
      }
      
  }    
}
</style>