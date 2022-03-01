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
      </v-col>

      <v-col cols="10">
        <v-card class="py-6" elevation="7">
          <v-container>
            <!-- cards row -->
            <v-row justify="center" align="center" class="mx-1">
              <v-col cols="4" v-for="(category, i) in categories_listing" :key="i">
                <v-card elevation="4" class="text-left pa-1">
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
    this.getDocuments();
  },

  data: () => ({
    loading: true,
    selectedItem: 0,
    categories: [], // all categories
    letters: [],
    categories_listing: [],
  }),

  methods: {
    select(index) {
      this.categories_listing = [];
      console.log(`index: ${index}`);
      for (var i=0; i < this.categories.length; i++) {
        var item = this.categories[i]; 
        var itemName = this.categories[i].slug;
        if (itemName.substring(0, 1).toLowerCase() === index) {
          this.categories_listing.push(item);
        }
      }
    },

    async getDocuments() {
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
