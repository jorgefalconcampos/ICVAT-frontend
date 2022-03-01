<template>
  <v-container fluid fill-height>
    <v-row justify="center" class="text-center">
      <v-progress-linear v-if="loading" indeterminate absolute top color="accent"></v-progress-linear>


      <v-col cols="12">
        <v-card class="py-6" elevation="7">
          <div class="bgblue border15 mx-5 py-5">
            <h1 class="text-h2 font-weight-bold">{{category_info.name}}</h1>
            <h2 class="text-h4 mt-4">{{category_info.description}}</h2>
          </div>
          <v-container class="mt-5">
            <!-- cards row -->
            <v-row justify="center" align="center" class="mx-1">
              <v-col cols="3">
                <v-card elevation="4" class="text-left pa-1">
                  <v-container>
                    <v-row>
                      <v-col cols="11" class="">
                        <div class="text-overline">Creada el 12/02/1</div>
                        <h1 class="text-h6 font-weight-bold">sddsds</h1>
                      </v-col>
                    </v-row>
                    <v-divider class="my-2"></v-divider>
                    <v-row>
                      <v-col cols="12" class="mt-1">
                        <span class="text-body-1">sddsds</span>
                      </v-col>
                    </v-row>
                  </v-container>
                  <v-card-actions>
                    <v-btn @click="handleClick" color="pink" outlined
                      >sdds</v-btn
                    >
                  </v-card-actions>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
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
  },

  mounted() {
    // let data = this.$route.params.data;
    // console.log("data is", data);
  },

  data: () => ({
    loading: true,
    category_info: {},
  }),

  methods: {

     async getCategory() {
      try {
        const client = new apiClient(apiClient.urlBase);
        const token = this.$store.getters["auth/getToken"];
        const myHeaders = new Headers({ Authorization: `Bearer ${token}` });
        const id = this.$route.params.data.id
        const response = await client.categories.getSingleCategory(myHeaders, id)
        .then((r) => r.text().then((data) => ({ status: r.status, body: data })));
        if (response.status == 200) { this.category_info = JSON.parse(response.body)}
      } catch (err) { this.showSnackbar(["Ocurrió un error al obtener la categoría"], "red", true, true, "mdi-alert-circle", "black", "ok"); console.error(err); }
      finally { this.loading = false; }
    },

    showSnackbar(
      items_snackbar,
      color,
      isRight,
      showIcon,
      icon,
      closeBtnColor,
      closeBtnTxt
    ) {
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
