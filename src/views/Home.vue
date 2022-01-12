<template>
    <div>
        <navigation color="dark" :flat="flat"/>
        <home-section/>
        <about-section/>
        <advantages-section/>
        <how-it-works-section/>
        <footer-section/>
        <v-scale-transition>
            <v-btn
                fab
                v-show="fab"
                v-scroll="onScroll"
                dark fixed bottom
                right color="blue darken-2"
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
import HowItWorksSection from "@/components/landing/HowItWorksSection.vue"
import FooterSection from "@/components/landing/FooterSection.vue"

export default {
    name: 'Home',
    components: {
        Navigation,
        HomeSection,
        AboutSection,
        "advantages-section": AdvantagesSection,
        "how-it-works-section": HowItWorksSection,
        FooterSection,
    },
    data: () => ({
        fab: null,
        flat: true
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
