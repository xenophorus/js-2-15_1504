 //ИМИТАЦИЯ РАБОТЫ БАЗЫ ДАННЫХ И СЕРВЕРА
const API = 'https://raw.githubusercontent.com/petmik2018/shop_data/master/responses';

class List {
    constructor(url, container) {
        this.url = url;
        this.container = container;
        this.items = [];
        this.filteredItems = [];
        this._init();
        this._handleEvents();

    }
    // _init() {
    //     this._get(API + this.url)
    //         .then(data => {
    //             this.items = data;
    //             console.log(this.items, `from ${this.constructor.name}`);
    //         })
    //         .catch(() => {
    //             console.log(`Error loading ${this.constructor.name} data`)
    //         });
            
    // }

    async _init() {
        try {
            let data = await this._get(API + this.url);
            this.items = data;
            console.log(this.items, `from ${this.constructor.name}`);
        }
        catch {
            console.log(`Error loading ${this.constructor.name} data`)
        }
        finally {
            this.filteredItems = this.items;
            this.render();
            if (this.constructor.name == "Basket") {
                this._checkTotalAndAmount();
            };

        }

    }
    _get(url) {
        return fetch(url)
                    .then(data => data.json())
        //  return new Promise((res, rej) => {
        //     let req = new XMLHttpRequest(); //если не считаем IE
                    
        //     req.onreadystatechange = function () {
        //         if (req.readyState == 4) {
        //             if(req.status == 200) {
        //                 res(JSON.parse(req.responseText));
        //             } else {
        //                 rej('error');
        //             }
        //         }
        //     };

        //     req.open('GET', url, true); 
        //     req.send(); 
        // })
    }
    render() {
        let block = document.querySelector(this.container);
        let str = '';
        this.filteredItems.forEach(item => {
            let newItem = new dependencies[this.constructor.name](item);
            str += newItem.render();
        })
        block.innerHTML = str;
    }
};

class Item {
    constructor(item) {
        this.item = item;
        this.img = this.item.image_link;
    }

    render() {
        return `
            <div class="product-item">
                <img src="${this.img}" alt="${this.item.name}">
                <div class="desc">
                    <h1>${this.item.name}</h1>
                    <p>${this.item.price}</p>
                    <button 
                        class="buy-btn" 
                        name="buy-btn"
                        data-name="${this.item.name}"
                        data-style="${this.item.style}"
                        data-price="${this.item.price}"
                        data-id="${this.item.id}"
                    >Купить</button>
                </div>
            </div>
        `
    }
};

class Catalog extends List {
    constructor(basket, url = '/getCatalog.json', container = '.products') {
        super(url, container);
        this.basket = basket;
    }
    _handleEvents() {
        document.querySelector (this.container).addEventListener ('click', (event) => {
            if (event.target.name === 'buy-btn') {
                let id = event.target.dataset['id'];
                let imageLink = this.items.find(product => product.id == id).image_link;
                this.basket.add(event.target, imageLink);
               
            }
        });
        document.querySelector(".btn-search").addEventListener('click', () => {
            this._filterItems();
        })
    }
    _filterItems() {
        let data = document.querySelector(`input[class="search-field"]`).value;
        console.log(data);
        console.log("Items filtered");
        const regexp = new RegExp(data, 'i');
        this.filteredItems = this.items.filter(item => regexp.test(item.name));
        this.render();
    }
};

