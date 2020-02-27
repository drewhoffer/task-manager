//CRUD operations

// const mongodb = require('mongodb')
// const MongoClient = mongodb.MongoClient
// const ObjectID = mongodb.ObjectID

const {MongoClient, ObjectID} = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if(error){
        return console.log('Unable to connect to database')
    }

    const db = client.db(databaseName)

    // db.collection('users').update({
    //     _id: new ObjectID("5e58139aec7db0236c97a40d")
    // }, {
    //     $inc:{
    //         age: -1
    //     }
        
    // }).then((result) => {
    //     //good 
    // }).catch((error) => {
    //     //bad
    // })


   db.collection('tasks').deleteMany({
       completed: false
    }).then( (result) => {
        console.log(result.deletedCount)
    }).catch( (error) => {
        console.log(error)
    }) 
})