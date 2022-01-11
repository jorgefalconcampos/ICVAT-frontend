<template>
    <div>
        <div class="svg-border-waves text-white">
            <v-img src="~@/assets/img/borderWavesBlue.svg"/>
        </div>
        <v-footer dark padless>
            <v-card flat tile class="colorBlue white--text text-center">
                <v-card-text class="white--text pt-5">Hecho con ❤️ en el Instituto Politécnico Nacional</v-card-text>
                <v-divider></v-divider>
                <v-card-text >{{ new Date().getFullYear() }} | <strong>ICVAT </strong>team</v-card-text>
            </v-card>
        </v-footer>  
    </div>
</template>

<style scoped>
.v-card {
  width: 100%;
}
.colorBlue{
    background-color: #171B34;
}
.svg-border-waves .v-image {
  background-color: #f4f7f5;
  position: relative;
  bottom: 0;
  left: 0;
  height: 7rem;
  width: 100%;
  overflow: hidden;
}
</style>

<script>
export default {
  data: () => ({
  }),
};
</script>
