<template>
    <v-container class="mt-12 bgblue border15">
        <v-row justify="space-around" class="text-center pa-8">
            <v-col cols="9">
                <div class="border10 glass">
                    <v-row no-gutters>
                        <v-col cols="6">
                            <v-img
                                class="border10-left"
                                max-height="450px"
                                lazy-src="https://images.unsplash.com/photo-1566228015668-4c45dbc4e2f5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80" 
                                src="https://images.unsplash.com/photo-1566228015668-4c45dbc4e2f5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80">
                            </v-img>
                        </v-col>
                        <v-col align-self="center" class="px-8" cols="6">
                            <p class="big-title">¡Hola!</p>
                            <p class="pb-5">Inicia sesión en tu cuenta</p>
                            <!-- <v-text-field solo rounded color="white" label="Preddpend" prepend-icon="mdi-map-marker"></v-text-field> -->
                            <!-- <v-text-field solo rounded color="blue" label="Prepend inner" prepend-inner-icon="mdi-map-marker"></v-text-field> -->

                            <v-text-field 
                                name="input_username"
                                label="username" 
                                v-model="username" 
                                :rules="[rules.required, rules.email]" 
                                hint="el email con el que te registraste a ICVAT" 
                                clearable filled rounded color="white" 
                                prepend-inner-icon="mdi-account-circle">
                            </v-text-field>

                            <v-text-field 
                                class="py-1" 
                                name="input_password"
                                label="password" 
                                v-model="password"
                                :rules="[rules.required, rules.min]"
                                :type="show_pass ? 'text' : 'password'"
                                :append-icon="show_pass ? 'mdi-eye' : 'mdi-eye-off'"
                                clearable filled rounded color="white" 
                                prepend-inner-icon="mdi-lock"
                                @click:append="show_pass = !show_pass">
                            </v-text-field>
                            
                            <v-btn color="accent" elevation="3" x-large dense block rounded>iniciar sesión</v-btn>
                        </v-col>
                    </v-row>
                 </div>
            </v-col>
        </v-row>

    </v-container>
</template>

<script>
export default {
    data() {
        return {
            username: "",
            password: "",
            show_pass: false,
            
            rules: {
                required: value => !!value || 'requerido',
                email: value => {
                    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                    return pattern.test(value) || 'e-mail inválido'
                },
            }
        }
    }
}
</script>