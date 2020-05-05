<template>
    <div class="products" v-if="filteredItems.length">

        <item v-for="item of filteredItems" :item="item" :key="item.id" :type="'catalog'"/>  

    </div>
    <div v-else>
    	<h1>НЕТ ИНФОРМАЦИИ</h1> 	
    </div>
</template>

<script>
	import item from'../components/item.vue';
	export default {
		components: { item },
		data() {
			return {
				items:[],
				filteredItems:[],
				url: 'https://raw.githubusercontent.com/petmik2018/shop_data/master/responses/getCatalog.json'
			}
		},
		methods: {
			filterItems(expression) {
				const regexp = new RegExp(expression, 'i');
        		this.filteredItems = this.items.filter(item => regexp.test(item.name));
			}
		},
		mounted() {
			this.$parent.get(this.url)
			.then(data => {
				this.items = data;
				// Хочу перенести следующую строку в then или finally
				this.filteredItems = data;
			})
			// .then(
			// 	this.filteredItems = this.items
			// )
			// .finally(
			// 	this.filteredItems = this.items
			// )	
		}
	}
	
</script>

<style>
	
</style>