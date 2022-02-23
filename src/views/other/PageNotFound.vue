<template>
    <v-container fluid fill-height class="px-16">
         <v-row justify="center" align="center" class="text-center mx-12 pa-7 bgblue border15">
            <v-col cols="10">
                <div class="border10 glass-white-border py-8">
                    <v-row no-gutters justify="center" align="center">
                        <v-col cols="12" align-self="center" align="center">
                            <p class="big-title">Error 404: no encontrado</p>
                            <p class="pb-3">No se encontró la página solicitada</p>
                        </v-col>
                    </v-row>
                    <v-row no-gutters justify="center" align="center">
                        <v-col cols="6" align-self="center" align="center">
                            <v-img src="@/assets/img/404.png" max-width="330px"/>
                            <v-btn to="/" color="accent" elevation="3" x-large dense block rounded>ir a home</v-btn>
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