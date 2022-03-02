<template>
  <v-container fluid fill-height>
    <v-row justify="center" class="text-center">
      <v-progress-linear v-if="loading" indeterminate absolute top color="accent"></v-progress-linear>
      <v-col cols="12">
        <v-card class="py-6" elevation="7">
          <div class="bgblue border15 mx-5 py-5">
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
                    filled rounded color="white"
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
                    filled rounded color="white"
                    prepend-inner-icon="mdi-text-box"
                    @keydown.enter="submit">
                  </v-text-field>
                </v-form>

                <div class="text-right px-2">
                  <v-btn @click="switchEditMode()" color="grey lighten-2" class="mx-1" dense rounded>cancelar</v-btn> 
                  <v-btn @click="submit" color="green" class="mx-1 white--text" dense rounded >guardar</v-btn> 
                </div>
              </div>

              <div v-else>
                <h1 class="text-h2 font-weight-bold">{{category_info.name}}</h1>
                <h2 class="text-h4 my-2">{{category_info.description}}</h2>
              </div>

              <v-speed-dial
                v-if="!editMode"
                v-model="fab"
                right absolute direction="top"
                transition="scale-transition"
              >
                <template v-slot:activator>
                  <v-btn v-model="fab" @click="dialog=false" color="grey darken-4" dark fab>
                    <v-icon v-if="fab">mdi-close</v-icon>
                    <v-icon v-else>mdi-dots-vertical</v-icon>
                  </v-btn>
                </template>
                <!-- <v-btn fab dark small color="indigo"><v-icon>mdi-plus</v-icon></v-btn> -->
                <v-btn @click="switchEditMode()" fab dark small color="green"><v-icon>mdi-pencil</v-icon></v-btn>
                <div class="text-center">
                  <v-dialog v-model="dialog" width="500">
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn v-bind="attrs" v-on="on" fab dark small color="red"><v-icon>mdi-delete</v-icon></v-btn>
                    </template>
                    <v-card>
                      <v-card-title class="text-h5 red lighten-1">¿Borrar la categoría&nbsp;<span class="font-weight-bold">{{category_info.name}}</span>?</v-card-title>
                      <v-card-text class="mt-4">Al continuar, se eliminará esta categoría y también todos los documentos asociados a ella. Ten en cuenta que esta acción no se puede deshacer.</v-card-text>
                      <v-divider></v-divider>
                      <v-card-actions class="py-3">
                        <v-spacer></v-spacer>
                        <v-btn @click="dialog=false" color="px-3 grey lighten-2" dense rounded>Cancelar</v-btn>
                        <v-btn color="px-3 red lighten-1 white--text" dense rounded @click="deleteCategory(category_info.id)">Sí, eliminar</v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </div>
              </v-speed-dial>

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
    this.getCategory();
    this.form.owner = this.$store.getters["auth/getUserID"];
  },

  mounted() {
    // let data = this.$route.params.data;
    // console.log("data is", data);
  },

  data: () => ({
      fab: false,
      dialog: false,

      editMode: false,

      isValid: false,
      form: {
        owner: "",
        name: "",
        description: ""
      },
      rules: {
        required: value => !!value || 'requerido',
        max30: value => (value && value.length <= 30) || 'máximo 30 caracteres',
        max150: value => (value && value.length <= 150) || 'máximo 150 caracteres',
      },
      
      loading: true,
      category_info: {
        id: "",
        name: "",
        description: "",
        slug: ""
      },
  }),

  computed: {
  },

  methods: {
    submit() {
      if(this.$refs.form.validate()) { this.loading = true; this.updateCategory(this.category_info.id); }
      else { this.showSnackbar("red", true, true, "mdi-alert-circle", "Completa el formulario", "black", "ok"); }
    },

    async updateCategory(id) {
      try {
        const client = new apiClient(apiClient.urlBase);
        const token = this.$store.getters["auth/getToken"];
        const myHeaders = new Headers({ Authorization: `Bearer ${token}` });
        // console.log(this.form)
        const response = await client.categories.updateCategory(myHeaders, id, this.form)
        .then((r) => r.text().then((data) => ({ status: r.status, body: data })));
        // console.log(response)
        if (response.status == 200) {
          this.switchEditMode(); this.getCategory(); 
          this.showSnackbar(["Categoría actualizada"], "green", true, true, "mdi-check-bold", "black", "ok"); }
      } catch (err) { this.showSnackbar(["Ocurrió un error al actualizar la categoría"], "red", true, true, "mdi-alert-circle", "black", "ok"); console.error(err); }
    },


    switchEditMode() {
      this.fab = false; this.editMode = !this.editMode;
      this.form.name = this.category_info.name;
      this.form.description = this.category_info.description;
    },

    async deleteCategory(id) {
      try {
        const client = new apiClient(apiClient.urlBase);
        const token = this.$store.getters["auth/getToken"];
        const myHeaders = new Headers({ Authorization: `Bearer ${token}` });
        const response = await client.categories.deleteCategory(myHeaders, id)
        .then((r) => r.text().then((data) => ({ status: r.status, body: data })));
        if (response.status == 204) { this.$router.replace({ path: '/categories/'})}
      } catch (err) { this.showSnackbar(["Ocurrió un error al obtener la categoría"], "red", true, true, "mdi-alert-circle", "black", "ok"); console.error(err); }
      finally { this.loading = false; }
    },

     async getCategory() {
      try {
        const client = new apiClient(apiClient.urlBase);
        const token = this.$store.getters["auth/getToken"];
        const myHeaders = new Headers({ Authorization: `Bearer ${token}` });
        const id = this.$route.params.data.id;
        const response = await client.categories.getSingleCategory(myHeaders, id)
        .then((r) => r.text().then((data) => ({ status: r.status, body: data })));
        if (response.status == 200) { this.category_info = JSON.parse(response.body); this.form.name = this.category_info.name; this.form.description = this.category_info.description; }
      } catch (err) { this.showSnackbar(["Ocurrió un error al obtener la categoría"], "red", true, true, "mdi-alert-circle", "black", "ok"); console.error(err); }
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
