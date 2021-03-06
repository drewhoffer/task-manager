const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const Task = require('./task')
const beautifyUnique = require('mongoose-beautiful-unique-validation');

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		trim: true,
	},
	email:{
		type: String,
		unique: 'Not unique ({VALUE})',
		required: true,
		trim: true,
		lowercase: true,
		validate(value){
			if(!validator.isEmail(value)){
				throw new Error('Invalid email!')
			}
		}
	},
	tokens: [{
		token:{
			type: String,
			required: true
		}
	}],
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
		minlength: 7,
		trim: true,
		validate(value){
			if (value.toLowerCase().includes('password')){
				throw new Error('Password cannot include password!')
			}
		}
	},
	avatar:{
		type: Buffer
	}

}, {
	timestamps: true
})

userSchema.plugin(beautifyUnique);

userSchema.virtual('tasks',{
	ref: 'Task',
	localField: '_id',
	foreignField: 'owner'
})

userSchema.methods.toJSON = function() {
	const user = this
	const userObject = user.toObject()
	
	delete userObject.password
	delete userObject.tokens
	return userObject
}


//methods are available on object
userSchema.methods.generateAuthToken = async function () {
	const user = this
	const token = jwt.sign({_id: user._id.toString()}, process.env.JWT_SECRET, {expiresIn: '3 days'})


	user.tokens = user.tokens.concat({ token })
	await user.save()
	return token
}



//statics are available on model
userSchema.statics.findByCredentials = async (email, password) =>{
	const user = await User.findOne({email})
	if (!user){
		throw new Error('Invalid email or password!')
	}

	const isMatch = await bcrypt.compare(password, user.password)

	if (!isMatch){
		throw new Error('Invalid email or password!')
	}

	return user

}


//Hash the plain text password before saving
userSchema.pre('save', async function(next) {	
	const user = this
	if (user.isModified('password')){
		user.password = await bcrypt.hash(user.password, 8)
	}

	next()

})
//delete user tasks when user is removed
userSchema.pre('remove', async function (next){
	const user = this
	await Task.deleteMany({owner: user._id})
	next()
})

const User = mongoose.model('User', userSchema)


module.exports = User