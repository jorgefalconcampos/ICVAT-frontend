<template>

 <div>
   <home-section/>
   <about-section/>
   <advantages-section/>
   <charts-section/>
 </div>
  

  
  <!-- <hello-world /> -->
</template>

<script>
  // import HelloWorld from '../components/HelloWorld'
  import HomeSection from "@/components/landing/HomeSection.vue"
  import AboutSection from "@/components/landing/AboutSection.vue"
  import AdvantagesSection from "@/components/landing/AdvantagesSection.vue"
  import ChartsSection from "@/components/landing/ChartsSection.vue"

  export default {
    name: 'Home',

    components: {
      HomeSection,
      AboutSection,
      AdvantagesSection,
      ChartsSection,
      // HelloWorld,
    },
  }
</script>
