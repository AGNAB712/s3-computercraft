const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(express.static('public'))
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('home.ejs');
});

app.use((req, res, next) => {
    res.locals.sidebar = `<aside>
<h1>AGNAB SMP S3</h1>
<h2>CC tutorials</h2>

<div id="list"> <!--- i could not figure out lists --->

<div class="list-group">
<a href='/peripherals'>Peripherals</a> <br>
<a href='/peripherals/speaker' class="indent">Speakers</a> <br>
<a href='/peripherals/monitor' class="indent">Monitors</a> <br>
<a href='/peripherals/modem' class="indent">Modems</a> <br>
<a href='/peripherals/inventory' class="indent">Inventories</a> <br>
<a href='/peripherals/redstone' class="indent">Redstone</a> <br>
</div>
<a href='/pocket-computers'>Pocket Computers</a> <br>
<a href='/pocket-computers'>Turtles</a> <br>
<a href='/pocket-computers'>World Wide Web</a> <br>
<a href='/pocket-computers'>GPS</a> <br>

</div>
</aside>`;
    next();
});

app.get('/peripherals', (req, res) => {
  res.render('peripherals.ejs', { sidebar: res.locals.sidebar });
});
app.get('/peripherals/speaker', (req, res) => {
  res.render('speaker.ejs', { sidebar: res.locals.sidebar });
});
app.get('/peripherals/monitor', (req, res) => {
  res.render('monitor.ejs', { sidebar: res.locals.sidebar });
});
app.get('/peripherals/modem', (req, res) => {
  res.render('modem.ejs', { sidebar: res.locals.sidebar });
});
app.get('/peripherals/inventory', (req, res) => {
  res.render('inventory.ejs', { sidebar: res.locals.sidebar });
});
app.get('/peripherals/redstone', (req, res) => {
  res.render('redstone.ejs', { sidebar: res.locals.sidebar });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
