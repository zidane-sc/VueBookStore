<template>
<v-app>
    <v-app-bar app color="primary" dark v-if="isHome">
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <v-toolbar-title>{{ appName }}</v-toolbar-title>
        <!-- pemisah konten -->
        <v-spacer></v-spacer>
        <v-btn icon @click="setDialogComponent('cart')">
            <v-badge color="orange" overlap v-if="countCart > 0">
                <template v-slot:badge>
                    <span>{{ countCart }}</span>
                </template>
                <v-icon>mdi-cart</v-icon>
            </v-badge>
            <v-icon v-else>mdi-cart</v-icon>
        </v-btn>
        <v-text-field slot="extension" hide-details append-icon="mdi-microphone" solo-inverted flat label="Search" prepend-inner-icon="mdi-magnify" @click="setDialogComponent('search')"></v-text-field>
    </v-app-bar>

    <v-app-bar app class="primary" dark v-else>
        <v-btn icon @click.stop="$router.go(-1)">
            <v-icon>mdi-arrow-left-circle</v-icon>
        </v-btn>

        <v-spacer></v-spacer>

        <v-btn icon @click="setDialogComponent('cart')">
            <v-badge color="orange" overlap v-if="countCart > 0">
                <template v-slot:badge>
                    <span>{{ countCart }}</span>
                </template>
                <v-icon>mdi-cart</v-icon>
            </v-badge>
            <v-icon v-else>mdi-cart</v-icon>
        </v-btn>
    </v-app-bar>

    <v-card>
        <v-navigation-drawer app v-model="drawer">
            <v-list>
                <v-list-item v-if="!guest">
                    <v-list-item-avatar>
                        <v-img :src="
                  user.avatar != null
                    ? getImage('/users/' + user.avatar)
                    : getImage('')
                "></v-img>
                    </v-list-item-avatar>
                    <v-list-item-content>
                        <v-list-item-title>{{ user.name }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>

                <div class="pa-2" v-if="guest">
                    <v-btn block color="primary" class="mb-1" @click="setDialogComponent('login')">
                        <v-icon left>mdi-lock</v-icon>
                        Login
                    </v-btn>
                    <v-btn block color="success" @click="setDialogComponent('register')">
                        <v-icon left>mdi-account</v-icon>
                        Register
                    </v-btn>
                </div>

                <v-divider></v-divider>

                <v-list shaped>
                    <template v-for="(item, index) in menus">
                        <v-list-item :key="`menu-` + index" :to="item.route" v-if="!item.auth || (item.auth && !guest)">
                            <v-icon left>{{ item.icon }}</v-icon>
                            <v-list-item-content>
                                <v-list-item-title>{{ item.title }}</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </template>
                </v-list>
            </v-list>

            <template v-slot:append v-if="!guest">
                <div class="pa-2">
                    <v-btn block color="red" dark @click="logout">
                        <v-icon left>mdi-lock</v-icon>
                        Logout
                    </v-btn>
                </div>
            </template>
        </v-navigation-drawer>
    </v-card>

    <v-main>
        <alert />

        <keep-alive>
            <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialogbottom-transition">
                <component :is="currentComponent" @closed="setDialogStatus">
                </component>
            </v-dialog>
        </keep-alive>

        <v-container fluid>
            <v-slide-y-transition>
                <router-view></router-view>
            </v-slide-y-transition>
        </v-container>
    </v-main>

    <v-card>
        <v-footer absolute app>
            <v-card-text class="text-center">
                &copy; {{ new Date().getFullYear() }} — <strong>Vueshop</strong>
            </v-card-text>
        </v-footer>
    </v-card>
</v-app>
</template>

<script>
import {
    mapActions,
    mapGetters
} from "vuex";
export default {
    name: "App",
    components: {
        Alert: () =>
            import( /* webpackChunkName: "alert" */ "@/components/Alert.vue"),
        Search: () =>
            import( /* webpackChunkName: "search" */ "@/components/Search.vue"),
        Login: () =>
            import( /* webpackChunkName: "login" */ "@/components/Login.vue"),
        Register: () =>
            import( /* webpackChunkName: "register" */ "@/components/Register.vue"),
        Cart: () => import( /* webpackChunkName: "cart" */ "@/components/Cart.vue"),
    },
    data: () => ({
        drawer: false,
        menus: [{
                title: "Home",
                icon: "mdi-home",
                route: "/",
            },
            {
                title: "Profile",
                icon: "mdi-account",
                route: "/profile",
                auth: true,
            },
            {
                title: "My Order",
                icon: "mdi-shopping",
                route: "/my-order",
                auth: true,
            },
            {
                title: "About",
                icon: "mdi-help-box",
                route: "/about",
            },
        ],
    }),
    methods: {
        ...mapActions({
            setDialogStatus: "dialog/setStatus",
            setDialogComponent: "dialog/setComponent",
            setAuth: "auth/set",
            setAlert: "alert/set",
        }),
        logout() {
            let config = {
                headers: {
                    Authorization: "Bearer " + this.user.api_token,
                },
            };

            this.axios
                .post("/logout", {}, config)
                .then((response) => {
                    this.setAuth({}); // kosongkan auth ketika logout

                    this.setAlert({
                        status: true,
                        color: "success",
                        text: response.data.message,
                    });
                })
                .catch((error) => {
                    let {
                        data
                    } = error.response;

                    this.setAlert({
                        status: true,
                        color: "error",
                        text: data.message,
                    });
                });
        },
    },
    computed: {
        isHome() {
            return this.$route.path === "/";
        },
        ...mapGetters({
            countCart: "cart/count",
            guest: "auth/guest",
            user: "auth/user",
            dialogStatus: "dialog/status",
            currentComponent: "dialog/component",
        }),
        dialog: {
            get() {
                return this.dialogStatus;
            },
            set(value) {
                this.setDialogStatus(value);
            },
        },
    },
};
</script>
