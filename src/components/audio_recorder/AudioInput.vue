<template>
  <v-row
    v-if="this.$route.name === 'DocumentsDetail'"
    class="mb-5 d-flex d-inline align-center"
    justify="center"
  >
    <v-switch
      class="text-center px-3"
      v-model="activeListen"
      color="white"
      :label="`Escucha activa: ${activeListen ? 'activada' : 'desactivada'} `"
    ></v-switch>

    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on, attrs }">
        <v-btn v-bind="attrs" v-on="on" fab dark x-small color="grey darken-4">
          <v-icon>mdi-help</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title class="text-h5 grey lighten-2"
          >¿Qué es la&nbsp;<span class="font-weight-bold">escucha activa</span
          >?</v-card-title
        >
        <v-card-text class="mt-4"
          >La escucha activa permite que VAT te escuche por largos periodos de
          tiempo. Pasarán 15 segundos desde que dejas de hablar hasta que VAT
          deje de escucharte. Cuando la escucha activa está desactivada, VAT te
          deja de escuchar casi inmediatamente. Esta opción es ideal para ideas
          largas, resúmenes o síntesis. Ten en cuenta que, al detenerse el
          servicio de voz cuando la escucha activa está encendida, podría
          demorar unos segundos en detenerse y la aplicación podría dejar de
          responder mientras tanto.</v-card-text
        >
        <v-divider></v-divider>
        <v-card-actions class="py-3">
          <v-spacer></v-spacer>
          <v-btn
            @click="dialog = false"
            color="px-3 grey lighten-2"
            dense
            rounded
            >Entendido</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-col cols="12">
      <span v-if="!isRecording">toca el micrófono para dictar</span>
      <span v-if="isRecording">toca el botón para dejar dictar</span>
      <v-btn
        v-if="!isRecording && !showStopping"
        class="ml-4 pink"
        rounded
        outlined
        dark
        fab
        small
        title="Comenzar a grabar"
        @click="startSpeechToTxt(true)"
      >
        <v-icon>mdi-microphone</v-icon>
      </v-btn>

      <v-progress-circular
        indeterminate
        color="black"
        v-if="showStopping"
      ></v-progress-circular>

      <v-btn
        v-if="isRecording && !showStopping"
        class="ml-4 red darken-1"
        rounded
        outlined
        dark
        fab
        small
        title="Dejar de grabar"
        @click="startSpeechToTxt(false)"
      >
        <v-icon>mdi-stop</v-icon>
      </v-btn>

      <input
        id="target_input"
        style="display: none"
        type="text"
        :value="value"
        @input="updateValue($event.target.value)"
      />
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: ["value"],

  data: () => ({
    dialog: false,
    // isContinuous: false,
    showStopping: false,
    isRecording: false,
    activeListen: false,
    runtimeTranscription: "",
    transcription: [],
  }),

  methods: {
    updateValue(value) {
      this.$emit("input", value);
    },
    startSpeechToTxt(isRecording) {
      window.SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new window.SpeechRecognition();

      recognition.lang = "es-MX";
      recognition.continuous = this.activeListen;
      this.activeListen ? recognition.interimResults = false : recognition.interimResults = true;

      recognition.start();
      this.isRecording = true;

      // event current voice reco word
      recognition.addEventListener("result", (event) => {
        if (this.activeListen === true) {
          let results = event.results;
          let text = results[results.length - 1][0].transcript;
          this.updateText(text);
        } else {
          var text = Array.from(event.results)
            .map((result) => result[0])
            .map((result) => result.transcript)
            .join("");
          this.runtimeTranscription = text;
        }

        // let results = event.results;
        // let text = results[results.length - 1][0].transcript;
        // console.log(text);
        // let input = document.getElementById("target_input");
        // input.value = input.value += text;
        // // simulamos evento input para que actualice cambios
        // let evt = new window.Event("input");
        // input.dispatchEvent(evt);
      });

      if (!isRecording) {
        console.log("Detenido manualmente por el usuario");
        this.showStopping = true;
        this.stopService(recognition);
      }

      recognition.addEventListener("end", () => {
        if (!this.activeListen) {
          console.log("esto se muestra solo en escucha rápida");
          this.transcription.push(this.runtimeTranscription);
          this.runtimeTranscription = "";
          this.updateText(this.transcription[this.transcription.length - 1]);
        }
        this.stopService(recognition);
      });

      // si no hay voz detectada en el micrófono, detenemos
      recognition.addEventListener("soundend", () => {
        console.log("No se detectó audio, finalizando servicio...");
        this.stopService(recognition);
      });
    },

    updateText(text) {
      let input = document.getElementById("target_input");
      input.value = input.value += text;
      // simulamos evento input para que actualice cambios
      let evt = new window.Event("input");
      input.dispatchEvent(evt);
    },

    stopService(recognition) {
      recognition.abort();
      this.isRecording = false;
      this.showStopping = false;
    },
  },
};
</script>
