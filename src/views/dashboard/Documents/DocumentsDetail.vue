<template>
  <v-container fluid fill-height>
    <v-row justify="center" class="text-center">
      <v-progress-linear v-if="loading" indeterminate absolute top color="accent"></v-progress-linear>
      <v-col cols="12">
        <v-card v-if="document_data" class="py-6" elevation="7">
          
          <v-speed-dial v-if="!editMode && !notFound" v-model="fab" top right absolute direction="bottom" transition="scale-transition">
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
                  <v-card-title class="text-h5 red lighten-1">¿Borrar el documento&nbsp;<span class="font-weight-bold">{{document_data.title}}</span>?</v-card-title>
                  <v-card-text class="mt-4">Al continuar se eliminará de tus documentos guardados. Ten en cuenta que esta acción no se puede deshacer.</v-card-text>
                  <v-divider></v-divider>
                  <v-card-actions class="py-3">
                    <v-spacer></v-spacer>
                    <v-btn @click="dialog = false" color="px-3 grey lighten-2" dense rounded>Cancelar</v-btn>
                    <v-btn @click="deleteDocument(document_data.document_id)" color="px-3 red lighten-1 white--text" dense rounded>Sí, eliminar</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </div>
          </v-speed-dial>

          <div v-if="notFound" class="bgblue border15 mx-5 py-5">
             <v-row justify="center">
               <v-col cols="8" class="mx-2 py-10">
                 <h1>No fue encontrado este documento</h1>
              </v-col>
            </v-row>
          </div>

          <div v-else class="bgblue border15 mx-5 py-5">
            <v-row v-if="!editMode" no-gutters justify="center" class="text-center pb-3">
              <v-col cols="3" class="mx-2">
                <h1 class="glass border10 text-overline">Creado: {{ document_data.created_date }}</h1>
              </v-col>
              <v-col cols="3" class="mx-2">
                <h1 class="glass border10 text-overline">Modificado: {{ document_data.created_date }}</h1>
              </v-col>
            </v-row>

            <div class="border15 mx-2 mx-sm-10 pa-5 px-2 px-sm-15">
              <div v-if="editMode">
                <v-form ref="form" v-model="isValid" @submit.prevent="submit">
                  <v-text-field
                    name="document_name"
                    label="Nombre del documento"
                    v-model="form.title"
                    :rules="[rules.required, rules.max30]"
                    min="2"
                    max="30"
                    filled
                    rounded
                    color="white"
                    prepend-inner-icon="mdi-text-box"
                    @keydown.enter="submit"
                    value="kaka"
                  >
                  </v-text-field>

                  <v-select
                    name="document_category"
                    label="Categoría"
                    filled
                    rounded
                    color="white"
                    prepend-inner-icon="mdi-shape"
                    v-model="document_categories_select"
                    :rules="rules.select"
                    :items="document_categories"
                    item-text="name"
                    item-value="id"
                    @keydown.enter="submit"
                    v-on:change="updateCategoryID(document_categories_select)"
                  >
                  </v-select>
                
                  <vue-editor class="grey lighten-5 pa-3 text-left border10 a-default" v-model="form.body"></vue-editor>

                  <v-combobox class="mt-8"
                    name="document_tags" label="Etiquetas"
                    hint="Agrega un máximo de 5 etiquetas"
                    persistent-hint
                    filled rounded
                    color="white"
                    prepend-inner-icon="mdi-label"
                    v-model="form.tags"
                    :rules="rules.tags"
                    :items="document_tags_all"
                    :search-input.sync="search"
                    height="100"
                    chips deletable-chips
                    hide-selected
                    multiple clearable
                    @keydown.enter="submit"
                  >
                    <template v-slot:no-data class="mt-3">
                      <v-list-item class="mt-3">
                        <v-list-item-content class="mt-3">
                          <v-list-item-title>
                            No hay tags que coincidan: "<strong>{{ search }}</strong>". Presiona <kbd>enter</kbd> para crear un nuevo tag
                          </v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                    </template>
                  </v-combobox>

                </v-form>


                <div class="text-right mt-7">
                  <v-btn @click="switchEditMode()" color="grey lighten-2" class="mx-1" dense rounded>salir</v-btn>
                  <v-btn @click="submit" color="green" class="mx-1 white--text" dense rounded>guardar</v-btn>
                </div>
              </div>

              <div v-else>
                <v-row no-gutters justify="center" class="text-center">
                  <v-col cols="12">
                    <h2 class="text-h2 font-weight-bold">{{ document_data.title }}</h2>
                  </v-col>

                  <v-col cols="auto" class="my-5">
                    <h3 @click=" $router.push({name: 'CategoriesDetail', params: { data: { id: document_data.category } }, })" class="text-h4 py-1 px-10 clickable mx-12 glass-white-border">{{ document_data.category_name }}</h3>
                  </v-col>
                </v-row>
                <v-divider></v-divider>
                <div class="grey lighten-5 my-5 pa-3 text-left border10 a-default" v-dompurify-html="document_data.body"></div>
              <v-chip v-for="(tag, i) in document_data.tags" :key="`tag_${i}`" text-color="light-blue darken-3" class="mt-4 mr-2">{{ tag }}</v-chip>

              </div>

            

            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import apiClient from "@/middleware/requests/api-client";
