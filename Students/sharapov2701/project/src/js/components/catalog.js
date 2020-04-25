 const API_URL = 'https://raw.githubusercontent.com/sharapov2701/goods/master/goods.json';
   
  function makeGETRequest(url) {
      return new Promise((res, rej) => {
        let xhr;
  
        if (window.XMLHttpRequest) {
          xhr = new XMLHttpRequest();
        } else if (window.ActiveXObject) { 
          xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }
      
        xhr.onreadystatechange = function () {
          if (xhr.readyState === 4) {
              if(xhr.status == 200) {
                res(xhr.responseText);
              } else {
                rej('error');
              }
          }
        }
      
        xhr.open('GET', url, true);
        xhr.send();
      })
  }

 export class Catalog {

     constructor (cart) {
         this.items = [];
         this.container = '.products';
         this.cart = cart;
         this._init (); //_ - это обозначение инкапсулированного метода
     }

     _init () {
         this._handleData (API_URL)
         this._handleEvents ()
     }

     _handleEvents () {
         document.querySelector (this.container).addEventListener ('click', (evt) => {
             if (evt.target.name === 'buy-btn') {
                 this.cart.addProduct (evt.target)
             }
         })
     }

     _handleData (url) {
         makeGETRequest(url)
            .then(data => {
                this.items = JSON.parse(data);
                this.render()
            })
            .catch(err => {
                console.log(err);
            })
     }

     render () {
         let str = ''
         this.items.forEach (item => {
             str += `
                 <div class="product-item">
                     <div class="img-catalog">
                        <img src="${item.img}" alt="${item.name}">
                     </div>
                     <div class="desc">
                         <h1>${item.name}</h1>
                         <p>${item.price}</p>
                         <button 
                         class="buy-btn" 
                         name="buy-btn"
                         data-name="${item.name}"
                         data-price="${item.price}"
                         data-id="${item.id}"
                         data-img="${item.img}"
                         >Купить</button>
                     </div>
                 </div>
             `
         })
         document.querySelector(this.container).innerHTML = str
      }
  }