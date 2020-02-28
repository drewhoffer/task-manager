const express = require('express')
const router = new express.Router()
const Task = require('../models/task')




//create a task
router.post('/tasks', async (req, res) => {
	const task = new Task(req.body)
	try{
		await task.save()
		res.status(201).send(task)
	}
	catch(e){
		res.status(400).send(e)
	}
})



//Read all tasks in db 
router.get('/tasks', async (req, res) => {
	try{
		const tasks = await Task.find({})
		res.send(tasks)
	}
	catch(e){
		res.status(500).send()
	}
})



//get task based on id
router.get('/tasks/:id', async (req, res) => {
	try{
		const _id = req.params.id
		const task = await Task.findById(_id)
	
		if (!task){
			return res.status(404).send()
		}
		res.send(task) 
		
	}
	catch(e){
		res.status(500).send() 
	}
})



router.patch('/tasks/:id', async(req,res) =>{
	const updates = Object.keys(req.body)
	const allowedUpdates = ['description']
	const isValidOperation = updates.every(update => {return allowedUpdates.includes(update)})
	console.log(updates)
	
	if (!isValidOperation){
		return res.status(400).send({error: 'Invalid updates!'})
	}

	try{
		const task = await Task.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})

		if(!task){
			return res.status(404).send()
		}
		res.send(task)
	}
	catch(e){
		res.status(400).send(e)
	}
})




router.delete('/tasks/:id', async(req, res) =>{
	try{
		const task = await Task.findByIdAndDelete(req.params.id)
		if (!task){
			return res.status(404).send()
		}
		res.send(task)
	}
	catch(e){
		res.status(500).send(e)
	}
})


module.exports = router
