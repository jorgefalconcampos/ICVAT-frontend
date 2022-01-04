<template>
    <v-container class="mt-12 bgblue border15">
        <v-row justify="space-around" class="text-center pa-8">
            <v-col cols="9">
                <div class="border10 glass">
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
                                    prepend-inner-icon="mdi-email">
                                </v-text-field>

                                <v-text-field 
                                    name="input_password"
                                    label="contraseña" 
                                    v-model="form.password1"
                                    :rules="[rules.required, rules.min]"
                                    :type="form.show_pass_1 ? 'text' : 'password'"
                                    :append-icon="form.show_pass_1 ? 'mdi-eye' : 'mdi-eye-off'"
                                    clearable filled rounded color="white" 
                                    prepend-inner-icon="mdi-lock"
                                    @click:append="form.show_pass_1 = !form.show_pass_1">
                                </v-text-field>

                                <v-text-field 
                                    name="input_password_repeat"
                                    label="contraseña (confirmar)" 
                                    v-model="form.password2"
                                    :rules="[rules.required, rules.min]"
                                    :type="form.show_pass_2 ? 'text' : 'password'"
                                    :append-icon="form.show_pass_2 ? 'mdi-eye' : 'mdi-eye-off'"
                                    clearable filled rounded color="white" 
                                    prepend-inner-icon="mdi-lock"
                                    @click:append="form.show_pass_2 = !form.show_pass_2">
                                </v-text-field>

                                <v-btn color="accent" elevation="3" class="mb-4" x-large dense block rounded>registrarme</v-btn>

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

export default {
    data() {
        return {
            form: {
                email: "",
                password1: "",
                password2: "",
                show_pass_1: false,
                show_pass_2: false,
            },
            rules: {
                required: value => !!value || 'requerido',
                email: value => {
                    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                    return pattern.test(value) || 'e-mail inválido'
                },
            },
        }
    },

    methods: {
        ...mapActions(["Register"]),
    
        async submit() {
            try {
                alert("submit")
                await this.Register(this.form);
                // this.$router.push("/posts");
            }
            catch (err) {
                alert("error");
            }

        }
    }
}
</script>