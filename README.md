# Phonebook_backend

**How to work with the database MongoDB**

At least you have to create an account on MongoDB Atlas and get a cluster

- URL to connect to the DB -> mongodb+srv://(username):(password)@cluster0.1whhc.mongodb.net/(appName)?retryWrites=true&w=majority

Each word have to be replaced by your credentials (save them carefully ! 🚨)

**How to create a person in the phonebook ?**

```js
node mongo.js yourpassword Anna 040-1234556
```

or

```js
node mongo.js yourpassword "Arto Vihavainen" 045-1232456
```

- yourpassword -> enter password of the DB here
