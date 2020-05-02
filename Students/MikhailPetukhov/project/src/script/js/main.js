 //ИМИТАЦИЯ РАБОТЫ БАЗЫ ДАННЫХ И СЕРВЕРА
const API = 'https://raw.githubusercontent.com/petmik2018/shop_data/master/responses';

function mainApp() {
    const app = new Vue({
      el: '#app',
      data: {
        catalogUrl: '/getCatalog.json',
        basketUrl: '/getBasket.json',
        catalogItems: [],
        filteredItems: [],
        basketItems: [],
        showBasket: false,
        emptyProductsList: false,
      },
      methods: {
        filterItems() {
            let data = document.querySelector(`input[class="search-field"]`).value;
            const regexp = new RegExp(data, 'i');
            this.filteredItems = this.catalogItems.filter(item => regexp.test(item.name));
            this.emptyProductsList = (this.filteredItems.length == 0);
            console.log(this.filteredItems.length);
            console.log(this.emptyProductsList);
        },
        add(item) {
            let find = this.basketItems.find (product => product.id == item.id);
            if (find) {
                find.quantity++;
            } else {
                let newBasketItem = Object.assign({}, item);
                newBasketItem.quantity = "1";
                this.basketItems.push(newBasketItem);
            }
        },
        remove(item) {
            let find = this.basketItems.find (product => product.id == item.id);
            if (find.quantity > 1) {
                find.quantity--
            } else {
                this.basketItems.splice (this.basketItems.indexOf(find), 1)
            }
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
            console.log("data loaded")
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
export default mainApp
