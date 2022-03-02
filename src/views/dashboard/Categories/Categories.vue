<template>
  <v-container fluid fill-height>


    <v-row justify="center" class="text-center">
      <v-progress-linear v-if="loading" indeterminate absolute top color="accent"></v-progress-linear>
      <v-col cols="2">
        <v-card elevation="7">
          <v-list flat>
            <v-subheader class="text-uppercase">categorias</v-subheader>
            <v-list-item-group v-model="selectedItem" color="primary">
              <v-list-item color="pink" v-for="(item, i) in letters" :key="i" @click="select(item)">
                <v-list-item-icon>
                  <v-icon v-text="`mdi-alpha-${item}-circle`"></v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title class="text-uppercase" v-text="item"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card>
        <!-- <v-btn @click="newCategory()" color="accent" elevation="3" class="mt-5" large dense rounded>nueva</v-btn> -->
        
        <div class="text-center">
          <v-dialog v-model="dialog" width="500">
            <template v-slot:activator="{ on, attrs }">
              <v-btn v-bind="attrs" v-on="on" color="accent" elevation="3" class="mt-5" large dense rounded>nueva</v-btn>
            </template>
            
            <v-card>
              <v-card-title class="text-h5 green lighten-1">Agrega una nueva categoría</v-card-title>
              <v-progress-linear v-if="loadingDialog" indeterminate top color="accent"></v-progress-linear>
              <v-card-text class="mt-6 pb-0">
                <v-form ref="form" v-model="isValid" @submit.prevent="submit">
                  <v-text-field
                    name="category_name"
                    label="Nombre de la categoría"
                    v-model="form.name"
                    :rules="[rules.required, rules.max30]"
                    min="2"
                    max="30"
                    filled rounded color="pink"
                    prepend-inner-icon="mdi-shape"
                    @keydown.enter="submit"
                  >
                  </v-text-field>

                  <v-text-field
                    name="category_description"
                    label="Descripción de la categoría"
                    v-model="form.description"
                    :rules="[rules.required, rules.max150]"
                    filled rounded color="pink"
                    prepend-inner-icon="mdi-text-box"
                    @keydown.enter="submit">
                  </v-text-field>
                </v-form>
              </v-card-text>
              
              <v-divider></v-divider>

              <v-card-actions class="py-3">
                <v-spacer></v-spacer>
                <v-btn @click="dialog=false" color="px-3 grey lighten-2" dense rounded>Cancelar</v-btn>
                <v-btn @click="submit" color="px-3 green lighten-1 white--text" dense rounded>Agregar</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>
      </v-col>

      <v-col cols="10">
        <v-card class="py-6" elevation="7">

           <div class="bgblue border15 mx-5 py-5">
            <h1 class="glass border15 mx-10 pa-3 text-h3 font-weight-bold text text-uppercase">{{selectedLetter}}</h1>
          </div>


          <v-container>
            <!-- cards row -->

            <v-row justify="center" align="center" class="mx-1 pt-5">

              <v-col cols="4" v-for="(category, i) in categories_listing" :key="i">
                <v-card elevation="4" class="text-left pa-1 overflow-hidden">
                  <v-container>
                    <v-row>
                      <v-col cols="11" class="">
                        <!-- <div class="text-overline">Creada el 12/02/1</div> -->
                        <h1 class="text-h6 font-weight-bold">{{ category.name }}</h1>
                      </v-col>
                    </v-row>
                    <v-divider class="my-2"></v-divider>
                    <v-row>
                      <v-col cols="12" class="mt-1">
                        <span class="text-body-1">{{ category.description }}</span>
                      </v-col>
                    </v-row>
                  </v-container>
                  <v-card-actions>
                    <v-btn @click="handleClick(category.id)" color="primary" outlined>{{ category.slug }}</v-btn>
                  </v-card-actions>
                </v-card>
              </v-col>
            </v-row>
          </v-container>

          <div class="mt-5">
            <!-- <v-pagination v-model="page" :length="10" circle></v-pagination> -->
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import apiClient from "@/middleware/requests/api-client";
// import { mapState } from "vuex"

export default {
  created() {
    this.getCategories();
    this.form.owner = this.$store.getters["auth/getUserID"];
  },

  data: () => ({
    dialog: false,
    loading: false,
    loadingDialog: false,

    
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

    selectedItem: 0,
    selectedLetter:  null,
    categories: [], // all categories
    letters: [],
    categories_listing: [],
  }),

  methods: {
    select(index) {
      this.selectedLetter = index
      this.categories_listing = [];
      for (var i=0; i<this.categories.length; i++) {
        var item = this.categories[i]; 
        var itemName = this.categories[i].slug;
        if (itemName.substring(0, 1).toLowerCase() === index) {
          this.categories_listing.push(item);
        }
      }
    },

    async getCategories() {
      try {
        const client = new apiClient(apiClient.urlBase);
        const token = this.$store.getters["auth/getToken"];
        const myHeaders = new Headers({ Authorization: `Bearer ${token}` });
        const response = await client.categories.getAllCategories(myHeaders)
        .then((r) => r.text().then((data) => ({ status: r.status, body: data })));
        if (response.status == 200) {
          this.categories = JSON.parse(response.body);
          for (var i=0; i<this.categories.length; i++) {
            var slug = this.categories[i].slug;
            var first_letter = slug.charAt(0);
            // adding first letter to array to create menu
            !this.letters.includes(first_letter) ? this.letters.push(first_letter): "";
          }
        }
      } catch (err) { this.showSnackbar(["Ocurrió un error al obtener categorías"], "red", true, true, "mdi-alert-circle", "black", "ok"); console.error(err); }
      finally { this.select(this.letters[0]); this.loading = false; }
    },
    
    submit() {
      if(this.$refs.form.validate()) { this.loadingDialog = true; this.createNewCategory() }
      else { this.showSnackbar("red", true, true, "mdi-alert-circle", "Completa el formulario", "black", "ok"); }
    },

    
    async createNewCategory() {
      try {
        const client = new apiClient(apiClient.urlBase);
        const token = this.$store.getters["auth/getToken"];

        const myHeaders = new Headers({ Authorization: `Bearer ${token}` });


        const response = await client.categories.createCategory(myHeaders, this.form)
        .then((r) => r.text().then((data) => ({ status: r.status, body: data })));
        console.log(response)

        if (response.status == 201) { 
          this.loadingDialog=false; 
          this.$refs.form.reset();

          this.dialog = false;
          // this.$router.go(this.$router.currentRoute)
          this.letters = []
          this.getCategories(); 
          this.showSnackbar(["Categoría creada"], "green", true, true, "mdi-check-bold", "black", "ok"); }
      } catch (err) { this.showSnackbar(["Ocurrió un error al obtener categorías"], "red", true, true, "mdi-alert-circle", "black", "ok"); console.error(err); }
      finally { this.select(this.letters[0]); this.loading = false; }
   



    },

    handleClick(id) {
      let data = {id: id}; 
      this.$router.push({ name: "CategoriesDetail", params: {data} })
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
