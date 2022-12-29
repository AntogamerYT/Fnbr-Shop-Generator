import express from 'express'
import fs from 'fs'
import puppeteer from 'puppeteer'
import { WebhookClient } from 'discord.js'
import cron from 'node-cron'

const webhook = new WebhookClient({ url: "https://discord.com/api/webhooks/1034440542345502760/4bxq9cJThAo_IFAbLRRgwWlCnPZ2sVmo-0t1VAg_M1bUIKHQqkNshASjB7s85c_NFY24" });

const app = express()
const imgApp = express()
// make route for every file of /site
app.use(express.static('site'))
//app.use(express.static('rarities'))
// make route for every file of /site/public
const getTime = () => {
    const now = new Date();
    const hours = now.getHours()
    const minutes = now.toLocaleTimeString("default", { minute: "2-digit" });
    const seconds = now.toLocaleTimeString("default", { second: "2-digit" });
    return hours + ":" + minutes + ":" + seconds;
}


app.listen(3851, "localhost", () => {
    console.log('Server is running on port 3851')
    let embed = {
        title: "Fnbr Image Generator",
        description: "The server is now running!"
    }
    webhook.send({
        username: "Fnbr Image Generator",
        embeds: [embed]
    })
    
})

const url = "http://localhost:3851";

const Screenshot = async () => {
    webhook.send({
        username: "Fnbr Image Generator",
        content: "<@658586788721590273> Screenshotting at " + getTime()
    })
    
    const now = new Date();
    const y = now.toLocaleDateString("default", { year: "numeric" });
    const m = now.toLocaleDateString("default", { month: "2-digit" });
    const d = now.toLocaleDateString("default", { day: "2-digit" });
    const ymd = y + "-" + m + "-" + d;
    
    if (fs.existsSync(`./screenshots/${ymd}.png`)) { console.log("A file with this date already exists, skipping screenshot"); return; }
    
    const browser = await puppeteer.launch({
        defaultViewport: { width: 1920, height: 1080 },
        headless: true
    });
    
    const page = await browser.newPage();
    
    await page.goto(url, {
        timeout: 10 * 1000
    });
    
    setTimeout(async () => {
        
        await page.screenshot({
            path: "./screenshots/" + ymd + ".png",
            fullPage: true
        });
    }, 45 * 1000)
    setTimeout(async () => {
        await page.close()
        await browser.close();
    }, 55 * 1000)
    setTimeout(async () => {
        let embed = {
            title: "Fnbr Image Generator",
            description: "[A new image has been generated!](https://vps.antogamer.it:3852/api/getLatestImg)",
        }
        webhook.send({
            username: "Fnbr Image Generator",
            body: "<@658586788721590273>",
            embeds: [embed]
        })
    }, 56 * 1000)
}

await Screenshot();

cron.schedule('30 0 0 * * *', async() => {
    
    let embed = {
        title: "Fnbr Image Generator",
        description: "It's 00:00, time to take a screenshot!",
        color: 0x00ff00
    }
    webhook.send({
        username: "Fnbr Image Generator",
        embeds: [embed]
    })
    await Screenshot() 
});

app.get('/api/retake', async(req, res) => {
   const now = new Date()
    const y = now.toLocaleDateString("default", { year: "numeric" }); 
    const m = now.toLocaleDateString("default", { month: "2-digit" });  
    const d = now.toLocaleDateString("default", { day: "2-digit" });    
    const ymd = y + "-" + m + "-" + d;
    if (!fs.existsSync(`./screenshots/${ymd}.png`)) { res.status(404); res.send("File doesn't exist"); return; }        
    await fs.unlinkSync(`./screenshots/${ymd}.png`)
    await Screenshot()
    res.send('Retaking')
})

imgApp.listen(3852, /*"localhost",*/() => {
    console.log('Img server is running on port 3852')
})

imgApp.get('/api/getLatestImg', async(req, res) => {
    const now = new Date()
    const y = now.toLocaleDateString("default", { year: "numeric" });
    const m = now.toLocaleDateString("default", { month: "2-digit" });
    const d = now.toLocaleDateString("default", { day: "2-digit" });
    const ymd = y + "-" + m + "-" + d;
    if (!fs.existsSync(`./screenshots/${ymd}.png`)) { res.status(404); res.send("File doesn't exist"); return; }
    res.sendFile(`${process.cwd()}/screenshots/${ymd}.png`)
})
