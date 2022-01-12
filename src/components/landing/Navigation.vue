<template>
    <div class="abs">
        <v-navigation-drawer
            v-model="drawer"
            app temporary dark
            src="@/assets/img/bgDrawer.jpg">
            <v-list>
                <v-list-item>
                    <v-list-item-avatar>
                        <img src="@/assets/img/logo.png" alt="Logo" />
                    </v-list-item-avatar>
                    <v-list-item-content>
                        <v-list-item-title class="title">ICVAT</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
            <v-divider/>
            <v-list>
                <v-list-item
                    v-for="([icon, text, link], i) in items" :key="i" 
                    link @click="$vuetify.goTo(link)">
                    <v-list-item-icon class="justify-center">
                        <v-icon>{{ icon }}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title class="subtitile-1">{{text}}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                 <v-list-item @click="$router.push('/login/')">
                    <v-list-item-icon class="justify-center">
                        <v-icon>mdi-login</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title class="subtitile-1">Iniciar app</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>

        <v-app-bar
            app :color="color"
            :flat="flat"
            dark class="px-15 grey darken-4"
            :class="{ expand: flat }">
            
            <v-toolbar-title>
                <v-img src="@/assets/img/logo.png" max-width="50px"/>
            </v-toolbar-title>
            
            <v-spacer/>

            <v-app-bar-nav-icon v-if="isXs"
                @click.stop="drawer = !drawer"
                class="mr-4"
            />
            
            <div v-else>
                <v-btn text @click="$vuetify.goTo('#hero')">
                    <span class="mr-2">Inicio</span>
                </v-btn>
                
                <v-btn text @click="$vuetify.goTo('#benefits')">
                    <span class="mr-2">Acerca de</span>
                </v-btn>

                <v-btn text @click="$vuetify.goTo('#comp')">
                    <span class="mr-2">Comparación</span>
                </v-btn>

                <v-btn text @click="$vuetify.goTo('#howitworks')">
                    <span class="mr-2">Cómo funciona</span>
                </v-btn>                 
                
                <router-link to="/documents/" class="red">
                    <v-btn rounded outlined text>Documents</v-btn>
                </router-link>   
                
                <router-link to="/register/" class="red">
                    <v-btn rounded outlined text>Registrar</v-btn>
                </router-link> 

                <router-link to="/login/" class="mainNav">
                    <v-btn class="blue darken-1" rounded outlined text large>Iniciar</v-btn>
                </router-link>   

            </div>
        </v-app-bar>
    </div>
</template>

<style scoped>

.mainNav {
    text-decoration: none !important;
}

.v-toolbar {
  transition: 0.6s;
}

.expand {
  height: 80px !important;
  padding-top: 10px;
}
</style>

<script>
export default {
    data: () => ({
        drawer: null,
        isXs: false,
        items: [
            ["mdi-home-outline", "Inicio", "#hero"],
            ["mdi-information-outline", "Acerca de", "#benefits"],
            ["mdi-scale-unbalanced", "Comparación", "#comp"],
            ["mdi-cog", "Cómo funciona", "#howitworks"],
        ],
    }),
    props: {
        color: String,
        flat: Boolean,
    },
    methods: {
        onResize() { this.isXs = window.innerWidth < 850; },
    },
    watch: {
        isXs(value) {
            if (!value) {
                if (this.drawer) { this.drawer = false; }
            }
        },
    },
    mounted() {
        this.onResize();
        window.addEventListener("resize", this.onResize, { passive: true });
    },
};
</script>
