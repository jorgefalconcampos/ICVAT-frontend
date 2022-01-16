<template>
    <v-container fluid fill-height>
        <v-row justify="center" align="center" class="text-center ma-12 pa-8 bgblue border15">
            <v-col cols="9">
                <div class="border10 glass-white-border">
                    <v-row no-gutters>
                        <v-col align-self="center" cols="6">
                            <v-img src="@/assets/img/login.png" max-width="440px"/>
                        </v-col>
                        <v-col cols="6" class="pa-12" >
                            <p class="big-title pb-6">Inicia sesión</p>
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
                                    name="input_password"
                                    label="contraseña" 
                                    v-model="form.password"
                                    :rules="[rules.required]"
                                    :type="form.show_pass ? 'text' : 'password'"
                                    :append-icon="form.password.length > 0 ? form.show_pass ? 'mdi-eye' : 'mdi-eye-off' : ''"
                                    append-outer-icon="mdi-lock-question" 
                                    filled rounded color="white" 
                                    prepend-inner-icon="mdi-lock"
                                    @click:append="form.show_pass = !form.show_pass"
                                    @click:append-outer="$router.push('/reset-password')"
                                    @keydown.enter="submit">
                                </v-text-field>
                            
                                <v-btn @click="submit" color="accent" elevation="3" class="mb-4" x-large dense block rounded>iniciar sesión</v-btn>
                                
                            </v-form>

                            <p class="small-txt">¿No tienes una cuenta? 
                                <router-link to="/register/">
                                    Crea tu cuenta
                                </router-link>   
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

export default {

    components: {
    },

    data() {
        return {
            form: {
                valid: false,
                email: "",
                password: "",
                show_pass: false,
            },
            rules: {
                required: value => !!value || 'requerido',
                email: value => {
                    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                    return pattern.test(value) || 'e-mail inválido'
                },
            }
        }
    },
    methods: {
        ...mapActions(["LogIn"]),

        validate () {
            this.$refs.form.validate()
        },

        async submit() {
            const loginData = new FormData();
            loginData.append("email", this.form.email);
            loginData.append("password", this.form.password);

            if(this.$refs.form.validate()) {
                try {
                    await this.LogIn(loginData); this.$router.push("/documents");
                }
                catch { this.showSnackbar("red", true, true, "mdi-alert", "No se pudo iniciar sesión", "black", "ok" ); }
            }
            else 
            { this.showSnackbar("red", true, true, "mdi-alert-circle", "Completa el formulario", "black", "ok"); }
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