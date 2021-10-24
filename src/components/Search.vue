<template>
<v-card>
    <v-toolbar dark color="primary">
        <v-btn icon dark @click.native="close">
            <v-icon>mdi-close</v-icon>
        </v-btn>

        <v-text-field
            hide-details
            append-icon="mdi-microphone"
            flat
            autofocus
            label="Search"
            prepend-inner-icon="mdi-magnify"
            v-model="keyword"
            @input="doSearch"
        ></v-text-field>
    </v-toolbar>
    <v-card-text>
        <v-subheader v-if="keyword.length > 0">
            Result Search "{{ keyword }}"
        </v-subheader>

        <v-alert color="warning" :value="books.length == 0 && keyword.length > 0">
            Sorry, but no results were found.
        </v-alert>

        <!-- Hasil perncarian ditampilkan disini -->
        <v-container grid-list-sm class="ma-0 pa-0">
            <v-layout wrap>
                <v-flex v-for="(book) in books" :key="`book` + book.id">
                    <book-item :book="book" @click.native="close"/>                    
                </v-flex>
            </v-layout>            
        </v-container>
    </v-card-text>
</v-card>
</template>

<script>
export default {
    name: 'search',
    components: {
        BookItem: () => import(/* webpackChunkName: "book-item" */'@/components/BookItem.vue')
    },
    data() {
        return {
            keyword: '',
            books: []
        }
    },
    methods: {
        doSearch() {
            let keyword = this.keyword
            if (keyword.length > 0) {
                this.axios.get('/books/search/' + keyword)
                    .then((response) => {
                        let { data } = response.data
                        this.books = data
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            } else {
                this.books = []
            }
        },
        close() {
            this.$emit('closed', false)
        }
    },
}
</script>