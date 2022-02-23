<template>
    <v-container fluid fill-height>
        <v-row justify="center" align="center" class="text-center mx-12 py-8 bgblue border15">
            <v-col cols="10">   
                <div class="border10 glass-white-border pt-3 pb-3 px-8">
                    <p class="big-title">Crea tu cuenta</p>
                    <v-row>
                        <v-col cols="8" class="px-6">
                            <v-form v-model="isValid" ref="form" @submit.prevent="submit">
                                <v-stepper v-model="stepper" vertical class="glass pb-5">
                                    <v-progress-linear
                                        v-if="loading"
                                        height="2"
                                        indeterminate
                                        absolute bottom
                                        color="white">
                                    </v-progress-linear>

                                    <v-stepper-step :color="this.stepper>1?'green':'black'" :complete="stepper>1" step="1" 
                                        class="py-4" :class="this.stepper==1?'grey lighten-4':''">Ingresa tu información
                                    </v-stepper-step>
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
                                    

                                    <v-stepper-step :color="this.stepper>2?'green':'black'" :complete="stepper>2" step="2" 
                                        class="py-4" :class="this.stepper==2?'grey lighten-4':''"> Ingresa tu email y contraseña
                                    </v-stepper-step>
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
                                                    name="input_password"
                                                    label="contraseña" 
                                                    v-model="form.password"
                                                    :rules="[rules.required, rules.password, passwordConfirmationRule]"
                                                    :type="show_pass_1 ? 'text' : 'password'"
                                                    :append-icon="form.password !== null ? show_pass_1 ? 'mdi-eye' : 'mdi-eye-off' : ''"
                                                    filled rounded color="white" 
                                                    prepend-inner-icon="mdi-lock"
                                                    @click:append="show_pass_1 = !show_pass_1"
                                                    @keydown.enter="submit">
                                                </v-text-field>
                                            </v-col>
                                            <v-col cols="6" class="pl-2">
                                                <v-text-field
                                                    dense
                                                    name="input_re_password"
                                                    label="contraseña (confirmar)" 
                                                    v-model="form.re_password"
                                                    :rules="[rules.required, rules.password, passwordConfirmationRule]"
                                                    :type="show_pass_2 ? 'text' : 'password'"
                                                    :append-icon="form.re_password !== null ? show_pass_2 ? 'mdi-eye' : 'mdi-eye-off' : ''"
                                                    filled rounded color="white" 
                                                    prepend-inner-icon="mdi-lock"
                                                    @click:append="show_pass_2 = !show_pass_2"
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
            </v-col>
        </v-row>

    </v-container>
</template>

<script>

import { mapActions } from 'vuex';
import { apiHost } from '../../config';
import apiClient from "../../middleware/requests/api-client";

export default {
    data: () => ({
        stepper: 1,
        isValid: false,
        loading: false,
        form: {
            first_name: "",
            last_name: "",
            username: "",
            email: "",
            password: null,
            re_password: null,
        },
        show_pass_1: false,
        show_pass_2: false,
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
            return (this.form.password === this.form.re_password) || 'Las contraseñas deben ser iguales'
        },
    },
    methods: {
        ...mapActions(["Register"]),
        
        submit() {
            // validation ??? https://tinyurl.com/29ksuvdx
            if(this.$refs.form.validate()) { this.loading = true; this.registerUser(); }
            else { this.showSnackbar("red", true, true, "mdi-alert-circle", "Completa el formulario", "black", "ok"); }
        },

        async registerUser() {
            try {
                const client = new apiClient(apiHost);

                const myHeaders = new Headers({"Content-Type": "application/x-www-form-urlencoded"});

                const response = await client.users.create(myHeaders, this.form)
                .then(r => r.text().then(data => ({status: r.status, ok: r.ok, body: data})))

                if ((response.status == 201) && (response.ok)){
                    this.$refs.form.reset();
                    this.showSnackbar(["¡Usuario creado con éxito! Revisa tu email y activa tu cuenta"], "green", true, true, "mdi-alert-circle", "black", "ok"); 
                }
                else {
                    const items_snackbar = [];
                    Object.entries(JSON.parse(response.body)).forEach(([key, value]) => {items_snackbar.push(`${key}: ${value}`)});
                    this.showSnackbar(items_snackbar, "red", true, true, "mdi-alert-circle", "black", "ok"); 
                }
            }
            catch(err){ console.error(err); this.showSnackbar(["Ocurrió un error desconocido"], "red", true, true, "mdi-alert-circle", "black", "ok");  }       
            finally { this.loading = false; }
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
    }
}
</script>