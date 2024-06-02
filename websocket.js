const socket = require('ws')
const puppeteer = require('puppeteer');
require("dotenv").config()
const converter = require('./converter.js')

let page


let clients = []
const websocket = new socket.Server({port:3000})

websocket.on("connection", wsClient => {

  console.log("Something connected")
  clients.push(wsClient)

  wsClient.on("message", async messageData => {
    console.log("Received message "+messageData.toString())
    const screenshot = await page.screenshot();

    const output = await converter.convertToComputerCraftImage(screenshot)
    console.log(output)

    clients.forEach(function(client){
      client.send(output)
    })
  })

  wsClient.on("close", () => {
    console.log("Disconnected")
  })

})




async function startBrowser() {
  let browser;
  try {
    console.log("Opening the browser...");
    browser = await puppeteer.launch({
      args: [
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
  await page.setViewport({
    width: 1640,
    height: 810,
    deviceScaleFactor: 1,
  });
  await page.setUserAgent("Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36")
  await page.goto('https://www.youtube.com/watch?v=kmEgaRGV9yU');
  console.log('puppeteer up and running Letsa go')
}
startPuppeteer()
