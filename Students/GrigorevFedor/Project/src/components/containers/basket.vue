<template>
  <div class="cart-block">
    <div class="d-flex">
        <strong class="d-block">Всего товаров</strong> {{ totalCount }} <div id="quantity"></div>
    </div>
    <hr>
    
    <item 
        type="basket" 
        v-for="item of items" 
        :key="item.id_product"
        :item="item"
        @remove="remove"
    /> <!--не забыть все пропы-->

    <hr>
    <div class="d-flex">
        <strong class="d-block">Общая ст-ть:</strong> {{ totalSum }} <div id="price"></div>
    </div>
</div>
</template>

<script>
import item from '../components/item.vue';
export default {
    components: { item },
    data() {
        return {
            items: [],
            url: '/api/basket'
        }
    },
    methods: {
        add(item) {
            
            let newItem = JSON.parse(JSON.stringify(item));

            this.$parent.post('/api/addtobasket', newItem)
                .then( res => {
                    if (res.id) {
                        console.log(this.items)
                        let find = this.items.find(el => el.id_product == item.id_product);
                        if (!find) {
                            this.items.push(Object.assign({}, item, {quantity: 1}));
                        } else {
                            find.quantity++;
                        }
                    }
                } )
            },
        remove(item) {
            // let find = this.items.find(el => el.id_product == item.id_product);
            if (item.quantity == 1) {
                this.items.splice(this.items.indexOf(item), 1);
            } else {
                item.quantity--;
            }
        }
    },
    mounted() {
        this.$parent.get(this.url)
        .then(data => { 
            this.items = data; 
        });
        //запрос - размещение
    },
    computed: {
        totalCount: function ()  {
            let totalCount = 0;
            this.items.forEach(element => {
                totalCount+=element.quantity    
            });
            return totalCount    
        },
        totalSum: function ()  {
            let totalSum = 0;
            this.items.forEach(element => {
                totalSum+=element.quantity * element.price    
            });
            return totalSum    
        }
    }
}
</script>

<style>

</style>