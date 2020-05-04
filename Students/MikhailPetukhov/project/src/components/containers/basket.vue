<template>
     <div class="cart-block">
        <div class="d-flex">
            <strong class="d-block">Всего товаров</strong> <div id="quantity"></div>
        </div>
        <hr>

        <item v-for="item of items" :item="item" :key="item.id" :type="'basket'"/>

        <hr>

        <div class="d-flex">
            <strong class="d-block">Общая ст-ть:</strong> <div id="amount"></div>
        </div>
    </div>	
</template>

<script>
    import item  from'../components/item.vue';
    export default {
        components: { item },
        data() {
            return {
                items: [],
                url: 'https://raw.githubusercontent.com/petmik2018/shop_data/master/responses/getBasket.json'
            }
        },
        methods: {

        },
        mounted() {
            this.$parent.get(this.url)
            .then(data => {
                this.items = data
            })
        },
        computed: {

        }
    }

</script>

<style>
	
</style>