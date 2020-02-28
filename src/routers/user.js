const express = require('express')
const router = new express.Router()
const User = require('../models/user')


//create a user
router.post('/users', async (req, res) => {
	const user = new User(req.body)
	
	try{
		await user.save()
		res.status(201).send(user)
	}
	catch(e){
		res.status(400).send(e)
	}
})
//Read all users in db
router.get('/users', async (req, res) => {
	try{
		const users = await User.find({})
		res.send(users)
	}
	catch(e){
		res.status(500).send()
	}
})


//get user based on id
router.get('/users/:id', async (req, res) => {
	
	try{
		const _id = req.params.id
		const user = await User.findById(_id)
		if (!user){
			return res.status(404).send()
		}
		res.send(user)
	}
	catch(e){
		res.status(500).send()
	}
})


router.patch('/users/:id', async (req, res) => {
	const updates = Object.keys(req.body)
	const allowedUpdates = ['name', 'email', 'password', 'age']
	// if the update is in the allowed updates
	const isValidOperation = updates.every(update => {return allowedUpdates.includes(update) })
	
	if (!isValidOperation){
		return res.status(400).send({error: 'Invalid updates!'})
	}
	
	try{
		const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
		if (!user){
			return res.status(404).send()
		}
		res.send(user)
	}
	catch(e){
		res.status(400).send(e)
	}
})


router.delete('/users/:id', async(req, res) =>{
	try{
		const user = await User.findByIdAndDelete(req.params.id)
		if (!user){
			return res.status(404).send()
		}
		res.send(user)
	}
	catch(e){
		res.status(500).send(e)
	}
})


module.exports = router


