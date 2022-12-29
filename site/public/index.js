const data = await fetch('https://fnbr.co/api/shop', {
    method: 'GET',
    headers: {
        "x-api-key": "your api key here"
}})
const json = await data.json()

const basicExpressUrl = 'http://localhost:3851'

const resizeText = (txt, maxWidth, fontSize, ctx) => {
    ctx.font = `${fontSize}px BurbankBigCondensed-Black`;
    var minFontSize = 10;
    var width = ctx.measureText(txt).width;
    if (width > maxWidth) {
      var newfontSize = fontSize;
      var decrement = 1;
      var newWidth;
      while (width > maxWidth) {
        newfontSize -= decrement;
        if (newfontSize < minFontSize) { 
          return { fontSize: `${minFontSize}px`}; 
        }
        ctx.font = `${newfontSize}px BurbankBigCondensed-Black`;
        newWidth = ctx.measureText(txt).width;
        if(newWidth < maxWidth && decrement === 1){
          decrement = 0.1;
          newfontSize += 1;
        } else {
          width = newWidth;
        }
      }
      return { fontSize: `${newfontSize}px` };
    } else {
      return { fontSize: `${fontSize}px` };
    }
}

for (let section of json.data.sections) {
    let sectionDiv = document.createElement('div')
    let attr = document.createAttribute('id')
    attr.value = section.key
    sectionDiv.setAttributeNode(attr)
    let sectSub = document.createElement("div")
    sectSub.style.display = "grid"
    sectSub.style.gridTemplateColumns = "repeat(6, 250px)"
    sectSub.style.gap = "10px"
    sectSub.style.justifyContent = "center"
    sectSub.style.alignItems = "center"
    sectSub.style.allignContent = "center"
    let subId = document.createAttribute('id')
    subId.value = section.key + "Sub"
    sectSub.setAttributeNode(subId)
    document.body.appendChild(sectionDiv)
    document.body.appendChild(sectSub)


    let sectionH2 = document.createElement('h2')
    sectionH2.innerText = section.displayName
    sectionDiv.appendChild(sectionH2)
    if(section.displayName == 'Daily') {
        for(let item of json.data.daily) {
                let itemDiv = document.createElement('div')
                attr = document.createAttribute('id')
                attr.value = section.key + "_" + item.id
                itemDiv.setAttributeNode(attr)
                sectSub.appendChild(itemDiv)

                const itemCanvas = document.createElement('canvas')
                itemCanvas.width = 256
                itemCanvas.height = 256
                const ctx = itemCanvas.getContext('2d')
                let rarityImg = new Image()
                rarityImg.src = basicExpressUrl + "/public/rarities/" + item.rarity + ".png"
                await new Promise(resolve => rarityImg.onload = resolve)
                ctx.drawImage(rarityImg, 0, 0)
                let itemBaseIconUrl = item.images.icon.replace("icon", "icon_256") || item.images.featured.replace("featured", "featured_256")
                let itemBaseIcon = new Image()
                itemBaseIcon.src = itemBaseIconUrl
                await new Promise(resolve => itemBaseIcon.onload = resolve)
                ctx.drawImage(itemBaseIcon, 0, 0)
                let textFade = new Image()
                textFade.src = "http://localhost:3851/public/imgs/text_fade.png"
                await new Promise(resolve => textFade.onload = resolve)
                ctx.drawImage(textFade, 0, 0)
                ctx.font = "25px BurbankBigCondensed-Black"
                ctx.fontSize = resizeText(item.name, ctx.measureText(item.name).width, 256, ctx).fontSize
                ctx.fillStyle = "white"
                let textWidth = ctx.measureText(item.name).width
                let textX = (256 - textWidth) / 2
                ctx.fillText(item.name, textX, 200)
                let vbucksImg = new Image()
                vbucksImg.src = item.priceIconLink
                await new Promise(resolve => vbucksImg.onload = resolve)
                ctx.drawImage(vbucksImg, 60, 210, 35, 35)
                ctx.font = "25px BurbankBigCondensed-Black"
                ctx.fillStyle = "white"
                ctx.fontSize = resizeText(item.price, ctx.measureText(item.price).width, 256, ctx).fontSize
                ctx.fillText(item.price, 100, 235)
                itemDiv.appendChild(itemCanvas)
        }
    }
    for (const item of json.data.featured) {
            for (const itemcag of section.items) {
                if (item.id !== itemcag) {
                    continue;
                }
                let itemDiv = document.createElement('div')
                attr = document.createAttribute('id')
                attr.value = item.id
                itemDiv.setAttributeNode(attr)
                sectSub.appendChild(itemDiv)

                const itemCanvas = document.createElement('canvas')
                itemCanvas.width = 256
                itemCanvas.height = 256
                const ctx = itemCanvas.getContext('2d')
                let rarityImg = new Image()
                rarityImg.src = basicExpressUrl + "/public/rarities/" + item.rarity + ".png"
                await new Promise(resolve => rarityImg.onload = resolve)
                ctx.drawImage(rarityImg, 0, 0)
                let itemBaseIconUrl = item.images.icon.replace("icon", "icon_256") || item.images.featured.replace("featured", "featured_256")
                let itemBaseIcon = new Image()
                itemBaseIcon.src = itemBaseIconUrl
                await new Promise(resolve => itemBaseIcon.onload = resolve)
                ctx.drawImage(itemBaseIcon, 0, 0)
                let textFade = new Image()
                textFade.src = basicExpressUrl + "/public/imgs/text_fade.png"
                await new Promise(resolve => textFade.onload = resolve)
                ctx.drawImage(textFade, 0, 0)
                ctx.font = "25px BurbankBigCondensed-Black"
                ctx.fontSize = resizeText(item.name, ctx.measureText(item.name).width, 256, ctx).fontSize
                ctx.fillStyle = "white"
                let textWidth = ctx.measureText(item.name).width
                let textX = (256 - textWidth) / 2
                ctx.fillText(item.name, textX, 200)
                let vbucksImg = new Image()
                vbucksImg.src = item.priceIconLink
                await new Promise(resolve => vbucksImg.onload = resolve)
                ctx.drawImage(vbucksImg, 90, 205, 35, 35)
                ctx.font = "25px BurbankBigCondensed-Black"
                ctx.fillStyle = "white"
                ctx.fontSize = resizeText(item.price, ctx.measureText(item.price).width, 256, ctx).fontSize
                ctx.fillText(item.price, 128, 230)
                itemDiv.appendChild(itemCanvas)
            }
            }
        }
    

const footer = document.createElement('footer')
footer.innerText = "Made by ❤️ and a 💻 by AntogamerYT on GitHub"
footer.style.fontSize = "30px"
document.body.appendChild(footer)


