<template>
	<div>
		<header>
        	<div class="logo">BestKidsWear</div>
            <div class="cart">
                <form action="#" class="search-form">
                    <input type="text" class="search-field">
                    <button class="btn-search">
                        <i class="fas fa-search" @click="filterItems"></i>
                    </button>
                </form>
                <!-- <button class="btn-cart" @click="showBasket = !showBasket">{{ computedLabel }}</button>
                <div class="cart-block" v-show="showBasket">
                    <div class="d-flex">
                        <strong class="d-block">Всего товаров</strong> <div id="quantity">{{ computedSummary.quantity }}</div>
                    </div>
                    <hr>
                    <div class="cart-items">
                         <div class="cart-item" v-for="item of basketItems" :key="item.id">
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
                    </div>
                    <hr>
                    <div class="d-flex">
                        <strong class="d-block">Общая ст-ть:</strong> <div id="amount">{{ computedSummary.amount }}</div>
                    </div>
                </div> -->
            </div>
        </header>
        <main>
        	<catalog />
<!--             <div class="products" v-if="filteredItems.length">
                <div class="product-item" v-for="item of filteredItems" :key="item.id">
                    <img :src="item.image_link" :alt="item.style">
                    <div class="desc">
                        <h1>{{item.name}}</h1>
                        <h1>{{item.style}}</h1>
                        <p>{{item.price}}</p>
                        <button class="buy-btn" name="buy-btn" @click="add(item)">
                            Купить
                        </button>
                    </div>
                </div>                
            </div>
            <div class="list-comment" v-else>
                <h1>Нет данных</h1>
            </div> -->
        </main>
	</div>	
</template>	

<script>
	import catalog from '../components/containers/catalog.vue';
	export default {
		components: { catalog },
		methods: {
			get(url) {
				return fetch(url).then(d => d.json());
			}
		}
		
	}
</script>

<style>

</style>