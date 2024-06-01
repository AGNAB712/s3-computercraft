const express = require('express');
const bodyParser = require('body-parser');
const puppeteer = require('puppeteer');
require("dotenv").config()

let page

async function startBrowser() {
  let browser;
  try {
    console.log("Opening the browser...");
    browser = await puppeteer.launch({
      args = [
        "--disable-set-uid-sandbox",
        "--no-sandbox",
        "--single-process",
        "--no-zygote"
      ],
      executablePath: process.env.NODE_ENV === "production" ? process.env.PUPPETEER_EXECUTABLE_PATH : puppeteer.executablePath()
    });
  } catch (err) {
    console.log("Could not create a browser instance => : ", err);
  }
  return browser;
}

async function startPuppeteer() {
  const browser = await startBrowser()
  page = await browser.newPage();
  await page.setUserAgent("Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36")
  await page.goto('https://kleki.com');
  console.log('puppeteer up and running Letsa go')
}
startPuppeteer()

const app = express();

app.use(express.json())
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

<a href='/first-program'>Your first program</a> <br>
<a href='/events'>Events</a> <br>
<a href='/displays'>Displays</a> <br>
<div class="list-group">
<a href='/peripherals'>Peripherals</a> <br>
<a href='/peripherals/speaker' class="indent">Speakers</a> <br>
<a href='/peripherals/monitor' class="indent">Monitors</a> <br>
<a href='/peripherals/modem' class="indent">Modems</a> <br>
<a href='/peripherals/inventory' class="indent">Inventories</a> <br>
<a href='/peripherals/redstone' class="indent">Redstone</a> <br>
</div>
<div class="list-group">
<a href='/turtles'>Turtles</a> <br>
<a href='/turtles/refueling' class="indent">Refueling</a> <br>
<a href='/turtles/movement' class="indent">Movement</a> <br>
<a href='/turtles/inventory' class="indent">Inventory</a> <br>
<div class="list-group-2">
<a href='/turtles/peripherals' class="indent">Peripherals</a> <br>
<a href='/turtles/crafting' class="indent-2">Crafting</a> <br>
<a href='/turtles/speaker' class="indent-2">Speakers</a> <br>
<a href='/turtles/world-interaction' class="indent-2">World interaction</a> <br>
</div>
</div>
<a href='/pocket-computers'>Pocket Computers</a> <br>
<a href='/www'>World Wide Web</a> <br>
<a href='/gps'>GPS</a> <br>

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

app.get('/turtles', (req, res) => {
  res.render('turtles.ejs', { sidebar: res.locals.sidebar });
});
app.get('/turtles/refueling', (req, res) => {
  res.render('refueling.ejs', { sidebar: res.locals.sidebar });
});
app.get('/turtles/movement', (req, res) => {
  res.render('movement.ejs', { sidebar: res.locals.sidebar });
});
app.get('/turtles/inventory', (req, res) => {
  res.render('turtleinventory.ejs', { sidebar: res.locals.sidebar });
});
app.get('/turtles/peripherals', (req, res) => {
  res.render('turtleperipherals.ejs', { sidebar: res.locals.sidebar });
});
app.get('/turtles/crafting', (req, res) => {
  res.render('turtlecrafting.ejs', { sidebar: res.locals.sidebar });
});
app.get('/turtles/speaker', (req, res) => {
  res.render('turtlespeaker.ejs', { sidebar: res.locals.sidebar });
});
app.get('/turtles/world-interaction', (req, res) => {
  res.render('worldinteraction.ejs', { sidebar: res.locals.sidebar });
});


app.get('/getFrame', async (req, res) => {
  const screenshot = await page.screenshot();

  res.set('Content-Type', 'image/png');
  res.send(screenshot);
});
app.post('/click', async (req, res) => {
  const { x, y } = req.body

  try {
    await page.mouse.click(x, y)
    res.send('clicked at coordinates')
  } catch (error) {
    res.status(500).send(`error clicking at coordinates: ${error}`)
  }
})


process.on('exit', async () => {
  if (browser) {
    await browser.close()
  }
})


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
