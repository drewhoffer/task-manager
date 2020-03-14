const express = require('express')
const router = new express.Router()
const Task = require('../models/task')
const auth = require('../middleware/auth')




//create a task
router.post('/tasks', auth, async (req, res) => {

	const task = new Task({
		...req.body,
		owner: req.user._id
	})
	try{
		await task.save()
		res.status(201).send(task)
	}
	catch(e){
		res.status(400).send(e)
	}
})



//Read all tasks in db 
//GET /tasks?completed=true
//get /tasks?limit=10&skip=20
//get /tasks?sortBy=createdAt_asc / desc
router.get('/tasks',auth, async (req, res) => {
	const match = {}
	const sort = {}
	if(req.query.completed){
		//returns true if true is in query
		match.completed = req.query.completed ==='true'	
	} 
	if (req.query.sortBy){
		const parts = req.query.sortBy.split('_')
		sort[parts[0]] = parts[1] === 'desc' ? -1 : 1	//Set sort to true or false based on desc or not
	}

	try{
		await req.user.populate({
			path: 'tasks',
			match,
			options:{
				limit: parseInt(req.query.limit),
				skip: parseInt(req.query.skip),
				sort
			}
		}).execPopulate()
		res.send(req.user.tasks)
	}
	catch(e){
		res.status(500).send()
	}
})



//get task based on id
router.get('/tasks/:id', auth, async (req, res) => {
	try{
		const _id = req.params.id
		const task = await Task.findOne({ _id, owner:req.user._id })
		if (!task){
			return res.status(404).send()
		}
		res.send(task) 
		
	}
	catch(e){
		res.status(500).send() 
	}
})



router.patch('/tasks/:id', auth, async(req,res) =>{
	const updates = Object.keys(req.body)
	const allowedUpdates = ['title','description', 'completed']
	const isValidOperation = updates.every(update => {return allowedUpdates.includes(update)})
	
	if (!isValidOperation){
		return res.status(400).send({error: 'Invalid updates!'})
	}

	try{
		const task = await Task.findOne({_id: req.params.id, owner: req.user._id})
	
		if(!task){
			return res.status(404).send()
		}
		updates.forEach( update => { task[update] = req.body[update] })
		await task.save()

		res.send(task)
	}
	catch(e){
		res.status(400).send(e)
	}
})




router.delete('/tasks/:id',auth , async(req, res) =>{
	try{
		const task = await Task.findOneAndDelete({ _id: req.params.id, owner:req.user._id })
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
