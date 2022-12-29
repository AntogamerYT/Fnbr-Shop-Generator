# Fnbr-Shop-Generator

## Hosting

Input your Fnbr.co api key in site/public/index.js, edit the discord webhook url in index.js (or remove it completely, the one in the file got deleted) and start everything with `node index.js` 
also create a folder called screenshots

## Ports

Main site: 3851
Image server: 3852

Use your-ip:3852/api/getLatestImg to get the image of the day

server updates at 00:00:30 EST, takes about 30 seconds to screenshot
If the image is blank use the your-ip:3851/api/retake endpoint to retake the screenshot
