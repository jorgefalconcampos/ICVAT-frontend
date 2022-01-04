<template>
    <v-container class="mt-4 bgblue border15">
        <v-row justify="space-around" class="text-center pa-8">
            <v-col cols="9">
                <div class="border10 glass">
                    <v-row no-gutters>
                        <v-col  align-self="center" cols="6" class="px-8">
                            <v-img 
                                max-height="305px"
                                lazy-src="https://images.unsplash.com/photo-1566228015668-4c45dbc4e2f5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80" 
                                src="https://images.unsplash.com/photo-1566228015668-4c45dbc4e2f5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80">
                            </v-img> 
                        </v-col>
                        <v-col align-self="center" cols="6" class="pa-11" >
                            <p class="big-title pb-6">Inicia sesión</p>
                            <!-- <p class="pb-5">Inicia sesión en tu cuenta</p> -->
                            <!-- <v-text-field solo rounded color="white" label="Preddpend" prepend-icon="mdi-map-marker"></v-text-field> -->
                            <!-- <v-text-field solo rounded color="blue" label="Prepend inner" prepend-inner-icon="mdi-map-marker"></v-text-field> -->

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
                                    v-model="form.password"
                                    :rules="[rules.required, rules.min]"
                                    :type="form.show_pass ? 'text' : 'password'"
                                    :append-icon="form.password.length > 0 ? form.show_pass ? 'mdi-eye' : 'mdi-eye-off' : ''"
                                    append-outer-icon="mdi-lock-question" 
                                    filled rounded color="white" 
                                    prepend-inner-icon="mdi-lock"
                                    @click:append="form.show_pass = !form.show_pass"
                                    @click:append-outer="redirectForgotPass">
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

    data() {
        return {
            form: {
                valid: true,
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

        redirectForgotPass(){
            alert("redireccionar")
        },

        // validate () {
        //     this.$refs.form.validate ();
        // },

        async submit() {
            const User = new FormData();
            User.append("email", this.form.email);
            User.append("username", this.form.password);

            try {
                await this.LogIn(User);
                alert("logged in!!");
            }
            catch (err) {
                alert("error!")
            }
        }
    }
}
</script>