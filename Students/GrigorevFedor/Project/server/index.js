let express = require('express'); //import ... from (es5)
let fs = require('fs');

let server = express();

server.use(express.json());

// Для отправки конкретной ХТМЛ (логин/пароль в public) 
// Для продакшн версии (после сборки)
// server.use('/', express.static('server/public'));

server.get('/catalog', (req, res) => {
    fs.readFile('./server/db/catalog.json', 'utf-8', (err, data) => {
        if(!err) {
            res.send(data);
        }
    })
});

server.get('/basket', (req, res) => {
    fs.readFile('./server/db/basket.json', 'utf-8', (err, data) => {
        if(!err) {
            res.send(data);
        }
    })
});

server.post('/catalog', (req, res) => {
    fs.readFile('./server/db/catalog.json', 'utf-8', (err, data) => {
        if(!err) {
            let dataCatalog = JSON.parse(data);

            let newItem = req.body;
            newItem.id_product = 'id_' + Date.now();

            dataCatalog.push(newItem);

            fs.writeFile('./server/db/catalog.json', JSON.stringify(dataCatalog, null, ' '), err => {
                if(!err) {
                    res.json({ id: newItem.id_product });
                } else {
                    console.log(err);
                }
            })
        }
    })
})

server.post('/addtobasket', (req, res) => {
    
    fs.readFile('./server/db/basket.json', 'utf-8', (err, data) => {
        if(!err) {
            let item = req.body;
            let basketContents = JSON.parse(data);
            // let basketContents = dataBasket.contents;
            let find = basketContents.find(el => el.id_product == item.id_product);
                if (!find) {
                    basketContents.push(Object.assign({}, item, {quantity: 1}));
                } else {
                    find.quantity++;
                }

            fs.writeFile('./server/db/basket.json', JSON.stringify(basketContents, null, ' '), err => {
                if(!err) {
                    res.json({ id: item.id_product });
                } else {
                    console.log(err);
                }
            })
        }
    })
})



server.listen(3000, () => {
    console.log('Server runs at 3000...');
});