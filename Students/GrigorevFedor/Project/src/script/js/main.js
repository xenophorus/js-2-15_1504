class App {
    constructor(form) {
        this.form = null;
        this.items = [];
        this._init(form);
    }
    _init(form) {
        //инкапсулированный метод
        this.form = document.querySelector(form);
        document.querySelector('#app').addEventListener('click', () => {
            this.addNewItem();
        });
        console.log('Form is ready');
    }

    addNewItem() {
        console.log(this)
        this.items.push(new Burger('Size', 'Adds1', 'Adds2', this.form));
        this.showItems();
    }

    showItems() {
        let sum = 0
        let cals = 0
        this.items.forEach(item => {
            sum+=item.price
            cals+=item.cals
            item.adds.forEach(add => {
                sum+=add.price
                cals=cals + add.cals         
            })   
        })
        console.log(sum);
        console.log(cals);
    }
}

class Additive {
    constructor(name, price, cals) {
        this.name = name
        this.price = price
        this.cals = cals
    }
}

class Burger {
    constructor(size, adds1, adds2, form) {
        this.form = form;
        
        this.size = this._text(size);
        this.price = this._option(size, "price");
        this.cals = this._option(size, "cals");
        this.adds = this._checkboxes(adds1);
    }

    _text(selector) {
        let domEl = this.form.querySelector(`input[name=${selector}]`);
        return domEl.value
    }
    _option(selector, myattr) {
        let domEl = this.form.querySelector(`input[name=${selector}]:checked`);
        return parseInt(domEl.dataset[myattr])
    }
    _checkboxes(selector) {
        let domElArray = [...this.form.querySelectorAll(`input[name=${selector}]:checked`)];
        
        let array = []
        domElArray.forEach(el => {
            array.push(new Additive(el.dataset.name, parseInt(el.dataset.price), parseInt(el.dataset.cals)))
        })
        return array
    }
}

export default function () {
    let app = new App('#app-form')
}
// class Human {
//     constructor(name, age) {
//         this.name = name;
//         this.age = age;
//     }

//     goWork() {
//         console.log(`${this.name} goes work`);
//     }
// }

// class Male extends Human {
//     someMaleMethod() {
//         return
//     }
// }

// class Female extends Human {
//     constructor(name, age, pregnant) {
//         super(name, age);
//         this.pregnant = pregnant;
//     }
// }

// export default function() {
//     let doris = new Female('Doris', 23, false);
//     let boris = new Male('Boris', 25);

//     console.log(doris, boris);

//     doris.goWork();
//     boris.goWork();
// }
// class Some {
//     constructor(a, b) {
//         this.a = a;
//         this.b = b;
//     }

//     calc() {
//         console.log(this.a + this.b)
//     }
// }

// export default function() {
//     let a = new Some(50, 50);
//     a.calc();

//     let b = new Some(500, 500);
//     b.calc();

//     console.log(a, b);
// }
// function constructor (a, b) {
//     return {
//         a: a,
//         b: b,
//         calc() {
//             console.log(this.a + this.b)
//         }
//     }
// }

// export default function () {
//     let a = constructor(10, 20);
//     a.calc();
    
//     let b = constructor(100, 200);
//     b.calc();
//     console.log(a, b);
// }