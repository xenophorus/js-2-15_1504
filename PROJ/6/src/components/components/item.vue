<template>
  <div>
    <template v-if="type == 'catalog'">
        <div class="product-item">
            <img src="https://placehold.it/300x200" :alt="item.product_name">
            <div class="desc">
                <h1>{{ item.product_name }}</h1>
                <p>{{ item.price }}</p>
                <button class="buy-btn" name="buy-btn" @click="$parent.$emit('add', item)">Купить</button>
            </div>
        </div>
    </template>

    <template v-if="type == 'basket'">

    </template>
  </div>
</template>

<script>
export default {
    props: ['type', 'item'],
    methods: {
        // add() {
        //     // this.$parent.$parent.$refs.basket.helloItem(this.item); //<shop /> - with $parent
        //     // this.$root

        //     //пользовательское событие

        // }
    }
}
</script>

<style>

</style>