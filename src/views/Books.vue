<template>
<div>
    <v-container grid-list-sm class="ma-0 pa-0">
        <v-subheader>
            All Books
        </v-subheader>

        <v-layout wrap>
            <v-flex xs6 v-for="(book) in books" :key="`book-` + book.id">
                <v-card to="'/book/' + book.slug">
                    <book-item :book="book" />
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>

    <template>
        <div class="text-center">
            <v-pagination :length="lengthPage" v-model="page" @input="go" :total-visible="5"></v-pagination>
        </div>
    </template>
</div>
</template>

<script>
export default {
    components: {
        BookItem: () => import(/* webpackChunkName: "book-item" */'@/components/BookItem.vue')
    },
    data: () => ({
        books: [],
        page: 0,
        lengthPage: 0,
    }),
    created() {
        this.go()
    },
    methods: {
        go() {
            let url = '/books?page=' + this.page
            this.axios.get(url)
                .then((response) => {
                    let {
                        data
                    } = response.data
                    let {
                        meta
                    } = response.data
                    this.books = data
                    // jumlah halaman di dapat dari meta endpoint books
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
