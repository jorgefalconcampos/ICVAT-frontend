<template>
    <v-container fluid fill-height class="px-16">
         <v-row justify="center" align="center" class="text-center mx-12 pa-8 bgblue border15">
            <v-col cols="10">
                <div class="border10 glass-white-border py-8">
                    <v-row no-gutters justify="center" align="center">
                        <v-col cols="12" align-self="center" align="center">
                            <p class="big-title">{{title}}</p>
                        </v-col>
                    </v-row>
                    <v-row no-gutters justify="center" align="center">
                        <v-col cols="6" align-self="center" align="center" >
                            <div v-if="loading" class="py-10">
                                <v-progress-circular 
                                    :size="70"
                                    color="pink"
                                    indeterminate
                                ></v-progress-circular>
                            </div>
                            <div v-else>
                                <div v-if="failed">
                                    <v-img src="@/assets/img/error.png" max-width="400px"/>
                                    <v-btn color="accent" elevation="3" class="mt-5" x-large dense block rounded>reintentar</v-btn>
                                </div>
                                <div v-else>
                                    <v-img src="@/assets/img/activated-account.png" max-width="440px"/>
                                    <v-btn v-if="this.alreadyActive" to="/login" color="accent" elevation="3" class="mt-5" x-large dense block rounded>iniciar sesión</v-btn>
                                </div>
                             </div>
                        </v-col>
                    </v-row>
                 </div>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>

import apiClient from "../../middleware/requests/api-client";

export default {
    created() {
        // alert(apiHost)
        this.getSegments();
    },
    components: {
    },

    data() {
        return {
            loading: true,
            title: "Activando tu cuenta...",
            failed: false,
            alreadyActive: false,
            uid: null,
            token: null,
        }
    },
    methods: {
        getSegments(){
            const pathname = window.location.pathname.split('/');
            this.uid = pathname[pathname.length-2];
            this.token = pathname[pathname.length-1];
            // console.log(`${this.uid} --- ${this.token}`)
            this.activateAccount()
        },
        async activateAccount(){
            try {
                const client = new apiClient(apiClient.urlBase);
                const myHeaders = new Headers({"Content-Type": "application/x-www-form-urlencoded"});
                const body = { "uid": this.uid, "token": this.token }
                const response = await client.users.activate(myHeaders, body)
                .then(r => r.text().then(data => ({status: r.status, body: data})))                
                if (response.status == 204) {
                    this.title = "¡Listo! Ahora puedes iniciar sesión 👏";
                    this.showSnackbar(["¡Tu cuenta fue activada! Redireccionando al inicio de sesión..."], "green", true, true, "mdi-alert-circle", "black", "ok"); 
                    setTimeout(() => { this.$router.push('/login') }, 5500);
                }
                else {
                    const items_snackbar = [];
                    Object.values(JSON.parse(response.body)).forEach((value) => {items_snackbar.push(`${value}`)});
                    this.showSnackbar(items_snackbar, "red", true, true, "mdi-alert-circle", "black", "ok"); 
                    if (response.status == 403) { this.title = "Parece que la cuenta ya fue activada ¡Genial! 😀"; this.alreadyActive = true; }
                    else { this.title = "Esta cuenta no pudo ser activada :("; this.failed = true; }
                }
                this.loading = false;
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
                closeSnackBtnColor: closeBtnColor,
                closeSnackBtnTxt: closeBtnTxt, 
            }
            this.$root.snackBar.show(snackOptions)
        }
    },    
}
</script>