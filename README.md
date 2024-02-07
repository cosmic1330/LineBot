# Line Bot

## Database 
use Mongodb images or Mongodb Atlas
```cmd
docker run --name mongo6 -v ./db/data:/data/db -d -p 27017:27017
```
### How to run or test
modify db\test.js content
```cmd
npm run start
npm run test
```

> please run remove() first before save()

## ENV
```cmd
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.a7rte3w.mongodb.net/?retryWrites=true&w=majority
MONGODB_DB=<database>
CHANNEL_SECRET=<line channel secret>
CHANNEL_ACCESSTOKEN=<line channel access token>
COA_APIKEY=<gov api key>
GOOGLE_APIKEY=<google api key>
GOOGLE_SHEETID=<google sheet id>
GOOGLE_SERVICE_CLIENTEMAIL=<google service account email>
GOOGLE_SERVICE_PRIVATEKEY=<google service private key>
```
- MONGODB env create from [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) or Local Mongodb

- CHANNEL env create from [Line Developer](https://developers.line.biz/console/)

- COA env create from [政府資料開放平台](https://data.coa.gov.tw/Service/OpenData/FromM/AgriiOT?$top=1000&$format=json)

- GOOGLE env create from [Google Cloud Platform](https://console.cloud.google.com/)

    ![google-env]("./images/254929.jpg")

## ngrok
install [ngrok](https://dashboard.ngrok.com/get-started/setup) and cd to ngrok's folder and cmd `./ngrok http 3000`

## Quick Start
```cmd
npm i
npm run dev
```

## Deploy Heroku
```cmd
heroku login
heroku create fruit-price-line-bot
heroku git:remote -a fruit-price-line-bot
git push heroku master
```

## Deploy Vercel
```json
{
    "version": 2,
    "builds": [
        {
            "src": "server.js",
            "use": "@vercel/node"
        }
    ],
    "routes": [
        {
            "src": "/(.*)",
            "dest": "server.js"
        }
    ]
}
```

## Reference
### Line Emoji List
https://d.line-scdn.net/r/devcenter/sendable_line_emoji_list.pdf
