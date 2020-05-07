<template>
    <div class="products" v-if="filteredItems.length">

        <item 
        	v-for="item of filteredItems"
        	:item="item"
        	:key="item.id"
        />  

    </div>
    <div v-else>
    	<h1>НЕТ ИНФОРМАЦИИ</h1> 	
    </div>
</template>

<script>
	import item from'../components/item.vue';
	export default {
		components: { item },
		props: {
			filter: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				items:[],
				filteredItems:[],
				url: 'https://raw.githubusercontent.com/petmik2018/shop_data/master/responses/getCatalog.json'
			}
		},
		methods: {
			filterItems(search) {
				if (search) {
					const regexp = new RegExp(search, 'i');
	        		this.filteredItems = this.items.filter(item => regexp.test(item.name));
	        	} else {
					this.filteredItems = this.items;
	        	}
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
		},
		watch: {
			filter: {
				deep: true,
				immediate: true,
				handler() {
					this.filterItems(this.filter);
				}
			}
		}
	}
	
</script>

<style>
	
</style>