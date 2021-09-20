const { Command } = require('discord.js-commando')
const { MessageEmbed, Message } = require('discord.js')
const axios = require ('axios');
const cheerio = require('cheerio');


module.exports = class crypto extends Command {
    constructor(client) {
        super(client, {
            name:"crypto",
            aliases: [],
            group: 'misc',
            memberName: 'crypto',
            description: 'Sends the current value of the specified stock.',
            args: [
                {
                    type:"string",
                    prompt:"Which coin would you like to see? options []",
                    key:"coin",
                }
            ]
        })
    }

    run(msg, { coin }) {

        let coins = []
        const url = `https://coinmarketcap.com/currencies/${coin}`;
        axios ( url ).then( response => {
            const $ = cheerio.load(response.data);

            let coinName = $('#__next > div > div.main-content > div.sc-57oli2-0.comDeo.cmc-body-wrapper > div > div.sc-16r8icm-0.eMxKgr.container > div.n78udj-0.jskEGI > div > div.sc-16r8icm-0.kDzKwW.nameSection > div.sc-16r8icm-0.gpRPnR.nameHeader > h2').text();
            let price = $(`#__next > div > div.main-content > div.sc-57oli2-0.comDeo.cmc-body-wrapper > div > div.sc-16r8icm-0.eMxKgr.container > div.n78udj-0.jskEGI > div > div.sc-16r8icm-0.kjciSH.priceSection > div.sc-16r8icm-0.kjciSH.priceTitle > div`).text();
            let dayChange = $(`#__next > div > div.main-content > div.sc-57oli2-0.comDeo.cmc-body-wrapper > div > div.sc-16r8icm-0.jKrmxw.container > div > div.sc-16r8icm-0.sc-19zk94m-1.gRSJaB > div.sc-16r8icm-0.iutcov > div.sc-16r8icm-0.hgKnTV > div > div:nth-child(2) > table > tbody > tr:nth-child(2) > td > div > span`).text();
            let marketCap = $(`#__next > div > div.main-content > div.sc-57oli2-0.comDeo.cmc-body-wrapper > div > div.sc-16r8icm-0.jKrmxw.container > div > div.sc-16r8icm-0.sc-19zk94m-1.gRSJaB > div.sc-16r8icm-0.iutcov > div.sc-16r8icm-0.hgKnTV > div > div:nth-child(3) > table > tbody > tr:nth-child(1) > td > span`).text();
            let volume = $(`#__next > div > div.main-content > div.sc-57oli2-0.comDeo.cmc-body-wrapper > div > div.sc-16r8icm-0.jKrmxw.container > div > div.sc-16r8icm-0.sc-19zk94m-1.gRSJaB > div.sc-16r8icm-0.iutcov > div.sc-16r8icm-0.hgKnTV > div > div:nth-child(2) > table > tbody > tr:nth-child(4) > td > span`).text();
            let icon = $(`#__next > div > div.main-content > div.sc-57oli2-0.comDeo.cmc-body-wrapper > div > div.sc-16r8icm-0.eMxKgr.container > div.n78udj-0.jskEGI > div > div.sc-16r8icm-0.kDzKwW.nameSection > div.sc-16r8icm-0.gpRPnR.nameHeader > img`).attr('src')



            let embed = new MessageEmbed()
            .setTitle(coinName)
            .setAuthor('Nuke_Bot', 'https://cdn.discordapp.com/avatars/666057269926035494/e11a73abd0445fd70058ba7511609aa9.png?size=256', 'https://discord.gg/8CVfrPfy2k')
            .setThumbnail(icon)
            .setDescription(`Current Statistics for ${coinName}`)
            .addField(`Price`, price, true)
            .addField(`24 Hour Change`, dayChange, true)
            .addField(`Market Cap`, marketCap, false)
            .addField(`Trading Volume`, volume, true)
            .setColor("GOLD")
            .setTimestamp()
            msg.embed(embed)

        })

            
                

        }
}


// Aync Code

// async function getPriceFeed(msg, coin) {
//     try {
//         const siteUrl = 'https://coinmarketcap.com/'

//         const { data } = await axios({
//             method: "GET",
//             url: siteUrl,
//         })

//         const $ = cheerio.load(data)
//         const elemSelector = '#__next > div.bywovg-1.sXmSU > div.main-content > div.sc-57oli2-0.comDeo.cmc-body-wrapper > div > div > div.h7vnx2-1.bFzXgL > table > tbody > tr' // google chrome right click copy selector in dev tools

//         const keys = [
//             'rank',
//             'name',
//             'price',
//             'day',
//             'week',
//             'marketCap',
//             'volume',
//             'circulatingSupply'
//         ]

//         const coinArr = []

//         $(elemSelector).each((parentIdx, parentElem) => {
//             let keyIdx = 0
//             const coinObj = {}

//             if (parentIdx <= 9){
//                 $(parentElem).children().each((childIdx, childElem) => {
//                     let tdValue = $(childElem).text()

//                     if (keyIdx === 1 || keyIdx === 6) {
//                         tdValue = $('p:first-child', $(childElem).html()).text()
//                     }

//                     if (tdValue) {
//                         coinObj[keys[keyIdx]] = tdValue

//                         keyIdx++
//                     }
//                 })
//                 coinArr.push(coinObj)
//             }
//         })
//         return coinArr

//         // console.log(coinArr)
//     } catch(err) {
//         console.error(err)
//     }
// }
