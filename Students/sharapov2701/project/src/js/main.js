const URL = 'https://raw.githubusercontent.com/sharapov2701/goods/master/goods.json';

class List {
    
    constructor(url, container) {
        this.url = url;
        this.container = container;
        this._init();
    }

    async _init() {
        try {
            let data = await this._get(this.url);
            this.items = this.constructor.name == 'Basket' ? [] : data;
            console.log(this.items, `from ${this.constructor.name}`);
        }
        catch(err) {
            console.log(`Error loading ${this.constructor.name} data`) 
        }
        finally {
            this.render();
            this._handleEvents();
        }
    }
    
    _get(url) {
        return fetch(url).then(d => d.json());
    }

    render() {
        let block = document.querySelector(this.container);
        let str = '';
        this.items.forEach(item => {
            let newItem = new dependencies[this.constructor.name](item);
            str += newItem.render();
        });
        block.innerHTML = str;
    }
}

class Item {
    
    constructor(item) {
        this.item = item;
    }

    render() {
        return `
        <div class="product-item">
            <div class="img-catalog">
            <img src="${this.item.img}" alt="${this.item.name}">
            </div>
            <div class="desc">
                <h1>${this.item.name}</h1>
                <p>${this.item.price}</p>
                <button 
                class="buy-btn" 
                name="buy-btn"
                data-name="${this.item.name}"
                data-price="${this.item.price}"
                data-id="${this.item.id}"
                data-img="${this.item.img}"
                >Купить</button>
            </div>
        </div>`
    }
}

class Catalog extends List {

    constructor(basket, url = URL, container = '.products') {
        super(url, container);
        this.basket = basket;
    }

    _handleEvents() {
        document.querySelector(this.container).addEventListener('click', event => {
            if (event.target.name === 'buy-btn') {
                this.basket.add(event.target)
            }
        })
    }
}

class Basket extends List {

    constructor(url = URL, container = '.cart-items') {
        super(url, container);
    }

    _handleEvents() {
        document.querySelector(this.container).addEventListener('click', event => {
            if (event.target.name === 'del-btn') {
                this.remove(event.target);
            }
        });

        document.querySelector('.btn-cart').addEventListener('click', () => {
            document.querySelector('.cart-block').classList.toggle('invisible');
        });
    }

    add(product) {
        let id = product.dataset['id']
        let find = this.items.find (product => product.id === id)
        if (find) {
            find.quantity++
        } else {
            let prod = this._createNewProduct (product)
            this.items.push (prod)
        }
         
        this._checkTotalAndSum ()
        this.render ()
    }

    remove(product) {
        let id = product.dataset['id']
        let find = this.items.find (product => product.id === id)
        if (find.quantity > 1) {
            find.quantity--
        } else {
            this.items.splice (this.items.indexOf(find), 1)
        }
         
        this._checkTotalAndSum ()
        this.render ()
    }

    _createNewProduct (prod) {
        return {
            name: prod.dataset['name'],
            price: prod.dataset['price'],
            id: prod.dataset['id'],
            img: prod.dataset['img'],
            quantity: 1
        }
    }

    _checkTotalAndSum () {
        let qua = 0
        let pr = 0
        this.items.forEach (item => {
            qua += item.quantity
            pr += item.price * item.quantity
        })
        this.total = qua
        this.sum = pr
    }
}

class CatalogItem extends Item {

}

class BasketItem extends Item {
    render() {
        return `
            <div class="cart-item" data-id="${this.item.id}">
                <div class="img-cart"><img src="${this.item.img}" alt=""></div>
                <div class="product-desc">
                    <p class="product-title">${this.item.name}</p>
                    <p class="product-quantity">${this.item.quantity}</p>
                    <p class="product-single-price">${this.item.price}</p>
                </div>
                <div class="right-block">
                    <button name="del-btn" class="del-btn" data-id="${this.item.id}">&times;</button>
                </div>
            </div>`
    }
}

let dependencies = {
    Catalog: CatalogItem,
    Basket: BasketItem
};

export default function () {
    let basket = new Basket();
    let catalog = new Catalog(basket);
}