import { VueEditor } from "vue2-editor"

export default {
  components: {
    VueEditor
  },
  created() {

    if (window.location.pathname.includes("new")) {
      this.isNew = true;
      this.loading = false; 
      this.editMode = true;
      this.getCategories();
      this.getTags();
    }
    else {
      this.isNew = false;
      this.getDocument();
    }

  },

  data: () => ({
    isNew: false,
    notFound: false,
    document_data: {
      document_id: "",
      title: "",
      author: "",
      category: "",
      category_name: "",
      body: "",
      created_date: "",
      tags: []
    },
    document_categories_select: { name: "", id: "" },
    document_categories: [], // list of categories created by user
    
    
    document_tags_all: [], // list of categories created by user
    search: null,
    

    fab: false,
    dialog: false,
    editMode: false,
    isValid: false,
    loading: true,

    form: {
      title: "",
      category: "",
      body: "",
      tags: [],
    },

    rules: {
      required: (value) => !!value || "requerido",
      max30: (value) => (value && value.length <= 30) || "máximo 30 caracteres",
      max150: (value) => (value && value.length <= 150) || "máximo 150 caracteres",
      // select: [(value) => (value.length>0) || 'selecciona una categoría'],
      // tags: [(value) => (value.length>0 && value.length<6) || 'elige de 1 a 5 etiquetas, o escríbela para crear una nueva'],
    },
  }),

  watch: {
    "form.tags": {
      handler(val) { if (val.length > 5) { this.$nextTick(() => {  this.form.tags.pop(); } )} }, 
    }
  },

  methods: {
    submit() {
      if (this.$refs.form.validate()) { 
        this.loading = true; 
        this.isNew ? this.createDoc() : this.updateDoc(this.document_data.document_id);
      }
      else { this.showSnackbar(["Revisa el formulario"], "red", true, true, "mdi-alert-circle", "black", "ok"); }
    },

    switchEditMode() {
      if (window.location.pathname.includes("new")) {
         this.$router.go('-1')
      }
      else {
        this.fab = false;
        this.editMode = !this.editMode;
        this.form.title = this.document_data.title;
        this.form.category = this.document_data.category;
        this.form.body = this.document_data.body;
        this.form.tags = this.document_data.tags;
        }
    },

    updateCategoryID(id) { this.form.category = id; },

    async createDoc() {
      try {
        const client = new apiClient(apiClient.urlBase);
        const token = this.$store.getters["auth/getToken"];
        const myHeaders = new Headers({ Authorization: `Bearer ${token}` });
        this.form["document_id"] = ""; // generado automáticamente en el modelo en el backend
        this.form["author"] = this.$store.getters["auth/getUserID"];
        console.log(this.form)
        console.log("equis")
        const response = await client.documents.createDocument(myHeaders, this.form)
        .then((r) => r.text().then((data) => ({ status: r.status, body: data })));
        if (response.status == 201) {
          this.switchEditMode();
          this.document_data = JSON.parse(response.body);
          this.showSnackbar(["Documento creado"], "green", true, true, "mdi-check-bold", "black", "ok");
        }
      } 
      catch (err) { this.showSnackbar(["Ocurrió un error al actualizar la categoría"], "red", true, true, "mdi-alert-circle", "black", "ok"); console.error(err); }
      finally { this.loading = false; }
    },

    async updateDoc(uuid) {
      try {
        const client = new apiClient(apiClient.urlBase);
        const token = this.$store.getters["auth/getToken"];
        const myHeaders = new Headers({ Authorization: `Bearer ${token}` });
        const response = await client.documents.updateDocument(myHeaders, uuid, this.form)
        .then((r) => r.text().then((data) => ({ status: r.status, body: data })));
        if (response.status == 200) {
          this.document_data = JSON.parse(response.body);
          this.showSnackbar(["Documento guardado"], "green", true, true, "mdi-check-bold", "black", "ok");
        }
      } 
      catch (err) { this.showSnackbar(["Ocurrió un error al actualizar el documento"], "red", true, true, "mdi-alert-circle", "black", "ok"); console.error(err); }
      finally { this.loading = false; }
    },

    async deleteDocument(uuid) {
      try {
        const client = new apiClient(apiClient.urlBase);
        const token = this.$store.getters["auth/getToken"];
        const myHeaders = new Headers({ Authorization: `Bearer ${token}` });
        const response = await client.documents.deleteDocument(myHeaders, uuid)
        .then((r) => r.text().then((data) => ({ status: r.status, body: data })));
        if (response.status == 204) {
          this.$router.go('-1')
          this.showSnackbar(["Documento eliminado"], "green", true, true, "mdi-check-bold", "black", "ok");
        }
      } 
      catch (err) { this.showSnackbar(["Ocurrió un error al eliminar el documento"], "red", true, true, "mdi-alert-circle", "black", "ok"); console.error(err); }
      finally { this.loading = false; }
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
          this.notFound = false;
          this.document_data = JSON.parse(response.body);

          // this.form.document_id = this.document_data.document_id;
          this.form.title = this.document_data.title;
          // this.form.category = this.document_data.category;
          // this.form.body = this.document_data.body;
          // this.form.tags = this.document_data.tags;
          
          this.document_categories_select.name = this.document_data.category_name;
          this.document_categories_select.id = this.document_data.category;
        }
        else if (response.status == 404) { this.notFound = true; }
      } 
      catch (err) { this.showSnackbar(["Ocurrió un error al obtener el documento"], "red", true, true, "mdi-alert-circle", "black", "ok"); console.error(err); } 
      finally { this.loading = false; this.getCategories(); this.getTags() }
    },

    async getCategories() {
      try {
        const client = new apiClient(apiClient.urlBase);
        const token = this.$store.getters["auth/getToken"];
        const myHeaders = new Headers({ Authorization: `Bearer ${token}` });
        const response = await client.categories.getAllCategories(myHeaders)
        .then((r) => r.text().then((data) => ({ status: r.status, body: data })));
        if (response.status == 200) {
          var data = JSON.parse(response.body);
          for(var category in data) {
            const obj = { name: data[category].name, id: data[category].id }
            this.document_categories.push(obj)
          }
        }
      } 
      catch (err) { this.showSnackbar(["Ocurrió un error al obtener información del documento"], "red", true, true, "mdi-alert-circle", "black", "ok"); console.error(err); } 
      finally { this.loading = false; }
    },

    async getTags() {
        try {
        const client = new apiClient(apiClient.urlBase);
        const token = this.$store.getters["auth/getToken"];
        const myHeaders = new Headers({ Authorization: `Bearer ${token}` });
        const response = await client.tags.getAllTags(myHeaders)
        .then((r) => r.text().then((data) => ({ status: r.status, body: data })));
        if (response.status == 200) { var data = JSON.parse(response.body); data.forEach(element => { this.document_tags_all.push(element["name"]) }); }
      } 
      catch (err) { this.showSnackbar(["Ocurrió un error al obtener información documento"], "red", true, true, "mdi-alert-circle", "black", "ok"); console.error(err); } 
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
