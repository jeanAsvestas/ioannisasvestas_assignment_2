# NodeJS with ExpressJS and Sequelize on a Many To Many Relationship

Steps to Reproduce
- Select a base folder (where a subfolder will be created) and run:
>`npx express-generator --view=ejs express003 `

- Run in terminal:
> `git init`

- Run in terminal:
> `npm install`

- Run in terminal:
> `npm install sequelize mysql2`

- Run in terminal:
> `npm install --save-dev sequelize-cli`

- Run in terminal:
> `npx sequelize-cli init`

- Amend the config/config.json file to reflect your MySQL Database server with your credentials and the database you need to use

- Run in terminal:
> `npx sequelize-cli model:generate --name Customer --attributes firstName:string,lastName:string,email:string,tel:string`

- Run in terminal:
> `npx sequelize-cli model:generate --name Product --attributes name:string,price:double,description:string`

- Run in terminal:
> `npx sequelize-cli model:generate --name Order --attributes customerId:integer,productId:integer,quantity:integer,totalprice:double`

- Amend the Customer and Product models as follows:
### models/customer.js
> `Customer.belongsToMany(models.Product, {
        through: "Order",
        as: "orders",
        foreignKey: "customerId"
      });`

### models/prouct.js
> `Product.belongsToMany(models.Customer, {
        through: "Order",
        as: "orders",
        foreignKey: "productId"
      });`

- Amend the migration file of the order as follows:
### migrations/20220215084920-create-order.js
> `customerId: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'Customers',
          key: 'id'
        }
      },
      productId: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'Products',
          key: 'id'
        }
      },`

- Create a MySQL database called: 
> `express003`

- Run in terminal:
> `npx sequelize-cli db:migrate` 
