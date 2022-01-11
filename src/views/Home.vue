<template>
    <div>
        <navigation :color="color" :flat="flat" />

        <home-section/>
        <about-section/>
        <advantages-section/>
        <charts-section/>
        <v-scale-transition>
            <v-btn
                fab
                v-show="fab"
                v-scroll="onScroll"
                dark fixed bottom
                right color="primary"
                @click="toTop">
            <v-icon>mdi-arrow-up</v-icon>
            </v-btn>
        </v-scale-transition>
    </div>
</template>

<script>
import Navigation from "@/components/landing/Navigation.vue"
import HomeSection from "@/components/landing/HomeSection.vue"
import AboutSection from "@/components/landing/AboutSection.vue"
import AdvantagesSection from "@/components/landing/AdvantagesSection.vue"
import ChartsSection from "@/components/landing/ChartsSection.vue"

export default {
    name: 'Home',
    components: {
        Navigation,
        HomeSection,
        AboutSection,
        AdvantagesSection,
        ChartsSection,
    },
    data: () => ({
        fab: null,
        color: "",
        flat: null
    }),
    methods: {
        onScroll(e) {
            if (typeof window === "undefined") return;
            const top = window.pageYOffset || e.target.scrollTop || 0;
            this.fab = top > 350;
        },
        toTop() { this.$vuetify.goTo(0); },
    },
}
</script>
