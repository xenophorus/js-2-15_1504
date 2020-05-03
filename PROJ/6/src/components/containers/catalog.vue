<template>
  <div class="products">
    <item v-for="item of items" :item="item" :key="item.product_id" :type="'catalog'"/>
  </div>
</template>

<script>
import item from '../components/item.vue';
export default {
    components: { item },
    data() {
        return {
            items: [],
            url: 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/catalogData.json'
        }
    },
    mounted() {
        this.$parent.get(this.url)
        .then(data => { 
            this.items = data; 
        });
    },
    methods: {

    }
}
</script>

<style>

</style>