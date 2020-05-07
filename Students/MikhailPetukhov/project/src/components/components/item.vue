<template>
	<div :class="type ==='catalog' ? 'product-item' : 'cart-item'">
        <img :src="item.image_link" :alt="item.style">
        
		<template v-if="type == 'catalog'">
            <div class="desc">
                <h1>{{item.name}}</h1>
                <h1>{{item.style}}</h1>
                <p>{{item.price}}</p>
                <button class="buy-btn" name="buy-btn" @click="$parent.$emit('add', item)">
                    Купить
                </button>
            </div>             
		</template>	

		<template v-if="type == 'basket'">                 
            <div class="product-desc">
                <p class="product-title">{{item.name}}</p>
                <p class="product-quantity">{{item.quantity}}</p>
                <p class="product-single-price">{{item.price}}</p>
            </div>
            <div class="right-block">
                <button name="del-btn" class="del-btn" @click="$emit('remove', item)">&times;</button>
            </div>                      		
		</template>
	</div>	
</template>

<script>
	export default {
		// props: ['type', 'item'],
        props: {
            type: {
                type: String,
                default: 'catalog'
            },
            item: {
                type: Object
            }
        },
		methods: {
			// add() {
			// 	this.$parent.$parent.$refs.basket.add(this.item);
			// }
		}
	}
</script>

<style>
	
</style>