<template>
    <div class="products">

        <item v-for="item of items" :item="item" :key="item.id" :type="'catalog'"/>  

    </div>
</template>

<script>
	import item from'../components/item.vue';
	export default {
		components: { item },
		data() {
			return {
				items:[],
				url: 'https://raw.githubusercontent.com/petmik2018/shop_data/master/responses/getCatalog.json'
			}
		},
		methods: {

		},
		mounted() {
			this.$parent.get(this.url)
			.then(data => {
				this.items = data;
			})
		}
	}
	
</script>

<style>
	
</style>