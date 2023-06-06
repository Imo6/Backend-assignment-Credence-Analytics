/*
const { MongoClient } = require('mongodb');

// Connection URL
const url = "mongodb://0.0.0.0:27017/";
const client = new MongoClient(url);

// Database Name
const dbName = 'credenceDb';

async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection('documents');

  // the following code examples can be pasted here...

  return 'databse connection done!!';
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());
  */

const express = require('express')
const mongoose = require('mongoose')
const url = 'mongodb://0.0.0.0:27017/credenceDb'

const app = express()

mongoose.connect(url, {useNewUrlParser:true})
const con = mongoose.connection

con.on('open', () => {
    console.log('connected...')
})

//middleware configuration
app.use(express.json())
//middleware configuration
const usersRouter=require('./routes/users')
//middleware configuration
//for all the users request you have sent the request to usersRouter
app.use('/users',usersRouter)

app.listen(9000,()=>{
    console.log('server started on port 9000...')
})