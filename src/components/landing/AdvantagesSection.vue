<template>
    <div>
        <div class="clear-bg">
            <svg
                class="mb-n2"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1440 190"
                preserveAspectRatio="none"
                fill="white">
                <path d="M0,64L80,90.7C160,117,320,171,480,181.3C640,192,800,160,960,138.7C1120,117,1280,107,1360,101.3L1440,96L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
            </svg>
        </div>
        
        <v-container fluid class="white" id="comp">
            <v-row align="center" justify="center">
                <v-col cols="10">
                    <v-row justify="center">
                        <v-col cols="12"  >
                            <h1 class="font-weight-bold display-2 pt-5 my-5">Comparación rápida</h1>
                            <h2 class="font-weight-light display-1">Estudiando sin VAT vs estudiando con VAT</h2>
                            
                            <v-row justify="center mt-8">
                                <v-col cols="12" md="6">
                                    <v-card
                                        class="mx text-center"
                                        color="red lighten-"
                                        dark
                                        max-width="1000">
                                        <v-card-text>
                                        <p>Calificaciones semestrales</p>
                                        <v-sheet color="rgba(0, 0, 0, .12)">
                                            <p class="pt-2 overline">{{this.without.values}}</p>
                                            <v-sparkline
                                                :labels="this.without.labels"
                                                :value="this.without.values"
                                                color="rgba(255, 255, 255, .7)"
                                                height="100"
                                                padding="15"
                                                stroke-linecap="round"
                                                smooth>
                                                <h1>
                                                    Holi
                                                </h1>
                                            </v-sparkline>
                                        </v-sheet>
                                        </v-card-text>

                                        <v-card-text>
                                            <div class="text-h4 font-weight-thin">Estudiando sin VAT</div>
                                            <div class="text-h6 font-weight-bold">Promedio general: {{avg_without}} </div>
                                        </v-card-text>
                                        <v-divider></v-divider>
                                    </v-card>
                                </v-col>
                                <v-col cols="12" md="6">
                                    <v-card
                                        class="mx-auto text-center"
                                        color="green"
                                        dark
                                        max-width="1000">
                                        <v-card-text>
                                        <p>Calificaciones semestrales</p>
                                        <v-sheet color="rgba(0, 0, 0, .12)">
                                            <p class="pt-2 overline">{{this.with.values}}</p>
                                            <v-sparkline
                                                :labels="this.with.labels"
                                                :value="this.with.values"
                                                color="rgba(255, 255, 255, .7)"
                                                height="100"
                                                padding="20"
                                                stroke-linecap="round"
                                                smooth>
                                            </v-sparkline>
                                        </v-sheet>
                                        </v-card-text>

                                        <v-card-text>
                                            <div class="text-h4 font-weight-thin">Estudiando con VAT</div>
                                            <div class="text-h6 font-weight-bold">Promedio general: {{avg_with}} </div>
                                        </v-card-text>
                                        <v-divider></v-divider>
                                    </v-card>
                                </v-col>
                            </v-row>

                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
        </v-container>   

        <svg
            class="mb-n2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 250"
            preserveAspectRatio="none"
            fill="#f4f7f5">
            <path d="M0,128L48,144C96,160,192,192,288,181.3C384,171,480,117,576,106.7C672,96,768,128,864,133.3C960,139,1056,117,1152,96C1248,75,1344,53,1392,42.7L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
    </div>
</template>

<style>
.clear-bg {
    background-color: #f4f7f5;
}
</style>

<script>

export default {

    computed: {
        avg_without: function() {
            const sum = this.without.values.reduce(function (acum, next) { return acum + next; }, 0)
            return (sum / this.without.values.length).toFixed(2);
        },

        avg_with: function() {
            const sum = this.with.values.reduce(function (acum, next) { return acum + next; }, 0)
            return (sum / this.with.values.length).toFixed(2);
        },
    },

    data: () => ({
        with: {
            labels: [
                "1ero", 
                "2do",
                "3ro",
                "4to",
                "5to",
                "6to",
                "7to",
                "8vo",
            ],
            values: [
                8.80,
                9.30,
                9.20,
                9.40,
                9.70,  
                9.40,  
                9.60,
                9.30, 
            ],
        },

        without: {
            labels: [
                "1ero", 
                "2do",
                "3ro",
                "4to",
                "5to",
                "6to",
                "7to",
                "8vo",
            ],
            values: [
                7.00,
                7.30,
                7.40,
                6.80,
                7.00,  
                6.70,  
                6.90,
                6.60, 
            ],
        },
    }),
  }
</script>