<template>
  <v-container fluid fill-height>
    <v-row justify="center" class="text-center py-6">
      <v-progress-linear v-if="loading" indeterminate absolute top color="accent"></v-progress-linear>
     
      <v-col cols="12" md="10">
        <v-card class="py-6" elevation="7">
          <div class="bgblue border15 mx-5 py-5">
            <h1 v-if="documents_listing.length===0" class="glass border15 mx-10 pa-3 text-h3 text-h4 my-2">Al parecer aún no hay documentos... 🤔 </h1>
            <h1 v-else class="glass border15 mx-5 mx-sm-10 pa-3 text-h3 text-h4 my-2">Todos mis documentos</h1>
            <v-btn @click="handleClick()" color="accent" elevation="3" class="mt-3" large dense rounded>nuevo</v-btn>
          </div>
          <v-container>
            <v-row justify="center" align="center" class="mx-1 pt-5">
              <v-col cols="6" md="4" v-for="(document, i) in documents_listing" :key="i">               
                <v-card @click="handleClick(document.document_id)" elevation="4" class="text-left pa-1 overflow-hidden">
                  <v-card-title><h1 class="text-h5 font-weight-bold mb-2">{{document.title}}</h1></v-card-title>
                  <v-card-subtitle><h2>{{document.category_name}}</h2></v-card-subtitle>
                  <v-container>
                    <v-row>
                      <v-col cols="11">
                        <h3 class="text-overline">Creado: {{document.created_date}}</h3>
                        <div v-if="document.tags.length" class="mt-3">
                          <v-icon left>mdi-label</v-icon>
                          <v-chip small v-for="(tag, i) in document.tags" :key="`tag_${i}`" text-color="light-blue darken-3" class="mr-1 my-1">{{tag}}</v-chip>
                        </div>
                      </v-col>
                    </v-row>
                  </v-container>
                  <!-- <v-divider class="mx-2 my-1"></v-divider> -->
                  <!-- <v-card-actions class="py-3">
                    <v-btn color="primary" outlined>ver/editar</v-btn>
                  </v-card-actions> -->
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

export default {
  created() {
    this.getDocuments();
  },

  data: () => ({
    documents_listing: [],
    dialog: false,
    loading: false,
    isValid: false,
    form: {
      owner: "",
      name: "",
      description: "",
    },
    rules: {
      required: (value) => !!value || "requerido",
      max30: (value) => (value && value.length <= 30) || "máximo 30 caracteres",
      max150: (value) =>
        (value && value.length <= 150) || "máximo 150 caracteres",
    },
  }),

  methods: {
    async getDocuments() {
      try {
        const client = new apiClient(apiClient.urlBase);
        const token = this.$store.getters["auth/getToken"];
        const myHeaders = new Headers({ Authorization: `Bearer ${token}`});
        const response = await client.documents.getAllDocuments(myHeaders)
        .then((r) => r.text().then((data) => ({status: r.status, body: data })));
        if (response.status == 200) { this.documents_listing = JSON.parse(response.body) }
      }
      catch (err) { this.showSnackbar(["Ocurrió un error al obtener los documentos"], "red", true, true, "mdi-alert-circle", "black", "ok"); console.error(err); }
      finally { this.loading = false; }
    },

    handleClick(id) {
      if (id) {
        this.$router.push(`/documents/${id}`);
      }
      else {
        this.$router.push(`/documents/new`);
      }
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
