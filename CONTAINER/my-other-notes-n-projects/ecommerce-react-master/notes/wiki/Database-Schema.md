![RTC Size Table](https://user-images.githubusercontent.com/67562159/105773249-999a6200-5f31-11eb-98f6-64eebf45566e.png)



## `Users`

| column name       | data type | details                   |
|:------------------|:---------:|:--------------------------|
| `id`              | integer   | not null, PK     |
| `username`        | string    | not null, unique |
| `email`           | string    | not null, unique |
| `hashedPassword`  | string.binary    | not null                  |
| `firstName`  | string    | not null                  |
| `lastName`  | string    | not null                  |
| `streetAddress`  | string    | not null                  |
| `city`  | string    | not null                  |
| `stateProvince`  | string    | not null                  |
| `country`  | string    | not null                  |
| `postalCode`  | integer    | not null                  |
| `createdAt`       | datetime  |                   |
| `updatedAt`       | datetime  |                   |

-   Sequelize `hasMany` `Reviews` association
-   Sequelize `hasMany` `Orders` association


## `Reviews`

| column name          | data type | details                        |
|:---------------------|:---------:|:-------------------------------|
| `id`                 | integer   | not null, PK          |
| `rating`               | integer    | not null                       |
| `content`           | textarea   |                                       |
| `userId`           | integer   |   not null, FK
| `productId`           | integer   | not null, FK
| `createdAt`          | datetime  |                        |
| `updatedAt`          | datetime  |                       |

- `userId` references `Users` table
- `productId` reference `Products` table
-   Sequelize `belongsTo` `Users` association
-   Sequelize `belongsTo` `Products` association

## `Products`

| column name       | data type | details                        |
|:------------------|:---------:|:-------------------------------|
| `id`              | integer   | not null, PK          |
| `name`          | string   | not null |
| `description`         | textarea   | not null |
| `retailPrice`         | numeric   | not null |
| `productImg`         | string   | not null |
| `categoryId`         | integer   | not null, FK |
| `createdAt`       | datetime  | not null                       |
| `updatedAt`       | datetime  | not null                       |

- `categoryId` references `Categories` table
- Sequelize `belongsToMany` `Tags` association through `ProductTags` table
- Sequelize `belongsToMany` `Sizes` through `ProductSizes` table
- Sequelize `belongsTo` `Categories` association
- Sequelize `hasMany` `Reviews` association
- Sequelize `hasMany` `OrderItems` association

## `Categories`

| column name       | data type | details                        |
|:------------------|:---------:|:-------------------------------|
| `id`              | integer   | not null, PK          |
| `name`          | string   | not null |
| `createdAt`       | datetime  | not null                       |
| `updatedAt`       | datetime  | not null                       |

- Sequelize `hasMany` `Products` association

## `Tags`

| column name       | data type | details                        |
|:------------------|:---------:|:-------------------------------|
| `id`              | integer   | not null, PK          |
| `name`          | string   | not null |
| `createdAt`       | datetime  | not null                       |
| `updatedAt`       | datetime  | not null                       |

- Sequelize `belongsToMany` `Products` association through `ProductTags` table

## `ProductTags`

| column name       | data type | details                        |
|:------------------|:---------:|:-------------------------------|
| `id`              | integer   | not null, PK          |
| `tagId`          | integer   | not null  |
| `productId`         | integer   | not null  |
| `createdAt`       | datetime  | not null                       |
| `updatedAt`       | datetime  | not null                       |

- `tagId` references `Tags` table
- `productId` references `Products` table

## `Sizes`

| column name       | data type | details                        |
|:------------------|:---------:|:-------------------------------|
| `id`              | integer   | not null, PK          |
| `size`          | string   | not null |
| `createdAt`       | datetime  | not null                       |
| `updatedAt`       | datetime  | not null                       |

- Sequelize `belongsToMany` `Products` association through `ProductSizes` table

## `ProductSizes`

| column name       | data type | details                        |
|:------------------|:---------:|:-------------------------------|
| `id`              | integer   | not null, PK          |
| `inventoryNum`          | integer   | not null  |
| `productId`         | integer   | not null  |
| `sizeId`         | integer   | not null  |
| `createdAt`       | datetime  | not null                       |
| `updatedAt`       | datetime  | not null                       |

- `productId` references `Products` table
- `sizeId` references `Sizes` table

## `Orders`

| column name       | data type | details                        |
|:------------------|:---------:|:-------------------------------|
| `id`              | integer   | not null, PK          |
| `startDate`         | dateOnly   | not null  |
| `endDate`         | dateOnly   | not null  |
| `orderTotal`         | dateOnly   | not null  |
| `userId`         | integer   | not null, FK  |
| `createdAt`       | datetime  | not null                       |
| `updatedAt`       | datetime  | not null                       |

- `userId` references `Users` table
- Sequelize `belongsTo` `Users` association
- Sequelize `belongsTo` `OrderItems` association

## `OrderItems`

| column name       | data type | details                        |
|:------------------|:---------:|:-------------------------------|
| `id`              | integer   | not null, PK          |
| `productQty`          | integer   | not null  |
| `productPrice`         | numeric   | not null  |
| `productId`         | integer   | not null, FK  |
| `orderId`         | integer   | not null, FK  |
| `createdAt`       | datetime  | not null                       |
| `updatedAt`       | datetime  | not null                       |

- `productId` references `Products` table
- `orderId` references `Orders` table
- Sequelize `belongsTo` `Products` association
- Sequelize `belongsToMany` `Orders` association