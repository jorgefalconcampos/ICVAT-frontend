<template>
    <v-app id="materialpro" :class="`${!$vuetify.breakpoint.smAndDown ? 'full-sidebar' : 'mini-sidebar'}`">
      <transition name="fade" mode="out-in">
        <router-view/>
      </transition>
      <SnackBar ref="snackBar"/>
    </v-app>
</template>


<style lang="scss">

a {
  color: #ffff !important;
  font-weight: 500;
  text-decoration: none;
}

.a-default {
  a {
    color: #3494E6 !important;
    text-decoration: underline;
    cursor: auto;
  }
}

.clickable {
  cursor: pointer;
}


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
  border-radius: 15px !important;
}

.border10{
  border-radius: 10px;
}

.border10-top{
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

.border10-left{
  border-top-left-radius: 13px;
  border-bottom-left-radius: 13px;
}

.border10-right{
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
}

.border5{
  border-radius: 5px;
}

.switch-center {
  display: flex !important;
  justify-content: center !important;
}

.bgblue {
  background: #3494E6;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #ec6ec6, #3494E6);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #ec6ec6, #3494E6); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
 * {
  font-family: "Work Sans";
  font-weight: 400;
 }

 .glass{
   z-index: 99;
   background: rgba(255, 255, 255, 0.116) !important;
   box-shadow: 0 8px 32px 0 rgba(44, 45, 53, 0.37) !important;
   backdrop-filter: blur( 20px ) !important;
  //  backdrop-filter: blur( 4px ) !important;
   -webkit-backdrop-filter: blur( 4px ) !important; 
  //  border: 2px solid rgba( 255, 255, 255, 0.18 );
 }

 .glass-white-border{
   background: rgba(255, 255, 255, 0.116) !important;
   box-shadow: 0 8px 32px 0 rgba(44, 45, 53, 0.37) !important;
   backdrop-filter: blur( 4px ) !important;
   border: 2px solid white;
   border-radius: 13px !important;
   -webkit-backdrop-filter: blur( 4px ) !important; 
 }

  .glass-sm{
   z-index: 99;
   background: rgba(255, 255, 255, 0.116) !important;
   box-shadow: 0 4px 16px 0 rgba(44, 45, 53, 0.37) !important;
   backdrop-filter: blur( 20px ) !important;
  //  backdrop-filter: blur( 4px ) !important;
   -webkit-backdrop-filter: blur( 4px ) !important; 
  //  border: 2px solid rgba( 255, 255, 255, 0.18 );
 }

  .v-btn:hover:before {
    opacity: 0 !important;
  }

  .v-btn:focus::before { opacity: 0 !important; }

 

</style>

<script>

import SnackBar from '@/components/partials/SnackBar.vue'

export default {
    name: 'App',
    mounted() {
        this.$root.snackBar = this.$refs.snackBar
        },    
    components: {
        SnackBar
    },
    data: () => ({
        //
    }),
};
</script>
