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
                            <v-form ref="form" v-model="isValid" lazy-validation @submit.prevent="submit">

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
                                    :type="show_pass ? 'text' : 'password'"
                                    :append-icon="form.password.length > 0 ? show_pass ? 'mdi-eye' : 'mdi-eye-off' : ''"
                                    append-outer-icon="mdi-lock-question" 
                                    filled rounded color="white" 
                                    prepend-inner-icon="mdi-lock"
                                    @click:append="show_pass = !show_pass"
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
            isValid: false,
            show_pass: false,
            form: {
                email: "",
                password: "",
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

        submit() {
            if(this.$refs.form.validate()) { this.logUser(); }
            else { this.showSnackbar("red", true, true, "mdi-alert-circle", "Completa el formulario", "black", "ok"); }
        },

        async logUser() {
            try {
                const response = await this.LogIn(this.form)
                if (response.status == 200) { this.$router.push('/documents'); }
                else {
                    const items_snackbar = [];
                    Object.values(JSON.parse(response.body)).forEach(([val]) =>  {items_snackbar.push(val) })
                    this.showSnackbar(items_snackbar, "red", true, true, "mdi-alert-circle", "black", "ok"); 
                }
            }
            catch (err) { console.error(err) }
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