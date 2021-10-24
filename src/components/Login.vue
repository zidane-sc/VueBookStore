<template>
<v-card>
    <v-toolbar dark color="primary">
        <v-btn icon @click.native="close">
            <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>Login and start shoping!</v-toolbar-title>
    </v-toolbar>
    <v-divider></v-divider>

    <v-container fluid>
        <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field v-model="email" :rules="emailRules" label="E-mail" required append-icon="mdi-email"></v-text-field>
            <v-text-field v-model="password" :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'" :rules="passwordRules" :type="showPassword ? 'text' : 'password'" label="Password" hint="At least 6 characters" counter @click:append="showPassword = !showPassword"></v-text-field>

            <div class="text-xs-center">
                <v-btn color="accent lighten-1" :disabled="!valid" @click="submit">Login
                    <v-icon right dark>mdi-lock-open</v-icon>
                </v-btn>
            </div>
        </v-form>
    </v-container>
</v-card>
</template>

<script>
import {
    mapGetters,
    mapActions
} from "vuex";
export default {
    name: "login",
    data() {
        return {
            valid: true,
            email: "lou56@example.org",
            emailRules: [
                (v) => !!v || "E-mail is required",
                (v) =>
                /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
                "E-mail must be valid",
            ],
            showPassword: false,
            password: "",
            passwordRules: [
                (v) => !!v || "Password required.",
                (v) => (v && v.length >= 6) || "Min 6 characters",
            ],
        };
    },
    computed: {
        ...mapGetters({
            user: "auth/user",
        }),
    },
    methods: {
        ...mapActions({
            setAlert: "alert/set",
            setAuth: "auth/set",
            prevUrl : 'prevUrl', // <= ini
        }),
        submit() {
            if (this.$refs.form.validate()) {
                let formData = {
                    email: this.email,
                    password: this.password,
                };

                this.axios
                    .post("/login", formData)
                    .then((response) => {
                        let {
                            data
                        } = response.data;

                        this.setAuth(data);
                        if (this.user.id > 0) {
                            this.setAlert({
                                status: true,
                                color: "success",
                                text: "Login Success",
                            });

                            if(this.prevUrl.length>0) this.$router.push(this.prevUrl) //tambahkan ini
                            this.close();
                        } else {
                            this.setAlert({
                                status: true,
                                color: "error",
                                text: "Login Failed",
                            });
                        }
                    })
                    .catch((error) => {
                        console.log(error.response.data.message);

                        this.setAlert({
                            status: true,
                            color: "error",
                            text: error.response.data.message,
                        });
                    });
            }
        },
        close() {
            this.$emit("closed", false);
        },
    },
};
</script>
