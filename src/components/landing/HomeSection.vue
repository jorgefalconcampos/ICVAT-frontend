<template>
    <section id="hero">
        <v-parallax dark src="@/assets/img/bgHero.jpg" height="750">
            <v-row align="center" justify="center" id="hero">
                <v-col cols="10">
                    <v-row align="center" justify="center">
                        <v-col cols="12" md="6" xl="8">
                            <h1 class="display-2 font-weight-bold mb-8">VAT, un asistente virtual que te ayuda a estudiar</h1>
                            <h1 class="font-weight-light">VAT es el primer asistente virtual que te ayuda a estudiar y retener más información en tu cabeza</h1>
                            <v-btn 
                            class="mt-6 pink"
                            rounded outlined
                            large dark
                            @click="$vuetify.goTo('#benefits')">
                            Saber más
                            <v-icon class="ml-2">mdi-arrow-down</v-icon>
                            </v-btn>
                        </v-col>
                        <v-col cols="12" md="6" xl="4" class="hidden-sm-and-down"> </v-col>
                    </v-row>
                </v-col>
            </v-row>
            <div class="svg-border-waves text-white">
                <v-img src="@/assets/img/borderWaves.svg" />
            </div>
        </v-parallax>
        <v-container fluid id="benefits">
            <v-row align="center" justify="center">
                <v-col cols="10">
                    <v-row align="center" justify="space-around" class="my-10">
                        <v-col
                            cols="12"
                            sm="12"
                            md=""
                            lg="4"
                            class="text-center"
                            v-for="(feature, i) in features"
                            :key="i">
                            <v-hover v-slot:default="{ hover }">
                                <v-card
                                    class="card py-5 px-3"
                                    shaped
                                    :elevation="hover ? 10 : 4"
                                    :class="{ up: hover }">
                                    <v-img
                                        :src="feature.img"
                                        max-width="100px"
                                        class="d-block ml-auto mr-auto"
                                        :class="{ 'zoom-efect': hover }">
                                    </v-img>
                                    <h1 class="font-weight-bold">{{ feature.title }}</h1>
                                    <h4 class="font-weight-regular mx-4">{{ feature.text }}</h4>
                                </v-card>
                            </v-hover>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
        </v-container>
        
        <div class="svg-border-waves">
            <img src="~@/assets/img/wave2.svg" />
        </div>
    </section>
</template>

<script>
export default {
    data() {
        return {
            features: [
                {
                    img: require("@/assets/img/icon2.png"),
                    title: "Aprende hablando",
                    text: "Está comprobado que hablando en voz alta, tu cerebro aprende mejor y retiene por más tiempo la información a comparación de una forma escrita.",
                },
                {
                    img: require("@/assets/img/icon3.png"),
                    title: "Creatividad a flote",
                    text: "Solemos tener más creatividad con las palabras que con el texto. Solo déjate llevar por las palabras y aprende más y mejor mientras lo dictas.",
                },
                {
                    img: require("@/assets/img/icon1.png"),
                    title: "Datos seguros",
                    text: "Tu voz se envía a través de API's robustas a un servicio en la nube y es procesada en tiempo real. Nunca se almacenan copias de tu voz.",
                },
            ],
        };
    },
};
</script>

<style lang="scss" scoped>

section {
  position: relative;
}

#hero {
  z-index: 0;
}

.svg-border-waves .v-image {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 3rem;
  width: 100%;
  overflow: hidden;
}

.svg-border-waves img {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  margin-bottom: -2px;
  z-index: -1;
}

.card {
  min-height: 300px;
  padding: 10px;
  transition: 0.5s ease-out;
}

.card .v-image {
  margin-bottom: 15px;
  transition: 0.75s;
}

.card h1 {
  margin-bottom: 10px;
}

.zoom-efect {
  transform: scale(1.1);
}

.up {
  transform: translateY(-10px);
  transition: 0.13s linear;
}
</style>
