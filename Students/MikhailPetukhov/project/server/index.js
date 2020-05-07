let express = require('express');
let fs = require('fs');

let server = express();

server.use(express.json());


// Production
// server.use('/', express.static('server/public'));

// HTML
server.get('/catalog', (request, response) => {
	fs.readFile('./server/db/catalog.json', 'utf-8', (err, data) => {
		if (!err) {
			response.send(data);
		}
	})
});

server.post('/catalog', (req, res) => {
	fs.readFile('./server/db/catalog.json', 'utf-8', (err, data) => {
		if (!err) {
			let dataCatalog = JSON.parse(data);

			let newItem = req.body;
			newItem.id = Date.now();

			dataCatalog.push(newItem);

			fs.writeFile('./server/db/catalog.json', JSON.stringify(dataCatalog, null, ' '), err => {
				if (!err) {
					res.json({ id: newItem.id });
				} else {
					console.log("err");
				}
			})
		}
	})	
})

server.listen(3000, () => {
	console.log("Server runs at 3000...");
});
