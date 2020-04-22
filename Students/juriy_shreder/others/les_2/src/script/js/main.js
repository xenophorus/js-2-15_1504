class App{
     constructor(form){
       this.form = null;
       this.items = null;
       this._init(form);
     }
     _init(form){
      this.form = document.querySelector(form);
       document.querySelector(form).addEventListener('click', () => {
           this.callcPrice()});
     }
     callcPrice(){
       this.items = new Price(this.form, 'Size', 'Filling', 'Seasoning')
     }        
}

class Price {
    constructor(form, size, filling, seasoning){
      this.form = form;
      
      this.size = this._price(size);
      this.filling = this._price(filling);
      this.seasoning = this._priceSeasoning(seasoning);
      this._init();
    }
    _price(selector){
      let priceSize = this.form.querySelector(`input[name=${selector}]:checked`);
      return priceSize.dataset.price
    }
    _priceSeasoning(selector){
      let priceSize = [...this.form.querySelectorAll(`input[name=${selector}]:checked`)];
      let price= 0;
      priceSize.forEach(el => {
      price += +el.dataset.price})
      return price
    }
    _init(){
      let price = +this.size + +this.filling + +this.seasoning
      document.querySelector('div.price').innerHTML= ` цена: ${price}`
    }
}
// 
export default ()=>{
  
  let app = new App('#app-form')

}