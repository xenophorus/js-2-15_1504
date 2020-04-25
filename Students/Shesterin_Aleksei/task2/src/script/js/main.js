class Count {
    constructor() {
    }
}


class Burger {
    constructor(size, adds, spice) {
        this.size = size;
        this.adds = adds;
        this.spice = spice;
    }

    listeners() {
        let b = document.getElementsByName('burger')
        console.log(b)
    }
}

let b = document.getElementsByName('burger')
console.log(b)