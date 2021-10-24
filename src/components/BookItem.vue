<template>
<div>
    <v-card :to="'/book/'+ book.slug">
        <v-img :src="book.cover != '' ? getImage('/books/' + book.cover) : getImage('')" class="white--text" height="200px">
            <v-card-title class="fill-height align-end" v-text="book.title"></v-card-title>
        </v-img>

        <v-card-actions>
            <v-icon>mid-cash</v-icon>
            <span class="orange--text">Rp {{ book.price.toLocaleString('id-ID') }}</span>
            <v-spacer></v-spacer>
            <v-icon>mdi-eye</v-icon>
            {{ book.views }}
        </v-card-actions>
    </v-card>
</div>
</template>

<script>
export default {
    name: 'book-item',
    props: ['book'],
    data: () => ({

    }),
}
</script>
