<template>
    <v-container fluid fill-height>
        <v-row justify="center" align="center" class="text-center mx-12 py-8 bgblue border15">
            <v-col cols="10">   
                <div class="border10 glass-white-border pt-3 pb-3 px-8">
                    <p class="big-title">Crea tu cuenta</p>
                    <v-row>
                        <v-col cols="8" class="px-6">
                            <v-form ref="form" v-model="isValid" @submit.prevent="submit">
                                <v-stepper v-model="stepper" vertical class="glass pb-5">
                                    <v-stepper-step :color="this.stepper>1?'green':'black'" :complete="stepper>1" step="1" class="py-4" :class="this.stepper==1?'grey lighten-4':''">Ingresa tu información</v-stepper-step>
                                    <v-stepper-content step="1">
                                        <v-row no-gutters class="mt-2">
                                            <v-col cols="6" class="pr-2">
                                                <v-text-field
                                                    dense
                                                    name="input_name"
                                                    label="nombre" 
                                                    v-model="form.first_name" 
                                                    :rules="[rules.required]" 
                                                    filled rounded color="white" 
                                                    prepend-inner-icon="mdi-card-account-details"
                                                    @keydown.enter="submit">
                                                </v-text-field>
                                            </v-col>
                                            <v-col cols="6" class="pl-2">
                                                <v-text-field
                                                    dense
                                                    name="input_last_name"
                                                    label="apellido" 
                                                    v-model="form.last_name" 
                                                    :rules="[rules.required]" 
                                                    filled rounded color="white" 
                                                    prepend-inner-icon="mdi-card-account-details"
                                                    @keydown.enter="submit">
                                                </v-text-field>
                                            </v-col>
                                            <v-col cols="12">
                                                <v-text-field
                                                    dense
                                                    name="input_username"
                                                    label="nombre de usuario" 
                                                    v-model="form.username" 
                                                    :rules="[rules.required, rules.username,]" 
                                                    filled rounded color="white" 
                                                    prepend-inner-icon="mdi-account-circle"
                                                    @keydown.enter="submit">
                                                </v-text-field>
                                            </v-col>
                                        </v-row>
                                        <div class="text-left">
                                            <v-btn small elevation="0" color="blue" class="font-weight-bold" @click="stepper = 2">paso siguiente</v-btn>
                                        </div>
                                    </v-stepper-content>

                                    <v-stepper-step :color="this.stepper>2?'green':'black'" :complete="stepper>2" step="2" class="py-4" :class="this.stepper==2?'grey lighten-4':''"> Ingresa tu email y contraseña</v-stepper-step>
                                    <v-stepper-content step="2">
                                        <v-row no-gutters class="mt-2">
                                            <v-col cols="12">
                                                <v-text-field
                                                    dense
                                                    name="input_email"
                                                    label="email" 
                                                    v-model="form.email" 
                                                    :rules="[rules.required, rules.email]" 
                                                    filled rounded color="white" 
                                                    prepend-inner-icon="mdi-email"
                                                    @keydown.enter="submit">
                                                </v-text-field>
                                            </v-col>
                                            <v-col cols="6" class="pr-2">
                                            <v-text-field
                                                    dense
                                                    name="input_password1"
                                                    label="contraseña" 
                                                    v-model="form.password1"
                                                    :rules="[rules.required, rules.password, passwordConfirmationRule]"
                                                    :type="form.show_pass_1 ? 'text' : 'password'"
                                                    :append-icon="form.password1 !== null ? form.show_pass_1 ? 'mdi-eye' : 'mdi-eye-off' : ''"
                                                    filled rounded color="white" 
                                                    prepend-inner-icon="mdi-lock"
                                                    @click:append="form.show_pass_1 = !form.show_pass_1"
                                                    @keydown.enter="submit">
                                                </v-text-field>
                                            </v-col>
                                            <v-col cols="6" class="pl-2">
                                                <v-text-field
                                                    dense
                                                    name="input_password2"
                                                    label="contraseña (confirmar)" 
                                                    v-model="form.password2"
                                                    :rules="[rules.required, rules.password, passwordConfirmationRule]"
                                                    :type="form.show_pass_2 ? 'text' : 'password'"
                                                    :append-icon="form.password2 !== null ? form.show_pass_2 ? 'mdi-eye' : 'mdi-eye-off' : ''"
                                                    filled rounded color="white" 
                                                    prepend-inner-icon="mdi-lock"
                                                    @click:append="form.show_pass_2 = !form.show_pass_2"
                                                    @keydown.enter="submit">
                                                </v-text-field>
                                            </v-col>
                                        
                                        </v-row>
                                        <div class="text-left">
                                            <v-btn small elevation="0" color="blue" class="font-weight-bold" @click="stepper=1">paso anterior</v-btn>
                                        </div>
                                    </v-stepper-content>
                                </v-stepper>
                            </v-form>
                        </v-col>
                        <v-col cols="4" align-self="center" align="center">
                            <v-img src="@/assets/img/register.png" max-width="310px"/>
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col cols="8" class="px-16">
                            <v-btn @click="submit" color="accent" elevation="3" class="mb-3" x-large dense block rounded :disabled="!isValid">registrarme</v-btn> 
                             <p class="small-txt">¿Ya tienes una cuenta?                                 
                                 <router-link to="/login/"> Inicia sesión</router-link>   
                            </p> 
                        </v-col>
                    </v-row>   
                </div>


                <!-- <div class="border10 glass-white-border">
                    <v-row no-gutters>
                        <v-col cols="6" class="pa-12">
                            <p class="big-title pb-6">Crea tu cuenta</p>

                            <v-form ref="form" v-model="form.valid" lazy-validation @submit.prevent="submit">

                                <v-text-field 
                                    name="input_email"
                                    label="email" 
                                    v-model="form.email" 
                                    :rules="[rules.required, rules.email]" 
                                    filled rounded color="white" 
                                    prepend-inner-icon="mdi-email"
                                    @keydown.enter="submit">
                                </v-text-field>
                                
                                <v-text-field
                                    name="input_username"
                                    label="nombre de usuario" 
                                    v-model="form.username" 
                                    :rules="[rules.required]" 
                                    filled rounded color="white" 
                                    prepend-inner-icon="mdi-account"
                                    @keydown.enter="submit">
                                </v-text-field>

                                <v-text-field 
                                    name="input_password"
                                    label="contraseña" 
                                    v-model="form.password"
                                    :rules="[rules.required, rules.password]"
                                    :type="form.show_pass ? 'text' : 'password'"
                                    :append-icon="form.show_pass ? 'mdi-eye' : 'mdi-eye-off'"
                                    filled rounded color="white" 
                                    prepend-inner-icon="mdi-lock"
                                    @click:append="form.show_pass = !form.show_pass"
                                    @keydown.enter="submit">
                                </v-text-field>

                                <v-btn @click="submit" color="accent" elevation="3" class="mb-4" x-large dense block rounded>registrarme</v-btn>

                            </v-form>

                            <p class="small-txt">¿Ya tienes una cuenta?                                 
                                 <router-link to="/login/">
                                    Inicia sesión
                                </router-link>   
                            </p>
                        </v-col>
                        <v-col align-self="center"  cols="6">
                            <v-img src="@/assets/img/register.png" max-width="460px"/>
                        </v-col>
                    </v-row>
                 </div> -->
            </v-col>
        </v-row>

    </v-container>
