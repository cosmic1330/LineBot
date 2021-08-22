`下載image`
docker pull mongo:4.1

`執行+volumne`
docker run --name mongo4 -v C:\Users\yang\Desktop\projects\LineBot\db/data:/data/db -d -p 27017:27017 --rm mongo:4.1

`檢查狀態`
docker exec mongo4 mongo --eval "print(version())"

`進入容器`
docker exec -it mongo4 bash

`進入mango`
```cmd
mongo
show dbs
use myproject 建立db
db.echo.insertOne( { x : 1 } ) 新增一筆資料
db.echo.remove() 刪除echo所有資料
show collections
db.echo.find() 查詢echo所有資料
db.echo.findOne() 查詢echo第一筆資料
db.echo.update({"name":"lecaf"}, {"age":10}) 修改資料，其中name=lecaf 為查詢條件，"age":10是修改内容

db.serverStatus().connections; 查看db連線數量
```
`關閉`
docker stop mongo4
