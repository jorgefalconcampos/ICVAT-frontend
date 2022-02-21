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

import { apiHost } from '../../config';
// import axios from 'axios';

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
            uid: true,
            token: true,
        }
    },
    methods: {
        getSegments(){
            const pathname = window.location.pathname.split('/');
            this.uid = pathname[pathname.length-2];
            this.token = pathname[pathname.length-1];
            console.log(`${this.uid} --- ${this.token}`)
            this.activateAccount()
        },
        activateAccount(){
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
            
            var urlencoded = new URLSearchParams();
            urlencoded.append("uid", this.uid);
            urlencoded.append("token", this.token);
            
            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: urlencoded,
                redirect: 'follow'
            };
            
            fetch(`${apiHost}/auth/users/activation/`, requestOptions)
            .then(response => {
                if (response.status == 204) {   
                    this.title = "¡Listo! Ahora puedes iniciar sesión 👏";
                    this.showSnackbar("green", true, true, "mdi-check", "Verificación exitosa... redireccionando", "black", "ok" );
                    setTimeout(() => { this.$router.push('/login') }, 3500);
                }
                else{
                    if (response.status == 403) {
                        this.title = "Parece que la cuenta ya fue activada ¡Genial! 😀"; this.alreadyActive = true;
                    }
                    else {
                        this.title = "Esta cuenta no pudo ser activada :("; this.failed = true;
                        this.showSnackbar("red", true, true, "mdi-alert", "No se pudo completar la activación de la cuenta", "black", "ok" );
                    }
                }
                this.loading = false
            })                
            .then(result => console.log(result))
            .catch(error => console.log('error', error.status));
        },



        showSnackbar (color, isRight, showIcon, icon, msg, closeBtnColor, closeBtnTxt) {
            const snackOptions = {
                color: color,
                right: isRight,
                show_icon: showIcon,
                icon: icon,
                message: msg,
                closeSnackBtnColor: closeBtnColor,
                closeSnackBtnTxt: closeBtnTxt, 
            }
            this.$root.snackBar.show(snackOptions)
        }
    },    
}
</script>