<template>
  <v-container fluid fill-height>
    <v-row justify="center" class="text-center">
      <v-col cols="2" class="">
        <v-card class="" elevation="7">
          <v-list flat>
            <v-subheader class="text-uppercase">categorias</v-subheader>
            <v-list-item-group v-model="selectedItem" color="primary">
              <v-list-item color="pink" v-for="(item, i) in items" :key="i">
                <v-list-item-icon>
                  <v-icon v-text="item.icon"></v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title v-text="item.text"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card>
      </v-col>

      <v-col cols="10" class="">
        <v-card class="py-6" elevation="7">
          <v-container>

            <!-- cards row -->
            <v-row justify="center" align="center" class="red mx-1">
              <v-col cols="4">
                <v-card elevation="4" class="text-left pa-1">
                  <v-container>
                    <v-row>
                      <v-col cols="11" class="">
                        <!-- <div class="text-overline">Creada el 12/02/1</div> -->
                        <h1 class="text-h6 font-weight-bold">
                          Categoría palabras y contador
                        </h1>
                      </v-col>
                    </v-row>
                    <v-divider class="my-2"></v-divider>
                    <v-row>
                      <v-col cols="12" class="mt-1">
                        <span class="text-body-1">
                          Categoría palabras y contador esto es una descripción
                          de la categoría muy pequeña y corta y sencialla para
                          que las personas puedan dar una descripción
                        </span>
                      </v-col>
                    </v-row>
                  </v-container>
                  <v-card-actions>
                    <v-btn color="primary" outlined>ver categoria</v-btn>
                  </v-card-actions>
                </v-card>
              </v-col>

               <v-col cols="4">
                <v-card elevation="4" class="text-left pa-1">
                  <v-container>
                    <v-row>
                      <v-col cols="11" class="">
                        <!-- <div class="text-overline">Creada el 12/02/1</div> -->
                        <h1 class="text-h6 font-weight-bold">
                          Categoría palabras y contador
                        </h1>
                      </v-col>
                    </v-row>
                    <v-divider class="my-2"></v-divider>
                    <v-row>
                      <v-col cols="12" class="mt-1">
                        <span class="text-body-1">
                          Categoría palabras y contador esto es una descripción
                          de la categoría muy pequeña y corta y sencialla para
                          que las personas puedan dar una descripción
                        </span>
                      </v-col>
                    </v-row>
                  </v-container>
                  <v-card-actions>
                    <v-btn color="primary" outlined>ver categoria</v-btn>
                  </v-card-actions>
                </v-card>
              </v-col>

                 <v-col cols="4">
                <v-card elevation="4" class="text-left pa-1">
                  <v-container>
                    <v-row>
                      <v-col cols="11" class="">
                        <!-- <div class="text-overline">Creada el 12/02/1</div> -->
                        <h1 class="text-h6 font-weight-bold">
                          Categoría palabras y contador
                        </h1>
                      </v-col>
                    </v-row>
                    <v-divider class="my-2"></v-divider>
                    <v-row>
                      <v-col cols="12" class="mt-1">
                        <span class="text-body-1">
                          Categoría palabras y contador esto es una descripción
                          de la categoría muy pequeña y corta y sencialla para
                          que las personas puedan dar una descripción
                        </span>
                      </v-col>
                    </v-row>
                  </v-container>
                  <v-card-actions>
                    <v-btn color="primary" outlined>ver categoria</v-btn>
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

import apiClient from "@/middleware/requests/api-client"
// import { mapState } from "vuex"


export default {
  data: () => ({

    selectedItem: 0,
    items: [
      { text: "A", icon: "mdi-alpha-a-circle" },
      { text: "B", icon: "mdi-account" },
      { text: "C", icon: "mdi-flag" },
      // { text: "D", icon: "mdi-flag" },
      // { text: "E", icon: "mdi-flag" },
      // { text: "F", icon: "mdi-flag" },
      // { text: "G", icon: "mdi-flag" },
      // { text: "H", icon: "mdi-flag" },
      // { text: "I", icon: "mdi-flag" },
      // { text: "J", icon: "mdi-flag" },
      // { text: "K", icon: "mdi-flag" },
      // { text: "L", icon: "mdi-flag" },
      // { text: "M", icon: "mdi-flag" },
      // { text: "N", icon: "mdi-flag" },
      { text: "O", icon: "mdi-flag" },
      { text: "P", icon: "mdi-flag" },
    ],
  }),

  methods: {
    async getDocuments() {

      try {
        const client = new apiClient(apiClient.urlBase);
        const token = this.$store.getters["auth/getToken"]
        const myHeaders = new Headers({"Authorization": token});


        const response = await client.users.activate(myHeaders)
        .then(r => r.text().then(data => ({status: r.status, body: data})))

        console.log(response)

      }
      catch(err){ console.error(err); this.showSnackbar(["Ocurrió un error desconocido"], "red", true, true, "mdi-alert-circle", "black", "ok");  }       


    },
    
    showSnackbar (items_snackbar, color, isRight, showIcon, icon, closeBtnColor, closeBtnTxt) {
            const snackOptions = {
                items: items_snackbar,
                
                color: color,
                right: isRight,
                show_icon: showIcon,
                icon: icon,
                // message: msg,
                closeSnackBtnColor: closeBtnColor,
                closeSnackBtnTxt: closeBtnTxt, 
            }
            this.$root.snackBar.show(snackOptions)
        }
  },
};
</script>
