<template>
    <!--
        message [string]: the main text in the snackbar
        ---------
        color [string]: the snackbar color
        timeout [number]: time in miliseconds the snackbar will be shown
        outlined [boolean]: if the snackbar is outlined
        multiline [boolean]: if the snackbar is multi lined
        right [boolean]: if the snackbar is located at the right, if false, set to default (centered)

        ---------
        closeSnackBtnTxt [string]: the text for the close snackbar button
        closeSnackBtnColor [string]: the color for the close snackbar button

    -->
    <v-snackbar
        v-model="showSnackbar"
        :color="color"
        :timeout="timeout"
        :outlined="outlined"
        :multi-line="multiline"
        elevation=2
        :right="right"
        :top="top"
    >
        <v-icon v-if="show_icon" left>{{icon}}</v-icon>
            
        {{message}}
            
        <template v-slot:action="{ attrs }">
            <v-btn
                :color="closeSnackBtnColor"
                text
                v-bind="attrs"
                @click="showSnackbar = false"
            >
            {{closeSnackBtnTxt}}
            </v-btn>
        </template>
    </v-snackbar>
</template>

<script>
export default {
    name: "SnackBar",
    data() {
        return{
            showSnackbar: false,
            color: null,
            timeout: null,
            outlined: null,
            multiline: null,
            right: null,
            top: null,

            show_icon: null,
            icon: null,

            message: null,

            closeSnackBtnColor: null,
            closeSnackBtnTxt: null,
        }
    },
    methods:{
        show(data) {
            this.color = data.color || 'success'
            this.timeout = data.timeout || 2500
            this.outlined = data.outlined || false
            this.multiline = data.multiline || false
            this.right = data.right || false
            this.top = data.top || false

            this.show_icon = data.show_icon || false
            this.icon = data.icon || 'mdi-check',

            this.message = data.message || 'missing "message".'
            
            this.closeSnackBtnColor = data.closeSnackBtnColor,
            this.closeSnackBtnTxt = data.closeSnackBtnTxt,

            this.showSnackbar = true
        }
    }
}
</script>