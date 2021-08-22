# Line Bot

## Database 
use Mongodb images or install Community

```cmd
docker run --name mongo4 -v C:\Users\yang\Desktop\projects\LineBot\db/data:/data/db -d -p 27017:27017 --rm mongo:4.1
```
### How to get new data

modify db\test.js content
```js
save()
// run()
// remove()
```
and cmd this in root
```cmd
node .\db\test.js
```

> please run remove() first before save()

## ENV
```cmd
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mbygz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
MONGODB_DB=<database>
```

## ngrok
install [ngrok](https://dashboard.ngrok.com/get-started/setup) and cd to ngrok's folder and cmd `./ngrok http 3000`

## Quick Start
```cmd
npm i
npm start
```