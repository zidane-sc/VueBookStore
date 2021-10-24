<template>
<div>
    <v-container grid-list-sm class="ma-0 pa-0">
        <v-subheader>
            All Category
        </v-subheader>

        <v-layout wrap>
            <v-flex xs6 v-for="(category) in categories" :key="`category-` + category.slug">
                <v-card to="'/category/' + category.slug">
                    <v-img :src="category.image != '' ? getImage('/categories/' + category.image) : getImage('')" class="white--text">
                        <v-card-title class="fill-height align-end" v-text="category.name">

                        </v-card-title>
                    </v-img>
                </v-card>
            </v-flex>
        </v-layout>
        <v-pagination v-model="page" @input="go" :length="lengthPage" :total-visible="5">
        </v-pagination>
    </v-container>
</div>
</template>

<script>
export default {
    data: () => ({
        categories: [],
        page: 0,
        lengthPage: 0,
    }),
    created() {
        this.go()
    },
    methods: {
        go() {
            let url = '/categories?page=' + this.page
            this.axios.get(url)
                .then((response) => {
                    let { data } = response.data
                    let { meta } = response.data
                    this.categories = data
                    this.page = meta.current_page
                    this.lengthPage = meta.last_page
                    console.log(meta);
                })
                .catch((error) => {
                    let {
                        responses
                    } = error
                    console.log(responses);
                })
        }
    }
}
</script>
