<template>
  <v-row
    v-if="this.$route.name === 'DocumentsDetail'"
    class="mb-5 d-flex d-inline align-center"
  >
    <v-col cols="12">
      <span>toca el micrófono para dictar</span>
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
        style="display:none;" 
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
    showStopping: false,
    isRecording: false,
    runtimeTranscription_: "",
    transcription_: [],
  }),

  methods: {
    updateValue(value) {
      this.$emit("input", value);
    },
    startSpeechToTxt(isRecording) {
      window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new window.SpeechRecognition();

      recognition.lang = "es-MX";
      recognition.continuous = true;

      recognition.start();
      this.isRecording = true;

      // event current voice reco word
      recognition.addEventListener("result", (event) => {
        let results = event.results;
        let text = results[results.length - 1][0].transcript;
        console.log(text);
        let input = document.getElementById("target_input");
        input.value = input.value += text;
        // simulamos evento input para que actualice cambios
        let evt = new window.Event("input");
        input.dispatchEvent(evt);
      });

      if (!isRecording) {
        console.log("Detenido manualmente por el usuario");
        this.showStopping = true;
        this.finalizarServicio(recognition);
      }

      // si no hay voz detectada en el micrófono, detenemos
       recognition.addEventListener("soundend", () => {
        console.log("No se detectó audio, finalizando servicio...");
        this.finalizarServicio(recognition);
      });

    },

    finalizarServicio(recognition) {
      recognition.abort();
      this.isRecording = false;
      this.showStopping = false;
    }

    // startOrStopRecording(isRecording) {
    // this.isRecording = !this.isRecording;

    // let recognition = new window.webkitSpeechRecognition();

    // if (isRecording == true) {
    //   recognition.lang = "es-MX";
    //   recognition.continuous = true;
    //   recognition.interimResults = false;
    //   recognition.start();

    //   recognition.onresult = (event) => {
    //     let results = event.results;
    //     let text = results[results.length - 1][0].transcript;
    //     console.log(text);
    //     let input = document.getElementById("target_input");
    //     input.value = input.value += text;
    //     let evt = new window.Event("input");
    //     input.dispatchEvent(evt);
    //   }

    // } else {
    //   this.showStopping = true;
    //   //  recognition.addEventListener("end", () => {
    //      recognition.stop();
    //   recognition.abort();
    //   //  }

    //   this.showStopping = false;

    // }
    // },
  },
};
</script>
