//CRUD operations

const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if(error){
        return console.log('Unable to connect to database')
    }

    const db = client.db(databaseName)
   
   
    // db.collection('users').insertOne({
    //     name: 'Drew',
    //     age: 23
    // }, (error, result) => {
    //     if (error){
    //         return console.log('Error inserting user')
    //     }

    //     console.log(result.ops)
    // })

    db.collection('tasks').insertMany([
        {
            description: 'This is a description',
            completed: true,
        },
        {
            description: 'This isn\'t a description',
            completed: false
        },
        {
            description: 'This is a weenie description',
            completed: true
        }
    ], (error, results) =>{
        
            if (error){
            return console.log('oof')
        }
        console.log(results.ops)
    })



})