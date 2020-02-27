const mongoose = require('mongoose')
const validator = require('validator')



mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
	useNewUrlParser: true,
	useCreateIndex: true
})




const User = mongoose.model('User', {
	name: {
		type: String,
		required: true,
		trim: true
	},
	email:{
		type: String,
		required: true,
		trim: true,
		lowercase: true,
		validate(value){
			if(!validator.isEmail(value)){
				throw new Error('Invalid email!')
			}
		}
	},
	age:{
		type: Number,
		default: 0,
		validate(value) {
			if (value < 0){
				throw new Error('Age must be a positive number!')
			}
		}
	},
	password:{
		type: String,
		required: true,
		minLength: 7,
		trim: true,
		validate(value){
			if (value.toLowerCase().includes('password')){
				throw new Error('Password cannot be password')
			}
		}
	}

})



const Task = mongoose.model('Task', {
	description: {
		type: String,
		trim: true,
		required: true
	},
	completed:{
		type: Boolean,
		default: false
	}

})



// const newUser = new User({
// 	name: 'Drew',
// 	age: 23
// }) 

// newUser.save().then(() => {
// 	return console.log(newUser)
// }).catch( (error) => {
// 	return console.log(error)
// })




// const newTask = new Task({
// 	description: 'This is a task we need to do.',
// 	completed: true
// })


// newTask.save().then( (results) => {
// 	console.log(results)
// }).catch( (error) => {
// 	console.log(error)
// })