import {Catalog} from './components/catalog.js';
import {Cart} from './components/cart.js';

export default function () { 
    let cart = new Cart();
    let catalog = new Catalog(cart);
  }