<template>
	<div>
			<template v-if="type == 'catalog'">
                <div class="product-item">
                    <img :src="item.image_link" :alt="item.style">
                    <div class="desc">
                        <h1>{{item.name}}</h1>
                        <h1>{{item.style}}</h1>
                        <p>{{item.price}}</p>
                        <button class="buy-btn" name="buy-btn">
                            Купить
                        </button>
                    </div>
                </div>                
		</template>	

		<template v-if="type == 'basket'">
                <div class="cart-item">
                    <img :src="item.image_link" :alt="item.style">
                    <div class="product-desc">
                        <p class="product-title">{{item.name}}</p>
                        <p class="product-quantity">{{item.quantity}}</p>
                        <p class="product-single-price">{{item.price}}</p>
                    </div>
                    <div class="right-block">
                        <button name="del-btn" class="del-btn" @click="remove(item)">&times;</button>
                    </div>
                </div>                       		
		</template>
	</div>	
</template>

<script>
	export default {
		props: ['type', 'item']

	}
</script>

<style>
	
</style>