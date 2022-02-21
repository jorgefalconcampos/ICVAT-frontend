<template>
    <v-container fluid fill-height class="px-16">
         <v-row justify="center" align="center" class="text-center mx-12 pa-8 bgblue border15">
            <v-col cols="10">
                <div class="border10 glass-white-border py-8">
                    <v-row no-gutters justify="center" align="center">
                        <v-col cols="12" align-self="center" align="center">
                            <p v-if="loading" class="big-title">Activando tu cuenta...</p>
                            <p v-else class="big-title">¡Listo! Ahora puedes iniciar sesión 👏</p>
                        </v-col>
                    </v-row>
                    <v-row no-gutters justify="center" align="center">
                        <v-col cols="6" align-self="center" align="center" >
                            <div class="py-10" v-if="loading">
                                <v-progress-circular 
                                    :size="70"
                                    color="pink"
                                    indeterminate
                                ></v-progress-circular>
                            </div>
                            <div v-else>
                                <v-img src="@/assets/img/activated-account.png" max-width="440px"/>
                                <v-btn color="accent" elevation="3" x-large dense block rounded>iniciar sesión</v-btn>
                             </div>
                        </v-col>
                    </v-row>
                 </div>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>

// import axios from 'axios';

export default {
    mounted() { 
        this.getToken()
    },
    components: {
    },

    data() {
        return {
            loading: false,
        }
    },
    methods: {
        getToken(){
            const token = window.location.pathname.split('/').pop();
            console.log(token)
            // alert(token)
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