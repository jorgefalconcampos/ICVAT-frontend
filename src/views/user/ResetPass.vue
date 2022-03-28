<template>
    <v-container fluid fill-height class="bgblue">
        <v-row justify="space-around" class="text-center pa-2 pa-sm-5 pa-md-8 pa-lg-9 border15">
            <v-col cols="12">
                <v-stepper v-model="stepper" class="glass-white-border">
                    <v-stepper-header class="glass border10-top">
                        <v-stepper-step :color="this.stepper>1?'green':'black'" :complete="stepper > 1" step="1">Ingresa tu email</v-stepper-step>
                        <v-divider></v-divider>
                        <v-stepper-step :color="this.stepper>2?'green':'black'" :complete="stepper>2" step="2">Recibe un mail de confirmación</v-stepper-step>
                        <v-divider></v-divider>
                        <v-stepper-step :color="this.passReseted?'green':'black'" :complete="this.passReseted" step="3">Ingresa tu nueva contraseña</v-stepper-step>    
                    </v-stepper-header>
                    
                    <v-stepper-items>
                        <v-stepper-content step="1">
                            <!-- Step 1 -->
                            <v-progress-linear
                                v-if="step1.loading"
                                height="2"
                                indeterminate
                                absolute top
                                color="white">
                            </v-progress-linear>

                            <v-row no-gutters class="d-flex justify-center">
                                <v-col align-self="center" cols="12" sm="10" md="9" lg="8" xl="8" class="pt-6 px-11" >
                                    <p class="big-title pb-2">Recupera tu contraseña</p>
                                    <p class="pb-6">Si perdiste u olvidaste tu contraseña, escribe el email con el que te registraste y sigue las instrucciones</p>

                                    <div class="px-md-8 mx-sm-5 px-md-16 mx-md-10">
                                        <v-form ref="s1_form" v-model="step1.valid" lazy-validation @submit.prevent="s1_submit">
                                            <v-text-field
                                                name="input_email"
                                                label="email" 
                                                v-model="step1.email" 
                                                :rules="[rules.required, rules.email]" 
                                                filled rounded color="white" 
                                                prepend-inner-icon="mdi-email"
                                                @keydown.enter="s1_submit">
                                            </v-text-field>                                            
                                            <v-btn 
                                                @click="s1_submit" 
                                                color="accent" 
                                                elevation="3" 
                                                class="mb-4" 
                                                x-large dense block rounded>
                                                continuar
                                            </v-btn>
                                            
                                        </v-form>
                                    </div>
                                    <p class="mt-7 small-txt">O bien, <router-link to="/login/">inicia sesión</router-link></p>

                                </v-col>
                            </v-row>

                            <!-- <v-row class="ma-3 d-flex justify-end">
                                <v-btn text>Cancelar</v-btn>
                                <v-btn color="primary" @click="stepper = 2">Continuar</v-btn>
                            </v-row> -->
                        </v-stepper-content>
                        
                        <v-stepper-content step="2">
                            <!-- Step 2 -->
                            <v-row no-gutters class="d-flex justify-center">
                                <v-col align-self="center" cols="12" sm="10" md="9" lg="8" xl="8" class="pt-6 px-10">
                                    <p class="big-title pb-2">Email enviado <span>🚀</span></p>
                                    <p>Enviamos un email a <span class="font-weight-bold">{{r_email}}</span> con las instrucciones para restablecer tu contraseña
                                        <v-tooltip bottom>
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-icon aria-hidden="false" v-bind="attrs" v-on="on">mdi-information-outline</v-icon>
                                            </template>
                                            <span>Revisa tu carpeta de SPAM en caso de no encontrar el mensaje</span>
                                        </v-tooltip>
                                    </p>

                                    <div class="px-md-8 mx-sm-5 px-md-16 mx-md-10">
                                        <p class="pt-7 small-txt">Si no lo recibes en 5 minutos, puedes enviarlo de nuevo</p>
                                        <h2 id="countdown" class="display-3 py-3">5:00</h2>
                                        <v-btn @click="s2_submit(true)" color="accent" elevation="3" class="my-8" :disabled="step2.btnResendDisabled"  x-large dense block rounded>enviar de nuevo</v-btn>
                                    </div>

                                </v-col>
                            </v-row>
                             <!-- <v-row class="ma-3 d-flex justify-end">
                                <v-btn text>Cancelar</v-btn>
                                <v-btn color="primary" @click="stepper = 3">Continuar</v-btn>
                            </v-row> -->
                        </v-stepper-content>

                        <v-stepper-content step="3">
                            <!-- Step 3 -->
                            <v-row no-gutters class="d-flex justify-center">
                                <v-col align-self="center" cols="12" sm="10" md="9" lg="8" xl="8" class="pt-6 px-11">
                                    <p class="big-title pb-2">Escribe tu nueva contraseña</p>
                                    <p class="pb-6">¡Esta vez recuérdala bien!</p>

                                    <div class="px-md-8 mx-sm-5 px-md-16 mx-md-10">
                                        <v-form ref="s3_form" v-model="step3.valid" lazy-validation @submit.prevent="s3_submit">

                                            <v-text-field 
                                                name="input_password"
                                                label="contraseña" 
                                                v-model="step3.password1"
                                                :rules="[rules.required, rules.password]"
                                                :type="step3.show_pass_1 ? 'text' : 'password'"
                                                :append-icon="step3.password1.length > 0 ? step3.show_pass_1 ? 'mdi-eye' : 'mdi-eye-off' : ''"
                                                filled rounded color="white" 
                                                prepend-inner-icon="mdi-lock"
                                                @click:append="step3.show_pass_1 = !step3.show_pass_1"
                                                @keydown.enter="s3_submit">
                                            </v-text-field>

                                            <v-text-field 
                                                name="input_password_repeat"
                                                label="contraseña (confirmación)" 
                                                v-model="step3.password2"
                                                :rules="[rules.required, rules.password]"
                                                :type="step3.show_pass_2 ? 'text' : 'password'"
                                                :append-icon="step3.password2.length > 0 ? step3.show_pass_2 ? 'mdi-eye' : 'mdi-eye-off' : ''"
                                                filled rounded color="white" 
                                                prepend-inner-icon="mdi-lock"
                                                @click:append="step3.show_pass_2 = !step3.show_pass_2"
                                                @keydown.enter="s3_submit">
                                            </v-text-field>
                                            <v-btn @click="s3_submit" color="accent" elevation="3" class="mb-8" x-large dense block rounded>restablecer contraseña</v-btn>  
                                        </v-form>
                                    </div>
                                </v-col>
                            </v-row>

                            <!-- <v-row class="ma-3 d-flex justify-end">
                                <v-btn text>Cancelar</v-btn>
                                 <v-btn color="primary" @click="stepper = 1">Continue</v-btn>
                            </v-row>                            -->
                        </v-stepper-content>


                    </v-stepper-items>
                </v-stepper>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>

