### 1) Sizes

```js
npx sequelize-cli model:generate --name Size --attributes size:string
```

### 2) Tags

```js
npx sequelize-cli model:generate --name Tag --attributes name:string
```

### 3) Categories
```js
npx sequelize-cli model:generate --name Category --attributes name:string
```

### 4) Orders

```js
npx sequelize-cli model:generate --name Order --attributes orderDate:dateTime,startDate:dateOnly,endDate:dateOnly,orderTotal:number,userId:integer
```


### 5) Products

```js
npx sequelize-cli model:generate --name Product --attributes name:string,description:text,retailPrice:number,productImg:string,categoryId:integer
```

### 6) Reviews

```js
npx sequelize-cli model:generate --name Review --attributes rating:integer,content:text,userId:integer,productId:integer
```

### 7) OrderItems

```js
npx sequelize-cli model:generate --name OrderItem --attributes productQty:integer,productPrice:number,productId:integer,orderId:integer
```

### 8) ProductSizes

```js
npx sequelize-cli model:generate --name ProductSize --attributes inventoryNum:integer,productId:integer,sizeId:integer
```

### 9) Product Tags

```js
npx sequelize-cli model:generate --name ProductTag --attributes tagId:integer,productId:integer
```
