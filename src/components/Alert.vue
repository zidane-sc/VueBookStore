<template>
<v-snackbar v-model="alert" :color="color" multi-line top>
    {{ text }}
    <template v-slot:action="{ attrs }">
        <v-btn dark text v-bind="attrs" @click="close">
            <v-icon>mdi-close-circle</v-icon>
        </v-btn>
    </template>
</v-snackbar>
</template>

<script>
import {
    mapGetters,
    mapActions
} from 'vuex'
export default {
    name: 'alert',
    computed: {
        ...mapGetters({
            status: 'alert/status',
            color: 'alert/color',
            text: 'alert/text'
        }),
        alert: {
            get() {
                return this.status
            },
            set(value) {
                console.log('value = ' + value);
                this.setAlert({
                    status: value,
                    // color: 'success',
                    // text: 'test',
                })
            }
        },
    },
    methods: {
        ...mapActions({
            setAlert: 'alert/set',
        }),
        close() {
            this.setAlert({
                status: false
            })
        }
    }
}
</script>
