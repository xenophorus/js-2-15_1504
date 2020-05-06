<template>
  <div class="cart-block">
    <div class="d-flex">
        <strong class="d-block">Всего товаров</strong> <div id="quantity"></div>
    </div>
    <hr>
    
    <item /> <!--не забыть все пропы-->

    <hr>
    <div class="d-flex">
        <strong class="d-block">Общая ст-ть:</strong> <div id="price"></div>
    </div>
</div>
</template>

<script>
import item from '../components/item.vue';
export default {
    components: { item },
    data() {
        return {
            //айтемы и урл
        }
    },
    methods: {
        //добавить товар
        //удалить товар
        helloItem(item) {
            console.log('I received ', item);
        }
    },
    mounted() {
        //запрос - размещение
    },
    computed: {
        //всего товаров
        //общая стоимость
    }
}
</script>

<style>

</style>