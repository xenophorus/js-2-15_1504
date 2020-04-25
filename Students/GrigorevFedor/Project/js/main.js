 //ИМИТАЦИЯ РАБОТЫ БАЗЫ ДАННЫХ И СЕРВЕРА

//  let PRODUCTS_NAMES = ['Processor', 'Display', 'Notebook', 'Mouse', 'Keyboard', 'sdfsdf']
//  let PRICES = [100, 120, 1000, 15, 18, 20] 
//  let IDS = [0, 1, 2, 3, 4, 5]
 let IMGS = ['https://cs8.pikabu.ru/post_img/big/2017/12/25/5/1514188160141511997.jpg', 
 'https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/HMUB2?wid=1144&hei=1144&fmt=jpeg&qlt=80&op_usm=0.5,0.5&.v=1563827752399',
 'https://zeon18.ru/files/item/Xiaomi-Mi-Notebook-Air-4G-Officially-Announced-Weboo-co-2%20(1)_1.jpg',
 'https://files.sandberg.it/products/images/lg/640-05_lg.jpg',
 'https://images-na.ssl-images-amazon.com/images/I/81PLqxtrJ3L._SX466_.jpg',
  'https://images-na.ssl-images-amazon.com/images/I/81PLqxtrJ3L._SX466_.jpg']

 


class Catalog  {
    constructor(cart){
        this.cart = cart;
        this.items = []
        this.container = '.products';
        this._init()
     }
    
    _init () {
        this.fillProducts();
        this._handleEvents ()
    }

    fillProducts() {
        this.getProducts() 
        .then(data=>{
            this.items = data;
            this.render();
        })
        .catch(()=>{console.log('error loading products')})    
    }

    getProducts() {
        return new Promise(function(res,rej){
            let req = new XMLHttpRequest();
            req.open("GET", "https://raw.githubusercontent.com/alkanaft123/static/master/goods.json", true);
            req.onreadystatechange = function () {
                if (req.readyState == 4) {
                    if(req.status == 200) {
                        res(JSON.parse(req.responseText));
                    } else {
                        rej('error');
                    }
                }
            };
            req.send(); 
        }
        )
    }

    _handleEvents () {
        document.querySelector (this.container).addEventListener ('click', (evt) => {
            if (evt.target.name === 'buy-btn') {
                this.cart.addProduct (evt.target)
            }
        })
    }
    
    render () {
        let str = ''
        this.items.forEach (item => {
            str += `
                <div class="product-item">
                    <img src="https://placehold.it/300x200" alt="${item.Name}">
                    <!--img src="${item.img}" width="300" height="200" alt="${item.Name}"-->
                    <div class="desc">
                        <h1>${item.Name}</h1>
                        <p>${item.Price} $</p>
                        <button 
                        class="buy-btn" 
                        name="buy-btn"
                        data-name="${item.Name}"
                        data-price="${item.Price}"
                        data-id="${item.id}"
                        >Купить</button>
                    </div>
                </div>
            `
        })
        document.querySelector(this.container).innerHTML = str
     }
 }



class Cart {
    constructor () {
        this.items = [],
        this.total = 0,
        this.sum = 0,
        this.container ='.cart-block',
        this.quantityBlock = document.querySelector ('#quantity'),
        this.priceBlock = document.querySelector ('#price'),
        this._init ()
    }
    _init () 
    {
        this._handleEvents ()
    }
    _handleEvents () 
    {
        document.querySelector (this.container).addEventListener ('click', (evt) => {
            if (evt.target.name === 'del-btn') {
                this.deleteProduct (evt.target)
            }
        })    
        document.querySelector (".btn-cart").addEventListener ('click', (evt) => {    
            let el = document.querySelector('.cart-block')
            if (el.classList.contains("hidden")) 
            {
                el.classList.remove("hidden")
            }
            else
            {
                el.classList.add("hidden")
            }
        })
    }

    addProduct (product) 
    {
        let id = product.dataset['id']
        let find = this.items.find (product => product.id_product === id)
        if (find) {
            find.quantity++
        } else {
            let prod = this._createNewProduct (product)
            this.items.push (prod)
        }
         
        this._checkTotalAndSum ()
        this.render ()
    }

    _createNewProduct (prod) 
    {
        return {
            product_name: prod.dataset['name'],
            price: prod.dataset['price'],
            id_product: prod.dataset['id'],
            quantity: 1
        }
    }

    deleteProduct (product) 
    {
        let id = product.dataset['id']
        let find = this.items.find (product => product.id_product === id)
        if (find.quantity > 1) {
            find.quantity--
        } else {
            this.items.splice (this.items.indexOf(find), 1)
        }
         
        this._checkTotalAndSum ()
        this.render ()
    }
    
    _checkTotalAndSum () 
    {
        let qua = 0
        let pr = 0
        this.items.forEach (item => {
            qua += item.quantity
            pr += item.price * item.quantity
        })
        this.total = qua
        this.sum = pr
    }
    render () 
    {
        let itemsBlock = document.querySelector (this.container).querySelector ('.cart-items')
        let str = ''
        this.items.forEach (item => {
            str += `<div class="cart-item" data-id="${item.id_product}">
                    <img src="https://placehold.it/100x80" alt="">
                    <div class="product-desc">
                        <p class="product-title">${item.product_name}</p>
                        <p class="product-quantity">${item.quantity}</p>
                        <p class="product-single-price">${item.price}</p>
                    </div>
                    <div class="right-block">
                        <button name="del-btn" class="del-btn" data-id="${item.id_product}">&times;</button>
                    </div>
                </div>`
        })
        itemsBlock.innerHTML = str
        this.quantityBlock.innerText = this.total
        this.priceBlock.innerText = this.sum
    }
}

cart = new Cart();
catalog = new Catalog(cart);
