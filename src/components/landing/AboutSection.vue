<template>
  <section id="about">
    <v-container fluid>
      <v-row align="center" justify="center" class="mt-6">
        <v-col cols="10">
          <v-row align="center" justify="center">
            <v-col cols="12" md="7">
              <h1 class="font-weight-bold display-2 my-5">VAT te ayuda a estudiar</h1>
              <h1 class="font-weight-light display-1">Aprende cómo</h1>
              <v-row class="mt-7">
                <v-col cols="12" class="d-flex align-center">
                  <v-img src="@/assets/img/icon1.svg" max-width="60px" class="mr-4"/>
                  <p class="text-justify">Está comprobado que decir tus ideas en voz alta ayuda a retener la información por más tiempo. Escribir resumenes, ensayos o ideas quedó en el pasado cuando existen tecnologías de reconocimiento automático del habla.</p>
                </v-col>
                <v-col cols="12" class="d-flex align-center">
                  <v-img src="@/assets/img/icon2.svg" max-width="60px" class="mr-4"/>
                  <p class="text-justify">Cuando estudias con VAT, solo tienes que dictarle tus ideas, VAT las escucha, las transcribe y guarda el documento para que lo consultes después. Tu voz es traducida al momento y no se almacena en ningún lado.</p>
                </v-col>
                <v-col cols="12" class="d-flex align-center">
                  <v-img src="@/assets/img/icon3.svg" max-width="60px" class="mr-4"/>
                  <p class="text-justify">Al estudiar de esta manera, incrementan las posibilidades de aprobar exámenes o mejorar exposiciones al hablar tus ideas en voz. No más notitas de apuntes o acordeones, con VAT, seguro que te sacas un diez.</p>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="12" md="5" class="d-none d-md-flex">
              <v-img src="@/assets/img/ill1.svg" class="d-block ml-auto mr-auto" max-width="420px"/>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  
    
  </section>
  
</template>

<style scoped>
#about {
  background-color: #f4f7f5;
}

.bg-diff {
    color: rebeccapurple !;
}
</style>
