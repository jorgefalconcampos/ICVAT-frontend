<template>
    <!--

        items [array]: array of strings with the messages to display in the snackbars as a stack
        ┣ thanks to https://www.codeply.com/p/Zm6qNmPCNv
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
    <div>
        <v-snackbar
            :style="{'margin-bottom':calcMargin(index)}" 
            v-for="(itemText ,index) in items" :key="index" 
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
                
            {{itemText}}
                
            <template v-slot:action="{ attrs }">
                <v-btn
                    :color="closeSnackBtnColor"
                    text
                    v-bind="attrs"
                    @click="hide(index)"
                >
                {{closeSnackBtnTxt}}
                </v-btn>
            </template>
        </v-snackbar>
    </div>
    
</template>

<script>
export default {
    name: "SnackBar",
    data() {
        return{
            items: [],

            showSnackbar: false,
            color: null,
            timeout: null,
            outlined: null,
            multiline: null,
            right: null,
            top: null,

            show_icon: null,
            icon: null,

            // message: null,

            closeSnackBtnColor: null,
            closeSnackBtnTxt: null,
        }
    },

    methods:{
        show(data) {

            this.items = data.items
            
            this.color = data.color || 'success'
            this.timeout = data.timeout || 5500
            this.outlined = data.outlined || false
            this.multiline = data.multiline || false
            this.right = data.right || false
            this.top = data.top || false

            this.show_icon = data.show_icon || false
            this.icon = data.icon || 'mdi-check',

            // this.message = data.message || 'missing "message".'
            
            this.closeSnackBtnColor = data.closeSnackBtnColor,
            this.closeSnackBtnTxt = data.closeSnackBtnTxt,

            this.showSnackbar = true
        },
        calcMargin(index) {
            return (index*60) + 'px'
        },
        hide(index){
            this.items.splice(index,1)
        }
    }
}
</script>