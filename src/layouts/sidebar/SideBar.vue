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
                <v-list-item-avatar size="55">
                    <img src="https://randomuser.me/api/portraits/men/81.jpg" />
                </v-list-item-avatar>
                <v-list-item-content>
                    <v-list-item-title>{{userData.user}}</v-list-item-title>
                    <v-list-item-subtitle class="caption">{{userData.email}}</v-list-item-subtitle>
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