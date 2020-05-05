<template>
	<div>
		<header>
        	<div class="logo">BestKidsWear</div>
            <div class="cart">
                <form action="#" class="search-form">
                    <input type="text" class="search-field">
                    <button class="btn-search" @click="filterProducts">
                        <i class="fas fa-search"></i>
                    </button>
                </form>
                <button class="btn-cart" @click="showBasket = !showBasket">{{ computedLabel }}</button>
                <basket v-show="showBasket" ref="basket"/>
            </div>
        </header>
        <main>
        	<catalog ref="catalog" @add="addToBasket"/>
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
                showBasket: false,
            }
        },
		methods: {
			get(url) {
				return fetch(url).then(d => d.json());
			},
            addToBasket(item) {
                this.$refs.basket.add(item);
            },
            filterProducts() {
                let data = document.querySelector(`input[class="search-field"]`).value;
                this.$refs.catalog.filterItems(data);
            }
		},
        computed: {
            computedLabel() {
                return `${this.showBasket ? "Скрыть" : "Корзина"}`
            }
        },
	}
</script>

<style>

</style>