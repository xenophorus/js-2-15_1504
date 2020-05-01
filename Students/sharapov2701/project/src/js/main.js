const app = new Vue({
    el: '#app',
    data: {
        url: 'https://raw.githubusercontent.com/sharapov2701/goods/master/goods.json',
        catalog: [],
        cart: [],
        toggle_cart: false
    },
    methods: {
        buy (item) {
            let find = this.cart.find (product => product.id === item.id);
            if (find) {
                find.quantity++;
            } else {
                this.cart.push(item);
                item.quantity++;
            }
            this.toggle_cart = true;
        },
        remove (item) {
            let find = this.cart.find (product => product.id === item.id);
            if (find.quantity > 1) {
                find.quantity--
            } else {
                this.cart.splice (this.cart.indexOf(find), 1)
            }
        }
    },
    computed: {
        get_price () {
            let price = 0;
            this.cart.forEach(item => {
                price += item.price * item.quantity;
            });
            return price;
        },
        get_quantity () {
            let quantity = 0;
            this.cart.forEach(item => {
                quantity += item.quantity;
            });
            return quantity;
        }
    },
    async beforeMount() {
        try{
            this.catalog = await fetch(this.url).then(d => d.json());
        }
        finally{
            
        }
    }
  });