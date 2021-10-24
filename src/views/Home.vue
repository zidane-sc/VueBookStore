<template>
<div>
    <!-- template categries -->
    <v-container class="ma-0 pa-0" grid-list-sm>
        <div class="text-right">
            <v-btn small text to="/categories" class="blue--text">
                All Categories <v-icon>mdi-chevron-right</v-icon>
            </v-btn>
        </div>
        <v-layout wrap>
            <v-flex v-for="(category) in categories" :key="`category-`+category.id" xs6>
                <v-card :to="'/category/'+ category.slug">
                    <v-img :src="category.image != '' ? getImage('/categories/' + category.image) : getImage('')" class="white--text">
                        <v-card-title class="fill-height align-end" v-text="category.name"></v-card-title>
                    </v-img>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>

    <!-- template books -->
    <v-container class="ma-0 pa-0 mt-2" grid-list-sm>
        <div class="text-right">
            <v-btn small text to="/books" class="blue--text">
                All Books <v-icon>mdi-chevron-right</v-icon>
            </v-btn>
        </div>
        <v-layout wrap>
            <v-flex v-for="(book) in books" :key="`book-`+book.id" xs6>
                <book-item :book="book" />
            </v-flex>
        </v-layout>
    </v-container>
</div>
</template>

<script>
export default {
    components: {
        BookItem: () => import(/* webpackChunkName: "book-item" */'@/components/BookItem.vue')
    },
    data: () => ({
        categories: [],
        books: []
    }),
    created() {
        console.log('get data random categories');
        this.axios.get('/categories/random/2')
            .then((response) => {
                let {
                    data
                } = response.data
                this.categories = data
                console.log(data);
            })
            .catch((error) => {
                let {
                    response
                } = error
                console.log(response);
            })

        console.log('get data top books');
        this.axios.get('/books/top/4')
            .then((response) => {
                let {
                    data
                } = response.data
                this.books = data
                console.log(data);
            })
    },
    methods: {

    }
};
</script>
