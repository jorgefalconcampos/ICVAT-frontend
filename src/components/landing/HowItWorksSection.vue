<template>
    <section class="py-15 " id="howitworks">
        <v-container fluid>
            <v-row align="center" justify="center">
                <v-col cols="10">
                    <v-row justify="center">
                        <v-col cols="12">
                            <h1 class="font-weight-bold display-2 mb-5">Cómo funciona</h1>
                            <h1 class="font-weight-light display-1">Descubre la lógica detrás de VAT</h1>   
                            <div class="py-10 mx-1">
                                <v-timeline
                                    align-top :dense="$vuetify.breakpoint.smAndDown">
                                    
                                    <v-timeline-item
                                        v-for="(item, i) in items"
                                        :key="i" fill-dot
                                        :color="item.color"
                                        :icon="item.icon"
                                        >
                                        <v-card :color="item.color" dark>
                                            <v-card-title class="text-h6">{{item.title}}</v-card-title>
                                            <v-card-text class="white text--primary">
                                                <p class="pt-5 mb-3">{{item.description}}</p>
                                            </v-card-text>
                                        </v-card>
                                    </v-timeline-item>
                                </v-timeline>
                            </div>
                            <h1 class="font-weight-light text-center display-1 mt-10">Los cuatro pasos anteriores los puedes ver más a detalle en este diagrama</h1>   

                            <v-img src="@/assets/img/ill1.svg" class="d-block ml-auto mr-auto my-10" max-width="900px"/>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
        </v-container>   
    </section>
</template>


<style scoped>
.v-card {
  width: 100%;
}
#howitworks {
  background-color: #f4f7f5;
}
</style>

<script>

export default {
  data: () => ({
     items: [
        {
          color: "pink lighten-1",
          icon: "mdi-login",
          title: "Paso 1",
          description: "Inicia la aplicación con tu email y contraseña, si no tienes cuenta, puedes crear una"
        },
        {
          color: "blue lighten-1",
          icon: "mdi-file-document",
          title: "Paso 2",
          description: "Crea un nuevo documento de estudio, puedes crear tantos como quieras y almacenarlos en categorías"
        },
        {
          color: "pink lighten-1",
          icon: "mdi-account-voice",
          title: "Paso 3",
          description: "Una vez en el documeto, presiona el botón con un ícono de micrófono para hablar con VAT y dictarle tus ideas"
      
        },
        {
          color: "blue lighten-1",
          icon: "mdi-brain",
          title: "Paso 4",
          description: "Retiene más información y de mejor manera con esta técnica; si quieres revisar el documento, siempre estará disponible en tu cuenta"
        },
      ],
  
  }),
  methods: {
  }
};
</script>
