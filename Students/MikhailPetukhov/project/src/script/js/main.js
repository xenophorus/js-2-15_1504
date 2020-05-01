 //ИМИТАЦИЯ РАБОТЫ БАЗЫ ДАННЫХ И СЕРВЕРА
const API = 'https://raw.githubusercontent.com/petmik2018/shop_data/master/responses';

export default function () {
    const app = new Vue({
      el: '#app',
      data: {
        catalogUrl: '/getCatalog.json',
        basketUrl: '/getBasket.json',
        catalogItems: [],
        filteredItems: [],
        basketItems: [],
        showBasket: false,
      },
      methods: {
        filterItems() {
            let data = document.querySelector(`input[class="search-field"]`).value;
            const regexp = new RegExp(data, 'i');
            this.filteredItems = this.catalogItems.filter(item => regexp.test(item.name));
        },
        add(item) {
            console.log("product " + item.id + " added");
            let find = this.basketItems.find (product => product.id == item.id);
            if (find) {
                find.quantity++;
                console.log(item);
            } else {
                let newBasketItem = Object.assign({}, item);
                newBasketItem.quantity = "1";
                this.basketItems.push(newBasketItem);
            }
        },
        remove() {

        },

      },
      async mounted() {
        try {
            this.catalogItems = await fetch(API + this.catalogUrl).then(d => d.json());
            this.basketItems = await fetch(API + this.basketUrl).then(d => d.json());
        }
        catch {
            console.log(`Error loading`)
        }
        finally {
            this.filteredItems =  this.catalogItems;
            console.log(this.basketItems);
        }
      },
      computed: {
        computedLabel() {
            return `${this.showBasket ? "Скрыть" : "Корзина"}`
        },
        computedSummary() {
            let qua = 0;
            let amount = 0;
            this.basketItems.forEach (item => {
                qua += (+item.quantity);
                amount += item.price * item.quantity;
            });
            return {qua: qua, amount: amount}
        },
      }
    });

}


