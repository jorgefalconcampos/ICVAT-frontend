<template>
    <v-container fluid fill-height>
        <v-row justify="center" align="center" class="text-center mx-12 py-8 bgblue border15">
            <v-col cols="10">   
                <div class="border10 glass-white-border pt-3 pb-3 px-8">
                    <p class="big-title">Crea tu cuenta</p>
                    <v-row>
                        <v-col cols="8" class="px-6">
                            <v-stepper v-model="stepper" vertical class="glass pb-5">
                                <v-stepper-step :color="this.stepper>1?'green':'black'" :complete="stepper>1" step="1" class="py-4" :class="this.stepper==1?'grey lighten-4':''">Ingresa tu información</v-stepper-step>
                                <v-stepper-content step="1">
                                    <v-row no-gutters class="mt-2">
                                        <v-col cols="6" class="pr-2">
                                            <v-text-field
                                                dense
                                                name="input_name"
                                                label="nombre" 
                                                v-model="step1.name" 
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
                                                v-model="step1.last_name" 
                                                :rules="[rules.required]" 
                                                filled rounded color="white" 
                                                prepend-inner-icon="mdi-card-account-details"
                                                @keydown.enter="submit">
                                            </v-text-field>
                                        </v-col>
                                        <v-col cols="12">
                                            <v-text-field
                                                dense
                                                name="input_email"
                                                label="nombre de usuario" 
                                                v-model="step1.username" 
                                                :rules="[rules.required, rules.username]" 
                                                filled rounded color="white" 
                                                prepend-inner-icon="mdi-account-circle"
                                                @keydown.enter="submit">
                                            </v-text-field>
                                        </v-col>
                                    </v-row>
                                    <div class="text-left py-1">
                                        <v-btn small elevation="1" color="accent" @click="stepper = 2">paso siguiente</v-btn>
                                        <!-- <v-btn small text class="ml-2">cancelar </v-btn> -->
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
                                                v-model="step2.email" 
                                                :rules="[rules.required, rules.email]" 
                                                filled rounded color="white" 
                                                prepend-inner-icon="mdi-email"
                                                @keydown.enter="submit">
                                            </v-text-field>
                                        </v-col>
                                        <v-col cols="6" class="pr-2">
                                           <v-text-field 
                                                name="input_password1"
                                                label="contraseña" 
                                                v-model="step2.password1"
                                                :rules="[rules.required, rules.password]"
                                                :type="step2.show_pass_1 ? 'text' : 'password'"
                                                :append-icon="step2.password1.length > 0 ? step2.show_pass_1 ? 'mdi-eye' : 'mdi-eye-off' : ''"
                                                filled rounded color="white" 
                                                prepend-inner-icon="mdi-lock"
                                                @click:append="step2.show_pass_1 = !step2.show_pass_1"
                                                @keydown.enter="submit">
                                            </v-text-field>
                                        </v-col>
                                        <v-col cols="6" class="pl-2">
                                            <v-text-field 
                                                name="input_password2"
                                                label="contraseña (confirmar)" 
                                                v-model="step2.password2"
                                                :rules="[rules.required, rules.password]"
                                                :type="step2.show_pass_2 ? 'text' : 'password'"
                                                :append-icon="step2.password2.length > 0 ? step2.show_pass_2 ? 'mdi-eye' : 'mdi-eye-off' : ''"
                                                filled rounded color="white" 
                                                prepend-inner-icon="mdi-lock"
                                                @click:append="step2.show_pass_2 = !step2.show_pass_2"
                                                @keydown.enter="submit">
                                            </v-text-field>
                                        </v-col>
                                      
                                    </v-row>
                                    
                                    <div class="text-left py-1">
                                        <!-- <v-btn small elevation="1" color="dark" @click="stepper = 2">continuar</v-btn> -->
                                        <v-btn small color="accent" @click="stepper = 1"> paso anterior </v-btn>
                                    </div>
                                </v-stepper-content>
                            </v-stepper>
                        </v-col>
                        <v-col cols="4" align-self="center" align="center">
                            <v-img src="@/assets/img/register.png" max-width="310px"/>
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col cols="8" class="px-16">
                            <v-btn @click="submit" color="accent" elevation="3" class="mb-4" x-large dense block rounded disabled>registrarme</v-btn> 
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
// import axios from "axios";


export default {
    data() {
        return {
            stepper: 1,

            step1: {
                valid: false,
                name: "",
                last_name: "",
                username: "",
            },
            step2: {
                valid: false,
                password1: "",
                password2: "",
                show_pass_1: false,
                show_pass_2: false,
                token: null
            },
            form: {
                valid: false,
                name: "",
                last_name: "",
                email: "",
                username: "",
                password: "",
                show_pass: false,
            },
            rules: {
                required: value => !!value || 'requerido',
                username: value => {
                    // const pattern = /^[\w.@+-]+/
                    const pattern = /^[a-z0-9@.+_-]{5,50}$/
                    return pattern.test(value) || "min. 5 caracteres, solo se admiten letras, números y los caracteres @/./+/-/_"
                },
                email: value => {
                    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                    return pattern.test(value) || "e-mail inválido"
                },
                password: value => {
                    const pattern = /^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).*$/
                    return pattern.test(value) || "min. 8 caracteres, una mayúscula, una minúscula, un dígito y un caracter especial";
                }
            },
        }
    },

    methods: {
        ...mapActions(["Register"]),
        
        validate () {
            this.$refs.form.validate()
        },
    
        async submit() {
            const registerData = new FormData();
            registerData.append("email", this.form.email);
            registerData.append("username", this.form.username);
            registerData.append("password", this.form.password);

            if(this.$refs.form.validate()) {
                try {
                     this.Register(registerData);
                     this.showSnackbar("green", true, true, "mdi-check", "Registro exitoso... redireccionando", "black", "ok" ) 
                     setTimeout(() => { this.$router.push('/documents') }, 1500);
                }
                catch { this.showSnackbar("red", true, true, "mdi-alert", "No se pudo completar el registro", "black", "ok" ); }
            }
            else { this.showSnackbar("red", true, true, "mdi-alert-circle", "Completa el formulario", "black", "ok"); }


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