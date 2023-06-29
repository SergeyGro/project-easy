const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
app.use(express.static('../public'));
app.use(bodyParser.json());
app.get('/catalogData', (req, res) => {
    fs.readFile('catalog.json', 'utf8', (err, data) => {
        if (err) res.send(JSON.stringify({ result: 0, err }));
        else res.send(data);
    });
});
app.get('/addToCart', (req, res) => {
    fs.readFile('cart.json', 'utf8', (err, data) => {
        if (err) res.send(JSON.stringify({ result: 0, err }));
        else res.send(data);
    });
});
app.get('/productItem', (req, res) => {
    fs.readFile('productitem.json', 'utf8', (err, data) => {
        if (err) res.send(JSON.stringify({ result: 0, err }));
        else res.send(data);
    });
});
app.get('/search', (req, res) => {
    fs.readFile('search.json', 'utf8', (err, data) => {
        if (err) res.send(JSON.stringify({ result: 0, err }));
        else res.send(data);
    });
});
app.post('/addToCart', (req, res) => {
    fs.readFile('cart.json', 'utf8', (err, data) => {
        if (err) {
            res.send('{"result":0}');
        } else {
            const cart = JSON.parse(data);
            const item = req.body;
            cart.push(item);
            fs.writeFile('cart.json', JSON.stringify(cart), (err) => {
                if (err) {
                    res.send('{"result":0}');
                } else {
                    res.send('{"result":1}');
                }
            });
        }
    });
});
app.post('/productItem', (req, res) => {
    fs.readFile('productitem.json', 'utf8', (err, data) => {
        if (err) {
            res.send('{"result":0}');
        } else {
            const product = JSON.parse(data);
            const item = req.body;
            product.splice(0, 1, item);
            fs.writeFile('productitem.json', JSON.stringify(product), (err) => {
                if (err) {
                    res.send('{"result":0}');
                } else {
                    res.send('{"result":1}');
                }
            });
        }
    });
});
app.post('/search', (req, res) => {
    fs.readFile('search.json', 'utf8', (err, data) => {
        if (err) {
            res.send('{"result":0}');
        } else {
            const search = JSON.parse(data);
            const value = req.body;
            search.splice(0, 1, value);
            fs.writeFile('search.json', JSON.stringify(search), (err) => {
                if (err) {
                    res.send('{"result":0}');
                } else {
                    res.send('{"result":1}');
                }
            });
        }
    });
});
app.put('/addToCart/:id', (req, res) => {
    fs.readFile('cart.json', 'utf8', (err, data) => {
        if (err) {
            res.send('{"result":0}');
        } else {
            const cart = JSON.parse(data);
            const find = cart.find((good) => {
                return good.id === +req.params.id
            });
            find.quantity += req.body.quantity;

            fs.writeFile('cart.json', JSON.stringify(cart), (err) => {
                if (err) res.send(err);
                else res.send(JSON.stringify({ result: 1 }));
            });
        }
    });
});
app.delete('/addToCart/:id', (req, res) => {
    fs.readFile('cart.json', 'utf8', (err, data) => {
        if (err) {
            res.send('{"result":0}');
        } else {
            const cart = JSON.parse(data);
            const find = cart.find((good) => {
                return good.id === +req.params.id
            });
            cart.splice(find, 1);

            fs.writeFile('cart.json', JSON.stringify(cart), (err) => {
                if (err) res.send(err);
                else res.send(JSON.stringify({ result: 1 }));
            });
        }
    });
});
app.delete('/addToCart', (req, res) => {
    fs.readFile('cart.json', 'utf8', (err, data) => {
        if (err) {
            res.send('{"result":0}');
        } else {
            const cart = JSON.parse(data);
            cart.splice(0, cart.length);

            fs.writeFile('cart.json', JSON.stringify(cart), (err) => {
                if (err) res.send(err);
                else res.send(JSON.stringify({ result: 1 }));
            });
        }
    });
});
app.listen(3000, function () {
    console.log('server is running on port 3000!');
});