import axios from 'axios';

export default {



    mounted() {
        // this.baseURL = `${process.env.BASE_URL}/reset-password`;
        this.getAndShowStep()
    },

 

    components: {
    },

    data() {
        return {
            stepper: 3,


            passReseted: false,

            r_email: null,


            step1: {
                valid: false,
                email: "",
                loading: false,
            },
            step2: {
                btnResendDisabled: true
            },
            step3: {
                valid: false,
                password1: "",
                password2: "",
                show_pass_1: false,
                show_pass_2: false,
                token: null
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
            }
        }
    },
    methods: {

        getAndShowStep(){
            const searchParams = window.location.search;
            if (searchParams) {
                const urlParams = new URLSearchParams(searchParams);
                if (urlParams.has("t")) {
                    const token = urlParams.get("t");
                    this.step3.token = token
                    this.stepper = 3;
                }
            }
        },
       
        validate (step) {
            this.$refs[step].validate()
        },

        startTimeout() {
            let time = 5*60; // 5 minutes
            const elem = document.getElementById('countdown');
            var timerCount = window.setInterval(updateCountdown, 1000);
            var _this = this;
            
            function updateCountdown() {
                if(time == -1) {
                    clearTimeout(timerCount);
                    _this.step2.btnResendDisabled = false;
                }
                else {
                    const minutes = Math.floor(time/60);
                    let seconds = time % 60;
                    seconds = seconds < 10 ? '0' + seconds : seconds;
                    elem.innerHTML = `${minutes}:${seconds}`;
                    time--;
                }
            }
        },

        async s1_submit() {
            if(this.$refs.s1_form.validate("s1_form")) {
                try {
                    this.r_email = this.step1.email;
                    // localStorage.setItem('resetPwdEmail', this.step1.email);
                    this.s2_submit(false); // call s2_submit here
                }
                catch { this.showSnackbar("red", true, true, "mdi-alert", "No se pudo enviar el email", "black", "ok" ); }
            }
            else 
            { this.showSnackbar("red", true, true, "mdi-alert-circle", "Corrige el formulario", "black", "ok"); }
        },

        async s2_submit(is_resend) {
            this.step1.loading = true;
            const data = new FormData();
            let email = this.r_email;
            data.append("email", email);
            try {
                const response = await axios.post("user/password-reset/", data, {});
                if ((response.status === 200) && (response.data.status==="OK")) {
                    this.startTimeout()
                    this.step2.btnResendDisabled = true;
                    is_resend ? this.showSnackbar("green", true, true, "mdi-check", `Email reenviado a ${email}`, "black", "ok" ) : ''
                    this.stepper = 2;
                }
            }
            catch { this.showSnackbar("red", true, true, "mdi-alert", `No se pudo enviar el email a ${email}`, "black", "ok" ); }
            finally { this.step1.loading = false; }

        },

        async s3_submit() {
            if(this.$refs.s3_form.validate("s3_form")) {
                alert(this.step3.password1)
                alert(this.step3.token)
                if (this.step3.password1 === this.step3.password2) {
                    try {
                        const pwdResetData = new FormData();
                        pwdResetData.append("password", this.step3.password1);
                        pwdResetData.append("token", this.step3.token);
                        const response = await axios.post("user/password-reset/confirm/", pwdResetData, {});
                        if ((response.status === 200) && (response.data.status==="OK")) {
                            this.step3.password1 = null; this.step3.password2 = null; this.step3.token = null;
                            this.showSnackbar("green", true, true, "mdi-check", "Contraseña actualizada... redireccionando al inicio de sesión", "black", "ok" ) 
                            setTimeout(() => { this.$router.push('/login') }, 3000);
                        }
                    }
                    catch { this.showSnackbar("red", true, true, "mdi-alert", "No se pudo restablecer la contraseña", "black", "ok" ); }
                }
                else{ this.showSnackbar("red", true, true, "mdi-alert-circle", "Las contraseñas no coinciden", "black", "ok"); }
            }
            else{ this.showSnackbar("red", true, true, "mdi-alert-circle", "Corrige el formulario", "black", "ok"); }
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