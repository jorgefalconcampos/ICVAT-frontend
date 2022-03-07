<template>
  <v-container fluid fill-height>
    <v-row justify="center" class="text-center">
      <v-progress-linear v-if="loading" indeterminate absolute top color="accent"></v-progress-linear>
      <v-col cols="12">
        <v-card v-if="document_data" class="py-6" elevation="7">
          <v-speed-dial v-if="!editMode" v-model="fab" top right absolute direction="bottom" transition="scale-transition">
            <template v-slot:activator>
              <v-btn v-model="fab" @click="dialog = false" color="grey darken-4" dark fab>
                <v-icon v-if="fab">mdi-close</v-icon>
                <v-icon v-else>mdi-dots-vertical</v-icon>
              </v-btn>
            </template>
            <v-btn @click="switchEditMode()" fab dark small color="green">
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <div class="text-center">
              <v-dialog v-model="dialog" width="500">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn v-bind="attrs" v-on="on" fab dark small color="red">
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title class="text-h5 red lighten-1">¿Borrar el documento&nbsp;<span class="font-weight-bold">ssddsds</span>?</v-card-title>
                  <v-card-text class="mt-4">Al continuar, se eliminará este documento de tus documentos guardados. Ten en cuenta que esta acción no se puede deshacer.</v-card-text>
                  <v-divider></v-divider>
                  <v-card-actions class="py-3">
                    <v-spacer></v-spacer>
                    <v-btn @click="dialog = false" color="px-3 grey lighten-2" dense rounded>Cancelar</v-btn>
                    <v-btn color="px-3 red lighten-1 white--text" dense rounded>Sí, eliminar</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </div>
          </v-speed-dial>

          <div class="bgblue border15 mx-5 py-5">
            <v-row no-gutters justify="center" class="text-center pb-3">
              <v-col cols="3" class="mx-2">
                <h1 class="glass border10 text-overline">Creado: {{ document_data.created_date }}</h1>
              </v-col>
              <v-col cols="3" class="mx-2">
                <h1 class="glass border10 text-overline">Modificado: {{ document_data.created_date }}</h1>
              </v-col>
            </v-row>

            <div class="glass border15 mx-10 pa-5 px-15">
              <div v-if="editMode">
                <v-form ref="form" v-model="isValid" @submit.prevent="submit">
                  <v-text-field
                    name="category_name"
                    label="Nombre de la categoría"
                    v-model="form.name"
                    :rules="[rules.required, rules.max30]"
                    min="2"
                    max="30"
                    filled
                    rounded
                    color="white"
                    prepend-inner-icon="mdi-shape"
                    @keydown.enter="submit"
                    value="kaka"
                  >
                  </v-text-field>

                  <v-text-field
                    name="category_description"
                    label="Descripción de la categoría"
                    v-model="form.description"
                    :rules="[rules.required, rules.max150]"
                    filled
                    rounded
                    color="white"
                    prepend-inner-icon="mdi-text-box"
                    @keydown.enter="submit"
                  >
                  </v-text-field>
                </v-form>

                <div class="text-right px-2">
                  <v-btn
                    @click="switchEditMode()"
                    color="grey lighten-2"
                    class="mx-1"
                    dense
                    rounded
                    >cancelar</v-btn
                  >
                  <v-btn
                    @click="submit"
                    color="green"
                    class="mx-1 white--text"
                    dense
                    rounded
                    >guardar</v-btn
                  >
                </div>
              </div>

              <div v-else>
                <v-row no-gutters justify="center" class="text-center">
                  <v-col cols="12">
                    <h2 class="text-h2 font-weight-bold">{{ document_data.title }}</h2>
                  </v-col>

                  <v-col cols="8" class="px-10">
                    <h3 @click=" $router.push({name: 'CategoriesDetail', params: { data: { id: document_data.category } }, })" class="text-h4 my-3 clickable mx-12">{{ document_data.category_name }}</h3>
                  </v-col>
                </v-row>
                <v-divider></v-divider>
              </div>

              <!-- <v-speed-dial
                v-if="!editMode"
                v-model="fab" top
                right absolute direction="top"
                transition="scale-transition"
              >
                <template v-slot:activator>
                  <v-btn v-model="fab" @click="dialog=false" color="grey darken-4" dark fab>
                    <v-icon v-if="fab">mdi-close</v-icon>
                    <v-icon v-else>mdi-dots-vertical</v-icon>
                  </v-btn>
                </template>
                <v-btn @click="switchEditMode()" fab dark small color="green"><v-icon>mdi-pencil</v-icon></v-btn>
                <div class="text-center">
                  <v-dialog v-model="dialog" width="500">
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn v-bind="attrs" v-on="on" fab dark small color="red"><v-icon>mdi-delete</v-icon></v-btn>
                    </template>
                    <v-card>
                      <v-card-title class="text-h5 red lighten-1">¿Borrar el documento&nbsp;<span class="font-weight-bold">ssddsds</span>?</v-card-title>
                      <v-card-text class="mt-4">Al continuar, se eliminará este documento de tus documentos guardados. Ten en cuenta que esta acción no se puede deshacer.</v-card-text>
                      <v-divider></v-divider>
                      <v-card-actions class="py-3">
                        <v-spacer></v-spacer>
                        <v-btn @click="dialog=false" color="px-3 grey lighten-2" dense rounded>Cancelar</v-btn>
                        <v-btn color="px-3 red lighten-1 white--text" dense rounded>Sí, eliminar</v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </div>
              </v-speed-dial> -->

              <v-chip small v-for="(tag, i) in document_data.tags" :key="`tag_${i}`" text-color="light-blue darken-3" class="mt-4 mr-1">{{ tag }}</v-chip>
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import apiClient from "@/middleware/requests/api-client";

