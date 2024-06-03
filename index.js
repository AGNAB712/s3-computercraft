const express = require('express');
const bodyParser = require('body-parser');
require("dotenv").config()
const converter = require('./converter.js')
const favicon = require('express-favicon');
const gTTS = require('gtts');
const ffmpeg = require('fluent-ffmpeg');
const lanugages = require('./languages.json')
const dfpwm = require('dfpwm')
const fs = require('fs');


const app = express();

app.use(express.json())
app.use(favicon(__dirname + '/public/img/favicon.png'));
app.use(express.static('public'))
app.set('view engine', 'ejs');

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
<a href='/gps'>GPS</a> <br>
<div class="list-group">
<a href='/'>World Wide Web/Advanced Lua</a> <br>
<a href='/wwwal/custom-audio' class="indent">Custom audio</a> <br>
<a href='/wwwal/custom-audio' class="indent">Libraries</a> <br>
<div class="list-group-2">
<a href='/wwwal/get' class="indent">HTTP: Get</a> <br>
<a href='/wwwal/post' class="indent">HTTP: Post</a> <br>
<a href='/wwwal/websockets' class="indent">HTTP: Websockets</a> <br>
</div>
</div>


</div>
</aside>`;
    next();
});

app.get('/', (req, res) => {
  res.render('home.ejs', { sidebar: res.locals.sidebar });
});

app.get('/first-program', (req, res) => {
  res.render('yourfirstprogram.ejs', { sidebar: res.locals.sidebar });
});
app.get('/events', (req, res) => {
  res.render('events.ejs', { sidebar: res.locals.sidebar });
});
app.get('/displays', (req, res) => {
  res.render('displays.ejs', { sidebar: res.locals.sidebar });
});

app.get('/gps', (req, res) => {
  res.redirect("https://tweaked.cc/guide/gps_setup.html");
});
app.get('/pocket-computers', (req, res) => {
  res.render('pocketcomputers.ejs', { sidebar: res.locals.sidebar });
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

app.get('/wwwal/custom-audio', (req, res) => {
  res.render('audio.ejs', { sidebar: res.locals.sidebar });
});
app.get('/wwwal/libraries', (req, res) => {
  res.render('libraries.ejs', { sidebar: res.locals.sidebar });
});
app.get('/wwwal/get', (req, res) => {
  res.render('get.ejs', { sidebar: res.locals.sidebar });
});
app.get('/wwwal/post', (req, res) => {
  res.render('post.ejs', { sidebar: res.locals.sidebar, index: postedTimes });
});
app.get('/wwwal/websockets', (req, res) => {
  res.render('websockets.ejs', { sidebar: res.locals.sidebar });
});

app.get('/api/get', (req, res) => {
  res.send('Hello you got the very cool message');
});
app.get('/api/getJson', (req, res) => {
  res.json({
    message: "Hello you got the very cool message",
    message_2: "This is the second message that you can get"
  });
});
app.get('/api/getEcho', (req, res) => {
  const text = req.query.text
  if (!text) res.send(400).send('Missing text query')
  res.send('Hello you inputted: '+text.toString());
});
let postedTimes = new Date();
app.post('/api/post', (req, res) => {
  const data = req.body
  console.log(data)
  if (!data?.text) {
    res.status(400).send("you're missing a text component in the json youre sending over buddy")
  } else {
    postedTimes = new Date()
    res.send('Data received successfully')
  }
  
})


app.get('/api/tts', async (req, res) => {
    console.log(req.query?.text, req.query?.voice)
    let output
    if (req.query.text) {
      let voice = req.query?.voice || 'en'
      req.query?.voice in lanugages ? voice : voice = 'en'
    const gtts = await new gTTS(req.query.text, voice);
    const buffer = gtts.save('temp.mp3', async function (err, result) {
      if(err) { throw new Error(err) }
      console.log('Finished TTS');
      convertMp3ToDFPWM('temp.mp3', res)
    });
    }
})

const encoder = new dfpwm.Encoder()
async function convertMp3ToDFPWM(inputFile, res) {
ffmpeg(inputFile)
  .outputOptions('-f s8')
  .outputOptions('-ar 44100')
  .outputOptions('-ac 1')
  .outputOptions('-acodec pcm_s8')
  .output('temp.pcm')
  .on('end', () => {
    const pcmData = fs.readFileSync('temp.pcm');
    const dfpwmData = encoder.encode(pcmData)
    res.send(dfpwmData)
  })
  .on('error', (err) => {
    console.error('Error during conversion:', err);
  })
  .run();
}





process.on('exit', async () => {
  if (browser) {
    await browser.close()
  }
})


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
