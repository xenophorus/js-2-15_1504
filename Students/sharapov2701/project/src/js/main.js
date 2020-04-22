import {catalog} from './components/catalog.js';
import {cart} from './components/cart.js';

export default function () { 
    catalog.construct (cart); //тут происходит создание объекта и вся прочая магия
    cart.construct ()
  }