</template>

<script>

import { mapActions } from 'vuex';

import { apiHost } from '../../config';
// import axios from "axios";


export default {
    data: () => ({
        stepper: 1,
        isValid: false,
        form: {
            first_name: "",
            last_name: "",
            username: "",

            email: "",
            password1: null,
            password2: null,
                
            show_pass_1: false,
            show_pass_2: false,
        },
        rules: {
            required: value => (!!value && value!=="") || 'requerido',
            username: value => {
                // const pattern = /^[\w.@+-]+/
                // const pattern = /^[a-z0-9@.+_-]{5,50}$/
                const pattern = /^[a-zA-Z0-9@.+_-]{5,50}$/
                return pattern.test(value) || "min. 5 caracteres, solo se admiten letras (sin ñ), números y los caracteres @/./+/-/_"
            },
            email: value => {
                const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                return pattern.test(value) || "e-mail inválido"
            },
            password: value => {
                const pattern = /^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).*$/
                return pattern.test(value) || "min. 8 caracteres, una mayúscula, una minúscula, un dígito y un caracter especial";
            },
            },

    }),
    computed: {
        passwordConfirmationRule() {
            return (this.form.password1 === this.form.password2) || 'Las contraseñas deben ser iguales'
        },
    },
    methods: {
        ...mapActions(["Register"]),
        
        submit() {
            if(this.$refs.form.validate()) {
                this.registerUser();
                alert("okkk")
            }
            else { this.showSnackbar("red", true, true, "mdi-alert-circle", "Completa el formulario", "black", "ok"); }
        },

        registerUser() {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
            
            var urlencoded = new URLSearchParams();
            
            // urlencoded.append("username", "dsdsdsds");
            // urlencoded.append("first_name", "delsenior");
            // urlencoded.append("last_name", "revillagiged");
            // urlencoded.append("email", "jorge.a.falcon99@gmail.com");
            // urlencoded.append("password", "Lolxd123");
            // urlencoded.append("re_password", "Lolxd123");

            urlencoded.append("username", this.form.username);
            urlencoded.append("first_name", this.form.first_name);
            urlencoded.append("last_name", this.form.last_name);
            urlencoded.append("email", this.form.email);
            urlencoded.append("password", this.form.password1);
            urlencoded.append("re_password", this.form.password2);

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: urlencoded,
                redirect: 'follow'
            };

            fetch(`${apiHost}/auth/users/`, requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.error('error', error));


       
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
    }
}
</script>