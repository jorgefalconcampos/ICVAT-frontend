<template>
    <v-container class="mt-12 bgblue border15">
        <v-row justify="space-around" class="text-center pa-8">
            <v-col cols="9">
                <div class="border10 glass-white-border">
                    <v-row no-gutters>
                        <v-col align-self="center" class="px-8" cols="6">
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
                         <v-col cols="6">
                            <v-img
                                class="border10-right"
                                lazy-src="https://images.unsplash.com/photo-1566228015668-4c45dbc4e2f5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80" 
                                src="https://images.unsplash.com/photo-1566228015668-4c45dbc4e2f5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80">
                            </v-img>
                        </v-col>
                    </v-row>
                 </div>
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
            form: {
                valid: false,
                email: "",
                username: "",
                password: "",
                show_pass: false,
            },
            rules: {
                required: value => !!value || 'requerido',
                email: value => {
                    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                    return pattern.test(value) || 'e-mail inválido'
                },
                password: value => {
                    const pattern = /^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).*$/
                    return pattern.test(value) || "Min. 8 caracteres, una mayúscula, una minúscula, un dígito y un caracter especial";
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