export default {
  created() {
    this.getDocument();
  },

  data: () => ({
    document_data: {},

    fab: false,
    dialog: false,
    editMode: false,
    isValid: false,
    loading: true,

    form: {
      document_id: "",
      title: "",
      category: "",
      body: "",
      tags: [],
    },
    rules: {
      required: (value) => !!value || "requerido",
      max30: (value) => (value && value.length <= 30) || "máximo 30 caracteres",
      max150: (value) =>
        (value && value.length <= 150) || "máximo 150 caracteres",
    },
  }),

  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        this.updateDocument(this.form.document_id);
      } else { this.showSnackbar("red", true, true, "mdi-alert-circle", "Completa el formulario","black", "ok");}
    },

    switchEditMode() {
      this.fab = false;
      this.editMode = !this.editMode;
      // this.form.name = this.category_info.name;
      // this.form.description = this.category_info.description;
    },

    async updateDocument(uuid) {
      try {
        const client = new apiClient(apiClient.urlBase);
        const token = this.$store.getters["auth/getToken"];
        const myHeaders = new Headers({ Authorization: `Bearer ${token}` });
        const response = await client.categories.updateDocument(myHeaders, uuid, this.form)
        .then((r) => r.text().then((data) => ({ status: r.status, body: data })));
        if (response.status == 200) {this.showSnackbar(["Documento guardado"], "green", true, true, "mdi-check-bold", "black", "ok");}
      } 
      catch (err) { this.showSnackbar(["Ocurrió un error al actualizar la categoría"], "red", true, true, "mdi-alert-circle", "black", "ok"); console.error(err); }
    },

    async getDocument() {
      try {
        const client = new apiClient(apiClient.urlBase);
        const token = this.$store.getters["auth/getToken"];
        const uuid = this.$route.params.document_id;
        const myHeaders = new Headers({ Authorization: `Bearer ${token}` });
        const response = await client.documents.getSingleDocument(myHeaders, uuid)
        .then((r) => r.text().then((data) => ({ status: r.status, body: data })));
        if (response.status == 200) {
          this.document_data = JSON.parse(response.body);
        }
      } 
      catch (err) { this.showSnackbar(["Ocurrió un error al obtener el documento"], "red", true, true, "mdi-alert-circle", "black", "ok"); console.error(err); } 
      finally { this.loading = false; }
    },

    showSnackbar(items_snackbar, color, isRight, showIcon, icon, closeBtnColor, closeBtnTxt) {
      const snackOptions = {
        items: items_snackbar,
        color: color,
        right: isRight,
        show_icon: showIcon,
        icon: icon,
        closeSnackBtnColor: closeBtnColor,
        closeSnackBtnTxt: closeBtnTxt,
      };
      this.$root.snackBar.show(snackOptions);
    },
  },
};
</script>