class Basket extends List {
    constructor(url = '/getBasket.json', container = '.cart-items') {
        super(url, container);
        this.total = 0;
        this.amount = 0;
        this.quantityBlock = document.querySelector ('#quantity');
        this.amountBlock = document.querySelector ('#amount');

    }
    _handleEvents() {
        document.querySelector (this.container).addEventListener ('click', (event) => {
            if (event.target.name === 'del-btn') {
                this._remove(event.target);
            }
        });
        document.querySelector('.btn-cart').addEventListener('click', () => {
            document.querySelector('.cart-block').classList.toggle("hidden");
        })
    }
    add(product, imageLink) {
        let id = product.dataset['id'];
        let find = this.items.find (product => product.id == id);
        if (find) {
            find.quantity++
        } else {
            let newProduct = this._createNewProduct(product, imageLink);
            this.items.push(newProduct)
        }
        this._checkTotalAndAmount ()
        this.render ()
        console.log(product.dataset.name + " added");
    }
    _createNewProduct (product, image) {
        return {
            id: product.dataset['id'],
            name: product.dataset['name'],
            style: product.dataset['style'],
            price: product.dataset['price'],
            image_link: image,
            quantity: 1
        }
    }
    _remove(product) {
        let id = product.dataset['id']
        console.log(this.items.find(el => el.id == product.dataset.id).name + " removed");
        let find = this.items.find (product => product.id == id)
        if (find.quantity > 1) {
            find.quantity--
        } else {
            this.items.splice (this.items.indexOf(find), 1)
        }
        this._checkTotalAndAmount()
        this.render ()

    }
    _checkTotalAndAmount () {
        let qua = 0;
        let amount = 0;
        this.items.forEach (item => {
            qua += item.quantity
            amount += item.price * item.quantity
        });
        this.total = qua;
        this.amount = amount;
        this.quantityBlock.innerText = this.total;
        this.amountBlock.innerText = this.amount;
    }
};

class CatalogItem extends Item {

};

class BasketItem extends Item {
    render() {
        return `
            <div class="cart-item" data-id="${this.item.id}">
                <img src="${this.img}" alt="${this.item.name}">
                <div class="product-desc">
                    <p class="product-title">${this.item.name}</p>
                    <p class="product-quantity">${this.item.quantity}</p>
                    <p class="product-single-price">${this.item.price}</p>
                </div>
                <div class="right-block">
                    <button name="del-btn" class="del-btn" data-id="${this.item.id}">&times;</button>
                </div>
            </div>
        `
    }

};

const dependencies = {
    Catalog: CatalogItem,
    Basket: BasketItem
};

export default function () {
    let basket = new Basket();
    let catalog = new Catalog(basket);
}


// class Cart {
//     constructor() {
//         this.items = [];
//         this.total = 0;
//         this.sum = 0;
//         this.container = '.cart-block';
//         this.quantityBlock = document.querySelector ('#quantity');
//         this.priceBlock = document.querySelector ('#price');
//         this._init ();
//     }
    
//     addProduct (product) {
//         let id = product.dataset['id']
//         let find = this.items.find (product => product.id === id)
//         if (find) {
//             find.quantity++
//         } else {
//             let prod = this._createNewProduct (product)
//             this.items.push (prod)
//         }
         
//         this._checkTotalAndSum ()
//         this.render ()
//     }

//     _createNewProduct (prod) {
//         return {
//             product_name: prod.dataset['name'],
//             price: prod.dataset['price'],
//             id_product: prod.dataset['id'],
//             quantity: 1
//         }
//     }

//     deleteProduct (product) {
//         let id = product.dataset['id']
//         let find = this.items.find (product => product.id_product === id)
//         if (find.quantity > 1) {
//             find.quantity--
//         } else {
//             this.items.splice (this.items.indexOf(find), 1)
//         }
         
//         this._checkTotalAndSum ()
//         this.render ()
//     }
    
//     _checkTotalAndSum () {
//         let qua = 0
//         let pr = 0
//         this.items.forEach (item => {
//             qua += item.quantity
//             pr += item.price * item.quantity
//         })
//         this.total = qua
//         this.sum = pr
//     }

//     render () {
//         let itemsBlock = document.querySelector (this.container).querySelector ('.cart-items')
//         let str = ''
//         this.items.forEach (item => {
//             str += `<div class="cart-item" data-id="${item.id_product}">
//                     <img src="https://placehold.it/100x80" alt="">
//                     <div class="product-desc">
//                         <p class="product-title">${item.product_name}</p>
//                         <p class="product-quantity">${item.quantity}</p>
//                         <p class="product-single-price">${item.price}</p>
//                     </div>
//                     <div class="right-block">
//                         <button name="del-btn" class="del-btn" data-id="${item.id_product}">&times;</button>
//                     </div>
//                 </div>`
//         })
//         itemsBlock.innerHTML = str
//         this.quantityBlock.innerText = this.total
//         this.priceBlock.innerText = this.sum
//     }
// }
 


