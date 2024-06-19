const express = require('express')
const router = express.Router()
const Subscriber = require('../models/subscriber')

// Getting all
router.get('/', async (req, res) => {
    try {
        const subscribers = await Subscriber.find()
        res.json(subscribers)
    } catch (err) {
        res.status(500).json({ message: err.message})
    }

})


// Getting one
router.get('/:id', getSubscriber, (req, res) => {
    res.json(req.subscriber)

})

// Creating one
router.post('/', async (req, res) => {
    const subscriber = new Subscriber({
    name: req.body.name,
    subscribedToChannel: req.body.subscribedToChannel

    })

    try {
        const newSubscriber = await subscriber.save()
        res.status(201).json(newSubscriber)
    } catch (err) {
        res.status(400).json({ message: err.message})

    }
})



// Updating one

router.patch('/:id', getSubscriber, async (req, res) => {
    if (req.body.name != null) {
        req.subscriber.name = req.body.name
    }
    if (req.body.subscribedToChannel != null) {
        req.subscriber.subscribedToChannel = req.body.subscribedToChannel
    }
    try {
        const updatedSubscriber = await req.subscriber.save()
        res.json(updatedSubscriber)
    } catch (err) {
        res.status(400).json({ message: err.message})
      }
})


// Deleting one

router.delete('/:id', getSubscriber, async (req, res) => {
    try {
        console.log('Deleting subscriber:', req.subscriber);
        await req.subscriber.deleteOne()
        res.json({ message: 'Deleted Subscriber'})
    } catch (err) {
        res.status(500).json({ message: err.message})
    }


})

async function getSubscriber(req, res, next) {
    try {
        subscriber = await Subscriber.findById(req.params.id)
        if (subscriber == null) {
            return res.status(404).json({ message: 'Cannot find subscriber' })
            
        }
    } catch (err) {
        return res.status(500).json({message: err.message })
    }

    req.subscriber = subscriber;
    next()
 }




module.exports = router