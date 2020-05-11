let app = new Vue({
    el: '#app',
    data: {
        brand: 'Vue mastery',
        product: 'Socks',
        description: 'A pair of warm, fuzzy socks',
        selectedVariant: 0,
        altText: 'A pair of socks',
        sales: true,
        details: ['80% cotton', '20% polyester', 'Gender-neutral'],
        sizes: [41, 42, 43, 44, 45],
        cart: 0,
        variants: [
            {
                variantId: 21,
                variantColor: 'green',
                variantImage: './img/vmSocks-green-onWhite.jpg',
                variantQuantity: 15,
                onSale: true,
            },
            {
                variantId: 22,
                variantColor: 'blue',
                variantImage: './img/vmSocks-blue-onWhite.jpg',
                variantQuantity: 0,
                onSale: false,
            },
        ],
        textDecor: [
            'none',
            'line-through'
        ]
    },
    methods: {
        addToCart: function () {
            this.cart += 1
            this.inventory -= 1
        },
        RemoveFromCart: function () {
            this.cart -= 1
            this.inventory += 1
        },
        updateProduct: function (index) {
            this.selectedVariant = index
            console.log(index)
        }
    },
    computed: {
        title() {
            return this.brand + ' ' + this.product
        },
        image() {
            return this.variants[this.selectedVariant].variantImage
        },
        inventory() {
            return this.variants[this.selectedVariant].variantQuantity
        },
        onSale() {
            return this.variants[this.selectedVariant].onSale
        }

    }

})