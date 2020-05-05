<template>
  <div>
    <header>
        <div class="logo">E-shop</div>
        <div class="cart">
            <form action="#" class="search-form">
                <input type="text" class="search-field">
                <button class="btn-search">
                    <i class="fas fa-search"></i>
                </button>
            </form>
            <button class="btn-cart" @click="showBasket = !showBasket">Cart</button>
            <basket v-show="showBasket" ref="basket"/>
        </div>
    </header>
    <main>
        <catalog @add="h"/>
    </main>
  </div>
</template>

<script>
import catalog from '../components/containers/catalog.vue';
import basket from '../components/containers/basket.vue';
export default {
    components: { catalog, basket },
    data() {
        return {
            showBasket: false
        }
    },
    methods: {
        get(url) {
            return fetch(url).then(d => d.json());
        },
        h(p) {
            // this.$refs.basket.helloItem(p);
        }
    }
}
</script>

<style>

</style>